import type {Route} from "../+types/root";
import React from "react";
import markdown from "~/md/rules.md?raw";
import {MarkdownPage} from "~/components/markdown-page";

export function meta({}: Route.MetaArgs) {
    return [
        {title: "Static Studios | Rules"},
        {name: "description", content: "Static Studios is a Minecraft server network."},
    ];
}

export default function TOS() {
    return (
        <MarkdownPage markdown={markdown} location={
            [
                {href: "/", name: "Home"},
                {href: "/tos", name: "Rules"},
            ]
        }/>
    );
}