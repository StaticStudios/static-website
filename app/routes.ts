import {index, layout, route, type RouteConfig} from "@react-router/dev/routes";

export default [
    layout("layouts/base.tsx", [
        layout("layouts/cards.tsx", [
            index("routes/home.tsx"),
        ]),
        layout("layouts/content.tsx", [
            route("vote", "routes/vote.tsx"),
            route("*", "routes/not-found.tsx"),
        ])
    ])
] satisfies RouteConfig;
