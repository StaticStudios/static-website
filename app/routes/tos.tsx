import type {Route} from "../+types/root";
import React from "react";
import markdown from "~/md/tos.md?raw";
import {MarkdownPage} from "~/components/markdown-page";

export function meta({}: Route.MetaArgs) {
    return [
        {title: "Static Studios | Terms of Service"},
        {name: "description", content: "Terms of Service for Static Studios Minecraft server network. Review the terms governing use of our Skyblock and Prison server at play.staticstudios.net."},
        {name: "robots", content: "index, follow"},
        {property: "og:title", content: "Static Studios Terms of Service"},
        {property: "og:type", content: "website"},
        {property: "og:url", content: "https://staticstudios.net/tos"},
        {property: "og:site_name", content: "Static Studios"},
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