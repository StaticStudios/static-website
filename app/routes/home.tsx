import type {Route} from "../+types/root";
import wz1 from "~/assets/skyblock/wz1.png";
import skyblockSpawn from "~/assets/skyblock/spawn.png";
import skyblockSpawnSneakPeak from "~/assets/skyblock/spawn_sneak_peak.png";
import skyblockOasis from "~/assets/skyblock/oasis_1.png";
import React, {type ReactNode, useEffect} from "react";
import {HeroV2} from "~/components/hero";
import {CalendarIcon, ClockIcon, ShoppingCartIcon, StarIcon, UsersIcon} from "lucide-react";
import {Button} from "~/components/ui/button";
import {Link, useNavigate} from "react-router";

export function meta({}: Route.MetaArgs) {
    return [
        {title: "Static Studios"},
        {
            name: "description",
            content: "Experience the ultimate Minecraft server with custom gameplay, unique features, and an amazing community!"
        },
        {
            name: "keywords",
            content: "minecraft server, skyblock, minecraft skyblock, static studios, custom enchants, quests, minecraft community, minecraft"
        },
        {name: "robots", content: "index, follow"},
        {name: "viewport", content: "width=device-width, initial-scale=1"},
        {property: "og:title", content: "Static Studios"},
        {
            property: "og:description",
            content: "Experience the ultimate Minecraft server with custom gameplay, unique features, and an amazing community!"
        },
        {property: "og:type", content: "website"},
        {property: "og:image", content: "https://staticstudios.net/image/skyblock.png"},
        {property: "og:url", content: "https://staticstudios.net"},
        {property: "og:site_name", content: "Static Studios"},
        {name: "twitter:card", content: "summary_large_image"},
    ];
}

const cards: CardProps[] = [
    {
        title: "Static Skyblock | 2,000+ Unique Players",
        description: "We are proud to announce that Static Skyblock Season 2.0 has reached a major milestone of 2,000+ unique players!",
        imageSrc: wz1,
        date: "Feb 8, 2025",
        layout: "horizontal",
        href: "/article/skyblock-season-2-2k-players"
    },
    {
        title: "Static Skyblock | Season 2.0",
        description: "We are excited to announce the launch of Static Skyblock Season 2.0! This season brings hundreds of changes, increases the grind, and most notably adds PvP!",
        imageSrc: skyblockSpawn,
        date: "Aug 8, 2025",
        layout: "vertical",
        href: "/article/skyblock-season-2"
    },
    {
        title: "Static Skyblock | Season 1.0",
        description: "After more than a year of active development, Static Skyblock Season 1.0 goes live! This release brings numerous changes - be sure to check them out!",
        imageSrc: skyblockSpawn,
        date: "May 30, 2025",
        layout: "vertical",
        href: "/article/skyblock-season-1"
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

//todo: advertise the store - display featured store items
export default function Home() {
    // Add this in your Home component
    useEffect(() => {
        const structuredData = {
            "@context": "https://schema.org",
            "@type": "VideoGame",
            "name": "Static Studios",
            "description": "Experience the ultimate Minecraft server with custom gameplay, unique features, and an amazing community!",
            "genre": "Sandbox, Survival",
            "gamePlatform": "Minecraft Java Edition",
            "offers": {
                "@type": "Offer",
                "availability": "https://schema.org/InStock"
            }
        };

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.text = JSON.stringify(structuredData);
        document.head.appendChild(script);

        return () => {
            document.head.removeChild(script);
        };
    }, []);

    return (
        <>
            <link rel="canonical" href="https://staticstudios.net/"/>
            <HeroV2 title={[{content: "Welcome to"}, {content: "Static Studios", highlighted: true}]}
                    subtitle="Experience the ultimate Minecraft server with custom gameplay, unique features, and an amazing community"/>
            <div className="mx-2">
                <div className="container flex grow my-8 text-lg mx-auto flex-col gap-8">
                    <h1>Latest News & Updates</h1>
                    <Card {...cards[0]} index={0}/>
                    <div className="grid grid-cols-1 md:grid-cols-3 flex-wrap gap-8">
                        {cards.slice(1).map((card, index) => (
                            <Card key={index} {...card} index={index + 1}/>
                        ))}
                    </div>
                </div>
            </div>
            {/*<div className="bg-slate-900 py-8 px-2">*/}
            {/*    <div className="container mx-auto">*/}
            {/*        <h1>Featured Store Items</h1>*/}
            {/*    </div>*/}
            {/*</div>*/}
            <div className="py-8 px-2">
                <div className="container mx-auto flex flex-col gap-8">
                    <h1>Quick Links</h1>
                    <div className="flex flex-col md:flex-row gap-6">
                        <QuickLink title="Vote Rewards" description="Vote daily for awesome in-game rewards and help trigger vote
                                parties!" icon={<StarIcon className=""/>} href="/vote"/>
                        <QuickLink title="Join Discord"
                                   description="Connect with our community, get support, and stay updated on server news."
                                   icon={<UsersIcon className=""/>} href="/discord"/>
                        <QuickLink title="Server Rules"
                                   description="Review our server rules to ensure a positive experience for everyone"
                                   icon={<ClockIcon className=""/>} href="/rules"/>
                        <QuickLink title="Store"
                                   description="Browse our selection of ranks, bundles, and items to enhance your gameplay."
                                   icon={<ShoppingCartIcon className=""/>} href="/store"/>
                    </div>
                </div>
            </div>
        </>
    );
}

const QuickLink = ({title, description, icon, href}: {
    title: string,
    description: string,
    icon: ReactNode,
    href: string
}) => {
    return (
        <Link to={href}
              className="bg-slate-800/70 hover:bg-slate-800/90 transition-colors border border-indigo-800/50 rounded-lg p-4 flex flex-col gap-2 flex-1">
            <div className="text-purple-400 [&_svg]:size-8 mb-2">
                {icon}
            </div>
            <h4>{title}</h4>
            <p className="text-white/70">{description}</p>
        </Link>
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
             className={`flex md:data-[layout=horizontal]:flex-row flex-col border-indigo-800/50 border rounded-lg overflow-hidden bg-slate-800/70 opacity-0 animate-fade-in-up`}
             style={{
                 animationDelay: (index + 1) * 0.3 + "s"
             }}>
            <img data-layout={layout} src={imageSrc} alt={title}
                 className="md:data-[layout=horizontal]:w-[50%] object-cover h-[250px]"/>
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