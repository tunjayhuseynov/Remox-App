export enum CoinsURL {
	CELO = '/icons/celoiconsquare.svg',
	cUSD = '/icons/celodollar.svg',
	cEUR = '',
	None = ''
}

export enum CoinsName {
	CELO = 'celo',
	cUSD = 'cUSD',
	cEUR = 'cEUR'
}

export enum CoinsNameVisual {
	CELO = 'Celo',
	cUSD = 'cUsd',
	cEUR = 'cEur'
}

export enum TransactionFeeTokenName {
	cGLD = 'celo',
	cUSD = 'cUSD',
	cEUR = 'cEUR'
}

export enum StableTokens {
	cUSD = 'cUSD',
	cEUR = 'cEUR'
}

export enum CoinsNameLower {
	CELO = 'celo',
	cUSD = 'cUsd',
	cEUR = 'cEur'
}

export const Coins : Coins = {
	celo: {
		name: 'Celo',
		coinUrl: CoinsURL.CELO,
		value: CoinsName.CELO,
		feeName: TransactionFeeTokenName.cGLD,
		lowerName: CoinsNameLower.CELO
	},
	cUSD: {
		name: 'cUSD',
		coinUrl: CoinsURL.cUSD,
		value: CoinsName.cUSD,
		feeName: TransactionFeeTokenName.cUSD,
		lowerName: CoinsNameLower.cUSD
	},
	cEUR: {
		name: 'cEUR',
		coinUrl: CoinsURL.cEUR,
		value: CoinsName.cEUR,
		feeName: TransactionFeeTokenName.cEUR,
		lowerName: CoinsNameLower.cEUR
	}
};

export interface Coins {
	celo: AltCoins;
	cUSD: AltCoins;
	cEUR: AltCoins;
}

export interface AltCoins {
	name: string;
	coinUrl: CoinsURL;
	value: CoinsName;
	feeName: TransactionFeeTokenName;
	lowerName: CoinsNameLower;
}
