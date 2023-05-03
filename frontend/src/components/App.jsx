import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./Login";
import MainPage from "./MainPage";
import NotFound from "./NotFound";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/' element={<MainPage />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;