import hero from '~/assets/hero.png';
import {useEffect, useState} from "react";
import {CheckIcon, CopyIcon, ExternalLinkIcon, UsersIcon} from "lucide-react";
import {Link} from "react-router";


//todo: allow specifying the title and description. eg. on the store page
export const HeroV2 = () => {
    return (
        <div className="relative h-[500px] overflow-hidden">
            <div className="absolute top-0 right-0 bottom-0 left-0">
                <img alt="" src={hero} className="object-cover size-full"/>
            </div>
            <div
                className="absolute top-0 right-0 bottom-0 left-0 bg-slate-900/80 backdrop-blur-xs border-indigo-800/30 border">
                <div className="mx-2 h-full">
                    <div
                        className="container mx-auto flex flex-col justify-center items-center gap-6 h-full">
                        <p className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg text-center">
                            Welcome to <span className="text-purple-400">Static Studios</span>
                        </p>
                        <p className="text-xl text-white/80 max-w-2xl mb-8 drop-shadow-md text-center">
                            Experience the ultimate Minecraft server with custom gameplay, unique features, and an
                            amazing
                            community
                        </p>
                    </div>
                </div>
            </div>
            <div className="absolute top-4 left-4 right-4">
                <ServerIPPanel/>
            </div>
            <div className="absolute top-4 right-4 hidden md:flex">
                <DiscordPanel/>
            </div>
        </div>
    )
}

const ServerIPPanel = () => {
    const [copied, setCopied] = useState(false)
    const copyToClipboard = () => {
        navigator.clipboard.writeText("play.staticstudios.net")
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const [onlinePlayers, setOnlinePlayers] = useState<null | number>(null);

    useEffect(() => {
        const url = "https://api.staticstudios.net/api/v1/minecraft/player_count";
        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setOnlinePlayers(data);
            })
            .catch(console.error);

    }, [setOnlinePlayers])

    return (
        <button
            onClick={copyToClipboard}
            className="flex flex-row items-center bg-slate-900/80 backdrop-blur rounded-lg border border-indigo-800/30 px-4 py-2 text-purple-400 hover:bg-slate-800/80 transition-colors h-12 justify-center w-full md:w-auto"
        >
            <div className="flex items-center mr-3 text-nowrap">
                <div className="size-2 rounded-full bg-green-500 mr-2"/>
                <span
                    className="text-xs font-medium text-white/70">{onlinePlayers?.toLocaleString() ?? `???`} ONLINE</span>
            </div>
            <span className="font-bold mr-2 text-sm md:text-base">{"play.staticstudios.net".toUpperCase()}</span>
            {copied ? (
                <CheckIcon className="size-4 text-green-500"/>
            ) : (
                <CopyIcon className="size-4 opacity-70 group-hover:opacity-100 transition-opacity"/>
            )}
        </button>
    )
}

const DiscordPanel = () => {
    const [members, setMembers] = useState<null | number>(null);
    useEffect(() => { //todo: store members & online players in some global state to avoid rerendering on page change
        const url = 'https://discord.com/api/v9/invites/9S6K9E5?with_counts=true&with_expiration=true';
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setMembers(data.approximate_member_count);
            })
            .catch(console.error);

    }, [setMembers])

    return (
        <Link
            to="/discord"
            target="_blank"
            className="flex flex-row items-center bg-slate-900/80 backdrop-blur rounded-lg border border-indigo-800/30 px-4 py-2 hover:bg-slate-800/80 transition-colors h-12"
        >
            <UsersIcon className="size-4 text-purple-400 mr-2"/>
            <span
                className="text-xs font-medium text-white/70 mr-2">{members?.toLocaleString() ?? "???"} MEMBERS • CLICK TO JOIN
            </span>
            <ExternalLinkIcon className="size-4 text-purple-400 mr-2"/>
        </Link>
    )
}