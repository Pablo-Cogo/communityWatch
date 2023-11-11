import React, { useEffect, useState } from "react";
import Card from "../../components/molecules/card";
import { Input } from "../../components/atoms/Input";
import { Row } from "../../components/atoms/Row/style";
import PdfInput from "../../components/atoms/InputPdf";
import { OccurrenceForm, OccurrenceFormMask } from "./types";
import OccurrenceService from "../../services/occurrence.service";
import { Occurrence, OccurrenceStatus } from "../../types/occurrence";
import { change } from "../../helpers/change";
import { masks } from "../../helpers/masks";
import PersonService from "../../services/person.service";
import ServiceLocator from "../../services/service.locator";
import { useNavigate, useParams } from "react-router-dom";
import LinkedGrids from "../resources/linkedGrids";
import { Button } from "../../components/atoms/Button";

const OccurrencesForm = () => {
  const navigate = useNavigate();
  const toastService = ServiceLocator.getToastService();
  const [values, setValues] = useState<OccurrenceForm | null>(null);
  const [valuesMask, setValuesMask] = useState<OccurrenceFormMask | null>(null);
  const { id } = useParams();
  const [occurrenceId, setOccurrenceId] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const setOccurrenceView = async () => {
        const occurrence = await OccurrenceService.getOccurrenceById(id);
        if (!occurrence) {
          navigate(`/adm/occurrences/add`);
          toastService.addErrorToast("Ocorrência não encontrada.");
          return;
        }
        setOccurrenceId(id);
        const person = await PersonService.getPersonById(occurrence.userId);
        setValues({
          occurrenceCobradeCode: occurrence.occurrenceCobradeCode,
          occurrenceDescription: occurrence.occurrenceDescription,
          occurrencePdfUrl: occurrence.occurrenceLinkPdf,
          occurrenceUserCPF: person.personCPF,
        });
        setValuesMask({
          occurrenceUserCPF: masks.cpfMask(person.personCPF),
        });
      };
      setOccurrenceView();
    } else {
      change.resetForm<OccurrenceForm>(setValues, "occurrenceUserCPF", null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    var occurrence: void | Occurrence;
    const person = await PersonService.filterByCpf(
      values?.occurrenceUserCPF ?? ""
    );
    if (!person) {
      toastService.addErrorToast(
        "Não foi possivel encontrar a pessoa com esse CNPJ."
      );
      return;
    }
    if (occurrenceId) {
      occurrence = await OccurrenceService.editOccurrence(occurrenceId, {
        occurrenceCobradeCode: values?.occurrenceCobradeCode ?? "",
        occurrenceDescription: values?.occurrenceDescription ?? "",
        occurrenceStatus: OccurrenceStatus.Aberto,
        occurrenceInitialDate: new Date(),
        userId: person.userId,
        occurrenceLinkPdf: values?.occurrencePdfUrl,
      });
      if (occurrence) {
        toastService.addSuccessToast("Occorrencia alterada com sucesso.");
      }
    } else {
      occurrence = await OccurrenceService.registerOccurrence({
        occurrenceCobradeCode: values?.occurrenceCobradeCode ?? "",
        occurrenceDescription: values?.occurrenceDescription ?? "",
        occurrenceStatus: OccurrenceStatus.Aberto,
        occurrenceInitialDate: new Date(),
        userId: person.userId,
        occurrenceLinkPdf: values?.occurrencePdfUrl,
      });
      if (occurrence) {
        toastService.addSuccessToast("Ocorrência cadastrada com sucesso.");
        navigate(`/adm/occurrences/edit/${occurrence.id}`);
      }
    }
  };
  return (
    <Row rowgap="15px">
      <Card title="Ocorrência">
        <Row
          gtc={"max-content 1fr"}
          colgap={"15px"}
          className="mb-4"
          as="form"
          onSubmit={submitForm}
        >
          <PdfInput
            label="Pdf da ocorrência"
            id="occurrencePdfUrl"
            setValues={setValues}
            pdfUrl={values?.occurrencePdfUrl}
          />
          <div>
            <Input
              id={"occurrenceUserCPF"}
              label="CPF do afetado:"
              type="tel"
              val={valuesMask?.occurrenceUserCPF ?? ""}
              value={valuesMask?.occurrenceUserCPF ?? ""}
              onChange={(e) =>
                change.valuesMaskered(
                  e,
                  setValuesMask,
                  setValues,
                  masks.cpfMask,
                  masks.resetMask
                )
              }
            />
            <Input
              id={"occurrenceCobradeCode"}
              label="Código cobrade:"
              type="text"
              className="mt-3"
              val={values?.occurrenceCobradeCode ?? ""}
              value={values?.occurrenceCobradeCode ?? ""}
              onChange={(e) => change.noMask(e, setValues)}
            />
            <Input
              id={"occurrenceDescription"}
              label="Descrição:"
              type="text"
              className="mt-3"
              val={values?.occurrenceDescription ?? ""}
              value={values?.occurrenceDescription ?? ""}
              onChange={(e) => change.noMask(e, setValues)}
            />
            <div className="w-full flex justify-end mt-3">
              <Row gtc={2} colgap="10px">
                <Button
                  typing="primary"
                  variant="outline"
                  onClick={() => navigate("/adm/occurrences")}
                >
                  Voltar
                </Button>
                <Button type="submit" className="w-52">
                  Salvar
                </Button>
              </Row>
            </div>
          </div>
        </Row>
      </Card>
      {occurrenceId && <LinkedGrids />}
    </Row>
  );
};

export default OccurrencesForm;
