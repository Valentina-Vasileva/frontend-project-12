import ReactDOM from 'react-dom/client';
import init from './index.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

const app = () => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(init());
};

app();
