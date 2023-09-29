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
      columnNotShow: true,
    },
    {
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
      Cobrade: "123",
      Nome: "abc",
    },
    {
      Id: "2",
      Cobrade: "123",
      Nome: "abc",
    },
    {
      Id: "2",
      Cobrade: "123",
      Nome: "abc",
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
