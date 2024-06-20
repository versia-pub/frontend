import type { LysandClient } from "@lysand-org/client";
import type { Status } from "@lysand-org/client/types";
import { SettingIds, type Settings } from "~/settings";

export const useNoteData = (
    noteProp: MaybeRef<Status | undefined>,
    client: Ref<LysandClient>,
    settings: MaybeRef<Settings>,
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
    const showContentWarning = useSetting(SettingIds.ShowContentWarning);
    const shouldHide = computed(
        () =>
            (renderedNote.value?.sensitive ||
                !!renderedNote.value?.spoiler_text) &&
            (showContentWarning.value.value as boolean),
    );
    const mentions = useResolveMentions(
        computed(() => renderedNote.value?.mentions ?? []),
        client.value,
    );
    const content = useParsedContent(
        computed(() => renderedNote.value?.content ?? ""),
        computed(() => renderedNote.value?.emojis ?? []),
        mentions,
        settings,
    );
    const loaded = computed(() => content.value !== null);

    const reblogDisplayName = useParsedContent(
        toValue(noteProp)?.account.display_name ?? "",
        toValue(noteProp)?.account.emojis ?? [],
        undefined,
        settings,
    );
    const reblog = computed(() =>
        isReblog.value && toValue(noteProp) && !isQuote.value
            ? {
                  avatar: toValue(noteProp)?.account.avatar,
                  acct: toValue(noteProp)?.account.acct,
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
        const result = await client.value.deleteStatus(
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
        isQuote,
        reblog,
        reblogDisplayName,
        shouldHide,
        isReply,
        url,
        remove,
    };
};
