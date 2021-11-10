export enum CoinsURL {
    CELO = "/icons/celoiconsquare.svg",
    cUSD = "/icons/celodollar.svg",
    cEUR = "",
    None = "",
}

export enum CoinsName {
    CELO = "celo",
    cUSD = "cUsd",
    cEUR = "cEur"
}

export enum CoinsNameVisual {
    CELO = "Celo",
    cUSD = "cUsd",
    cEUR = "cEur"
}

export const Coins = {
    celo: { name: "Celo", coinUrl: CoinsURL.CELO, value: CoinsName.CELO },
    cUsd: { name: "cUSD", coinUrl: CoinsURL.cUSD, value: CoinsName.cUSD},
    cEur: { name: "cEUR", coinUrl: CoinsURL.cEUR, value: CoinsName.cEUR }
}