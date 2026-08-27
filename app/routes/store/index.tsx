import type {Route} from "../../+types/root";
import {type TebexCategory, type TebexPackage, useIsTebexEnabled, useTebex, useTebexContent} from "~/lib/tebex";
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "~/components/ui/collapsible";
import {CheckIcon, ChevronDown, ExternalLinkIcon, InfoIcon, ShoppingCartIcon} from "lucide-react";
import {Link, ScrollRestoration} from "react-router";
import {
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarInset,
    SidebarMenuSub,
    SidebarMenuSubItem,
    SidebarProvider
} from "~/components/ui/sidebar";
import {Button} from "~/components/ui/button";
import React, {useState} from "react";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "~/components/ui/tooltip";
import {useCurrencyFormatter} from "~/lib/currency";
import {Cart} from "~/components/cart";
import {useAccount} from "~/lib/account";
import {FullScreenLoading} from "~/components/FullScreenLoading";
import {PageShell} from "~/components/page-shell";

export function meta({}: Route.MetaArgs) {
    return [
        {title: "Static | Store - Ranks, Bundles & Items"},
        {name: "description", content: "Browse the Static store for Minecraft server ranks, bundles, and cosmetic items for Skyblock and Prison."},
        {name: "robots", content: "index, follow"},
        {property: "og:title", content: "Static Store - Ranks, Bundles & Items"},
        {property: "og:description", content: "Browse ranks, bundles, and cosmetic items for the Static Minecraft server."},
        {property: "og:type", content: "website"},
        {property: "og:url", content: "https://staticstudios.net/store"},
        {property: "og:image", content: "https://staticstudios.net/image/skyblock.png"},
        {property: "og:site_name", content: "Static"},
        {name: "twitter:card", content: "summary_large_image"},
    ];
}

export default function Store({params}: Route.LoaderArgs) {
    const {categoryId} = params;
    const {parentCategories, useCategory} = useTebexContent();
    const _category = useCategory(categoryId);
    const tebexEnabled = useIsTebexEnabled()

    const rawParentCategory = _category ? (_category.parent ?? _category) : parentCategories[0] ? parentCategories[0] : undefined;
    const parentCategory = useCategory(rawParentCategory?.slug);
    const children = parentCategory?.children;
    let category = children?.find(child => child.slug == categoryId);
    if (!category) {
        category = parentCategory?.children ? parentCategory!.children![0] : undefined
    }

    if (!tebexEnabled) {
        return (
            <PageShell className="flex flex-1 items-center justify-center py-24">
                <div className="surface-panel max-w-xl p-10 text-center">
                    <p className="page-eyebrow">Static store</p>
                    <h1 className="page-title">Temporarily offline</h1>
                    <p className="page-lede mx-auto">The store is currently disabled. Please check back soon.</p>
                </div>
            </PageShell>
        )
    }

    if (!category) {
        return (
            <></>
        )
    }

    return (
        <>
            <ScrollRestoration/>
            <PageShell>
                    <div className="flex min-w-0 flex-col gap-7 md:flex-row">
                        <div className="shrink-0">
                            <Sidebar/>
                        </div>
                        <div className="min-w-0 flex-1">
                            {category && <Category category={category}/>}
                        </div>
                    </div>
            </PageShell>
        </>
    )
}

const Category = ({category}: { category: TebexCategory }) => {
    const {useCategory} = useTebexContent();
    const parent = useCategory(category.parent?.slug) ?? category;
    return (
        <div className="flex flex-col gap-6">
            <div
                className="relative flex flex-col gap-5 border-b border-white/8 pb-5 lg:flex-row lg:items-end lg:justify-between">
                <div className="hidden md:block">
                    <p className="page-eyebrow">Static store</p>
                    <h1 className="text-4xl font-black tracking-[-0.035em] text-white">{parent.name}</h1>
                </div>
                <MobileParentCategorySelect currentParent={parent}/>
                <div className="flex flex-1 flex-row flex-wrap gap-1 text-center md:self-end md:[&>a]:flex-0 [&>a]:flex-1">
                    {parent?.children?.map(child => (
                        <Link
                            preventScrollReset={true}
                            key={child.id}
                            to={`/store/${child.slug}`}
                            data-active={child.id == category.id}
                            className="text-nowrap rounded-lg px-4 py-2 text-sm font-semibold text-slate-400 transition-colors hover:bg-white/5 hover:text-white data-[active=true]:bg-purple-500/12 data-[active=true]:text-purple-200">
                            {child.name}
                        </Link>
                    ))}
                </div>
                <Cart/>
            </div>

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 2xl:grid-cols-3">
                {category.packages.map(pkg => <PackageCard key={pkg.id} pkg={pkg}/>)}
            </div>
        </div>
    )
}


const MobileParentCategorySelect = ({
                                        currentParent
                                    }: {
    currentParent: TebexCategory;
}) => {
    const {parentCategories} = useTebexContent();
    const [open, setOpen] = useState(false);

    return (
        <div className="md:hidden">
            <Collapsible open={open} onOpenChange={setOpen}>
                <div className="surface-panel overflow-hidden rounded-2xl">
                    <CollapsibleTrigger asChild>
                        <Button
                            variant="ghost"
                            className="w-full h-auto px-4 py-4 rounded-none flex items-center justify-between text-left hover:bg-purple-500/10"
                        >
                            <div className="flex flex-col items-start">
                                <span className="text-xs uppercase tracking-wide text-white/50">
                                    Category
                                </span>
                                <span className="text-xl font-semibold text-white">
                                    {currentParent.name}
                                </span>
                            </div>
                            <ChevronDown
                                className={`h-5 w-5 text-white/70 transition-transform ${open ? "rotate-180" : ""}`}
                            />
                        </Button>
                    </CollapsibleTrigger>

                    <CollapsibleContent>
                        <div className="border-t border-white/8 bg-slate-950/25">
                            {parentCategories.map(parent => {
                                const active = parent.id === currentParent.id;

                                return (
                                    <Link
                                        key={parent.id}
                                        preventScrollReset={true}
                                        to={`/store/${parent.slug}`}
                                        onClick={() => setOpen(false)}
                                        className={`flex items-center gap-3 px-4 py-4 text-lg transition-colors border-b border-white/5 last:border-b-0 ${
                                            active
                                                ? "bg-purple-600/15 text-white"
                                                : "text-white/80 hover:bg-white/5 hover:text-white"
                                        }`}
                                    >
                                        <span className="w-5 flex justify-center">
                                            {active ? <CheckIcon className="h-5 w-5 text-purple-400"/> : null}
                                        </span>
                                        <span>{parent.name}</span>
                                    </Link>
                                );
                            })}
                        </div>
                    </CollapsibleContent>
                </div>
            </Collapsible>
        </div>
    );
};


const PackageCard = ({pkg}: { pkg: TebexPackage }) => {
    const {addToCart} = useAccount()
    const price = useCurrencyFormatter(pkg.base_price);
    const salePrice = useCurrencyFormatter(pkg.sale_price);
    return (
        <article className="surface-card-interactive group flex h-full min-w-0 flex-col overflow-hidden">
            <div className="relative aspect-square w-full overflow-hidden bg-white">
                <img alt={pkg.name}
                     loading="lazy" decoding="async"
                     className="size-full flex-none object-cover transition duration-500 group-hover:scale-[1.035]"
                     src={pkg.image ? pkg.image : undefined}/>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/20 to-transparent"/>
            </div>
            <div className="flex flex-1 flex-col gap-4 p-5">
                <div className="flex min-h-14 items-start justify-between gap-3">
                    <h2 className="min-w-0 text-xl font-bold leading-tight text-white">{pkg.name}</h2>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0 text-white/70 hover:text-white">
                                    <InfoIcon className="h-4 w-4"/>
                                    <span className="sr-only">View details</span>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent className="border-indigo-800/50 text-white max-w-xs">
                                <div className="space-y-2">
                                    <p>{pkg.description}</p>
                                    <ul className="list-disc pl-4 text-sm">
                                        {pkg.features.map((feature, index) => (
                                            <li key={index}>{feature}</li>
                                        ))}
                                    </ul>
                                </div>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
                <div className="mt-auto flex flex-col gap-3 border-t border-white/8 pt-4">
                    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                        <p data-sale={price != salePrice}
                           className="hidden text-sm font-semibold text-slate-500 line-through data-[sale=true]:block">{price}</p>
                        <p className="text-2xl font-black tracking-tight text-purple-300">{salePrice}</p>
                    </div>
                    <div className="grid w-full grid-cols-1 gap-2">
                        <Button
                            onClick={() => {
                                addToCart(pkg, 1)
                            }}
                            className="h-11 w-full rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 shadow-lg shadow-purple-950/25">
                            <ShoppingCartIcon className="size-4"/>
                            <span>Add to Cart</span>
                        </Button>
                        <Button asChild variant="secondary" className="h-11 w-full">
                            <Link to={`/store/item/${pkg.id}`}>
                                View Details
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </article>
    )
}

const Sidebar = () => {
    const {parentCategories} = useTebexContent();

    return (
        <div className="md:flex flex-col gap-4 hidden">
            <SidebarProvider className="min-h-0! flex flex-col gap-4 bg-transparent!">
                <div className="surface-panel h-max w-[300px] overflow-hidden rounded-2xl">
                    <SidebarInset className="bg-transparent p-5">
                        <SidebarContent>
                            {parentCategories.map((parent, i) => (
                                <div key={i}>
                                    <Link
                                        preventScrollReset={true}
                                        to={`/store/${parent.slug}`}
                                        className="text-xl text-white font-semibold hover:underline">{parent.name}
                                    </Link>
                                    {parent.children?.map((category, j) => (
                                        <Collapsible defaultOpen={j == 0} className="group/collapsible"
                                                     key={category.id}>
                                            <SidebarGroup key={category.id} className="text-white">
                                                <SidebarGroupLabel asChild className="text-white">
                                                    <CollapsibleTrigger
                                                        className="hover:bg-purple-400/20 transition-colors">
                                                        <p className="text-white text-base font-medium">
                                                            {category.name}
                                                        </p>
                                                        <ChevronDown
                                                            className="scale-150 ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180"/>
                                                    </CollapsibleTrigger>
                                                </SidebarGroupLabel>
                                                <CollapsibleContent>
                                                    <SidebarGroupContent>
                                                        <SidebarMenuSub className="border-white/10">
                                                            {category.packages?.map((child) => (
                                                                <SidebarMenuSubItem key={child.id}>
                                                                    <Link to={`/store/item/${child.id}`}
                                                                          className="text-base text-white/70 hover:text-white transition-colors">
                                                                        {child.name}
                                                                    </Link>
                                                                </SidebarMenuSubItem>
                                                            ))}
                                                        </SidebarMenuSub>
                                                    </SidebarGroupContent>
                                                </CollapsibleContent>
                                            </SidebarGroup>
                                        </Collapsible>
                                    ))}
                                </div>
                            ))}
                        </SidebarContent>
                    </SidebarInset>
                </div>
                <div className="surface-card w-full p-5">
                    <GiftCardBalance/>
                </div>
            </SidebarProvider>

        </div>
    )
}

const GiftCardBalance = () => {
    const [cardNumber, setCardNumber] = useState("");
    const [value, setValue] = useState<number | undefined>();
    const formattedValue = useCurrencyFormatter(value);
    const [loading, setLoading] = useState(false);
    const {getGiftCardBalance} = useTebex();
    const {account} = useAccount();


    const fetchBalance = (cardNumber: string) => {
        setLoading(true)

        getGiftCardBalance(cardNumber, account)
            .then(amount => {
                setValue(amount);
            })
            .catch(() => {
                alert("Invalid card number")
            })
            .finally(() => {
                setLoading(false);
            })
    }

    return (
        <>
            <FullScreenLoading loading={loading}/>
            <div className="mb-2 flex flex-row justify-between">
                <p className="font-semibold">Giftcard Balance</p>
                <p data-hidden={value === undefined}
                   className="font-semibold text-purple-400 data-[hidden=true]:hidden">{formattedValue}</p>
            </div>
            <div className="relative">
                <input
                    type="text"
                    className="field-control mt-auto w-full pr-11 font-mono"
                    placeholder="0000 0000 0000 0000"
                    value={cardNumber}
                    onChange={e => {
                        if (cardNumber.replaceAll(" ", "") !== e.target.value.replaceAll(" ", "")) {
                            setValue(undefined);
                        }

                        setCardNumber(e.target.value)
                    }}
                    onKeyDown={e => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            fetchBalance(cardNumber.replaceAll(" ", ""));
                        }
                    }}
                />
                <Button className="absolute top-0 right-0 bottom-0 my-auto hover:scale-105" variant="empty"
                        onClick={() => fetchBalance(cardNumber.replaceAll(" ", ""))}
                        disabled={cardNumber.replaceAll(" ", "").length != 16}>
                    <ExternalLinkIcon className="scale-125"/>
                </Button>
            </div>
        </>
    )
}
