import type {Route} from "../+types/root";
import skyblockSpawn from "~/assets/skyblock/spawn.png";
import skyblockSpawnSneakPeak from "~/assets/skyblock/spawn_sneak_peak.png";
import skyblockOasis from "~/assets/skyblock/oasis_1.png";
import React from "react";
import {HeroV2} from "~/components/hero";
import {CalendarIcon} from "lucide-react";
import {Button} from "~/components/ui/button";
import {useNavigate} from "react-router";

export function meta({}: Route.MetaArgs) {
    return [
        {title: "Static Studios"},
        {name: "description", content: "Static Studios is a Minecraft server network."},
    ];
}

const cards: CardProps[] = [
    {
        title: "Static Skyblock | Season 1.0",
        description: "TODO:", //TODO: THIS
        imageSrc: skyblockSpawn,
        date: "May 30, 2025",
        layout: "horizontal",
        href: "test" //todo: create article
    },
    {
        title: "Static Skyblock | Beta #3",
        description: "Skyblock has received another major update! We've added island quests, island upgrades & island points, AFK tracking, island value & island top, profiles, and more! Join our discord to apply for beta access.",
        imageSrc: skyblockSpawn,
        date: "Jan 19, 2025",
        layout: "vertical"
    },
    {
        title: "Static Skyblock | Beta #2",
        description: "Skyblock has received a major update! We've added an auction house, 3 brand new island presets, custom enchants, daily challenges, and more! Join our discord to apply for beta access.",
        imageSrc: skyblockSpawnSneakPeak,
        date: "Aug 23, 2024",
        layout: "vertical"
    },
    {
        title: "Static Skyblock | Beta #1",
        description: "Static Studios is back and we've released a brand new Skyblock server! Join our discord to apply for beta access.",
        date: "June 21, 2024",
        imageSrc: skyblockOasis,
        layout: "vertical"
    }
];

//todo: ideally the cards should point to an article
//todo: advertise the store
export default function Home() {
    return (
        <>
            <HeroV2 title={[{content: "Welcome to"}, {content: "Static Studios", highlighted: true}]}
                    subtitle="Experience the ultimate Minecraft server with custom gameplay, unique features, and an amazing community"/>
            <div className="container flex grow my-8 text-lg mx-auto flex-col gap-8">
                <Card {...cards[0]} index={0}/>
                <div className="grid grid-cols-3 flex-wrap gap-8">
                    {cards.slice(1).map((card, index) => (
                        <Card key={index} {...card} index={index + 1}/>
                    ))}
                </div>
            </div>
        </>
    );
}

type CardProps = {
    title: string;
    description: string;
    imageSrc: string;
    date: string;
    layout: "horizontal" | "vertical";
    href?: string;
}

const Card = ({title, description, imageSrc, date, layout, href, index}: CardProps & { index: number }) => {
    const navigate = useNavigate();
    return (
        <div data-layout={layout}
             className={`flex data-[layout=horizontal]:flex-row data-[layout=vertical]:flex-col border-indigo-800/50 border rounded-lg overflow-hidden bg-slate-800/70 opacity-0 animate-fade-in-up`}
             style={{
                 animationDelay: (index + 1) * 0.3 + "s"
             }}>
            <img data-layout={layout} src={imageSrc} alt={title}
                 className="data-[layout=horizontal]:w-[50%] object-cover h-[250px]"/>
            <div className="flex flex-col gap-4 p-4 flex-1">
                <div className="flex flex-row gap-1 items-center text-white/70">
                    <CalendarIcon className="size-5"/>
                    <p className="text-sm">{date}</p>
                </div>
                <h2 className="text-xl font-bold">{title}</h2>
                <p className="text-white/70">{description}</p>
                <Button disabled={href == undefined} variant="secondary" className="w-min mt-auto" onClick={() => {
                    if (href) {
                        navigate(href);
                    }
                }}>Read More</Button>
            </div>
        </div>
    )
}