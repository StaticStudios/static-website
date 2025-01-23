import React from "react";
import {Container} from "~/components/content";
import {Link} from "react-router";

export const Footer = () => {
    return (
        <div className="w-full bg-theme-700 py-6 text-white/60 font-normal">
            <Container>
                <div className="flex flex-row justify-between gap-4">
                    <div className="flex flex-col flex-1 hover:[&>a]:underline [&>a]:hover:w-fit">
                        <p className="font-bold text-white text-lg">Other links</p>
                        <a href="https://discord.gg/9S6K9E5" target="_blank" rel="noreferrer">Discord</a>
                        <a href="https://discord.gg/9S6K9E5" target="_blank" rel="noreferrer">Contact us</a>
                        <Link to={"tos"}>Terms of Service</Link>
                        <Link to={"privacy"}>Privacy Policy</Link>
                    </div>
                    <div className="flex flex-col flex-1 text-center">
                        <p className="font-bold text-white text-lg">Support us</p>
                        <p>Static Studios operates a free to play Minecraft server, but if you'd like to support us, you
                            can
                            do so by making a purchase from our store.</p>
                    </div>
                    <div className="flex flex-col flex-1 text-right">
                        <p className="font-bold text-white text-lg">Notice</p>
                        <p>We are not affiliated with Minecraft, Microsoft or Mojang AB.</p>
                    </div>
                </div>
            </Container>
        </div>
    )
}