import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Start } from './start/start';
import { Game } from './game/game';
import { End } from './end/end';


// https://opentdb.com/api.php?amount=8&category=21&difficulty=hard&type=multiple&token=YOURTOKEN
function App() {
    const [sessionToken, setSessionToken] = React.useState(localStorage.getItem('sessionToken') || '');
    const [query, setQuery] = React.useState({
        category: 0,
        difficulty: '',
    });
    const [questions, setQuestions] = useState([]);
    const [score, setScore] = useState(0);

    React.useEffect(() => {
        if (!sessionToken) {
            const response = fetch('https://opentdb.com/api_token.php?command=request')
            const data = response.json();
            setSessionToken(data.token);
            localStorage.setItem('sessionToken', data.token);
        }
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Start />} />
                <Route path="/game" element={<Game />} />
                <Route path="/end" element={<End />} />
            </Routes>
        </BrowserRouter>
    )
}