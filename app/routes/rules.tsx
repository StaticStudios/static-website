import type {Route} from "../+types/root";
import React from "react";
import markdown from "~/md/rules.md?raw";
import {MarkdownPage} from "~/components/markdown-page";
import {Link} from "react-router";
import {Button} from "~/components/ui/button";
import {CloudIcon, Grid3x3Icon} from "lucide-react";

export function meta({}: Route.MetaArgs) {
    return [
        {title: "Static Studios | Global Rules"},
        {name: "description", content: "Static Studios is a Minecraft server network."},
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
                        className="h-auto py-4 justify-start px-6 transform transition-all hover:scale-[1.01] hover:ring-2 hover:ring-indigo-500/50 bg-slate-800/50 border-indigo-500/30 text-white hover:bg-slate-800/80 hover:text-white">
                    <Link to="/rules/skyblock">
                        <div className="flex flex-row items-center gap-4 text-left w-full">
                            <div className="p-3 bg-indigo-500/10 rounded-xl shrink-0">
                                <CloudIcon className="size-8 text-indigo-400"/>
                            </div>
                            <div className="flex flex-col gap-0.5">
                                <span className="font-bold text-lg">Skyblock Rules</span>
                                <span className="text-sm text-white/50 font-normal text-wrap">View specific rules regarding the Skyblock gamemode</span>
                            </div>
                        </div>
                    </Link>
                </Button>
                <Button asChild variant="outline"
                        className="h-auto py-4 justify-start px-6 transform transition-all hover:scale-[1.01] hover:ring-2 hover:ring-indigo-500/50 bg-slate-800/50 border-indigo-500/30 text-white hover:bg-slate-800/80 hover:text-white opacity-90">
                    <Link to="/rules/prison">
                        <div className="flex flex-row items-center gap-4 text-left w-full">
                            <div className="p-3 bg-indigo-500/10 rounded-xl shrink-0">
                                <Grid3x3Icon className="size-8 text-indigo-400"/>
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