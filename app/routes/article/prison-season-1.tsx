import type {Route} from "../../+types/root";
import React from "react";
import markdown from "~/md/article/prison-season-1.md?raw";
import {MarkdownPage} from "~/components/markdown-page";

export function meta({}: Route.MetaArgs) {
    return [
        {title: "Static Studios | Prison Season 1.0"},
        {name: "description", content: "Static Studios is a Minecraft server network."},
    ];
}

export default function TOS() {
    return (
        <MarkdownPage markdown={markdown} location={
            [
                {href: "/", name: "Home"},
                {href: "/", name: "Articles"},
                {href: "/prison-season-1", name: "Prison Season 1.0"},
            ]
        }/>
    );
}