import {Outlet} from "react-router";
import React from "react";

export default function Content() {
    return (
        <div className="bg-theme-700 rounded-xl flex grow" style={{
            boxShadow: "0 0 20px 0 rgba(0,0,0,0.3)"
        }}>
            <div className="m-8 w-full">
                <Outlet/>
            </div>
        </div>
    )
}