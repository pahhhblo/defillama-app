import { DEFI_SETTINGS_LOOKUP, FEES_SETTINGS_LOOKUP } from '~/contexts/LocalStorage'

export const tvlOptions = [
	{
		name: 'Staking',
		key: DEFI_SETTINGS_LOOKUP.STAKING,
		help: 'Include governance tokens staked in the protocol'
	},
	{
		name: 'Pool2',
		key: DEFI_SETTINGS_LOOKUP.POOL2,
		help: 'Include staked lp tokens where one of the coins in the pair is the governance token'
	},
	{
		name: 'Gov Tokens',
		key: DEFI_SETTINGS_LOOKUP.GOV_TOKENS,
		help: 'Include governance tokens'
	},
	{
		name: 'Borrows',
		key: DEFI_SETTINGS_LOOKUP.BORROWED,
		help: 'Include borrowed coins in lending protocols'
	},
	{
		name: 'Double Count',
		key: DEFI_SETTINGS_LOOKUP.DOUBLE_COUNT,
		help: 'Include TVL of protocols which TVL feeds into another protocol'
	},
	{
		name: 'Liquid Staking',
		key: DEFI_SETTINGS_LOOKUP.LIQUID_STAKING,
		help: 'Include Rewards/Liquidity for staked assets'
	},
	{
		name: 'Vesting',
		key: DEFI_SETTINGS_LOOKUP.VESTING,
		help: 'Include tokens that are not circulating or not issued yet'
	}
]

export const feesOptions = [
	{ name: 'Bribes', key: FEES_SETTINGS_LOOKUP.BRIBES, help: null },
	{ name: 'Token Tax', key: FEES_SETTINGS_LOOKUP.TOKENTAX, help: null }
]

export const extraTvlOptionsHelperTexts = Object.fromEntries(tvlOptions.map((p) => [p.key, p.help]))
