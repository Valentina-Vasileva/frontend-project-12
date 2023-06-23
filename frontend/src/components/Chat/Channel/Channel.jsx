import { useDispatch, useSelector } from 'react-redux';
import {
  Button, ButtonGroup, NavItem, Dropdown,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { actions as channelsActions } from '../../../slices/channelsSlice.js';
import { actions as modalActions, REMOVE_CHANNEL_MODAL_TYPE, RENAME_CHANNEL_MODAL_TYPE } from '../../../slices/modalSlice';

const ChannelsList = ({ channel }) => {
  const dispatch = useDispatch();
  const currentChannelId = useSelector((selector) => selector.channelsReducer.currentChannelId);
  const { t } = useTranslation();
  const { id, name, removable } = channel;

  const handleSetChannel = () => {
    dispatch(channelsActions.setCurrentChannelId(id));
  };

  const handleRemove = () => {
    dispatch(modalActions.openModal({ type: REMOVE_CHANNEL_MODAL_TYPE, id }));
  };

  const handleRename = () => {
    dispatch(modalActions.openModal({ type: RENAME_CHANNEL_MODAL_TYPE, id }));
  };

  return (
    <NavItem key={id} className="w-100">
      {!removable && (
        <Button
          variant={currentChannelId === id ? 'secondary' : ''}
          checked={currentChannelId === id}
          onClick={handleSetChannel}
          className="text-start rounded-0 w-100"
        >
          {`#\u00A0${name}`}
        </Button>
      )}
      {removable && (
      <ButtonGroup className="w-100">
        <Button
          variant={currentChannelId === id ? 'secondary' : ''}
          checked={currentChannelId === id}
          onClick={handleSetChannel}
          className="text-start rounded-0 w-100"
        >
          {`#\u00A0${name}`}
        </Button>
        <Dropdown as={ButtonGroup} variant={currentChannelId === id ? 'secondary' : ''} title="" aria-label={t('channels.manage')}>
          <Dropdown.Toggle variant={id === currentChannelId ? 'secondary' : 'light'} className="flex-grow-0 dropdown-toggle-split">
            <span className="visually-hidden">{t('channels.manage')}</span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={handleRemove}>{t('channels.remove.title')}</Dropdown.Item>
            <Dropdown.Item onClick={handleRename}>{t('channels.rename.title')}</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </ButtonGroup>
      )}
    </NavItem>
  );
};

export default ChannelsList;
