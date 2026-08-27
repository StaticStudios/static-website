import type {ReactNode} from "react";
import {cn} from "~/lib/utils";

export const PageShell = ({children, className}: { children: ReactNode, className?: string }) => (
    <div className={cn("mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8", className)}>
        {children}
    </div>
);

export const PageIntro = ({eyebrow, title, description, actions, className}: {
    eyebrow?: string,
    title: string,
    description?: string,
    actions?: ReactNode,
    className?: string
}) => (
    <header className={cn("mb-9 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between", className)}>
        <div className="max-w-3xl">
            {eyebrow && <p className="page-eyebrow">{eyebrow}</p>}
            <h1 className="page-title">{title}</h1>
            {description && <p className="page-lede">{description}</p>}
        </div>
        {actions && <div className="shrink-0">{actions}</div>}
    </header>
);

export const Surface = ({children, className}: { children: ReactNode, className?: string }) => (
    <section className={cn("surface-panel", className)}>
        {children}
    </section>
);
