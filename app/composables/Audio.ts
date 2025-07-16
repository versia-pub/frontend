export type AudioNames = "publish" | "like";

export type AudioManifest = Record<AudioNames, { src: string[] }>;

export const useAudio = (): {
    play: (name: AudioNames) => void;
} => {
    const audio = new Audio();

    const play = (name: AudioNames) => {
        const audioData = audioManifest.manifest.value?.[name];

        if (!audioData) {
            throw new Error(`Audio not found: ${name}`);
        }

        const src = audioData.src[
            Math.floor(Math.random() * audioData.src.length)
        ] as string;

        audio.src = src;
        audio.play();
    };

    return { play };
};

export const useAudioManifest = () => {
    const audioTheme = ref("misskey" as const);
    const url = computed(() => `/packs/audio/${audioTheme.value}.json`);

    // Fetch from /packs/audio/:name.json
    const manifest = ref(null as null | AudioManifest);

    // Fetch the manifest
    watch(
        url,
        async (url) => {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(
                    `Failed to fetch audio theme manifest at ${url}`,
                );
            }

            manifest.value = await response.json();

            // Preload all audio files
            if (manifest.value) {
                for (const audioData of Object.values(manifest.value)) {
                    for (const src of audioData.src) {
                        new Audio(src);
                    }
                }
            }
        },
        { immediate: true },
    );

    return { audioTheme, manifest, url };
};

export const audioManifest = useAudioManifest();
