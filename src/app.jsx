import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Start from './start/start';
import Game from './game/game';
import End from './end/end';


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Start />} />
                <Route path="/game" element={<Game />} />
                <Route path="/end" element={<End />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;