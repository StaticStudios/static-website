interface CardProps {
    imageSrc: string;
    title: string;
    description: string;
    footer: string;
    layout: "vertical" | "horizontal";
}

import parse from 'html-react-parser';


export const Card = (props: CardProps) => {
    if (props.layout === "horizontal") {
        return <HorizontalCard {...props}/>
    }

    return <VerticalCard {...props}/>
}

const HorizontalCard = ({imageSrc, title, description, footer}: CardProps) => {
    const htmlDescription = parse(description);
    return (
        <div className="flex flex-col md:flex-row w-full bg-slate-800 rounded-lg p-[1px] md:h-[350px]" style={{
            boxShadow: "0 0 20px 0 rgba(0,0,0,0.3)"
        }}>
            <div
                className="ring-1 flex flex-1 overflow-hidden rounded-bl-none rounded-t-lg md:rounded-tr-none md:rounded-l-lg">
                <img src={imageSrc}
                     className="object-center object-cover w-full h-[250px] md:h-auto"
                     alt="Card Image"/>
            </div>

            <section className="p-6 md:h-auto md:w-[400px] h-[300px]">
                <div className="relative size-full">
                    <div className="flex flex-col text-center gap-4">
                        <h1 className="text-[26px] font-bold tracking-tight text-white">{title}</h1>
                        <div className="font-light text-[17px]">{htmlDescription}</div>
                        <p className="absolute bottom-0 right-0 font-semibold text-lg">{footer}</p>
                    </div>
                </div>
            </section>
        </div>
    );
}

const VerticalCard = ({imageSrc, title, description, footer}: CardProps) => {
    const htmlDescription = parse(description);
    return (
        <div className="flex flex-col md:basis-1/3 w-full bg-slate-800 rounded-lg p-[1px]" style={{
            boxShadow: "0 0 20px 0 rgba(0,0,0,0.3)"
        }}>
            <div className="ring-1 flex flex-1 overflow-hidden rounded-t-lg">
                <img src={imageSrc}
                     className="object-center object-cover w-full h-[250px] md:h-auto"
                     alt="Card Image"/>
            </div>

            <section className="p-6 h-[300px] overflow-hidden">
                <div className="relative size-full">
                    <div className="flex flex-col text-center gap-4">
                        <h1 className="text-[26px] font-bold tracking-tight text-white">{title}</h1>
                        <div className="font-light text-[17px]">{htmlDescription}</div>
                        <p className="absolute bottom-0 right-0 font-semibold text-lg">{footer}</p>
                    </div>
                </div>
            </section>
        </div>
    );
}