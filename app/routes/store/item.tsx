import type {Route} from "../../+types/root";
import {type TebexCategory, type TebexPackage, useTebexContent} from "~/lib/tebex";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "~/components/ui/tabs";
import {CheckIcon, ShieldCheckIcon, ShoppingCartIcon} from "lucide-react";
import React, {useState} from "react";
import {Button} from "~/components/ui/button";
import {Cart} from "~/components/cart";
import {useAccount} from "~/lib/account";
import {useCurrencyFormatter} from "~/lib/currency";
import {Dialog, DialogContent, DialogTitle} from "~/components/ui/dialog";
import {DialogDescription} from "@radix-ui/react-dialog";
import {PageLocation} from "~/components/markdown-page";
import {FullScreenLoading} from "~/components/FullScreenLoading";
import {PageShell} from "~/components/page-shell";

export function meta({}: Route.MetaArgs) {
    return [
        {title: "Static | Store Item"},
        {
            name: "description",
            content: "View item details on the Static Minecraft server store. Browse ranks, bundles, and cosmetic items for Skyblock and Prison."
        },
        {name: "robots", content: "index, follow"},
        {property: "og:title", content: "Static Store"},
        {property: "og:type", content: "website"},
        {property: "og:site_name", content: "Static"},
    ];
}

const perks = [
    "Instant delivery",
    "24/7 Support"
]

export default function Package({params}: Route.LoaderArgs) {
    const {addToCart} = useAccount()
    const {itemId} = params;
    const {parentCategories} = useTebexContent();
    const pkg = parentCategories
        .flatMap(category => category.children ?? [])
        .flatMap(category => category.packages)
        .find(pkg => pkg.id === Number(itemId));
    const price = useCurrencyFormatter(pkg?.base_price);
    const salePrice = useCurrencyFormatter(pkg?.sale_price);

    const [quantity, setQuantity] = useState(1)
    const incrementQuantity = () => setQuantity((prev) => prev + 1)
    const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))

    if (!pkg) {
        return <></>
    }

    const category = parentCategories
        .flatMap(category => category.children ?? [])
        .find(category => category.packages.some(pkg => pkg.id === Number(itemId))) as TebexCategory;
    const parent = category.parent
        ? parentCategories.find(parentCategory => parentCategory.id === category.parent?.id) ?? category
        : category;

    return (
        <PageShell>
            <div className="surface-panel flex flex-col gap-8 p-5 sm:p-8 md:flex-row lg:p-10">
                <div className="flex-1 md:flex-[2/3]">
                    <div className="aspect-square w-full flex flex-col gap-4">
                        <div className="md:hidden inline-block">
                            <Cart/>
                        </div>
                        <p className="text-base lg:text-3xl font-semibold text-white text-nowrap">
                            {category.parent ? (
                                <PageLocation location={[
                                    {href: `/`, name: "Home"},
                                    {href: `/store`, name: "Store"},
                                    {href: `/store/${parent.slug}`, name: parent.name},
                                    {href: `/store/${category.slug}`, name: category.name},
                                    {href: `/store/item/${pkg.id}`, name: pkg.name},
                                ]}/>
                            ) : (
                                <PageLocation location={[
                                    {href: `/`, name: "Home"},
                                    {href: `/store`, name: "Store"},
                                    {href: `/store/${category.slug}`, name: category.name},
                                    {href: `/store/item/${pkg.id}`, name: pkg.name},
                                ]}/>
                            )}
                        </p>

                        <img alt={pkg.name}
                             className="aspect-square h-full rounded-2xl border border-white/10 bg-white object-cover shadow-2xl shadow-slate-950/30"
                             src={pkg.image ? pkg.image : undefined}/>
                    </div>
                </div>
                <div className="flex-1 flex flex-col gap-4">
                    <div className="flex flex-row justify-between items-start">
                        <div className="flex flex-col gap-2">
                            <div
                                className="inline-flex w-fit items-center gap-1.5 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs font-semibold text-emerald-200">
                                <ShieldCheckIcon className="size-3.5"/>
                                For {parent.name}
                            </div>
                            <p className="text-4xl font-black tracking-[-0.035em] text-white">{pkg.name}</p>
                            <div className="flex flex-row gap-2">
                                <p data-sale={price != salePrice}
                                   className="text-purple-400/50 text-4xl font-bold line-through hidden data-[sale=true]:flex">{price}</p>
                                <p className="text-purple-400 text-4xl font-bold">{salePrice}</p>
                            </div>
                        </div>
                        <div className="hidden md:inline-block">
                            <Cart/>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="flex items-center rounded-xl border border-white/10 bg-slate-950/25">
                            <Button variant="ghost" size="icon" onClick={decrementQuantity}
                                    className="text-white h-10 w-10">
                                -
                            </Button>
                            <span className="w-10 text-center text-white">{quantity}</span>
                            <Button variant="ghost" size="icon" onClick={incrementQuantity}
                                    className="text-white h-10 w-10">
                                +
                            </Button>
                        </div>
                        <Button onClick={() => {
                            addToCart(pkg, quantity)
                        }} aria-label={`Add ${pkg.name} for ${parent.name} to cart`} className="flex-1 lg:flex hidden">
                            <ShoppingCartIcon className="size-4 mr-2"/>
                            Add to Cart
                        </Button>
                        <GiftToAFriend pkg={pkg}/>
                    </div>
                    <Button onClick={() => {
                        addToCart(pkg, quantity)
                    }} aria-label={`Add ${pkg.name} for ${parent.name} to cart`} className="flex-1 lg:hidden flex">
                        <ShoppingCartIcon className="size-4 mr-2"/>
                        Add to Cart
                    </Button>

                    <div className="grid grid-cols-2 gap-4 pt-4">
                        {perks.map((perk, index) => (
                            <div key={index} className="flex items-center text-white/80">
                                <CheckIcon className="size-4 text-green-500 mr-2"/>
                                <span className="text-sm">{perk}</span>
                            </div>
                        ))}
                    </div>

                    <div className="text-white/70">
                        <Tabs defaultValue={category.slug?.includes("ranks") ? "features" : "description"}
                              className="pt-4">
                            <TabsList className="border border-white/10 bg-slate-950/30 p-1">
                                <TabsTrigger value="description"
                                             className="data-[state=active]:bg-white/10 data-[state=active]:text-white">Description</TabsTrigger>
                                <TabsTrigger value="features">Features</TabsTrigger>
                            </TabsList>
                            <TabsContent value="description" className="text-white/80 mt-4 space-y-4">
                                <p>{pkg.description}</p>
                            </TabsContent>
                            <TabsContent value="features" className="mt-4">
                                <ul className="space-y-2">
                                    {pkg.features.map((feature, index) => (
                                        <li key={index} className="flex items-start text-white/80">
                                            <CheckIcon className="size-5 text-purple-400 mr-2 mt-0.5"/>
                                            <span className="flex-1">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>
        </PageShell>
    )
}

export const GiftToAFriend = ({pkg}: { pkg: TebexPackage }) => {
    const [open, setOpen] = useState(false);
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(false);
    const {addToCart, account, validateUsername} = useAccount()
    return (
        <>
            <FullScreenLoading loading={loading}/>
            <Button variant="secondary" onClick={() => {
                if (!account) {
                    alert("You must be logged in to do this");
                    return
                }
                setOpen(true)
            }} className="flex-1">
                Gift To a Friend
            </Button>
            <Dialog onOpenChange={open => {
                setOpen(open);
                if (!open) {
                    setUsername("");
                }
            }} open={open}>
                <DialogContent
                    className="surface-panel max-h-[95vh] w-[900px] overflow-y-auto border-white/10 p-6 text-white md:max-w-[95vw]">
                    <DialogTitle>Enter their Minecraft account</DialogTitle>
                    <DialogDescription className="text-white/70">Supports both Minecraft Java Edition and
                        Minecraft Bedrock Edition
                        accounts.</DialogDescription>
                    <div className="">
                        <h4 className="font-semibold mb-2 flex items-center">
                            Enter Their Username
                        </h4>
                        <input
                            type="text"
                            className="field-control mt-auto h-10 w-full"
                            placeholder="Notch"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                        />
                        <div className="mt-2 flex flex-col md:flex-row gap-2">
                            <Button
                                onClick={e => {
                                    setLoading(true)
                                    validateUsername(username, "java")
                                        .then(known => {
                                            if (known) {
                                                addToCart(pkg, 1, known.name)
                                                setOpen(false)
                                                setUsername("")
                                            } else {
                                                alert("Invalid username, have they joined the server before?");
                                            }
                                        })
                                        .finally(() => {
                                            setLoading(false)
                                        })
                                }}
                                disabled={username.length == 0} className="flex-1">
                                They use Java Edition
                            </Button>
                            <Button onClick={e => {
                                setLoading(true)
                                validateUsername(username, "bedrock")
                                    .then(known => {
                                        if (known) {
                                            addToCart(pkg, 1, known.name)
                                            setOpen(false)
                                            setUsername("")
                                        } else {
                                            alert("Invalid username, have they joined the server before?");
                                        }
                                    })
                                    .finally(() => {
                                        setLoading(false)
                                    })
                            }} disabled={username.length == 0} variant="secondary" className="flex-1">
                                They use Bedrock Edition
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}
