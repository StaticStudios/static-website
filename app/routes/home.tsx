import type {Route} from "../+types/root";
import wz1 from "~/assets/skyblock/wz1.png";
import skyblockSpawn from "~/assets/skyblock/spawn.png";
import skyblockSpawnSneakPeak from "~/assets/skyblock/spawn_sneak_peak.png";
import skyblockOasis from "~/assets/skyblock/oasis_1.png";
import mine from "~/assets/skyblock/mine.png";
import wz2 from "~/assets/skyblock/wz2.png";
import prisonCherryMine from "~/assets/prison/cherry_mine.png";
import {type ReactNode, useEffect} from "react";
import {HeroV2} from "~/components/hero";
import {
    ArrowRightIcon,
    CalendarIcon,
    ShoppingCartIcon,
    SparklesIcon,
    StarIcon,
    TrophyIcon,
    UsersIcon
} from "lucide-react";
import {Link} from "react-router";

export function meta({}: Route.MetaArgs) {
    return [
        {title: "Static | Custom Minecraft Skyblock & Prison Server"},
        {
            name: "description",
            content: "Join Static, a custom Minecraft Java server featuring Skyblock and Prison with custom enchants, quests, PvP warzones, an auction house, and 2,000+ players. IP: play.staticstudios.net"
        },
        {
            name: "keywords",
            content: "static minecraft server, minecraft server, skyblock server, minecraft skyblock, prison server, minecraft prison, custom enchants, minecraft quests, pvp server, minecraft community, minecraft java server, play.staticstudios.net"
        },
        {name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1"},
        {property: "og:title", content: "Static | Custom Minecraft Skyblock & Prison Server"},
        {
            property: "og:description",
            content: "Join 2,000+ players on Static, a custom Minecraft Java server with Skyblock, Prison, custom enchants, PvP, quests, and more. IP: play.staticstudios.net"
        },
        {property: "og:type", content: "website"},
        {property: "og:image", content: "https://staticstudios.net/image/skyblock.png"},
        {property: "og:image:width", content: "1200"},
        {property: "og:image:height", content: "630"},
        {property: "og:image:alt", content: "Static Minecraft server - custom Skyblock and Prison"},
        {property: "og:url", content: "https://staticstudios.net"},
        {property: "og:site_name", content: "Static"},
        {property: "og:locale", content: "en_US"},
        {name: "twitter:card", content: "summary_large_image"},
        {name: "twitter:title", content: "Static | Custom Minecraft Skyblock & Prison Server"},
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
        description: "Static is back and we've released a brand new Skyblock server! Join our Discord to apply for beta access.",
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
                "name": "Static Minecraft Server",
                "description": "Static is a Minecraft Java Edition server network featuring custom Skyblock and Prison gamemodes with custom enchants, quests, PvP warzones, an auction house, and a community of 2,000+ unique players.",
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
                        "name": "What is Static?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Static is a Minecraft Java Edition server network featuring custom Skyblock and Prison gamemodes. Join at play.staticstudios.net."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "What is the Static server IP?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "The server IP is play.staticstudios.net. Static supports Minecraft Java Edition."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "What gamemodes does Static offer?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Static offers custom Skyblock with island quests, custom enchants, an auction house, and PvP warzones, as well as Prison with custom enchants, pets, and fast-paced progression."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Is Static free to play?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Yes, Static is free to play. There is an optional store with ranks, bundles, and cosmetic items."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "How many players does Static have?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Static has over 2,000 unique players and a growing community on Discord."
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
            <HeroV2 title={[{content: "Welcome to"}, {content: "Static", highlighted: true}]}
                    subtitle="Experience the ultimate Minecraft server with custom gameplay, unique features, and an amazing community."/>
            <main className="relative overflow-hidden">
                <div
                    className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[760px] bg-[radial-gradient(circle_at_12%_5%,rgba(124,58,237,0.19),transparent_34%),radial-gradient(circle_at_88%_34%,rgba(79,70,229,0.16),transparent_30%)]"/>

                <section className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
                    <SectionHeading
                        eyebrow="From the network"
                        title="Latest news & updates"
                        description="The latest and greatest from Static including: new seasons, community milestones, server updates, and more."
                    />
                    <div className="mt-10 space-y-7">
                        <Card {...cards[0]} index={0}/>
                        <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
                            {cards.slice(1).map((card, index) => (
                                <Card key={card.title} {...card} index={index + 1}/>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="relative border-y border-white/8 bg-slate-950/25 py-20 sm:py-24">
                    <div
                        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-80 w-[50rem] -translate-x-1/2 rounded-full bg-purple-600/10 blur-3xl"/>
                    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                        <SectionHeading
                            eyebrow="Your adventure"
                            title="Everything you need"
                            description="Jump back into the action, earn rewards, and connect with the community."
                        />
                        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                            <QuickLink title="Vote Rewards"
                                       description="Vote daily for awesome in-game rewards and help trigger vote parties!"
                                       icon={<StarIcon/>} href="/vote"/>
                            <QuickLink title="Join Discord"
                                       description="Connect with our community, get support, and stay updated on server news."
                                       icon={<UsersIcon/>} href="/discord"/>
                            <QuickLink title="Seasonal Rewards"
                                       description="Compete for store gift cards and exclusive tags at the end of each season."
                                       icon={<TrophyIcon/>} href="/seasonal-rewards"/>
                            <QuickLink title="Store"
                                       description="Browse ranks, bundles, and items designed to enhance your gameplay."
                                       icon={<ShoppingCartIcon/>} href="/store"/>
                        </div>
                    </div>
                </section>

                <section className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
                    <div
                        className="relative isolate overflow-hidden rounded-3xl border border-purple-300/15 bg-[linear-gradient(120deg,rgba(76,29,149,0.72),rgba(30,41,95,0.75))] px-6 py-12 shadow-[0_30px_90px_rgba(15,10,45,0.45)] sm:px-10 lg:flex lg:items-center lg:justify-between lg:px-14">
                        <div className="hero-grid absolute inset-0 -z-10 opacity-25"/>
                        <div
                            className="absolute -right-24 -top-24 -z-10 size-72 rounded-full bg-fuchsia-400/20 blur-3xl"/>
                        <div className="max-w-2xl">
                            <div
                                className="mb-4 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-purple-200">
                                <SparklesIcon className="size-4"/>
                                Ready when you are
                            </div>
                            <h2 className="text-balance text-3xl font-black tracking-tight text-white sm:text-4xl">Your
                                island is waiting.</h2>
                            <p className="mt-4 text-lg leading-8 text-purple-100/75">Join thousands of players building,
                                competing, and creating their story on Static.</p>
                        </div>
                        <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:mt-0 lg:pl-10">
                            <Link to="/discord"
                                  className="inline-flex h-12 items-center justify-center whitespace-nowrap rounded-xl bg-white px-5 font-bold text-indigo-950 transition hover:-translate-y-0.5 hover:bg-purple-50">
                                Join the community
                            </Link>
                            <Link to="/store"
                                  className="inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-white/15 bg-white/8 px-5 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/14">
                                Visit the store <ArrowRightIcon className="size-4"/>
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}

const SectionHeading = ({eyebrow, title, description}: {
    eyebrow: string,
    title: string,
    description: string
}) => (
    <div className="max-w-2xl">
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-purple-300">{eyebrow}</p>
        <h2 className="text-balance text-4xl font-black tracking-[-0.035em] text-white sm:text-5xl">{title}</h2>
        <p className="mt-4 text-lg leading-8 text-slate-300">{description}</p>
    </div>
);

const QuickLink = ({title, description, icon, href}: {
    title: string,
    description: string,
    icon: ReactNode,
    href: string
}) => {
    return (
        <Link to={href}
              className="group relative flex min-h-64 flex-col overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(145deg,rgba(30,41,75,0.82),rgba(15,23,54,0.72))] p-6 shadow-xl shadow-slate-950/15 transition duration-300 hover:-translate-y-1 hover:border-purple-400/35 hover:shadow-[0_24px_65px_rgba(30,20,75,0.35)]">
            <div
                className="absolute -right-12 -top-12 size-32 rounded-full bg-purple-500/8 blur-2xl transition-colors group-hover:bg-purple-500/18"/>
            <div className="mb-auto flex items-start justify-between">
                <div
                    className="grid size-12 place-items-center rounded-xl border border-purple-300/15 bg-purple-500/12 text-purple-300 shadow-inner [&_svg]:size-6">
                    {icon}
                </div>
                <ArrowRightIcon
                    className="size-5 text-slate-500 transition duration-300 group-hover:translate-x-1 group-hover:text-purple-300"/>
            </div>
            <h3 className="mt-7 text-xl font-bold text-white">{title}</h3>
            <p className="mt-2 leading-7 text-slate-400 transition-colors group-hover:text-slate-300">{description}</p>
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
    return (
        <article data-layout={layout}
                 className="group grid overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(145deg,rgba(30,41,73,0.78),rgba(15,23,50,0.82))] opacity-0 shadow-xl shadow-slate-950/20 transition duration-300 hover:-translate-y-1 hover:border-purple-400/30 hover:shadow-[0_28px_80px_rgba(15,10,45,0.45)] motion-safe:animate-fade-in-up motion-reduce:opacity-100 md:data-[layout=horizontal]:grid-cols-[1.25fr_1fr]"
                 style={{
                     animationDelay: (index + 1) * 0.1 + "s"
                 }}>
            <div data-layout={layout}
                 className="relative h-56 overflow-hidden md:data-[layout=horizontal]:h-full md:data-[layout=horizontal]:min-h-[390px]">
                <img src={imageSrc} alt={title} loading={index === 0 ? "eager" : "lazy"} decoding="async"
                     className="size-full object-cover transition duration-700 ease-out group-hover:scale-[1.045]"/>
                <div
                    className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent md:data-[layout=horizontal]:bg-gradient-to-r md:data-[layout=horizontal]:from-transparent md:data-[layout=horizontal]:to-slate-950/25"/>
                {layout === "horizontal" && (
                    <span
                        className="absolute left-5 top-5 rounded-full border border-white/15 bg-slate-950/60 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-purple-200 backdrop-blur-md">
                        Featured content
                    </span>
                )}
            </div>
            <div data-layout={layout}
                 className="flex flex-col p-6 md:data-[layout=horizontal]:justify-center md:data-[layout=horizontal]:p-10">
                <div className="flex items-center gap-2 text-sm font-medium text-purple-200/70">
                    <CalendarIcon className="size-4"/>
                    <time>{date}</time>
                </div>
                <h3 data-layout={layout}
                    className="mt-4 text-xl font-bold leading-tight text-white md:data-[layout=horizontal]:text-3xl">{title}</h3>
                <p data-layout={layout}
                   className="mt-3 line-clamp-3 leading-7 text-slate-400 md:data-[layout=horizontal]:line-clamp-none md:data-[layout=horizontal]:text-lg">{description}</p>
                <div className="mt-6">
                    {href ? (
                        <Link to={href}
                              className="inline-flex items-center gap-2 font-bold text-purple-300 transition-colors hover:text-purple-200">
                            Read the update
                            <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1"/>
                        </Link>
                    ) : (
                        <span className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">From the archive</span>
                    )}
                </div>
            </div>
        </article>
    )
}
