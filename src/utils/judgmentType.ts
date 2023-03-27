/**
 *@remarks 判断数据常见基本的数据类型
 */

export const toString = Object.prototype.toString;

/**
 * @category  判断数据常见基本的数据类型
 * @remarks 判断数据类型方法
 * @param val 需要判断的数据
 * @param type 需要判断的数据类型(可选：如传入'String' 可判断对象是否是string类型)
 * @returns 如果type有值，返回Boolean对象，没值，返回  Object.prototype.toString返回的类型
 */

export const isType = (val:any, type?:string):boolean | string =>{
    if(type) {
      return  toString.call(val) === `[object ${type}]`;
    }
    return toString.call(val) 
} 

/**
 * @category  判断数据常见基本的数据类型
 * @remarks 判断是否不是undefined
 * @param val 需要判断的数据
 * @returns 返回Boolean对象
 */
export const isDef = (val:any) => typeof val !== 'undefined';

/**
 * @category  判断数据常见基本的数据类型
 * @remarks 判断是否是undefined
 * @param val 需要判断的数据
 * @returns 返回Boolean对象
 */
export const isUnDef = (val:any) => !isDef(val);

/**
 * @category  判断数据常见基本的数据类型
 * @remarks 判断是否是对象
 * @param val 需要判断的数据
 * @returns 返回Boolean对象
 */
export const isObject = (val:any) => val !== null && toString.call(val) === `[object Object]`;

/**
 * @category  判断数据常见基本的数据类型
 * @remarks 判断是否空数据，包括空对象，空数组，空map,true,false,空格，null
 * @param val 需要判断的数据
 * @returns 返回Boolean对象
 */
export const isEmpty = (val:any) => {
    if (isArray(val) || isString(val)) return val.length === 0;
    if (val instanceof Map || val instanceof Set) return val.size === 0;
    if (isObject(val)) return Object.keys(val).length === 0;
      return (
      val == null ||
      false ||
      val === "" ||
      val.trim() === "" ||
      val.toLocaleLowerCase().trim() === "null"
    );
}

/**
 * @category  判断数据常见基本的数据类型
 * @remarks 判断是否是时间类型
 * @param val 需要判断的数据
 * @returns 返回Boolean对象
 */
export const isDate = (val:any) => isType(val, "Date");

/**
 * @category  判断数据常见基本的数据类型
 * @remarks 判断是否是null类型
 * @param val 需要判断的数据
 * @returns 返回Boolean对象
 */
export const isNull = (val:any) => val === null;

/**
 * @category  判断数据常见基本的数据类型
 * @remarks 判断是否是null和undefined类型
 * @param val 需要判断的数据
 * @returns 返回Boolean对象
 */

export const isNullAndUnDef = (val:any) => isUnDef(val) && isNull(val);

/**
 * @category  判断数据常见基本的数据类型
 * @remarks 判断undefined和null其中一个
 * @param val 需要判断的数据
 * @returns 返回Boolean对象
 */
export const isNullOrUnDef = (val:any) => isUnDef(val) || isNull(val);

/**
 * @category  判断数据常见基本的数据类型
 * @remarks 判断是否是数字类型
 * @param val 需要判断的数据
 * @returns 返回Boolean对象
 */
export const isOnlyNumber = (val:any) => isType(val, "Number");

/**
 * @category  判断数据常见基本的数据类型
 * @remarks 判断是否是Promise类型
 * @param val 需要判断的数据
 * @returns 返回Boolean对象
 */
export const isPromise = (val:any) => {
    return (
        isType(val, "Promise")
    )
}


/**
 * @category  判断数据常见基本的数据类型
 * @remarks 判断是否是字符类型
 * @param val 需要判断的数据
 * @returns 返回Boolean对象
 */
export const isString = (val:any) => isType(val, "String");

/**
 * @category  判断数据常见基本的数据类型
 * @remarks 判断是否为函数
 * @param val 需要判断的数据
 * @returns 返回Boolean对象
 */
export const isFunction = (val:any) => typeof val === "function";

/**
 * @category  判断数据常见基本的数据类型
 * @remarks 判断是否为booean类型
 * @param val 需要判断的数据
 * @returns 返回Boolean对象
 */
export const isBoolean = (val:any) => isType(val, "Boolean");

/**
 * @category  判断数据常见基本的数据类型
 * @remarks 判断是否是正则表达式
 * @param val 需要判断的数据
 * @returns 返回Boolean对象
 */
export const isRegExp = (val:any) => isType(val, "RegExp");

/**
 * @category  判断数据常见基本的数据类型
 * @remarks 判断是否是判断是否是数组
 * @param val 需要判断的数据
 * @returns 返回Boolean对象
 */
export const isArray = (val:any) => val && Array.isArray(val);

/**
 * @category  判断数据常见基本的数据类型
 * @remarks 判断是否是window对象
 * @param val 需要判断的数据
 * @returns 返回Boolean对象
 */
export const isWindow = (val:any) => typeof window !== "undefined" && isType(val, "Window");
