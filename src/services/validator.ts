import { EmailError, PasswordError } from '@/global/constatnts'

export default class Validator {
  public errorsEmail: EmailError[] = []
  public errorsPassword: PasswordError[] = []
  private emailFormat = new RegExp(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
  private emailDomain = new RegExp(/^\s*[^\s@]+@[^\s@]+\.[^\s@]{2,}\s?$/)
  private hasUppercase = new RegExp(/[A-Z]/)
  private hasLowercase = new RegExp(/[a-z]/)
  private hasDigit = new RegExp(/\d/)
  private hasSpecial = new RegExp(/^(?=.*[!@#$%^&*()+=._-])/)

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
}
