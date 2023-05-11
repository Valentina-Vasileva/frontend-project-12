import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
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
    </Container>
  </BrowserRouter>
);

export default App;
