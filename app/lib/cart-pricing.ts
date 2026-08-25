import type {TebexBasket} from "~/lib/tebex";

export type CatalogUnitPricing = {
    originalUnitPrice: number;
    saleUnitPrice: number;
}

export type CartPricing = {
    subtotal: number;
    salesSavings: number;
    creatorCodeSavings: number;
    subtotalAfterCreatorCode: number;
    tax: number;
    giftCardSavings: number;
    total: number;
}

const roundCurrency = (value: number) => Math.round((value + Number.EPSILON) * 100) / 100;
const positiveCurrency = (value: number) => roundCurrency(Math.max(0, Number.isFinite(value) ? value : 0));
const normalizedCreatorCode = (basket: TebexBasket) => basket.creator_code?.trim().toLowerCase() ?? "";

const getLineItemSubtotal = (basket: TebexBasket) => positiveCurrency(
    basket.packages.reduce(
        (subtotal, item) => subtotal + item.in_basket.quantity * item.in_basket.price,
        0,
    ),
);

export const getCartSaleSubtotal = (
    basket: TebexBasket,
    catalogPricing: Map<number, CatalogUnitPricing>,
) => positiveCurrency(basket.packages.reduce(
    (subtotal, item) => subtotal
        + item.in_basket.quantity
        * (catalogPricing.get(item.id)?.saleUnitPrice ?? item.in_basket.price),
    0,
));

export const calculateCreatorCodeDiscountRate = (
    basket: TebexBasket,
    saleSubtotal: number,
    previousBasket?: TebexBasket,
) => {
    if (!normalizedCreatorCode(basket) || saleSubtotal <= 0) {
        return 0;
    }

    const lineItemSavings = Math.max(0, saleSubtotal - getLineItemSubtotal(basket));
    const basePriceSavings = basket.giftcards.length === 0
        ? Math.max(0, saleSubtotal - basket.base_price)
        : 0;
    const transitionSavings = previousBasket
        ? Math.max(0, previousBasket.base_price - basket.base_price)
        : 0;
    const storedRateSavings = basket.giftcards.length > 0
        ? saleSubtotal * Math.min(1, Math.max(0, basket.creator_code_discount_rate ?? 0))
        : 0;
    const savings = Math.min(
        saleSubtotal,
        Math.max(lineItemSavings, basePriceSavings, transitionSavings, storedRateSavings),
    );

    return Math.min(1, Math.max(0, savings / saleSubtotal));
}

export const captureCreatorCodePricing = (
    basket: TebexBasket,
    catalogPricing: Map<number, CatalogUnitPricing>,
    previousBasket?: TebexBasket,
): TebexBasket => ({
    ...basket,
    creator_code_discount_rate: normalizedCreatorCode(basket)
        ? calculateCreatorCodeDiscountRate(
            basket,
            getCartSaleSubtotal(basket, catalogPricing),
            previousBasket,
        )
        : undefined,
});

export const calculateCartPricing = ({
                                         basket,
                                         catalogPricing,
                                         giftCardBalances,
                                     }: {
    basket: TebexBasket;
    catalogPricing: Map<number, CatalogUnitPricing>;
    giftCardBalances: Record<string, number | null>;
}): CartPricing => {
    if (basket.packages.length === 0) {
        return {
            subtotal: 0,
            salesSavings: 0,
            creatorCodeSavings: 0,
            subtotalAfterCreatorCode: 0,
            tax: 0,
            giftCardSavings: 0,
            total: 0,
        };
    }

    const lineItemSubtotal = getLineItemSubtotal(basket);
    const hasCompleteCatalogPricing = basket.packages.every(item => catalogPricing.has(item.id));
    const catalogOriginalSubtotal = positiveCurrency(basket.packages.reduce(
        (subtotal, item) => subtotal
            + item.in_basket.quantity
            * (catalogPricing.get(item.id)?.originalUnitPrice ?? item.in_basket.price),
        0,
    ));
    const catalogSaleSubtotal = getCartSaleSubtotal(basket, catalogPricing);
    const subtotal = hasCompleteCatalogPricing ? catalogOriginalSubtotal : lineItemSubtotal;
    const subtotalAfterSales = hasCompleteCatalogPricing ? catalogSaleSubtotal : lineItemSubtotal;
    const salesSavings = positiveCurrency(subtotal - subtotalAfterSales);

    const storedCreatorRate = normalizedCreatorCode(basket)
        ? Math.min(1, Math.max(0, basket.creator_code_discount_rate ?? 0))
        : 0;
    const itemLevelCreatorSavings = normalizedCreatorCode(basket)
        ? Math.max(0, subtotalAfterSales - lineItemSubtotal)
        : 0;
    // While no gift card is present, the current API base price is the best
    // source for creator savings. Once gift cards affect that value, retain the
    // effective creator rate captured immediately before the first card was applied.
    const storedRateSavings = basket.giftcards.length > 0
        ? subtotalAfterSales * storedCreatorRate
        : 0;
    const basePriceFallbackSavings = normalizedCreatorCode(basket) && basket.giftcards.length === 0
        ? Math.max(0, subtotalAfterSales - basket.base_price)
        : 0;
    const creatorCodeSavings = positiveCurrency(Math.min(
        subtotalAfterSales,
        Math.max(itemLevelCreatorSavings, storedRateSavings, basePriceFallbackSavings),
    ));
    const subtotalAfterCreatorCode = positiveCurrency(subtotalAfterSales - creatorCodeSavings);
    const tax = positiveCurrency(basket.sales_tax);
    const totalBeforeGiftCards = positiveCurrency(subtotalAfterCreatorCode + tax);

    const appliedGiftCardBalance = positiveCurrency(basket.giftcards.reduce(
        (totalBalance, giftCard) => totalBalance
            + Math.max(0, giftCardBalances[String(giftCard.card_number).replace(/\s/g, "")] ?? 0),
        0,
    ));
    const apiTotal = positiveCurrency(basket.total_price ?? basket.base_price + basket.sales_tax);
    const apiGiftCardSavings = basket.giftcards.length > 0
        ? Math.max(0, totalBeforeGiftCards - apiTotal)
        : 0;
    const balanceBackedGiftCardSavings = basket.giftcards.length > 0
        ? Math.min(totalBeforeGiftCards, appliedGiftCardBalance)
        : 0;
    const giftCardSavings = positiveCurrency(Math.min(
        totalBeforeGiftCards,
        Math.max(apiGiftCardSavings, balanceBackedGiftCardSavings),
    ));
    const total = basket.giftcards.length > 0
        ? positiveCurrency(totalBeforeGiftCards - giftCardSavings)
        : apiTotal;

    return {
        subtotal,
        salesSavings,
        creatorCodeSavings,
        subtotalAfterCreatorCode,
        tax,
        giftCardSavings,
        total,
    };
}
