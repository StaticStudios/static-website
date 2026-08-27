import React, {useEffect} from "react";

export const FullScreenLoading = ({loading}: { loading: boolean }) => {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (loading) {
                e.preventDefault();
                e.stopPropagation();
            }
        };

        window.addEventListener("keydown", handleKeyDown, true);

        return () => {
            window.removeEventListener("keydown", handleKeyDown, true);
        };
    }, [loading]);


    if (loading) {
        return (
            <div
                className="fixed inset-0 z-[10000] flex items-center justify-center bg-slate-950/65 backdrop-blur-sm"
                role="status" aria-live="polite" aria-label="Loading">
                <div className="surface-card grid size-24 shrink-0 place-items-center p-0">
                    <div
                        className="relative size-12 animate-spin rounded-full border-4 border-purple-200/25 border-t-purple-300 shadow-[0_0_24px_rgba(192,132,252,0.3)]"/>
                    <span className="sr-only">Loading</span>
                </div>
            </div>
        )
    }
}
