import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { selectors } from '../../slices/messagesSlice.js';
import { selectors as channelSelectors } from '../../slices/channelsSlice.js';

const MessagesHeader = () => {
  const { t } = useTranslation();
  const messages = useSelector(selectors.selectAll);
  const currentChannelId = useSelector((selector) => selector.channelsReducer.currentChannelId);
  const channel = useSelector((state) => channelSelectors.selectById(state, currentChannelId));
  const channelMessages = messages.filter(({ channelId }) => channelId === currentChannelId);
  const messagesCount = channelMessages.length;

  return (
    <Container fluid className="bg-light p-3 mb-4 small shadow-sm">
      <p className="m-0"><b>{channel && `#\u00A0${channel.name}`}</b></p>
      <span className="text-secondary">{t('messages.list.messages', { count: messagesCount })}</span>
    </Container>
  );
};

export default MessagesHeader;
