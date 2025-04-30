import {useAccount} from "~/lib/account";
import {CartIcon} from "~/components/icons/cart";
import React, {useState} from "react";
import {UserPlusIcon} from "lucide-react";
import {Sheet, SheetContent, SheetTitle, SheetTrigger} from "~/components/ui/sheet";
import {Button} from "~/components/ui/button";
import {type TebexBasket} from "~/lib/tebex";
import {useCurrencies, useCurrencyFormatter} from "~/lib/currency";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "~/components/ui/dropdown-menu";
import {useStore} from "~/lib/persist";
import {Dialog, DialogContent, DialogTitle} from "~/components/ui/dialog";
import {DialogDescription} from "@radix-ui/react-dialog";
import {Link} from "react-router";

export const Cart = () => {
    const {account, promptLogin, logout} = useAccount();
    const [isOpen, setIsOpen] = useState(false);
    const currencies = useCurrencies();
    const {currency, setCurrency} = useStore()

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild disabled={!account}>
                {account ? (
                    <div
                        className="rounded-lg border border-indigo-800/30 p-4 pr-20 bg-slate-800 flex flex-row gap-4 items-center relative overflow-hidden cursor-pointer hover:bg-slate-700 transition-colors w-full md:w-auto"
                        onClick={e => {
                        }}
                    >
                        <CartIcon className="size-10 text-purple-400 mb-2"/>
                        <div>
                            <div className="flex flex-row gap-2 items-center">
                                <p className="text-white font-bold text-xl">Cart</p>
                                <p className="font-bold rounded-full py-0.5 px-2 bg-purple-400 text-white leading-tight">{account.basket.packages.map(pkg => pkg.in_basket.quantity).reduce((a, b) => a + b, 0)}</p>
                            </div>
                            <p className="text-white/70 font-medium text-lg">{account.name}</p>
                        </div>
                        <div className="absolute right-4 top-3 overflow-hidden -mb-4">
                            {account.mcje ? (
                                <img alt={account.name} src={`https://crafatar.com/renders/body/${account.uuid}`}
                                     className="object-cover h-25"/>
                            ) : (
                                <img alt="unknown skin"
                                     src={`https://crafatar.com/renders/body/c06f8906-4c8a-4911-9c29-ea1dbd1aab82`}
                                     className="object-cover h-25"/>
                            )}
                        </div>
                    </div>
                ) : (
                    <div
                        className="rounded-lg border border-indigo-800/30 p-4 pr-20 bg-slate-800 flex flex-row gap-4 items-center relative overflow-hidden cursor-pointer hover:bg-slate-700 transition-colors w-full md:w-auto"
                        onClick={e => {
                            e.preventDefault();
                            promptLogin();
                        }}
                    >
                        <UserPlusIcon className="size-10 text-purple-400 mb-2"/>
                        <div>
                            <div className="flex flex-row gap-2 items-center">
                                <p className="text-white font-bold text-xl">Guest</p>
                            </div>
                            <p className="text-white/70 font-medium text-lg">Click to Login</p>
                        </div>
                        <div className="absolute right-4 top-3 overflow-hidden -mb-4">
                            <img alt="unknown skin"
                                 src={`https://crafatar.com/renders/body/c06f8906-4c8a-4911-9c29-ea1dbd1aab82`}
                                 className="object-cover h-25"/>
                        </div>
                    </div>
                )}
            </SheetTrigger>
            <SheetContent side="right" className="bg-slate-900 text-white border-r border-indigo-800/50"
                          aria-describedby="">
                {account && (
                    <div className="flex flex-col p-4 gap-6 justify-between h-full">
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col items-start">

                                <SheetTitle className="text-xl font-semibold">
                                    You Cart
                                    - {account.basket.packages.map(pkg => pkg.in_basket.quantity).reduce((a, b) => a + b, 0)} Items
                                </SheetTitle>
                                <DropdownMenu>
                                    <DropdownMenuTrigger
                                        className="font-semibold hover:bg-purple-400/20 p-2 rounded-lg -m-2 text-purple-400">Currency:{" "}
                                        {currency ?? "USD"}</DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuLabel>Currency</DropdownMenuLabel>
                                        <DropdownMenuSeparator/>
                                        <DropdownMenuRadioGroup value={currency} onValueChange={setCurrency}>
                                            {currencies.map(currency => (
                                                <DropdownMenuRadioItem value={currency}
                                                                       key={currency}>{currency}</DropdownMenuRadioItem>
                                            ))}
                                        </DropdownMenuRadioGroup>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                            {account.basket.packages.map(pkg => (
                                <CartItem key={pkg.id} item={pkg}/>
                            ))}
                            <CheckoutButton/>
                        </div>
                        <Button
                            onClick={e => {
                                e.preventDefault();
                                logout();
                                setIsOpen(false)
                            }}
                            variant="destructive" className="mt-auto">Logout</Button>
                    </div>
                )}
            </SheetContent>
        </Sheet>

    )
}

const CheckoutButton = () => {
    const {account} = useAccount();
    const [open, setOpen] = useState(false);
    return (
        <>
            <Button
                onClick={e => {
                    // if (account.basket.packages.length > 0) {
                    //     window.open(account.basket.links.checkout, "_self");
                    // }
                    setOpen(true);
                }}>Checkout</Button>
            <Dialog onOpenChange={open => {
                setOpen(open);
            }} open={open}>
                <DialogContent
                    className="md:max-w-[95vw] w-[900px] max-h-[95vh] overflow-y-auto animate-in text-white border-indigo-800/30 p-6 bg-slate-800">
                    <DialogTitle>Continue to Checkout</DialogTitle>
                    <DialogDescription className="text-white/70">
                        By clicking <b>Continue to Checkout</b>, you are agreeing to our{" "}
                        <Link to={"/tos"} target="_blank"
                              className="text-purple-400 hover:text-purple-500 transition-colors">
                            Terms of Service
                        </Link>{" "}and our{" "}
                        <Link to={"/privacy"} target="_blank"
                              className="text-purple-400 hover:text-purple-500 transition-colors">
                            Privacy Policy.
                        </Link>
                        <br/>
                        <br/>
                        All purchases are final and non-refundable. If you have any issues with your purchase, please
                        contact us
                        via Discord.
                    </DialogDescription>
                    <Button
                        onClick={e => {
                            if (!account) {
                                return
                            }
                            if (account.basket.packages.length > 0) {
                                window.open(account.basket.links.checkout, "_self");
                            }
                        }}>Continue to Checkout</Button>
                </DialogContent>
            </Dialog>
        </>
    )
}

const CartItem = ({item}: { item: TebexBasket["packages"][number] }) => {
    const formattedCurrency = useCurrencyFormatter(item.in_basket.quantity * item.in_basket.price)
    const {removeFromCart} = useAccount()

    return (
        <div className="flex flex-row justify-between">
            <div>
                {item.in_basket.gift_username && (
                    <p className="text-purple-400">
                        Gift to {item.in_basket.gift_username}
                    </p>
                )}
                <p>
                    {item.in_basket.quantity}x {item.name}
                </p>
                <p>
                    {formattedCurrency}
                </p>
            </div>
            <Button
                onClick={() => {
                    removeFromCart(item.id)
                }}
                variant="destructive">Remove</Button>
        </div>
    )
}
