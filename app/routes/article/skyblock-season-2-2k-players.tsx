import type {Route} from "../../+types/root";
import React from "react";
import markdown from "~/md/article/skyblock-season-2-2k-players.md?raw";
import {MarkdownPage} from "~/components/markdown-page";

export function meta({}: Route.MetaArgs) {
    return [
        {title: "Static Studios | Static Skyblock - 2,000+ Unique Players"},
        {name: "description", content: "Static Studios is a Minecraft server network."},
    ];
}

export default function TOS() {
    return (
        <MarkdownPage markdown={markdown} location={
            [
                {href: "/", name: "Home"},
                {href: "/", name: "Articles"},
                {href: "/skyblock-season-2-2k-players", name: "Static Skyblock - 2,000+ Unique Players"},
            ]
        }/>
    );
}