<script>
/* eslint-disable */
export default {
	name: 'TableHeader',
	functional: true,
	methods: {},
	render(h, { props, slots }) {
		const { buttons } = props.buttonConfig
		return (
			<div class="table-head">
				<div class="table-head-btns">
					{Array.isArray(buttons) &&
						buttons.map(btn => {
							return btn.slot ? (
								slots()[btn.slot]
							) : btn.dropdown ? (
								<el-dropdown v-hasPermi={btn.hasPermi ? btn.hasPermi : null} attrs={{ ...btn }} type={btn.dropdownType} size={btn.dropdownSize ? btn.dropdownSize : 'small'} disabled={btn.disabled ? btn.disabled() : false} onVisibleChange={visible => btn.onVisibleChange && btn.onVisibleChange(visible)} onClick={e => btn.onClick && btn.onClick(btn, e)} onCommand={value => btn.onCommand && btn.onCommand(value)} class="table-header__btn-item--space" key={btn.name}>
									{btn.splitButton ? (
										btn.name
									) : (
										<el-button type={btn.type} size={btn.size ? btn.size : 'small'} plain={btn.plain ? btn.plain : false} disabled={btn.disabled ? typeof btn.disabled ==='function'? btn.disabled():btn.disabled : false} loading={btn.loading ? btn.loading(btn) : false}>
											{btn.name}
											<i class="el-icon-arrow-down el-icon--right"></i>
										</el-button>
									)}
									<el-dropdown-menu slot="dropdown">
										{Array.isArray(btn.dropdownItemList) &&
											btn.dropdownItemList.map(item => {
												return (
														<el-dropdown-item command={item.value} key={item.value} >
															{item.label}
														</el-dropdown-item>
													)
											})}
									</el-dropdown-menu>
								</el-dropdown>
							) : (
								<el-button icon={btn.icon ? btn.icon : ''} attrs={{ ...btn }} v-hasPermi={btn.hasPermi ? btn.hasPermi : null} size={btn.size ? btn.size : 'small'} disabled={btn.disabled ? typeof btn.disabled ==='function'? btn.disabled():btn.disabled : false} onClick={e => btn.onClick && btn.onClick(btn, e)} key={btn.name} class="table-header__btn-item--space">
									{btn.name}
								</el-button>
							)
						})}
				</div>
			</div>
		)
	}
}
</script>

<style lang="scss" scoped>
@import './index';
</style>
