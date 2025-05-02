import {create} from 'zustand'
import {devtools, persist} from 'zustand/middleware'
import type {Account} from "~/lib/account";
import type {TebexBasket} from "~/lib/tebex";

interface StoreState {
    account?: Account
    setAccount: (account?: Account) => void
    updateBasket: (basket: TebexBasket) => void
    currency?: string
    setCurrency: (currency?: string) => void
}

export const useStore = create<StoreState>()(
    devtools(
        persist(
            (set) => ({
                setAccount: (account) => set(() => ({account})),
                updateBasket: (basket) => set((state) => ({
                    account: {
                        ...state.account,
                        basket,
                    } as Account,
                })),
                setCurrency: (currency) => set(() => ({currency})),
            }),
            {
                name: 'store-storage',
            },
        ),
    ),
)