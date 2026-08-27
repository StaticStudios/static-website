import * as React from "react"
import {Slot} from "@radix-ui/react-slot"
import {cva, type VariantProps} from "class-variance-authority"

import {cn} from "~/lib/utils"

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
    {
        variants: {
            variant: {
                default:
                    "border border-purple-300/15 bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-lg shadow-purple-950/20 hover:-translate-y-0.5 hover:from-violet-400 hover:to-purple-500",
                destructive:
                    "bg-red-400 text-white shadow-xs hover:bg-red-400/90 focus-visible:ring-red-400/20",
                outline:
                    "border border-white/10 bg-white/5 text-white shadow-sm hover:border-purple-300/25 hover:bg-white/10",
                secondary:
                    "border border-white/15 bg-white/8 text-white shadow-sm hover:bg-white/14 hover:text-white",
                ghost:
                    "hover:bg-purple-400/20",
                link: "text-primary underline-offset-4 hover:underline",
                empty: ""
            },
            size: {
                default: "h-9 px-4 py-2 has-[>svg]:px-3",
                sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
                lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
                icon: "size-9",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

function Button({
                    className,
                    variant,
                    size,
                    asChild = false,
                    ...props
                }: React.ComponentProps<"button"> &
    VariantProps<typeof buttonVariants> & {
    asChild?: boolean
}) {
    const Comp = asChild ? Slot : "button"

    return (
        <Comp
            data-slot="button"
            className={cn(buttonVariants({variant, size, className}))}
            {...props}
        />
    )
}

export {Button, buttonVariants}
