import React, { useEffect, useRef } from 'react';
import {
  Col, Row, Card, Image, Form, Button, Container, ToastContainer, Toast,
} from 'react-bootstrap';
import { ErrorMessage, Formik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register, REGISTER_FORM_STATUS_INACTIVITY } from '../slices/registrationSlice.js';
import getErrorType from '../getErrorType.js';
import routes from '../routes.js';

const Registration = () => {
  const navigate = useNavigate();
  const auth = useSelector((selector) => selector.authReducer.auth);

  if (auth) {
    navigate(routes.frontend.main());
  }

  const inputEl = useRef();
  useEffect(() => {
    inputEl.current.focus();
  });

  const dispatch = useDispatch();
  const formStatus = useSelector((selector) => selector.registrationReducer.formStatus);
  const registerError = useSelector((selector) => selector.registrationReducer.registerError);

  const { t } = useTranslation();

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required(t('registration.inputs.nickname.errors.required'))
      .min(3, t('registration.inputs.nickname.errors.min'))
      .max(20, t('registration.inputs.nickname.errors.max')),
    password: Yup.string()
      .required(t('registration.inputs.password.errors.required'))
      .min(6, t('registration.inputs.password.errors.min')),
    password_confirm: Yup.string()
      .test(
        'passwords-match',
        t('registration.inputs.password_confirm.errors.match'),
        (value, context) => context.parent.password === value,
      ),
  });

  const onSubmit = (values) => {
    const { username, password } = values;
    dispatch(register({ username, password }));
  };

  const initialValues = {
    username: '',
    password: '',
    password_confirm: '',
  };

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center h-100 align-items-center">
        <Col md={8} xxl={6} className="col-12">
          <Card className="text-center">
            <Card.Body className="p-0">
              <Row className="p-5 align-items-center">
                <Col md={6} className="col-12">
                  <Image
                    roundedCircle
                    src="registration_image.jpg"
                  />
                </Col>
                <Col>
                  <h1 className="mb-4">{t('registration.title')}</h1>
                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                  >
                    {({
                      handleSubmit, handleChange, values, errors, touched,
                    }) => (
                      <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3 text-body form-floating">
                          <Form.Control
                            type="text"
                            placeholder={t('registration.inputs.nickname.placeholder')}
                            name="username"
                            value={values.username}
                            onChange={handleChange}
                            isInvalid={(errors.username && touched.username) || registerError}
                            disabled={formStatus !== REGISTER_FORM_STATUS_INACTIVITY}
                            ref={inputEl}
                          />
                          <Form.Label>{t('registration.inputs.nickname.label')}</Form.Label>
                          <ErrorMessage name="username">
                            {(msg) => (
                              <ToastContainer>
                                <Toast className="text-white" bg="danger">
                                  <Toast.Body className="p-0">
                                    { msg }
                                  </Toast.Body>
                                </Toast>
                              </ToastContainer>
                            )}
                          </ErrorMessage>
                        </Form.Group>
                        <Form.Group className="mb-3 text-body form-floating">
                          <Form.Control
                            type="password"
                            placeholder={t('registration.inputs.password.placeholder')}
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                            isInvalid={(errors.password && touched.password) || registerError}
                            disabled={formStatus !== REGISTER_FORM_STATUS_INACTIVITY}
                          />
                          <Form.Label>{t('registration.inputs.password.label')}</Form.Label>
                          <ErrorMessage name="password">
                            {(msg) => (
                              <ToastContainer>
                                <Toast className="text-white" bg="danger">
                                  <Toast.Body className="p-0">
                                    { msg }
                                  </Toast.Body>
                                </Toast>
                              </ToastContainer>
                            )}
                          </ErrorMessage>
                        </Form.Group>
                        <Form.Group className="mb-4 text-body form-floating">
                          <Form.Control
                            type="password"
                            placeholder={t('registration.inputs.password_confirm.placeholder')}
                            name="password_confirm"
                            value={values.password_confirm}
                            onChange={handleChange}
                            isInvalid={
                              (errors.password_confirm && touched.password_confirm) || registerError
                            }
                            disabled={formStatus !== REGISTER_FORM_STATUS_INACTIVITY}
                          />
                          <Form.Label>{t('registration.inputs.password_confirm.label')}</Form.Label>
                          <ErrorMessage name="password_confirm">
                            {(msg) => (
                              <ToastContainer>
                                <Toast className="text-white" bg="danger">
                                  <Toast.Body className="p-0">
                                    { msg }
                                  </Toast.Body>
                                </Toast>
                              </ToastContainer>
                            )}
                          </ErrorMessage>
                          { registerError && getErrorType(registerError.message) === 'conflict'
                              && (
                              <ToastContainer>
                                <Toast className="text-white" bg="danger">
                                  <Toast.Body className="p-0">
                                    { t(`registration.errors.${getErrorType(registerError.message)}`) }
                                  </Toast.Body>
                                </Toast>
                              </ToastContainer>
                              )}
                        </Form.Group>
                        <Button className="w-100 mb-3" variant="outline-primary" type="submit" disabled={formStatus !== REGISTER_FORM_STATUS_INACTIVITY}>
                          {t('registration.buttons.register')}
                        </Button>
                      </Form>
                    )}
                  </Formik>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Registration;
