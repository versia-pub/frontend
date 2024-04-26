import type { Mastodon } from "megalodon";
import type { Status } from "~/types/mastodon/status";

export const useAccountTimeline = (
    client: Mastodon | null,
    id: MaybeRef<string | null>,
    options: MaybeRef<
        Partial<{
            limit?: number | undefined;
            max_id?: string | undefined;
            since_id?: string | undefined;
            min_id?: string | undefined;
            pinned?: boolean | undefined;
            exclude_replies?: boolean | undefined;
            exclude_reblogs?: boolean | undefined;
            only_media: boolean;
        }>
    >,
): {
    timeline: Ref<Status[]>;
    loadNext: () => Promise<void>;
    loadPrev: () => Promise<void>;
} => {
    if (!client) {
        return {
            timeline: ref([]),
            loadNext: async () => {},
            loadPrev: async () => {},
        };
    }

    const fetchedNotes = ref<Status[]>([]);
    const fetchedNoteIds = new Set<string>();
    let nextMaxId: string | undefined = undefined;
    let prevMinId: string | undefined = undefined;

    const loadNext = async () => {
        const response = await client.getAccountStatuses(ref(id).value ?? "", {
            only_media: false,
            ...ref(options).value,
            max_id: nextMaxId,
            limit: useConfig().NOTES_PER_PAGE,
        });

        const newNotes = response.data.filter(
            (note) => !fetchedNoteIds.has(note.id),
        );
        if (newNotes.length > 0) {
            fetchedNotes.value = [...fetchedNotes.value, ...newNotes];
            nextMaxId = newNotes[newNotes.length - 1].id;
            for (const note of newNotes) {
                fetchedNoteIds.add(note.id);
            }
        } else {
            nextMaxId = undefined;
        }
    };

    const loadPrev = async () => {
        const response = await client.getAccountStatuses(ref(id).value ?? "", {
            only_media: false,
            ...ref(options).value,
            min_id: prevMinId,
            limit: useConfig().NOTES_PER_PAGE,
        });

        const newNotes = response.data.filter(
            (note) => !fetchedNoteIds.has(note.id),
        );
        if (newNotes.length > 0) {
            fetchedNotes.value = [...newNotes, ...fetchedNotes.value];
            prevMinId = newNotes[0].id;
            for (const note of newNotes) {
                fetchedNoteIds.add(note.id);
            }
        } else {
            prevMinId = undefined;
        }
    };

    watch(
        [() => ref(id).value, () => ref(options).value],
        async ([id, { max_id, min_id }]) => {
            nextMaxId = max_id;
            prevMinId = min_id;
            id && (await loadNext());
        },
        { immediate: true },
    );

    return { timeline: fetchedNotes, loadNext, loadPrev };
};
