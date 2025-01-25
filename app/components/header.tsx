import banner from "~/assets/banner.png";
import {Container} from "~/components/content";
import React, {useCallback, useEffect, useState} from "react";
import {DiscordIcon} from "~/components/icons/discord";
import {PlayIcon} from "~/components/icons/play";

export const Header = () => {
    return (
        <div className="relative">
            <img alt="skyblock island" src={banner} className="w-full aspect-16/9 md:aspect-16/3 object-cover "/>
            <div className="absolute right-0 left-0 bottom-0 top-0 flex flex-col justify-end">
                <div className="mt-auto h-[50%] w-full bg-linear-to-b from-theme-800/0 to-theme-800"/>
                <div className="h-[3%] w-full bg-theme-800"/>
            </div>
            <div className="absolute left-0 right-0 bottom-4">
                <Container>
                    <div className="flex flex-row justify-between">
                        <ServerButton/>
                        <DiscordButton/>
                    </div>
                </Container>
            </div>
        </div>
    )
}

const DiscordButton = () => {
    const [members, setMembers] = useState<null | number>(null);
    useEffect(() => {
        const url = 'https://discord.com/api/v9/invites/9S6K9E5?with_counts=true&with_expiration=true';
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setMembers(data.approximate_member_count);
            })
            .catch(console.error);

    }, [setMembers])

    const onClick = useCallback(() => {
        window.open("https://discord.gg/9S6K9E5", "_blank");
    }, []);


    return <HeaderButton icon={<DiscordIcon className="size-12"/>}
                         title="discord community"
                         right={true}
                         onClick={onClick}
                         description={`${members ? members.toLocaleString() : "Loading..."} MEMBERS • CLICK TO JOIN`}
    />
}

const ServerButton = () => {
    const [onlinePlayers, setOnlinePlayers] = useState<null | number>(null);
    //todo: fetch these in the background

    const onClick = useCallback(async () => {
        await navigator.clipboard.writeText("play.staticstudios.net");
        alert("Copied to clipboard!");
    }, []);

    return <HeaderButton
        icon={<PlayIcon className="size-12"/>}
        title="play.staticstudios.net"
        right={false}
        onClick={onClick}
        description={`${onlinePlayers ? onlinePlayers.toLocaleString() : "Loading..."} ONLINE • CLICK TO COPY`}
    />
}

interface HeaderButtonProps {
    icon: React.ReactNode;
    title: string;
    right: boolean;
    description: string;
    onClick: () => void;
}

const HeaderButton = ({icon, title, right, description, onClick}: HeaderButtonProps) => {
    return (
        <button className="hover:scale-[97%] transition-transform duration-100" onClick={onClick}>
            <div className="flex items-center gap-2" style={{flexDirection: right ? "row-reverse" : "row"}}>
                <div className="text-theme-500">
                    {icon}
                </div>
                <div className="hidden md:flex flex-col" style={{textAlign: right ? "end" : "start"}}>
                    <p className="text-theme-500 font-bold text-2xl tracking-tight">{title.toUpperCase()}</p>
                    <p className="text-white font-semibold text-xs tracking-tight">{description}</p>
                </div>
            </div>
        </button>
    )
}