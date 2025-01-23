import {SubTitle, Title} from "~/components/text";
import {ShareIcon} from "~/components/icons/share";
import type {Route} from "../+types/root";

export function meta({}: Route.MetaArgs) {
    return [
        {title: "Vote • Static Studios"},
        {name: "description", content: "Vote for Static Studios to receive in-game rewards!"},
    ];
}

//todo: add vote links
const links = [
    "",
    "",
    "",
    "",
    "",
    ""
]

export default function Vote() {
    return (
        <div className="flex flex-col gap-8 text-center">
            <div className="flex flex-col w-full gap-2">
                <div>
                    <Title>Vote for us</Title>
                    <p className="font-medium">Visit the following links and enter your Minecraft username.</p>
                    <p>You will be automatically rewarded in-game for each vote!</p>
                </div>
                <div className="w-full md:w-1/2 bg-white/50 h-[2px] mx-auto"/>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex flex-col w-full items-center gap-2 flex-1">
                    <div>
                        <SubTitle>Daily rewards</SubTitle>
                        <p className="font-medium">You can use each vote link once a day.</p>
                    </div>
                    <div className="w-3/4 bg-white/50 h-[2px]"/>
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
