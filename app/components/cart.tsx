import {useAccount} from "~/lib/account";
import {CartIcon} from "~/components/icons/cart";
import React, {useEffect, useState} from "react";
import {
    CheckCircle2Icon,
    CreditCardIcon,
    GiftIcon,
    InfoIcon,
    LoaderCircleIcon,
    TagIcon,
    Trash2Icon,
    UserPlusIcon,
    XCircleIcon
} from "lucide-react";
import {Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger} from "~/components/ui/sheet";
import {Button} from "~/components/ui/button";
import {type TebexBasket, useTebex, useTebexContent} from "~/lib/tebex";
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
import {Input} from "~/components/ui/input";
import {toast} from "sonner";
import axios from "axios";
import {Tooltip, TooltipContent, TooltipTrigger} from "~/components/ui/tooltip";
import {
    calculateCartPricing,
    captureCreatorCodePricing,
    type CatalogUnitPricing,
} from "~/lib/cart-pricing";

export const Cart = () => {
    const {account, promptLogin, logout} = useAccount();
    const [isOpen, setIsOpen] = useState(false);
    const currencies = useCurrencies();
    const {currency, setCurrency} = useStore()
    const {parentCategories} = useTebexContent();
    const {getGiftCardBalance} = useTebex();
    const [giftCardBalances, setGiftCardBalances] = useState<Record<string, number | null>>({});
    const catalogCategories = parentCategories.flatMap(parentCategory => [
        {category: parentCategory, parentName: undefined},
        ...(parentCategory.children ?? []).map(category => ({
            category,
            parentName: parentCategory.name,
        })),
    ]);
    const catalogPricing = new Map<number, CatalogUnitPricing>(
        catalogCategories.flatMap(({category}) => category.packages.map(pkg => [pkg.id, {
            originalUnitPrice: pkg.base_price,
            saleUnitPrice: pkg.sale_price,
        }] as const)),
    );
    const packageCategories = new Map<number, Omit<CartCategoryGroup, "items">>(
        catalogCategories.flatMap(({category, parentName}) => category.packages.map(pkg => [pkg.id, {
            key: String(category.id),
            name: category.name,
            parentName,
        }] as const)),
    );
    const cartCategoryGroups = Array.from(
        (account?.basket.packages ?? []).reduce((groups, item) => {
            const category = packageCategories.get(item.id) ?? {
                key: "other",
                name: "Other items",
                parentName: undefined,
            };
            const group = groups.get(category.key);

            if (group) {
                group.items.push(item);
            } else {
                groups.set(category.key, {...category, items: [item]});
            }

            return groups;
        }, new Map<string, CartCategoryGroup>()).values(),
    );
    const giftCardNumbersKey = account?.basket.giftcards
        .map(giftCard => normalizeGiftCardNumber(giftCard.card_number))
        .join("|") ?? "";

    useEffect(() => {
        const currentAccount = account;
        let cancelled = false;

        if (!currentAccount || currentAccount.basket.giftcards.length === 0) {
            setGiftCardBalances({});
            return;
        }

        Promise.all(currentAccount.basket.giftcards.map(async giftCard => {
            const normalizedCardNumber = normalizeGiftCardNumber(giftCard.card_number);
            try {
                const balance = Number(await getGiftCardBalance(normalizedCardNumber, currentAccount));
                return [normalizedCardNumber, Number.isFinite(balance) ? balance : null] as const;
            } catch {
                return [normalizedCardNumber, null] as const;
            }
        })).then(entries => {
            if (!cancelled) {
                setGiftCardBalances(Object.fromEntries(entries));
            }
        });

        return () => {
            cancelled = true;
        };
    }, [account?.name, giftCardNumbersKey, getGiftCardBalance]);

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild disabled={!account}>
                {account ? (
                    <div
                        className="surface-card relative flex w-full cursor-pointer items-center gap-4 overflow-hidden p-4 pr-20 transition hover:border-purple-400/30 hover:bg-white/5 md:w-auto"
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
                        <div className="absolute right-0 botton-0 -mb-2 overflow-hidden">
                            {account.mcje ? (
                                <img alt={account.name}
                                     src={`https://render.crafty.gg/3d/bust/${account.uuid}`}
                                     className="object-cover h-20"/>
                            ) : (
                                <img alt="unknown skin"
                                     src={`https://render.crafty.gg/3d/bust/c06f8906-4c8a-4911-9c29-ea1dbd1aab82`}
                                     className="object-cover h-20"/>
                            )}
                        </div>
                    </div>
                ) : (
                    <div
                        className="surface-card relative flex w-full cursor-pointer items-center gap-4 overflow-hidden p-4 pr-20 transition hover:border-purple-400/30 hover:bg-white/5 md:w-auto"
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
                        <div className="absolute right-0 botton-0 -mb-2 overflow-hidden">
                            <img alt="unknown skin"
                                 src={`https://render.crafty.gg/3d/bust/c06f8906-4c8a-4911-9c29-ea1dbd1aab82`}
                                 className="object-cover h-20"/>
                        </div>
                    </div>
                )}
            </SheetTrigger>
            <SheetContent side="right"
                          className="overflow-y-auto overscroll-contain border-l border-white/10 bg-[linear-gradient(160deg,rgba(22,28,58,0.98),rgba(8,11,32,0.99))] text-white shadow-2xl shadow-black/40"
                          aria-describedby="">
                {account && (
                    <div className="flex min-h-full flex-col justify-between gap-6 p-4">
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col items-start">

                                <SheetTitle className="text-xl font-semibold">
                                    Your Cart
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
                            <div className="space-y-5" aria-label="Cart items by category">
                                {cartCategoryGroups.map(group => {
                                    const quantity = group.items.reduce(
                                        (total, item) => total + item.in_basket.quantity,
                                        0,
                                    );
                                    const regularItems = group.items.filter(
                                        item => !item.in_basket.gift_username?.trim(),
                                    );
                                    const giftItems = group.items.filter(
                                        item => Boolean(item.in_basket.gift_username?.trim()),
                                    );
                                    const giftQuantity = giftItems.reduce(
                                        (total, item) => total + item.in_basket.quantity,
                                        0,
                                    );

                                    return (
                                        <section key={group.key} aria-labelledby={`cart-category-${group.key}`}>
                                            <div className="mb-2 flex items-center justify-between gap-3 border-b border-purple-400/20 pb-2">
                                                <h3 id={`cart-category-${group.key}`}
                                                    className="truncate text-xs font-semibold uppercase tracking-widest text-white">
                                                    {group.parentName && (
                                                        <>
                                                            <span className="text-purple-300">{group.parentName}</span>
                                                            <span className="px-1.5 text-white/35" aria-hidden="true">/</span>
                                                        </>
                                                    )}
                                                    {group.name}
                                                </h3>
                                                <span className="shrink-0 rounded-full bg-purple-400/10 px-2 py-0.5 text-xs font-medium text-purple-200">
                                                    {quantity} {quantity === 1 ? "item" : "items"}
                                                </span>
                                            </div>
                                            <div className="space-y-2">
                                                {regularItems.map((item, index) => (
                                                    <CartItem
                                                        key={`${item.id}-self-${index}`}
                                                        item={item}
                                                        catalogPricing={catalogPricing.get(item.id)}
                                                    />
                                                ))}
                                                {giftItems.length > 0 && (
                                                    <div
                                                        className={`space-y-2 ${regularItems.length > 0 ? "border-t border-purple-400/20 pt-3" : ""}`}
                                                        role="group"
                                                        aria-label="Gift items"
                                                    >
                                                        <div className="flex items-center gap-2 px-1 text-purple-200">
                                                            <GiftIcon className="size-3.5"/>
                                                            <p className="text-xs font-semibold uppercase tracking-wider">Gifts</p>
                                                            <span className="text-xs text-white/45">
                                                                {giftQuantity} {giftQuantity === 1 ? "item" : "items"}
                                                            </span>
                                                        </div>
                                                        {giftItems.map((item, index) => (
                                                            <CartItem
                                                                key={`${item.id}-${item.in_basket.gift_username}-${index}`}
                                                                item={item}
                                                                catalogPricing={catalogPricing.get(item.id)}
                                                            />
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </section>
                                    )
                                })}
                            </div>
                            <CartSummary
                                basket={account.basket}
                                catalogPricing={catalogPricing}
                                giftCardBalances={giftCardBalances}
                            />
                            <GiftCards
                                catalogPricing={catalogPricing}
                                giftCardBalances={giftCardBalances}
                                onOpenGuide={() => setIsOpen(false)}
                            />
                            <CreatorCode catalogPricing={catalogPricing}/>
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
                disabled={!account || account.basket.packages.length === 0}
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
                    className="surface-panel max-h-[95vh] w-[900px] overflow-y-auto border-white/10 p-6 text-white md:max-w-[95vw]">
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

type GiftCardFeedback = {
    type: "success" | "error";
    message: string;
}

const normalizeGiftCardNumber = (cardNumber: string | number) => String(cardNumber).replace(/\s/g, "");

const formatGiftCardInput = (cardNumber: string) => cardNumber
    .replace(/\D/g, "")
    .slice(0, 16)
    .match(/.{1,4}/g)
    ?.join(" ") ?? "";

const maskGiftCardNumber = (cardNumber: string | number) => {
    const normalizedCardNumber = normalizeGiftCardNumber(cardNumber);
    return `•••• •••• •••• ${normalizedCardNumber.slice(-4)}`;
}

const AppliedGiftCard = ({
                             cardNumber,
                             balance,
                             disabled,
                             isRemoving,
                             onRemove,
                         }: {
    cardNumber: string | number;
    balance?: number | null;
    disabled: boolean;
    isRemoving: boolean;
    onRemove: () => void;
}) => {
    const formattedBalance = useCurrencyFormatter(balance ?? undefined, 2);

    return (
        <div className="flex items-center justify-between gap-2 rounded-md border border-emerald-400/30 bg-emerald-400/10 px-3 py-2">
            <div className="flex min-w-0 items-center gap-2 text-emerald-300">
                <CheckCircle2Icon className="size-4 shrink-0"/>
                <div className="min-w-0">
                    <p className="truncate font-mono text-xs font-semibold">
                        {maskGiftCardNumber(cardNumber)}
                    </p>
                    <p className="mt-0.5 text-xs text-emerald-100/70" aria-live="polite">
                        {balance === undefined
                            ? "Checking balance…"
                            : balance === null
                                ? "Balance unavailable"
                                : `${formattedBalance} remaining`}
                    </p>
                </div>
            </div>
            <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-7 px-2 text-white/70 hover:text-white"
                disabled={disabled}
                onClick={onRemove}
            >
                {isRemoving && <LoaderCircleIcon className="animate-spin"/>}
                Remove
            </Button>
        </div>
    )
}

const GiftCards = ({
                       catalogPricing,
                       giftCardBalances,
                       onOpenGuide,
                   }: {
    catalogPricing: Map<number, CatalogUnitPricing>;
    giftCardBalances: Record<string, number | null>;
    onOpenGuide: () => void;
}) => {
    const {account, updateBasket} = useAccount();
    const {applyGiftCard, removeGiftCard} = useTebex();
    const [cardNumber, setCardNumber] = useState("");
    const [feedback, setFeedback] = useState<GiftCardFeedback | undefined>();
    const [loadingAction, setLoadingAction] = useState<string | undefined>();
    const appliedGiftCards = account?.basket.giftcards ?? [];
    const normalizedCardNumber = normalizeGiftCardNumber(cardNumber);

    const apply = async () => {
        if (!account || !/^\d{16}$/.test(normalizedCardNumber) || loadingAction) {
            return;
        }

        const isAlreadyApplied = appliedGiftCards.some(giftCard =>
            normalizeGiftCardNumber(giftCard.card_number) === normalizedCardNumber
        );
        if (isAlreadyApplied) {
            setFeedback({type: "error", message: "That gift card is already applied to this cart."});
            return;
        }

        setLoadingAction("apply");
        setFeedback(undefined);

        try {
            const pricedBasket = captureCreatorCodePricing(account.basket, catalogPricing);
            const basket = await applyGiftCard(pricedBasket, normalizedCardNumber);
            updateBasket(basket);
            setCardNumber("");
            setFeedback({type: "success", message: "Gift card applied successfully."});
            toast.success(`Gift card ending in ${normalizedCardNumber.slice(-4)} applied`);
        } catch (error) {
            const isInvalidCard = axios.isAxiosError(error) && error.response?.status === 422;
            setFeedback({
                type: "error",
                message: isInvalidCard
                    ? "That gift card is invalid, empty, or can’t be used with this cart."
                    : "We couldn’t apply that gift card. Please try again.",
            });
            toast.error("Gift card could not be applied");
        } finally {
            setLoadingAction(undefined);
        }
    }

    const remove = async (giftCardNumber: string | number) => {
        if (!account || loadingAction) {
            return;
        }

        const normalizedGiftCardNumber = normalizeGiftCardNumber(giftCardNumber);
        setLoadingAction(normalizedGiftCardNumber);
        setFeedback(undefined);

        try {
            const basket = await removeGiftCard(account.basket, normalizedGiftCardNumber);
            updateBasket(basket);
            setFeedback({type: "success", message: "Gift card removed."});
            toast.success(`Gift card ending in ${normalizedGiftCardNumber.slice(-4)} removed`);
        } catch {
            setFeedback({type: "error", message: "We couldn’t remove that gift card. Please try again."});
            toast.error("Gift card could not be removed");
        } finally {
            setLoadingAction(undefined);
        }
    }

    return (
        <section className="surface-card p-4"
                 aria-labelledby="gift-card-title">
            <div className="mb-3 flex items-start gap-3">
                <div className="rounded-md bg-purple-400/15 p-2 text-purple-300">
                    <CreditCardIcon className="size-4"/>
                </div>
                <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                        <h3 id="gift-card-title" className="font-semibold">Apply gift card</h3>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    to="/wiki/misc/gift-cards"
                                    onClick={onOpenGuide}
                                    className="rounded-full p-0.5 text-white/50 transition-colors hover:text-purple-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
                                    aria-label="Read the gift card guide"
                                >
                                    <InfoIcon className="size-4"/>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="top" sideOffset={8} className="max-w-64">
                                Enter a 16-digit gift card before checkout. You can apply more than one card. Click or tap
                                for the complete guide.
                            </TooltipContent>
                        </Tooltip>
                    </div>
                    <p className="text-sm text-white/60">Apply one or more gift cards to this cart.</p>
                </div>
            </div>

            {appliedGiftCards.length > 0 && (
                <div className="mb-3 space-y-2" aria-label="Applied gift cards">
                    {appliedGiftCards.map(giftCard => {
                        const normalizedAppliedCard = normalizeGiftCardNumber(giftCard.card_number);
                        return (
                            <AppliedGiftCard
                                key={normalizedAppliedCard}
                                cardNumber={giftCard.card_number}
                                balance={giftCardBalances[normalizedAppliedCard]}
                                disabled={loadingAction !== undefined}
                                isRemoving={loadingAction === normalizedAppliedCard}
                                onRemove={() => void remove(giftCard.card_number)}
                            />
                        )
                    })}
                </div>
            )}

            <form
                className="flex gap-2"
                onSubmit={event => {
                    event.preventDefault();
                    void apply();
                }}
            >
                <Input
                    aria-label="16-digit gift card number"
                    autoComplete="off"
                    inputMode="numeric"
                    className="h-10 rounded-xl border-white/10 bg-slate-950/35 font-mono placeholder:font-sans focus-visible:border-purple-400"
                    placeholder="0000 0000 0000 0000"
                    value={cardNumber}
                    onChange={event => {
                        setCardNumber(formatGiftCardInput(event.target.value));
                        setFeedback(undefined);
                    }}
                />
                <Button
                    type="submit"
                    className="h-10"
                    disabled={!/^\d{16}$/.test(normalizedCardNumber) || loadingAction !== undefined}
                >
                    {loadingAction === "apply" && <LoaderCircleIcon className="animate-spin"/>}
                    Apply
                </Button>
            </form>

            {feedback && (
                <div
                    role={feedback.type === "error" ? "alert" : "status"}
                    aria-live="polite"
                    className={feedback.type === "error"
                        ? "mt-3 flex items-start gap-2 text-sm text-red-300"
                        : "mt-3 flex items-start gap-2 text-sm text-emerald-300"}
                >
                    {feedback.type === "error"
                        ? <XCircleIcon className="mt-0.5 size-4 shrink-0"/>
                        : <CheckCircle2Icon className="mt-0.5 size-4 shrink-0"/>}
                    <p>{feedback.message}</p>
                </div>
            )}
        </section>
    )
}

type CreatorCodeFeedback = {
    type: "success" | "error";
    message: string;
}

const CreatorCode = ({catalogPricing}: { catalogPricing: Map<number, CatalogUnitPricing> }) => {
    const {account, updateBasket} = useAccount();
    const {applyCreatorCode, removeCreatorCode} = useTebex();
    const appliedCode = account?.basket.creator_code?.trim() ?? "";
    const [creatorCode, setCreatorCode] = useState(appliedCode);
    const [feedback, setFeedback] = useState<CreatorCodeFeedback | undefined>();
    const [loadingAction, setLoadingAction] = useState<"apply" | "remove" | undefined>();

    useEffect(() => {
        setCreatorCode(appliedCode);
    }, [account?.basket.ident, appliedCode]);

    const apply = async () => {
        const normalizedCode = creatorCode.trim();
        if (!account || !normalizedCode || loadingAction) {
            return;
        }

        setLoadingAction("apply");
        setFeedback(undefined);

        try {
            const previousBasket = account.basket;
            const basket = await applyCreatorCode(previousBasket, normalizedCode);
            const confirmedCode = basket.creator_code?.trim();

            if (!confirmedCode) {
                throw new Error("Creator code was not returned on the basket");
            }

            const pricedBasket = captureCreatorCodePricing(
                basket,
                catalogPricing,
                previousBasket,
            );
            updateBasket(pricedBasket);
            setCreatorCode(confirmedCode);
            toast.success(`Creator code ${confirmedCode.toUpperCase()} applied`);
        } catch (error) {
            const isInvalidCode = axios.isAxiosError(error) && error.response?.status === 422;
            setFeedback({
                type: "error",
                message: isInvalidCode
                    ? "That creator code is invalid or can’t be used with this cart."
                    : "We couldn’t check that creator code. Please try again.",
            });
            toast.error("Creator code could not be applied");
        } finally {
            setLoadingAction(undefined);
        }
    }

    const remove = async () => {
        if (!account || loadingAction) {
            return;
        }

        setLoadingAction("remove");
        setFeedback(undefined);

        try {
            const basket = await removeCreatorCode(account.basket);
            updateBasket(basket);
            setCreatorCode("");
            setFeedback({type: "success", message: "Creator code removed."});
            toast.success("Creator code removed");
        } catch {
            setFeedback({
                type: "error",
                message: "We couldn’t remove that creator code. Please try again.",
            });
            toast.error("Creator code could not be removed");
        } finally {
            setLoadingAction(undefined);
        }
    }

    return (
        <section className="surface-card p-4"
                 aria-labelledby="creator-code-title">
            <div className="mb-3 flex items-start gap-3">
                <div className="rounded-md bg-purple-400/15 p-2 text-purple-300">
                    <TagIcon className="size-4"/>
                </div>
                <div>
                    <h3 id="creator-code-title" className="font-semibold">Creator code</h3>
                    <p className="text-sm text-white/60">Support a creator and unlock any eligible cart discounts.</p>
                </div>
            </div>

            {appliedCode ? (
                <div className="rounded-md border border-emerald-400/30 bg-emerald-400/10 p-3">
                    <div className="flex items-center justify-between gap-3">
                        <div className="flex min-w-0 items-center gap-2 text-emerald-300">
                            <CheckCircle2Icon className="size-4 shrink-0"/>
                            <p className="truncate text-sm font-semibold">
                                <span className="font-mono">{appliedCode.toUpperCase()}</span> applied
                            </p>
                        </div>
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="h-7 px-2 text-white/70 hover:text-white"
                            disabled={loadingAction !== undefined}
                            onClick={remove}
                        >
                            {loadingAction === "remove" && <LoaderCircleIcon className="animate-spin"/>}
                            Remove
                        </Button>
                    </div>
                    <p className="mt-1 pl-6 text-xs text-emerald-200/70">
                        Your creator code will carry through to checkout.
                    </p>
                </div>
            ) : (
                <form
                    className="flex gap-2"
                    onSubmit={e => {
                        e.preventDefault();
                        void apply();
                    }}
                >
                    <Input
                        aria-label="Creator code"
                        autoComplete="off"
                        className="h-10 rounded-xl border-white/10 bg-slate-950/35 font-mono uppercase placeholder:font-sans placeholder:normal-case focus-visible:border-purple-400"
                        placeholder="Enter creator code"
                        value={creatorCode}
                        onChange={e => {
                            setCreatorCode(e.target.value);
                            setFeedback(undefined);
                        }}
                    />
                    <Button
                        type="submit"
                        className="h-10"
                        disabled={!creatorCode.trim() || loadingAction !== undefined}
                    >
                        {loadingAction === "apply" && <LoaderCircleIcon className="animate-spin"/>}
                        Apply
                    </Button>
                </form>
            )}

            {feedback && !appliedCode && (
                <div
                    role={feedback.type === "error" ? "alert" : "status"}
                    aria-live="polite"
                    className={feedback.type === "error"
                        ? "mt-3 flex items-start gap-2 text-sm text-red-300"
                        : "mt-3 flex items-start gap-2 text-sm text-emerald-300"}
                >
                    {feedback.type === "error"
                        ? <XCircleIcon className="mt-0.5 size-4 shrink-0"/>
                        : <CheckCircle2Icon className="mt-0.5 size-4 shrink-0"/>}
                    <p>{feedback.message}</p>
                </div>
            )}
        </section>
    )
}

const CartSummary = ({
                         basket,
                         catalogPricing,
                         giftCardBalances,
                     }: {
    basket: TebexBasket;
    catalogPricing: Map<number, CatalogUnitPricing>;
    giftCardBalances: Record<string, number | null>;
}) => {
    const {
        subtotal,
        salesSavings,
        creatorCodeSavings,
        tax,
        giftCardSavings,
        total,
    } = calculateCartPricing({basket, catalogPricing, giftCardBalances});
    const formattedSubtotal = useCurrencyFormatter(subtotal);
    const formattedSalesSavings = useCurrencyFormatter(-salesSavings, 2);
    const formattedCreatorCodeSavings = useCurrencyFormatter(-creatorCodeSavings, 2);
    const formattedTax = useCurrencyFormatter(tax);
    const formattedGiftCardSavings = useCurrencyFormatter(-giftCardSavings, 2);
    const formattedTotal = useCurrencyFormatter(total);

    return (
        <section className="space-y-2 border-t border-white/10 pt-4 text-sm" aria-label="Cart total">
            <div className="flex justify-between text-white/70">
                <span>Subtotal</span>
                <span className={salesSavings > 0 || creatorCodeSavings > 0 ? "line-through" : undefined}>
                    {formattedSubtotal}
                </span>
            </div>
            {salesSavings > 0 && (
                <div className="flex justify-between text-emerald-300">
                    <span>Sales</span>
                    <span>{formattedSalesSavings}</span>
                </div>
            )}
            {creatorCodeSavings > 0 && (
                <div className="flex justify-between text-emerald-300">
                    <span>Creator Code</span>
                    <span>{formattedCreatorCodeSavings}</span>
                </div>
            )}
            {tax > 0 && (
                <div className="flex justify-between text-white/70">
                    <span>Tax</span>
                    <span>{formattedTax}</span>
                </div>
            )}
            {giftCardSavings > 0 && (
                <div className="flex justify-between text-emerald-300">
                    <span>Gift Cards</span>
                    <span>{formattedGiftCardSavings}</span>
                </div>
            )}
            <div className="flex justify-between border-t border-white/10 pt-2 text-base font-semibold">
                <span>Total</span>
                <span>{formattedTotal}</span>
            </div>
        </section>
    )
}

type CartCategoryGroup = {
    key: string;
    name: string;
    parentName?: string;
    items: TebexBasket["packages"];
}

const CartItem = ({
                      item,
                      catalogPricing,
                  }: {
    item: TebexBasket["packages"][number];
    catalogPricing?: CatalogUnitPricing;
}) => {
    const quantity = item.in_basket.quantity;
    const saleUnitPrice = catalogPricing?.saleUnitPrice ?? item.in_basket.price;
    const originalUnitPrice = Math.max(
        catalogPricing?.originalUnitPrice ?? saleUnitPrice,
        saleUnitPrice,
    );
    const originalAmount = quantity * originalUnitPrice;
    const saleAmount = quantity * saleUnitPrice;
    const hasSale = saleAmount < originalAmount - 0.005;
    const discountPercentage = hasSale
        ? Math.round((1 - saleAmount / originalAmount) * 100)
        : 0;
    const formattedOriginalAmount = useCurrencyFormatter(originalAmount);
    const formattedSaleAmount = useCurrencyFormatter(saleAmount);
    const giftRecipient = item.in_basket.gift_username?.trim();
    const {removeFromCart} = useAccount()

    return (
        <article className={giftRecipient
            ? "rounded-xl border border-purple-400/35 bg-purple-500/10 p-3 transition-colors hover:border-purple-400/60"
            : "rounded-xl border border-white/10 bg-white/4 p-3 transition-colors hover:border-purple-400/30"}>
            <div className="flex items-center gap-3">
                {item.image && (
                    <img
                        src={item.image}
                        alt=""
                        className="size-14 shrink-0 rounded-md bg-white object-cover"
                    />
                )}
                <div className="min-w-0 flex-1">
                    {giftRecipient && (
                        <p className="mb-1 flex items-center gap-1.5 truncate text-xs text-purple-200">
                            <GiftIcon className="size-3.5 shrink-0"/>
                            <span className="truncate">
                                Gift for <span className="font-semibold text-white">{giftRecipient}</span>
                            </span>
                        </p>
                    )}
                    <div className="flex items-center gap-2">
                        <SheetClose asChild>
                            <Link
                                to={`/store/item/${item.id}`}
                                className="truncate font-semibold text-white transition-colors hover:text-purple-300 hover:underline focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
                            >
                                {item.name}
                            </Link>
                        </SheetClose>
                        <span className="shrink-0 rounded-full bg-white/10 px-2 py-0.5 text-xs text-white/70">
                            ×{quantity}
                        </span>
                    </div>
                    {hasSale ? (
                        <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1">
                            <span className="text-sm text-white/45 line-through decoration-white/40">
                                {formattedOriginalAmount}
                            </span>
                            <span className="font-semibold text-emerald-300">
                                {formattedSaleAmount}
                            </span>
                            <span className="rounded-full bg-emerald-400/15 px-2 py-0.5 text-xs font-semibold text-emerald-300">
                                {discountPercentage}% off
                            </span>
                        </div>
                    ) : (
                        <p className="mt-2 font-semibold text-purple-400">{formattedSaleAmount}</p>
                    )}
                </div>
                <Button
                    onClick={() => {
                        removeFromCart(item.id)
                    }}
                    variant="ghost"
                    size="icon"
                    className="shrink-0 text-white/45 hover:bg-red-400/15 hover:text-red-300"
                    aria-label={`Remove ${item.name}${giftRecipient ? ` gift for ${giftRecipient}` : ""} from cart`}
                >
                    <Trash2Icon/>
                </Button>
            </div>
        </article>
    )
}
