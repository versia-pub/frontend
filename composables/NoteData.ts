import type { Mastodon } from "megalodon";
import type { Status } from "~/types/mastodon/status";

export const useNoteData = (
    noteProp: MaybeRef<Status | undefined>,
    client: Ref<Mastodon | null>,
) => {
    const renderedNote = computed(
        () => toValue(noteProp)?.reblog ?? toValue(noteProp),
    );
    const isReblog = computed(() => !!toValue(noteProp)?.reblog);
    const shouldHide = computed(
        () =>
            renderedNote.value?.sensitive ||
            !!renderedNote.value?.spoiler_text ||
            false,
    );
    const mentions = useResolveMentions(
        renderedNote.value?.mentions ?? [],
        client.value,
    );
    const content = useParsedContent(
        renderedNote.value?.content ?? "",
        renderedNote.value?.emojis ?? [],
        mentions,
    );
    const loaded = computed(() => content.value !== null);

    const reblogDisplayName = useParsedContent(
        renderedNote.value?.account.display_name ?? "",
        renderedNote.value?.account.emojis ?? [],
    );
    const reblog = computed(() =>
        isReblog.value && renderedNote.value
            ? {
                  avatar: renderedNote.value.account.avatar,
                  acct: renderedNote.value.account.acct,
              }
            : null,
    );

    const url = computed(
        () => `/@${renderedNote.value?.account.acct}/${renderedNote.value?.id}`,
    );

    const remove = async () => {
        const result = await client.value?.deleteStatus(
            renderedNote.value?.id ?? "",
        );

        if (result?.data) {
            useEvent("note:delete", result.data);
        }
    };

    return {
        loaded,
        note: renderedNote,
        content,
        reblog,
        reblogDisplayName,
        shouldHide,
        url,
        remove,
    };
};
