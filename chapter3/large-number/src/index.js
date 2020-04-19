export default function add(a, b) {
    let i = a.length - 1
    let j = b.length - 1
    let carry = 0
    let res = ''

    while (i >= 0 || j >= 0) {
        let x = 0, y = 0, sum = ''

        if (i >= 0) {// length还有继续计算
            x = a[i] - 0 // 获取当前索引值,并转为数字
            i--
        }
        if (j >= 0) {
            y = b[j] - 0
            j--
        }
        // 累加
        sum = x + y + carry // 如果上次有进位 就加上carry
        if (sum >= 10) {
            carry = 1
            sum -= 10// 个位+个位最多10位，-10可以保留个位
        } else {
            carry = 0
        }
        res += sum // 累计结果
    }

    // 最后一位是否有进位，如果有那就拼接上
    if (carry) {
        res = carry + res
    }
    return res
}
// 单元测试
// console.log(add('999', '1'))
// add('1', '999');
// add('999', '999');
// console.log(add('999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999', '1'));

