// @ts-ignore
import type {Route} from "../../+types/root";
import React from "react";
import {MarkdownPage} from "~/components/markdown-page";
import {articles, SITE_URL} from "~/seo";
import {PageShell} from "~/components/page-shell";

const markdownModules = import.meta.glob<string>("../md/article/*.md", {
    query: "?raw",
    import: "default",
    eager: true,
});

function getMarkdown(slug: string): string | undefined {
    for (const [path, content] of Object.entries(markdownModules)) {
        if (path.includes(`/${slug}.md`)) return content;
    }
    return undefined;
}

function getArticle(slug: string) {
    return articles.find(a => a.slug === slug);
}

export function meta({params}: Route.MetaArgs) {
    const slug = (params as Record<string, string>).slug;
    const article = slug ? getArticle(slug) : undefined;
    if (!article) {
        return [{title: "Static | Article Not Found"}];
    }

    return [
        {title: `Static | ${article.metaTitle}`},
        {name: "description", content: article.description},
        {name: "robots", content: "index, follow"},
        {property: "og:title", content: article.metaTitle},
        {property: "og:description", content: article.ogDescription},
        {property: "og:type", content: "article"},
        {property: "og:url", content: `${SITE_URL}/article/${article.slug}`},
        {property: "og:image", content: article.ogImage},
        {property: "og:site_name", content: "Static"},
        {name: "twitter:card", content: "summary_large_image"},
    ];
}

export default function Article({params}: Route.ComponentProps) {
    const slug = (params as Record<string, string>).slug;
    const article = slug ? getArticle(slug) : undefined;
    const markdown = slug ? getMarkdown(slug) : undefined;

    if (!article || !markdown) {
        return (
            <PageShell className="flex flex-1 items-center justify-center py-24">
                <div className="surface-panel w-full max-w-2xl p-10 text-center">
                    <p className="page-eyebrow">Article archive</p>
                    <h1 className="page-title">Article not found</h1>
                    <p className="page-lede mx-auto">The article you searched for does not exist.</p>
                </div>
            </PageShell>
        );
    }

    return (
        <MarkdownPage
            markdown={markdown}
            location={[
                {href: "/", name: "Home"},
                {href: "/", name: "Articles"},
                {href: `/article/${article.slug}`, name: article.breadcrumbName},
            ]}
        />
    );
}


