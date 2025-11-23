import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

function Start() {
    const navagate = useNavigate();
    const [category, setCategory] = React.useState('');
    const [difficulty, setDifficulty] = React.useState('');
    const [sessionToken, setSessionToken] = React.useState(localStorage.getItem('sessionToken') || '');

    React.useEffect(() => {
        if (!sessionToken) {
            (async () => {
                // Attempts to set the session token if not already set (prevents repeat questions)
                try {
                    const response = await fetch('https://opentdb.com/api_token.php?command=request');
                    const data = await response.json();
                    if (data && data.token) {
                        // sets the token locally and in state
                        setSessionToken(data.token);
                        localStorage.setItem('sessionToken', data.token);
                    }
                } catch (err) {
                    console.error('Failed to get session token', err);
                }
            })();
        }
    }, [sessionToken]);

    function checkField(field, value) {
        // Helper to format query fields, returns empty string if not set
        if (value) {
            return `&${field}=${value}`;
        }
        return '';
    }
    
    function handleStart() {
        (async () => {
            try {
                // set up query parameters
                const url = `https://opentdb.com/api.php?amount=8${checkField('category', category)}${checkField('difficulty', difficulty)}&type=multiple${checkField('token', sessionToken)}`
                // fetch questions
                const response = await fetch(url);
                const data = await response.json();

                if (data && data.response_code === 3) {
                    // Token not valid, need to reset
                    console.warn('Session token expired, resetting token');
                    try {
                        const tokenResponse = await fetch('https://opentdb.com/api_token.php?command=request');
                        const tokenData = await tokenResponse.json();
                        if (tokenData && tokenData.token) {
                            // sets the token locally and in state
                            setSessionToken(tokenData.token);
                            localStorage.setItem('sessionToken', tokenData.token);
                        }
                    } catch (err) {
                        console.error('Failed to get session token', err);
                    }
                    // set up query parameters
                    const url = `https://opentdb.com/api.php?amount=8${checkField('category', category)}${checkField('difficulty', difficulty)}&type=multiple${checkField('token', sessionToken)}`
                    // fetch questions
                    const response = await fetch(url);
                    const data = await response.json();
                }


                // Check for response code 0 (success)
                if (data && data.response_code !== 0) {
                    console.error('Failed to get questions from trivia database', {url, sessionToken}, data);
                    return;
                }

                // Navigate to game, passing questions via reactDOM state
                if (data && data.results) {
                    navagate("/game", {state: data.results});
                }
            } 
            
            catch (err) {
                console.error('Failed to start game', err);
            }
        })();
    }

    return (
        <div>
            <h1>Welcome to the Quiz Game!</h1>
            <p>Category: 
                <select id="category" name="categoryInput" onChange={(e) => setCategory(e.target.value)}>
                    <option value="">Any</option>
                    <option value="9">Other</option>
                    <option value="10">Books</option>
                    <option value="11">Film</option>
                    <option value="12">Music</option>
                    <option value="13">Musical/Theatre</option>
                    <option value="14">Television</option>
                    <option value="15">Video Games</option>
                    <option value="16">Board Games</option>
                    <option value="17">Science/Nature</option>
                    <option value="18">Computers</option>
                    <option value="19">Mathematics</option>
                    <option value="20">Mythology</option>
                    <option value="21">Sports</option>
                    <option value="22">Geography</option>
                    <option value="23">History</option>
                    <option value="24">Politics</option>
                    <option value="25">Art</option>
                    <option value="26">Celebrities</option>
                    <option value="27">Animals</option>
                </select>
            </p>
            <p>Difficulty:
                <select id="difficulty" name="difficultyInput" onChange={(e) => setDifficulty(e.target.value)}>
                    <option value="">Any</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
            </p>
            <button type="submit" onClick={() => handleStart()}>Start Game</button>
        </div>
    );
}

export default Start;