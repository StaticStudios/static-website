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
                className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/30 pointer-events-none">
                <div className="flex flex-col items-center space-y-4">
                    <div
                        className="relative h-12 w-12 animate-spin rounded-full border-4 border-white border-t-transparent"/>
                </div>
            </div>
        )
    }
}
