import React from "react";
import {Link} from "react-router";
import {MailIcon, MapPinIcon} from "lucide-react";

export const Footer = () => {
    return (
        <footer className="w-full bg-slate-900 px-3 py-6 text-white/70 font-normal mt-auto">
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row justify-between gap-4 flex-1">
                    <div className="flex flex-col flex-1 text-left gap-2">
                        <h4 className="text-white">Static Studios</h4>
                        <p>Experience the ultimate Minecraft server with custom gameplay, unique features, and an
                            amazing community.</p>
                    </div>
                    <div className="flex flex-col flex-1 text-left gap-2">
                        <h4 className="text-white">Notice</h4>
                        <p>We are not affiliated with Minecraft, Microsoft or Mojang AB.</p>
                    </div>
                    <nav className="flex flex-col flex-1 [&>a]:hover:text-purple-400 transition-colors gap-2">
                        <h4 className="text-white">Other links</h4>
                        <Link to={"partnerships"}>Partner With Us</Link>
                        <Link to={"tos"}>Terms of Service</Link>
                        <Link to={"privacy"}>Privacy Policy</Link>
                    </nav>
                    <address
                        className="flex flex-col flex-1 not-italic [&>a]:hover:text-purple-400 transition-colors gap-2">
                        <h4 className="text-white">Contact Us</h4>
                        <div className="flex flex-row gap-2 items-center">
                            <MailIcon className="text-purple-400 size-5"/>
                            <p>support@staticstudios.net</p>
                        </div>
                        <div className="flex flex-row gap-2 items-center">
                            <MapPinIcon className="text-purple-400 size-5"/>
                            <p>play.staticstudios.net</p>
                        </div>
                    </address>
                </div>
            </div>
        </footer>
    )
}