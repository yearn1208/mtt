<template>
    <el-button type="primary" :plain="plain" @click="exportExcel">{{ exportButtonName }}</el-button>
</template>
<script>
import { export_json_to_excel } from '@/vendor/Export2Excel.js'
export default {
    name: 'JsonToExcel',
    props: {
        plain: {
            type: Boolean,
            default: false
        },
        isExportTime: {
            type: Boolean,
            default: false
        },
        fileName: {
            type: String,
            default: 'excel.xls'
        },
        queryData: {
            type: Object,
            default: () => {}
        },
        headerMapping: {
            type: Map,
            default: new Map()
        },
        queryFunction: {
            type: Function,
            default: undefined
        },
        exportButtonName: {
            type: String,
            default: '导出'
        },
        exportData: {
            type: Array,
            default: () => ([])
        },
        before: {
            type: Function,
            default: () => {}
        }
    },
    data() {
        return {
            exportDataHeader: [],
            filterDataHeader: [],
            dbData: []
        }
    },
    methods: {
        // excel导出
        exportExcel() {
            if (this.queryFunction) {
                this.queryFunction(this.queryData).then(res => {
                    if (res.data.data && res.data.data.records) {
                        this.dbData = res.data.data.records
                    } else if (res.data.data) {
                        this.dbData = res.data.data
                    } else if (res.data) {
                        this.dbData = res.data
                    }
                    this.exportHandler()
                })
            } else {
                this.dbData = this.exportData
                this.exportHandler()
            }
        },
        // 导出处理
        exportHandler() {
            this.before()
            this.headerInit()
            const data = this.formatter()
            let fileName = this.fileName
            if (this.isExportTime) {
                fileName = fileName + '_' + this.$moment().format('YYYYMMDDHHmmss')
            }
            export_json_to_excel(this.exportDataHeader, data, fileName)
        },
        // 格式化过滤不显示的列
        formatter() {
            return this.dbData.map(v => this.filterDataHeader.map(j => v[j]))
        },
        // 初始化excel表头数据
        headerInit() {
            this.exportDataHeader = []
            this.filterDataHeader = []
            if (this.dbData.length) {
                const keys = Object.keys(this.dbData[0])
                for (let key = 0; key < keys.length; key++) {
                    const header = this.headerMapping.get(keys[key])
                    if (header) {
                        this.exportDataHeader.push(header)
                        this.filterDataHeader.push(keys[key])
                    }
                }
            } else {
                for (const [key, value] of this.headerMapping) {
                    this.exportDataHeader.push(value)
                }
            }
        }
    }
}
</script>
