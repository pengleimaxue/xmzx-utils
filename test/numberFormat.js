const { dividingNumbersBySign,retainDecimalsByDigit } = require('@pengleip/xmzx-utils')
console.log(dividingNumbersBySign(12334577));
console.log(dividingNumbersBySign(12))
console.log(dividingNumbersBySign(123124))
console.log(dividingNumbersBySign(12334577,4));
console.log(dividingNumbersBySign(123345771,4));
console.log(dividingNumbersBySign(123345777,4,",",true));
console.log(dividingNumbersBySign(123345777.123123,4,",",true));
console.log(dividingNumbersBySign(12334577,3,"?"));
console.log(dividingNumbersBySign(12334577,7,"?",true));
console.log(dividingNumbersBySign(-12334577,3,"?",true));

console.log(retainDecimalsByDigit(-12334577));
console.log(5.215.toFixed(2),1.125.toFixed(2) )// 结果分别为 5.21 1.13  5.215 存在精度丢失
console.log(retainDecimalsByDigit(5.215,2),retainDecimalsByDigit(1.125,2)); // 结果分别为 5.22 1.13 不存在精度丢失
console.log(retainDecimalsByDigit(12334577));
console.log(retainDecimalsByDigit(-12334577.12,5));
console.log(retainDecimalsByDigit(-12334577.12,5,false,false));
console.log(retainDecimalsByDigit(-12334577.125,2));
console.log(retainDecimalsByDigit(-12334577.124,2,false,false));
console.log(retainDecimalsByDigit(-12334577.9999,2));
console.log(retainDecimalsByDigit(-12334577.9999,2,false,false));
console.log(retainDecimalsByDigit('199.99999999999999999999999999',2));
console.log(retainDecimalsByDigit('198.19999999999999999999999999',2));
console.log(411522199010154219.99999999999999999999999999.toFixed(2))//结果 411522199010154240.00 
console.log(retainDecimalsByDigit('411522199010154219.99999999999999999999999999'))//结果 411522199010154240.00 
console.log(retainDecimalsByDigit('9999999999999999.99999999999999999999999999',4));