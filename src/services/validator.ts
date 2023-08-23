import { Countries, EmailError, PasswordError } from '@/global/constatnts'

export default class Validator {
  public errorsEmail: EmailError[] = []
  public errorsPassword: PasswordError[] = []
  private emailFormat = new RegExp(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
  private emailDomain = new RegExp(/^\s*[^\s@]+@[^\s@]+\.[^\s@]{2,}\s?$/)
  private hasUppercase = new RegExp(/[A-Z]/)
  private hasLowercase = new RegExp(/[a-z]/)
  private hasDigit = new RegExp(/\d/)
  private hasSpecial = new RegExp(/^(?=.*[!@#$%^&*()+=._-])/)
  private onlyLetters = new RegExp(/^[a-zA-Zа-яА-Я]+$/)
  private postalCodeUSSR = new RegExp(/^\d{6}$/)
  private postalCodeGerFrItSp = new RegExp(/^\d{5}$/)
  private postalCodeUK = new RegExp(/^[a-zA-Z]{1,2}[0-9][a-zA-Z0-9]? ?[0-9][a-zA-Z]{2}$/)
  private postalCodePoland = new RegExp(/^\d{2}[- ]?\d{3}$/)

  public validateEmail(email: string) {
    this.errorsEmail = []
    if (!email) this.errorsEmail.push(EmailError.REQUIRED)
    if (!this.emailFormat.test(email)) this.errorsEmail.push(EmailError.FORMAT)
    if (email.trim() !== email) this.errorsEmail.push(EmailError.WHITESPACE)
    if (!this.emailDomain.test(email)) this.errorsEmail.push(EmailError.DOMAIN)
    if (!email.includes('@')) this.errorsEmail.push(EmailError.SYMBOL)
  }
  validatePassword(password: string) {
    this.errorsPassword = []
    if (!password) this.errorsPassword.push(PasswordError.REQUIRED)
    if (password.length < 8) this.errorsPassword.push(PasswordError.LENGTH)
    if (!this.hasUppercase.test(password)) this.errorsPassword.push(PasswordError.UPPERCASE)
    if (!this.hasLowercase.test(password)) this.errorsPassword.push(PasswordError.LOWERCASE)
    if (!this.hasDigit.test(password)) this.errorsPassword.push(PasswordError.DIGIT)
    if (!this.hasSpecial.test(password)) this.errorsPassword.push(PasswordError.SPECIAL_CHARACTER)
    if (password.trim() !== password) this.errorsPassword.push(PasswordError.WHITESPACE)
  }
  validateOnlyLetters(str: string) {
    return this.onlyLetters.test(str)
  }

  validateAge(dateOfBirth: string) {
    return new Date().getFullYear() - new Date(dateOfBirth).getFullYear() >= 13
  }

  validateStreet(street: string) {
    return street.length > 0
  }

  validatePostalCode(country: string, code: string) {
    if (
      [<string>Countries.Russia, <string>Countries.Belarus, <string>Countries.Kazakhstan].indexOf(
        country
      ) >= 0
    ) {
      return this.postalCodeUSSR.test(code)
    }
    if (
      [
        <string>Countries.Germany,
        <string>Countries.France,
        <string>Countries.Italy,
        <string>Countries.Spain
      ].indexOf(country) >= 0
    ) {
      return this.postalCodeGerFrItSp.test(code)
    }
    if (country === Countries.UnitedKingdom) {
      return this.postalCodeUK.test(code)
    }
    if (country === Countries.Poland) {
      return this.postalCodePoland.test(code)
    }
    return true
  }
}
