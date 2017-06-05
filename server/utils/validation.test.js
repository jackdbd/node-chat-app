const expect = require('expect');
const { isRealString } = require('./validation');

describe('isRealString', () => {
  it('should reject non-string values', () => {
    const str = 123;
    const res = isRealString(str);
    expect(res).toBe(false);
  });

  it('should reject strings with only spaces', () => {
    const str = '   ';
    const res = isRealString(str);
    expect(res).toBe(false);
  });

  it('should allow strings with non-space characters', () => {
    const str = 'LOTR';
    const res = isRealString(str);
    expect(res).toBe(true);
  });
});
