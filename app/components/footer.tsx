import {Link} from "react-router";
import {MailIcon, MapPinIcon} from "lucide-react";
import logo from "~/assets/logo.png";

export const Footer = () => {
    return (
        <footer className="relative mt-auto overflow-hidden border-t border-white/8 bg-slate-950/65 px-4 py-12 font-normal text-slate-400 backdrop-blur sm:px-6">
            <div className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-purple-400/70 to-transparent"/>
            <div className="mx-auto w-full max-w-7xl">
                <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
                    <div className="flex flex-col gap-4 text-left">
                        <Link to="/" className="flex items-center gap-3">
                            <span className="grid size-10 place-items-center rounded-xl border border-purple-300/15 bg-purple-500/10">
                                <img src={logo} alt="Static logo" className="size-8 rounded-lg object-cover"/>
                            </span>
                            <span className="font-[family-name:var(--font-display)] text-xl font-bold text-white">Static</span>
                        </Link>
                        <p className="max-w-sm leading-7">Experience the ultimate Minecraft server with custom gameplay, unique features, and an amazing community.</p>
                    </div>
                    <div className="flex flex-col gap-3 text-left">
                        <h4 className="text-base font-bold text-white">Notice</h4>
                        <p className="leading-7">Not an official Minecraft service. Not approved by or associated with Mojang or Microsoft.</p>
                    </div>
                    <nav className="flex flex-col gap-3 [&>a]:w-fit [&>a]:transition-colors [&>a]:hover:text-purple-300">
                        <h4 className="text-base font-bold text-white">Other links</h4>
                        <Link to="/tos">Terms of Service</Link>
                        <Link to="/privacy">Privacy Policy</Link>
                    </nav>
                    <address
                        className="flex flex-col gap-3 not-italic">
                        <h4 className="text-base font-bold text-white">Contact us</h4>
                        <div className="flex items-center gap-2.5">
                            <MailIcon className="size-4 text-purple-300"/>
                            <p className="text-sm">support@staticstudios.net</p>
                        </div>
                        <div className="flex items-center gap-2.5">
                            <MapPinIcon className="size-4 text-purple-300"/>
                            <p className="text-sm">play.staticstudios.net</p>
                        </div>
                    </address>
                </div>
            </div>
        </footer>
    )
}
