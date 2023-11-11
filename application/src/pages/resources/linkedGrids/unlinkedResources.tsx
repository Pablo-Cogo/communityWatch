import React, { useEffect, useState } from "react";
import {
  Column,
  GridButtonProps,
} from "../../../components/molecules/grid/types";
import { LinkedGridProps, Resource } from "../types";
import Grid from "../../../components/molecules/grid";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import ResourceService from "../../../services/resouce.service";
import { useParams } from "react-router-dom";
import { masks } from "../../../helpers/masks";

const UnlinkedResourcesGrid = ({ changeGrid, change }: LinkedGridProps) => {
  const { id } = useParams();
  const [RowsData, setRowsData] = useState<Resource[] | null>(null);

  const getResourcesUnlinked = async () => {
    const resources = await ResourceService.getUnlinkedResourcesByOccurenceId(
      id ?? ""
    );
    setRowsData(
      resources.map((el) => {
        return {
          ...el,
          resourcePrice: "R$ " + masks.valMask(el.resourcePrice.toString()),
          resourceQuantity: masks.float(el.resourceQuantity.toString()),
          resourceReserved: masks.float((el.resourceReserved ?? 0).toString()),
        };
      })
    );
  };

  const linkResource = async (resourceIds: string | string[]) => {
    if (Array.isArray(resourceIds)) {
      await Promise.all(
        resourceIds.map(async (el) => {
          await ResourceService.linkResouceWithOccurrence(
            id ?? "",
            el.toString()
          );
        })
      );
    } else {
      await ResourceService.linkResouceWithOccurrence(
        id ?? "",
        resourceIds.toString()
      );
    }
    change();
  };

  useEffect(() => {
    getResourcesUnlinked();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [changeGrid]);

  const ButtonsGrid: GridButtonProps[] = [
    {
      icon: faAdd,
      action: (id) => {
        linkResource(id);
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
      columnNotShow: true,
    },
    {
      name: "Recurso",
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
    {
      showOnlySelector: true,
      name: "Quantidade reservada",
      column: "resourceReserved",
    },
  ];
  return (
    <>
      {RowsData && (
        <Grid
          gridId="UnlinkedResourcesGrid"
          columns={ColumnsGrid}
          rows={RowsData}
          gridButtonProps={ButtonsGrid}
          configGrid={{
            colPrimary: "id",
            buttonsDownload: false,
          }}
        />
      )}
    </>
  );
};

export default UnlinkedResourcesGrid;
