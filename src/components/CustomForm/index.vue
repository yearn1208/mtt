<script>
import VirSelect from '@/components/virtuali-select'
export default {
    name: 'TableForm',
    components: {
        VirSelect
    },
    props: {
        // 表单需要渲染的数据
        formTarget: {
            type: Object,
            default() {
                return {}
            }
        },
        // v-model传入的值
        value: {
            type: Object,
            default: () => ({})
        },
        // 校验规则
        rules: {
            type: Object,
            default: () => ({})
        },
        // form校验的数据
        model: {
            type: Object,
            default: () => ({})
        },
        // 额外传入的表单配置
        formConfig: {
            type: Object,
            default: () => ({})
        },
        labelWidth: {
            type: String,
            default: ''
        },
        labelPosition: {
            type: String,
            default: 'right'
        },
        itemConfig: {
            type: Object,
            default: () => ({})
        },
        // 每行显示几个item
        itemRow: {
            type: Number,
            default: 1
        },
        itemWidth: {
            type: String,
            default: '220px'
        },
        validateOnRuleChange: {
            type: Boolean,
            default: true
        },
        // 是否开启行内模式
        inline: {
            type: Boolean,
            default: true
        },
        // 是否有展示更多按钮
        showMore: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            form: {},
            renderHtml: null
        }
    },
    watch: {
        value: {
            deep: true,
            handler() {
                this.form = this.value

                for (const key in this.value) {
                    if (Object.hasOwnProperty.call(this.value, key)) {
                        this[key] = this.value[key]
                    }
                }
            }
        },
        form: {
            deep: true,
            handler() {
                const data = {}
                for (const key in this.formTarget) {
                    if (Object.hasOwnProperty.call(this.formTarget, key)) {
                        const item = this.formTarget[key]
                        if (item.isAll) {
                            data[item.field] = this.form[item.field].filter(item => item != -1)
                        } else {
                            data[item.field] = this.form[item.field]
                        }
                    }
                }
                this.$emit('change', data)
            }
        }
    },
    created() {
        this.initForm()
        this.$nextTick(() => {
            Object.keys(this.formTarget).forEach(key => {
                const item = this.formTarget[key]
                if (typeof item.options === 'function') {
                    item.options(item)
                }
            })
        })
    },
    methods: {
        // 初始化表单字段
        initForm() {
            const { formTarget, value } = this
            this.form = value
            for (const key in this.form) {
                if (Object.hasOwnProperty.call(this.form, key)) {
                    this[key] = value[key]
                }
            }
            Object.keys(formTarget).forEach(key => {
                const f = formTarget[key]
                if (value[f.field] !== undefined) return
                if (f.model !== undefined) {
                    this.$set(this.form, f.field, f.model)
                } else {
                    if (f.type === 'select') return
                    this.$set(this.form, f.field, '')
                }
            })
        },
        handTooltip(f) {
            const placeHolder = f.tooltipDefaultMsg !== undefined && f.tooltipDefaultMsg !== null ? f.tooltipDefaultMsg : f.type === 'select' ? '请选择' : '请输入'
            let test = null
            if (f.type === 'select') {
                test = f.options
                    .filter(item => {
                        if (f.multiple) {
                            return (this.form[f.field] || []).indexOf(item.value) !== -1
                        } else {
                            return this.form[f.field] === item.value
                        }
                    })
                    .map(item => item.label)
                    .join()
            } else {
                test = this.form[f.field]
            }

            return f.tipMsg ? f.tipMsg : test || placeHolder
        },
        // 表单元素方法导入
        createFormAttrs(formOptions) {
            const _props = {}
            const _event = {}
            const _native = {}
            const _methods = ['change', 'select', 'input', 'clear', 'focus', 'blur', 'click', 'visible-change', 'remove-tag']
            Object.keys(formOptions).forEach(m => {
                if (_methods.includes(m)) {
                    Object.assign(_event, { [m]: formOptions[m] })
                } else {
                    // 键盘事件处理
                    switch (m) {
                        case 'keyup':
                            Object.assign(_native, { [m]: formOptions[m] })
                            break
                        case 'enter':
                            Object.assign(_native, {
                                keyup: e => {
                                    if (e.keyCode !== 13) return
                                    return formOptions[m](e.target.value)
                                }
                            })
                            break
                        case 'field':
                        case 'width':
                        case 'options':
                        case 'type':
                        case 'label':
                        case 'model':
                        case 'text':
                        case 'size':
                        case 'dateType':
                            break
                        default:
                            Object.assign(_props, { [m]: formOptions[m] })
                            break
                    }
                }
            })
            if (formOptions.type == 'select' && formOptions.isAll) {
                _event.change = value => {
                    if (!this[formOptions.field]) {
                        this[formOptions.field] = []
                    }
                    const old = this[formOptions.field]
                    let current = []
                    if (old.indexOf(-1) === -1 && value.indexOf(-1) > -1) {
                        current = [-1].concat(formOptions.options.map(item => item.value))
                    } else if (old.indexOf(-1) > -1 && value.indexOf(-1) === -1) {
                        current = []
                    } else if (old.indexOf(-1) > -1 && value.indexOf(-1) > -1 && old.length !== value.length) {
                        current = value.filter(item => item != -1)
                    } else if (old.indexOf(-1) === -1 && value.indexOf(-1) === -1 && value.length === formOptions.options.length) {
                        current = [-1, ...value]
                    } else {
                        current = value
                    }

                    this[formOptions.field] = current
                    this.$set(this.form, formOptions.field, current)
                    formOptions.change && formOptions.change(this.form[formOptions.field].filter(item => item != -1))
                }
            }
            return {
                attrs: _props,
                on: _event,
                nativeOn: _native
            }
        },
        createFormItem(formTarget) {
            return Object.keys(formTarget).map(k => {
                const f = formTarget[k]
                return (
                    <el-col xs={{ span: 24 }} sm={{ span: 24 }} style = {{ width: f.width, padding: f.padding }} md={{ span: 24 / (f.itemRow ? f.itemRow : this.itemRow) }} v-show={Object.hasOwnProperty.call(f, 'show') ? this.showMore : true}>
                        <el-form-item props={{ label: f.label || '', prop: f.field, labelWidth: f.labelWidth || null, rules: f.rules || null, required: f.required || false, size: f.size, showMessage: f.showMessage !== undefined ? f.showMessage : true, inlineMessage: f.inlineMessage, error: f.error || null, ...this.itemConfig }} key={f.field}>
                            <template slot='label'>
                                <span>{f.label}</span>
                                {f.tips ? (
                                    <el-tooltip content={f.tips} placement='top' effect='light'>
                                        <span class='el-icon-question icon'></span>
                                    </el-tooltip>
                                ) : (
                                    ''
                                )}
                            </template>
                            {this.checkTypeToFormElement(f)}
                        </el-form-item>
                    </el-col>
                )
            })
        },
        checkTypeToFormElement(r) {
            const { form, renderHtml } = this
            let _options = void 0
            switch (r.type) {
                case 'select':
                    _options = typeof r.options === 'function' ? [] : r.options
                    return r.tooltip ? (
                        <el-tooltip placement='top' popper-class='popper-wrap' effect='light'>
                            <div slot='content' class='custom-content'>
                                {this.handTooltip(r)}
                            </div>
                            <el-select popper-class="aaa" style={{ width: r.width || this.itemWidth }} v-model={form[r.field]} size={r.size ? r.size : 'small'} {...this.createFormAttrs(r)}>
                                {r.isAll && _options.length ? <el-option key={-1} label='全选' value={-1} /> : ''}
                                {Array.isArray(_options) && _options.map(option => <el-option key={option.id ? option.id : option.value} props={{ ...option }} />)}
                            </el-select>
                        </el-tooltip>
                    ) : (
                        <el-select style={{ width: r.width || this.itemWidth }} v-model={form[r.field]} size={r.size ? r.size : 'small'} {...this.createFormAttrs(r)}>
                            {r.isAll && _options.length ? <el-option key={-1} label='全选' value={-1} /> : ''}
                            {Array.isArray(_options) && _options.map(option => <el-option key={option.id ? option.id : option.value} props={{ ...option }} />)}
                        </el-select>
                    )
                case 'select-v2':
                    return <vir-select v-model={form[r.field]} options={ r.options } {...this.createFormAttrs(r)} />
                case 'switch':
                    return <el-switch v-mode={form[r.field]} {...this.createFormAttrs(r)} />
                case 'cascader':
                    _options = typeof r.options === 'function' ? [] : r.options
                    return <el-cascader v-model={form[r.field]} options={_options} props={{ ...r.propsa }} size={r.size ? r.szie : 'small'} style={{ width: r.width || this.itemWidth }} {...this.createFormAttrs(r)} />
                case 'datePicker':
                    return <el-date-picker v-model={form[r.field]} type={r.dateType} size={r.size ? r.size : 'small'} style={{ width: r.width || this.itemWidth }} {...this.createFormAttrs(r)} />
                case 'timePicker':
                    return <el-time-picker v-model={form[r.field]} size={r.size ? r.size : 'small'} style={{ width: r.width || this.itemWidth }} {...this.createFormAttrs(r)} />
                case 'radio':
                    _options = typeof r.options === 'function' ? [] : r.options
                    return (
                        <el-radio-group v-model={form[r.field]} {...this.createFormAttrs(r)}>
                            {Array.isArray(_options) &&
                                _options.map(option => {
                                    return <el-radio {...this.createFormAttrs(option)}></el-radio>
                                })}
                        </el-radio-group>
                    )
                case 'checkbox':
                    if (!Array.isArray(form[r.field])) {
                        this.$set(form, r.field, [])
                    }
                    _options = typeof r.options === 'function' ? [] : r.options
                    return (
                        <el-checkbox-group v-model={form[r.field]} {...this.createFormAttrs(r)}>
                            {Array.isArray(_options) &&
                                _options.map(option => {
                                    return <el-checkbox {...this.createFormAttrs(option)}></el-checkbox>
                                })}
                        </el-checkbox-group>
                    )
                // 自定义
                case 'custom':
                    return r.render(renderHtml, form, r)
                case 'slot':
                    return this.$slots[r.field]
                case 'text':
                    return <span> { form[r.field] }</span>
                case 'compare':
                    _options = typeof r.options === 'function' ? [] : r.options
                    return (
                        <div class='compare-wrap' style={{ width: r.width ? r.width : `220px` }}>
                            <span class='compare-wrap_left' style={{ width: r.leftWidth ? r.leftWidth : '120px' }}>
                                {r.leftName}{' '}
                            </span>
                            <el-input
                                size={r.size ? r.size : 'small'}
                                v-model={form[r.field].compareValue}
                                type={r.inputType ? r.inputType : 'text'}
                                onInput={value => {
                                    r.compareValueChange(value, form)
                                }}
                            >
                                <template slot='prepend'>
                                    <el-select style={{ width: r.selectWidth || '60px' }} clearable={false} v-model={form[r.field].compareType} size={r.size ? r.size : 'small'} {...this.createFormAttrs(r)}>
                                        {Array.isArray(_options) && _options.map(option => <el-option key={option.value} props={{ ...option }} />)}
                                    </el-select>
                                </template>
                            </el-input>
                        </div>
                    )
                default:
                    return r.tooltip ? (
                        <el-tooltip placement='top' popper-class='popper-wrap' effect='light'>
                            <div slot='content' class='custom-content'>
                                {this.handTooltip(r)}
                            </div>
                            <el-input size={r.size ? r.size : 'small'} style={{ width: r.width || this.itemWidth }} vModel_trim={form[r.field]} type={r.type ? r.type : 'text'} {...this.createFormAttrs(r)}></el-input>
                        </el-tooltip>
                    ) : (
                        <el-input size={r.size ? r.size : 'small'} style={{ width: r.width || this.itemWidth }} vModel_trim={form[r.field]} type={r.type ? r.type : 'text'} {...this.createFormAttrs(r)}></el-input>
                    )
            }
        },
        validate(callback) {
            if (callback) {
                this.$refs.ruleForm.validate(callback)
            } else {
                return new Promise(resolve => {
                    this.$refs.ruleForm
                        .validate()
                        .then(res => {
                            resolve(res)
                        })
                        .catch(err => {
                            resolve(err)
                        })
                })
            }
        },
        resetFields() {
            this.$refs.ruleForm.resetFields()
        },
        clearValidate(callback) {
            if (callback) {
                this.$refs.ruleForm.clearValidate(callback)
            } else {
                this.$refs.ruleForm.clearValidate()
            }
        },
        validateField() {
            this.$refs.ruleForm.validateField(...arguments)
        }
    },
    render(createElement) {
        this.renderHtml = createElement
        const { model, rules, labelWidth, labelPosition, formTarget, formConfig, validateOnRuleChange, inline } = this
        return (
            <el-form
                props={{
                    model: Object.keys(model).length ? model : this.form,
                    rules,
                    labelPosition,
                    labelWidth,
                    inline,
                    ...formConfig,
                    'validate-on-rule-change': validateOnRuleChange
                }}
                ref='ruleForm'
                class='form'
            >
                <el-row type='flex' class='form-row' gutter={15}>
                    {this.createFormItem(formTarget)}
                    {this.$slots.default}
                </el-row>
            </el-form>
        )
    }
}
</script>
<style lang="scss" scoped>
.form {
    width: 100%;
    height: 100%;

    &-row {
        width: 100%;
        flex-wrap: wrap;
        box-sizing: border-box;
    }

    .icon {
        position: absolute;
        color: #8c8c8c;
        cursor: pointer;
    }

    ::v-deep .el-form-item {
        .icon {
            right: -20px;
        }
    }
    ::v-deep .el-col {
        margin-bottom: 0;
    }

    ::v-deep.el-form-item {
        // width: 100%;
    }

    ::v-deep.el-select {
        // width: 100%;
    }
}

.custom-content {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 5;
    white-space: normal;
    word-break: break-all;
}

.compare-wrap {
    display: flex;

    ::v-deep .el-input__inner {
        border-bottom-left-radius: 0 !important;
        border-top-left-radius: 0 !important;
        padding: 0 5px;
    }
    ::v-deep .el-input-group__prepend {
        background: #ffff;
        border-bottom-left-radius: 0 !important;
        border-top-left-radius: 0 !important;
        padding-left: 30px;
        color: rgb(96, 98, 102);
        font-size: 16px;
    }
    .compare-input {
        flex: 1;
    }
}
.compare-wrap_left {
    box-sizing: border-box;
    text-align: center;
    line-height: 30px;
    color: rgb(96, 98, 102);
    height: 32px;
    border: 1px solid rgb(220, 223, 230);
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    border-right: 0;
    font-size: 13px;
}
</style>
<style>
.popper-wrap {
    max-width: 500px;
}
</style>
