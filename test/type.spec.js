
const utils = {typeObject} =  require( '../dist/index.cjs.js')
console.log(utils,typeObject)
test('utils', () => {
    expect(utils.typeObject.is({})).toBe("[object Object]")
})