// 一些函数工具类
/**
 *
 */
import { isObject, isArray, isFunction } from './judgmentType';
import type { SomeConstructor, functionType } from '../types/common';
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
        if (!isFunction(func)) {
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
        //一秒60帧 如果没有渲染的时候就进将异步操作执行
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
 * @remark 异步执行任务，同时不会让也产生卡顿
 * @param task 需要运行的耗时任务函数
 * @returns promise对象
 */
export const runTask = function (task: functionType) {
    return new Promise((reslove) => {
        _runTask(task, reslove);
    });
};
