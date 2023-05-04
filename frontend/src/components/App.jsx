import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login.jsx';
import MainPage from './MainPage.jsx';
import NotFound from './NotFound.jsx';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<MainPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
