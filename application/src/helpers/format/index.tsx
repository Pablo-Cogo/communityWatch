import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

interface IDateUtil {
  default: (data: Date) => string;
  day: (day: Date | number) => string;
  month: (month: Date | number) => string;
  complete: (data: Date) => string;
}

const DateUtil: IDateUtil = {
  default: (data: Date) => {
    return format(data, "dd/MM/yyyy", {
      locale: ptBR,
    });
  },

  day: (day: Date | number) => {
    if (day instanceof Date) {
      day = day.getDay();
    }

    const dataFormatada = format(new Date(0, 0, day + 1), "EEEE", {
      locale: ptBR,
    });

    return dataFormatada.charAt(0).toUpperCase() + dataFormatada.slice(1);
  },

  month: (data: Date | number) => {
    if (data instanceof Date) {
      data = data.getMonth();
    }

    const dataFormatada = format(new Date(0, data, 1), "MMMM", {
      locale: ptBR,
    });

    return dataFormatada.charAt(0).toUpperCase() + dataFormatada.slice(1);
  },

  complete: (data: Date) => {
    const dataFormatada = format(data, "EEEE, d 'de' MMMM 'de' yyyy'.'", {
      locale: ptBR,
    });

    return dataFormatada.charAt(0).toUpperCase() + dataFormatada.slice(1);
  },
};

export const Format = {
  date: DateUtil,
};
