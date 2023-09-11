import { test, expect, describe } from 'vitest'
import Validator from '../../src/services/validator'
import { Countries, EmailError, PasswordError } from '../../src/global/constatnts'

describe('Validator', () => {
  const validator = new Validator()

  describe('validateEmail', () => {
    test('valid email', () => {
      validator.validateEmail('usere@xample.com')
      expect(validator.errorsEmail).toEqual([])
    })

    test('invalid email', () => {
      validator.validateEmail('user@')
      expect(validator.errorsEmail).toEqual([EmailError.FORMAT, EmailError.DOMAIN])
    })

    test('empty email', () => {
      validator.validateEmail('')
      expect(validator.errorsEmail).toEqual([
        EmailError.REQUIRED,
        EmailError.FORMAT,
        EmailError.DOMAIN,
        EmailError.SYMBOL
      ])
    })

    test('email with whitespace', () => {
      validator.validateEmail(' user@example.com ')
      expect(validator.errorsEmail).toEqual([EmailError.FORMAT, EmailError.WHITESPACE])
    })
  })

  describe('validatePassword', () => {
    test('valid password', () => {
      validator.validatePassword('P@ssw0rd!')
      expect(validator.errorsPassword).toEqual([])
    })

    test('invalid password', () => {
      validator.validatePassword('pass')
      expect(validator.errorsPassword).toEqual([
        PasswordError.LENGTH,
        PasswordError.UPPERCASE,
        PasswordError.DIGIT,
        PasswordError.SPECIAL_CHARACTER
      ])
    })

    test('empty password', () => {
      validator.validatePassword('')
      expect(validator.errorsPassword).toEqual([
        PasswordError.REQUIRED,
        PasswordError.LENGTH,
        PasswordError.UPPERCASE,
        PasswordError.LOWERCASE,
        PasswordError.DIGIT,
        PasswordError.SPECIAL_CHARACTER
      ])
    })

    test('password with whitespace', () => {
      validator.validatePassword(' P@ssw0rd! ')
      expect(validator.errorsPassword).toEqual([PasswordError.WHITESPACE])
    })
  })

  describe('validateOnlyLetters', () => {
    test('valid string', () => {
      expect(validator.validateOnlyLetters('Hello')).toBe(true)
      expect(validator.validateOnlyLetters('Привет')).toBe(true)
    })

    test('invalid string', () => {
      expect(validator.validateOnlyLetters('Hello123')).toBe(false)
      expect(validator.validateOnlyLetters('Привет!')).toBe(false)
    })
  })

  describe('validateAge', () => {
    test('valid age', () => {
      expect(validator.validateAge('2010-01-01')).toBe(true)
    })

    test('invalid age', () => {
      expect(validator.validateAge('2020-01-01')).toBe(false)
    })
  })

  describe('validateStreet', () => {
    test('valid street', () => {
      expect(validator.validateStreet('Main Street')).toBe(true)
    })

    test('invalid street', () => {
      expect(validator.validateStreet('')).toBe(false)
    })
  })

  describe('validatePostalCode', () => {
    test.each([
      [Countries.Russia, '123456'],
      [Countries.Belarus, '220000'],
      [Countries.Kazakhstan, '050000'],
      [Countries.Germany, '12345'],
      [Countries.France, '75000'],
      [Countries.Italy, '00100'],
      [Countries.Spain, '28001'],
      [Countries.UnitedKingdom, 'SW1A 1AA'],
      [Countries.Poland, '00-001']
    ])('valid postal code for %s', (country: string, code: string) => {
      expect(validator.validatePostalCode(country, code)).toBe(true)
    })

    test.each([
      [Countries.Russia, '12345'],
      [Countries.Belarus, '22000'],
      [Countries.Kazakhstan, '0500'],
      [Countries.Germany, '1234'],
      [Countries.France, '7500'],
      [Countries.Italy, '001'],
      [Countries.Spain, '2800'],
      [Countries.UnitedKingdom, 'SW1A AA'],
      [Countries.Poland, '00001T']
    ])('invalid postal code for %s', (country: string, code: string) => {
      expect(validator.validatePostalCode(country, code)).toBe(false)
    })
  })
})
