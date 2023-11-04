import React from "react";
import {
  Column,
  GridButtonProps,
} from "../../../components/molecules/grid/types";
import { Resource } from "../types";
import Grid from "../../../components/molecules/grid";
import { faAdd } from "@fortawesome/free-solid-svg-icons";

const UnlinkedResourcesGrid = () => {
  const ButtonsGrid: GridButtonProps[] = [
    {
      icon: faAdd,
      action: (id) => {
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
  return (
    <Grid
      gridId="UnlinkedResourcesGrid"
      columns={ColumnsGrid}
      rows={[]}
      gridButtonProps={ButtonsGrid}
      configGrid={{
        colPrimary: "id",
        buttonsDownload: false,
      }}
    />
  );
};

export default UnlinkedResourcesGrid;
