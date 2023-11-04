import React from "react";
import Grid from "../../../components/molecules/grid";
import {
  Column,
  GridButtonProps,
} from "../../../components/molecules/grid/types";
import { Resource } from "../types";
import { faAdd } from "@fortawesome/free-solid-svg-icons";

const LinkedResourcesGrid = () => {
  const ButtonsGrid: GridButtonProps[] = [
    {
      icon: faAdd,
      action: (id) => {
        console.log(id);
      },
      title: "Desvincular",
      text: "Desvincular",
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
      gridId="LinkedResourcesGrid"
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

export default LinkedResourcesGrid;
