interface IProps {
	selectedValue: string
	setValue: (period: string) => void
	values: Array<string>
	style?: Record<string, string>
}

export const TagGroup = ({ selectedValue, setValue, values, style }: IProps) => {
	return (
		<div
			className="text-xs font-medium flex items-center rounded-md overflow-x-auto flex-nowrap w-fit border border-(--form-control-border) text-[#666] dark:text-[#919296]"
			style={style}
		>
			{values.map((value) => {
				return (
					<button
						className="shrink-0 py-2 px-3 whitespace-nowrap hover:bg-(--link-hover-bg) focus-visible:bg-(--link-hover-bg) data-[active=true]:bg-(--old-blue) data-[active=true]:text-white"
						data-active={value === selectedValue}
						key={value}
						onClick={() => setValue(value)}
					>
						{`${value.slice(0, 1).toUpperCase()}${value.slice(1)}`}
					</button>
				)
			})}
		</div>
	)
}
