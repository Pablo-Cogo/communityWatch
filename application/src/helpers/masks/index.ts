export const masks = {
  text: (value: string): string => {
    value = value.toString();
    return value
      .replace(/\d/g, "")
      .replace(/[["'!@#$%¨&*()_+={}\]ªº?°:;.,<>\\|\/-]/g, "");
  },

  textNumber: (value: string): string => {
    value = value.toString();
    return value.replace(/[["'!@#$%¨*()_+={}\]:;.,<>\\|\/-]/g, "");
  },

  number: (value: string): string => {
    value = value.toString();
    return value.replace(/\D/g, "");
  },

  numberWithNegative: (value: string): string => {
    let hasNegative = false;
    value = value.toString();
    if (value.split("")[0] === "-") {
      hasNegative = true;
    }
    value = value.replace(/\D/g, "");
    if (hasNegative) {
      return `-${value}`;
    }
    return value;
  },

  float: (value: string): string => {
    value = value.toString();
    value = value.replace(".", ",");
    if (value.split(",").length > 2) {
      return value.replace(",", "");
    }
    return value.replace(/[^0-9,]/g, "");
  },

  codMask: (value: string): string => {
    value = value.toString();
    return value
      .replace(/\D/g, "")
      .replace(/(\d{1})(\d)/, "$1 $2")
      .replace(/(\d{6})(\d)/, "$1 $2")
      .replace(/( \d{6})\d+?$/, "$1");
  },

  cpfMask: (value: string): string => {
    value = value.toString();
    return value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1");
  },

  cnpjMask: (value: string): string => {
    value = value.toString();
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1/$2")
      .replace(/(\d{4})(\d)/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1");
  },

  phoneMask: (value: string): string => {
    value = value.toString();
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1)$2")
      .replace(/(\d{5})(\d{4})/g, "$1-$2")
      .replace(/(\d{4})(\d{4})/, "$1-$2")
      .replace(/(-\d{4})\d+?$/, "$1");
  },

  cepMask: (value: string): string => {
    value = value.toString();
    return value
      .replace(/\D/g, "")
      .replace(/(\d{5})(\d)/g, "$1-$2")
      .replace(/(-\d{3})\d+?$/, "$1");
  },

  residence: (value: string): string => {
    value = value.toString();
    return value
      .replace(/[["'!@#$%¨&*()_+={}\]ªº?°:;.,<>\\|\/-]/g, "")
      .replace(/(\D{1})\D+?$/, "$1")
      .replace(/(\D{1})\d+?$/, "$1");
  },

  dataMask: (value: string): string => {
    value = value.toString();
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "$1/$2") // Coloca uma barra entre o segundo e o terceiro dígitos
      .replace(/(\d{2})(\d)/, "$1/$2") // Coloca uma barra entre o oitavo e o nono dígitos
      .replace(/(\d{4})\d+?$/, "$1"); // Coloca um hífen depois do bloco de quatro dígitos
  },

  resetDataMask: (value: string | string[]): string => {
    value = value.toString();
    value = value.split("/");
    if (
      value[0] !== undefined &&
      value[1] !== undefined &&
      value[2] !== undefined
    ) {
      value = value[2] + "-" + value[1] + "-" + value[0];
    } else if (value[0] !== undefined && value[1] !== undefined) {
      value = value[1] + "-" + value[0];
    } else if (value[0] !== undefined) {
      value = value[0];
    } else {
      value = "";
    }
    return value;
  },

  qtdeMask: (value: string): string => {
    value = value.toString();
    return value
      .replace(/\D/g, "")
      .replace(/(.\d{9})\d+?$/, "$1")
      .replace(/(\d)(\d{9})$/, "$1.$2")
      .replace(/(\d)(\d{6})$/, "$1.$2")
      .replace(/(\d)(\d{3})$/, "$1.$2");
  },

  qtdeMaskWithNegative: (value: string): string => {
    value = masks.numberWithNegative(value);
    return value
      .replace(/(.\d{9})\d+?$/, "$1")
      .replace(/(\d)(\d{9})$/, "$1.$2")
      .replace(/(\d)(\d{6})$/, "$1.$2")
      .replace(/(\d)(\d{3})$/, "$1.$2");
  },

  resetQtdeMask: (value: string): string => {
    value = value.toString();
    return value.replace(/\D/g, "").replace(".", "");
  },

  valMask: (value: string): string => {
    value = value.toString();
    return value
      .replace(/\D/g, "")
      .replace(/(.\d{8})\d+?$/, "$1")
      .replace(/(\d)(\d{8})$/, "$1.$2")
      .replace(/(\d)(\d{5})$/, "$1.$2")
      .replace(/(\d{1})(\d{1,2})$/, "$1,$2");
  },

  resetValMask: (value: string): string => {
    value = value.toString();
    return value
      .replace(/\D/g, "")
      .replace(",", "")
      .replace(".", "")
      .replace("-", "-")
      .replace(/(\d{1})(\d{1,2})$/, "$1.$2");
  },

  resetFloatMask: (value: string): string => {
    value = value.toString();
    return value
      .replace(/[^0-9,]/g, "")
      .replace(",", ".")
      .replace(" ", "")
      .replace("/", "")
      .replace("-", "");
  },

  resetMask: (value: string): string => {
    value = value.toString();
    return value
      .replace(/\D/g, "") // permite digitar apenas número
      .replace(".", "")
      .replace(" ", "")
      .replace("/", "")
      .replace("-", "");
  },
};
