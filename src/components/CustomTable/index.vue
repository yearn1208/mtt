<script>
export default {
    name:'CustomTable',
    props: {
        loading: {
            type: Boolean,
            default: false
        },
        // 表头
        columns: {
            type: Array,
            default: () => []
        },
        // 表数据
        tableData: {
            type: Array,
            default: () => []
        },
        // 操作
        operates: {
            type: Object,
            default: () => {}
        },
        operatesWidth: {
            type: String,
            default: ''
        },
        // 表配置
        tableConfig: {
            type: Object,
            default: () => ({})
        },
        // 表事件
        tableEvent: {
            type: Object,
            default: () => ({})
        },
        // 行样式
        rowStyle: {
            type: Object,
            default: () => ({})
        },
        // 页码
        currentPage: {
            type: Number,
            default: 1
        },
        // 页容量
        pageSize: {
            type: Number,
            default: 20
        },
        // 页码配置
        pageSizes: {
            type: Array,
            default() {
                return [10, 20, 50, 100]
            }
        },
        // 分页布局
        layout: {
            type: String,
            default: 'total, sizes, prev, pager, next, jumper'
        },
        // 总条数
        total: {
            type: [Number, String],
            default: 0
        },
        showSelection: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        pageIndex: {
            get() {
                return Number(this.currentPage)
            },
            set(page) {
                this.$emit('update:currentPage', page)
            }
        },
        limit: {
            get() {
                return Number(this.pageSize)
            },
            set(size) {
                this.$emit('update:pageSize', size)
            }
        }
    },
    methods: {
        // 遍历筛选column
        createColumsFragment(columns) {
            return columns.map(col => {
                return col.type ? (
                    <el-table-column attrs={{ ...col }} key={col.type} show-overflow-tooltip={col?.showOverflowTooltip || true}></el-table-column>
                ) : (
                    <el-table-column
                        class={col.slot && col.className}
                        attrs={{ ...col }}
                        key={col.prop}
                        show-overflow-tooltip={col?.showOverflowTooltip || true}
                        scopedSlots={{
                            default: scope => {
                                if (col.render) {
                                    return col.render(scope.row, col.prop, scope.$index)
                                } else if (col.slot) {
                                    return this.$scopedSlots[col.slot]({
                                        row: scope.row,
                                        prop: col.prop,
                                        index: scope.$index
                                    })
                                } else {
                                    return col.format
                                        ? col.format(scope.row[col.prop])
                                        : scope.row[col.prop] !== null && scope.row[col.prop] !== 'null' && scope.row[col.prop] !== undefined && scope.row[col.prop] !== ''
                                            ? scope.row[col.prop]
                                            : '--'
                                }
                            },
                            header: scope => {
                                return this.renderTableHeader(scope.row, col, scope.$index)
                            }
                        }}
                    >
                        {col.children && col.children.length ? this.createColumsFragment(col.children) : ''}
                    </el-table-column>
                )
            })
        },

        // 表格操作列筛选，超过三个用‘更多’下拉代替
        createOperates(scope, operates) {
            const [generalOperates, specialOperates] = [[], []]
            operates.forEach((option, index) => (index > 2 ? specialOperates.push(option) : generalOperates.push(option)))
            if (specialOperates.length) {
                generalOperates.push({
                    label: '更多',
                    children: specialOperates
                })
            }
            return generalOperates.map(btn => {
                return this.switchOperares(scope, btn)
            })
        },

        // 根据按钮文本为按钮添加对应的parentElement
        switchOperares(scope, operate) {
            const _flag = operate.show ? operate.show(scope.row) : true
            switch (operate.label) {
                // case '删除':
                //   return (
                //     <el-popconfirm
                //       title="这是一段内容确定删除吗？"
                //       onConfirm={() => {
                //         operate.method(scope.$index, scope.row)
                //       }}
                //     >
                //       <el-button
                //         slot="reference"
                //         key={operate.label}
                //         type={operate.type}
                //         size={operate.size ? operate.size : 'small'}
                //       >
                //         {operate.label}
                //       </el-button>
                //     </el-popconfirm>
                //   )
                case '更多':
                    return (
                        <el-dropdown class='table-wrap-dropdown'>
                            <span class='el-dropdown-link'>
                                {operate.label}
                                <i class='el-icon-caret-bottom el-icon--right'></i>
                            </span>
                            <el-dropdown-menu slot='dropdown'>
                                {operate.children.map(c => {
                                    return <el-dropdown-item>{this.switchOperares(scope, c)}</el-dropdown-item>
                                })}
                            </el-dropdown-menu>
                        </el-dropdown>
                    )
                default:
                    return _flag ? (
                        <el-button
                            class='table-wrap-btn'
                            key={operate.label}
                            type={operate.type}
                            size={operate.size ? operate.size : 'small'}
                            disabled={operate.disabled ? operate.disabled(scope.row) : false}
                            loading={operate.isLoading ? operate.isLoading(scope.row) : false}
                            nativeOnClick={e => {
                                e.preventDefault()
                                operate.method(scope.$index, scope.row, e)
                            }}
                        >
                            {operate.label}
                        </el-button>
                    ) : (
                        ''
                    )
            }
        },

        // 改变页码/页容量
        _dispatchEvent(name, value) {
            // console.log(this.currentPage)
            this.$emit(name, value)
        },
        // 获取操作列属性
        getOperatesAttrs(operates) {
            const _props = {}
            Object.keys(operates).forEach(k => {
                if (k !== 'data') {
                    Object.assign(_props, { [k]: operates[k] })
                }
            })
            return _props
        },
        clearSelection() {
            this.$refs.customTable.clearSelection()
        },
        toggleRowSelection(row, selected) {
            this.$refs.customTable.toggleRowSelection(row, selected)
        },
        toggleAllSelection() {
            this.$refs.customTable.toggleAllSelection()
        },
        toggleRowExpansion(row, expanded) {
            this.$refs.customTable.toggleRowExpansion(row, expanded)
        },
        setCurrentRow(row) {
            this.$refs.customTable.setCurrentRow(row)
        },
        clearSort() {
            this.$refs.customTable.clearSort()
        },
        clearFilter(columnKey) {
            this.$refs.customTable.clearFilter(columnKey)
        },
        doLayout() {
            this.$refs.customTable.doLayout()
        },
        sort(prop, order) {
            this.$refs.customTable.sort(prop, order)
        },
        renderTableHeader(row, column, index) {
            const { $createElement } = this
            //             if (column.slot) {
            //     return this.$scopedSlots[column.slot]({
            //         row: row,
            //         column: column,
            //         index
            //     })
            // }
            if (column.renderHeader && typeof column.renderHeader === 'function') {
                return column.renderHeader($createElement, column)
            } else {
                return (
                    <span>
                        {
                            column.required && <i style='color:#F56C6C' class='m-right-5'>*</i>
                        }
                        { column.label }
                    </span>
                )
            }
        }
    },
    render() {
        const {
            columns,
            rowStyle,
            tableData,
            createColumsFragment,
            total,
            currentPage,
            limit,
            layout,
            pageSizes,
            _dispatchEvent,
            loading
        } = this

        return (
            <div class='table-wrap'>
                <el-table
                    data={tableData}
                    row-style={rowStyle}
                    v-loading={ loading }
                    attrs={{
                        'max-height': 'calc(100% - 56px)',
                        'header-cell-style': { background: 'none' },
                        'cell-style': { padding: '10px 0' },
                        'tooltip-effect': 'light',
                        ...this.$attrs
                    }}
                    ref='customTable'
                    on={{ ...this.$listeners }}
                    class='custom-table'
                >
                    {/* column渲染 */}
                    { this.showSelection && <el-table-column show-overflow-tooltip type='selection' width='55' align='center' /> }
                    {createColumsFragment(columns)}
                    {/* <slot></slot> */}
                    {this.$slots.default}
                </el-table>
                {/* 分页 */}
                {total ? (
                    <div class='v-pager'>
                        <el-pagination
                            class='page'
                            current-page={currentPage}
                            page-size={limit}
                            on={{
                                'update:currentPage': page => {
                                    this.pageIndex = page
                                },
                                'update:pageSize': size => {
                                    this.limit = size
                                }
                            }}
                            layout={layout}
                            page-sizes={pageSizes}
                            total={Number(total)}
                            on-size-change={val => _dispatchEvent('size-change', val)}
                            on-current-change={val => _dispatchEvent('page-change', val)}
                        />
                    </div>
                ) : (
                    ''
                )}
            </div>
        )
    }
}
</script>

<style lang="scss" scoped>
@import './index';
</style>
<style lang="scss">
</style>
