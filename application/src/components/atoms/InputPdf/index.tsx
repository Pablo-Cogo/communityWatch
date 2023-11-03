import React, { useState } from "react";
import { InputFileProps } from "./types";
import { Document, Page, pdfjs } from "react-pdf";
import { Close } from "@mui/icons-material";
import { change } from "../../../helpers/change";
import {
  ButtonsThumbnail,
  ButtonThumbnail,
  FileContainer,
  FileInputContainer,
  FileInputLabel,
  StyledFileIcon,
  StyledFileInput,
  ThumbnailContainer,
} from "./style";
import ServiceLocator from "../../../services/service.locator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faEye } from "@fortawesome/free-solid-svg-icons";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PdfInput = (props: InputFileProps) => {
  const { label, id, pdfUrl, setValues, ...rest } = props;
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDrag = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsDragOver(false);
  };

  const handleFile = (file: File) => {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      change.default<string | undefined>(
        id,
        fileReader.result as string,
        setValues
      );
    };
    fileReader.readAsDataURL(file);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      handleFile(file);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsDragOver(false);

    const file = event.dataTransfer.files[0];
    if (file) {
      handleFile(file);
    }
  };

  const handlePdfError = () => {
    const toastService = ServiceLocator.getToastService();
    toastService.addErrorToast("Ocorreu algum erro ao carregar o PDF.");
    removeFile();
  };

  const removeFile = () => {
    change.default<string | undefined>(id, undefined, setValues);
  };

  const convertBase64ToUrl = (pdfUrl: string) => {
    const base64Data = pdfUrl.split("base64,")[1];
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "application/pdf" });

    return URL.createObjectURL(blob);
  };

  const viewPdf = () => {
    if (!pdfUrl) return;
    const url = convertBase64ToUrl(pdfUrl);
    const a = document.createElement("a");
    a.href = url;
    a.target = "_blank";
    a.style.display = "none";

    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);

    URL.revokeObjectURL(url);
  };

  const downloadPdf = () => {
    if (!pdfUrl) return;
    const url = convertBase64ToUrl(pdfUrl);

    const currentDate = new Date();
    const fileName = `documento_${currentDate.getTime()}.pdf`;

    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.style.display = "none";

    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);

    URL.revokeObjectURL(url);
  };

  return (
    <FileContainer>
      <FileInputContainer
        onDragOver={handleDrag}
        onDragEnter={handleDrag}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        htmlFor={id}
        className={isDragOver ? "drag-over" : ""}
      >
        {pdfUrl ? (
          <div className="relative">
            <ButtonsThumbnail>
              <ButtonThumbnail onClick={viewPdf} title="visualizar">
                <FontAwesomeIcon className="!text-[12px]" icon={faEye} />
              </ButtonThumbnail>
              <ButtonThumbnail onClick={downloadPdf} title="realizar download">
                <FontAwesomeIcon className="!text-[12px]" icon={faDownload} />
              </ButtonThumbnail>
              <ButtonThumbnail onClick={removeFile} title="remover">
                <Close className="h-full" />
              </ButtonThumbnail>
            </ButtonsThumbnail>
            <ThumbnailContainer>
              <Document file={pdfUrl} onLoadError={handlePdfError}>
                <Page pageNumber={1} width={200} />
              </Document>
            </ThumbnailContainer>
          </div>
        ) : (
          <>
            <StyledFileInput
              type="file"
              id={id}
              name={id}
              onChange={handleFileChange}
              {...rest}
            />
            <StyledFileIcon>+</StyledFileIcon>
            <FileInputLabel>
              {label ?? "Clique para escolher um arquivo PDF"}
            </FileInputLabel>
          </>
        )}
      </FileInputContainer>
    </FileContainer>
  );
};

export default PdfInput;
