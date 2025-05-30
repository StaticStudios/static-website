import Markdown from "react-markdown";
import {Link} from "react-router";
import {ChevronRightIcon} from "lucide-react";
import React from "react";

type MarkdownPageProps = {
    markdown: string;
    location: PageLocationProps["location"];
}

export function MarkdownPage({markdown, location}: MarkdownPageProps) {
    return (
        <div className="mx-2">
            <div className="container mx-auto mb-8">
                <div className="mt-8 mb-4">
                    <PageLocation location={location}/>
                </div>
                <div
                    className="bg-slate-800/70 border border-indigo-800/30 rounded-lg px-8 py-4 [&_p]:text-white/70 [&_li]:text-white/70 space-y-4 [&_ul]:list-disc [&_ul]:ml-4 [&_img]:rounded-lg [&_img]:border [&_img]:border-gray-300/30 [&_code]:bg-slate-900/70">
                    <Markdown>{markdown}</Markdown>
                </div>
            </div>
        </div>
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
        <div className="flex flex-row gap-1 items-center">
            {location.map((loc, i) => (
                <>
                    <Link to={loc.href} data-active={i == location.length - 1}
                          className="text-sm text-white/70 data-[active=true]:text-white hover:text-white transition-colors">{loc.name}</Link>
                    {i < location.length - 1 && (
                        <ChevronRightIcon className="text-white/70 size-4"/>
                    )}
                </>
            ))}
        </div>
    )
}