import { Col } from 'react-bootstrap';

const MessagesList = () => {
  const messages = [
    {
      id: 1,
      text: 'hello',
      author: 'Vasya',
    },
    {
      id: 1,
      text: 'hello you',
      author: 'Maxim',
    },
    {
      id: 1,
      text: 'how are you',
      author: 'Vasya',
    },
  ];

  return (
    <Col className="bg-white">
      <ul>
        {messages.map((message) => (
          <li key={message.id}>
            <b>
              {message.author}
              {': '}
            </b>
            {message.text}
          </li>
        ))}
      </ul>
    </Col>
  );
};

export default MessagesList;
