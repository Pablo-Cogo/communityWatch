import React, { useState } from "react";
import Card from "../../components/molecules/card";
import { Input } from "../../components/atoms/Input";
import { Row } from "../../components/atoms/Row/style";
import PdfInput from "../../components/atoms/InputPdf";
import { OccurrenceForm } from "./types";

const OccurrencesForm = () => {
  const [values, setValues] = useState<OccurrenceForm | null>(null);
  return (
    <Card title="Ocorrências">
      <Row gtc={"max-content 1fr"} colgap={"15px"} className="mb-4">
        <PdfInput
          label="Pdf da ocorrência"
          id="occurrencePdfUrl"
          setValues={setValues}
          pdfUrl={values?.occurrencePdfUrl}
        />
        <div>
          <Input
            id={"occurrenceCobradeCode"}
            label="Código cobrade:"
            type="text"
            val={""}
          />
          <Input
            id={"occurrenceDescription"}
            label="Descrição:"
            type="text"
            className="mt-3"
            val={""}
          />
        </div>
      </Row>
    </Card>
  );
};

export default OccurrencesForm;
