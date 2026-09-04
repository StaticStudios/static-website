import skyblockSeason3Trailer from "~/assets/skyblock/skyblock3_trailer_med_quality.mp4";

export type ArticleMedia = {
    // Local video takes priority over the YouTube preview. Both are optional.
    videoSrc?: string;
    youtubeVideoId?: string;
    // Seconds before the featured trailer first plays; later visibility changes resume immediately.
    // Set to 0 for immediate initial autoplay.
    autoplayDelaySeconds?: number;
};

// Keep imported assets outside seo.ts, which is also loaded by the build config.
export const articleMedia: Record<string, ArticleMedia | undefined> = {
    "skyblock-season-3": {
        videoSrc: skyblockSeason3Trailer,
        youtubeVideoId: "wmwMkgyBv0I",
        autoplayDelaySeconds: 2,
    },
};
