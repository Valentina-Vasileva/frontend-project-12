import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Row } from 'react-bootstrap';
import { actions as channelsActions } from '../../slices/channelsSlice.js';
import ChannelsList from './ChannelsList.jsx';
import MessagesList from './MessagesList.jsx';
import socket from '../../socket.js';
import { actions as messagesActions } from '../../slices/messagesSlice.js';
import fetchChatData from '../../slices/chatSlice.js';

const Chat = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchChatData());

    function newMessage(payload) {
      dispatch(messagesActions.addMessage(payload));
    }

    function newChannel(payload) {
      dispatch(channelsActions.addChannel(payload));
    }

    function removeChannel({ id }) {
      dispatch(channelsActions.removeChannel(id));
    }

    function renameChannel({ id, name }) {
      dispatch(channelsActions.updateChannel({ id, changes: { name } }));
    }

    socket.on('newMessage', newMessage);
    socket.on('newChannel', newChannel);
    socket.on('removeChannel', removeChannel);
    socket.on('renameChannel', renameChannel);

    return () => {
      socket.off('newMessage', newMessage);
      socket.off('newChannel', newChannel);
      socket.off('removeChannel', removeChannel);
      socket.off('renameChannel', renameChannel);
    };
  }, [dispatch]);

  return (
    <Container className="my-4 h-100 shadow">
      <Row className="h-100">
        <ChannelsList />
        <MessagesList />
      </Row>
    </Container>
  );
};

export default Chat;
