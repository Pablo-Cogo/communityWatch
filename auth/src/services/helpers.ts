export default class HelperService {
  public static onlyNumbers(value: string): string {
    if (value) return value.toString().replace(/\D/g, '');
    return value;
  }

  public static onlyLetters(value: string): string {
    return value
      .toString()
      .replace(/[^a-zA-Z]/g, '')
      .trim();
  }

  public static isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  }

  public static containsOnlyLetters(value: string): boolean {
    const lettersOnlyPattern = /^[a-zA-Z\s]+$/;
    return lettersOnlyPattern.test(value);
  }

  public static hasFourConsecutiveSameChars(value: string): boolean {
    const consecutivePattern = /(.)\1{3}/;
    return consecutivePattern.test(value);
  }

  public static isValidateCPF(cpf: string): boolean {
    const cpfNumber = this.onlyNumbers(cpf);

    if (cpfNumber.length !== 11) {
      return false;
    }

    if (/^(\d)\1{10}$/.test(cpfNumber)) {
      return false;
    }

    let sum = 0;
    let remainder = 0;

    for (let i = 1; i <= 9; i++) {
      sum += parseInt(cpfNumber[i - 1]) * (11 - i);
    }

    remainder = (sum * 10) % 11;

    if (remainder === 10 || remainder === 11) {
      remainder = 0;
    }

    if (remainder !== parseInt(cpfNumber[9])) {
      return false;
    }

    sum = 0;

    for (let i = 1; i <= 10; i++) {
      sum += parseInt(cpfNumber[i - 1]) * (12 - i);
    }

    remainder = (sum * 10) % 11;

    if (remainder === 10 || remainder === 11) {
      remainder = 0;
    }

    if (remainder !== parseInt(cpfNumber[10])) {
      return false;
    }

    return true;
  }
}
