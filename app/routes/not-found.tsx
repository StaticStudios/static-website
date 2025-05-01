import type {Route} from "../+types/root";

export function meta({}: Route.MetaArgs) {
    return [
        {title: "Static Studios | Not Found"},
        {name: "description", content: "The page you searched for does not exist."},
    ];
}


export default function NotFound() {
    return (
        <div className="flex items-center flex-col w-full gap-1 mt-8">
            <h1>Page not found</h1>
            <p>The page you searched for does not exist</p>
        </div>
    );
}
