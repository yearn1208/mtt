 // 区分是否虚拟，重新过滤部门树的部门名称
 export function setNameByVirtually(data, arr = []) {
    if (data) {
        data.forEach(item => {
            if (item.isVirtually == 1) {
                if (item.name.slice(0, 1) == '#') {
                    item.name = item.name
                } else {
                    item.name = '#' + item.name
                }
            }
            if (item.child?.length > 0) {
                setNameByVirtually(item.child)
            }
        })
        return data
    } else {
        alert('暂无数据')
    }
}
// 根据id查找部门书符合的一项
export function filterNode(code, arr) {
    for (const item of arr) {
        if (item.code === code) return item
        if (item.children && item.children.length) {
            const _item = this.filterNode(code, item.children)
            if (_item) return _item
        }
    }
}