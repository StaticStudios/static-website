import React, {useEffect} from "react";

export const useIsMobile = () => {
    const [mobile, setMobile] = React.useState(window.innerWidth < 768);

    useEffect(() => {
        const updateDimensions = () => {
            if (window.innerWidth < 768) {
                setMobile(true);
            } else {
                setMobile(false);
            }
        }
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, []);

    return mobile;
}