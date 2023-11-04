import { faAdd, faRotate } from "@fortawesome/free-solid-svg-icons";
import Grid from "../../../components/molecules/grid";
import {
  Column,
  GridButtonProps,
} from "../../../components/molecules/grid/types";
import { masks } from "../../../helpers/masks";
import { Resource } from "../types";
import Card from "../../../components/molecules/card";
import Popup from "../../../components/molecules/popup";
import { useState } from "react";
import PopupLinkedGrids from "./popup";

const LinkedGrids = () => {
  const [openPopup, setOpenPopup] = useState(false);
  const ButtonsGrid: GridButtonProps[] = [
    {
      title: "carregar registros",
      action: (id) => console.log(id),
      inToolbar: true,
      icon: faRotate,
    },
    {
      icon: faAdd,
      action: (id) => {
        setOpenPopup(true);
        console.log(id);
      },
      title: "Vincular",
      text: "Vincular",
      inToolbar: true,
    },
  ];

  const ColumnsGrid: Column<Resource>[] = [
    {
      name: "Código",
      column: "id",
      orderBy: false,
    },
    {
      name: "Nome",
      column: "resourceName",
    },
    {
      name: "Preço",
      column: "resourcePrice",
    },
    {
      name: "Quantidade",
      column: "resourceQuantity",
    },
  ];

  const RowsData: Resource[] = [];

  return (
    <>
      <PopupLinkedGrids isOpen={openPopup} close={() => setOpenPopup(false)} />
      <Card title="Recursos vinculados à ocorrencia">
        <Grid
          gridId="Occurrences2"
          gridButtonProps={ButtonsGrid}
          columns={ColumnsGrid}
          rows={RowsData}
          configGrid={{
            colPrimary: "id",
            buttonsDownload: false,
          }}
        />
      </Card>
    </>
  );
};

export default LinkedGrids;
