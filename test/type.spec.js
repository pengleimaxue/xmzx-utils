
const {isType} =  require( '@pengleip/xmzx-utils')
test('utils', () => {
    expect(isType({})).toBe("[object Object]")
})