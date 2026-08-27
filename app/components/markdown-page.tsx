import Markdown from "react-markdown";
import {Link} from "react-router";
import {ChevronRightIcon} from "lucide-react";
import React from "react";
import remarkGfm from "remark-gfm";
import {PageShell} from "~/components/page-shell";

type MarkdownPageProps = {
    markdown: string;
    location: PageLocationProps["location"];
    children?: React.ReactNode;
    afterTitle?: React.ReactNode;
}

export function MarkdownPage({markdown, location, children, afterTitle}: MarkdownPageProps) {
    return (
        <PageShell>
                <div className="mb-5">
                    <PageLocation location={location}/>
                </div>
                {children}
                <article
                    className="surface-panel relative overflow-hidden p-6 sm:p-9 lg:p-12 [&_code]:bg-slate-950/65 markdown">
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-300/55 to-transparent"/>
                    <Markdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                            h1: ({node: _node, ...props}) => (
                                <>
                                    <h1 {...props}/>
                                    {afterTitle}
                                </>
                            ),
                            table: ({node: _node, ...props}) => (
                                <div className="markdown-table-wrapper">
                                    <table {...props}/>
                                </div>
                            ),
                        }}
                    >
                        {markdown}
                    </Markdown>
                </article>
        </PageShell>
    );
}

type PageLocationProps = {
    location: {
        href: string;
        name: string;
    }[]
}

export const PageLocation = ({location}: PageLocationProps) => {
    return (
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5">
            {location.map((loc, i) => (
                <div key={i} className="flex items-center gap-1.5">
                    <Link to={loc.href} data-active={i == location.length - 1}
                          className="rounded-md px-1.5 py-1 text-sm font-medium text-slate-400 transition-colors hover:text-white data-[active=true]:text-purple-200">{loc.name}
                    </Link>
                    {i < location.length - 1 && (
                        <ChevronRightIcon className="size-3.5 text-slate-600"/>
                    )}
                </div>
            ))}
        </nav>
    )
}
