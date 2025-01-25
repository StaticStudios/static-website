import {Outlet} from "react-router";
import React from "react";

export default function Cards() {
    return (
        <div className="flex flex-row flex-wrap gap-8">
            <Outlet/>
        </div>
    )
}