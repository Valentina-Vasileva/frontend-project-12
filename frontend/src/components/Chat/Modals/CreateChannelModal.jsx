import { useDispatch } from 'react-redux';
import { Button, Form, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { Formik } from 'formik';
import React from 'react';
import { actions as modalActions } from '../../../slices/modalSlice.js';

const CreateChannelModal = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const validationSchema = Yup.object().shape({
    body: Yup.string().required(t('modals.create_channel.input.errors.required')),
  });

  const initialValues = {
    body: '',
  };

  const handleClose = () => {
    dispatch(modalActions.closeModal());
  };

  const onSubmit = () => {
    dispatch(modalActions.closeModal());
  };

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.create_channel.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({
            handleSubmit, handleChange, values,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Control
                  required
                  type="textarea"
                  name="body"
                  value={values.body}
                  onChange={handleChange}
                />
                <Modal.Footer className="py-1 px-0 border-0 m-0">
                  <Button variant="secondary" onClick={handleClose}>{t('modals.create_channel.cancel')}</Button>
                  <Button variant="primary" className="m-0" onClick={handleClose}>{t('modals.create_channel.submit')}</Button>
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
