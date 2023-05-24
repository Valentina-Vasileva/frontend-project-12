import { Col, ListGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { selectors } from '../../slices/messagesSlice.js';
import MessagesHeader from './MessagesHeader.jsx';
import Message from './Message';

const MessagesList = () => {
  const messages = useSelector(selectors.selectAll);
  const currentChannelId = useSelector((selector) => selector.channelsReducer.currentChannelId);
  const channelMessages = messages.filter(({ channelId }) => channelId === currentChannelId);

  return (
    <Col className="bg-white p-0">
      <MessagesHeader />
      <ListGroup className="overflow-auto px-5">
        {channelMessages.map((message) => (
          <Message message={message} key={message.id} className="border-0 p-1 mb-2" />
        ))}
      </ListGroup>
    </Col>
  );
};

export default MessagesList;
