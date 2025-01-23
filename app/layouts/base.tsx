import {Navbar} from "~/components/nav";
import {Header} from "~/components/header";
import {Container} from "~/components/content";
import React from "react";
import {Footer} from "~/components/footer";
import {Outlet} from "react-router";


export default function Layout() {
    return (
        <div className="flex flex-col min-h-[100vh]">
            <Header/>
            <Navbar/>
            <Container className="flex flex-grow my-8">
                <Outlet/>
            </Container>
            <Footer/>
        </div>
    )
}