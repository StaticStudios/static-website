import {index, layout, route, type RouteConfig} from "@react-router/dev/routes";

export default [
    layout("layouts/base.tsx", [
        layout("layouts/cards.tsx", [
            index("routes/home.tsx"),
            route("tos", "routes/tos.tsx"),
            route("privacy", "routes/privacy.tsx"),
            route("store/:categoryId?", "routes/store/index.tsx"),
            route("store/item/:itemId", "routes/store/item.tsx"),
        ]),
        layout("layouts/content.tsx", [
            route("vote", "routes/vote.tsx"),
            route("*", "routes/not-found.tsx"),
        ])

    ])
] satisfies RouteConfig;

//todo: add /rules
