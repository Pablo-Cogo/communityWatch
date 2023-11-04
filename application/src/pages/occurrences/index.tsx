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
import { useEffect, useState } from "react";
import OccurrenceService from "../../services/occurrence.service";
import { OccurrenceStatus } from "../../types/occurrence";

const Occurrences = () => {
  const navigate = useNavigate();
  const [RowsData, setRowsData] = useState<Occurrence[] | null>(null);

  const ButtonsGrid: GridButtonProps[] = [
    {
      title: "carregar registros",
      action: (id) => console.log(id),
      inToolbar: true,
      icon: faRotate,
    },
    {
      icon: faAdd,
      action: () => navigate(`add`),
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
      action: (id) => navigate(`edit/${id}`),
    },
    {
      icon: faTrashCan,
      title: "Deletar",
      action: (id) => navigate(`${id}`),
    },
  ];

  const ColumnsGrid: Column<Occurrence>[] = [
    {
      columnNotShow: true,
      name: "Id",
      column: "id",
    },
    {
      name: "Código",
      column: "code",
      width: "10%",
      orderBy: true,
    },
    {
      name: "Descrição",
      width: "40%",
      column: "occurrenceDescription",
    },
    {
      name: "Cod. Cobrade",
      width: "15%",
      column: "occurrenceCobradeCode",
    },
    {
      name: "Status",
      width: "15%",
      column: "occurrenceStatus",
    },
    {
      name: "Data inicial",
      width: "20%",
      column: "occurrenceInitialDate",
    },
    {
      showOnlySelector: true,
      name: "Data Final",
      width: "20%",
      column: "occurrenceFinalDate",
    },
  ];

  const filterBySatus = (status: OccurrenceStatus) => {
    switch (status) {
      case OccurrenceStatus.Aberto:
        return <div>🟢 Aberto</div>;
      case OccurrenceStatus.Processando:
        return <div>🟡 Processando</div>;
      case OccurrenceStatus.Fechado:
        return <div>🔴 Fechado</div>;
    }
  };

  useEffect(() => {
    const getOccurrences = async () => {
      const occurrences = await OccurrenceService.getAllOccurrences();
      setRowsData(
        occurrences.map((el, i) => {
          return {
            ...el,
            code: (i + 1).toString(),
            occurrenceStatus: {
              [el.occurrenceStatus]: filterBySatus(el.occurrenceStatus),
            },
            occurrenceInitialDate: Format.date.default(
              new Date(el.occurrenceInitialDate)
            ),
            occurrenceFinalDate:
              el.occurrenceFinalDate &&
              Format.date.default(new Date(el.occurrenceFinalDate)),
          };
        })
      );
    };
    getOccurrences();
  }, []);

  return (
    <Card title="Ocorrências">
      {RowsData && (
        <Grid
          gridId="Occurrences"
          gridButtonProps={ButtonsGrid}
          columns={ColumnsGrid}
          rows={RowsData}
          configGrid={{ colPrimary: "id" }}
        />
      )}
    </Card>
  );
};

export default Occurrences;
