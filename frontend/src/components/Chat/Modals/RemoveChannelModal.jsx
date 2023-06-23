import { useDispatch, useSelector } from 'react-redux';
import {
  Button, Modal,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import React from 'react';
import { actions as modalActions } from '../../../slices/modalSlice.js';
import { CHANNEL_FORM_STATUS_INACTIVITY, removeChannel } from '../../../slices/channelsSlice.js';

const RemoveChannelModal = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const formStatus = useSelector((selector) => selector.channelsReducer.removeChannelFormStatus);
  const channelId = useSelector((selector) => selector.modalReducer.id);

  const handleClose = () => {
    dispatch(modalActions.closeModal());
  };

  const onClick = () => {
    dispatch(removeChannel(channelId));
  };

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.remove_channel.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-3 pb-1">
        <p className="lead">{t('modals.remove_channel.sure')}</p>
      </Modal.Body>
      <Modal.Footer className="py-1 border-0 m-0">
        <Button variant="secondary" onClick={handleClose} disabled={formStatus !== CHANNEL_FORM_STATUS_INACTIVITY} aria-label={t('modals.remove_channel.cancel')}>{t('modals.remove_channel.cancel')}</Button>
        <Button variant="danger" className="m-0" onClick={onClick} disabled={formStatus !== CHANNEL_FORM_STATUS_INACTIVITY} aria-label={t('modals.remove_channel.remove')}>{t('modals.remove_channel.remove')}</Button>
      </Modal.Footer>
    </>
  );
};

export default RemoveChannelModal;
