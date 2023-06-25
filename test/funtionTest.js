const { parseQuery } = require('@pengleip/xmzx-utils');

console.log(parseQuery("http://a.com/?a=1&b=test"));
console.log(parseQuery("http://a.com?b=c&a=1&b123=testU&rollId=测试&"));

