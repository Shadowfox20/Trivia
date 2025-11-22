import React from 'react';
import { NavLink } from 'react-router-dom';

// https://opentdb.com/api.php?amount=8&category=21&difficulty=hard&type=multiple&token=YOURTOKEN
function Start() {
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
            <NavLink to="/game">Start Game</NavLink>
        </div>
    );
}

export default Start;