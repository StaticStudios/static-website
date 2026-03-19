import type {Route} from "../+types/root";
import React, {useEffect} from "react";
import {useNavigate} from "react-router";

export function meta({}: Route.MetaArgs) {
    return [
        {title: "Static Studios | Join Our Discord"},
        {name: "description", content: "Join the Static Studios Discord community. Connect with 2,000+ Minecraft players, get server support, participate in events, and stay updated on Skyblock and Prison news."},
        {name: "robots", content: "index, follow"},
        {property: "og:title", content: "Join Static Studios Discord"},
        {property: "og:description", content: "Join the Static Studios Discord community with 2,000+ Minecraft players."},
        {property: "og:type", content: "website"},
        {property: "og:url", content: "https://staticstudios.net/discord"},
        {property: "og:site_name", content: "Static Studios"},
    ];
}

export default function Discord() {
    const redirectUrl = "https://discord.gg/9S6K9E5";
    const navigate = useNavigate()

    useEffect(() => {
        window.open(redirectUrl, "_blank");
    }, []);

    useEffect(() => {
        navigate("/")
    }, [navigate]);

    return (
        <p className="mx-auto mt-8">Redirecting...</p>
    );
}
