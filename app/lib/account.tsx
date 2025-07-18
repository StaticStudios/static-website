import {createContext, type ReactNode, useContext, useEffect, useRef, useState} from "react";
import {Dialog, DialogContent, DialogTitle} from "~/components/ui/dialog";
import {DialogDescription} from "@radix-ui/react-dialog";
import {Button} from "~/components/ui/button";
import axios from "axios";
import {useStore} from "~/lib/persist";
import {type TebexBasket, type TebexPackage, useTebex} from "~/lib/tebex";
import {toast} from "sonner";
import {getPackageVariables, type PackageVariable} from "~/lib/utils";
import * as EmailValidator from 'email-validator';
import {FullScreenLoading} from "~/components/FullScreenLoading";


export type Account = {
    name: string;
    uuid: string;
    mcje: boolean
    basket: TebexBasket,
    signed_in_at?: string
}

type KnownAccount = {
    id: string
    name: string
}

const AccountContext = createContext<{
    account?: Account,
    updateBasket: (basket: TebexBasket) => void,
    promptLogin: (callback?: (account: Account) => void) => void,
    addToCart: (okg: TebexPackage, quantity: number, giftTo?: string) => void,
    removeFromCart: (packageId: number) => void,
    validateUsername: (username: string, platform: "java" | "bedrock") => Promise<KnownAccount | null>,
    logout: () => void
} | undefined>(undefined);
export const AccountProvider = ({children}: { children: ReactNode }) => {
    const {account, setAccount, updateBasket} = useStore()
    const [loginOpen, setLoginOpen] = useState(false);
    const [variableFields, setVariableFields] = useState<PackageVariable[] | undefined>();
    const [variableFieldsDataValues, setVariableFieldsDataValues] = useState<Record<string, any> | undefined>(undefined);
    const [username, setUsername] = useState("");
    const [variableFieldsPackageName, setVariableFieldsPackageName] = useState<string | undefined>(undefined);
    const loginCbRef = useRef<undefined | ((account: Account) => void)>(undefined);
    const variablesCbRef = useRef<((variables: Record<string, any>) => void) | undefined>(undefined);
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

        if (Date.now() > new Date(account.signed_in_at ?? 0).getTime() + 2 * 24 * 60 * 60 * 1000) { // 2 days
            setAccount(undefined);
            toast.error("Session expired, please log in again")
        } else {
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
                    setAccount(undefined)
                })
        }

    }, [account, getBasket, updateBasket]);

    const promptLogin = (callback?: (account: Account) => void) => {
        setLoginOpen(true);
        loginCbRef.current = callback;
    }

    const promptVariables = (packageName: string, variables: PackageVariable[], callback: (variables: Record<string, any>) => void) => {
        setVariableFields(variables);
        setVariableFieldsDataValues({})
        variablesCbRef.current = callback;
        setVariableFieldsPackageName(packageName);
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
            addToCart: (pkg, quantity, giftTo?: string) => {
                if (!account) {
                    promptLogin(acc => {
                        addToBasket(acc.basket, pkg.id, 1, undefined, giftTo).then(updateBasket);
                    });
                    return
                }
                console.log("variables:" + getPackageVariables(pkg.id))
                if (getPackageVariables(pkg.id).length > 0) {
                    promptVariables(pkg.name, getPackageVariables(pkg.id), (variables) => {
                        setLoading(true)
                        addToBasket(account.basket, pkg.id, quantity, variables, giftTo).then(updateBasket)
                            .then(() => toast.success("Added to cart"))
                            .catch(() => {
                                toast.error("Failed to add to cart")
                            })
                            .finally(() => {
                                setLoading(false)
                            })
                    });
                    return;
                }

                setLoading(true)
                addToBasket(account.basket, pkg.id, quantity, undefined, giftTo).then(updateBasket)
                    .then(() => toast.success("Added to cart"))
                    .catch(() => {
                        toast.error("Failed to add to cart")
                    })
                    .finally(() => {
                        setLoading(false)
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
            <FullScreenLoading loading={loading}/>
            <Dialog onOpenChange={open => {
                setLoginOpen(open);
                if (!open) {
                    setUsername("");
                }
            }} open={loginOpen}>
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
                                                        basket,
                                                        signed_in_at: new Date().toISOString()
                                                    } satisfies Account
                                                    setLoginOpen(false);
                                                    setUsername("");
                                                    setAccount(account);
                                                    if (loginCbRef.current) {
                                                        loginCbRef.current(account);
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
                                                    basket,
                                                    signed_in_at: new Date().toISOString()
                                                } satisfies Account
                                                setLoginOpen(false);
                                                setUsername("");
                                                setAccount(account);
                                                if (loginCbRef.current) {
                                                    loginCbRef.current(account);
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


            <Dialog
                onOpenChange={open => {
                    if (!open) {
                        setVariableFields(undefined);
                        setVariableFieldsDataValues(undefined);
                        setVariableFieldsPackageName(undefined);
                    }
                }}
                open={variableFields !== undefined && variableFields.length > 0}>
                <DialogContent
                    className="md:max-w-[95vw] w-[900px] max-h-[95vh] overflow-y-auto animate-in text-white border-indigo-800/30 p-6 bg-slate-800">
                    <DialogTitle>{variableFieldsPackageName}</DialogTitle>

                    <div className="">
                        <div>
                            {variableFields?.map(field => <EmailVariableField key={field.variable}
                                                                              description={field.description}
                                                                              onChange={email => setVariableFieldsDataValues(prev => {
                                                                                  if (!prev) {
                                                                                      return undefined;
                                                                                  }
                                                                                  return {
                                                                                      ...prev,
                                                                                      [field.variable]: email
                                                                                  }
                                                                              })}/>)}
                        </div>
                        <div className="mt-2 flex">
                            <Button
                                onClick={e => {
                                    const values = variableFieldsDataValues;
                                    if (!values) {
                                        return;
                                    }
                                    variablesCbRef.current?.(values);
                                    setVariableFields(undefined);
                                    setVariableFieldsDataValues(undefined);
                                    setVariableFieldsPackageName(undefined);
                                }}
                                disabled={!variableFieldsDataValues || Object.values(variableFieldsDataValues).some((v) => v === undefined || v === "") || Object.keys(variableFieldsDataValues).length != variableFields?.length}
                                className="flex-1">
                                Continue
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

const EmailVariableField = ({description, onChange}: { description: string, onChange: (value?: string) => void }) => {
    const [email, setEmail] = useState("");
    const [prevEmail, setPrevEmail] = useState("");

    useEffect(() => {
        if (email !== prevEmail) {
            if (EmailValidator.validate(email)) {
                onChange(email);
            } else {
                onChange(undefined);
            }
            setPrevEmail(email);
        }
    }, [email, onChange, prevEmail]);

    return (
        <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:border-wildphire-blue focus:ring-wildphire-blue"
            placeholder={description}
        />
    );
}