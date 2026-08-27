import type {Route} from "../+types/root";
import React from "react";
import markdown from "~/md/rules.md?raw";
import {MarkdownPage} from "~/components/markdown-page";
import {Link} from "react-router";
import {Button} from "~/components/ui/button";
import {CloudIcon, Grid3x3Icon} from "lucide-react";

export function meta({}: Route.MetaArgs) {
    return [
        {title: "Static | Server Rules"},
        {name: "description", content: "Read the official Static Minecraft server rules. These global rules apply to all gamemodes including Skyblock and Prison. Fair play, no cheating, and respectful behavior required."},
        {name: "robots", content: "index, follow"},
        {property: "og:title", content: "Static Server Rules"},
        {property: "og:description", content: "Official rules for the Static Minecraft server. Fair play, no cheating, and respectful behavior required."},
        {property: "og:type", content: "website"},
        {property: "og:url", content: "https://staticstudios.net/rules"},
        {property: "og:site_name", content: "Static"},
    ];
}

export default function Rules() {
    return (
        <MarkdownPage markdown={markdown} location={
            [
                {href: "/", name: "Home"},
                {href: "/rules", name: "Rules"},
                {href: "/rules", name: "Global Rules"},
            ]
        }>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <Button asChild variant="outline"
                        className="surface-card-interactive h-auto justify-start px-6 py-5 text-white hover:bg-white/5 hover:text-white">
                    <Link to="/rules/skyblock">
                        <div className="flex flex-row items-center gap-4 text-left w-full">
                            <div className="shrink-0 rounded-xl border border-purple-300/15 bg-purple-500/10 p-3">
                                <CloudIcon className="size-8 text-purple-300"/>
                            </div>
                            <div className="flex flex-col gap-0.5">
                                <span className="font-bold text-lg">Skyblock Rules</span>
                                <span className="text-sm text-white/50 font-normal text-wrap">View specific rules regarding the Skyblock gamemode</span>
                            </div>
                        </div>
                    </Link>
                </Button>
                <Button asChild variant="outline"
                        className="surface-card-interactive h-auto justify-start px-6 py-5 text-white hover:bg-white/5 hover:text-white">
                    <Link to="/rules/prison">
                        <div className="flex flex-row items-center gap-4 text-left w-full">
                            <div className="shrink-0 rounded-xl border border-purple-300/15 bg-purple-500/10 p-3">
                                <Grid3x3Icon className="size-8 text-purple-300"/>
                            </div>
                            <div className="flex flex-col gap-0.5">
                                <span className="font-bold text-lg">Prison Rules</span>
                                <span className="text-sm text-white/50 font-normal text-wrap">View specific rules regarding the Prison gamemode</span>
                            </div>
                        </div>
                    </Link>
                </Button>
            </div>
        </MarkdownPage>
    );
}
