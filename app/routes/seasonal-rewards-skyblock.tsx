import type {Route} from "../+types/root";
import React from "react";
import markdown from "~/md/seasonal-rewards/skyblock.md?raw";
import {MarkdownPage} from "~/components/markdown-page";

export function meta({}: Route.MetaArgs) {
    return [
        {title: "Static | Skyblock Monthly & Seasonal Rewards"},
        {
            name: "description",
            content: "View Static Skyblock monthly and seasonal leaderboard rewards, including gift cards, placement tags, qualification, and claiming instructions.",
        },
        {name: "robots", content: "index, follow"},
        {property: "og:title", content: "Static Skyblock Monthly & Seasonal Rewards"},
        {
            property: "og:description",
            content: "View monthly and seasonal Island Leaderboard prizes and qualification details for Static Skyblock.",
        },
        {property: "og:type", content: "website"},
        {property: "og:url", content: "https://staticstudios.net/seasonal-rewards/skyblock"},
        {property: "og:site_name", content: "Static"},
    ];
}

export default function SkyblockSeasonalRewards() {
    return (
        <MarkdownPage
            markdown={markdown}
            location={[
                {href: "/", name: "Home"},
                {href: "/seasonal-rewards", name: "Seasonal Rewards"},
                {href: "/seasonal-rewards/skyblock", name: "Skyblock"},
            ]}
        />
    );
}
