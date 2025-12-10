import {
  Overlay,
  ModalBox,
  Buttons,
  Cancel,
  Confirm,
} from "../../styles/ConfirmationModal";

type Props = {
  open: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmationModal({
  open,
  title,
  message,
  onConfirm,
  onCancel,
}: Props) {
  if (!open) return null;

  return (
    <Overlay>
      <ModalBox>
        <h3>{title}</h3>
        <p>{message}</p>

        <Buttons>
          <Cancel onClick={onCancel}>Cancel</Cancel>
          <Confirm onClick={onConfirm}>Confirm</Confirm>
        </Buttons>
      </ModalBox>
    </Overlay>
  );
}
