// 一些函数工具类
import {isObject,isArray} from "./judgmentType"
import type {SomeConstructor} from "../types/common"
//只对Oject/Array进行处理
export const deepClone=<T extends SomeConstructor>(target:T,hash = new WeakMap):T =>{
   
    const t = target.constructor as typeof target;
    if(!isObject(target) && !isArray(target)) {
        return target;
    } 
    //如果出现循环引用 返回缓存对象，防止递归进入死循环
    if(hash.has(target)) {
        return hash.get(target)
    }
   
    const cloneObj = new t();
    //缓存对象，用于循环引用情况
    hash.set(target,cloneObj)
    for(const key in target) {
        if(Object.prototype.hasOwnProperty.call(target,key)) {
            cloneObj[key] = deepClone(target[key] as T, hash) // 递归拷贝 
        }
    }
    return cloneObj;
}