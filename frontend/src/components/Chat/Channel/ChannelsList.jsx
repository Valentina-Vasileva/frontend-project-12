import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button, Col, Nav,
} from 'react-bootstrap';
import { selectors } from '../../../slices/channelsSlice.js';
import Channel from './Channel.jsx';
import { actions as modalActions, CREATE_CHANNEL_MODAL_TYPE } from '../../../slices/modalSlice.js';
import ChatModal from '../ChatModal.jsx';

const ChannelsList = () => {
  const channels = useSelector(selectors.selectAll);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(modalActions.openModal({ type: CREATE_CHANNEL_MODAL_TYPE, id: null }));
  };

  return (
    <>
      <ChatModal />
      <Col className="col-4 col-md-2 bg-light d-flex flex-column px-0 border-end">
        <div className="py-4 mt-1 mb-2 pe-2 ps-4 justify-content-between d-flex">
          <b>{t('channels.title')}</b>
          <Button className="p-0 btn-group-vertical bg-white border-0 text-primary" onClick={handleClick} aria-label={t('channels.create.label')}>
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
            <span className="visually-hidden">+</span>
          </Button>
        </div>
        {channels && (
          <Nav className="h-100 overflow-auto d-block px-2">
            {channels.map((channel) => (
              <Channel channel={channel} key={channel.id} />
            ))}
          </Nav>
        )}
      </Col>
    </>
  );
};

export default ChannelsList;
