import HelperService from '../helpers';

describe('helpers unities tests', () => {
  it('should verify onlyNumbers', () => {
    const string = 'abc qwerty 123';
    const onlyNumbers = HelperService.onlyNumbers(string);
    expect(onlyNumbers).toEqual('123');
  });

  it('should verify onlyLetters', () => {
    const string = 'abc 123 !@#';
    const onlyLetters = HelperService.onlyLetters(string);
    expect(onlyLetters).toEqual('abc');
  });

  it('should verify isValidUrl: sucess case', () => {
    const string =
      'https://lh3.googleusercontent.com/a/AATXAJx9PKJ1hc02Vq927bNpMk0UKFwkbncy_bJLvh_i=s100';
    const isValid = HelperService.isValidUrl(string);
    expect(isValid).toBeTruthy();
  });

  it('should verify isValidUrl: fail case', () => {
    const string = 'invalid url';
    const isValid = HelperService.isValidUrl(string);
    expect(isValid).toBeFalsy();
  });

  it('should verify containsOnlyLetters: sucess case', () => {
    const string = 'only letters';
    const isValid = HelperService.containsOnlyLetters(string);
    expect(isValid).toBeTruthy();
  });

  it('should verify containsOnlyLetters: fail case', () => {
    const string = 'with non letters 123 !@#';
    const isValid = HelperService.containsOnlyLetters(string);
    expect(isValid).toBeFalsy();
  });

  it('should verify hasFourConsecutiveSameChars: sucess case', () => {
    const string = 'casa qwerty aaaa';
    const isValid = HelperService.hasFourConsecutiveSameChars(string);
    expect(isValid).toBeTruthy();
  });

  it('should verify hasFourConsecutiveSameChars: fail case', () => {
    const string = 'with non consecutive chars 123 !@#';
    const isValid = HelperService.hasFourConsecutiveSameChars(string);
    expect(isValid).toBeFalsy();
  });

  it('should verify isValidateCPF: sucess case', () => {
    const string = '456.734.470-78';
    const isValid = HelperService.isValidateCPF(string);
    expect(isValid).toBeTruthy();
  });

  it('should verify isValidateCPF: fail case', () => {
    const string = '123.456.789-12';
    const isValid = HelperService.isValidateCPF(string);
    expect(isValid).toBeFalsy();
  });
});
