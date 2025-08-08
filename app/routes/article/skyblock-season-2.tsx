import type {Route} from "../../+types/root";
import React from "react";
import markdown from "~/md/article/skyblock-season-2.md?raw";
import {MarkdownPage} from "~/components/markdown-page";

export function meta({}: Route.MetaArgs) {
    return [
        {title: "Static Studios | Skyblock Season 2.0"},
        {name: "description", content: "Static Studios is a Minecraft server network."},
    ];
}

export default function TOS() {
    return (
        <MarkdownPage markdown={markdown} location={
            [
                {href: "/", name: "Home"},
                {href: "/", name: "Articles"},
                {href: "/skyblock-season-2", name: "Skyblock Season 2.0"},
            ]
        }/>
    );
}