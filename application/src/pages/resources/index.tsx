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
      id: 1,
      resourceName: "Produto",
      resourcePrice: "R$ " + masks.valMask("10.51"),
      resourceQuantity: masks.float("113.2"),
    },
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