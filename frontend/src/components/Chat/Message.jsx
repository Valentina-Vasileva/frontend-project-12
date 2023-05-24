import { ListGroup } from 'react-bootstrap';

const Message = ({ message }) => {
  const { username, body } = message;
  return (
    <ListGroup.Item className="border-0 p-1 mb-2">
      <b>
        {username}
        {': '}
      </b>
      {body}
    </ListGroup.Item>
  );
};

export default Message;
