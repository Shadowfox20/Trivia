import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

// https://opentdb.com/api.php?amount=8&category=21&difficulty=hard&type=multiple&token=YOURTOKEN
function Start() {
    const navagate = useNavigate();
    const [query, setQuery] = React.useState({
        category: 0,
        difficulty: '',
    });

    function checkField(field) {
        const value = query[field];
        if (value) {
            return `&${field}=${value}`;
        }
        return '';
    }
    
    function handleStart() {
        (async () => {
            try {
                const response = await fetch(
                    `https://opentdb.com/api.php?amount=8${checkField('category')}${checkField('difficulty')}&type=multiple&token=${localStorage.getItem('sessionToken') || ''}`
                );
                const data = await response.json();
                if (data && data.response_code !== 0) {
                    console.error('Failed to get questions', data);
                    return;
                }
                if (data && data.results) {
                    navagate("/game", {state: data.results});
                }
            } catch (err) {
                console.error('Failed to get session token', err);
            }
        })();
    }

    return (
        <div>
            <h1>Welcome to the Quiz Game!</h1>
            <p>Category: 
                <select id="category" name="categoryInput" onChange={(e) => setQuery(e.target.category.value)}>
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
                <select id="difficulty" name="difficultyInput" onChange={(e) => setCompletion(e.target.difficulty.value)}>
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