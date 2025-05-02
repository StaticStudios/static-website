import type {Route} from "../../+types/root";
import {type TebexCategory, type TebexPackage, useIsTebexEnabled, useTebexContent} from "~/lib/tebex";
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "~/components/ui/collapsible";
import {ChevronDown, InfoIcon, ShoppingCartIcon} from "lucide-react";
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
import React from "react";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "~/components/ui/tooltip";
import {useCurrencyFormatter} from "~/lib/currency";
import {Cart} from "~/components/cart";
import {useAccount} from "~/lib/account";

export function meta({}: Route.MetaArgs) {
    return [
        {title: "Static Studios | Store"},
        {name: "description", content: "Static Studios is a Minecraft server network."},
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
            <div className="mx-auto mt-8">
                <p className="text-white text-lg">The store is currently disabled.</p>
            </div>
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
            <div className="mx-2 my-8">
                <div className="container mx-auto">
                    <div className="flex flex-col md:flex-row gap-6">
                        <div>
                            <Sidebar/>
                        </div>
                        <div className="w-full">
                            {category && <Category category={category}/>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const Category = ({category}: { category: TebexCategory }) => {
    const {useCategory} = useTebexContent();
    const parent = useCategory(category.parent?.slug) ?? category;
    //todo: handle sale price
    return (
        <div className="flex flex-col gap-4">
            <div
                className="relative flex flex-col-reverse gap-4 lg:flex-row lg:items-center justify-between">
                <p className="hidden md:flex absolute top-0 left-0 text-3xl text-white font-bold">{parent.name}</p>
                <div className="flex-1 md:self-end flex flex-row flex-wrap [&>a]:flex-1 md:[&>a]:flex-0 text-center">
                    {parent?.children?.map(child => (
                        <Link
                            preventScrollReset={true}
                            key={child.id}
                            to={`/store/${child.slug}`}
                            data-active={child.id == category.id}
                            className="text-nowrap text-lg font-semibold px-4 pb-2 border-b text-white/70 border-indigo-800/50 data-[active=true]:border-indigo-800 data-[active=true]:border-b-3 data-[active=true]:text-white hover:border-b-3 hover:text-white transition-all">
                            {child.name}
                        </Link>
                    ))}
                </div>
                <Cart/>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {category.packages.map(pkg => <PackageCard key={pkg.id} pkg={pkg}/>)}
            </div>
        </div>
    )
}

const PackageCard = ({pkg}: { pkg: TebexPackage }) => {
    const {addToCart} = useAccount()
    const price = useCurrencyFormatter(pkg.base_price);
    return (
        <div className="rounded-lg border border-indigo-800/30 overflow-hidden">
            <img alt={pkg.name}
                 className="object-cover w-full aspect-square bg-white"
                 src={pkg.image ? pkg.image : undefined}/>
            <div className="bg-slate-800 p-2 flex flex-col gap-4">
                <div className="flex flex-row justify-between">
                    <p className="text-xl font-semibold text-white">{pkg.name}</p>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-white/70 hover:text-white">
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
                <p className="text-xl font-semibold text-purple-400">{price}</p>
                <div className="w-full flex flex-col xl:flex-row gap-2 items-center">
                    <Button
                        onClick={() => {
                            addToCart(pkg.id, 1)
                        }}
                        className="bg-purple-600 flex-1 w-full xl:w-auto">
                        <ShoppingCartIcon/>
                        <span className="ml-2">Add to Cart</span>
                    </Button>
                    <Link
                        to={`/store/item/${pkg.id}`}
                        className="bg-white hover:bg-white text-purple-600 hover:text-purple-400 flex-1 w-full xl:w-auto rounded-lg px-4 py-2 text-center">
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    )
}

const Sidebar = () => {
    const {parentCategories} = useTebexContent();
    //todo: at the bottom add a check gift card section

    return (
        <div className="md:flex flex-col gap-4 hidden">
            <SidebarProvider>
                <div className="w-[300px] h-max rounded-lg border border-indigo-800/30 overflow-hidden">
                    <SidebarInset className="p-4 bg-slate-800">
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
            </SidebarProvider>
        </div>
    )
}
