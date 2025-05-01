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
        route("*", "routes/not-found.tsx"),
    ])
] satisfies RouteConfig;

//todo: add a /article/{article} route.
// render forms in md. these will be used for like server releases where we yap about features and stuff.
// dynamically fetch the md from ~/md/articles/{article}.md