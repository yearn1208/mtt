<template>
    <div :id="vsId">
        <!-- 组件示例调用 -->
        <!-- <vir-select
            v-model="value"
            class="m-top-20"
            v-bind="{ filterable: true, multiple: true, collapseTags: true, styles: { width: '500px' } }"
            :options="defaultList"
            @change="changeSku"
        /> -->
        <custom-select
            v-model="newValue"
            v-bind="$attrs"
            :style="$attrs.styles"
            :filter-method="remoteMethod"
            :value-key="option.itemValueKey"
            popper-class="vir-select"
            @change="change"
        >
            <recycle-scroller
                v-if="defaultOptions.length > 0"
                class="virtual-selector__scroller virtual-selector__dropdown scrollBar m-right-4"
                :items="defaultOptions"
                :item-size="itemSize"
                :key-field="option.itemValueKey"
            >
                <template slot-scope="{ item }">
                    <div
                        class="virtual-selector__dropdown-item"
                    >
                        <el-option
                            :key="Object.prototype.toString.call(item[option.itemValueKey]).toLowerCase() === '[object object]' ?
                                item[option.itemValueKey][option.itemValueKey] : item[option.itemValueKey]"
                            :value="$attrs.multiple ? item : item[option.itemValueKey]"
                            :label="item[option.itemNameKey]"
                        >
                            <slot
                                v-if="$scopedSlots.item"
                                name="item"
                                :item="item"
                            />
                            <slot v-else>{{ item[option.itemNameKey] }}</slot>
                        </el-option>
                    </div>
                </template>
            </recycle-scroller>
        </custom-select>
    </div>
</template>
<script>
import CustomSelect from './src/select.vue'

function debounce(fn, delay) {
    let timer

    return function() {
        const context = this
        const args = arguments

        clearTimeout(timer)

        timer = setTimeout(function() {
            fn.apply(context, args)
        }, delay)
    }
}
import { RecycleScroller } from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

const defaultItemGap = 0

export default {
    name: 'VirSelector',
    components: { RecycleScroller, CustomSelect },
    props: {
        value: {
            type: [Number, String, Boolean, Array],
            default: ''
        },
        options: {
            type: Array,
            required: true,
            default: () => []
        },
        option: {
            type: Object,
            default: () => {
                return {
                    itemNameKey: 'label',
                    itemValueKey: 'value'
                }
            }
        },
        itemPageSize: {
            type: Number,
            default: 8
        },
        itemGap: {
            type: Number,
            default: 5
        }
    },
    data() {
        return {
            id: new Date().getTime(),
            newValue: this.value,
            defaultOptions: [...this.options],
            itemSize: 32 + (this.itemGap || defaultItemGap)
        }
    },
    computed: {
        vsId() {
            return `virtual-selector-${this.id}`
        }
    },
    watch: {
        value(val) {
            this.newValue = val
        },
        options(val) {
            this.defaultOptions = val
        },
        newValue(val) {
            this.$emit('input', val)
        }
    },
    created() {
        console.log('options-$attrs', this.$attrs)
        const attrs = this.$attrs
        const isObject = this.newValue.length ? Object.prototype.toString.call(this.newValue[0]).toLowerCase() !== '[object object]' : false
        if (attrs.multiple && isObject) {
            throw new Error(
                '多选时, v-model绑定值必须为object'
            )
        }
    },
    methods: {
        remoteMethod: debounce(function(input) {
            // 防抖监控ipnut输入，并组装需要显示的内容
            if (!input) {
                this.defaultOptions = [...this.options]
            } else {
                if (typeof this.$attrs.filterMethod === 'function') {
                    return this.$attrs.filterMethod(input)
                }
                if (this.remote && typeof this.remoteMethod === 'function') {
                    return this.$attrs.remoteMethod(input)
                }
                this.defaultOptions = this.options.filter((item) => {
                    return item[this.option.itemNameKey].toString().toLowerCase().includes(input.toLowerCase())
                })
            }
            this.$emit('search', {
                id: this.vsId,
                search: { [this.option.itemNameKey]: input }
            })
        }, 300),
        change(val) {
            // val可能会是number类型
            if (!val || !String(val).length) return this.$emit('change', val)
            if (Array.isArray(val)) {
                const newValue = []
                val.forEach(item => {
                    const newItem = this.defaultOptions.find(i => i[this.option.itemValueKey] === item[this.option.itemValueKey])
                    newValue.push(newItem)
                })
                this.$emit('change', newValue)
            } else {
                const newItem = this.defaultOptions.find(i => i[this.option.itemValueKey] === val)
                this.$emit('change', newItem)
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.virtual-selector__scroller {
  max-height: 252px;
}
</style>
