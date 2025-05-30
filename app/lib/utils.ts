import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export type PackageVariable = {
    variable: string
    type: "email"
    description: string
}

export const packageVariables: { [packageId: number]: PackageVariable[] } = {
    6861397: [
        {
            variable: "giftcard_to",
            type: "email",
            description: "Enter the email address that the gift card should be sent to."
        }
    ],
    6861473: [
        {
            variable: "giftcard_to",
            type: "email",
            description: "Enter the email address that the gift card should be sent to."
        }
    ],
    6861474: [
        {
            variable: "giftcard_to",
            type: "email",
            description: "Enter the email address that the gift card should be sent to."
        }
    ],
    6861475: [
        {
            variable: "giftcard_to",
            type: "email",
            description: "Enter the email address that the gift card should be sent to."
        }
    ],
    6861476: [
        {
            variable: "giftcard_to",
            type: "email",
            description: "Enter the email address that the gift card should be sent to."
        }
    ]
}

export function getPackageVariables(packageId: number): PackageVariable[] {
    return packageVariables[packageId] || []
}