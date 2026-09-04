export interface Article {
    slug: string;
    metaTitle: string;
    description: string;
    ogDescription: string;
    date: string;
    ogImage: string;
    breadcrumbName: string;
}

export interface WikiPage {
    slug: string;
    metaTitle: string;
    description: string;
    ogDescription: string;
    date: string;
    ogImage: string;
    breadcrumbName: string;
}

export interface WikiCategory {
    slug: string;
    breadcrumbName: string;
    index: WikiPage;
    pages: WikiPage[];
}

export const SITE_URL = "https://staticstudios.net";

export const articles: Article[] = [
    {
        slug: "skyblock-season-3",
        metaTitle: "Skyblock Season 3 - Automation, Robots & Island Leaderboards",
        description: "Static Skyblock Season 3 launches September 4, 2026 at 3 PM Eastern. Build automated production lines and compete for weekly points, monthly prizes, and season titles.",
        ogDescription: "Power your island with machines and robots, turn production into island value, and race for monthly prizes and Season 3 leaderboard titles.",
        date: "2026-09-04",
        ogImage: "https://staticstudios.net/image/skyblock3_trailer_thumbnail.png",
        breadcrumbName: "Skyblock Season 3",
    },
    {
        slug: "prison-season-1",
        metaTitle: "Prison Season 1.0 Launch - Custom Enchants, Pets & More",
        description: "Static Prison Season 1.0 launches with custom enchants, pets, fast-paced progression, and unique mines. Join at play.staticstudios.net.",
        ogDescription: "Static Prison Season 1.0 launches with custom enchants, pets, fast-paced progression, and unique mines.",
        date: "2026-03-13",
        ogImage: "https://staticstudios.net/image/md/prison-season-1/static.png",
        breadcrumbName: "Prison Season 1.0",
    },
    {
        slug: "skyblock-season-2-2k-players",
        metaTitle: "Skyblock Reaches 2,000+ Unique Players",
        description: "Static Skyblock Season 2.0 has reached over 2,000 unique players! Learn about this milestone for the Static Minecraft server community.",
        ogDescription: "A major milestone — Static Skyblock Season 2.0 has reached over 2,000 unique players.",
        date: "2026-02-08",
        ogImage: "https://staticstudios.net/image/skyblock.png",
        breadcrumbName: "Static Skyblock - 2,000+ Unique Players",
    },
    {
        slug: "skyblock-season-2",
        metaTitle: "Skyblock Season 2.0 - PvP Warzones, New Features & More",
        description: "Static Skyblock Season 2.0 brings PvP warzones, hundreds of gameplay changes, increased progression, and more to Static. Join at play.staticstudios.net.",
        ogDescription: "Season 2.0 brings PvP warzones, hundreds of changes, and increased progression to Static Skyblock.",
        date: "2025-08-08",
        ogImage: "https://staticstudios.net/image/skyblock.png",
        breadcrumbName: "Skyblock Season 2.0",
    },
    {
        slug: "skyblock-season-1",
        metaTitle: "Skyblock Season 1.0 Launch - Custom Islands, Enchants & Economy",
        description: "Static Skyblock Season 1.0 is live after a year of development. Featuring island quests, custom enchants, auction house, daily challenges, and more at play.staticstudios.net.",
        ogDescription: "Static Skyblock Season 1.0 is live with island quests, custom enchants, auction house, and more.",
        date: "2025-05-30",
        ogImage: "https://staticstudios.net/image/md/skyblock-season-1/static.png",
        breadcrumbName: "Skyblock Season 1.0",
    },
];

export const wikiPages: WikiCategory[] = [
    {
        slug: "skyblock",
        breadcrumbName: "Skyblock",
        index: {
            slug: "index",
            metaTitle: "Static Skyblock Wiki",
            description: "Learn about Static Skyblock features, progression, systems, and gameplay mechanics.",
            ogDescription: "Learn about Static Skyblock features, progression, systems, and gameplay mechanics.",
            date: "",
            ogImage: "https://staticstudios.net/image/skyblock.png",
            breadcrumbName: "Skyblock",
        },
        pages: [
            {
                slug: "leaderboards",
                metaTitle: "Skyblock Island Leaderboards",
                description: "Learn how Static Skyblock's weekly, monthly, and seasonal island-value leaderboards work, including points, resets, rewards, and eligibility.",
                ogDescription: "Understand the Static Skyblock Island Leaderboard, weekly scoring, monthly resets, seasonal standings, and rewards.",
                date: "",
                ogImage: "https://staticstudios.net/image/skyblock.png",
                breadcrumbName: "Island Leaderboards",
            },
            {
                slug: "power",
                metaTitle: "Skyblock Power",
                description: "Learn how Static Skyblock power generators, cables, transmitters, switches, and generator limits work.",
                ogDescription: "Understand the complete power system in Static Skyblock, from generators to transmitters and switches.",
                date: "",
                ogImage: "https://staticstudios.net/image/skyblock.png",
                breadcrumbName: "Power",
            },
            {
                slug: "workbench",
                metaTitle: "Skyblock Workbench",
                description: "Learn how to use the custom Static Skyblock workbench, understand its model, and troubleshoot missing recipe items.",
                ogDescription: "Learn how the custom workbench and recipe system works in Static Skyblock.",
                date: "",
                ogImage: "https://staticstudios.net/image/skyblock.png",
                breadcrumbName: "Workbench",
            },
            {
                slug: "water",
                metaTitle: "Water Items",
                description: "Explore Static Skyblock water pumps, pipes, sprinklers, and switches, including recipes and setup guidance.",
                ogDescription: "Learn how water pumps, pipes, sprinklers, and switches work in Static Skyblock.",
                date: "",
                ogImage: "https://staticstudios.net/image/skyblock.png",
                breadcrumbName: "Water Items",
            },
            {
                slug: "tnt-spawners",
                metaTitle: "TNT Spawners",
                description: "Learn how TNT Spawners work in Static Skyblock and how to use them effectively on your island.",
                ogDescription: "Learn how to use TNT Spawners in Static Skyblock.",
                date: "",
                ogImage: "https://staticstudios.net/image/skyblock.png",
                breadcrumbName: "TNT Spawners",
            },
            {
                slug: "item-management",
                metaTitle: "Item Management",
                description: "Learn how Static Skyblock hoppers, chunk hoppers, item filters, overflow handling, and chunk systems work.",
                ogDescription: "Explore hoppers, chunk hoppers, filters, and item routing in Static Skyblock.",
                date: "",
                ogImage: "https://staticstudios.net/image/skyblock.png",
                breadcrumbName: "Item Management",
            },
        ],
    },
    {
        slug: "misc",
        breadcrumbName: "Miscellaneous",
        index: {
            slug: "index",
            metaTitle: "Static Miscellaneous Wiki",
            description: "Browse network-wide Static guides for gift cards, commands, and other shared server features.",
            ogDescription: "Browse guides for gift cards, commands, and other features shared across Static.",
            date: "",
            ogImage: "https://staticstudios.net/image/skyblock.png",
            breadcrumbName: "Miscellaneous",
        },
        pages: [
            {
                slug: "gift-cards",
                metaTitle: "Gift Cards",
                description: "Learn how to use /gc to redeem and withdraw gift cards, find withdrawn codes, pay players, and apply gift cards in the Static store cart.",
                ogDescription: "Learn how to use /gc, retrieve withdrawn gift card codes, and apply them in the Static store cart.",
                date: "",
                ogImage: "https://staticstudios.net/image/skyblock.png",
                breadcrumbName: "Gift Cards",
            },
        ],
    },
];

export interface SiteRoute {
    path: string;
    changefreq: string;
    priority: number;
}

export const staticRoutes: SiteRoute[] = [
    {path: "/", changefreq: "weekly", priority: 1.0},
    {path: "/store", changefreq: "weekly", priority: 0.9},
    {path: "/vote", changefreq: "monthly", priority: 0.7},
    {path: "/rules", changefreq: "monthly", priority: 0.6},
    {path: "/rules/skyblock", changefreq: "monthly", priority: 0.5},
    {path: "/rules/prison", changefreq: "monthly", priority: 0.5},
    {path: "/seasonal-rewards", changefreq: "monthly", priority: 0.7},
    {path: "/seasonal-rewards/skyblock", changefreq: "monthly", priority: 0.6},
    {path: "/seasonal-rewards/prison", changefreq: "monthly", priority: 0.6},
    {path: "/tos", changefreq: "yearly", priority: 0.3},
    {path: "/privacy", changefreq: "yearly", priority: 0.3},
];

export const wikiIndexPage: WikiPage = {
    slug: "index",
    metaTitle: "Static Wiki",
    description: "Browse the Static wiki for server guides, gameplay systems, and helpful information.",
    ogDescription: "Browse the Static wiki for server guides, gameplay systems, and helpful information.",
    date: "",
    ogImage: "https://staticstudios.net/image/skyblock.png",
    breadcrumbName: "Wiki",
};

export function getAllWikiPages() {
    return [
        {
            category: undefined,
            page: wikiIndexPage,
            path: "/wiki",
            isRootIndex: true,
            isCategoryIndex: false,
        },
        ...wikiPages.flatMap(category => [
            {
                category,
                page: category.index,
                path: `/wiki/${category.slug}`,
                isRootIndex: false,
                isCategoryIndex: true,
            },
            ...category.pages.map(page => ({
                category,
                page,
                path: `/wiki/${category.slug}/${page.slug}`,
                isRootIndex: false,
                isCategoryIndex: false,
            })),
        ]),
    ];
}

export function getAllPrerenderPaths(): string[] {
    return [
        ...staticRoutes.map(r => r.path),
        ...articles.map(a => `/article/${a.slug}`),
        ...getAllWikiPages().map(w => w.path),
    ];
}

export function generateSitemap(): string {
    const urls = [
        ...staticRoutes.map(r =>
            `  <url>\n    <loc>${SITE_URL}${r.path}</loc>\n    <changefreq>${r.changefreq}</changefreq>\n    <priority>${r.priority}</priority>\n  </url>`
        ),
        ...articles.map(a =>
            `  <url>\n    <loc>${SITE_URL}/article/${a.slug}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>`
        ),
        ...getAllWikiPages().map(w =>
            `  <url>\n    <loc>${SITE_URL}${w.path}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.6</priority>\n  </url>`
        ),
    ];

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>
`;
}

export function generateLlmsTxt(): string {
    const articleLinks = articles
        .map(a => `- ${a.breadcrumbName}: ${SITE_URL}/article/${a.slug}`)
        .join("\n");

    const wikiLinks = getAllWikiPages()
        .map(w => {
            if (!w.category) {
                return `- ${w.page.breadcrumbName}: ${SITE_URL}${w.path}`;
            }

            if (w.isCategoryIndex) {
                return `- ${w.category.breadcrumbName}: ${SITE_URL}${w.path}`;
            }

            return `- ${w.category.breadcrumbName} / ${w.page.breadcrumbName}: ${SITE_URL}${w.path}`;
        })
        .join("\n");

    return `# Static - Minecraft Server

> Static is a Minecraft Java Edition server network featuring custom Skyblock and Prison gamemodes with unique gameplay mechanics, active development, and a thriving community. Static is operated by Static Studios.

## Server Details

- **Server IP:** play.staticstudios.net
- **Platform:** Minecraft Java Edition
- **Website:** ${SITE_URL}
- **Discord:** https://discord.gg/9S6K9E5
- **Contact:** support@staticstudios.net

## Gamemodes

### Skyblock
Static Skyblock Season 3 launches September 4, 2026 at 3 PM Eastern, featuring powered automation, robots, island progression, and new weekly, monthly, and seasonal island leaderboards. Build production lines, gain island value, and compete for store gift cards and exclusive season tags.

### Prison
Static Prison is a fast-paced prison gamemode featuring custom enchants, pets, progression systems, mines, and more. Currently on Season 1.0, launched March 2025.

## Key Features

- Custom enchantments system
- Auction house and player-driven economy
- Island quests and upgrades (Skyblock)
- PvP warzones
- Daily challenges and rewards
- Vote rewards system with vote parties
- Active development with frequent updates
- Dedicated community with Discord support
- In-game store with ranks, bundles, and cosmetic items

## Why Choose Static

Static stands out among Minecraft servers for its commitment to custom gameplay, regular content updates, and community-first approach. The server has grown to over 2,000 unique players and continues to expand with new gamemodes and features. The development team actively listens to community feedback and delivers frequent, meaningful updates.

## Links

- Store: ${SITE_URL}/store
- Vote: ${SITE_URL}/vote
- Rules: ${SITE_URL}/rules
- Seasonal Rewards: ${SITE_URL}/seasonal-rewards

## Articles

${articleLinks}

## Wiki

${wikiLinks}
`;
}
