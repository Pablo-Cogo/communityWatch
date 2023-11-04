import Popup from "../../../components/molecules/popup";
import UnlinkedResourcesGrid from "./unlinkedResources";
import LinkedResourcesGrid from "./linkedResources";

interface PopupProps {
  isOpen: boolean;
  close: () => void;
}

const PopupLinkedGrids = ({ isOpen, close }: PopupProps) => {
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
        <UnlinkedResourcesGrid />
        <LinkedResourcesGrid />
      </div>
    </Popup>
  );
};

export default PopupLinkedGrids;
