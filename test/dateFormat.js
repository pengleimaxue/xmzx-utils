const { formate } = require('@pengleip/xmzx-utils')

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