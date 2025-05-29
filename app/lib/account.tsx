import {createContext, type ReactNode, useContext, useEffect, useRef, useState} from "react";
import {Dialog, DialogContent, DialogTitle} from "~/components/ui/dialog";
import {DialogDescription} from "@radix-ui/react-dialog";
import {Button} from "~/components/ui/button";
import axios from "axios";
import {useStore} from "~/lib/persist";
import {type TebexBasket, useTebex} from "~/lib/tebex";
import {toast} from "sonner";

export type Account = {
    name: string;
    uuid: string;
    mcje: boolean
    basket: TebexBasket
}

type KnownAccount = {
    id: string
    name: string
}

const AccountContext = createContext<{
    account?: Account,
    updateBasket: (basket: TebexBasket) => void,
    promptLogin: (callback?: (account: Account) => void) => void,
    addToCart: (packageId: number, quantity: number, giftTo?: string) => void,
    removeFromCart: (packageId: number) => void,
    validateUsername: (username: string, platform: "java" | "bedrock") => Promise<KnownAccount | null>,
    logout: () => void
} | undefined>(undefined);
export const AccountProvider = ({children}: { children: ReactNode }) => {
    const {account, setAccount, updateBasket} = useStore()
    const [open, setOpen] = useState(false);
    const [username, setUsername] = useState("");
    const cbRef = useRef<undefined | ((account: Account) => void)>(undefined);
    const {createBasket, getBasket, addToBasket, removeFromBasket} = useTebex();
    const [loading, setLoading] = useState(false);
    const initialPageLoadRef = useRef(true)

    useEffect(() => {
        if (!initialPageLoadRef.current) {
            return
        }

        if (!account) {
            return;
        }

        initialPageLoadRef.current = false

        getBasket(account.basket)
            .then(basket => {
                if (basket) {
                    if (basket.complete) {
                        createBasket(account.name).then(updateBasket)
                    } else {
                        updateBasket(basket);
                    }
                } else {
                    setAccount(undefined)
                }
            })
            .catch(err => {
                console.error(err);
            })

    }, [account, getBasket, updateBasket]);

    const promptLogin = (callback?: (account: Account) => void) => {
        setOpen(true);
        cbRef.current = callback;
    }

    const validateUsername = (username: string, platform: "java" | "bedrock") => {
        return new Promise<KnownAccount | null>((resolve, reject) => {
            if (platform === "bedrock") {
                username = `.${username}`.replaceAll(/\s/g, "_")
            }
            axios.get(`https://api.staticstudios.net/api/v1/minecraft/player/name/${username}`)
                .then(res => {
                    const data = res.data as KnownAccount
                    if (data) {
                        resolve(data);
                    } else {
                        resolve(null);
                    }
                })
                .catch(err => {
                    console.error(err);
                    resolve(null);
                })
        });
    }

    return (
        <AccountContext.Provider value={{
            account: account,
            updateBasket,
            promptLogin,
            validateUsername,
            logout: () => {
                setAccount(undefined);
            },
            addToCart: (packageId, quantity, giftTo?: string) => {
                if (!account) {
                    promptLogin(acc => {
                        addToBasket(acc.basket, packageId, 1, giftTo).then(updateBasket);
                    });
                    return
                }
                setLoading(true)
                addToBasket(account.basket, packageId, quantity, giftTo).then(updateBasket)
                    .catch(() => {
                        toast.error("Failed to add to cart")
                    })
                    .finally(() => {
                        setLoading(false)
                        toast.success("Added to cart")
                    })
            },
            removeFromCart: (packageId) => {
                setLoading(true)
                console.log("remove")
                removeFromBasket(account!.basket, packageId).then(updateBasket)
                    .catch(() => {
                        toast.error("Failed to add to cart")
                    })
                    .finally(() => {
                        setLoading(false)
                        toast.success("Removed from cart")
                    })
            }
        }}>
            {loading && (
                <div
                    className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/30 pointer-events-none">
                    <div className="flex flex-col items-center space-y-4">
                        <div
                            className="relative h-12 w-12 animate-spin rounded-full border-4 border-white border-t-transparent"/>
                    </div>
                </div>
            )}
            <Dialog onOpenChange={open => {
                setOpen(open);
                if (!open) {
                    setUsername("");
                }
            }} open={open}>
                <DialogContent
                    className="md:max-w-[95vw] w-[900px] max-h-[95vh] overflow-y-auto animate-in text-white border-indigo-800/30 p-6 bg-slate-800">
                    <DialogTitle>Login to your Minecraft account</DialogTitle>
                    <DialogDescription className="text-white/70">Supports both Minecraft Java Edition and
                        Minecraft Bedrock Edition
                        accounts.</DialogDescription>
                    <div className="">
                        <h4 className="font-semibold mb-2 flex items-center">
                            Enter Your Username
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
                                    validateUsername(username, "java")
                                        .then(known => {
                                            if (known) {
                                                createBasket(known.name).then(basket => {
                                                    const account = {
                                                        name: known.name,
                                                        uuid: known.id,
                                                        mcje: true,
                                                        basket
                                                    }
                                                    setOpen(false);
                                                    setUsername("");
                                                    setAccount(account);
                                                    if (cbRef.current) {
                                                        cbRef.current(account);
                                                    }
                                                }).finally(() => {
                                                    setLoading(false)
                                                })
                                            } else {
                                                alert("Invalid username, have you joined the server before?");
                                                setLoading(false)
                                            }
                                        })
                                }}
                                disabled={username.length == 0} className="flex-1">
                                Log in with Java Edition
                            </Button>
                            <Button onClick={e => {
                                setLoading(true)
                                validateUsername(username, "bedrock")
                                    .then(known => {
                                        if (known) {
                                            createBasket(known.name).then(basket => {
                                                const account = {
                                                    name: known.name,
                                                    uuid: known.id,
                                                    mcje: false,
                                                    basket
                                                }
                                                setOpen(false);
                                                setUsername("");
                                                setAccount(account);
                                                if (cbRef.current) {
                                                    cbRef.current(account);
                                                }
                                            }).finally(() => {
                                                setLoading(false)
                                            })
                                        } else {
                                            alert("Invalid username, have you joined the server before?");
                                            setLoading(false)
                                        }
                                    })
                            }} disabled={username.length == 0} variant="secondary" className="flex-1">
                                Log in with Bedrock Edition
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
            {children}
        </AccountContext.Provider>
    )
}

export const useAccount = () => {
    const account = useContext(AccountContext);
    if (!account) {
        throw new Error("useAccount must be used within an AccountProvider");
    }

    return account;
}