import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import Login from './Login.jsx';
import MainPage from './MainPage.jsx';
import NotFound from './NotFound.jsx';
import Header from './Header.jsx';

const App = () => (
  <BrowserRouter>
    <Header />
    <Container className="bg-light min-vh-100 min-vw-100">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<MainPage />} />
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
