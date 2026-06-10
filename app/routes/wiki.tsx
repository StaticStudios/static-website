import type {Route} from "./+types/wiki";
import React from "react";
import {MarkdownPage} from "~/components/markdown-page";
import {SITE_URL, wikiPages} from "~/seo";

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
                metaTitle: "Static Studios Wiki",
                description: "Browse the Static Studios wiki for server guides, gameplay systems, and helpful information.",
                ogDescription: "Browse the Static Studios wiki for server guides, gameplay systems, and helpful information.",
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
        return [{title: "Static Studios | Wiki Page Not Found"}];
    }

    const {category, page} = result;
    const path = getWikiPath(
        category?.slug,
        result.isCategoryIndex ? undefined : page.slug,
    );

    return [
        {title: `Static Studios | ${page.metaTitle}`},
        {name: "description", content: page.description},
        {name: "robots", content: "index, follow"},
        {property: "og:title", content: page.metaTitle},
        {property: "og:description", content: page.ogDescription},
        {property: "og:type", content: "article"},
        {property: "og:url", content: `${SITE_URL}${path}`},
        {property: "og:image", content: page.ogImage},
        {property: "og:site_name", content: "Static Studios"},
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

    return (
        <MarkdownPage
            markdown={markdown}
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

function WikiNotFound() {
    return (
        <div className="flex items-center flex-col w-full gap-1 mt-8">
            <h1>Page not found</h1>
            <p>The page you searched for does not exist.</p>
        </div>
    );
}