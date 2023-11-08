import { faAdd, faPencil, faRotate, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import Card from '../../components/molecules/card';
import Grid from '../../components/molecules/grid';
import { Column, GridButtonProps } from '../../components/molecules/grid/types';
import { masks } from '../../helpers/masks';
import { Resource } from './types';
import { useNavigate } from 'react-router-dom';

const Resources = () => {
  const navigate = useNavigate();

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
      action: (id) => navigate(`${id}`),
    },
    {
      icon: faTrashCan,
      title: "Deletar",
      action: (id) => navigate(`${id}`),
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
    }
  ]

  const RowsData: Resource[] = [
    {
      id: "1",
      resourceName: "Material 1",
      resourcePrice: "R$ " + masks.valMask("10.51"),
      resourceQuantity: masks.float("113.2"),
    },
    {
      id: "2",
      resourceName: "Material 2",
      resourcePrice: "R$ " + masks.valMask("140.54"),
      resourceQuantity: masks.float("24.2"),
    },
    {
      id: "3",
      resourceName: "Material 3",
      resourcePrice: "R$ " + masks.valMask("84.21"),
      resourceQuantity: masks.float("542.2"),
    },
    {
      id: "4",
      resourceName: "Material 4",
      resourcePrice: "R$ " + masks.valMask("54.67"),
      resourceQuantity: masks.float("785.9"),
    },
    {
      id: "5",
      resourceName: "Material 5",
      resourcePrice: "R$ " + masks.valMask("5.74"),
      resourceQuantity: masks.float("21.5"),
    },
    {
      id: "6",
      resourceName: "Material 6",
      resourcePrice: "R$ " + masks.valMask("5.14"),
      resourceQuantity: masks.float("454.9"),
    },
    {
      id: "7",
      resourceName: "Material 7",
      resourcePrice: "R$ " + masks.valMask("10.51"),
      resourceQuantity: masks.float("2.4"),
    },
    {
      id: "8",
      resourceName: "Material 8",
      resourcePrice: "R$ " + masks.valMask("13.51"),
      resourceQuantity: masks.float("10.8"),
    }
  ]


  return (
    <Card title="Recursos">
      <Grid
        gridId="Occurrences"
        gridButtonProps={ButtonsGrid}
        columns={ColumnsGrid}
        rows={RowsData}
      />
    </Card>
  );
}

export default Resources