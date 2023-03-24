 const {deepClone} =  require( '../dist/index.cjs.js')

 test('funtion', () => {
    const obj = { name: 'test', point: { x: 110, y: 120 } }
    obj.a = obj // 循环引用
    const newObj = deepClone(obj)
    console.log({obj,newObj})
    //测试对象的内容是否相等，不比较对象的地址
    expect(obj).toEqual(newObj);
    //测试不等于
    expect(obj.point).not.toBe(newObj.point)
});