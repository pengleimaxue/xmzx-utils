
const {isType} =  require( '../dist/index.cjs.js')
test('utils', () => {
    expect(isType({})).toBe("[object Object]")
})