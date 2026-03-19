import type {Route} from "../+types/root";
import React from "react";
import markdown from "~/md/rules-skyblock.md?raw";
import {MarkdownPage} from "~/components/markdown-page";

export function meta({}: Route.MetaArgs) {
    return [
        {title: "Static Studios | Skyblock Rules"},
        {name: "description", content: "Official rules for Static Skyblock gamemode. Review island, economy, PvP, and gameplay rules to ensure fair play on play.staticstudios.net."},
        {name: "robots", content: "index, follow"},
        {property: "og:title", content: "Static Studios Skyblock Rules"},
        {property: "og:type", content: "website"},
        {property: "og:url", content: "https://staticstudios.net/rules/skyblock"},
        {property: "og:site_name", content: "Static Studios"},
    ];
}

export default function SkyblockRules() {
    return (
        <MarkdownPage markdown={markdown} location={
            [
                {href: "/", name: "Home"},
                {href: "/rules", name: "Rules"},
                {href: "/rules/skyblock", name: "Skyblock Rules"},
            ]
        }/>
    );
}

