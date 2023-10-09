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

const Occurrences = () => {
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
      action: (id) => console.log(id),
    },
    {
      icon: faTrashCan,
      title: "Deletar",
      action: (id) => console.log(id),
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
      name: "Cobrade",
      column: "Cobrade",
    },
    {
      name: "Nome",
      column: "Nome",
    },
  ];

  const RowsData: Occurrence[] = [
    {
      Id: "1",
      Cobrade: "0710",
      Nome: "çéservé",
    },
    {
      Id: "2",
      Cobrade: "12,50",
      Nome: "communiqué",
    },
    {
      Id: "3",
      Cobrade: "123,0",
      Nome: "café",
    },
    {
      Id: "4",
      Cobrade: "123,0",
      Nome: "café",
    },
    {
      Id: "5",
      Cobrade: "123,0",
      Nome: "café",
    },
    {
      Id: "6",
      Cobrade: "123,0",
      Nome: "café",
    },
    {
      Id: "7",
      Cobrade: "123,0",
      Nome: "café",
    },
    {
      Id: "8",
      Cobrade: "123,0",
      Nome: "café",
    },
    {
      Id: "9",
      Cobrade: "123,0",
      Nome: "café",
    },
    {
      Id: "10",
      Cobrade: "123,0",
      Nome: "café",
    },
    {
      Id: "11",
      Cobrade: "123,0",
      Nome: "café",
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
