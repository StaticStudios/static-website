import {useEffect, useRef, useState} from "react";
import {PauseIcon, PlayIcon} from "lucide-react";
import {disablePreviewCaptions, loadYouTubeAPI, type YouTubePlayer} from "~/lib/youtube";
import {allowsTrailerAutoplay, type TrailerConnection} from "~/lib/trailer-autoplay";
import type {ArticleMedia} from "~/lib/article-media";

type FeaturedTrailerProps = ArticleMedia & {
    title: string;
    imageSrc: string;
};

export function FeaturedTrailer({videoSrc, youtubeVideoId, autoplayDelaySeconds = 3, title, imageSrc}: FeaturedTrailerProps) {
    const container = useRef<HTMLDivElement>(null);
    const playerHost = useRef<HTMLDivElement>(null);
    const localVideo = useRef<HTMLVideoElement>(null);
    const activePlayer = useRef<Pick<YouTubePlayer, "playVideo" | "pauseVideo"> | undefined>(undefined);
    const pausedRef = useRef(false);
    const hasPlayed = useRef(false);
    const eligibleRef = useRef(false);
    const [eligible, setEligible] = useState(false);
    const [activated, setActivated] = useState(false);
    const [paused, setPaused] = useState(false);
    const [playing, setPlaying] = useState(false);
    const [failed, setFailed] = useState(false);

    useEffect(() => {
        const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
        const pointer = window.matchMedia("(pointer: coarse)");
        const connection = (navigator as Navigator & {connection?: TrailerConnection}).connection;
        let visible = false;
        let autoplayAllowed = false;
        let autoplayTimeout: number | undefined;
        const updateEligibility = (value: boolean) => {
            eligibleRef.current = value;
            setEligible(value);
            if (value) setActivated(true);
        };
        updateEligibility(false);
        const update = () => {
            const allowed = visible && !motion.matches && !document.hidden && navigator.onLine
                && allowsTrailerAutoplay(connection, pointer.matches);
            if (allowed === autoplayAllowed) return;
            autoplayAllowed = allowed;
            window.clearTimeout(autoplayTimeout);
            if (allowed) {
                // Only the first playback waits; returning to the card resumes immediately.
                if (hasPlayed.current) updateEligibility(true);
                else autoplayTimeout = window.setTimeout(() => updateEligibility(true), Math.max(0, autoplayDelaySeconds) * 1000);
            } else {
                updateEligibility(false);
            }
        };
        const observer = new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting;
            update();
        }, {threshold: 0.1});

        if (container.current) observer.observe(container.current);
        motion.addEventListener("change", update);
        pointer.addEventListener("change", update);
        connection?.addEventListener("change", update);
        document.addEventListener("visibilitychange", update);
        window.addEventListener("online", update);
        window.addEventListener("offline", update);
        return () => {
            window.clearTimeout(autoplayTimeout);
            observer.disconnect();
            motion.removeEventListener("change", update);
            pointer.removeEventListener("change", update);
            connection?.removeEventListener("change", update);
            document.removeEventListener("visibilitychange", update);
            window.removeEventListener("online", update);
            window.removeEventListener("offline", update);
        };
    }, [autoplayDelaySeconds]);

    useEffect(() => {
        if (eligible && !pausedRef.current) activePlayer.current?.playVideo();
        else activePlayer.current?.pauseVideo();
    }, [eligible]);

    useEffect(() => {
        if (!activated || failed) return;

        let disposed = false;
        let player: YouTubePlayer | undefined;
        let playbackTimeout: number | undefined;
        const fallback = () => {
            if (disposed) return;
            window.clearTimeout(playbackTimeout);
            setPlaying(false);
            setFailed(true);
        };

        if (videoSrc && localVideo.current) {
            const video = localVideo.current;
            const onPlaying = () => {
                if (disposed) return;
                if (pausedRef.current || !eligibleRef.current) video.pause();
                else {
                    hasPlayed.current = true;
                    setPlaying(true);
                }
            };
            const onPause = () => {
                if (!disposed) setPlaying(false);
            };
            video.addEventListener("playing", onPlaying);
            video.addEventListener("pause", onPause);
            video.addEventListener("error", fallback);
            video.muted = true;
            // Attach the source only after visibility, motion, and connection checks pass.
            video.src = videoSrc;
            activePlayer.current = {
                playVideo: () => {
                    void video.play().catch(error => {
                        // Scrolling away can pause the video before play() settles.
                        if (error?.name !== "AbortError") fallback();
                    });
                },
                pauseVideo: () => video.pause(),
            };
            if (eligibleRef.current && !pausedRef.current) activePlayer.current.playVideo();

            return () => {
                disposed = true;
                activePlayer.current = undefined;
                video.removeEventListener("playing", onPlaying);
                video.removeEventListener("pause", onPause);
                video.removeEventListener("error", fallback);
                video.pause();
                video.removeAttribute("src");
                video.load(); // Release the source on unmount; visibility changes only pause it.
                setPlaying(false);
            };
        }

        // A local source never loads the YouTube API, even if a YouTube link is present.
        if (videoSrc || !youtubeVideoId || !playerHost.current) return;
        const host = playerHost.current;
        loadYouTubeAPI().then(api => {
            if (disposed) return;
            // Create this iframe outside React: the player API owns its lifecycle.
            const iframe = document.createElement("iframe");
            const params = new URLSearchParams({
                enablejsapi: "1", origin: window.location.origin,
                autoplay: "0", mute: "1", playsinline: "1",
                controls: "0", disablekb: "1", fs: "0", rel: "0",
                loop: "1", playlist: youtubeVideoId,
                cc_load_policy: "0",
            });
            // YouTube selects quality adaptively; vq/setPlaybackQuality no longer override it.
            iframe.src = `https://www.youtube-nocookie.com/embed/${youtubeVideoId}?${params}`;
            iframe.title = `${title} — muted trailer preview`;
            iframe.allow = "autoplay; encrypted-media";
            iframe.referrerPolicy = "strict-origin-when-cross-origin";
            iframe.tabIndex = -1;
            iframe.className = "size-full border-0";
            host.appendChild(iframe);
            player = new api.Player(iframe, {
                events: {
                    onReady: ({target}) => {
                        if (disposed) return;
                        activePlayer.current = {
                            playVideo: () => {
                                window.clearTimeout(playbackTimeout);
                                if (!hasPlayed.current) playbackTimeout = window.setTimeout(fallback, 15000);
                                target.playVideo();
                            },
                            pauseVideo: () => {
                                window.clearTimeout(playbackTimeout);
                                target.pauseVideo();
                            },
                        };
                        target.mute();
                        disablePreviewCaptions(target);
                        if (pausedRef.current || !eligibleRef.current) activePlayer.current.pauseVideo();
                        else activePlayer.current.playVideo();
                    },
                    onStateChange: ({data, target}) => {
                        if (disposed) return;
                        if (data === 1) {
                            disablePreviewCaptions(target);
                            if (pausedRef.current || !eligibleRef.current) {
                                activePlayer.current?.pauseVideo();
                                return;
                            }
                            window.clearTimeout(playbackTimeout);
                            hasPlayed.current = true;
                            setPlaying(true);
                        } else if (data === 0 || data === 2) {
                            setPlaying(false);
                        }
                    },
                    onError: fallback,
                    onAutoplayBlocked: fallback,
                    onApiChange: ({target}) => {
                        if (!disposed) disablePreviewCaptions(target);
                    },
                },
            });
        }).catch(fallback);

        return () => {
            disposed = true;
            window.clearTimeout(playbackTimeout);
            activePlayer.current = undefined;
            player?.destroy();
            host.replaceChildren();
            setPlaying(false);
        };
    }, [activated, failed, videoSrc, youtubeVideoId, title]);

    const togglePlayback = () => {
        pausedRef.current = !pausedRef.current;
        setPaused(pausedRef.current);
        if (pausedRef.current) activePlayer.current?.pauseVideo();
        else activePlayer.current?.playVideo();
    };

    return (
        <div ref={container} className="absolute inset-0 overflow-hidden bg-slate-950 [container-type:size]">
            <img src={imageSrc} alt={title} loading="eager" decoding="async"
                 className="absolute inset-0 size-full object-cover"/>
            <div aria-hidden="true"
                 className={`pointer-events-none absolute inset-0 transition-opacity duration-700 motion-reduce:transition-none ${playing && eligible && !paused && !failed ? "opacity-100" : "opacity-0"}`}>
                {videoSrc ? (
                    <video ref={localVideo} muted loop playsInline preload="none" tabIndex={-1}
                           className="size-full object-cover"/>
                ) : (
                    <div ref={playerHost}
                         className="absolute left-1/2 top-1/2 h-[max(100cqh,56.25cqw)] w-[max(100cqw,177.78cqh)] -translate-x-1/2 -translate-y-1/2"/>
                )}
            </div>
            {(playing || paused) && !failed && eligible && (
                <button type="button" onClick={togglePlayback}
                        aria-label={paused ? "Resume muted trailer preview" : "Pause trailer preview"}
                        className="absolute bottom-4 left-4 z-10 inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-full border border-white/20 bg-slate-950/80 px-0 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-300 md:px-4">
                    {paused ? <PlayIcon className="size-4"/> : <PauseIcon className="size-4"/>}
                    <span className="hidden md:inline">{paused ? "Resume preview" : "Pause preview"}</span>
                </button>
            )}
        </div>
    );
}
