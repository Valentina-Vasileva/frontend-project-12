import { useDispatch, useSelector } from 'react-redux';
import {
  Button, Form, Modal,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { ErrorMessage, Formik } from 'formik';
import React, { useEffect, useRef } from 'react';
import { actions as modalActions } from '../../../slices/modalSlice.js';
import { CHANNEL_FORM_STATUS_INACTIVITY, createChannel, selectors } from '../../../slices/channelsSlice.js';

const CreateChannelModal = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const formStatus = useSelector((selector) => selector.channelsReducer.createChannelFormStatus);
  const channels = useSelector(selectors.selectAll);

  const inputEl = useRef(null);

  useEffect(() => {
    inputEl.current.focus();
  }, []);

  const validationSchema = Yup.object().shape({
    name: Yup
      .string()
      .required(t('modals.create_channel.input.errors.required'))
      .notOneOf(channels.map((channel) => channel.name), t('modals.create_channel.input.errors.one_of')),
  });

  const initialValues = {
    name: '',
  };

  const handleClose = () => {
    dispatch(modalActions.closeModal());
  };

  const onSubmit = (values) => {
    const { name } = values;
    dispatch(createChannel(name));
  };

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.create_channel.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-3 pb-1">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({
            handleSubmit, handleChange, values, errors,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Control
                  required
                  type="text"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  disabled={formStatus !== CHANNEL_FORM_STATUS_INACTIVITY}
                  isInvalid={!!errors.name}
                  ref={inputEl}
                />
                <ErrorMessage name="name">
                  {(msg) => <div className="text-danger small mt-2">{msg}</div>}
                </ErrorMessage>
                <Modal.Footer className="py-1 px-0 border-0 m-0">
                  <Button variant="secondary" onClick={handleClose}>{t('modals.create_channel.cancel')}</Button>
                  <Button variant="primary" className="m-0" type="submit">{t('modals.create_channel.submit')}</Button>
                </Modal.Footer>
              </Form.Group>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </>
  );
};

export default CreateChannelModal;
