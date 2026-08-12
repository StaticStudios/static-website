import type {Route} from "../+types/root";
import React from "react";
import markdown from "~/md/privacy.md?raw";
import {MarkdownPage} from "~/components/markdown-page";

export function meta({}: Route.MetaArgs) {
    return [
        {title: "Static | Privacy Policy"},
        {name: "description", content: "Learn how Static Studios collects, uses, shares, retains, and protects information when operating the Static Minecraft server and related services."},
        {name: "robots", content: "index, follow"},
        {property: "og:title", content: "Static Privacy Policy"},
        {property: "og:type", content: "website"},
        {property: "og:url", content: "https://staticstudios.net/privacy"},
        {property: "og:site_name", content: "Static"},
    ];
}

export default function TOS() {
    return (
        <MarkdownPage markdown={markdown} location={
            [
                {href: "/", name: "Home"},
                {href: "/privacy", name: "Privacy Policy"},
            ]
        }/>
    );
}
