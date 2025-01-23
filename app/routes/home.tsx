import type {Route} from "../+types/root";

export function meta({}: Route.MetaArgs) {
    return [
        {title: "Static Studios"},
        {name: "description", content: "Static Studios is a Minecraft server network."},
    ];
}

export default function Home() {
    return (
        <div>
            <p>WIP</p>
        </div>
    );
}
