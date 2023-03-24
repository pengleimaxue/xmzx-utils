#  @pengleip/xmzx-utils
**这是一个工具类**

## Install

Using npm:

```sh
npm install --save @pengleip/xmzx-utils
```

or using pnpm:

```sh
pnpm install @pengleip/xmzx-utils
```

## 使用方法如下

```js
import {isObject,isType,....} from '@pengleip/xmzx-utils'
// 用来判断基本数据类型的 数据结构如下
{
        isType: [Function: is],
        isDef: [Function: isDef],
        isUnDef: [Function: isUnDef],
        isObject: [Function: isObject],
        isEmpty: [Function: isEmpty],
        isDate: [Function: isDate],
        isNull: [Function: isNull],
        isNullAndUnDef: [Function: isNullAndUnDef],
        isNullOrUnDef: [Function: isNullOrUnDef],
        isNumber: [Function: isNumber$1],
        isPromise: [Function: isPromise],
        isString: [Function: isString],
        isFunction: [Function: isFunction],
        isBoolean: [Function: isBoolean],
        isRegExp: [Function: isRegExp],
        isArray: [Function: isArray],
        isWindow: [Function: isWindow]
      }

//用来判断一些基本的正则表达式 数据结构如下
{
        isSecondIDCard: [Function: isSecondIDCard],
        isIDCard: [Function: isIDCard],
        isDecimal: [Function: isDecimal],
        isNumber: [Function: isNumber],
        isNumAndLetter: [Function: isNumAndLetter],
        isLetter: [Function: isLetter],
        isChinaName: [Function: isChinaName],
        isEnName: [Function: isEnName],
        isPhone: [Function: isPhone],
        isEmail: [Function: isEmail],
        isMoreTwoDecimal: [Function: isMoreTwoDecimal]
      }
//深度copy的数组或者对象的 方法如下  
deepClone()    
```

## 更新日志

[CHANGELOG](./CHANGELOG.zh_CN.md)