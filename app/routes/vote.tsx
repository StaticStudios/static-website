import {SubTitle, Title} from "~/components/text";
import {ShareIcon} from "~/components/icons/share";
import type {Route} from "../+types/root";

export function meta({}: Route.MetaArgs) {
    return [
        {title: "Vote • Static Studios"},
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
//todo: overhaul

export default function Vote() {
    return (
        <div className="flex flex-col gap-8 text-center">
            <div className="flex flex-col w-full gap-2">
                <div>
                    <Title>Vote for us</Title>
                    <p className="font-medium">Visit the following links and enter your Minecraft username.</p>
                    <p className="font-medium">You will be automatically rewarded in-game for each vote!</p>
                </div>
                <div className="w-full md:w-1/2 bg-white/50 h-[2px] mx-auto"/>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex flex-col items-center gap-2 flex-1">
                    <div>
                        <SubTitle>Vote party</SubTitle>
                        <p className="font-medium">Work as a community to get additional rewards!</p>
                    </div>
                    <div className="w-3/4 bg-white/50 h-[2px]"/>
                    <div className="md:w-[70%] mt-4">
                        Did you know that each time 200 votes are made, an in-game vote party
                        activates? Make sure to encourage others to vote so you too can experience the vote party!
                        It's another way to earn free rewards! You must vote at least once to be eligible for the vote
                        party.
                    </div>
                </div>
                <div className="flex flex-col w-full gap-2 items-center flex-1">
                    <div>
                        <SubTitle>Vote links</SubTitle>
                        <p className="font-medium">You will receive a free crate key each time you vote!</p>
                    </div>
                    <div className="w-3/4 bg-white/50 h-[2px]"/>
                    <div className="flex flex-col gap-2 w-3/4 mt-2">
                        {links.map((link, index) => (
                            <VoteLink key={index} link={link} title={`Vote link #${index + 1}`}/>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

interface VoteLinkProps {
    link: string;
    title: string;
}

const VoteLink = ({link, title}: VoteLinkProps) => {
    return (
        <a href={link} target="_blank" rel="noreferrer"
           className="bg-theme-800 rounded-full flex grow hover:bg-theme-800/50 transition-all duration-100">
            <div className="flex flex-row items-center justify-between mx-4 my-2 grow">
                <p className="font-semibold tracking-tight">{title}</p>
                <ShareIcon className="text-theme-500"/>
            </div>
        </a>
    )
}
