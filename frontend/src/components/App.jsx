import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Container } from 'react-bootstrap';
import Login from './Login.jsx';
import Main from './Main.jsx';
import NotFound from './NotFound.jsx';
import Header from './Header.jsx';
import routes from '../routes.js';
import Registration from './Registration.jsx';

const App = () => (
  <BrowserRouter>
    <Container className="h-100 d-flex flex-column p-0" fluid>
      <Header />
      <Routes>
        <Route path={routes.frontend.login()} element={<Login />} />
        <Route path={routes.frontend.signup()} element={<Registration />} />
        <Route path={routes.frontend.main()} element={<Main />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Container>
  </BrowserRouter>
);

export default App;
