import {Title} from "~/components/text";
import type {Route} from "../+types/root";

export function meta({}: Route.MetaArgs) {
    return [
        {title: "Page Not Found • Static Studios"},
        {name: "description", content: "The page you searched for does not exist."},
    ];
}


export default function NotFound() {
    return (
        <div className="flex items-center flex-col w-full gap-1">
            <Title>Page not found</Title>
            <p>The page you searched for does not exist</p>
            <div className="w-1/2 bg-white/50 h-[2px]"/>
        </div>
    );
}
