import type {Route} from "../+types/root";
import React from "react";
import markdown from "~/md/seasonal-rewards/prison.md?raw";
import {MarkdownPage} from "~/components/markdown-page";

export function meta({}: Route.MetaArgs) {
    return [
        {title: "Static | Prison Seasonal Rewards"},
        {
            name: "description",
            content: "View the Static Prison Gang Top rewards and learn how players qualify for gift cards and placement tags.",
        },
        {name: "robots", content: "index, follow"},
        {property: "og:title", content: "Static Prison Seasonal Rewards"},
        {
            property: "og:description",
            content: "View the Gang Top prizes and qualification details for Static Prison.",
        },
        {property: "og:type", content: "website"},
        {property: "og:url", content: "https://staticstudios.net/seasonal-rewards/prison"},
        {property: "og:site_name", content: "Static"},
    ];
}

export default function PrisonSeasonalRewards() {
    return (
        <MarkdownPage
            markdown={markdown}
            location={[
                {href: "/", name: "Home"},
                {href: "/seasonal-rewards", name: "Seasonal Rewards"},
                {href: "/seasonal-rewards/prison", name: "Prison"},
            ]}
        />
    );
}
