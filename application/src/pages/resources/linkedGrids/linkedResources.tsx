import React, { useEffect, useState } from "react";
import Grid from "../../../components/molecules/grid";
import {
  Column,
  GridButtonProps,
} from "../../../components/molecules/grid/types";
import { LinkedGridProps, Resource } from "../types";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import OccurrenceService from "../../../services/occurrence.service";
import { useParams } from "react-router-dom";
import { masks } from "../../../helpers/masks";
import ResourceService from "../../../services/resouce.service";

const LinkedResourcesGrid = ({ changeGrid, change }: LinkedGridProps) => {
  const { id } = useParams();
  const [RowsData, setRowsData] = useState<Resource[] | null>(null);

  const getResourcesLinked = async () => {
    const resources =
      await OccurrenceService.getResourcesLinkedWithOccurrenceId(id ?? "");
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

  const unlinkResource = async (resourceIds: string | string[]) => {
    if (Array.isArray(resourceIds)) {
      await Promise.all(
        resourceIds.map(async (el) => {
          await ResourceService.unlinkResouceWithOccurrence(
            id ?? "",
            el.toString()
          );
        })
      );
    } else {
      await ResourceService.unlinkResouceWithOccurrence(
        id ?? "",
        resourceIds.toString()
      );
    }
    change();
  };

  useEffect(() => {
    getResourcesLinked();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [changeGrid]);

  const ButtonsGrid: GridButtonProps[] = [
    {
      icon: faAdd,
      action: (id) => {
        unlinkResource(id);
      },
      title: "Desvincular",
      text: "Desvincular",
      inToolbar: true,
    },
  ];
  const ColumnsGrid: Column<Resource>[] = [
    {
      columnNotShow: true,
      name: "Código",
      column: "id",
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
  ];
  return (
    <>
      {RowsData && (
        <Grid
          gridId="LinkedResourcesGrid"
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

export default LinkedResourcesGrid;
