import {Navbar} from "~/components/nav";
import {Header} from "~/components/header";
import {Container} from "~/components/content";
import React from "react";
import {Footer} from "~/components/footer";
import {Outlet} from "react-router";


export default function Layout() {
    return (
        <div className="flex flex-col">
            <Header/>
            <Navbar/>
            <Container className="flex grow my-8 text-theme-100 text-lg ">
                <Outlet/>
            </Container>
            <Footer/>
        </div>
    )
}