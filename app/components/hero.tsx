import hero from "~/assets/hero.png";
import {useEffect, useState} from "react";
import {ArrowRightIcon, CheckIcon, CopyIcon, ExternalLinkIcon, SparklesIcon, UsersIcon} from "lucide-react";
import {Link} from "react-router";

const SERVER_ADDRESS = "play.staticstudios.net";

export const HeroV2 = ({title, subtitle}: {
    title: { content: string, highlighted?: boolean }[],
    subtitle: string
}) => {
    const [onlinePlayers, setOnlinePlayers] = useState<null | number>(null);

    useEffect(() => {
        const url = "https://api.staticstudios.net/api/v1/public/minecraft/player_count";
        fetch(url)
            .then(response => response.json())
            .then(data => setOnlinePlayers(data))
            .catch(console.error);
    }, []);

    return (
        <section
            className="relative isolate min-h-[620px] overflow-hidden border-b border-indigo-500/20 sm:min-h-[680px]">
            <div className="absolute inset-0 -z-30">
                <img
                    alt="A sunlit island on the Static Minecraft server"
                    src={hero}
                    fetchPriority="high"
                    className="size-full scale-[1.04] object-cover object-center motion-safe:animate-[heroDrift_18s_ease-in-out_infinite_alternate]"
                />
            </div>
            <div
                className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,rgba(6,8,28,0.9)_0%,rgba(10,12,38,0.7)_43%,rgba(9,10,34,0.55)_100%)]"/>
            <div
                className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,rgba(8,10,30,0.5)_0%,rgba(8,10,30,0.06)_35%,rgba(8,10,30,0.96)_100%)]"/>
            <div className="hero-grid absolute inset-0 -z-10 opacity-35"/>
            <div className="absolute -left-24 top-40 -z-10 size-72 rounded-full bg-purple-600/25 blur-3xl"/>
            <div className="absolute -right-28 bottom-8 -z-10 size-80 rounded-full bg-indigo-500/20 blur-3xl"/>

            <div
                className="mx-auto flex min-h-[620px] w-full max-w-7xl flex-col px-4 pb-8 pt-5 sm:min-h-[680px] sm:px-6 lg:px-8">
                <div className="flex items-center justify-between gap-3">
                    <PlayerStatusPanel onlinePlayers={onlinePlayers}/>
                    <DiscordPanel/>
                </div>

                <div className="flex flex-1 items-center py-14 sm:py-20">
                    <div className="max-w-4xl">
                        <div
                            className="mb-5 inline-flex items-center gap-2 rounded-full border border-purple-300/20 bg-slate-950/45 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-purple-200 shadow-lg shadow-purple-950/20 backdrop-blur-md sm:text-sm">
                            <SparklesIcon className="size-3.5"/>
                            A Minecraft Server Network
                        </div>
                        <h1 className="max-w-4xl text-balance text-5xl font-black leading-[0.95] tracking-[-0.05em] text-white drop-shadow-2xl sm:text-7xl lg:text-[6.5rem]">
                            {title.map((part, index) => (
                                <span
                                    key={index}
                                    className={part.highlighted ? "text-purple-300 [text-shadow:0_4px_30px_rgba(168,85,247,0.55)]" : ""}
                                >
                                    {part.content}{index < title.length - 1 ? " " : ""}
                                </span>
                            ))}
                        </h1>
                        <p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-slate-200/85 drop-shadow-md sm:text-xl">
                            {subtitle}
                        </p>
                        <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                            <CopyServerButton/>
                            <Link
                                to="/wiki"
                                className="group inline-flex h-14 items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-white/15 bg-white/7 px-6 font-semibold text-white shadow-lg backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/12"
                            >
                                Explore the server
                                <ArrowRightIcon
                                    className="size-4 transition-transform duration-300 group-hover:translate-x-1"/>
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

const CopyServerButton = () => {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = async () => {
        await navigator.clipboard.writeText(SERVER_ADDRESS);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2000);
    };

    return (
        <button
            onClick={copyToClipboard}
            className="group inline-flex h-14 items-center justify-center gap-3 whitespace-nowrap rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 px-6 font-bold text-white shadow-[0_12px_40px_rgba(139,92,246,0.35)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_48px_rgba(139,92,246,0.48)]"
            aria-label={`Copy Minecraft server address ${SERVER_ADDRESS}`}
        >
            <span>{copied ? "Server IP copied" : SERVER_ADDRESS}</span>
            {copied ? <CheckIcon className="size-5"/> :
                <CopyIcon className="size-5 transition-transform group-hover:scale-110"/>}
        </button>
    );
};

const PlayerStatusPanel = ({onlinePlayers}: { onlinePlayers: null | number }) => (
    <div
        className="inline-flex h-11 items-center gap-3 rounded-xl border border-white/10 bg-slate-950/55 px-3.5 text-white shadow-lg shadow-slate-950/20 backdrop-blur-xl sm:px-4">
        <span className="relative flex size-2.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-70"/>
            <span className="relative inline-flex size-2.5 rounded-full bg-emerald-400"/>
        </span>
        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-200">
            {onlinePlayers?.toLocaleString() ?? "—"} online
        </span>
    </div>
);

const DiscordPanel = () => {
    const [members, setMembers] = useState<null | number>(null);

    useEffect(() => {
        const url = "https://discord.com/api/v9/invites/9S6K9E5?with_counts=true&with_expiration=true";
        fetch(url)
            .then(response => response.json())
            .then(data => setMembers(data.approximate_member_count))
            .catch(console.error);
    }, []);

    return (
        <Link
            to="/discord"
            target="_blank"
            rel="noreferrer"
            className="group hidden h-11 items-center gap-2.5 rounded-xl border border-white/10 bg-slate-950/55 px-4 text-xs font-semibold uppercase tracking-[0.12em] text-slate-200 shadow-lg shadow-slate-950/20 backdrop-blur-xl transition hover:border-purple-300/30 hover:bg-slate-900/70 sm:flex"
        >
            <UsersIcon className="size-4 text-purple-300"/>
            <span>{members?.toLocaleString() ?? "—"} members</span>
            <ExternalLinkIcon
                className="size-3.5 text-purple-300 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"/>
        </Link>
    );
};
