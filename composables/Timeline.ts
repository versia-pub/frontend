import type { LysandClient, Output } from "@lysand-org/client";

interface BaseOptions {
    max_id?: string;
    min_id?: string;
}

type FetchTimelineFunction<Element, Options> = (
    client: LysandClient,
    options: Options & BaseOptions,
) => Promise<Output<Element[]>>;

export const useTimeline = <
    Element extends {
        id: string;
    },
    Options,
>(
    client: LysandClient | null,
    fetchTimeline: FetchTimelineFunction<Element, Options> | null | undefined,
    options: MaybeRef<Options & BaseOptions>,
): {
    timeline: Ref<Element[]>;
    loadNext: () => Promise<void>;
    loadPrev: () => Promise<void>;
} => {
    if (!client || !fetchTimeline) {
        return {
            timeline: ref([]),
            loadNext: async () => {},
            loadPrev: async () => {},
        };
    }

    const fetchedNotes: Ref<Element[]> = ref([]);
    const fetchedNoteIds = new Set<string>();
    let nextMaxId: string | undefined = undefined;
    let prevMinId: string | undefined = undefined;

    const loadNext = async () => {
        const response = await fetchTimeline(client, {
            ...(ref(options).value as Options & BaseOptions),
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
        const response = await fetchTimeline(client, {
            ...(ref(options).value as Options & BaseOptions),
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
        () => ref(options).value,
        async ({ max_id, min_id }) => {
            nextMaxId = max_id;
            prevMinId = min_id;
            await loadNext();
        },
        { immediate: true },
    );

    return { timeline: fetchedNotes, loadNext, loadPrev };
};

export const useIdTimeline = <
    Element extends {
        id: string;
    },
    Options,
>(
    client: LysandClient | null,
    id: MaybeRef<string | null>,
    fetchTimeline: FetchTimelineFunction<Element, Options> | null | undefined,
    options: MaybeRef<Options & BaseOptions>,
): {
    timeline: Ref<Element[]>;
    loadNext: () => Promise<void>;
    loadPrev: () => Promise<void>;
} => {
    if (!client || !fetchTimeline) {
        return {
            timeline: ref([]),
            loadNext: async () => {},
            loadPrev: async () => {},
        };
    }

    const fetchedNotes: Ref<Element[]> = ref([]);
    const fetchedNoteIds = new Set<string>();
    let nextMaxId: string | undefined = undefined;
    let prevMinId: string | undefined = undefined;

    const loadNext = async () => {
        const response = await fetchTimeline(client, {
            ...(ref(options).value as Options & BaseOptions),
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
        const response = await fetchTimeline(client, {
            ...(ref(options).value as Options & BaseOptions),
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
