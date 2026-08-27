import type {Route} from "./+types/wiki";
import {type ReactNode, useMemo, useState} from "react";
import {MarkdownPage} from "~/components/markdown-page";
import {LeaderboardResetCountdown} from "~/components/leaderboard-reset-countdown";
import {SITE_URL, type WikiCategory, type WikiPage, wikiPages} from "~/seo";
import {PageShell} from "~/components/page-shell";
import {PageLocation} from "~/components/markdown-page";
import {Link} from "react-router";
import {
    ArrowRightIcon,
    BookOpenIcon,
    BombIcon,
    CloudIcon,
    CreditCardIcon,
    DropletsIcon,
    HammerIcon,
    MessageCircleIcon,
    PackageIcon,
    SearchIcon,
    SparklesIcon,
    TrophyIcon,
    VoteIcon,
    ZapIcon
} from "lucide-react";

const markdownModules = import.meta.glob<string>("../md/wiki/**/*.md", {
    query: "?raw",
    import: "default",
    eager: true,
});

function getWikiCategory(categorySlug: string) {
    return wikiPages.find(category => category.slug === categorySlug);
}

function getWikiPage(categorySlug?: string, pageSlug?: string) {
    if (!categorySlug) {
        return {
            category: undefined,
            page: {
                slug: "index",
                metaTitle: "Static Wiki",
                description: "Browse the Static wiki for server guides, gameplay systems, and helpful information.",
                ogDescription: "Browse the Static wiki for server guides, gameplay systems, and helpful information.",
                date: "",
                ogImage: "https://staticstudios.net/image/skyblock.png",
                breadcrumbName: "Wiki",
            },
            isRootIndex: true,
            isCategoryIndex: false,
        };
    }

    const category = getWikiCategory(categorySlug);

    if (!category) {
        return undefined;
    }

    if (!pageSlug) {
        return {
            category,
            page: category.index,
            isRootIndex: false,
            isCategoryIndex: true,
        };
    }

    const page = category.pages.find(page => page.slug === pageSlug);

    if (!page) {
        return undefined;
    }

    return {
        category,
        page,
        isRootIndex: false,
        isCategoryIndex: false,
    };
}

function getWikiPath(categorySlug?: string, pageSlug?: string) {
    if (!categorySlug) {
        return "/wiki";
    }

    if (!pageSlug) {
        return `/wiki/${categorySlug}`;
    }

    return `/wiki/${categorySlug}/${pageSlug}`;
}

function getMarkdown(categorySlug?: string, pageSlug?: string): string | undefined {
    if (!categorySlug) {
        return markdownModules["../md/wiki/index.md"];
    }

    const markdownSlug = pageSlug ?? "index";

    return markdownModules[`../md/wiki/${categorySlug}/${markdownSlug}.md`];
}

export function meta({params}: Route.MetaArgs) {
    const categorySlug = params.category;
    const pageSlug = params.slug;

    const result = getWikiPage(categorySlug, pageSlug);

    if (!result) {
        return [{title: "Static | Wiki Page Not Found"}];
    }

    const {category, page} = result;
    const path = getWikiPath(
        category?.slug,
        result.isCategoryIndex ? undefined : page.slug,
    );

    return [
        {title: `Static | ${page.metaTitle}`},
        {name: "description", content: page.description},
        {name: "robots", content: "index, follow"},
        {property: "og:title", content: page.metaTitle},
        {property: "og:description", content: page.ogDescription},
        {property: "og:type", content: "article"},
        {property: "og:url", content: `${SITE_URL}${path}`},
        {property: "og:image", content: page.ogImage},
        {property: "og:site_name", content: "Static"},
        {name: "twitter:card", content: "summary_large_image"},
    ];
}

export default function WikiPage({params}: Route.ComponentProps) {
    const categorySlug = params.category;
    const pageSlug = params.slug;

    const result = getWikiPage(categorySlug, pageSlug);
    const markdown = getMarkdown(categorySlug, pageSlug);

    if (!result || !markdown) {
        return <WikiNotFound/>;
    }

    const {category, page, isRootIndex, isCategoryIndex} = result;
    const isLeaderboardPage = category?.slug === "skyblock" && page.slug === "leaderboards";

    if (isRootIndex || isCategoryIndex) {
        return <WikiDirectory category={isCategoryIndex ? category : undefined}/>;
    }

    return (
        <MarkdownPage
            markdown={markdown}
            afterTitle={isLeaderboardPage ? <LeaderboardResetCountdown/> : undefined}
            location={[
                {href: "/", name: "Home"},
                {href: "/wiki", name: "Wiki"},
                ...(!isRootIndex && category
                    ? [
                        {
                            href: `/wiki/${category.slug}`,
                            name: category.breadcrumbName,
                        },
                    ]
                    : []),
                ...(!isRootIndex && !isCategoryIndex && category
                    ? [
                        {
                            href: `/wiki/${category.slug}/${page.slug}`,
                            name: page.breadcrumbName,
                        },
                    ]
                    : []),
            ]}
        />
    );
}

const guideIcons: Record<string, typeof BookOpenIcon> = {
    "leaderboards": TrophyIcon,
    "power": ZapIcon,
    "item-management": PackageIcon,
    "tnt-spawners": BombIcon,
    "water": DropletsIcon,
    "workbench": HammerIcon,
    "gift-cards": CreditCardIcon,
};

const categoryDetails: Record<string, { description: string, icon: typeof BookOpenIcon }> = {
    skyblock: {
        description: "Master island progression, automation, utilities, rankings, and the custom systems that make Static Skyblock unique.",
        icon: CloudIcon,
    },
    misc: {
        description: "Learn about network-wide features, account tools, purchases, and other systems shared across Static.",
        icon: SparklesIcon,
    },
};

type DirectoryGuide = WikiPage & { category: WikiCategory };

const WikiDirectory = ({category}: { category?: WikiCategory }) => {
    const [query, setQuery] = useState("");
    const isRoot = category === undefined;
    const allGuides: DirectoryGuide[] = (category ? [category] : wikiPages)
        .flatMap(currentCategory => currentCategory.pages.map(page => ({...page, category: currentCategory})));
    const filteredGuides = useMemo(() => {
        const normalizedQuery = query.trim().toLowerCase();
        if (!normalizedQuery) return allGuides;

        return allGuides.filter(guide => [
            guide.metaTitle,
            guide.breadcrumbName,
            guide.description,
            guide.category.breadcrumbName,
        ].some(value => value.toLowerCase().includes(normalizedQuery)));
    }, [allGuides, query]);
    const title = isRoot ? "Static Wiki" : `${category.breadcrumbName} Guides`;
    const description = isRoot
        ? "Everything you need to understand Static, from your first island systems to network-wide features."
        : categoryDetails[category.slug]?.description ?? category.index.description;
    const DirectoryIcon = isRoot ? BookOpenIcon : (categoryDetails[category.slug]?.icon ?? BookOpenIcon);

    return (
        <PageShell>
            <div className="mb-5">
                <PageLocation location={[
                    {href: "/", name: "Home"},
                    {href: "/wiki", name: "Wiki"},
                    ...(!isRoot ? [{href: `/wiki/${category.slug}`, name: category.breadcrumbName}] : []),
                ]}/>
            </div>

            <section className="surface-panel relative isolate overflow-hidden p-6 sm:p-9 lg:p-12">
                <div className="hero-grid pointer-events-none absolute inset-0 -z-20 opacity-25"/>
                <div className="pointer-events-none absolute -right-20 -top-24 -z-10 size-80 rounded-full bg-purple-500/18 blur-3xl"/>
                <div className="grid gap-9 lg:grid-cols-[1fr_22rem] lg:items-end">
                    <div>
                        <div className="mb-5 grid size-14 place-items-center rounded-2xl border border-purple-300/20 bg-purple-500/12 text-purple-200 shadow-[0_0_35px_rgba(139,92,246,0.18)]">
                            <DirectoryIcon className="size-7"/>
                        </div>
                        <p className="page-eyebrow">Static knowledge base</p>
                        <h1 className="page-title">{title}</h1>
                        <p className="page-lede">{description}</p>
                    </div>
                    <div>
                        <label htmlFor="wiki-search" className="mb-2 block text-sm font-semibold text-slate-300">
                            Find a guide
                        </label>
                        <div className="relative">
                            <SearchIcon className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-purple-300"/>
                            <input
                                id="wiki-search"
                                type="search"
                                value={query}
                                onChange={event => setQuery(event.target.value)}
                                placeholder="Search topics and systems…"
                                className="field-control h-13 w-full pl-12 pr-4 shadow-inner"
                            />
                        </div>
                        <div className="mt-4 flex gap-6 text-sm text-slate-400">
                            <span><strong className="text-white">{allGuides.length}</strong> guides</span>
                            {isRoot && <span><strong className="text-white">{wikiPages.length}</strong> categories</span>}
                        </div>
                    </div>
                </div>
            </section>

            {isRoot && (
                <section className="mt-14">
                    <DirectoryHeading
                        eyebrow="Start exploring"
                        title="Browse by category"
                        description="Choose the part of Static you want to learn more about."
                    />
                    <div className="mt-7 grid gap-5 md:grid-cols-2">
                        {wikiPages.map(wikiCategory => (
                            <CategoryCard key={wikiCategory.slug} category={wikiCategory}/>
                        ))}
                    </div>
                </section>
            )}

            <section className="mt-14">
                <DirectoryHeading
                    eyebrow={query ? "Search results" : isRoot ? "All documentation" : "In this category"}
                    title={query ? `${filteredGuides.length} ${filteredGuides.length === 1 ? "guide" : "guides"} found` : isRoot ? "Explore every guide" : `Learn about ${category.breadcrumbName}`}
                    description={query ? `Showing the best matches for “${query}”.` : "Practical explanations with screenshots, recipes, and step-by-step instructions."}
                />
                {filteredGuides.length > 0 ? (
                    <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                        {filteredGuides.map(guide => <GuideCard key={`${guide.category.slug}-${guide.slug}`} guide={guide} showCategory={isRoot}/>) }
                    </div>
                ) : (
                    <div className="surface-card mt-7 p-8 text-center">
                        <SearchIcon className="mx-auto size-8 text-slate-500"/>
                        <h2 className="mt-4 text-xl font-bold text-white">No matching guides yet</h2>
                        <p className="mt-2 text-slate-400">Try a broader search, or ask the community for help.</p>
                    </div>
                )}
            </section>

            <WikiHelpPanel/>
        </PageShell>
    );
};

const DirectoryHeading = ({eyebrow, title, description}: {
    eyebrow: string,
    title: string,
    description: string
}) => (
    <div className="max-w-2xl">
        <p className="page-eyebrow">{eyebrow}</p>
        <h2 className="text-3xl font-black tracking-[-0.03em] text-white sm:text-4xl">{title}</h2>
        <p className="mt-3 leading-7 text-slate-400">{description}</p>
    </div>
);

const CategoryCard = ({category}: { category: WikiCategory }) => {
    const details = categoryDetails[category.slug];
    const Icon = details?.icon ?? BookOpenIcon;

    return (
        <Link to={`/wiki/${category.slug}`} className="surface-card-interactive group relative min-h-64 overflow-hidden p-7">
            <div className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full bg-purple-500/10 blur-3xl transition-colors group-hover:bg-purple-500/20"/>
            <div className="relative flex h-full flex-col">
                <div className="flex items-start justify-between">
                    <div className="grid size-12 place-items-center rounded-xl border border-purple-300/15 bg-purple-500/10 text-purple-300">
                        <Icon className="size-6"/>
                    </div>
                    <ArrowRightIcon className="size-5 text-slate-500 transition duration-300 group-hover:translate-x-1 group-hover:text-purple-300"/>
                </div>
                <div className="mt-auto pt-9">
                    <p className="text-sm font-semibold uppercase tracking-[0.15em] text-purple-300">{category.pages.length} {category.pages.length === 1 ? "guide" : "guides"}</p>
                    <h3 className="mt-2 text-2xl font-black text-white">{category.breadcrumbName}</h3>
                    <p className="mt-3 max-w-xl leading-7 text-slate-400 group-hover:text-slate-300">{details?.description ?? category.index.description}</p>
                </div>
            </div>
        </Link>
    );
};

const GuideCard = ({guide, showCategory}: { guide: DirectoryGuide, showCategory: boolean }) => {
    const Icon = guideIcons[guide.slug] ?? BookOpenIcon;

    return (
        <Link to={`/wiki/${guide.category.slug}/${guide.slug}`} className="surface-card-interactive group flex min-h-64 flex-col p-6">
            <div className="flex items-start justify-between">
                <div className="grid size-11 place-items-center rounded-xl border border-purple-300/15 bg-purple-500/10 text-purple-300">
                    <Icon className="size-5"/>
                </div>
                <ArrowRightIcon className="size-5 text-slate-600 transition duration-300 group-hover:translate-x-1 group-hover:text-purple-300"/>
            </div>
            <div className="mt-auto pt-8">
                {showCategory && <p className="text-xs font-bold uppercase tracking-[0.16em] text-purple-300/80">{guide.category.breadcrumbName}</p>}
                <h3 className="mt-2 text-xl font-bold text-white">{guide.breadcrumbName}</h3>
                <p className="mt-3 line-clamp-3 leading-7 text-slate-400 group-hover:text-slate-300">{guide.description}</p>
            </div>
        </Link>
    );
};

const WikiHelpPanel = () => (
    <section className="surface-panel relative mt-14 overflow-hidden p-7 sm:p-9">
        <div className="pointer-events-none absolute -right-14 top-1/2 size-48 -translate-y-1/2 rounded-full bg-indigo-500/15 blur-3xl"/>
        <div className="relative flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
                <p className="page-eyebrow">Keep exploring</p>
                <h2 className="text-2xl font-black text-white sm:text-3xl">Can’t find what you need?</h2>
                <p className="mt-3 leading-7 text-slate-400">The wiki is growing alongside Static. Ask the community for help or explore other useful server resources.</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3 lg:min-w-[32rem]">
                <WikiResourceLink href="/discord" icon={<MessageCircleIcon/>} label="Ask Discord"/>
                <WikiResourceLink href="/rules" icon={<BookOpenIcon/>} label="Server Rules"/>
                <WikiResourceLink href="/vote" icon={<VoteIcon/>} label="Vote Rewards"/>
            </div>
        </div>
    </section>
);

const WikiResourceLink = ({href, icon, label}: { href: string, icon: ReactNode, label: string }) => (
    <Link to={href} className="flex items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-white/10 bg-white/5 px-4 py-3 font-semibold text-white transition hover:-translate-y-0.5 hover:border-purple-300/25 hover:bg-white/10 [&_svg]:size-4 [&_svg]:text-purple-300">
        {icon}{label}
    </Link>
);

function WikiNotFound() {
    return (
        <PageShell className="flex flex-1 items-center justify-center py-24">
            <div className="surface-panel w-full max-w-2xl p-10 text-center">
                <p className="page-eyebrow">Static wiki</p>
                <h1 className="page-title">Guide not found</h1>
                <p className="page-lede mx-auto">The wiki page you searched for does not exist.</p>
            </div>
        </PageShell>
    );
}
