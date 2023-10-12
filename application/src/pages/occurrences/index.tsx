import {
  faAdd,
  faPencil,
  faRotate,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import Card from "../../components/molecules/card";
import Grid from "../../components/molecules/grid";
import { Column, GridButtonProps } from "../../components/molecules/grid/types";
import { Occurrence } from "./types";
import { Format } from "../../helpers/format";
import { useNavigate } from "react-router-dom";

const Occurrences = () => {
  const navigate = useNavigate();
  const ButtonsGrid: GridButtonProps[] = [
    {
      title: "carregar registros",
      action: (id) => console.log(id),
      inToolbar: true,
      icon: faRotate,
    },
    {
      icon: faAdd,
      action: (id) => console.log(id),
      title: "Inserir",
      inToolbar: true,
    },
    {
      icon: faTrashCan,
      action: (id) => console.log(id),
      title: "Deletar em lote",
      inToolbar: true,
    },
    {
      icon: faPencil,
      title: "Editar",
      action: (id) => navigate(`${id}`),
    },
    {
      icon: faTrashCan,
      title: "Deletar",
      action: (id) => navigate(`${id}`),
    },
  ];

  const ColumnsGrid: Column<Occurrence>[] = [
    {
      name: "Código",
      column: "Id",
      orderBy: false,
    },
    {
      showOnlySelector: true,
      name: "Descrição",
      column: "occurrenceDescription",
    },
    {
      name: "Cod. Cobrade",
      column: "occurrenceCobradeCode",
    },
    {
      name: "Status",
      column: "occurrenceStatus",
    },
    {
      name: "Data inicial",
      column: "occurrenceInitialDate",
    },
    {
      name: "Data Final",
      column: "occurrenceFinalDate",
    },
  ];

  const RowsData: Occurrence[] = [
    {
      Id: "1",
      occurrenceDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      occurrenceCobradeCode: "1.5.1.4.0",
      occurrenceStatus: "🟢 Aberto",
      occurrenceInitialDate: Format.date.default( new Date(2023, 9, 10)),
      occurrenceFinalDate: Format.date.default( new Date(2023, 9, 10))
    },
    {
      Id: "2",
      occurrenceDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      occurrenceCobradeCode: "2.2.2.2.0",
      occurrenceStatus: "🔴 Fechado",
     occurrenceInitialDate: Format.date.default( new Date(2023, 9, 10)),
      occurrenceFinalDate: Format.date.default( new Date(2023, 9, 10))
    },
    {
      Id: "3",
      occurrenceDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      occurrenceCobradeCode: "1.5.1.4.0",
      occurrenceStatus: "🟢 Aberto",
     occurrenceInitialDate: Format.date.default( new Date(2023, 9, 10)),
      occurrenceFinalDate: Format.date.default( new Date(2023, 9, 10))
    },
    {
      Id: "4",
      occurrenceDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      occurrenceCobradeCode: "2.1.2.1.0",
      occurrenceStatus: "🔴 Fechado",
     occurrenceInitialDate: Format.date.default( new Date(2023, 9, 10)),
      occurrenceFinalDate: Format.date.default( new Date(2023, 9, 10))
    },
    {
      Id: "5",
      occurrenceDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      occurrenceCobradeCode: "2.2.2.2.0",
      occurrenceStatus: "🟢 Aberto",
     occurrenceInitialDate: Format.date.default( new Date(2023, 9, 10)),
      occurrenceFinalDate: Format.date.default( new Date(2023, 9, 10))
    },
    {
      Id: "6",
      occurrenceDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      occurrenceCobradeCode: "2.5.5.0.0",
      occurrenceStatus: "🟢 Aberto",
     occurrenceInitialDate: Format.date.default( new Date(2023, 9, 10)),
      occurrenceFinalDate: Format.date.default( new Date(2023, 9, 10))
    },
    {
      Id: "7",
      occurrenceDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      occurrenceCobradeCode: "1.5.1.4.0",
      occurrenceStatus: "🔴 Fechado",
     occurrenceInitialDate: Format.date.default( new Date(2023, 9, 10)),
      occurrenceFinalDate: Format.date.default( new Date(2023, 9, 10))
    },
    {
      Id: "8",
      occurrenceDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      occurrenceCobradeCode: "2.2.2.2.0",
      occurrenceStatus: "🟢 Aberto",
     occurrenceInitialDate: Format.date.default( new Date(2023, 9, 10)),
      occurrenceFinalDate: Format.date.default( new Date(2023, 9, 10))
    },
    {
      Id: "9",
      occurrenceDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      occurrenceCobradeCode: "2.4.2.0.0",
      occurrenceStatus: "🟢 Aberto",
     occurrenceInitialDate: Format.date.default( new Date(2023, 9, 10)),
      occurrenceFinalDate: Format.date.default( new Date(2023, 9, 10))
    },
    {
      Id: "10",
      occurrenceDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      occurrenceCobradeCode: "2.5.5.0.0",
      occurrenceStatus: "🟡 Processando",
     occurrenceInitialDate: Format.date.default( new Date(2023, 9, 10)),
      occurrenceFinalDate: Format.date.default( new Date(2023, 9, 10))
    },
    {
      Id: "11",
      occurrenceDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      occurrenceCobradeCode: "2.4.2.0.0",
      occurrenceStatus: "🟡 Processando",
     occurrenceInitialDate: Format.date.default( new Date(2023, 9, 10)),
      occurrenceFinalDate: Format.date.default( new Date(2023, 9, 10))
    },
  ];

  return (
    <Card title="Ocorrências">
      <Grid
        gridId="Occurrences"
        gridButtonProps={ButtonsGrid}
        columns={ColumnsGrid}
        rows={RowsData}
      />
    </Card>
  );
};

export default Occurrences;
