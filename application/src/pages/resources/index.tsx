import {
  faAdd,
  faPencil,
  faRotate,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import Card from "../../components/molecules/card";
import Grid from "../../components/molecules/grid";
import { Column, GridButtonProps } from "../../components/molecules/grid/types";
import { masks } from "../../helpers/masks";
import { Resource } from "./types";
import { useNavigate } from "react-router-dom";
import ResourceService from "../../services/resouce.service";
import { useEffect, useState } from "react";
import ServiceLocator from "../../services/service.locator";

const Resources = () => {
  const toastService = ServiceLocator.getToastService();
  const navigate = useNavigate();
  const [RowsData, setRowsData] = useState<Resource[] | null>(null);

  const getResources = async () => {
    const resources = await ResourceService.getAllResources();
    setRowsData(
      resources.map((el, i) => {
        return {
          ...el,
          resourcePrice: "R$ " + masks.valMask(el.resourcePrice.toString()),
          resourceQuantity: masks.float(el.resourceQuantity.toString()),
          resourceReserved: masks.float((el.resourceReserved ?? 0).toString()),
        };
      })
    );
  };

  const deleteResource = async (id: string) => {
    if (id) {
      const isDeleted = await ResourceService.deleteResource(id);
      if (isDeleted) {
        getResources();
        toastService.addSuccessToast("Recurso deletado com sucesso.");
      }
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
      action: (id) => navigate(`add`),
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
      action: (id) => deleteResource(`${id}`),
    },
  ];

  const ColumnsGrid: Column<Resource>[] = [
    {
      columnNotShow: true,
      name: "Id",
      column: "id",
    },
    {
      name: "Nome",
      column: "resourceName",
      orderBy: true,
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
      name: "Recursos reservados",
      column: "resourceReserved",
    },
  ];

  useEffect(() => {
    getResources();
  }, []);

  return (
    <Card title="Recursos">
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

export default Resources;
