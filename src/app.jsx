import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Start from './start/start';
import Game from './game/game';
import End from './end/end';


function App() {
    const [sessionToken, setSessionToken] = React.useState(localStorage.getItem('sessionToken') || '');
    const [questions, setQuestions] = React.useState([]);
    const [score, setScore] = React.useState(0);

    React.useEffect(() => {
        if (!sessionToken) {
            (async () => {
                try {
                    const response = await fetch('https://opentdb.com/api_token.php?command=request');
                    const data = await response.json();
                    if (data && data.token) {
                        setSessionToken(data.token);
                        localStorage.setItem('sessionToken', data.token);
                    }
                } catch (err) {
                    console.error('Failed to get session token', err);
                }
            })();
        }
    }, [sessionToken]);

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