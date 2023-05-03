import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/auth' element={<div>Hello world!</div>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;