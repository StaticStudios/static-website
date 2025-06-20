import {createContext, type ReactNode, useCallback, useContext, useEffect, useState} from "react";
import axios from "axios";

type RawTebexCategory = {
    id: number;
    name: string;
    image?: string;
    slug?: string;
    description: string;
    order: number;
    packages: TebexPackage[];
    parent?: RawTebexCategory;
}

export type TebexCategory = RawTebexCategory & {
    children?: TebexCategory[];
}

export type RawTebexPackage = {
    id: number;
    name: string;
    image: string | null;
    type: string;
    category: {
        id: number;
        name: string;
    };
    base_price: number;
    sales_tax: number;
    total_price: number;
    currency: string;
    discount: number;
    disable_quantity: boolean;
    disable_gifting: boolean;
    expiration_date: string | null;
    created_at: string;
    updated_at: string;
    description: string;
}

export type TebexPackage = RawTebexPackage & {
    rawDescription: string;
    description: string;
    features: string[];
    sale_price: number;
}

export type TebexBasket = {
    id: number
    ident: string
    complete: boolean
    email: string | null
    coupons: {
        coupon_code: string
    }[]
    giftcards: {
        card_number: string
    }[],
    creator_code: string
    cancel_url: string
    complete_url: string | null
    complete_auto_redirect: boolean
    country: string
    ip: string
    username_id: number
    base_price: number
    sales_tax: number
    discount: number
    currency: string
    packages: {
        id: number,
        name: string,
        in_basket: {
            quantity: number
            price: number,
            gift_username?: string
        }
        image: string
    }[]
    links: {
        payment?: string
        checkout?: string
    }
}

function parseDescription(raw: string): { description: string; features: string[] } {
    const parser = new DOMParser();
    const doc = parser.parseFromString(raw, 'text/html');

    const rows = doc.querySelectorAll<HTMLTableRowElement>('tr');

    let description = '';
    let features: string[] = [];

    rows.forEach(row => {
        const cells = row.querySelectorAll<HTMLTableCellElement>('td');
        if (cells.length !== 2) return;

        const key = cells[0].textContent?.trim().toLowerCase() ?? '';
        const valueCell = cells[1];

        if (key === 'description') {
            description = valueCell.innerHTML
                .replace(/<br\s*\/?>/gi, ' ')
                .replace(/\s+/g, ' ')
                .trim();
        } else if (key === 'features') {
            features = valueCell.innerHTML
                .split(/<br\s*\/?>/i)
                .map(feature => feature.trim())
                .filter(feature => feature.length > 0);
        }
    });

    return {description, features};
}

function stripHtmlTags(html: string): string {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    return doc.body.textContent || '';
}

function parsePackage(pkg: any) {
    const {description, features} = parseDescription(pkg.description);

    return {
        ...pkg,
        rawDescription: pkg.description,
        base_price: pkg.discount == 0 ? pkg.base_price : pkg.base_price + pkg.discount,
        sale_price: pkg.base_price,
        description,
        features
    } as TebexPackage;
}

type Tebex = {
    getCategories: () => Promise<TebexCategory[]>;
    createBasket: (username: string) => Promise<TebexBasket>;
    addToBasket: (basket: TebexBasket, packageId: number, quantity: number, variableData?: Record<string, any>, giftTo?: string) => Promise<TebexBasket>;
    removeFromBasket: (basket: TebexBasket, packageId: number) => Promise<TebexBasket>; //todo: creator codes, giftcards, coupons
    getBasket: (basket: TebexBasket) => Promise<TebexBasket>;
}

const token = import.meta.env.VITE_PUBLIC_TEBEX_TOKEN;

export const useIsTebexEnabled = () => {
    return !!token;
}


export const useTebex = () => {
    const getListings = useCallback(() => new Promise<TebexCategory[]>((resolve, reject) => {
        axios.get(`https://headless.tebex.io/api/accounts/${token}/categories?includePackages=1`)
            .then(response => {

                console.log(response.data.data)

                const data: RawTebexCategory[] = response.data.data.map((category: RawTebexCategory) => ({
                    ...category,
                    description: stripHtmlTags(category.description),
                    packages: category.packages.map((pkg: any) => parsePackage(pkg))
                }));

                const parents: RawTebexCategory[] = data.filter((category: RawTebexCategory) => category.parent === null);
                const children: RawTebexCategory[] = data.filter((category: RawTebexCategory) => category.parent !== null);

                const withChildren = parents.map((category => ({
                    ...category,
                    children: children.filter((child: RawTebexCategory) => child.parent?.id === category.id)
                } satisfies TebexCategory))).filter(category => (category.children?.length ?? 0) > 0 || category.packages.length > 0);

                console.log(withChildren)

                resolve(withChildren)
            })
            .catch(error => {
                console.error(error);
                reject(error);
            })
    }), []);

    const createBasket = useCallback((username: string) => new Promise<TebexBasket>((resolve, reject) => {
        axios.post(`https://headless.tebex.io/api/accounts/${token}/baskets`, {
            complete_url: "https://staticstudios.net",
            cancel_url: "https://staticstudios.net/store",
            complete_auto_redirect: true,
            username
        })
            .then(response => {
                resolve(response.data.data as TebexBasket);
            })
            .catch(error => {
                console.error(error);
                reject(error);
            })
    }), []);

    const addToBasket = useCallback((basket: TebexBasket, packageId: number, quantity: number, variableData?: Record<string, any>, giftTo?: string) => new Promise<TebexBasket>((resolve, reject) => {
        axios.post(`https://headless.tebex.io/api/baskets/${basket.ident}/packages`, {
            package_id: packageId,
            quantity: quantity,
            target_username: giftTo,
            variable_data: variableData,
        })
            .then(response => {
                console.log(response.data.data)
                resolve(response.data.data as TebexBasket);
            })
            .catch(error => {
                console.error(error);
                reject(error);
            })
    }), []);

    const removeFromBasket = useCallback((basket: TebexBasket, packageId: number) => new Promise<TebexBasket>((resolve, reject) => {
        axios.post(`https://headless.tebex.io/api/baskets/${basket.ident}/packages/remove`, {
            package_id: packageId,
        })
            .then(response => {
                console.log(response.data.data)
                resolve(response.data.data as TebexBasket);
            })
            .catch(error => {
                console.error(error);
                reject(error);
            })
    }), []);

    const getBasket = useCallback((basket: TebexBasket) => new Promise<TebexBasket>((resolve, reject) => {
        axios.get(`https://headless.tebex.io/api/accounts/${token}/baskets/${basket.ident}`)
            .then(response => {
                console.log(response.data.data)
                resolve(response.data.data as TebexBasket);
            })
            .catch(error => {
                console.error(error);
                reject(error);
            })
    }), []);

    return {
        getCategories: getListings,
        createBasket,
        addToBasket,
        removeFromBasket,
        getBasket
    } satisfies Tebex;
}

type TebexContextProps = {
    useCategory: (slug?: string) => TebexCategory | null;
    parentCategories: TebexCategory[];
}

const TebexContext = createContext<TebexContextProps>({} as never);

export const useTebexContent = () => {
    const context = useContext(TebexContext);
    if (!context) {
        throw new Error("useTebexContent must be used within a TebexProvider");
    }
    return context;
}

export const TebexProvider = ({children}: { children: ReactNode }) => {
    const {getCategories} = useTebex();
    const [parentCategories, setParentCategories] = useState<TebexCategory[]>([]);

    useEffect(() => {
        getCategories()
            .then((data) => {
                setParentCategories(data);
            })
            .catch((error) => {
                console.error("Error fetching categories:", error);
            });
    }, [getCategories, setParentCategories]);

    const useCategory = (slug?: string) => {
        if (!slug) {
            return null;
        }
        for (const category of parentCategories) {
            if (category.slug === slug) {
                return category;
            }
            const childCategory = category.children?.find(child => child.slug === slug);
            if (childCategory) {
                return childCategory;
            }
        }

        return null;
    }

    return (
        <TebexContext.Provider value={{useCategory, parentCategories}}>
            {children}
        </TebexContext.Provider>
    );
}