import { validateEmail, validateBody } from './validation';

describe('validation', () => {
  describe('validateEmail()', () => {
    const testCases = [
      ['pass', 'user@mail.com', true],
      ['pass', 'user12@mail12.com', true],
      ['pass', 'user12@mail12.domain.com', true],
      ['fails', 'user12@mail12.', false],
      ['fails', '@mail12.com', false],
      ['fails', 'user@.com', false] as any,
    ];

    it.each(testCases)('%s email %s', (_, email: string, expectedValue: boolean) => {
      expect(validateEmail(email)).toBe(expectedValue);
    });
  });

  describe('validateBody()', () => {
    const email = 'user@mail.com';
    it('returns false for empty familyName', () => {
      const body = {
        email,
        familyName: '',
        givenName: 'Smith',
      }
      expect(validateBody(body)).toBeFalsy();
    });

    it('returns false for empty givenName', () => {
      const body = {
        email,
        familyName: 'John',
        givenName: '',
      }
      expect(validateBody(body)).toBeFalsy();
    });

    it('returns true for correct data', () => {
      const body = {
        email,
        familyName: 'John',
        givenName: 'Smith',
      }
      expect(validateBody(body)).toBeTruthy();
    });
  });
});
