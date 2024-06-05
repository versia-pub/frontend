import type { Mastodon } from "megalodon";
import type { Status } from "~/types/mastodon/status";

export const useNoteData = (
    noteProp: MaybeRef<Status | undefined>,
    client: Ref<Mastodon | null>,
) => {
    const isReply = computed(() => !!toValue(noteProp)?.in_reply_to_id);
    const isQuote = computed(() => !!toValue(noteProp)?.quote);
    const isReblog = computed(
        () => !isQuote.value && !!toValue(noteProp)?.reblog,
    );
    const renderedNote = computed(() =>
        isReblog.value
            ? toValue(noteProp)?.reblog ?? toValue(noteProp)
            : toValue(noteProp),
    );
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
        isReblog.value && renderedNote.value && !isQuote.value
            ? {
                  avatar: renderedNote.value.account.avatar,
                  acct: renderedNote.value.account.acct,
              }
            : null,
    );

    const url = computed(() =>
        new URL(
            `/@${renderedNote.value?.account.acct}/${renderedNote.value?.id}`,
            window.location.origin,
        ).toString(),
    );

    const remove = async () => {
        const result = await client.value?.deleteStatus(
            renderedNote.value?.id ?? "",
        );

        if (result?.data) {
            useEvent("note:delete", result.data as Status);
        }
    };

    return {
        loaded,
        note: renderedNote,
        content,
        isQuote,
        reblog,
        reblogDisplayName,
        shouldHide,
        isReply,
        url,
        remove,
    };
};
