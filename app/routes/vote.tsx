import type {Route} from "../+types/root";
import React, {useEffect, useState} from "react";
import {PageLocation} from "~/components/markdown-page";
import {AwardIcon, ClockIcon, ExternalLinkIcon, GiftIcon, SparkleIcon, ZapIcon} from "lucide-react";
import {cn} from "~/lib/utils";
import axios from "axios";

export function meta({}: Route.MetaArgs) {
    return [
        {title: "Static Studios | Vote"},
        {name: "description", content: "Vote for Static Studios to receive in-game rewards!"},
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
    "bg-purple-600 hover:bg-purple-700",
    "bg-indigo-600 hover:bg-indigo-700",
    "bg-blue-600 hover:bg-blue-700"
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
        <div className="mx-2">
            <div className="container mx-auto mb-8">
                <div className="mt-8 mb-4">
                    <PageLocation location={[
                        {href: "/", name: "Home"},
                        {href: "/vote", name: "Vote"},
                    ]}/>
                </div>
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex flex-col gap-8  md:w-3/4">
                        <div
                            className="bg-slate-800/70 border border-indigo-800/30 rounded-lg p-8 flex flex-col gap-8">
                            <h1>Vote for Static Studios</h1>
                            <div className="flex flex-col gap-4">
                                <p className="text-white/70">Support out server by voting on the sites below. Each vote
                                    helps us
                                    grow
                                    and gives you awesome
                                    rewards!</p>

                                <div className="text-purple-400 flex flex-col md:flex-row gap-8 font-semibold">
                                    <div className="flex flex-row gap-1">
                                        <GiftIcon/>
                                        <p>Vote party at {votePartyThreshold}!</p>
                                    </div>
                                    <div className="flex flex-row gap-1">
                                        <AwardIcon/>
                                        <p>Rewards for every vote!</p>
                                    </div>
                                    <div className="flex flex-row gap-1">
                                        <ClockIcon/>
                                        <p>Vote every 24 hours!</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <p className="text-white font-medium text-lg">Vote Party Progress</p>
                                <div className="h-8 w-full rounded-full bg-gray-900 overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-purple-600 to-indigo-600 transition-all duration-1000"
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

                            <div className="bg-indigo-800/40 rounded-lg p-6 flex flex-col gap-4">
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
                                           className={cn(colors[index % 3], "rounded-lg p-4 transition-colors flex flex-row justify-between items-center")}
                                           key={index}>
                                            <div className="flex flex-col">
                                                <span className="text-lg font-bold">Vote site #{index + 1}</span>
                                                <span className="text-white/70">Click to vote</span>
                                            </div>
                                            <ExternalLinkIcon className="size-5"/>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="bg-slate-800/70 border border-indigo-800/30 rounded-lg p-8 flex flex-col gap-8">
                            <h3>Benefits of Voting</h3>
                            <div className="grid md:grid-cols-3 gap-4">
                                <div
                                    className="rounded-lg bg-indigo-800/25 p-4 flex flex-col gap-4 items-center text-center">
                                    <GiftIcon className="text-purple-400 size-10"/>
                                    <p className="text-xl font-bold">Daily Rewards</p>
                                    <p className="text-white/70">Get valuable in-game items every time you vote,
                                        including money, crate keys, and more.</p>
                                </div>
                                <div
                                    className="rounded-lg bg-indigo-800/25 p-4 flex flex-col gap-4 items-center text-center">
                                    <SparkleIcon className="text-purple-400 size-10"/>
                                    <p className="text-xl font-bold">Vote Parties</p>
                                    <p className="text-white/70">When we reach 50 votes, everyone who voted in the last
                                        24 hours gets special rewards.</p>
                                </div>
                                <div
                                    className="rounded-lg bg-indigo-800/25 p-4 flex flex-col gap-4 items-center text-center">
                                    <ZapIcon className="text-purple-400 size-10"/>
                                    <p className="text-xl font-bold">Server Growth</p>
                                    <p className="text-white/70">Your votes help our server grow and attract new players
                                        to join our community.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-8 h-max flex-1">
                        <div
                            className="bg-slate-800/70 border border-indigo-800/30 rounded-lg p-6 flex flex-col gap-4 flex-1 h-max">
                            <h4>Top Voters This Month</h4>
                            <div className="flex flex-col gap-2">
                                {topVoters.map((voter, index) => (
                                    <div className="items-center flex flex-row justify-between" key={index}>
                                        <div className="flex flex-row gap-4">
                                            <div data-pos={index + 1}
                                                 className="size-6 bg-white/4 rounded-full flex items-center justify-center
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
                            className="bg-slate-800/70 border border-indigo-800/30 rounded-lg p-6 flex flex-col gap-4 flex-1 h-max">
                            <h4>How to Vote</h4>
                            <div className="flex flex-col gap-2">
                                {howToVote.map((how, index) => (
                                    <div className="items-center flex flex-row gap-4" key={index}>
                                        <div
                                            className="size-6 bg-purple-400/5 rounded-full flex items-center justify-center">
                                            <p className="text-sm font-semibold text-purple-400">{index + 1}</p>
                                        </div>
                                        <p className="text-white">{how}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
