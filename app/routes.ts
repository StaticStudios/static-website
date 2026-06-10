import {index, layout, route, type RouteConfig} from "@react-router/dev/routes";

export default [
    layout("layouts/base.tsx", [
        index("routes/home.tsx"),
        route("tos", "routes/tos.tsx"),
        route("rules", "routes/rules.tsx"),
        route("partnerships", "routes/partnerships.tsx"),
        route("rules/skyblock", "routes/rules-skyblock.tsx"),
        route("rules/prison", "routes/rules-prison.tsx"),
        route("privacy", "routes/privacy.tsx"),
        route("store/:categoryId?", "routes/store/index.tsx"),
        route("store/item/:itemId", "routes/store/item.tsx"),
        route("vote", "routes/vote.tsx"),
        route("discord", "routes/discord.tsx"),
        route("article/:slug", "routes/article.tsx"),
        route("wiki/:category?/:slug?", "routes/wiki.tsx"),
        route("*", "routes/not-found.tsx"),
    ])
] satisfies RouteConfig;