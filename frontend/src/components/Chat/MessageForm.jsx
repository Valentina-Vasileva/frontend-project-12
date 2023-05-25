import { Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import React from 'react';
import { Formik } from 'formik';

const MessageForm = () => {
  const { t } = useTranslation();
  const currentChannelId = useSelector((selector) => selector.channelsReducer.currentChannelId);

  const validationSchema = Yup.object().shape({
    body: Yup.string().required(t('messages.input.errors.required')),
  });

  const initialValues = {
    body: '',
  };

  const onSubmit = async (values) => {
    const { body } = values;
    console.log([body, currentChannelId]);
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
          <Form.Control required type="textarea" placeholder={t('messages.input.placeholder')} name="body" value={values.body} onChange={handleChange} />
        </Form>
      )}
    </Formik>
  );
};

export default MessageForm;
