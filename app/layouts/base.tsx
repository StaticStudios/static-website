import {Navbar} from "~/components/nav";
import {Header} from "~/components/header";
import {Container} from "~/components/content";
import React from "react";


export function Layout({children}: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col min-h-[100vh]">
            <Header/>
            <Navbar/>
            <Container className="flex flex-grow my-8">
                {children}
            </Container>
        </div>
    )
}