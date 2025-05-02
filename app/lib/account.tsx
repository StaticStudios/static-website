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


const AccountContext = createContext<{
    account?: Account,
    updateBasket: (basket: TebexBasket) => void,
    promptLogin: (callback?: (account: Account) => void) => void,
    addToCart: (packageId: number, quantity: number, giftTo?: string) => void,
    removeFromCart: (packageId: number) => void,
    logout: () => void
} | undefined>(undefined);
export const AccountProvider = ({children}: { children: ReactNode }) => {
    const {account, setAccount, updateBasket} = useStore()
    const [open, setOpen] = useState(false);
    const [username, setUsername] = useState("");
    const [cb, setCb] = useState<((account: Account) => void) | undefined>();
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
        setCb(callback);
    }

    return (
        <AccountContext.Provider value={{
            account: account,
            updateBasket,
            promptLogin,
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
                                    axios.get(`https://mcprofile.io/api/v1/java/username/${username}`)
                                        .then(res => {
                                            if (res.status === 200) {
                                                createBasket(res.data.username).then(basket => {
                                                    const account = {
                                                        name: res.data.username,
                                                        uuid: res.data.uuid,
                                                        mcje: true,
                                                        basket
                                                    }
                                                    setOpen(false);
                                                    setAccount(account);
                                                    if (cb) {
                                                        cb(account);
                                                    }
                                                }).finally(() => {
                                                    setLoading(false)
                                                })
                                            } else {
                                                alert("Invalid username");
                                                setLoading(false)
                                            }
                                        })
                                        .catch(err => {
                                            console.error(err);
                                            alert("Invalid username");
                                            setLoading(false)
                                        })
                                }}
                                disabled={username.length == 0} className="flex-1">
                                Log in with Java Edition
                            </Button>
                            <Button onClick={e => {
                                setLoading(true)
                                axios.get(`https://mcprofile.io/api/v1/bedrock/gamertag/${username}`)
                                    .then(res => {
                                        if (res.status === 200) {
                                            const username = `.${res.data.gamertag}`.replaceAll(/\s/g, "_")
                                            createBasket(username).then(basket => {
                                                const account = {
                                                    name: username,
                                                    uuid: res.data.floodgateuid,
                                                    mcje: false,
                                                    basket
                                                };
                                                setOpen(false);
                                                setAccount(account);
                                                if (cb) {
                                                    cb(account);
                                                }
                                            }).finally(() => {
                                                setLoading(false)
                                            })
                                        } else {
                                            alert("Invalid username");
                                            setLoading(false)
                                        }
                                    })
                                    .catch(err => {
                                        console.error(err);
                                        alert("Invalid username");
                                        setLoading(false)
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