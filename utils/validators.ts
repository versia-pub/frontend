import {
    caseInsensitive,
    char,
    createRegExp,
    digit,
    exactly,
    global,
    letter,
    multiline,
    oneOrMore,
} from "magic-regexp";

export const emojiValidator = createRegExp(
    // A-Z a-z 0-9 _ -
    oneOrMore(letter.or(digit).or(exactly("_")).or(exactly("-"))),
    [caseInsensitive, global],
);

export const partiallyTypedEmojiValidator = createRegExp(
    exactly(":"),
    oneOrMore(letter.or(digit).or(exactly("_")).or(exactly("-"))).notBefore(
        char,
    ),
    [caseInsensitive, multiline],
);
