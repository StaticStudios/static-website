import type {Route} from "../+types/root";
import React from "react";
import markdown from "~/md/privacy.md?raw";
import {MarkdownPage} from "~/components/markdown-page";

export function meta({}: Route.MetaArgs) {
    return [
        {title: "Static Studios | Privacy Policy"},
        {name: "description", content: "Privacy Policy for Static Studios Minecraft server network. Learn how we handle your data on our Skyblock and Prison server at play.staticstudios.net."},
        {name: "robots", content: "index, follow"},
        {property: "og:title", content: "Static Studios Privacy Policy"},
        {property: "og:type", content: "website"},
        {property: "og:url", content: "https://staticstudios.net/privacy"},
        {property: "og:site_name", content: "Static Studios"},
    ];
}

export default function TOS() {
    return (
        <MarkdownPage markdown={markdown} location={
            [
                {href: "/", name: "Home"},
                {href: "/tos", name: "Privacy Policy"},
            ]
        }/>
    );
}