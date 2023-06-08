import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { actions as modalActions } from '../../slices/modalSlice.js';
import CreateChannelModal from './Modals/CreateChannelModal.jsx';
import RemoveChannelModal from './Modals/RemoveChannelModal.jsx';
import RenameChannelModal from './Modals/RenameChannelModal.jsx';

const getCurrentModal = (type) => {
  const modals = {
    create_channel: CreateChannelModal,
    remove_channel: RemoveChannelModal,
    rename_channel: RenameChannelModal,
  };

  return modals[type] ?? null;
};

const ChatModal = () => {
  const dispatch = useDispatch();
  const type = useSelector((selector) => selector.modalReducer.type);
  const CurrentModal = getCurrentModal(type);

  const handleClose = () => {
    dispatch(modalActions.closeModal());
  };

  return (
    <Modal show={type !== null} onHide={handleClose} centered>
      {CurrentModal && <CurrentModal />}
    </Modal>
  );
};

export default ChatModal;
