import {index, layout, route, type RouteConfig} from "@react-router/dev/routes";

export default [
    layout("layouts/base.tsx", [
        index("routes/home.tsx"),
        route("tos", "routes/tos.tsx"),
        route("rules", "routes/rules.tsx"),
        route("privacy", "routes/privacy.tsx"),
        route("store/:categoryId?", "routes/store/index.tsx"),
        route("store/item/:itemId", "routes/store/item.tsx"),
        route("vote", "routes/vote.tsx"),
        route("discord", "routes/discord.tsx"),
        route("/article/skyblock-season-1", "routes/article/skyblock-season-1.tsx"),
        route("*", "routes/not-found.tsx"),
    ])
] satisfies RouteConfig;