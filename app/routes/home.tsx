import type {Route} from "../+types/root";
import {Card} from "~/components/card";
import skyblockSpawn from "~/assets/skyblock/spawn.png";
import skyblockSpawnSneakPeak from "~/assets/skyblock/spawn_sneak_peak.png";
import skyblockOasis from "~/assets/skyblock/oasis_1.png";
import React from "react";
import {HeroV2} from "~/components/hero";

export function meta({}: Route.MetaArgs) {
    return [
        {title: "Static Studios"},
        {name: "description", content: "Static Studios is a Minecraft server network."},
    ];
}

//todo: animate loading in
//todo: ideally the cards should point to an article
//todo: advertise the store
export default function Home() {
    return (
        <>
            <HeroV2 title={[{content: "Welcome to"}, {content: "Static Studios", highlighted: true}]}
                    subtitle="Experience the ultimate Minecraft server with custom gameplay, unique features, and an amazing community"/>
            <div className="container flex grow my-8 text-theme-100 text-lg mx-auto">
                <div className="flex flex-row flex-wrap gap-8">
                    <Card
                        title="Static Skyblock | Beta #3"
                        description="Skyblock has received another major update! We've added island quests, island upgrades & island points, AFK tracking, island value & island top, profiles, and more! Join our discord to apply for beta access."
                        imageSrc={skyblockSpawn}
                        footer="Jan 19, 2025"
                        layout="horizontal"
                    />
                    <Card
                        title="Static Skyblock | Beta #2"
                        description="Skyblock has received a major update! We've added an auction house, 3 brand new island presets, custom enchants, daily challenges, and more! Join our discord to apply for beta access."
                        imageSrc={skyblockSpawnSneakPeak}
                        footer="Aug 23, 2024"
                        layout="vertical"
                    />
                    <Card
                        title="Static Skyblock | Beta #1"
                        description="Static Studios is back and we've released a brand new Skyblock server! Join our discord to apply for beta access."
                        footer="June 21, 2024"
                        imageSrc={skyblockOasis}
                        layout="vertical"
                    />
                </div>
            </div>
        </>
    );
}
