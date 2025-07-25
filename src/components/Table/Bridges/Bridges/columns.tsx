import { ColumnDef } from '@tanstack/react-table'
import { IconsRow } from '~/components/IconsRow'
import { BasicLink } from '~/components/Link'
import {
	formattedNum,
	formattedPercent,
	chainIconUrl,
	toNiceDayAndHour,
	getBlockExplorer,
	slug,
	tokenIconUrl
} from '~/utils'
import { TokenLogo } from '~/components/TokenLogo'
import { formatColumnOrder } from '../../utils'
import type { IBridge, IBridgeChain } from './types'
import { getBlockExplorerForTx, getBlockExplorerForAddress } from '~/containers/Bridges/utils'
import { Icon } from '~/components/Icon'

export const bridgesColumn: ColumnDef<IBridge>[] = [
	{
		header: 'Name',
		accessorKey: 'displayName',
		enableSorting: false,
		cell: ({ getValue, row, table }) => {
			const value = getValue() as string
			const linkValue = slug(value)
			const index = row.depth === 0 ? table.getSortedRowModel().rows.findIndex((x) => x.id === row.id) : row.index
			const rowValues = row.original
			const icon = rowValues.icon
			let iconLink
			if (icon) {
				const [iconType, iconName] = rowValues.icon.split(':')
				iconLink = iconType === 'chain' ? chainIconUrl(iconName) : tokenIconUrl(iconName)
			}

			return (
				<span className="flex items-center gap-2">
					<span className="shrink-0">{index + 1}</span>
					{icon && <TokenLogo logo={iconLink} data-lgonly />}
					<BasicLink
						href={`/bridge/${linkValue}`}
						className="text-sm font-medium text-(--link-text) overflow-hidden text-ellipsis whitespace-nowrap"
					>
						{value}
					</BasicLink>
				</span>
			)
		},
		size: 240
	},
	{
		header: 'Chains',
		accessorKey: 'chains',
		enableSorting: false,
		cell: ({ getValue }) => <IconsRow links={getValue() as Array<string>} url="/bridges" iconType="chain" />,
		size: 200,
		meta: {
			align: 'end',
			headerHelperText: 'Chains are ordered by bridge volume on each chain'
		}
	},
	{
		header: '1d Change',
		accessorKey: 'change_1d',
		cell: (info) => <>{formattedPercent(info.getValue())}</>,
		size: 100,
		meta: {
			align: 'end'
		}
	},
	{
		header: '24h Volume',
		accessorKey: 'lastDailyVolume',
		cell: (info) => <>${formattedNum(info.getValue())}</>,
		size: 120,
		meta: {
			align: 'end'
		}
	},
	{
		header: '7d Volume',
		accessorKey: 'weeklyVolume',
		cell: (info) => <>${formattedNum(info.getValue())}</>,
		size: 120,
		meta: {
			align: 'end'
		}
	},
	{
		header: '1m Volume',
		accessorKey: 'monthlyVolume',
		cell: (info) => <>${formattedNum(info.getValue())}</>,
		size: 120,
		meta: {
			align: 'end'
		}
	},
	{
		header: '24h # of Txs',
		accessorKey: 'txsPrevDay',
		size: 120,
		meta: {
			align: 'end'
		}
	}
]

export const bridgeChainsColumn: ColumnDef<IBridgeChain>[] = [
	{
		header: 'Name',
		accessorKey: 'name',
		enableSorting: false,
		cell: ({ getValue, row, table }) => {
			const value = getValue() as string
			const index = row.depth === 0 ? table.getSortedRowModel().rows.findIndex((x) => x.id === row.id) : row.index
			return (
				<span className="flex items-center gap-2">
					<span className="shrink-0">{index + 1}</span>
					<TokenLogo logo={chainIconUrl(value)} data-lgonly />
					<BasicLink
						href={`/bridges/${value}`}
						className="text-sm font-medium text-(--link-text) overflow-hidden text-ellipsis whitespace-nowrap"
					>
						{value}
					</BasicLink>
				</span>
			)
		},
		size: 240
	},
	{
		header: '24h Net Flow',
		accessorKey: 'prevDayNetFlow',
		cell: (info) => {
			const value = info.getValue() as any
			if (value) {
				return (
					<span
						className="text-(--color)"
						style={{ '--color': (value as number) > 0 ? '#3fb950' : '#f85149' } as any}
					>
						${formattedNum(info.getValue())}
					</span>
				)
			}
			return <>$0</>
		},
		size: 120,
		meta: {
			align: 'end'
		}
	},
	{
		header: '24h Deposits',
		accessorKey: 'prevDayUsdDeposits',
		cell: (info) => <>${formattedNum(info.getValue())}</>,
		size: 120,
		meta: {
			align: 'end'
		}
	},
	{
		header: '24h Withdrawals',
		accessorKey: 'prevDayUsdWithdrawals',
		cell: (info) => <>${formattedNum(info.getValue())}</>,
		size: 120,
		meta: {
			align: 'end'
		}
	},
	{
		header: '7d Net Flow',
		accessorKey: 'prevWeekNetFlow',
		cell: (info) => {
			const value = info.getValue() as any
			if (value) {
				return (
					<span
						className="text-(--color)"
						style={{ '--color': (value as number) > 0 ? '#3fb950' : '#f85149' } as any}
					>
						${formattedNum(info.getValue())}
					</span>
				)
			}
			return <>$0</>
		},
		size: 120,
		meta: {
			align: 'end'
		}
	},
	{
		header: '7d Deposits',
		accessorKey: 'prevWeekUsdWithdrawals',
		cell: (info) => <>${formattedNum(info.getValue())}</>,
		size: 120,
		meta: {
			align: 'end'
		}
	},
	{
		header: '7d Withdrawals',
		accessorKey: 'prevWeekUsdDeposits',
		cell: (info) => <>${formattedNum(info.getValue())}</>,
		size: 120,
		meta: {
			align: 'end'
		}
	},
	{
		header: '24h Top Deposit',
		accessorKey: 'topTokenWithdrawnSymbol',
		cell: ({ getValue }) => {
			const value = getValue() as string
			if (value) {
				return <>{value}</>
			} else return <>Not found</>
		},
		meta: {
			align: 'end'
		},
		size: 145
	}
]

export const largeTxsColumn: ColumnDef<IBridge>[] = [
	{
		header: 'Timestamp',
		accessorKey: 'date',
		cell: (info) => <>{toNiceDayAndHour(info.getValue())}</>,
		size: 120
	},
	{
		header: 'Bridge',
		accessorKey: 'bridge',
		cell: ({ getValue }) => {
			const value = getValue() as string
			const linkValue = slug(value)
			return (
				<BasicLink
					href={`/bridge/${linkValue}`}
					className="text-sm font-medium text-(--link-text) overflow-hidden text-ellipsis whitespace-nowrap"
				>
					{value}
				</BasicLink>
			)
		},
		size: 180
	},
	{
		header: 'Deposit/Withdrawal',
		accessorKey: 'isDeposit',
		cell: ({ getValue }) => {
			const value = getValue() as boolean
			return (
				<span className="text-(--color)" style={{ '--color': value ? '#f85149' : '#3fb950' } as any}>
					{value ? 'Withdrawal' : 'Deposit'}
				</span>
			)
		},
		size: 120,
		meta: {
			align: 'end'
		}
	},
	{
		header: 'Token',
		accessorKey: 'symbol',
		cell: ({ getValue }) => {
			const value = getValue() as string
			const splitValue = value.split('#')
			const [symbol, token] = splitValue
			const { blockExplorerLink } = getBlockExplorer(token)
			if (value) {
				return (
					<a
						href={blockExplorerLink}
						target="_blank"
						rel="noopener noreferrer"
						className="flex items-center justify-end"
					>
						<span>{symbol}</span>
						<Icon name="external-link" height={10} width={10} />
					</a>
				)
			} else return <>Not found</>
		},
		size: 100,
		meta: {
			align: 'end'
		}
	},
	{
		header: 'Value',
		accessorKey: 'usdValue',
		cell: (info) => <>${formattedNum(info.getValue())}</>,
		size: 120,
		meta: {
			align: 'end'
		}
	},
	{
		header: 'Explorer Link',
		accessorKey: 'txHash',
		cell: ({ getValue }) => {
			const value = getValue() as string
			const { blockExplorerLink } = getBlockExplorerForTx(value)
			if (value) {
				return (
					<a
						href={blockExplorerLink}
						target="_blank"
						rel="noopener noreferrer"
						className="flex items-center justify-end gap-2"
					>
						<span>View Transaction</span>
						<Icon name="external-link" height={10} width={10} />
					</a>
				)
			} else return <>Not found</>
		},
		meta: {
			align: 'end'
		},
		size: 100
	}
]

export const bridgeTokensColumn: ColumnDef<IBridge>[] = [
	{
		header: 'Token',
		accessorKey: 'symbol',
		cell: ({ getValue }) => {
			const value = getValue() as string
			const splitValue = value.split('#')
			const [symbol, token] = splitValue
			const { blockExplorerLink } = getBlockExplorer(token)

			if (value) {
				return (
					<a href={blockExplorerLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
						<span className="overflow-hidden text-ellipsis whitespace-nowrap">{symbol}</span>
						<Icon name="external-link" height={10} width={10} />
					</a>
				)
			} else return <>Not found</>
		},
		size: 120
	},
	{
		header: 'Chain',
		id: 'chainName',
		cell: ({ row }) => {
			const value = row.original.symbol
			const splitValue = value.split('#')
			const [symbol, token] = splitValue
			const { chainName } = getBlockExplorer(token)
			return chainName
		},
		size: 120,
		meta: {
			align: 'end'
		}
	},
	{
		header: 'Deposited',
		accessorKey: 'deposited',
		cell: (info) => <>${formattedNum(info.getValue() ?? 0)}</>,
		size: 120,
		meta: {
			align: 'end'
		}
	},
	{
		header: 'Withdrawn',
		accessorKey: 'withdrawn',
		cell: (info) => <>${formattedNum(info.getValue() ?? 0)}</>,
		size: 120,
		meta: {
			align: 'end'
		}
	},
	{
		header: 'Total Volume',
		accessorKey: 'volume',
		cell: (info) => <>${formattedNum(info.getValue())}</>,
		size: 120,
		meta: {
			align: 'end'
		}
	}
]

export const bridgeAddressesColumn: ColumnDef<IBridge>[] = [
	{
		header: 'Address',
		accessorKey: 'address',
		cell: ({ getValue }) => {
			const value = getValue() as string
			const formattedValue = value.split(':')[1]
			const { blockExplorerLink } = getBlockExplorerForAddress(value)
			if (value) {
				return (
					<a href={blockExplorerLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
						<span className="overflow-hidden text-ellipsis whitespace-nowrap">
							{formattedValue.slice(0, 5) + '...' + formattedValue.slice(-4)}
						</span>
						<Icon name="external-link" height={10} width={10} />
					</a>
				)
			} else return <>Not found</>
		},
		size: 120
	},
	{
		header: 'Chain',
		id: 'chainName',
		cell: ({ row }) => {
			const value = row.original.address
			const { chainName } = getBlockExplorerForAddress(value)
			return chainName
		},
		size: 120,
		meta: {
			align: 'end'
		}
	},
	{
		header: 'Deposited',
		accessorKey: 'deposited',
		cell: (info) => <>${formattedNum(info.getValue() ?? 0)}</>,
		size: 120,
		meta: {
			align: 'end'
		}
	},
	{
		header: 'Withdrawn',
		accessorKey: 'withdrawn',
		cell: (info) => <>${formattedNum(info.getValue() ?? 0)}</>,
		size: 120,
		meta: {
			align: 'end'
		}
	},
	{
		header: 'Total Transactions',
		accessorKey: 'txs',
		size: 120,
		meta: {
			align: 'end'
		}
	}
]

// key: min width of window/screen
// values: table columns order
export const bridgesColumnOrders = formatColumnOrder({
	0: ['displayName', 'lastDailyVolume', 'change_1d', 'weeklyVolume', 'monthlyVolume', 'chains', 'txsPrevDay'],
	1024: ['displayName', 'chains', 'change_1d', 'lastDailyVolume', 'weeklyVolume', 'monthlyVolume', 'txsPrevDay']
})

export const bridgeChainsColumnOrders = formatColumnOrder({
	0: [
		'name',
		'prevDayUsdWithdrawals',
		'prevDayUsdDeposits',
		'prevDayNetFlow',
		'prevWeekUsdWithdrawals',
		'prevWeekUsdDeposits',
		'prevWeekNetFlow',
		'topTokenWithdrawnSymbol'
	],
	1024: [
		'name',
		'topTokenWithdrawnSymbol',
		'prevDayUsdWithdrawals',
		'prevDayUsdDeposits',
		'prevDayNetFlow',
		'prevWeekUsdWithdrawals',
		'prevWeekUsdDeposits',
		'prevWeekNetFlow'
	]
})

export const largeTxsColumnOrders = formatColumnOrder({
	0: ['date', 'symbol', 'usdValue', 'isDeposit', 'bridge', 'txHash'],
	1024: ['date', 'bridge', 'isDeposit', 'symbol', 'usdValue', 'txHash']
})

export const bridgeTokensColumnOrders = formatColumnOrder({
	0: ['symbol', 'withdrawn', 'deposited', 'volume'],
	1024: ['symbol', 'withdrawn', 'deposited', 'volume']
})

export const bridgeAddressesColumnOrders = formatColumnOrder({
	0: ['address', 'withdrawn', 'deposited', 'txs'],
	1024: ['address', 'withdrawn', 'deposited', 'txs']
})

export const bridgesColumnSizes = {
	0: {
		displayName: 140,
		chains: 180,
		change_1d: 100,
		lastDailyVolume: 120,
		weeklyVolume: 120,
		monthlyVolume: 120,
		txsPrevDay: 120
	},
	480: {
		displayName: 180,
		chains: 180,
		change_1d: 100,
		lastDailyVolume: 120,
		weeklyVolume: 120,
		monthlyVolume: 120,
		txsPrevDay: 120
	},
	1024: {
		displayName: 240,
		chains: 200,
		change_1d: 100,
		lastDailyVolume: 120,
		weeklyVolume: 120,
		monthlyVolume: 120,
		txsPrevDay: 120
	}
}

export const bridgeChainsColumnSizes = {
	0: {
		name: 160,
		prevDayNetFlow: 120,
		prevDayUsdWithdrawals: 130,
		prevDayUsdDeposits: 130,
		prevWeekNetFlow: 120,
		prevWeekUsdWithdrawals: 130,
		prevWeekUsdDeposits: 130,
		topTokenWithdrawnSymbol: 145
	},
	480: {
		name: 180,
		prevDayNetFlow: 140,
		prevDayUsdWithdrawals: 150,
		prevDayUsdDeposits: 150,
		prevWeekNetFlow: 140,
		prevWeekUsdWithdrawals: 150,
		prevWeekUsdDeposits: 150,
		topTokenWithdrawnSymbol: 145
	},
	1024: {
		name: 180,
		prevDayNetFlow: 140,
		prevDayUsdWithdrawals: 150,
		prevDayUsdDeposits: 150,
		prevWeekNetFlow: 140,
		prevWeekUsdWithdrawals: 150,
		prevWeekUsdDeposits: 150,
		topTokenWithdrawnSymbol: 145
	}
}

export const largeTxsColumnSizes = {
	0: {
		date: 120,
		bridge: 140,
		usdValue: 120,
		isDeposit: 140,
		symbol: 100,
		txHash: 160
	},
	480: {
		date: 120,
		bridge: 140,
		usdValue: 120,
		isDeposit: 140,
		symbol: 120,
		txHash: 160
	},
	1024: {
		date: 140,
		bridge: 160,
		usdValue: 120,
		isDeposit: 140,
		symbol: 120,
		txHash: 160
	}
}
