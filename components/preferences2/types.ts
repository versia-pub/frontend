export interface PreferenceOptions<ValueType> {
    name: string;
    description?: string;
    category?: string;
    defaultValue: ValueType;
}

export abstract class Preference<ValueType> {
    public abstract options: PreferenceOptions<ValueType>;
}

export class TextPreference extends Preference<string> {
    constructor(public options: PreferenceOptions<string>) {
        super();
    }
}

export class NumberPreference extends Preference<number> {
    constructor(
        public options: PreferenceOptions<number> & {
            integer?: boolean;
            step?: number;
            min?: number;
            max?: number;
        },
    ) {
        super();
    }
}

export class BooleanPreference extends Preference<boolean> {
    constructor(public options: PreferenceOptions<boolean>) {
        super();
    }
}

export class SelectPreference<T extends string> extends Preference<T> {
    constructor(
        public options: PreferenceOptions<T> & {
            options: Record<T, string>;
        },
    ) {
        super();
    }
}

export class CodePreference extends Preference<string> {
    constructor(
        public options: PreferenceOptions<string> & {
            language?: "css";
        },
    ) {
        super();
    }
}

export class MultiSelectPreference<T extends string> extends Preference<T[]> {
    constructor(
        public options: PreferenceOptions<T[]> & {
            options: Record<T, string>;
        },
    ) {
        super();
    }
}

export class UrlPreference extends Preference<string> {
    constructor(public options: PreferenceOptions<string>) {
        super();
    }
}
