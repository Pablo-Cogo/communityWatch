import { masks } from "../masks";

export default class HelperService {
  public static isValidateCPF(cpf: string): boolean {
    const cpfNumber = masks.number(cpf);

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
