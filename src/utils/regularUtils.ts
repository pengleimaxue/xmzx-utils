//正则表达式常见的

// 二代身份证号(18位数字),最后一位是校验位,可能为数字或字符X

export const isSecondIDCard = (val:string )=>{
     return /^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$/.test(val)
} 
//身份证号, 支持1/2代(15位/18位数字)
export const isIDCard = (val:string )=>{
    return /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/.test(val)
}

//是否是小数
export const isDecimal = (val:string )=>{
    return /^\d+\.\d+$/.test(val)
}
//是否纯数字
export const isNumber = (val:string )=>{
    return /^\d{1,}$/.test(val)
}

//是否由数字和字母组成
export const isNumAndLetter =  (val:string )=>{
    return /^[A-Za-z0-9]+$/.test(val)
}

//是否字母组成
export const isLetter =  (val:string )=>{
    return /^[a-zA-Z]+$/.test(val)
}

//是否是中文姓名
export const isChinaName =  (val:string )=>{
    return /^(?:[\u4e00-\u9fa5·]{2,16})$/.test(val)
}

//是否是英文姓名
export const isEnName =  (val:string )=>{
    return /(^[a-zA-Z]{1}[a-zA-Z\s]{0,20}[a-zA-Z]{1}$)/.test(val)
}

//中国手机号(宽松)是13,14,15,16,17,18,19
export const isPhone =  (val:string )=>{
    return /^(?:(?:\+|00)86)?1[3-9]\d{9}$/.test(val)
}

export const isEmail  =  (val:string )=>{
    return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(val)
}

//最多有两位小数的数字 10 10.1 10.22 
export const isMoreTwoDecimal  = (val:string)=>{
    return /^[0-9]+(.[0-9]{1,2})?$/.test(val)
}
