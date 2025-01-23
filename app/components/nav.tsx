import {Link} from "react-router";
import React from "react";
import {HouseIcon} from "~/components/icons/house";
import {ShieldIcon} from "~/components/icons/shield";
import {TicketIcon} from "~/components/icons/ticket";
import {QuestionMarkIcon} from "~/components/icons/question-mark";
import {CartIcon} from "~/components/icons/cart";
import {cva, type VariantProps} from "class-variance-authority";
import {Container} from "~/components/content";

export const Navbar = () => {
    return (
        <div className="w-full bg-theme-700 ">
            <Container className="flex flex-row py-4 justify-between">
                <div className="flex flex-row gap-2">

                    <NavItem icon={<HouseIcon/>} href="/">Home</NavItem>
                    <NavItem icon={<ShieldIcon/>} href="rules">Rules</NavItem>
                    <NavItem icon={<TicketIcon/>} href="vote">Vote</NavItem>
                    <NavItem icon={<QuestionMarkIcon/>} href="support">Support</NavItem>
                </div>
                <div>
                    <NavItem special icon={<CartIcon/>} href="/store">Store</NavItem>
                </div>
            </Container>
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

//todo: mobile support


const NavItem = ({icon, href, children, special}: NavItemProps) => {
    return (
        <Link to={href}
              className={item({
                  special,
                  className: "text-xl font-bold tracking-tight flex flex-row gap-2 items-center rounded-full px-4 py-2 transition-all duration-200"
              })}>
            {icon}
            {children.toUpperCase()}
        </Link>
    )
}