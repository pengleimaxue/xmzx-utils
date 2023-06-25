// 一些函数工具类
/**
 *
 */
import type { SomeConstructor, functionType } from '../types/common';
import { isArray, isDate, isObject, isPromise, isString } from './judgmentType';
import { isDecimal, isNumber } from './regularUtils';
/**
 * @category  一些函数工具类
 * @remarks 深copy 只对Oject/Array，其他数据直接返回进行处理
 * @typeParam T - the identity type
 * @param target 需要深copy的对象
 *   @example
 *  使用例子，比如copy一个obj对象：
 * ```js
 *   const obj = { name: 'test', point: { x: 110, y: 120 } }   
     const newObj = deepClone(obj)
 * ```
 */
export const deepClone = <T extends SomeConstructor>(
    target: T,
    hash = new WeakMap(),
): T => {
    if (!isObject(target) && !isArray(target)) {
        return target;
    }
    //如果出现循环引用 返回缓存对象，防止递归进入死循环
    if (hash.has(target)) {
        return hash.get(target);
    }
    const t = target.constructor as typeof target;
    const cloneObj = new t();
    //缓存对象，用于循环引用情况
    hash.set(target, cloneObj);
    for (const key in target) {
        if (Object.prototype.hasOwnProperty.call(target, key)) {
            cloneObj[key] = deepClone(target[key] as T, hash); // 递归拷贝
        }
    }
    return cloneObj;
};

/**
 * @category  一些函数工具类
 *  @remarks 移除对象属性
 * @param prop 需要移除的对象属性
 *  @example
 * //比如移除对象{"test":123,name:"123"}里面的test属性
 *  removePorperty("test")({"test":123,name:"123"})
 * @returns
 */
export const removePorperty =
    (prop: string): object =>
    ({ [prop]: _, ...rest }) =>
        rest;

/**
 * @category  一些函数工具类
 * @param func 需要防抖的函数
 * @param wait 延迟执行的毫秒数
 * @param immediate 是否立即执行
 * @returns
 */
export const debounce = function (
    func: functionType,
    wait: number,
    immediate: boolean,
): functionType {
    let timeout: NodeJS.Timeout | null;
    let result: string | object;
    const debounced = function (this: any, ...args: (string | object)[]) {
        //保存当前上下文this
        const context = this;
        if (timeout) clearTimeout(timeout);
        //是否立即执行
        if (immediate) {
            // 如果已经执行过，不再执行
            const callNow = !timeout;
            timeout = setTimeout(function () {
                timeout = null;
            }, wait);
            if (callNow) {
                result = func.apply(context, args);
            }
        } else {
            timeout = setTimeout(() => {
                func.apply(context, args);
            }, wait);
        }
        return result;
    };
    return debounced;
};

/**
 * @category  一些函数工具类
 * @param func 需要节流的函数
 * @param wait  延迟执行的毫秒数
 * @param isTimeStamp  是否采用时间戳的模式
 * @returns
 */
export const throttle = function (
    func: functionType,
    wait: number,
    isTimeStamp: boolean,
): functionType {
    let timeout: NodeJS.Timeout | null;
    let result: string | object;
    let previousTimeStamp: number;
    if (isTimeStamp) {
        previousTimeStamp = 0;
    } else {
        timeout = null;
    }
    const throttled = function (this: any, ...args: (string | object)[]) {
        //保存当前上下文this
        const context = this;

        //采用日期时间戳
        if (isTimeStamp) {
            // 如果已经执行过，不再执行
            const now = Date.now();
            if (now - previousTimeStamp > wait) {
                result = func.apply(context, args);
                previousTimeStamp = now;
            }
        } else {
            if (!timeout) {
                timeout = setTimeout(() => {
                    timeout = null;
                    func.apply(context, args);
                }, wait);
            }
        }
        return result;
    };
    return throttled;
};
/**
 * @remarks 如果promise函数失败，继续重试该函数
 * @category  一些函数工具类
 * @param func 需要重试的promise函数
 * @param times 重试的次数
 * @param delay 失败之后延迟多久重试，单位毫秒
 * @example
 *  使用例子，这里模拟失败重试三次：
 * ```js
 *   let i = 0;
 *   function solution() {
        return new Promise((resolve, reject) => {
            if (3 < i) {
                resolve(i)
            } else {
                i++
                console.log("i==", i)
                reject("error")
            }
        })
    }
     retryPromise(solution, 4).then(data => {
            
        })
 * ```
 */
export const retryPromise = function <T extends PromiseConstructor>(
    func: () => Promise<T>,
    times = 0,
    delay = 0,
): Promise<T> {
    return new Promise((resolve, reject) => {
        if (!isPromise(func)) {
            reject(func + ' is not Promise');
        }
        //重连函数
        const innerFunc = async function () {
            const [data, error] = await prominseToJs(func());
            if (error) {
                if (times-- > 0) {
                    innerFunc();
                    if (delay !== 0) {
                        setTimeout(innerFunc, delay);
                    } else {
                        innerFunc();
                    }
                } else {
                    //彻底失败
                    reject(error);
                }
            } else {
                resolve(data);
            }
        };

        innerFunc();
    });
};

/**
 * @ignore
 * */
function prominseToJs(promise: Promise<any>): Promise<any> {
    return promise
        .then((data: object) => {
            return [data, undefined];
        })
        .catch((error: unknown) => {
            return [undefined, error];
        });
}

/**
 * @ignore
 * */
function _runTask(task: functionType, callBack: (value: unknown) => void) {
    const start = Date.now();
    //requestAnimationFrame 兼容性较好
    // requestIdleCallback 兼容没有那么好
    requestAnimationFrame(() => {
        //一分钟60帧 如果没有渲染的时候就进将异步操作执行
        if (Date.now() - start < 16.6) {
            task();
            callBack('');
        } else {
            _runTask(task, callBack);
        }
    });
}

/**
 * @category  一些函数工具类
 * @remark 异步执行任务，同时不会让页面产生卡顿
 * @param task 需要运行的耗时任务函数
 * @returns promise对象
 */
export const runTask = function (task: functionType) {
    return new Promise((reslove) => {
        _runTask(task, reslove);
    });
};

interface formateInfo {
    yyyy: string;
    MM: string;
    dd: string;
    HH: string;
    mm: string;
    ss: string;
    ms: string;
    [index: string]: string;
}

/**
 * @category  一些函数工具类
 * @remark 格式化日期
 * @param date 传入的日期
 * @param formatter 需要格式化的类型或者函数
 * @param isPad 是否格式化之后自动补零 默认false
 * 
 * 使用demo如下：
 * ```js
 * 
// 2023-4-9
console.log(formate(new Date(),'date'))
//2023-4-9 19:4:34
console.log(formate(new Date(),'datetime'))
//2023-04-09
console.log(formate(new Date(),'date',true))
//2023-04-09 19:04:34
console.log(formate(new Date(),'datetime',true))
//2023年04月09日 19:04:50:281
console.log(formate(new Date(),'yyyy年MM月dd日 HH:mm:ss:ms',true))

const test = formate(new Date('2020/12/1'),(dateInfo)=>{
    const {yyyy:year} = dateInfo;
    console.log({year})
    const nowYear = new Date().getFullYear();
    if(year<nowYear) {
        return `${nowYear - year} 年前`
    }else if(year>nowYear) {
        return `${year - nowYear} 年后`
    }else {
        return '今年'
    }
})
//3 年前
console.log(test);
 * ```
 */
export function formate(
    date: Date,
    formatter: functionType | string,
    isPad?: boolean,
) {
    if (!isDate(date)) {
        throw new TypeError(date + ' must be a Date');
    }
    const newformatter = _formatNormalize(formatter);
    const dateInfo = {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        date: date.getDate(),
        hour: date.getHours(),
        minute: date.getMinutes(),
        second: date.getSeconds(),
        miniSecond: date.getMilliseconds(),
    };
    const newDateInfo: formateInfo = {
        yyyy: dateInfo.year.toString(),
        MM: dateInfo.month.toString(),
        dd: dateInfo.date.toString(),
        HH: dateInfo.hour.toString(),
        mm: dateInfo.minute.toString(),
        ss: dateInfo.second.toString(),
        ms: dateInfo.miniSecond.toString(),
    };
    function _pad(prop: string, len: number) {
        newDateInfo[prop] = newDateInfo[prop].padStart(len, '0');
    }
    if (isPad) {
        _pad('yyyy', 4);
        _pad('MM', 2);
        _pad('dd', 2);
        _pad('HH', 2);
        _pad('mm', 2);
        _pad('ss', 2);
        _pad('ms', 2);
    }
    return newformatter(newDateInfo);
}

/**
 * @ignore
 * */
function _formatNormalize(formatter: functionType | string) {
    if (typeof formatter === 'function') {
        return formatter;
    }
    if (typeof formatter !== 'string') {
        throw new TypeError('formatter must be a string');
    }
    if (formatter === 'date') {
        formatter = 'yyyy-MM-dd';
    } else if (formatter === 'datetime') {
        formatter = 'yyyy-MM-dd HH:mm:ss';
    }
    const formatterFunc = (dataInfo: formateInfo) => {
        const { yyyy, MM, dd, HH, mm, ss, ms } = dataInfo;
        return (formatter as string)
            .replace(/yyyy/gi, yyyy)
            .replace(/MM/gi, MM)
            .replace(/dd/gi, dd)
            .replace(/HH/gi, HH)
            .replace(/mm/gi, mm)
            .replace(/ss/gi, ss)
            .replace(/ms/gi, ms);
    };
    return formatterFunc;
}

/**
 * @category  一些函数工具类
 * @remark 解析URL参数
 * @param url 需要解析 httpURL
 * @returns 返回url？后面构成的键值对象
 */

export const parseQuery = (url: string) => {
    const query: { [index: string]: string } = {};
    if (isString(url)) {
        url.replace(
            /([^?&=]+)=([^&]+)/g,
            (_, k: string, v: string) => (query[k] = v),
        );
    }
    return query;
};

/**
 * @category  一些函数工具类
 * @remarks 数字分割
 * @param value 需要分割的数字
 * @param diviDingDigit 几位分割(默认三位分割)
 * @param sign 分割符号(可选 默认,分割)
 * @param isPad 如果少于指定的位数是否补0，否认false
 * @returns 格式化后的数字字符串
 *  * 使用demo如下：
 * ```js
 *  console.log(dividingNumbersBySign(12334577));//12,334,577
    console.log(dividingNumbersBySign(12))//12
    console.log(dividingNumbersBySign(123124))//123,124
    console.log(dividingNumbersBySign(12334577,4));//1233,4577
    console.log(dividingNumbersBySign(123345771,4));//1,2334,5771
    console.log(dividingNumbersBySign(123345777,4,",",true));//0001,2334,5777
    console.log(dividingNumbersBySign(123345777.123123,4,",",true));//0001,2334,5777.123123
    console.log(dividingNumbersBySign(12334577,3,"?"));//12?334?577
    console.log(dividingNumbersBySign(12334577,7,"?",true));//0000001?2334577
    console.log(dividingNumbersBySign(-12334577,3,"?",true));//-012?334?577
  ```
 */

export function dividingNumbersBySign<T extends string | number>(
    value: T,
    diviDingDigit?: number,
    sign?: string,
    isPad?: boolean,
): T {
    //负数校验
    let symbolValue = '';
    if (value && value.toString().indexOf('-') === 0) {
        symbolValue = '-';
        value = value.toString().replace('-', '') as T;
    }
    //非数字原封不动返回
    if (!isNumber(value.toString()) && !isDecimal(value.toString())) {
        return (symbolValue + value) as T;
    }

    const numArr = value.toString().split('.');
    // 获取小数部分
    let pointValue = '';
    if (numArr[1]) {
        pointValue = '.' + numArr[1];
    }

    // 获取整数部分
    let newValue = numArr[0];
    const result = [];
    const num = diviDingDigit || 3;
    if (newValue.length <= num) {
        result.push(isPad ? newValue.padStart(num, '0') : newValue);
    } else {
        const times = Math.ceil(newValue.length / num);

        for (let i = 0; i <= times; i++) {
            const start =
                newValue.length % num === 0 ? num : newValue.length % num;
            const currentValue = newValue.slice(0, start);
            if (currentValue && currentValue.length) {
                result.push(
                    isPad ? currentValue.padStart(num, '0') : currentValue,
                );
                newValue = newValue.slice(start);
            }
        }
    }

    return (symbolValue + result.join(sign || ',') + pointValue) as T;
}
/**
 * @category  一些函数工具类
 * @remarks 保留小数，不存在精度丢失问题,解决使用toFixed精度丢失或者大数等问题
 * @param num 需要传入的数字 支持大数，如果是大数的请传递字符串格式，防止数字越界
 * @param digitNum 需要保留的小数位数，默认保留两位小数
 * @param isPad 保留的小数位数是否补0 默认不够保留的小数位数直接补0
 * @param isHalfAdjust 保留小数的时候是否四舍五入，默认为true
 * @returns 返回数据结果
 * 使用demo如下：
 * ``` js
 * console.log(retainDecimalsByDigit(-12334577));
console.log(5.215.toFixed(2),1.125.toFixed(2) )// 结果分别为 5.21 1.13  5.215 存在精度丢失
console.log(retainDecimalsByDigit(5.215,2),retainDecimalsByDigit(1.125,2)); // 结果分别为 5.22 1.13 不存在精度丢失
console.log(retainDecimalsByDigit(12334577));//12334577.00
console.log(retainDecimalsByDigit(-12334577.12,5));//-12334577.12000
console.log(retainDecimalsByDigit(-12334577.12,5,false,false));//-12334577.12
console.log(retainDecimalsByDigit(-12334577.125,2));//-12334577.13
console.log(retainDecimalsByDigit(-12334577.124,2,false,false));//-12334577.12
console.log(retainDecimalsByDigit(-12334577.9999,2));//-12334578.00
console.log(retainDecimalsByDigit(-12334577.9999,2,false,false));//-12334577.99
console.log(retainDecimalsByDigit('199.99999999999999999999999999',2));//200.00
console.log(retainDecimalsByDigit('198.19999999999999999999999999',2));// 198.20
console.log(411522199010154219.99999999999999999999999999.toFixed(2))//结果 411522199010154240.00 
console.log(retainDecimalsByDigit('411522199010154219.99999999999999999999999999'))//结果 411522199010154220.00
console.log(retainDecimalsByDigit('9999999999999999.99999999999999999999999999',4));// 10000000000000000.0000
 * ```
 */
export function retainDecimalsByDigit(
    num: string | number,
    digitNum = 2,
    isPad = true,
    isHalfAdjust = true,
): string {
    //负数校验
    let symbolValue = '';
    let currentValue = num;
    if (currentValue && currentValue.toString().indexOf('-') === 0) {
        symbolValue = '-';
        currentValue = currentValue.toString().replace('-', '');
    }
    //非数字原封不动返回
    if (
        !isNumber(currentValue.toString()) &&
        !isDecimal(currentValue.toString())
    ) {
        return num as string;
    }
    // 如果是整数 直接返回
    if (isNumber(currentValue.toString())) {
        if (isPad) {
            currentValue += '.' + ''.padEnd(digitNum, '0');
        }
        return symbolValue + currentValue;
    }

    // 如果是小数，则做后续处理
    const numArr = currentValue.toString().split('.');
    // 获取小数部分
    const pointValue = numArr[1];
    const lastValue = pointValue.slice(digitNum, digitNum + 1);
    // 如果是小数且不需要四舍五入或者保留的位数大于等于小数位数或者舍去的最后一位数字小于5
    if (
        !isHalfAdjust ||
        pointValue.length <= digitNum ||
        Number(lastValue) < 5
    ) {
        currentValue =
            numArr[0] +
            '.' +
            (isPad
                ? pointValue.slice(0, digitNum).padEnd(digitNum, '0')
                : pointValue.slice(0, digitNum));
        return symbolValue + currentValue;
    }
    const addValue = _addStrings(pointValue.slice(0, digitNum), '1');
    // 说明小数进位了，需要移到小数点前面几下进位
    if (addValue.length > pointValue.slice(0, digitNum).length) {
        currentValue =
            _addStrings(numArr[0], '1') +
            '.' +
            (isPad
                ? addValue.slice(1).padEnd(digitNum, '0')
                : addValue.slice(1));
    } else {
        currentValue =
            numArr[0] +
            '.' +
            (isPad ? addValue.padEnd(digitNum, '0') : addValue);
    }
    return symbolValue + currentValue;
}

/**
 * 大数相加
 * @ignore
 * */
function _addStrings(num1: string, num2: string): string {
    const len = Math.max(num1.length, num2.length);
    num1 = num1.padStart(len, '0');
    num2 = num2.padStart(len, '0');
    const result: number[] = [];

    for (let i = len - 1; i >= 0; i--) {
        const sum = Number(num1[i]) + Number(num2[i]) + (result[0] || 0);
        const low = sum % 10;
        const high = Math.floor(sum / 10);
        result[0] = low;
        if (i !== 0 || high !== 0) {
            result.unshift(high);
        }
    }
    return result.join('');
}
