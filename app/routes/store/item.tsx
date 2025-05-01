import type {Route} from "../../+types/root";
import {type TebexCategory, type TebexPackage, useTebexContent} from "~/lib/tebex";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "~/components/ui/tabs";
import {ArrowRightIcon, CheckIcon, ShoppingCartIcon} from "lucide-react";
import React, {useState} from "react";
import {Button} from "~/components/ui/button";
import {Cart} from "~/components/cart";
import {useAccount} from "~/lib/account";
import {Link} from "react-router";
import {useCurrencyFormatter} from "~/lib/currency";
import {Dialog, DialogContent, DialogTitle} from "~/components/ui/dialog";
import {DialogDescription} from "@radix-ui/react-dialog";
import axios from "axios";

export function meta({}: Route.MetaArgs) {
    return [
        {title: "Static Studios | Store"},
        {name: "description", content: "Static Studios is a Minecraft server network."},
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

    const [quantity, setQuantity] = useState(1)
    const incrementQuantity = () => setQuantity((prev) => prev + 1)
    const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))

    if (!pkg) {
        return <div>Package not found</div>;
    }

    const category = parentCategories
        .flatMap(category => category.children ?? [])
        .find(category => category.packages.some(pkg => pkg.id === Number(itemId))) as TebexCategory;

    return (
        <div className="mx-2 my-8">
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex-1 md:flex-[2/3]">
                        <div className="aspect-square w-full flex flex-col gap-4">
                            <div className="md:hidden inline-block">
                                <Cart/>
                            </div>
                            <p className="text-base lg:text-3xl font-semibold text-white text-nowrap">
                                {category.parent ? (
                                    <span className="flex flex-row items-center gap-1 flex-wrap">
                                        <Link to={`/store/${category.parent.slug}`} className="hover:underline">
                                            {category.parent.name}
                                        </Link>
                                        <ArrowRightIcon className="size-4 lg:size-8"/>
                                        <Link to={`/store/${category.slug}`} className="hover:underline">
                                            {category.name}
                                        </Link>
                                        <ArrowRightIcon className="size-4 lg:size-8"/>
                                        {pkg.name}
                                    </span>
                                ) : (
                                    <span className="flex flex-row items-center gap-1 flex-wrap">
                                        <Link to={`/store/${category.slug}`} className="hover:underline">
                                            {category.name}
                                        </Link>
                                        <ArrowRightIcon className="size-8"/>
                                        {pkg.name}
                                    </span>
                                )}
                            </p>

                            <img alt={pkg.name} className="object-cover h-full aspect-square bg-white rounded-lg"
                                 src={pkg.image ? pkg.image : undefined}/>
                        </div>
                    </div>
                    <div className="flex-1 flex flex-col gap-4">
                        <div className="flex flex-row justify-between items-center">
                            <div className="flex flex-col gap-2">
                                <p className="text-white text-4xl font-bold">{pkg.name}</p>
                                <p className="text-purple-400 text-4xl font-bold">{price}</p>
                            </div>
                            <div className="hidden md:inline-block">
                                <Cart/>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="flex items-center border border-indigo-800/30 rounded-md">
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
                                addToCart(pkg.id, quantity)
                            }} className="flex-1 lg:flex hidden">
                                <ShoppingCartIcon className="size-4 mr-2"/>
                                Add to Cart
                            </Button>
                            <GiftToAFriend pkg={pkg}/>
                        </div>
                        <Button onClick={() => {
                            addToCart(pkg.id, quantity)
                        }} className="flex-1 lg:hidden flex">
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
                            <Tabs defaultValue="description" className="pt-4">
                                <TabsList className="bg-slate-800 border border-indigo-800/30">
                                    <TabsTrigger value="description"
                                                 className="data-[state=active]:bg-white">Description</TabsTrigger>
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
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </TabsContent>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const GiftToAFriend = ({pkg}: { pkg: TebexPackage }) => {
    const [open, setOpen] = useState(false);
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(false);
    const {addToCart, account} = useAccount()
    return (
        <>
            {loading && (
                <div
                    className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/30 pointer-events-none">
                    <div className="flex flex-col items-center space-y-4">
                        <div
                            className="relative h-12 w-12 animate-spin rounded-full border-4 border-white border-t-transparent"/>
                    </div>
                </div>
            )}
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
                    className="md:max-w-[95vw] w-[900px] max-h-[95vh] overflow-y-auto animate-in text-white border-indigo-800/30 p-6 bg-slate-800">
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
                            className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:border-wildphire-blue focus:ring-wildphire-blue mt-auto"
                            placeholder="Notch"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                        />
                        <div className="mt-2 flex flex-col md:flex-row gap-2">
                            <Button
                                onClick={e => {
                                    setLoading(true)
                                    axios.get(`https://mcprofile.io/api/v1/java/username/${username}`)
                                        .then(res => {
                                            if (res.status === 200) {
                                                addToCart(pkg.id, 1, username)
                                                setOpen(false)
                                            } else {
                                                alert("Invalid username");
                                            }
                                            setLoading(false)
                                        })
                                        .catch(err => {
                                            console.error(err);
                                            alert("Invalid username");
                                            setLoading(false)
                                        })
                                }}
                                disabled={username.length == 0} className="flex-1">
                                They use Java Edition
                            </Button>
                            <Button onClick={e => {
                                setLoading(true)
                                axios.get(`https://mcprofile.io/api/v1/bedrock/gamertag/${username}`)
                                    .then(res => {
                                        if (res.status === 200) {
                                            addToCart(pkg.id, 1, `.${username}`.replaceAll(/\s/g, "_"));
                                            setOpen(false)
                                        } else {
                                            alert("Invalid username");
                                        }
                                        setLoading(false)
                                    })
                                    .catch(err => {
                                        console.error(err);
                                        alert("Invalid username");
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
