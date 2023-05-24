import { Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { selectors } from '../../slices/messagesSlice.js';
import MessagesHeader from './MessagesHeader.jsx';

const MessagesList = () => {
  const messages = useSelector(selectors.selectAll);
  const currentChannelId = useSelector((selector) => selector.channelsReducer.currentChannelId);
  const channelMessages = messages.filter(({ channelId }) => channelId === currentChannelId);

  return (
    <Col className="bg-white p-0">
      <MessagesHeader />
      <ul>
        {channelMessages.map((message) => (
          <li key={message.id}>
            <b>
              {message.username}
              {': '}
            </b>
            {message.body}
          </li>
        ))}
      </ul>
    </Col>
  );
};

export default MessagesList;
