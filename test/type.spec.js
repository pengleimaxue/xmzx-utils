
const utils = {typeObject} =  require( '../dist/index.cjs.js')
test('utils', () => {
    expect(utils.default.typeObject.is({})).toBe("[object Object]")
})