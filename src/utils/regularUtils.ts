//正则表达式常见的

// 二代身份证号(18位数字),最后一位是校验位,可能为数字或字符X

/**
 * @remarks 二代身份证号(18位数字),最后一位是校验位,可能为数字或字符X
 * @param val 需要校验的字符串
 * @returns 返回true｜fase
 * @category 常见的数据格式校验
 */
export const isSecondIDCard = (val:string )=>{
     return /^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$/.test(val)
} 

/**
 * @remarks 身份证号, 支持1/2代(15位/18位数字)
 * @param val 需要校验的字符串
 * @returns 返回true｜fase
 * @category 常见的数据格式校验
 */
export const isIDCard = (val:string )=>{
    return /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/.test(val)
}

/**
 * @remarks 是否是小数
 * @param val 需要校验的字符串
 * @returns 返回true｜fase
 * @category 常见的数据格式校验
 */
export const isDecimal = (val:string )=>{
    return /^\d+\.\d+$/.test(val)
}
/**
 * @remarks 是否纯数字
 * @param val 需要校验的字符串
 * @returns 返回true｜fase
 * @category 常见的数据格式校验
 */
export const isNumber = (val:string )=>{
    return /^\d{1,}$/.test(val)
}

/**
 * @remarks 是否由数字和字母组成
 * @param val 需要校验的字符串
 * @returns 返回true｜fase
 * @category 常见的数据格式校验
 */
export const isNumAndLetter =  (val:string )=>{
    return /^[A-Za-z0-9]+$/.test(val)
}

/**
 * @remarks 是否字母组成
 * @param val 需要校验的字符串
 * @returns 返回true｜fase
 * @category 常见的数据格式校验
 */
export const isLetter =  (val:string )=>{
    return /^[a-zA-Z]+$/.test(val)
}

/**
 * @remarks 是否是中文姓名
 * @param val 需要校验的字符串
 * @returns 返回true｜fase
 * @category 常见的数据格式校验
 */
export const isChinaName =  (val:string )=>{
    return /^(?:[\u4e00-\u9fa5·]{2,16})$/.test(val)
}

/**
 * @remarks 是否是英文姓名
 * @param val 需要校验的字符串
 * @returns 返回true｜fase
 * @category 常见的数据格式校验
 */
export const isEnName =  (val:string )=>{
    return /(^[a-zA-Z]{1}[a-zA-Z\s]{0,20}[a-zA-Z]{1}$)/.test(val)
}

/**
 * @remarks 中国手机号(宽松)是13,14,15,16,17,18,19
 * @param val 需要校验的字符串
 * @returns 返回true｜fase
 * @category 常见的数据格式校验
 */
export const isPhone =  (val:string )=>{
    return /^(?:(?:\+|00)86)?1[3-9]\d{9}$/.test(val)
}
/**
 * @remarks 判断邮箱
 * @param val 需要校验的字符串
 * @returns 返回true｜fase
 * @category 常见的数据格式校验
 */
export const isEmail  =  (val:string )=>{
    return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(val)
}

/**
 * @remarks 最多有两位小数的数字 10 10.1 10.22 
 * @param val 需要校验的字符串
 * @returns 返回true｜fase
 * @category 常见的数据格式校验
 */
export const isMoreTwoDecimal  = (val:string)=>{
    return /^[0-9]+(.[0-9]{1,2})?$/.test(val)
}
