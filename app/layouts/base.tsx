import React from "react";
import {Footer} from "~/components/footer";
import {Outlet} from "react-router";
import {TopNavV2} from "~/components/nav";
import {TebexProvider} from "~/lib/tebex";
import {CurrencyRatesProvider} from "~/lib/currency";
import {AccountProvider} from "~/lib/account";
import {Toaster} from "~/components/ui/sonner";


export default function Layout() {
    return (
        <div className="min-h-screen flex flex-col">
            <CurrencyRatesProvider>
                <AccountProvider>
                    <TebexProvider>
                        <TopNavV2/>
                        <div className="relative isolate flex flex-1 flex-col overflow-hidden">
                            <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_8%_12%,rgba(124,58,237,0.12),transparent_25rem),radial-gradient(circle_at_92%_38%,rgba(79,70,229,0.13),transparent_28rem)]"/>
                            <div className="hero-grid pointer-events-none absolute inset-x-0 top-0 -z-10 h-[620px] opacity-10"/>
                            <Outlet/>
                        </div>
                    </TebexProvider>
                </AccountProvider>
            </CurrencyRatesProvider>
            <Footer/>
            <Toaster/>
        </div>
    )
}
