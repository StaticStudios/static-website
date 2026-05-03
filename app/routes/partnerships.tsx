import type {Route} from "../+types/root";
import React from "react";
import markdown from "~/md/partnerships.md?raw";
import {MarkdownPage} from "~/components/markdown-page";

export function meta({}: Route.MetaArgs) {
    return [
        {title: "Static Studios | Partnerships"},
        {
            name: "description",
            content: "Discover partnership opportunities with Static Studios Minecraft server. Collaborate with us for mutual growth, community engagement, and exciting events. Join our network of partners today!"
        },
        {name: "robots", content: "index, follow"},
        {property: "og:title", content: "Static Studios Server Partnerships"},
        {
            property: "og:description",
            content: "Explore partnership opportunities with Static Studios Minecraft server. Collaborate for mutual growth, community engagement, and exciting events. Join our network of partners today!"
        },
        {property: "og:type", content: "website"},
        {property: "og:url", content: "https://staticstudios.net/partnerships"},
        {property: "og:site_name", content: "Static Studios"},
    ];
}

export default function Rules() {
    return (
        <MarkdownPage markdown={markdown} location={
            [
                {href: "/", name: "Home"},
                {href: "/rules", name: "Partnerships"},
            ]
        }/>
    );
}