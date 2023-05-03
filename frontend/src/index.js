import init from './index.jsx';
import ReactDOM from "react-dom/client";

const app = () => {
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(init());
};

app();