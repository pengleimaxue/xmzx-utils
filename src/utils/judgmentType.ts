/**
 * 判断数据常见基本的数据类型
 */

export const toString = Object.prototype.toString;

export const is = (val:any, type?:string):boolean | string =>{
    if(type) {
      return  toString.call(val) === `[object ${type}]`;
    }
    return toString.call(val) 
} 

//判断非undefined
export const isDef = (val:any) => typeof val !== 'undefined';

//判断是undefined
export const isUnDef = (val:any) => !isDef(val);

//判断是否是对象
export const isObject = (val:any) => val !== null && toString.call(val) === `[object Object]`;

export const isEmpty = (val:any) => {
    if (isArray(val) || isString(val)) return val.length === 0;
    if (val instanceof Map || val instanceof Set) return val.size === 0;
    if (isObject(val)) return Object.keys(val).length === 0;
    return;
}

//判断是否是时间类型
export const isDate = (val:any) => is(val, "Date");

//判断是否是null类型
export const isNull = (val:any) => val === null;

//判断不可访问类型
export const isNullAndUnDef = (val:any) => isUnDef(val) && isNull(val);

//判断undefined和null其中一个
export const isNullOrUnDef = (val:any) => isUnDef(val) || isNull(val);

//判断是否是数字类型
export const isNumber = (val:any) => is(val, "Number");

//判断是否是Promise类型
export const isPromise = (val:any) => {
    return (
        is(val, "Promise")
    )
}

//判断是否是字符类型
export const isString = (val:any) => is(val, "String");

//判断是否为函数
export const isFunction = (val:any) => typeof val === "function";

//判断是否为booean类型
export const isBoolean = (val:any) => is(val, "Boolean");

//判断是否是正则表达式
export const isRegExp = (val:any) => is(val, "RegExp");

//判断是否是数组
export const isArray = (val:any) => val && Array.isArray(val);

//判断是否是window对象
export const isWindow = (val:any) => typeof window !== "undefined" && is(val, "Window");
