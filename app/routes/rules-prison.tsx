import type {Route} from "../+types/root";
import React from "react";
import markdown from "~/md/rules-prison.md?raw";
import {MarkdownPage} from "~/components/markdown-page";

export function meta({}: Route.MetaArgs) {
    return [
        {title: "Static Studios | Prison Rules"},
        {name: "description", content: "Official rules for Static Prison gamemode. Review mine, PvP, economy, and gameplay rules to ensure fair play on play.staticstudios.net."},
        {name: "robots", content: "index, follow"},
        {property: "og:title", content: "Static Studios Prison Rules"},
        {property: "og:type", content: "website"},
        {property: "og:url", content: "https://staticstudios.net/rules/prison"},
        {property: "og:site_name", content: "Static Studios"},
    ];
}

export default function PrisonRules() {
    return (
        <MarkdownPage markdown={markdown} location={
            [
                {href: "/", name: "Home"},
                {href: "/rules", name: "Rules"},
                {href: "/rules/prison", name: "Prison Rules"},
            ]
        }/>
    );
}

