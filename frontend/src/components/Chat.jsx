import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChatData, selectors } from '../slices/channelsSlice.js';

const Chat = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchChatData());
  }, [dispatch]);

  const channels = useSelector(selectors.selectAll);

  return channels && (
  <div className="mt-3">
    <ul className="list-group">
      {channels.map(({ id, name }) => (
        <li key={id} className="list-group-item d-flex">
          <span className="mr-auto">{name}</span>
        </li>
      ))}
    </ul>
  </div>
  );
};

export default Chat;
