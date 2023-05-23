import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Col, Container, Nav, NavItem, Row,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { fetchChatData, selectors } from '../slices/channelsSlice.js';

const Chat = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchChatData());
  }, [dispatch]);

  const { t } = useTranslation();
  const channels = useSelector(selectors.selectAll);

  return (
    <Container className="my-4 h-100 shadow">
      <Row className="h-100">
        <Col className="col-2 bg-light d-flex flex-column">
          <div className="p-4 mt-1 mb-2 pe-2 ps-4 justify-content-between d-flex">
            <b>{t('channels.title')}</b>
            <Button className="p-0 btn-group-vertical bg-white border-0 text-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                <path
                  d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
                />
              </svg>
            </Button>
          </div>
          { channels && (
          <Nav className="px-4 h-100 overflow-auto d-block">
              {channels.map(({ id, name }) => (
                <NavItem key={id} className="w-100 mb-3">
                  <span className="mr-auto">{`#\u00A0${name}`}</span>
                </NavItem>
              ))}
          </Nav>
          )}
        </Col>
        <Col className="bg-white" />
      </Row>
    </Container>
  );
};

export default Chat;
