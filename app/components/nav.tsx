import logo from "~/assets/logo.png"
import {BookIcon, BookOpenIcon, HomeIcon, MenuIcon, ShoppingCartIcon, UsersIcon, VoteIcon} from "lucide-react";
import {Link, NavLink} from "react-router";
import {Sheet, SheetContent, SheetTrigger} from "~/components/ui/sheet";
import {Button} from "~/components/ui/button";
import {useState} from "react";

const routes = [
    {
        label: "Home",
        href: "/",
        icon: <HomeIcon className="size-4"/>
    }, {
        label: "Rules",
        href: "/rules",
        icon: <BookIcon className="size-4"/>
    }, {
        label: "Vote",
        href: "/vote",
        icon: <VoteIcon className="size-4"/>
    }, {
        label: "Store",
        href: "/store",
        icon: <ShoppingCartIcon className="size-4"/>
    }, {
        label: "Discord",
        href: "/discord",
        icon: <UsersIcon className="size-4"/>
    }, {
        label: "Wiki",
        href: "/wiki",
        icon: <BookOpenIcon className="size-4"/>
    }
]

export const TopNavV2 = () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <header className="sticky top-0 z-50 w-full border-b border-white/8 bg-slate-950/78 shadow-lg shadow-slate-950/15 backdrop-blur-xl">
            <div className="mx-auto flex h-16 w-full max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" className="size-10 px-0 text-white hover:bg-white/8 md:hidden">
                                <MenuIcon className="h-6 w-6"/>
                                <span className="sr-only">Toggle Menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="border-r border-white/10 bg-[linear-gradient(160deg,rgba(22,28,58,0.99),rgba(8,11,32,0.99))] text-white shadow-2xl shadow-black/40"
                                      aria-describedby="nav">
                            <div className="flex flex-col gap-6 py-4 px-6">
                                <Link to="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                                    <div className="relative h-8 w-8">
                                        <img
                                            src={logo}
                                            alt="Static logo"
                                            className="size-8 rounded"
                                        />
                                    </div>
                                    <span className="text-xl font-bold">Static</span>
                                </Link>
                                <nav className="flex flex-col gap-2">
                                    {routes.map((route) => (
                                        <NavLink
                                            key={route.href}
                                            to={route.href}
                                            className={({isActive}) => `flex items-center gap-3 rounded-xl px-3 py-2.5 text-base font-medium transition-colors ${isActive ? "bg-purple-500/12 text-purple-300" : "text-slate-300 hover:bg-white/5 hover:text-white"}`}
                                            onClick={() => setIsOpen(false)}
                                        >
                                            {route.icon}
                                            {route.label}
                                        </NavLink>
                                    ))}
                                </nav>
                            </div>
                        </SheetContent>
                    </Sheet>
                    <Link to="/" className="group flex items-center gap-2.5">
                        <span className="relative grid size-9 place-items-center rounded-xl border border-purple-300/15 bg-purple-500/10 shadow-[0_0_24px_rgba(139,92,246,0.18)] transition group-hover:border-purple-300/30">
                            <img src={logo} alt="Static logo" className="size-7 rounded-lg object-cover"/>
                        </span>
                        <span className="hidden font-[family-name:var(--font-display)] text-xl font-bold tracking-tight text-white md:inline-block">Static</span>
                    </Link>
                    <nav className="ml-5 hidden items-center gap-1 md:flex">
                        {routes.map((route, i) => route.href !== "/store" && (
                            <NavLink to={route.href} key={i}
                                  className={({isActive}) => `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${isActive ? "bg-white/7 text-white" : "text-slate-400 hover:bg-white/5 hover:text-white"}`}>
                                {route.label}
                            </NavLink>
                        ))}
                    </nav>
                    <Link to="/store" className="ml-auto">
                        <Button variant="default" className="space-x-2 rounded-xl border border-purple-300/15 bg-gradient-to-r from-violet-500 to-purple-600 shadow-lg shadow-purple-950/30 hover:from-violet-400 hover:to-purple-500">
                            <ShoppingCartIcon className="size-4"/>
                            <p>Store</p>
                        </Button>
                    </Link>
            </div>
        </header>
    )
}
