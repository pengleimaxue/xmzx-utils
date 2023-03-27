const { deepClone, debounce, throttle } = require('../dist/index.cjs.js')

describe("my function test", () => {
    test('deepClone', () => {
        const obj = { name: 'test', point: { x: 110, y: 120 } }
        obj.a = obj // 循环引用
        const newObj = deepClone(obj)
        //测试对象的内容是否相等，不比较对象的地址
        expect(obj).toEqual(newObj);
        //测试不等于
        expect(obj.point).not.toBe(newObj.point)
    });

})


// Tell Jest to mock all timeout functions

describe('debounce', () => {
    //声明使用虚拟的时间
    jest.useFakeTimers();
    let mockFn;
    let debouncedFunc;
    beforeEach(() => {
        mockFn = jest.fn();
        debouncedFunc = debounce(mockFn, 1000);
    });
    test('execute just once', () => {
        for (let i = 0; i < 100; i++) {
            debouncedFunc(i+1);
        }
         // Fast-forward time
        jest.runAllTimers();
        const calls = mockFn.mock.calls;
        expect(mockFn).toBeCalledTimes(1);
         // 断言以最后一次调用为准
        expect(calls[0][0]).toBe(100);
    });
});

describe('throttle', () => {
    jest.useFakeTimers();
    let mockFn;
    let debouncedFunc;
    beforeEach(() => {
        mockFn = jest.fn();
        debouncedFunc = throttle(mockFn, 1000);
    });
    test('execute just once', () => {
        for (let i = 0; i < 100; i++) {
            debouncedFunc(i+1);
        }
        // Fast-forward time
        jest.runAllTimers();
        const calls = mockFn.mock.calls;
        
        expect(mockFn).toBeCalledTimes(1);
         // 断言以第一次一次调用为准
        expect(calls[0][0]).toBe(1);
    });
});

