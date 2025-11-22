import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';

function Start() {
    
    return (
        <div>
            <h1>Welcome to the Quiz Game!</h1>
            <NavLink to="/game">Start Game</NavLink>
        </div>
    );
}