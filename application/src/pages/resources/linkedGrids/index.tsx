import { faAdd, faRotate } from "@fortawesome/free-solid-svg-icons";
import Grid from "../../../components/molecules/grid";
import {
  Column,
  GridButtonProps,
} from "../../../components/molecules/grid/types";
import { Resource } from "../types";
import Card from "../../../components/molecules/card";
import { useEffect, useState } from "react";
import PopupLinkedGrids from "./popup";
import OccurrenceService from "../../../services/occurrence.service";
import { useParams } from "react-router-dom";
import { masks } from "../../../helpers/masks";

const LinkedGrids = () => {
  const { id } = useParams();
  const [openPopup, setOpenPopup] = useState(false);
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
    {
      showOnlySelector: true,
      name: "Quantidade reservada",
      column: "resourceReserved",
    },
  ];

  useEffect(() => {
    getResourcesLinked();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openPopup]);

  return (
    <>
      <PopupLinkedGrids isOpen={openPopup} close={() => setOpenPopup(false)} />
      <Card title="Recursos vinculados à ocorrencia">
        {RowsData && (
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
        )}
      </Card>
    </>
  );
};

export default LinkedGrids;
