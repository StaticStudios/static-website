interface TextProps {
    children: string | string[];
}

export const Title = ({children}: TextProps) => {
    return (
        <h1 className="text-5xl text-theme-500 font-bold tracking-tight">{children}</h1>
    );
}

export const SubTitle = ({children}: TextProps) => {
    return (
        <h1 className="text-4xl text-theme-500 font-bold tracking-tight">{children}</h1>
    );
}

