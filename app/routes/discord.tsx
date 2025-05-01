import type {Route} from "../+types/root";
import React, {useEffect} from "react";

export function meta({}: Route.MetaArgs) {
    return [
        {title: "Static Studios | Discord"},
        {name: "description", content: "Static Studios is a Minecraft server network."},
    ];
}

export default function Discord() {
    const redirectUrl = "https://discord.gg/9S6K9E5";

    useEffect(() => {
        window.open(redirectUrl, "_self");
    }, []);

    return (
        <p className="mx-auto mt-8">Redirecting...</p>
    );
}
