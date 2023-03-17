// import library yang dibutuhkan
import { useDisclosure, IconButton } from "@chakra-ui/react";
import { Edit as EditIcon } from "react-feather";
import ModalEdit from "../ModalEdit";

// buat komponen Edit
export default function Edit({ payload, reload }) {
  // buat state untuk menampilkan modal
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      {/* set payload dan onClose ke komponen ModalEdit */}
      <ModalEdit
        isOpen={isOpen}
        onClose={onClose}
        payload={payload}
        reload={reload}
      />
      {/* set onOpen ke komponen IconButton */}
      <IconButton
        onClick={onOpen}
        aria-label="edit"
        icon={<EditIcon />}
        colorScheme="blue"
      />
    </>
  );
}
