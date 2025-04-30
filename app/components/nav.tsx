import logo from "~/assets/alt_logo.png"
import {BookIcon, HomeIcon, MenuIcon, ShoppingCartIcon, UsersIcon, VoteIcon} from "lucide-react";
import {Link} from "react-router";
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
    }
]

export const TopNavV2 = () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div className="w-full sticky top-0 z-10 bg-slate-900/75 backdrop-blur border-b border-indigo-800/30">
            <div className="mx-2">
                <div className="container mx-auto flex items-center gap-2 py-4">
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" className="px-0 text-white md:hidden">
                                <MenuIcon className="h-6 w-6"/>
                                <span className="sr-only">Toggle Menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="bg-slate-900 text-white border-r border-indigo-800/50"
                                      aria-describedby="nav">
                            <div className="flex flex-col gap-6 py-4 px-6">
                                <Link to="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                                    <div className="relative h-8 w-8">
                                        <img
                                            src={logo}
                                            alt="Static Studios Logo"
                                            className="size-8 rounded"
                                        />
                                    </div>
                                    <span className="text-xl font-bold">Static Studios</span>
                                </Link>
                                <nav className="flex flex-col gap-4">
                                    {routes.map((route) => (
                                        <Link
                                            key={route.href}
                                            to={route.href}
                                            className="flex flex-row gap-2 items-center text-lg font-medium hover:text-purple-400 transition-colors"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            {route.icon}
                                            {route.label}
                                        </Link>
                                    ))}
                                </nav>
                            </div>
                        </SheetContent>
                    </Sheet>
                    <Link to="/" className="flex flex-row items-center gap-2">
                        <img src={logo} alt="logo" className="size-8 object-cover rounded"/>
                        <p className="hidden md:inline-block font-bold text-white text-xl">Static Studios</p>
                    </Link>
                    <nav className="hidden md:flex mx-6 items-center space-x-6">
                        {routes.map((route, i) => route.href !== "/store" && (
                            <Link to={route.href} key={i}
                                  className="text-sm font-medium text-white/70 hover:text-white transition-colors">
                                {/*{route.icon}*/}
                                {route.label}
                            </Link>
                        ))}
                    </nav>
                    <Link to="/store" className="ml-auto">
                        <Button variant="default" className="bg-purple-600 hover:bg-purple-700 space-x-2">
                            <ShoppingCartIcon className="size-4"/>
                            <p>Store</p>
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
