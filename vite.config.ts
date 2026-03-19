import {reactRouter} from "@react-router/dev/vite";
import {defineConfig, type Plugin} from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import {writeFileSync} from "node:fs";
import {resolve} from "node:path";
import {generateSitemap, generateLlmsTxt} from "./app/seo";

function seoPlugin(): Plugin {
    return {
        name: "generate-seo-files",
        buildStart() {
            const publicDir = resolve(__dirname, "public");
            writeFileSync(resolve(publicDir, "sitemap.xml"), generateSitemap());
            writeFileSync(resolve(publicDir, "llms.txt"), generateLlmsTxt());
        },
    };
}

export default defineConfig({
    plugins: [reactRouter(), tsconfigPaths(), tailwindcss(), seoPlugin()],
});
