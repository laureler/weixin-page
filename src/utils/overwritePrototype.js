// 为一些变量拓展原型方法
function overwrite () {
    // console.log("重写原型")
    Array.prototype.indexOf = function (el) {
        for (var i = 0, n = this.length; i < n; i++) {
            if (this[i] === el) {
                return i
            }
        }
        return -1
    }
    Array.prototype.swap = function (index1, index2) {
        if (index1 < index2 && index1 == this.length - 1) {
            return
        } else if (index1 > index2 && index1 == 0) {
            return
        }
        this[index1] = this.splice(index2, 1, this[index1])[0]
        return this
    }
}

module.exports = overwrite
