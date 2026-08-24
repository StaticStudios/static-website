import {CalendarDaysIcon, ClockIcon} from "lucide-react";
import {useEffect, useState} from "react";
import {getLeaderboardResetTimes} from "~/lib/leaderboard-schedule";

function formatCountdown(target: Date, now: number) {
    let seconds = Math.max(0, Math.ceil((target.getTime() - now) / 1000));
    const days = Math.floor(seconds / 86_400);
    seconds %= 86_400;
    const hours = Math.floor(seconds / 3_600);
    seconds %= 3_600;
    const minutes = Math.floor(seconds / 60);
    seconds %= 60;

    return [
        ...(days > 0 ? [`${days}d`] : []),
        `${hours.toString().padStart(2, "0")}h`,
        `${minutes.toString().padStart(2, "0")}m`,
        `${seconds.toString().padStart(2, "0")}s`,
    ].join(" ");
}

const resetDateFormatter = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
});

export function LeaderboardResetCountdown() {
    const [now, setNow] = useState<number>();

    useEffect(() => {
        const update = () => setNow(Date.now());
        update();
        const interval = window.setInterval(update, 1000);
        return () => window.clearInterval(interval);
    }, []);

    const resetTimes = now === undefined ? undefined : getLeaderboardResetTimes(new Date(now));

    return (
        <section className="my-6" aria-labelledby="leaderboard-reset-countdowns">
            <h2 id="leaderboard-reset-countdowns" className="sr-only">Leaderboard reset countdowns</h2>
            <div className="grid gap-4 md:grid-cols-2">
                <ResetCard
                    icon={<ClockIcon aria-hidden="true" className="size-5"/>}
                    label="Weekly reset"
                    countdown={resetTimes && now !== undefined ? formatCountdown(resetTimes.weekly, now) : "Calculating…"}
                    resetAt={resetTimes?.weekly}
                    explanation="Awards this week's placement points and starts a new island-value race."
                />
                <ResetCard
                    icon={<CalendarDaysIcon aria-hidden="true" className="size-5"/>}
                    label="Monthly reset"
                    countdown={resetTimes && now !== undefined ? formatCountdown(resetTimes.monthly, now) : "Calculating…"}
                    resetAt={resetTimes?.monthly}
                    explanation="Finalizes the monthly winners and returns every island's monthly points to zero."
                />
            </div>
        </section>
    );
}

type ResetCardProps = {
    icon: React.ReactNode;
    label: string;
    countdown: string;
    resetAt?: Date;
    explanation: string;
};

function ResetCard({icon, label, countdown, resetAt, explanation}: ResetCardProps) {
    return (
        <div className="rounded-lg border border-indigo-600/40 bg-slate-900/60 p-4">
            <div className="flex items-center gap-2 text-purple-300">
                {icon}
                <h3 className="text-base font-semibold text-white">{label}</h3>
            </div>
            <p className="mt-2 font-mono text-2xl font-bold tabular-nums text-purple-300">{countdown}</p>
            {resetAt && (
                <time className="mt-1 block text-xs text-white/50" dateTime={resetAt.toISOString()}>
                    {resetDateFormatter.format(resetAt)}
                </time>
            )}
            <p className="mt-3 text-sm text-white/70">{explanation}</p>
        </div>
    );
}
