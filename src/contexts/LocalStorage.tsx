/* eslint-disable no-unused-vars*/
import { useMemo, useEffect, useSyncExternalStore } from 'react'
// import { trackGoal } from 'fathom-client'
import { slug } from '~/utils'
import { useIsClient } from '~/hooks'

const DEFILLAMA = 'DEFILLAMA'
export const DARK_MODE = 'DARK_MODE'

// DEFI
export const DEFI_SETTINGS = [
	'POOL2',
	'STAKING',
	'BORROWED',
	'DOUBLE_COUNT',
	'LIQUID_STAKING',
	'VESTING',
	'GOV_TOKENS'
] as const

export type DEFI_SETTINGS = (typeof DEFI_SETTINGS)[number]

// VALUES USED TO BE LOWERCASE
export const DEFI_SETTINGS_LOOKUP = {
	POOL2: 'POOL2',
	STAKING: 'STAKING',
	BORROWED: 'BORROWED',
	DOUBLE_COUNT: 'DOUBLE_COUNT',
	LIQUID_STAKING: 'LIQUID_STAKING',
	VESTING: 'VESTING',
	GOV_TOKENS: 'GOV_TOKENS'
} as const satisfies Record<DEFI_SETTINGS, DEFI_SETTINGS>

// NFT
const NFT_SETTINGS = ['DISPLAY_USD', 'HIDE_LAST_DAY'] as const

export type NFT_SETTINGS = (typeof NFT_SETTINGS)[number]

export const NFT_SETTINGS_LOOKUP = {
	DISPLAY_USD: 'DISPLAY_USD',
	HIDE_LAST_DAY: 'HIDE_LAST_DAY'
} as const satisfies Record<NFT_SETTINGS, NFT_SETTINGS>

// YIELDS
const YIELDS_SETTINGS = [
	'AUDITED',
	'MILLION_DOLLAR',
	'NO_IL',
	'SINGLE_EXPOSURE',
	'MULTI_EXPOSURE',
	'STABLECOINS',
	'NO_OUTLIER',
	'STABLE_OUTLOOK',
	'HIGH_CONFIDENCE',
	'NO_BAD_DEBT',
	'NO_LOCKUP_COLLATERAL',
	'AIRDROP',
	'APY_ZERO',
	'LSD_ONLY'
] as const

export type YIELDS_SETTINGS = (typeof YIELDS_SETTINGS)[number]

export const YIELDS_SETTINGS_LOOKUP = {
	AUDITED: 'AUDITED',
	MILLION_DOLLAR: 'MILLION_DOLLAR',
	NO_IL: 'NO_IL',
	SINGLE_EXPOSURE: 'SINGLE_EXPOSURE',
	MULTI_EXPOSURE: 'MULTI_EXPOSURE',
	STABLECOINS: 'STABLECOINS',
	NO_OUTLIER: 'NO_OUTLIER',
	STABLE_OUTLOOK: 'STABLE_OUTLOOK',
	HIGH_CONFIDENCE: 'HIGH_CONFIDENCE',
	NO_BAD_DEBT: 'NO_BAD_DEBT',
	NO_LOCKUP_COLLATERAL: 'NO_LOCKUP_COLLATERAL',
	AIRDROP: 'AIRDROP',
	APY_ZERO: 'APY_ZERO',
	LSD_ONLY: 'LSD_ONLY'
} as const satisfies Record<YIELDS_SETTINGS, YIELDS_SETTINGS>

// STABLECOINS
export const STABLECOINS_SETTINGS = [
	'PEGGEDUSD',
	'PEGGEDEUR',
	'PEGGEDSGD',
	'PEGGEDJPY',
	'PEGGEDCNY',
	'PEGGEDUAH',
	'PEGGEDARS',
	'PEGGEDGBP',
	'PEGGEDVAR',
	'PEGGEDCAD',
	'PEGGEDAUD',
	'PEGGEDTRY',
	'PEGGEDCHF',
	'PEGGEDCOP',
	'PEGGEDREAL',
	'PEGGEDRUB',
	'FIATSTABLES',
	'CRYPTOSTABLES',
	'ALGOSTABLES',
	'DEPEGGED',
	'UNRELEASED'
] as const

export type STABLECOINS_SETTINGS = (typeof STABLECOINS_SETTINGS)[number]

export const STABLECOINS_SETTINGS_LOOKUP = {
	PEGGEDUSD: 'PEGGEDUSD',
	PEGGEDEUR: 'PEGGEDEUR',
	PEGGEDSGD: 'PEGGEDSGD',
	PEGGEDJPY: 'PEGGEDJPY',
	PEGGEDCNY: 'PEGGEDCNY',
	PEGGEDUAH: 'PEGGEDUAH',
	PEGGEDARS: 'PEGGEDARS',
	PEGGEDGBP: 'PEGGEDGBP',
	PEGGEDVAR: 'PEGGEDVAR',
	PEGGEDCAD: 'PEGGEDCAD',
	PEGGEDAUD: 'PEGGEDAUD',
	PEGGEDTRY: 'PEGGEDTRY',
	PEGGEDCHF: 'PEGGEDCHF',
	PEGGEDCOP: 'PEGGEDCOP',
	PEGGEDREAL: 'PEGGEDREAL',
	PEGGEDRUB: 'PEGGEDRUB',
	FIATSTABLES: 'FIATSTABLES',
	CRYPTOSTABLES: 'CRYPTOSTABLES',
	ALGOSTABLES: 'ALGOSTABLES',
	DEPEGGED: 'DEPEGGED',
	UNRELEASED: 'UNRELEASED'
} as const satisfies Record<STABLECOINS_SETTINGS, STABLECOINS_SETTINGS>

// WATCHLISTS
const DEFI_WATCHLIST = 'DEFI_WATCHLIST'
const YIELDS_WATCHLIST = 'YIELDS_WATCHLIST'
const DEFI_SELECTED_PORTFOLIO = 'DEFI_SELECTED_PORTFOLIO'
const YIELDS_SELECTED_PORTFOLIO = 'YIELDS_SELECTED_PORTFOLIO'
export const DEFAULT_PORTFOLIO_NAME = 'main'

// YIELDS SAVED FILTERS
const YIELDS_SAVED_FILTERS = 'YIELDS_SAVED_FILTERS'

// LIQUIDATIONS
const LIQS_SETTINGS = ['LIQS_USING_USD', 'LIQS_SHOWING_INSPECTOR', 'LIQS_CUMULATIVE'] as const

export type LIQS_SETTINGS = (typeof LIQS_SETTINGS)[number]

export const LIQS_SETTINGS_LOOKUP = {
	LIQS_USING_USD: 'LIQS_USING_USD',
	LIQS_SHOWING_INSPECTOR: 'LIQS_SHOWING_INSPECTOR',
	LIQS_CUMULATIVE: 'LIQS_CUMULATIVE'
} as const satisfies Record<LIQS_SETTINGS, LIQS_SETTINGS>

// BRIDGES
const BRIDGES_SETTINGS = ['BRIDGES_SHOWING_TXS', 'BRIDGES_SHOWING_ADDRESSES'] as const

export type BRIDGES_SETTINGS = (typeof BRIDGES_SETTINGS)[number]

export const BRIDGES_SETTINGS_LOOKUP = {
	BRIDGES_SHOWING_TXS: 'BRIDGES_SHOWING_TXS',
	BRIDGES_SHOWING_ADDRESSES: 'BRIDGES_SHOWING_ADDRESSES'
} as const satisfies Record<BRIDGES_SETTINGS, BRIDGES_SETTINGS>

// DIMENSIONS (DEXS AND FEES)
const DIMENSIONS_CHART_INTERVAL_KEY = 'DIMENSIONS:CHART_INTERVAL'

//custom columns
const CUSTOM_COLUMNS = 'CUSTOM_COLUMNS'

// Pro Dashboard
export const PRO_DASHBOARD_ITEMS = 'PRO_DASHBOARD_ITEMS'

// FEES
export const FEES_SETTINGS = ['BRIBES', 'TOKENTAX'] as const

export type FEES_SETTINGS = (typeof FEES_SETTINGS)[number]

// VALUES USED TO BE LOWERCASE
export const FEES_SETTINGS_LOOKUP = {
	BRIBES: 'BRIBES',
	TOKENTAX: 'TOKENTAX'
} as const satisfies Record<FEES_SETTINGS, FEES_SETTINGS>

// DEFI CHAINS
const DEFI_CHAINS_SETTINGS2 = ['L2', 'emulators', 'gas', 'parachain', 'subnet'] as const

export type DEFI_CHAINS_SETTINGS = (typeof DEFI_CHAINS_SETTINGS2)[number]

export const DEFI_CHAINS_SETTINGS_LOOKUP = {
	BRIBES: 'BRIBES',
	TOKENTAX: 'TOKENTAX'
} as const satisfies Record<FEES_SETTINGS, FEES_SETTINGS>

export const DEFI_CHAINS_SETTINGS = [
	{
		name: 'L2',
		key: 'L2'
	},
	{
		name: 'Emulators',
		key: 'emulator'
	},
	{
		name: 'Same token',
		key: 'gas'
	},
	{
		name: 'Parachains',
		key: 'parachain'
	},
	{
		name: 'Avalanche L1s',
		key: 'subnet'
	}
]

export function subscribeToLocalStorage(callback: () => void) {
	window.addEventListener('storage', callback)

	return () => {
		window.removeEventListener('storage', callback)
	}
}

const toggleDarkMode = () => {
	const isDarkMode = localStorage.getItem(DARK_MODE) === 'true'
	localStorage.setItem(DARK_MODE, isDarkMode ? 'false' : 'true')
	window.dispatchEvent(new Event('storage'))
}

export function useDarkModeManager() {
	const store = useSyncExternalStore(
		subscribeToLocalStorage,
		() => localStorage.getItem(DARK_MODE) ?? 'true',
		() => 'true'
	)

	const isDarkMode = store === 'true'

	useEffect(() => {
		if (!isDarkMode) {
			document.documentElement.classList.remove('dark')
			document.documentElement.classList.add('light')
		} else {
			document.documentElement.classList.remove('light')
			document.documentElement.classList.add('dark')
		}
	}, [isDarkMode])

	return [isDarkMode, toggleDarkMode] as [boolean, () => void]
}

const updateSetting = (key) => {
	const current = JSON.parse(localStorage.getItem(DEFILLAMA) ?? '{}')

	const urlParams = new URLSearchParams(window.location.search)

	const newState = !((urlParams.get(key) ? urlParams.get(key) === 'true' : null) ?? current[key] ?? false)

	const url = new URL(window.location.href)
	url.searchParams.set(key, newState.toString())
	window.history.pushState({}, '', url)

	localStorage.setItem(DEFILLAMA, JSON.stringify({ ...current, [key]: newState }))

	window.dispatchEvent(new Event('storage'))
}

export const updateAllSettingsInLsAndUrl = (keys: Record<string, boolean>) => {
	const current = JSON.parse(localStorage.getItem(DEFILLAMA) ?? '{}')

	const url = new URL(window.location.href)

	for (const key in keys) {
		if (keys[key]) {
			url.searchParams.set(key, 'true')
		} else {
			url.searchParams.delete(key)
		}
	}

	window.history.pushState({}, '', url)

	localStorage.setItem(DEFILLAMA, JSON.stringify({ ...current, ...keys }))

	window.dispatchEvent(new Event('storage'))
}

const T_SETTINGS = [
	'tvl',
	'fees',
	'tvl_fees',
	'tvl_chains',
	'stablecoins',
	'nfts',
	'liquidations',
	'bridges'
	//  'dimension_chart_interval',
] as const

export type T_SETTINGS = (typeof T_SETTINGS)[number]

const settingsLookup = {
	tvl: DEFI_SETTINGS,
	fees: FEES_SETTINGS,
	tvl_fees: [...DEFI_SETTINGS, ...FEES_SETTINGS],
	tvl_chains: DEFI_CHAINS_SETTINGS2,
	stablecoins: STABLECOINS_SETTINGS,
	nfts: NFT_SETTINGS,
	liquidations: LIQS_SETTINGS,
	bridges: BRIDGES_SETTINGS
	// 'dimension_chart_interval':
} as const satisfies Record<
	T_SETTINGS,
	| unknown
	| typeof STABLECOINS_SETTINGS
	| typeof DEFI_SETTINGS
	| typeof FEES_SETTINGS
	| typeof NFT_SETTINGS
	| typeof LIQS_SETTINGS
	| typeof BRIDGES_SETTINGS
	| (typeof DEFI_SETTINGS | typeof FEES_SETTINGS)[]
>

export function useLocalStorageSettingsManager(type: T_SETTINGS): [Record<string, boolean>, (key) => void] {
	const store = useSyncExternalStore(
		subscribeToLocalStorage,
		() => localStorage.getItem(DEFILLAMA) ?? '{}',
		() => '{}'
	)

	const isClient = useIsClient()

	return useMemo(() => {
		const urlParams = isClient ? new URLSearchParams(window.location.search) : null

		const ps = JSON.parse(store)
		return [
			Object.fromEntries(
				settingsLookup[type].map((s) => [
					s,
					(urlParams && urlParams.get(s) ? urlParams.get(s) === 'true' : null) ?? ps[s] ?? false
				])
			),
			updateSetting
		]
	}, [store, type, isClient])
}

export const updateAllSettings = (keys: Record<string, boolean>) => {
	const current = JSON.parse(localStorage.getItem(DEFILLAMA) ?? '{}')
	localStorage.setItem(DEFILLAMA, JSON.stringify({ ...current, ...keys }))
	window.dispatchEvent(new Event('storage'))
}

export function useManageAppSettings(): [Record<string, boolean>, (keys: Record<string, boolean>) => void] {
	const store = useSyncExternalStore(
		subscribeToLocalStorage,
		() => localStorage.getItem(DEFILLAMA) ?? '{}',
		() => '{}'
	)
	const toggledSettings = useMemo(() => JSON.parse(store), [store])

	return [toggledSettings, updateAllSettings]
}

// YIELDS SAVED FILTERS HOOK
export function useYieldFilters() {
	const store = useSyncExternalStore(
		subscribeToLocalStorage,
		() => localStorage.getItem(DEFILLAMA) ?? '{}',
		() => '{}'
	)

	const savedFilters = useMemo(() => JSON.parse(store)?.[YIELDS_SAVED_FILTERS] ?? {}, [store])

	return {
		savedFilters,
		saveFilter: (name: string, filters: Record<string, string | number | boolean>) => {
			localStorage.setItem(
				DEFILLAMA,
				JSON.stringify({ ...JSON.parse(store), [YIELDS_SAVED_FILTERS]: { ...savedFilters, [name]: filters } })
			)
			window.dispatchEvent(new Event('storage'))
		},
		deleteFilter: (name: string) => {
			const newFilters = { ...savedFilters }
			delete newFilters[name]
			localStorage.setItem(DEFILLAMA, JSON.stringify({ ...JSON.parse(store), [YIELDS_SAVED_FILTERS]: newFilters }))
			window.dispatchEvent(new Event('storage'))
		}
	}
}

export function useWatchlistManager(type: 'defi' | 'yields') {
	const store = useSyncExternalStore(
		subscribeToLocalStorage,
		() => localStorage.getItem(DEFILLAMA) ?? '{}',
		() => '{}'
	)

	return useMemo(() => {
		const watchlistKey = type === 'defi' ? DEFI_WATCHLIST : YIELDS_WATCHLIST
		const selectedPortfolioKey = type === 'defi' ? DEFI_SELECTED_PORTFOLIO : YIELDS_SELECTED_PORTFOLIO
		const watchlist = JSON.parse(store)?.[watchlistKey] ?? { [DEFAULT_PORTFOLIO_NAME]: {} }

		const portfolios = Object.keys(watchlist)

		const selectedPortfolio = JSON.parse(store)?.[selectedPortfolioKey] ?? DEFAULT_PORTFOLIO_NAME

		return {
			portfolios,
			selectedPortfolio,
			savedProtocols: new Set(Object.values(watchlist[selectedPortfolio] ?? {})) as Set<string>,
			addPortfolio: (name: string) => {
				const watchlist = JSON.parse(store)?.[watchlistKey] ?? { [DEFAULT_PORTFOLIO_NAME]: {} }
				const newWatchlist = { ...watchlist, [name]: {} }
				localStorage.setItem(
					DEFILLAMA,
					JSON.stringify({ ...JSON.parse(store), [watchlistKey]: newWatchlist, [selectedPortfolioKey]: name })
				)
				window.dispatchEvent(new Event('storage'))
			},
			removePortfolio: (name: string) => {
				const watchlist = JSON.parse(store)?.[watchlistKey] ?? { [DEFAULT_PORTFOLIO_NAME]: {} }
				const newWatchlist = { ...watchlist }
				delete newWatchlist[name]
				localStorage.setItem(
					DEFILLAMA,
					JSON.stringify({
						...JSON.parse(store),
						[watchlistKey]: newWatchlist,
						[selectedPortfolioKey]: DEFAULT_PORTFOLIO_NAME
					})
				)
				window.dispatchEvent(new Event('storage'))
			},
			setSelectedPortfolio: (name: string) => {
				localStorage.setItem(DEFILLAMA, JSON.stringify({ ...JSON.parse(store), [selectedPortfolioKey]: name }))
				window.dispatchEvent(new Event('storage'))
			},
			addProtocol: (name: string) => {
				const watchlist = JSON.parse(store)?.[watchlistKey] ?? { [DEFAULT_PORTFOLIO_NAME]: {} }
				const newWatchlist = {
					...watchlist,
					[selectedPortfolio]: { ...watchlist[selectedPortfolio], [slug(name)]: name }
				}
				localStorage.setItem(DEFILLAMA, JSON.stringify({ ...JSON.parse(store), [watchlistKey]: newWatchlist }))
				window.dispatchEvent(new Event('storage'))
			},
			removeProtocol: (name: string) => {
				const watchlist = JSON.parse(store)?.[watchlistKey] ?? { [DEFAULT_PORTFOLIO_NAME]: {} }
				const newWatchlist = { ...watchlist, [selectedPortfolio]: { ...watchlist[selectedPortfolio] } }
				delete newWatchlist[selectedPortfolio][slug(name)]
				localStorage.setItem(DEFILLAMA, JSON.stringify({ ...JSON.parse(store), [watchlistKey]: newWatchlist }))
				window.dispatchEvent(new Event('storage'))
			}
		}
	}, [store, type])
}

export function useCustomColumns() {
	const store = useSyncExternalStore(
		subscribeToLocalStorage,
		() => localStorage.getItem(DEFILLAMA) ?? '{}',
		() => '{}'
	)

	const customColumns = useMemo(() => JSON.parse(store)?.[CUSTOM_COLUMNS] ?? [], [store])

	function setCustomColumns(cols) {
		localStorage.setItem(DEFILLAMA, JSON.stringify({ ...JSON.parse(store), [CUSTOM_COLUMNS]: cols }))
		window.dispatchEvent(new Event('storage'))
	}

	function addCustomColumn(col) {
		setCustomColumns([...customColumns, col])
		window.dispatchEvent(new Event('storage'))
	}

	function editCustomColumn(index, col) {
		setCustomColumns(customColumns.map((c, i) => (i === index ? col : c)))
		window.dispatchEvent(new Event('storage'))
	}

	function deleteCustomColumn(index) {
		setCustomColumns(customColumns.filter((_, i) => i !== index))
		window.dispatchEvent(new Event('storage'))
	}

	return {
		customColumns,
		setCustomColumns,
		addCustomColumn,
		editCustomColumn,
		deleteCustomColumn
	}
}
