import {Link} from "react-router";
import React, {useCallback} from "react";
import {HouseIcon} from "~/components/icons/house";
import {ShieldIcon} from "~/components/icons/shield";
import {TicketIcon} from "~/components/icons/ticket";
import {CartIcon} from "~/components/icons/cart";
import {cva, type VariantProps} from "class-variance-authority";
import {MenuIcon} from "~/components/icons/menu";
import {useIsMobile} from "~/lib/mobile";

export const Navbar = () => {
    const [open, setOpen] = React.useState(false);
    const mobile = useIsMobile();

    const toggle = useCallback(() => {
        setOpen(prev => !prev);
    }, [setOpen]);

    return (
        <div className="w-full bg-theme-700 min-h-16 overflow-hidden md:min-h-0">
            <div className="container relative mx-auto">

                <button className="md:hidden absolute top-4 right-4" onClick={toggle}>
                    <MenuIcon className="text-white size-8"/>
                </button>

                <div className="flex flex-col md:flex-row py-2 md:py-4 md:justify-between gap-4"
                     style={!mobile || open ? {} : {
                         height: "0px"
                     }}>
                    <div className="flex flex-col md:flex-row gap-4 md:gap-2">
                        <NavItem icon={<HouseIcon/>} href="/">Home</NavItem>
                        <NavItem icon={<ShieldIcon/>} href="/rules">Rules</NavItem>
                        <NavItem icon={<TicketIcon/>} href="/vote">Vote</NavItem>
                    </div>
                    <div>
                        <NavItem special icon={<CartIcon/>} href="/store">Store</NavItem>
                    </div>
                </div>
            </div>
        </div>
    )
}

const item = cva("item", {
    variants: {
        special: {
            false: ["text-white", "hover:bg-white/10"],
            true: ["text-theme-800", "bg-theme-500", "hover:text-white"]
        }
    },
    defaultVariants: {
        special: false
    }
})

interface NavItemProps extends VariantProps<typeof item> {
    icon: React.ReactNode;
    href: string;
    children: string;
}

const NavItem = ({icon, href, children, special}: NavItemProps) => {
    return (
        <Link to={href}
              className={item({
                  special,
                  className: "text-xl font-bold tracking-tight flex flex-row gap-2 items-center rounded-full px-4 py-2 transition-all duration-200 w-fit"
              })}>
            {icon}
            {children.toUpperCase()}
        </Link>
    )
}