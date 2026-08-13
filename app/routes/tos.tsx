import type {Route} from "../+types/root";
import React from "react";
import markdown from "~/md/tos.md?raw";
import {MarkdownPage} from "~/components/markdown-page";

export function meta({}: Route.MetaArgs) {
    return [
        {title: "Static | Terms of Service"},
        {name: "description", content: "Terms governing use of the Static Minecraft server, website, store, Discord community, and related services operated by Static Studios."},
        {name: "robots", content: "index, follow"},
        {property: "og:title", content: "Static Terms of Service"},
        {property: "og:type", content: "website"},
        {property: "og:url", content: "https://staticstudios.net/tos"},
        {property: "og:site_name", content: "Static"},
    ];
}

export default function TOS() {
    return (
        <MarkdownPage markdown={markdown} location={
            [
                {href: "/", name: "Home"},
                {href: "/tos", name: "Terms of Service"},
            ]
        }/>
    );
}
