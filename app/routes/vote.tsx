import type {Route} from "../+types/root";
import React, {useEffect, useState} from "react";
import {PageLocation} from "~/components/markdown-page";
import {AwardIcon, ClockIcon, ExternalLinkIcon, GiftIcon, SparkleIcon, ZapIcon} from "lucide-react";
import {cn} from "~/lib/utils";
import axios from "axios";
import {PageIntro, PageShell} from "~/components/page-shell";

export function meta({}: Route.MetaArgs) {
    return [
        {title: "Static | Vote for Rewards"},
        {name: "description", content: "Vote daily for the Static Minecraft server to earn in-game rewards, trigger vote parties, and support the community. IP: play.staticstudios.net"},
        {name: "robots", content: "index, follow"},
        {property: "og:title", content: "Vote for Static - Earn Minecraft Rewards"},
        {property: "og:description", content: "Vote daily for in-game rewards and help trigger vote parties on the Static Minecraft server."},
        {property: "og:type", content: "website"},
        {property: "og:url", content: "https://staticstudios.net/vote"},
        {property: "og:image", content: "https://staticstudios.net/image/skyblock.png"},
        {property: "og:site_name", content: "Static"},
        {name: "twitter:card", content: "summary_large_image"},
    ];
}

const links = [
    "https://minecraftservers.org/vote/670673",
    "https://minecraft-server-list.com/server/510054/vote/",
    "https://servers-minecraft.net/server-static-studios.41149",
    "https://minecraft.buzz/vote/13401",
    "https://best-minecraft-servers.co/server-static-studios.27338/vote",
    "https://minecraft-mp.com/server/340665/vote/",
    "https://minecraft-serverlist.com/server/2261/vote"
]

const colors = [
    "from-violet-500/90 to-purple-700/90 hover:from-violet-400 hover:to-purple-600",
    "from-indigo-500/90 to-violet-700/90 hover:from-indigo-400 hover:to-violet-600",
    "from-blue-500/90 to-indigo-700/90 hover:from-blue-400 hover:to-indigo-600"
]
const votePartyThreshold = 50;

const howToVote = [
    "Click on each voting site button",
    "Enter your Minecraft username",
    "Join the server to claim rewards",
    "Repeat again tomorrow!"
]


type Voter = {
    name: string;
    voteCount: number;
}


export default function Vote() {
    const [currentVotes, setCurrentVotes] = useState(0);
    const [topVotersAPI, setTopVotersAPI] = useState<Voter[]>([]);
    const topVoters = [];
    for (let i = 0; i < 10; i++) {
        if (topVotersAPI[i] && topVotersAPI[i].voteCount > 0) {
            topVoters.push(topVotersAPI[i]);
        } else {
            topVoters.push({name: "No data", voteCount: -1});
        }
    }

    useEffect(() => {
        const fetchData = () => {
            axios.get("https://api.staticstudios.net/api/v1/public/minecraft/top_voters").then(res => {
                setTopVotersAPI(res.data);
            })
            axios.get("https://api.staticstudios.net/api/v1/public/minecraft/current_votes").then(res => {
                setCurrentVotes(res.data);
            })
        }
        fetchData();
        const interval = setInterval(() => {
            fetchData();
        }, 5000);

        return () => {
            clearInterval(interval);
        }
    }, [])

    return (
        <PageShell>
                <div className="mb-5">
                    <PageLocation location={[
                        {href: "/", name: "Home"},
                        {href: "/vote", name: "Vote"},
                    ]}/>
                </div>
                <PageIntro
                    eyebrow="Support the network"
                    title="Vote for Static"
                    description="Vote every day to earn in-game rewards, power up the next vote party, and help more players discover the server."
                />
                <div className="flex flex-col gap-7 lg:flex-row">
                    <div className="flex flex-col gap-7 lg:w-3/4">
                        <div
                            className="surface-panel relative flex flex-col gap-8 overflow-hidden p-6 sm:p-8">
                            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-300/55 to-transparent"/>
                            <div className="flex flex-col gap-4">
                                <h2 className="text-2xl font-bold text-white">Every vote moves Static forward</h2>
                                <p className="leading-7 text-slate-300">Support our server by voting on the sites below. Each vote
                                    helps us
                                    grow
                                    and gives you awesome
                                    rewards!</p>

                                <div className="flex flex-col gap-3 font-semibold text-purple-300 md:flex-row md:gap-8">
                                    <div className="flex flex-row gap-2">
                                        <GiftIcon/>
                                        <p>Vote party at {votePartyThreshold}!</p>
                                    </div>
                                    <div className="flex flex-row gap-2">
                                        <AwardIcon/>
                                        <p>Rewards for every vote!</p>
                                    </div>
                                    <div className="flex flex-row gap-2">
                                        <ClockIcon/>
                                        <p>Vote every 24 hours!</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <p className="text-white font-medium text-lg">Vote Party Progress</p>
                                <div className="h-8 w-full overflow-hidden rounded-full border border-white/8 bg-slate-950/55 p-1 shadow-inner">
                                    <div
                                        className="h-full rounded-full bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500 shadow-[0_0_22px_rgba(139,92,246,0.45)] transition-all duration-1000"
                                        style={{width: `${(currentVotes / votePartyThreshold) * 100}%`}}/>
                                </div>
                                <div className="flex flex-row justify-between">
                                    <div className="text-white/70">
                            <span
                                className="text-purple-400 font-bold">{currentVotes}</span> / {votePartyThreshold} votes
                                    </div>
                                    <div className="text-white/70">
                                <span
                                    className="text-purple-400 font-bold">{votePartyThreshold - currentVotes}</span> more
                                        vote{(votePartyThreshold - currentVotes) > 1 ? "s" : ""} needed
                                    </div>
                                </div>
                            </div>

                            <div className="surface-card flex flex-col gap-4 p-6">
                                <h3>Vote Party System</h3>
                                <p className="text-white/70">
                                    Everytime we reach{" "}
                                    <span
                                        className="text-purple-400 font-extrabold">{votePartyThreshold} votes</span>{", "}
                                    a <span className="text-purple-400 font-extrabold">vote party</span> will
                                    automatically be triggered in-game!
                                </p>
                                <p className="text-white/70">
                                    All <span className="text-purple-400 font-extrabold">online players</span>{" "}
                                    who voted in the last <span
                                    className="text-purple-400 font-extrabold">24 hours</span> will
                                    receive additional rewards including:
                                </p>
                                <ul className="list-disc pl-8 text-white/70">
                                    <li>Random crate keys</li>
                                    <li>In-game currency</li>
                                    <li>Various boosters</li>
                                    <li>And more!</li>
                                </ul>
                            </div>

                            <div className="flex flex-col gap-4">
                                <h3>Voting Sites</h3>
                                <p className="text-white/70">Click each button below to vote for our server. Enter your
                                    exact
                                    Minecraft username on each site. <i><b>Minecraft Bedrock</b> users should prefix
                                        their
                                        name
                                        with
                                        a period. For example: <b>.NotchMCBE</b></i></p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {links.map((link, index) => (
                                        <a href={link} target="_blank" rel="noreferrer"
                                           className={cn(colors[index % 3], "group flex items-center justify-between rounded-xl border border-white/10 bg-gradient-to-br p-4 shadow-lg shadow-slate-950/15 transition duration-300 hover:-translate-y-0.5")}
                                           key={index}>
                                            <div className="flex flex-col">
                                                <span className="text-lg font-bold">Vote site #{index + 1}</span>
                                                <span className="text-white/70">Click to vote</span>
                                            </div>
                                            <ExternalLinkIcon className="size-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"/>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="surface-panel flex flex-col gap-8 p-6 sm:p-8">
                            <h3>Benefits of Voting</h3>
                            <div className="grid md:grid-cols-3 gap-4">
                                <div className="surface-card flex flex-col items-center gap-4 p-5 text-center">
                                    <GiftIcon className="text-purple-400 size-10"/>
                                    <p className="text-xl font-bold">Daily Rewards</p>
                                    <p className="text-white/70">Get valuable in-game items every time you vote,
                                        including money, crate keys, and more.</p>
                                </div>
                                <div className="surface-card flex flex-col items-center gap-4 p-5 text-center">
                                    <SparkleIcon className="text-purple-400 size-10"/>
                                    <p className="text-xl font-bold">Vote Parties</p>
                                    <p className="text-white/70">When we reach 50 votes, everyone who voted in the last
                                        24 hours gets special rewards.</p>
                                </div>
                                <div className="surface-card flex flex-col items-center gap-4 p-5 text-center">
                                    <ZapIcon className="text-purple-400 size-10"/>
                                    <p className="text-xl font-bold">Server Growth</p>
                                    <p className="text-white/70">Your votes help our server grow and attract new players
                                        to join our community.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <aside className="flex h-max flex-1 flex-col gap-7">
                        <div
                            className="surface-panel flex h-max flex-1 flex-col gap-4 p-6">
                            <h4>Top Voters This Month</h4>
                            <div className="flex flex-col gap-2">
                                {topVoters.map((voter, index) => (
                                    <div className="items-center flex flex-row justify-between" key={index}>
                                        <div className="flex flex-row gap-4">
                                            <div data-pos={index + 1}
                                                 className="flex size-7 items-center justify-center rounded-full border border-white/8 bg-white/4
                                         data-[pos=1]:bg-yellow-500/20 data-[pos=1]:text-yellow-500
                                         data-[pos=2]:bg-gray-300/20 data-[pos=2]:text-gray-300
                                         data-[pos=3]:bg-orange-700/20 data-[pos=3]:text-orange-700">
                                                <p className="text-sm font-semibold">{index + 1}</p>
                                            </div>
                                            <p className="text-white">{voter.name}</p>
                                        </div>
                                        <p className="text-purple-400 font-semibold">{voter.voteCount > 0 ? voter.voteCount : "N/A"}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div
                            className="surface-panel flex h-max flex-1 flex-col gap-4 p-6">
                            <h4>How to Vote</h4>
                            <div className="flex flex-col gap-2">
                                {howToVote.map((how, index) => (
                                    <div className="grid grid-cols-[1.75rem_1fr] items-start gap-3" key={index}>
                                        <div className="grid size-7 shrink-0 place-items-center rounded-full border border-purple-300/15 bg-purple-400/10 shadow-inner">
                                            <span className="text-xs font-bold leading-none tabular-nums text-purple-300">{index + 1}</span>
                                        </div>
                                        <p className="leading-7 text-white">{how}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </aside>
                </div>
        </PageShell>
    )
}
