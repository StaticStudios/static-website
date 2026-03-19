import type {Config} from "@react-router/dev/config";
import {getAllPrerenderPaths} from "./app/seo";

export default {
    ssr: false,
    async prerender() {
        return getAllPrerenderPaths();
    },
} satisfies Config;
