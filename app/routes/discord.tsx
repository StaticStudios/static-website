import type {Route} from "../+types/root";
import React, {useEffect} from "react";
import {useNavigate} from "react-router";
import {PageShell} from "~/components/page-shell";

export function meta({}: Route.MetaArgs) {
    return [
        {title: "Static | Join Our Discord"},
        {name: "description", content: "Join the Static Discord community. Connect with 2,000+ Minecraft players, get server support, participate in events, and stay updated on Skyblock and Prison news."},
        {name: "robots", content: "index, follow"},
        {property: "og:title", content: "Join the Static Discord"},
        {property: "og:description", content: "Join the Static Discord community with 2,000+ Minecraft players."},
        {property: "og:type", content: "website"},
        {property: "og:url", content: "https://staticstudios.net/discord"},
        {property: "og:site_name", content: "Static"},
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
        <PageShell className="flex flex-1 items-center justify-center py-24">
            <div className="surface-panel w-full max-w-lg p-10 text-center">
                <p className="page-eyebrow">Static community</p>
                <h1 className="text-3xl font-black text-white">Opening Discord…</h1>
                <p className="mt-3 text-slate-300">You’ll be returned to the homepage automatically.</p>
            </div>
        </PageShell>
    );
}
