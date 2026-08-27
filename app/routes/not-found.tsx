import type {Route} from "../+types/root";
import {ArrowLeftIcon} from "lucide-react";
import {Link} from "react-router";
import {PageShell} from "~/components/page-shell";

export function meta({}: Route.MetaArgs) {
    return [
        {title: "Static | Not Found"},
        {name: "description", content: "The page you searched for does not exist."},
    ];
}


export default function NotFound() {
    return (
        <PageShell className="flex flex-1 items-center justify-center py-24">
            <div className="surface-panel relative w-full max-w-2xl overflow-hidden p-8 text-center sm:p-12">
                <div className="hero-grid pointer-events-none absolute inset-0 opacity-20"/>
                <p className="page-eyebrow relative">Error 404</p>
                <h1 className="page-title relative">Lost in the void?</h1>
                <p className="page-lede relative mx-auto">The page you searched for does not exist, but your adventure can continue from home.</p>
                <Link to="/" className="relative mt-8 inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 px-5 font-bold text-white shadow-lg shadow-purple-950/30 transition hover:-translate-y-0.5">
                    <ArrowLeftIcon className="size-4"/> Back to home
                </Link>
            </div>
        </PageShell>
    );
}
