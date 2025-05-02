import {useTheme} from "next-themes"
import {Toaster as Sonner, type ToasterProps} from "sonner"

const Toaster = ({...props}: ToasterProps) => {
    const {theme = "system"} = useTheme()

    return (
        <Sonner
            theme={theme as ToasterProps["theme"]}
            className="toaster group"
            style={
                {
                    "--normal-bg": "var(--color-purple-400)",
                    "--normal-text": "var(--color-white)",
                    "--normal-border": "var(--color-purple-400)",
                } as React.CSSProperties
            }
            {...props}
        />
    )
}

export {Toaster}
