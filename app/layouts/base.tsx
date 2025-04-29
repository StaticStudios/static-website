import React from "react";
import {Footer} from "~/components/footer";
import {Outlet} from "react-router";
import {TopNavV2} from "~/components/v2/nav";
import {TebexProvider} from "~/lib/tebex";
import {CurrencyRatesProvider} from "~/lib/currency";
import {AccountProvider} from "~/lib/account";
import {Toaster} from "~/components/ui/sonner";


export default function Layout() {
    return (
        <div className="min-h-screen">
            <CurrencyRatesProvider>
                <AccountProvider>
                    <TebexProvider>
                        <TopNavV2/>
                        <Outlet/>
                    </TebexProvider>
                </AccountProvider>
            </CurrencyRatesProvider>
            <Footer/>
            <Toaster/>
        </div>
    )
}