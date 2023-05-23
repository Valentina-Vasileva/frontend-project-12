import { useDispatch, useSelector } from 'react-redux';
import { Button, NavItem } from 'react-bootstrap';
import { actions as channelsActions } from '../../slices/channelsSlice';

const ChannelsList = ({ channel }) => {
  const dispatch = useDispatch();
  const currentChannelId = useSelector((selector) => selector.channelsReducer.currentChannelId);

  const handleSetChannel = (id) => () => {
    dispatch(channelsActions.setCurrentChannelId(id));
  };

  const { id, name } = channel;

  return (
    <NavItem key={id} className="w-100">
      <Button
        variant={currentChannelId === id ? 'secondary' : ''}
        checked={currentChannelId === id}
        onClick={handleSetChannel(id)}
        className="w-100 text-start rounded-0"
      >
        {`#\u00A0${name}`}
      </Button>
    </NavItem>
  );
};

export default ChannelsList;
