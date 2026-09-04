import type {Route} from "../../+types/root";
import {type TebexCategory, type TebexPackage, useIsTebexEnabled, useTebex, useTebexContent} from "~/lib/tebex";
import {ArrowRightIcon, ExternalLinkIcon, InfoIcon, ShieldCheckIcon, ShoppingCartIcon} from "lucide-react";
import {Link, ScrollRestoration} from "react-router";
import {Button} from "~/components/ui/button";
import {useState} from "react";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "~/components/ui/tooltip";
import {useCurrencyFormatter} from "~/lib/currency";
import {Cart} from "~/components/cart";
import {useAccount} from "~/lib/account";
import {FullScreenLoading} from "~/components/FullScreenLoading";
import {PageIntro, PageShell} from "~/components/page-shell";

export function meta({}: Route.MetaArgs) {
    return [
        {title: "Static | Store - Ranks, Bundles & Items"},
        {
            name: "description",
            content: "Browse the Static store for Minecraft server ranks, bundles, and cosmetic items for Skyblock and Prison."
        },
        {name: "robots", content: "index, follow"},
        {property: "og:title", content: "Static Store - Ranks, Bundles & Items"},
        {
            property: "og:description",
            content: "Browse ranks, bundles, and cosmetic items for the Static Minecraft server."
        },
        {property: "og:type", content: "website"},
        {property: "og:url", content: "https://staticstudios.net/store"},
        {property: "og:image", content: "https://staticstudios.net/image/skyblock.png"},
        {property: "og:site_name", content: "Static"},
        {name: "twitter:card", content: "summary_large_image"},
    ];
}

const categoryHref = (category: TebexCategory, fallback?: TebexCategory) => {
    const slug = category.slug ?? fallback?.slug;
    return slug ? `/store/${slug}` : "/store";
}

export default function Store({params}: Route.LoaderArgs) {
    const {categoryId} = params;
    const {parentCategories, useCategory} = useTebexContent();
    const selectedCategory = useCategory(categoryId);
    const tebexEnabled = useIsTebexEnabled()

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

    if (parentCategories.length === 0) {
        return (
            <PageShell className="flex flex-1 items-center justify-center py-24">
                <div className="surface-panel max-w-xl p-10 text-center" role="status">
                    <p className="page-eyebrow">Static store</p>
                    <h1 className="text-3xl font-black tracking-tight text-white">Loading store catalog</h1>
                    <p className="mt-3 text-slate-300">We’re getting the available categories and items ready.</p>
                </div>
            </PageShell>
        )
    }

    if (!categoryId) {
        return <StoreCategorySelection parentCategories={parentCategories}/>;
    }

    const parentCategory = selectedCategory?.parent
        ? parentCategories.find(parent => parent.id === selectedCategory.parent?.id)
        : selectedCategory;
    const category = selectedCategory?.parent
        ? selectedCategory
        : parentCategory?.children?.[0] ?? parentCategory;

    if (!parentCategory || !category) {
        return <StoreCategorySelection parentCategories={parentCategories} unavailableCategory/>;
    }

    return (
        <>
            <ScrollRestoration/>
            <PageShell>
                <div className="flex min-w-0 flex-col gap-7 md:flex-row">
                    <div className="shrink-0">
                        <Sidebar currentParent={parentCategory} currentCategory={category}/>
                    </div>
                    <div className="min-w-0 flex-1">
                        <Category category={category} parent={parentCategory}/>
                    </div>
                </div>
            </PageShell>
        </>
    )
}

const StoreCategorySelection = ({
                                    parentCategories,
                                    unavailableCategory = false,
                                }: {
    parentCategories: TebexCategory[];
    unavailableCategory?: boolean;
}) => (
    <>
        <ScrollRestoration/>
        <PageShell>
            <PageIntro
                eyebrow="Static store"
                title="Choose where you play"
                description="Choose the store category you want to browse. Every item can only be used on the gamemode it was purchased for, with the exception of gift cards."
                actions={<Cart/>}
            />

            {unavailableCategory && (
                <div className="mb-6 rounded-2xl border border-amber-300/25 bg-amber-300/10 px-5 py-4 text-amber-100"
                     role="alert">
                    That store category is no longer available. Choose one of the current categories below.
                </div>
            )}

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {parentCategories.map(parent => {
                    const categories = parent.children?.length ? parent.children : [parent];
                    const packageCount = categories.reduce((total, category) => total + category.packages.length, 0);

                    return (
                        <section key={parent.id} className="surface-panel overflow-hidden p-6 sm:p-8"
                                 aria-labelledby={`store-mode-${parent.id}`}>
                            <div className="flex items-start gap-4">
                                <div
                                    className="rounded-2xl border border-purple-300/20 bg-purple-400/10 p-3 text-purple-200">
                                    <ShieldCheckIcon className="size-7"/>
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-purple-300">{parent.name}</p>
                                    <h2 id={`store-mode-${parent.id}`}
                                        className="mt-1 text-2xl font-black tracking-tight text-white">Choose
                                        from {parent.description || `${packageCount} ${packageCount === 1 ? "item" : "items"}`}</h2>
                                </div>
                            </div>

                            <div className="mt-7 border-t border-white/8 pt-5">
                                <p className="mb-3 text-sm font-semibold text-white">Select a sub-category</p>
                                <div className="grid gap-2 sm:grid-cols-2">
                                    {categories.map(category => (
                                        <Link
                                            key={category.id}
                                            to={categoryHref(category, parent)}
                                            className="group flex min-h-16 items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 transition hover:border-purple-300/30 hover:bg-purple-400/10"
                                        >
                                            <span>
                                                <span className="block font-semibold text-white">{category.name}</span>
                                                <span className="mt-0.5 block text-xs text-slate-400">
                                                    {category.packages.length} {category.packages.length === 1 ? "item" : "items"}
                                                </span>
                                            </span>
                                            <ArrowRightIcon
                                                className="size-4 shrink-0 text-purple-300 transition-transform group-hover:translate-x-0.5"/>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </section>
                    )
                })}
            </div>
        </PageShell>
    </>
)

const Category = ({category, parent}: { category: TebexCategory; parent: TebexCategory }) => {
    const categories = parent.children?.length ? parent.children : [parent];

    return (
        <div className="flex flex-col gap-6">
            <div
                className="relative flex flex-col gap-5 border-b border-white/8 pb-5 lg:flex-row lg:items-end lg:justify-between">
                <div>
                    <p className="page-eyebrow">Shopping for</p>
                    <h1 className="text-4xl font-black tracking-[-0.035em] text-white">{parent.name}</h1>
                </div>
                <div
                    className="flex flex-1 flex-row flex-wrap gap-1 text-center md:self-end md:[&>a]:flex-0 [&>a]:flex-1">
                    {categories.map(child => (
                        <Link
                            preventScrollReset={true}
                            key={child.id}
                            to={categoryHref(child, parent)}
                            aria-current={child.id === category.id ? "page" : undefined}
                            data-active={child.id === category.id}
                            className="text-nowrap rounded-lg px-4 py-2 text-sm font-semibold text-slate-400 transition-colors hover:bg-white/5 hover:text-white data-[active=true]:bg-purple-500/12 data-[active=true]:text-purple-200">
                            {child.name}
                        </Link>
                    ))}
                </div>
                <Cart/>
            </div>

            <div className="surface-card flex items-center justify-between gap-4 p-4 md:hidden">
                <div className="min-w-0">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-purple-300">Selected category</p>
                    <p className="mt-1 truncate text-lg font-bold text-white">{parent.name}</p>
                </div>
                <Button asChild variant="outline" className="shrink-0">
                    <Link to="/store">Change category</Link>
                </Button>
            </div>

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 2xl:grid-cols-3">
                {category.packages.map(pkg => (
                    <PackageCard key={pkg.id} pkg={pkg} modeName={parent.name} categoryName={category.name}/>
                ))}
            </div>
        </div>
    )
}

const PackageCard = ({pkg, modeName, categoryName}: {
    pkg: TebexPackage;
    modeName: string;
    categoryName: string;
}) => {
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
                <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/20 to-transparent"/>
            </div>
            <div className="flex flex-1 flex-col gap-4 p-5">
                <div className="flex min-h-8 items-start justify-between gap-3">
                    <h2 className="min-w-0 text-xl font-bold leading-tight text-white">{pkg.name}</h2>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon"
                                        className="h-8 w-8 shrink-0 text-white/70 hover:text-white">
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
                            aria-label={`Add ${pkg.name} for ${modeName} to cart`}
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

const Sidebar = ({currentParent, currentCategory}: {
    currentParent: TebexCategory;
    currentCategory: TebexCategory;
}) => {
    const categories = currentParent.children?.length ? currentParent.children : [currentParent];

    return (
        <div className="hidden w-[300px] flex-col gap-4 md:flex">
            <aside className="surface-panel h-max overflow-hidden"
                   aria-label={`${currentParent.name} store navigation`}>
                <div className="border-b border-white/8 p-5">
                    <p className="text-xs font-bold uppercase tracking-[0.17em] text-purple-300">Selected category</p>
                    <div className="mt-3 flex items-center gap-3">
                        <div className="rounded-xl border border-emerald-300/20 bg-emerald-300/10 p-2 text-emerald-200">
                            <ShieldCheckIcon className="size-5"/>
                        </div>
                        <div>
                            <p className="text-xl font-bold text-white">{currentParent.name}</p>
                            <p className="text-xs text-emerald-200">{currentParent.name} items only</p>
                        </div>
                    </div>
                    <Button asChild variant="outline" className="mt-4 w-full">
                        <Link to="/store">Change category</Link>
                    </Button>
                </div>

                <nav className="p-3" aria-label={`${currentParent.name} categories`}>
                    <p className="px-3 pb-2 pt-1 text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Browse
                        categories</p>
                    <div className="space-y-1">
                        {categories.map(category => {
                            const active = category.id === currentCategory.id;
                            return (
                                <Link
                                    key={category.id}
                                    preventScrollReset
                                    to={categoryHref(category, currentParent)}
                                    aria-current={active ? "page" : undefined}
                                    data-active={active}
                                    className="flex items-center justify-between gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-slate-300 transition hover:bg-white/5 hover:text-white data-[active=true]:bg-purple-500/15 data-[active=true]:text-purple-100"
                                >
                                    <span>{category.name}</span>
                                    <span
                                        className="rounded-full bg-white/8 px-2 py-0.5 text-xs text-slate-400">{category.packages.length}</span>
                                </Link>
                            )
                        })}
                    </div>
                </nav>
            </aside>

            <div className="surface-card w-full p-5">
                <GiftCardBalance/>
            </div>
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
                <p className="font-semibold">Gift Card Balance Checker</p>
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
