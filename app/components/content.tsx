import React, {type ReactNode} from "react";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}

export const Container = ({children, ...props}: ContainerProps) => {
    return (
        <div style={{
            width: "100%",
            maxWidth: "1300px",
            marginInline: "auto",
            paddingInline: "16px",
            ...props.style,
        }} {...props}>
            {children}
        </div>
    );
}