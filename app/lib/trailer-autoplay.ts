export type TrailerConnection = EventTarget & {
    type?: string;
    effectiveType?: string;
    saveData?: boolean;
};

export function allowsTrailerAutoplay(
    connection: Pick<TrailerConnection, "type" | "effectiveType" | "saveData"> | undefined,
    coarsePointer: boolean,
): boolean {
    if (connection?.saveData || connection?.type === "cellular" || connection?.type === "none") return false;
    if (["slow-2g", "2g", "3g"].includes(connection?.effectiveType ?? "")) return false;

    // Effective type measures speed: "4g" can also mean Wi-Fi, not cellular.
    // On touch devices without a known connection type, preserve the image.
    const unknownConnection = !connection?.type || ["unknown", "other"].includes(connection.type);
    return !(coarsePointer && unknownConnection);
}
