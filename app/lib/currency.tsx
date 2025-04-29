import {createContext, type ReactNode, useContext, useEffect, useState} from "react";
import {useStore} from "~/lib/persist";

type CurrencyRatesContextType = {
    rates: { [key: string]: number };
}

const CurrencyRatesContext = createContext<CurrencyRatesContextType | null>(null);

export const CurrencyRatesProvider = ({children}: { children: ReactNode }) => {
    const rates = useRates();

    return (
        <CurrencyRatesContext.Provider value={{rates}}>
            {children}
        </CurrencyRatesContext.Provider>
    );
}

//todo: impl caching on the backend
//todo: only include a handful of these
const tempRates: { [key: string]: number } = {
    "USD": 1,
    "AED": 3.67,
    "AFN": 71.14,
    "ALL": 86.97,
    "AMD": 389.9,
    "ANG": 1.79,
    "AOA": 918.36,
    "ARS": 1163.17,
    "AUD": 1.56,
    "AWG": 1.79,
    "AZN": 1.7,
    "BAM": 1.72,
    "BBD": 2,
    "BDT": 121.49,
    "BGN": 1.72,
    "BHD": 0.376,
    "BIF": 2955.44,
    "BMD": 1,
    "BND": 1.31,
    "BOB": 6.92,
    "BRL": 5.69,
    "BSD": 1,
    "BTN": 85.22,
    "BWP": 13.74,
    "BYN": 3.05,
    "BZD": 2,
    "CAD": 1.38,
    "CDF": 2891.65,
    "CHF": 0.825,
    "CLP": 935.39,
    "CNY": 7.29,
    "COP": 4212.16,
    "CRC": 505.44,
    "CUP": 24,
    "CVE": 96.8,
    "CZK": 21.94,
    "DJF": 177.72,
    "DKK": 6.55,
    "DOP": 59.07,
    "DZD": 132.38,
    "EGP": 50.84,
    "ERN": 15,
    "ETB": 131.78,
    "EUR": 0.878,
    "FJD": 2.26,
    "FKP": 0.746,
    "FOK": 6.55,
    "GBP": 0.747,
    "GEL": 2.75,
    "GGP": 0.746,
    "GHS": 14.58,
    "GIP": 0.746,
    "GMD": 72.69,
    "GNF": 8705.56,
    "GTQ": 7.7,
    "GYD": 209.18,
    "HKD": 7.76,
    "HNL": 25.91,
    "HRK": 6.61,
    "HTG": 130.76,
    "HUF": 355.44,
    "IDR": 16842.44,
    "ILS": 3.62,
    "IMP": 0.746,
    "INR": 85.22,
    "IQD": 1309.59,
    "IRR": 41986.28,
    "ISK": 128.02,
    "JEP": 0.746,
    "JMD": 158.35,
    "JOD": 0.709,
    "JPY": 142.77,
    "KES": 129.3,
    "KGS": 86.88,
    "KHR": 3982.45,
    "KID": 1.56,
    "KMF": 431.87,
    "KRW": 1438.04,
    "KWD": 0.307,
    "KYD": 0.833,
    "KZT": 513.26,
    "LAK": 21737.78,
    "LBP": 89500,
    "LKR": 299.32,
    "LRD": 199.85,
    "LSL": 18.56,
    "LYD": 5.47,
    "MAD": 9.27,
    "MDL": 17.23,
    "MGA": 4508.62,
    "MKD": 54.12,
    "MMK": 2098.63,
    "MNT": 3588.68,
    "MOP": 7.99,
    "MRU": 39.73,
    "MUR": 45.26,
    "MVR": 15.42,
    "MWK": 1740.76,
    "MXN": 19.57,
    "MYR": 4.37,
    "MZN": 63.76,
    "NAD": 18.56,
    "NGN": 1602.84,
    "NIO": 36.78,
    "NOK": 10.38,
    "NPR": 136.35,
    "NZD": 1.68,
    "OMR": 0.384,
    "PAB": 1,
    "PEN": 3.67,
    "PGK": 4.09,
    "PHP": 56.41,
    "PKR": 281.29,
    "PLN": 3.75,
    "PYG": 8028.5,
    "QAR": 3.64,
    "RON": 4.38,
    "RSD": 103.06,
    "RUB": 82.56,
    "RWF": 1437.39,
    "SAR": 3.75,
    "SBD": 8.54,
    "SCR": 14.21,
    "SDG": 464.75,
    "SEK": 9.63,
    "SGD": 1.31,
    "SHP": 0.746,
    "SLE": 22.68,
    "SLL": 22684.4,
    "SOS": 571.69,
    "SRD": 36.69,
    "SSP": 4545.44,
    "STN": 21.51,
    "SYP": 12882.01,
    "SZL": 18.56,
    "THB": 33.55,
    "TJS": 10.76,
    "TMT": 3.5,
    "TND": 2.99,
    "TOP": 2.36,
    "TRY": 38.48,
    "TTD": 6.74,
    "TVD": 1.56,
    "TWD": 32.41,
    "TZS": 2687.35,
    "UAH": 41.72,
    "UGX": 3650.26,
    "UYU": 41.8,
    "UZS": 12950.96,
    "VES": 86.66,
    "VND": 25990.87,
    "VUV": 120.02,
    "WST": 2.77,
    "XAF": 575.83,
    "XCD": 2.7,
    "XCG": 1.79,
    "XDR": 0.739,
    "XOF": 575.83,
    "XPF": 104.76,
    "YER": 245,
    "ZAR": 18.54,
    "ZMW": 28.01,
    "ZWL": 26.81
}

const useRates = () => {
    const [rates, setRates] = useState<{ [key: string]: number }>({});

    useEffect(() => {
        const fetchRates = async () => {
            // // @ts-ignore
            // const rates = await new Convert().from("USD").fetch();
            // console.log(rates.rates)
            const rates = tempRates;
            const obj: { [key: string]: number } = {}
            for (const key in rates) {
                obj[key] = rates[key];
            }
            console.log(obj)
            setRates(obj);
        };

        fetchRates();
    }, []);

    return rates;
}

export const useCurrencies = () => {
    const exchangeRates = useExchangeRates();
    const currencies = Object.keys(exchangeRates.rates);
    return currencies;
}

export const useExchangeRates = () => {
    const context = useContext(CurrencyRatesContext);
    if (!context) {
        throw new Error("useExchangeRates must be used within a CurrencyRatesProvider");
    }
    return context;
}

export const useCurrencyFormatter = (usd?: number) => {
    const {currency} = useStore()
    const [formattedCurrency, setFormattedCurrency] = useState("");
    const exchangeRates = useExchangeRates();
    useEffect(() => {
        const currencyToUse = currency ?? "USD";
        const converted = exchangeRates ? exchangeRates.rates[currencyToUse] ?? 1 : 0;
        setFormattedCurrency(usd ? (usd * converted).toLocaleString(undefined, {
            style: "currency",
            currency: currencyToUse,
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
        }) : "?.??");
    }, [usd, exchangeRates, currency]);

    return formattedCurrency;
}