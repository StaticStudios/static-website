import type {Route} from "../+types/root";
import React, {useEffect} from "react";
import {useNavigate} from "react-router";

export function meta({}: Route.MetaArgs) {
    return [
        {title: "Static Studios | Discord"},
        {name: "description", content: "Static Studios is a Minecraft server network."},
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
