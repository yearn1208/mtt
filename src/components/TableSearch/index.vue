<script>
import CustomForm from '../CustomForm'
import { cloneDeep } from 'lodash'
export default {
    name: 'TableSearchForm',
    components: {
        CustomForm
    },
    props: {
        formTarget: {
            type: Object,
            default: () => ({})
        },
        rules: {
            type: Object,
            default: () => ({})
        },
        value: {
            type: Object,
            default: () => ({})
        },
        labelWidth: {
            type: String,
            default: ''
        },
        labelPosition: {
            type: String,
            default: 'left'
        },
        // 表单项
        formConfig: {
            type: Object,
            default: () => ({})
        },
        itemConfig: {
            type: Object,
            default: () => ({})
        },
        showMoreBtn: {
            type: Boolean,
            default: false
        },
        itemWidth: {
            type: String,
            default: '220px'
        }
    },
    data() {
        return {
            isOpen: false,
            form: {}
        }
    },
    // watch: {
    //     formTarget: {
    //         deep: true,
    //         handler() {
    //                 this.initForm()
    //         }
    //     }
    // },
    created() {
        this.initForm()
    },
    methods: {
        // 初始化表单字段
        initForm() {
            const { formTarget, form } = this
            for (const key in formTarget) {
                if (Object.hasOwnProperty.call(formTarget, key)) {
                    const f = formTarget[key]
                    if (Array.isArray(f.model) && f.type === 'select' && f.isAll) {
                        const length = f.model.filter(item => item != -1).length
                        if (length === f.options.length && f.options.length) {
                            this.$set(form, f.field, cloneDeep([-1, ...f.model]))
                        } else {
                            this.$set(form, f.field, cloneDeep(f.model))
                        }
                    } else if (f.model || f.model === 0) {
                        this.$set(form, f.field, cloneDeep(f.model))
                    } else {
                        this.$set(form, f.field, '')
                    }
                }
            }
        },
        // 是否展开
        handleOpen() {
            this.isOpen = !this.isOpen
        },
        // 查询
        handleQuery() {
            const data = {}
            for (const key in this.formTarget) {
                if (Object.hasOwnProperty.call(this.formTarget, key)) {
                    const item = this.formTarget[key]
                    if (item.isAll && item.type === 'select') {
                        data[item.field] = this.form[item.field].filter(item => item != -1)
                    } else {
                        data[item.field] = this.form[item.field]
                    }
                }
            }
            this.$emit('query', data)
        },
        query() {
            this.handleQuery()
        },
        // 重置
        handleReset() {
            this.initForm()
            const data = {}
            for (const key in this.formTarget) {
                if (Object.hasOwnProperty.call(this.formTarget, key)) {
                    const item = this.formTarget[key]
                    if (item.isAll) {
                        data[item.field] = this.form[item.field].filter(item => item != -1)
                        this.$refs.customForm[item.field] = this.form[item.field]
                    } else {
                        data[item.field] = this.form[item.field]
                    }
                }
            }
            this.$emit('reset', data)
        },
        setValue(form) {
            Object.keys(this.form).forEach(key => {
                if (form[key] !== undefined) {
                    let item = {}
                    Object.keys(this.formTarget).forEach(k => {
                        if (this.formTarget[k].field === key) {
                            item = this.formTarget[k]
                        }
                    })
                    if (item.type === 'select' && item.isAll && item.options.length) {
                        this.form[key] = form[key].length === item.options.length ? [-1, ...form[key]] : form[key]
                    } else {
                        this.form[key] = form[key]
                    }
                }
            })
        }
    },

    render() {
        const { formTarget, form, isOpen, handleReset, handleQuery, handleOpen, labelWidth, labelPosition, formConfig, itemConfig, itemWidth } = this
        return (
            <div class='form-view-box'>
                {/** <div class="form-view-box" style={{ height: isOpen ? 'auto' : '52px',  transition: 'height 0.3s'  }}> */}
                <section class='form-view' ref='formGroup'>
                    <custom-form ref='customForm' class={['v-form']} v-model={form} showMore={isOpen} props={{ formConfig, itemConfig, labelPosition, formTarget, labelWidth, itemWidth }}>
                        <el-col >
                            <el-button type='primary' size='small' onClick={handleQuery}  icon="el-icon-search">
                                搜 索
                            </el-button>
                            <el-button size='small' onClick={handleReset}>
								重 置
                            </el-button>
                            <el-button size='small' onClick={handleOpen} v-show={this.showMoreBtn}>
								高级查询
                            </el-button>
                        </el-col>
                    </custom-form>
                </section>
            </div>
        )
    }
}
</script>

<style lang="scss" scoped>
@import './index';
</style>
