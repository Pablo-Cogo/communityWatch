import React, { useEffect, useState } from "react";
import { Row } from "../../components/atoms/Row/style";
import { Input } from "../../components/atoms/Input";
import Card from "../../components/molecules/card";
import { Button } from "../../components/atoms/Button";
import { ResourceForm, ResourceFormMask } from "./types";
import ResourceService from "../../services/resouce.service";
import { useNavigate, useParams } from "react-router-dom";
import ServiceLocator from "../../services/service.locator";
import { change } from "../../helpers/change";
import { masks } from "../../helpers/masks";
import { Resource } from "../../types/resource";

const ResourcesForm = () => {
  const navigate = useNavigate();
  const toastService = ServiceLocator.getToastService();
  const [values, setValues] = useState<ResourceForm | null>(null);
  const [valuesMask, setValuesMask] = useState<ResourceFormMask | null>(null);
  const { id } = useParams();
  const [resourceId, setResourceId] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const setResourceView = async () => {
        const resource = await ResourceService.getResourceById(id);
        if (!resource) {
          navigate(`/adm/occurrences/add`);
          toastService.addErrorToast("Ocorrência não encontrada.");
          return;
        }
        setResourceId(id);
        setValues({
          resourceName: resource.resourceName,
          resourcePrice: resource.resourcePrice.toString(),
          resourceQuantity: resource.resourceQuantity.toString(),
        });
        setValuesMask({
          resourcePrice: masks.valMask(resource.resourcePrice.toString()),
          resourceQuantity: masks.float(resource.resourceQuantity.toString()),
        });
      };
      setResourceView();
    } else {
      change.resetForm<ResourceForm>(setValues, "resourceName", null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    var resource: void | Resource;
    if (resourceId) {
      resource = await ResourceService.editResource(resourceId, {
        resourceName: values?.resourceName ?? "",
        resourcePrice: parseFloat(values?.resourcePrice ?? "0"),
        resourceQuantity: parseFloat(values?.resourceQuantity ?? "0"),
      });
      if (resource) {
        toastService.addSuccessToast("Recurso editado com sucesso.");
      }
    } else {
      resource = await ResourceService.registerResource({
        resourceName: values?.resourceName ?? "",
        resourcePrice: parseFloat(values?.resourcePrice ?? "0"),
        resourceQuantity: parseFloat(values?.resourceQuantity ?? "0"),
      });
      if (resource) {
        toastService.addSuccessToast("Recurso cadastrado com sucesso.");
      }
    }

    if (resource) {
      navigate(`/adm/resources`);
    }
  };
  return (
    <Card title="Recurso">
      <form onSubmit={submitForm}>
        <Row>
          <Input
            id={"resourceName"}
            label="Nome:"
            type="text"
            className="mt-3"
            val={values?.resourceName ?? ""}
            value={values?.resourceName ?? ""}
            onChange={(e) => change.valuesMask(e, setValues, masks.textNumber)}
          />
        </Row>
        <Row gtc={2} colgap="12px">
          <Input
            id={"resourcePrice"}
            label="Preço:"
            type="text"
            className="mt-3"
            val={valuesMask?.resourcePrice ?? ""}
            value={valuesMask?.resourcePrice ?? ""}
            onChange={(e) =>
              change.valuesMaskered(
                e,
                setValuesMask,
                setValues,
                masks.valMask,
                masks.resetValMask
              )
            }
          />
          <Input
            id={"resourceQuantity"}
            label="Quantidade:"
            type="text"
            className="mt-3"
            val={valuesMask?.resourceQuantity ?? ""}
            value={valuesMask?.resourceQuantity ?? ""}
            onChange={(e) =>
              change.valuesMaskered(
                e,
                setValuesMask,
                setValues,
                masks.float,
                masks.resetFloatMask
              )
            }
          />
        </Row>
        <Row>
          <Button type="submit" className="mt-3">
            Salvar
          </Button>
        </Row>
      </form>
    </Card>
  );
};

export default ResourcesForm;
