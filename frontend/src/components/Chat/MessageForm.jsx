import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import React, { useContext } from 'react';
import { Formik } from 'formik';
import { sendMessage } from '../../slices/messagesSlice.js';
import AuthContext from '../../context/AuthContext.js';

const MessageForm = () => {
  const { t } = useTranslation();

  const currentChannelId = useSelector((selector) => selector.channelsReducer.currentChannelId);
  const messageFormStatus = useSelector((selector) => selector.messagesReducer.messageFormStatus);

  const dispatch = useDispatch();

  const { username } = useContext(AuthContext);

  const validationSchema = Yup.object().shape({
    body: Yup.string().required(t('messages.input.errors.required')),
  });

  const initialValues = {
    body: '',
  };

  const onSubmit = async (values, { resetForm }) => {
    const { body } = values;
    dispatch(sendMessage({ body, channelId: currentChannelId, username }));
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({
        handleSubmit, handleChange, values,
      }) => (
        <Form onSubmit={handleSubmit} className="mt-auto mx-5 my-3">
          <Form.Group className="d-flex border rounded py-1">
            <Form.Control
              className="border-0 px-2"
              required
              type="textarea"
              placeholder={t('messages.input.placeholder')}
              name="body"
              value={values.body}
              onChange={handleChange}
              disabled={messageFormStatus !== 'inactivity'}
            />
            <Button className="border-0" variant="group-vertical" type="submit" disabled={values.body.length === 0 || messageFormStatus !== 'inactivity'}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
              </svg>
            </Button>
          </Form.Group>
        </Form>
      )}
    </Formik>
  );
};

export default MessageForm;
