export interface YouTubePlayer {
    mute(): void;
    playVideo(): void;
    pauseVideo(): void;
    getOptions(module?: string): string[];
    getOption(module: string, option: string): unknown;
    setOption(module: string, option: string, value: unknown): void;
    destroy(): void;
}

interface PlayerEvent {
    target: YouTubePlayer;
    data?: number;
}

interface YouTubeAPI {
    Player: new (element: HTMLElement, options: {
        events: {
            onReady(event: PlayerEvent): void;
            onStateChange(event: PlayerEvent): void;
            onError(event: PlayerEvent): void;
            onAutoplayBlocked(): void;
            onApiChange(event: PlayerEvent): void;
        };
    }) => YouTubePlayer;
}

declare global {
    interface Window {
        YT?: YouTubeAPI;
        onYouTubeIframeAPIReady?: () => void;
    }
}

let apiPromise: Promise<YouTubeAPI> | undefined;

export function disablePreviewCaptions(player: YouTubePlayer): void {
    // cc_load_policy alone can retain a viewer's saved caption preference.
    // Track selection is not exposed by every player version; discover it first.
    try {
        if (!player.getOptions("captions").includes("track")) return;
        const track = player.getOption("captions", "track");
        if (track && typeof track === "object" && Object.keys(track).length > 0) {
            player.setOption("captions", "track", {});
        }
    } catch {
        // Optional caption controls must never prevent the trailer from playing.
    }
}

// Share the API script across previews and client-side navigation.
export function loadYouTubeAPI(): Promise<YouTubeAPI> {
    if (window.YT?.Player) return Promise.resolve(window.YT);
    if (apiPromise) return apiPromise;

    apiPromise = new Promise((resolve, reject) => {
        const previousReady = window.onYouTubeIframeAPIReady;
        const script = document.createElement("script");
        const timeout = window.setTimeout(() => fail(), 15000);
        const fail = () => {
            window.clearTimeout(timeout);
            window.onYouTubeIframeAPIReady = previousReady;
            script.remove();
            apiPromise = undefined;
            reject(new Error("YouTube preview unavailable"));
        };

        window.onYouTubeIframeAPIReady = () => {
            window.clearTimeout(timeout);
            window.onYouTubeIframeAPIReady = previousReady;
            if (window.YT?.Player) resolve(window.YT);
            else fail();
            previousReady?.();
        };
        script.src = "https://www.youtube.com/iframe_api";
        script.async = true;
        script.onerror = fail;
        document.head.appendChild(script);
    });

    return apiPromise;
}
