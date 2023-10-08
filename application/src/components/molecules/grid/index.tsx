import { useState } from "react";
import {
  // ActionButton,
  // BorderTd,
  // ButtonPages,
  // ContainerButtonsPage,
  Widget,
} from "./style";
import { ConfigGridProps, GridProps } from "./types";
import HeaderGrid from "./components/header";
import GridProvider from "./contexts/grid.provider";
import BodyGrid from "./components/body";
import FooterGrid from "./components/footer";

function Grid<T extends Record<string, any>>({
  gridId,
  gridButtonProps,
  configGrid,
  columns,
  rows,
}: GridProps<T>) {
  const [configButtonsGrid] = useState(gridButtonProps);
  const [configGridDefault] = useState<ConfigGridProps>({
    buttonColumnSelector: configGrid?.buttonColumnSelector ?? true,
    buttonCommandSelect: configGrid?.buttonColumnSelector ?? true,
    buttonRestore: configGrid?.buttonRestore ?? true,
    buttonsDownload: configGrid?.buttonsDownload ?? true,
    colCommands: configGrid?.colCommands ?? true,
    colPrimary: configGrid?.colPrimary ?? "Id",
  });

  return (
    <GridProvider columns={columns} rows={rows}>
      <Widget>
        <HeaderGrid
          gridId={gridId}
          configButtonsGrid={configButtonsGrid}
          configGrid={configGrid}
        />
        <BodyGrid
          gridId={gridId}
          configGrid={configGridDefault}
          configButtonsGrid={configButtonsGrid}
          rows={rows}
        />
        <FooterGrid gridId={gridId} />
      </Widget>
    </GridProvider>
  );
}

export default Grid;
