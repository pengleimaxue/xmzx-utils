const { dividingNumbersBySign } = require('@pengleip/xmzx-utils')
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