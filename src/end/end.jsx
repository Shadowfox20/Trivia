import React from 'react';
import { NavLink } from 'react-router-dom';

function End() {
	return (
		<div>
			<h2>Results</h2>
			<p>Thanks for playing — your score will appear here.</p>
			<NavLink to="/">Play Again</NavLink>
		</div>
	);
}

export default End;
