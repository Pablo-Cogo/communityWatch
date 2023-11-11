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
import ServiceLocator from "../../services/service.locator";

const Occurrences = () => {
  const navigate = useNavigate();
  const toastService = ServiceLocator.getToastService();

  const [RowsData, setRowsData] = useState<Occurrence[] | null>(null);

  const getOccurrences = async () => {
    const occurrences = await OccurrenceService.getAllOccurrences();
    setRowsData(
      occurrences.map((el, i) => {
        return {
          ...el,
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

  const deleteOccurrence = async (id: string) => {
    console.log(id);
    const response = await OccurrenceService.deleteOccurrence(id);
    if (response) {
      await getOccurrences();
      toastService.addSuccessToast("Ocorrencia deletada com sucesso!");
    }
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
      action: (id) => deleteOccurrence(`${id}`),
    },
  ];

  const ColumnsGrid: Column<Occurrence>[] = [
    {
      columnNotShow: true,
      name: "Id",
      column: "id",
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
    getOccurrences();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
