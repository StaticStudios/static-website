import type {Route} from "../+types/root";
import React from "react";
import markdown from "~/md/seasonal-rewards/index.md?raw";
import {MarkdownPage} from "~/components/markdown-page";

export function meta({}: Route.MetaArgs) {
    return [
        {title: "Static | Seasonal Rewards"},
        {
            name: "description",
            content: "Learn about Static seasonal rewards and view the current prizes for Skyblock and Prison.",
        },
        {name: "robots", content: "index, follow"},
        {property: "og:title", content: "Static Seasonal Rewards"},
        {
            property: "og:description",
            content: "Compete for store gift cards and exclusive placement tags in Static Skyblock and Prison.",
        },
        {property: "og:type", content: "website"},
        {property: "og:url", content: "https://staticstudios.net/seasonal-rewards"},
        {property: "og:site_name", content: "Static"},
    ];
}

export default function SeasonalRewards() {
    return (
        <MarkdownPage
            markdown={markdown}
            location={[
                {href: "/", name: "Home"},
                {href: "/seasonal-rewards", name: "Seasonal Rewards"},
            ]}
        />
    );
}
