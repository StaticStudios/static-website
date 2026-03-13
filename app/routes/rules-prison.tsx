import type {Route} from "../+types/root";
import React from "react";
import markdown from "~/md/rules-prison.md?raw";
import {MarkdownPage} from "~/components/markdown-page";

export function meta({}: Route.MetaArgs) {
    return [
        {title: "Static Studios | Prison Rules"},
        {name: "description", content: "Static Studios is a Minecraft server network."},
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

