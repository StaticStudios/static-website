// @ts-ignore
import type {Route} from "../../+types/root";
import React from "react";
import {MarkdownPage} from "~/components/markdown-page";
import {articles, SITE_URL} from "~/seo";

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
        return [{title: "Static Studios | Article Not Found"}];
    }

    return [
        {title: `Static Studios | ${article.metaTitle}`},
        {name: "description", content: article.description},
        {name: "robots", content: "index, follow"},
        {property: "og:title", content: article.metaTitle},
        {property: "og:description", content: article.ogDescription},
        {property: "og:type", content: "article"},
        {property: "og:url", content: `${SITE_URL}/article/${article.slug}`},
        {property: "og:image", content: article.ogImage},
        {property: "og:site_name", content: "Static Studios"},
        {name: "twitter:card", content: "summary_large_image"},
    ];
}

export default function Article({params}: Route.ComponentProps) {
    const slug = (params as Record<string, string>).slug;
    const article = slug ? getArticle(slug) : undefined;
    const markdown = slug ? getMarkdown(slug) : undefined;

    if (!article || !markdown) {
        return (
            <div className="flex items-center flex-col w-full gap-1 mt-8">
                <h1>Article not found</h1>
                <p>The article you searched for does not exist.</p>
            </div>
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


