import ReactDOM from 'react-dom/client';
import init from './index.jsx';

const app = () => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(init());
};

app();
