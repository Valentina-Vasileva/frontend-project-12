import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Col, Container, Row } from 'react-bootstrap';
import { fetchChatData } from '../../slices/channelsSlice.js';
import ChannelsList from './ChannelsList.jsx';

const Chat = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchChatData());
  }, [dispatch]);

  return (
    <Container className="my-4 h-100 shadow">
      <Row className="h-100">
        <ChannelsList />
        <Col className="bg-white" />
      </Row>
    </Container>
  );
};

export default Chat;
