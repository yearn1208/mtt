/**
 * 操作权限处理
 * Copyright (c) 2019 ruoyi
 */

import store from '@/store'

export default {
    inserted(el, binding, vnode) {
        const { value } = binding
        const permission = store.getters && store.getters.permission
        if (value && value instanceof Array && value.length > 0) {
            const permissionFlag = value

            const hasPermissions = Object.keys(permission).some(key => {
                return permissionFlag.includes(key) && permission[key]
            })

            if (!hasPermissions) {
                el.parentNode && el.parentNode.removeChild(el)
            }
        }
    }
}
