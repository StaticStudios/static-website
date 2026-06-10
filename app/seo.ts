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
        slug: "prison-season-1",
        metaTitle: "Prison Season 1.0 Launch - Custom Enchants, Pets & More",
        description: "Static Prison Season 1.0 launches with custom enchants, pets, fast-paced progression, and unique mines. Join the newest gamemode on Static Studios at play.staticstudios.net.",
        ogDescription: "Static Prison Season 1.0 launches with custom enchants, pets, fast-paced progression, and unique mines.",
        date: "2026-03-13",
        ogImage: "https://staticstudios.net/image/md/prison-season-1/static.png",
        breadcrumbName: "Prison Season 1.0",
    },
    {
        slug: "skyblock-season-2-2k-players",
        metaTitle: "Skyblock Reaches 2,000+ Unique Players",
        description: "Static Skyblock Season 2.0 has reached over 2,000 unique players! Learn about this milestone for the Static Studios Minecraft server community.",
        ogDescription: "A major milestone — Static Skyblock Season 2.0 has reached over 2,000 unique players.",
        date: "2026-02-08",
        ogImage: "https://staticstudios.net/image/skyblock.png",
        breadcrumbName: "Static Skyblock - 2,000+ Unique Players",
    },
    {
        slug: "skyblock-season-2",
        metaTitle: "Skyblock Season 2.0 - PvP Warzones, New Features & More",
        description: "Static Skyblock Season 2.0 brings PvP warzones, hundreds of gameplay changes, increased progression, and more to Static Studios. Join at play.staticstudios.net.",
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
                slug: "power",
                metaTitle: "Skyblock Power",
                description: "",
                ogDescription: "",
                date: "",
                ogImage: "https://staticstudios.net/image/skyblock.png",
                breadcrumbName: "Power",
            },
            {
                slug: "workbench",
                metaTitle: "Skyblock Workbench",
                description: "",
                ogDescription: "",
                date: "",
                ogImage: "https://staticstudios.net/image/skyblock.png",
                breadcrumbName: "Workbench",
            },
            {
                slug: "water",
                metaTitle: "Water Items",
                description: "",
                ogDescription: "",
                date: "",
                ogImage: "https://staticstudios.net/image/skyblock.png",
                breadcrumbName: "Water Items",
            },
            {
                slug: "tnt-spawners",
                metaTitle: "TNT Spawners",
                description: "",
                ogDescription: "",
                date: "",
                ogImage: "https://staticstudios.net/image/skyblock.png",
                breadcrumbName: "TNT Spawners",
            },
            {
                slug: "item-management",
                metaTitle: "Item Management",
                description: "",
                ogDescription: "",
                date: "",
                ogImage: "https://staticstudios.net/image/skyblock.png",
                breadcrumbName: "Item Management",
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
    {path: "/partnerships", changefreq: "monthly", priority: 0.6},
    {path: "/rules/skyblock", changefreq: "monthly", priority: 0.5},
    {path: "/rules/prison", changefreq: "monthly", priority: 0.5},
    {path: "/tos", changefreq: "yearly", priority: 0.3},
    {path: "/privacy", changefreq: "yearly", priority: 0.3},
];

export const wikiIndexPage: WikiPage = {
    slug: "index",
    metaTitle: "Static Studios Wiki",
    description: "Browse the Static Studios wiki for server guides, gameplay systems, and helpful information.",
    ogDescription: "Browse the Static Studios wiki for server guides, gameplay systems, and helpful information.",
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

    return `# Static Studios - Minecraft Server

> Static Studios is a premium Minecraft Java Edition server network featuring custom Skyblock and Prison gamemodes with unique gameplay mechanics, active development, and a thriving community.

## Server Details

- **Server IP:** play.staticstudios.net
- **Platform:** Minecraft Java Edition
- **Website:** ${SITE_URL}
- **Discord:** https://discord.gg/9S6K9E5
- **Contact:** support@staticstudios.net

## Gamemodes

### Skyblock
Static Skyblock is a fully custom Skyblock experience featuring custom enchants, an auction house, island quests, island upgrades, daily challenges, PvP warzones, and much more. Currently on Season 2.0 with 2,000+ unique players.

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

## Why Choose Static Studios

Static Studios stands out among Minecraft servers for its commitment to custom gameplay, regular content updates, and community-first approach. The server has grown to over 2,000 unique players and continues to expand with new gamemodes and features. The development team actively listens to community feedback and delivers frequent, meaningful updates.

## Links

- Store: ${SITE_URL}/store
- Vote: ${SITE_URL}/vote
- Rules: ${SITE_URL}/rules

## Articles

${articleLinks}

## Wiki

${wikiLinks}
`;
}