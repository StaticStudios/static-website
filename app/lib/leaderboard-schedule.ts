export const LEADERBOARD_TIME_ZONE = "America/New_York";

type CalendarDate = {
    year: number;
    month: number;
    day: number;
};

const zonedDateTimeFormatter = new Intl.DateTimeFormat("en-US", {
    timeZone: LEADERBOARD_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
});

function zonedParts(date: Date) {
    const parts = Object.fromEntries(
        zonedDateTimeFormatter
            .formatToParts(date)
            .filter(part => part.type !== "literal")
            .map(part => [part.type, Number(part.value)]),
    );

    return {
        year: parts.year,
        month: parts.month,
        day: parts.day,
        hour: parts.hour,
        minute: parts.minute,
        second: parts.second,
    };
}

function timeZoneOffset(date: Date) {
    const parts = zonedParts(date);
    const representedAsUtc = Date.UTC(
        parts.year,
        parts.month - 1,
        parts.day,
        parts.hour,
        parts.minute,
        parts.second,
    );
    return representedAsUtc - Math.floor(date.getTime() / 1000) * 1000;
}

function easternMidnight({year, month, day}: CalendarDate) {
    const utcGuess = Date.UTC(year, month - 1, day);
    const firstOffset = timeZoneOffset(new Date(utcGuess));
    const firstResult = utcGuess - firstOffset;
    const correctedOffset = timeZoneOffset(new Date(firstResult));
    return new Date(utcGuess - correctedOffset);
}

function addCalendarDays(date: CalendarDate, days: number): CalendarDate {
    const result = new Date(Date.UTC(date.year, date.month - 1, date.day + days));
    return {
        year: result.getUTCFullYear(),
        month: result.getUTCMonth() + 1,
        day: result.getUTCDate(),
    };
}

export function getLeaderboardResetTimes(now: Date) {
    const localNow = zonedParts(now);
    const localDate = {
        year: localNow.year,
        month: localNow.month,
        day: localNow.day,
    };
    const localDayOfWeek = new Date(Date.UTC(
        localDate.year,
        localDate.month - 1,
        localDate.day,
    )).getUTCDay();
    const daysUntilSunday = localDayOfWeek === 0 ? 7 : 7 - localDayOfWeek;
    const nextSunday = easternMidnight(addCalendarDays(localDate, daysUntilSunday));
    const nextMonthDate = new Date(Date.UTC(localDate.year, localDate.month, 1));
    const nextMonth = easternMidnight({
        year: nextMonthDate.getUTCFullYear(),
        month: nextMonthDate.getUTCMonth() + 1,
        day: 1,
    });

    return {
        weekly: nextSunday.getTime() < nextMonth.getTime() ? nextSunday : nextMonth,
        monthly: nextMonth,
    };
}
