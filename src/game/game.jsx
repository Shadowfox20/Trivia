import React from 'react';
import { NavLink } from 'react-router-dom';

function Game() {
	return (
		<div>
			<h2>Game</h2>
			<p>Game placeholder — questions will appear here.</p>
			<NavLink to="/end">Finish</NavLink>
		</div>
	);
}

export default Game;
