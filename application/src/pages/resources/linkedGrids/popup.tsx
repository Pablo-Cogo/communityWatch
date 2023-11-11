import Popup from "../../../components/molecules/popup";
import UnlinkedResourcesGrid from "./unlinkedResources";
import LinkedResourcesGrid from "./linkedResources";
import { useEffect, useRef, useState } from "react";

interface PopupProps {
  isOpen: boolean;
  close: () => void;
}

const PopupLinkedGrids = ({ isOpen, close }: PopupProps) => {
  const [changeGrid, setChangeGrid] = useState<boolean>(false);
  const changeRef = useRef<boolean>(changeGrid);

  const handleChangeGrid = () => {
    setChangeGrid(!changeRef.current);
  };

  useEffect(() => {
    changeRef.current = changeGrid;
  }, [changeGrid]);

  return (
    <Popup
      title="Vincular recursos"
      isOpen={isOpen}
      close={close}
      className="!w-[90%]"
      titleButtonCancel=""
      titleButtonConfirm=""
    >
      <div className="flex gap-x-[10px]">
        <UnlinkedResourcesGrid
          changeGrid={changeGrid}
          change={handleChangeGrid}
        />
        <LinkedResourcesGrid
          changeGrid={changeGrid}
          change={handleChangeGrid}
        />
      </div>
    </Popup>
  );
};

export default PopupLinkedGrids;
