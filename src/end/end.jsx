import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

function End() {
    const location = useLocation();
    const score = location.state.score || 0;
    const streak = location.state.streak || 0;

    function determineRank() {
        if (score >= 6000 && streak >= 8) {
            return 'S+';
        } else if (streak >= 8) {
            return 'S';
        } else if (score >= 4000) {
            return 'A';
        } else if (score >= 2000) {
            return 'B';
        } else if (score >= 1000) {
            return 'C';
        }
        return 'F';
    }

	return (
		<div>
			<h2>Results</h2>
            <h3>Your Score: {score}</h3>
            <h1>Rank {determineRank()}</h1>
			<p>Thanks for playing!</p>
			<NavLink to="/">Play Again</NavLink>
		</div>
	);
}

export default End;
