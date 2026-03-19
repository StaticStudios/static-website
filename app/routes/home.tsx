import type {Route} from "../+types/root";
import wz1 from "~/assets/skyblock/wz1.png";
import skyblockSpawn from "~/assets/skyblock/spawn.png";
import skyblockSpawnSneakPeak from "~/assets/skyblock/spawn_sneak_peak.png";
import skyblockOasis from "~/assets/skyblock/oasis_1.png";
import mine from "~/assets/skyblock/mine.png";
import wz2 from "~/assets/skyblock/wz2.png";
import prisonCherryMine from "~/assets/prison/cherry_mine.png";
import React, {type ReactNode, useEffect} from "react";
import {HeroV2} from "~/components/hero";
import {CalendarIcon, ClockIcon, ShoppingCartIcon, StarIcon, UsersIcon} from "lucide-react";
import {Button} from "~/components/ui/button";
import {Link, useNavigate} from "react-router";

export function meta({}: Route.MetaArgs) {
    return [
        {title: "Static Studios | Best Minecraft Skyblock & Prison Server 2025"},
        {
            name: "description",
            content: "Join Static Studios — a premium Minecraft Java server featuring custom Skyblock and Prison gamemodes with custom enchants, quests, PvP warzones, auction house, and 2,000+ active players. IP: play.staticstudios.net"
        },
        {
            name: "keywords",
            content: "minecraft server, best minecraft server, skyblock server, minecraft skyblock, prison server, minecraft prison, custom enchants, minecraft quests, pvp server, minecraft community, static studios, minecraft java server, minecraft server 2025, top minecraft servers, minecraft server list, play.staticstudios.net"
        },
        {name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1"},
        {property: "og:title", content: "Static Studios | Best Minecraft Skyblock & Prison Server"},
        {
            property: "og:description",
            content: "Join 2,000+ players on Static Studios — a premium Minecraft Java server with custom Skyblock and Prison gamemodes, custom enchants, PvP, quests, and more. IP: play.staticstudios.net"
        },
        {property: "og:type", content: "website"},
        {property: "og:image", content: "https://staticstudios.net/image/skyblock.png"},
        {property: "og:image:width", content: "1200"},
        {property: "og:image:height", content: "630"},
        {property: "og:image:alt", content: "Static Studios Minecraft Server - Custom Skyblock and Prison"},
        {property: "og:url", content: "https://staticstudios.net"},
        {property: "og:site_name", content: "Static Studios"},
        {property: "og:locale", content: "en_US"},
        {name: "twitter:card", content: "summary_large_image"},
        {name: "twitter:title", content: "Static Studios | Best Minecraft Skyblock & Prison Server"},
        {
            name: "twitter:description",
            content: "Join 2,000+ players on a premium Minecraft Java server with custom Skyblock and Prison. Custom enchants, PvP, quests & more. IP: play.staticstudios.net"
        },
        {name: "twitter:image", content: "https://staticstudios.net/image/skyblock.png"},
    ];
}

const cards: CardProps[] = [
    {
        title: "Static Prison | Season 1.0",
        description: "We are excited to announce the launch of Static Prison Season 1.0! This release brings a new prison gamemode with custom enchants, fast-paced progression, pets, and more!",
        imageSrc: prisonCherryMine,
        date: "March 13, 2026",
        layout: "horizontal",
        href: "/article/prison-season-1"
    },
    {
        title: "Static Skyblock | 2,000+ Unique Players",
        description: "We are proud to announce that Static Skyblock Season 2.0 has reached a major milestone of 2,000+ unique players!",
        imageSrc: wz1,
        date: "Feb 8, 2026",
        layout: "vertical",
        href: "/article/skyblock-season-2-2k-players"
    },
    {
        title: "Static Skyblock | Season 2.0",
        description: "We are excited to announce the launch of Static Skyblock Season 2.0! This season brings hundreds of changes, increases the grind, and most notably adds PvP!",
        imageSrc: wz2,
        date: "Aug 8, 2025",
        layout: "vertical",
        href: "/article/skyblock-season-2"
    },
    {
        title: "Static Skyblock | Season 1.0",
        description: "After more than a year of active development, Static Skyblock Season 1.0 goes live! This release brings numerous changes - be sure to check them out!",
        imageSrc: mine,
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
    useEffect(() => {
        const structuredData = [
            {
                "@context": "https://schema.org",
                "@type": "VideoGame",
                "name": "Static Studios Minecraft Server",
                "description": "Static Studios is a premium Minecraft Java Edition server network featuring custom Skyblock and Prison gamemodes with custom enchants, quests, PvP warzones, an auction house, and an active community of 2,000+ unique players.",
                "genre": ["Sandbox", "Survival", "Skyblock", "Prison"],
                "gamePlatform": "Minecraft Java Edition",
                "playMode": "MultiPlayer",
                "numberOfPlayers": {
                    "@type": "QuantitativeValue",
                    "minValue": 1,
                    "maxValue": 500
                },
                "url": "https://staticstudios.net",
                "image": "https://staticstudios.net/image/skyblock.png",
                "offers": {
                    "@type": "Offer",
                    "availability": "https://schema.org/InStock",
                    "price": "0",
                    "priceCurrency": "USD",
                    "description": "Free to play Minecraft server with optional in-game store"
                },
                "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "4.8",
                    "ratingCount": "2000",
                    "bestRating": "5"
                }
            },
            {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": [
                    {
                        "@type": "Question",
                        "name": "What is Static Studios?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Static Studios is a premium Minecraft Java Edition server network featuring custom Skyblock and Prison gamemodes. Join at play.staticstudios.net."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "What is the Static Studios server IP?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "The server IP is play.staticstudios.net. Static Studios supports Minecraft Java Edition."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "What gamemodes does Static Studios offer?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Static Studios offers custom Skyblock with island quests, custom enchants, an auction house, and PvP warzones, as well as Prison with custom enchants, pets, and fast-paced progression."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Is Static Studios free to play?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Yes, Static Studios is completely free to play. There is an optional store with ranks and cosmetic items, but no pay-to-win mechanics."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "How many players does Static Studios have?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Static Studios has over 2,000 unique players and a growing community on Discord."
                        }
                    }
                ]
            }
        ];

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
        <article data-layout={layout}
             className={`flex md:data-[layout=horizontal]:flex-row flex-col border-indigo-800/50 border rounded-lg overflow-hidden bg-slate-800/70 opacity-0 animate-fade-in-up`}
             style={{
                 animationDelay: (index + 1) * 0.3 + "s"
             }}>
            <img data-layout={layout} src={imageSrc} alt={title}
                 className="md:data-[layout=horizontal]:w-[50%] object-cover h-[250px]"/>
            <div className="flex flex-col gap-4 p-4 flex-1">
                <div className="flex flex-row gap-1 items-center text-white/70">
                    <CalendarIcon className="size-5"/>
                    <time className="text-sm">{date}</time>
                </div>
                <h2 className="text-xl font-bold">{title}</h2>
                <p className="text-white/70">{description}</p>
                <Button disabled={href == undefined} variant="secondary" className="w-min mt-auto" onClick={() => {
                    if (href) {
                        navigate(href);
                    }
                }}>Read More</Button>
            </div>
        </article>
    )
}