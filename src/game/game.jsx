import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

//{"type":"multiple","difficulty":"medium","category":"Animals","question":"What type of animal is a natterjack?",
// "correct_answer":"Toad","incorrect_answers":["Bird","Fish","Insect"]}
function Game() {
    const navagate = useNavigate();
    const location = useLocation();
    const questions = location.state || [];
    const score = 0;
    const streak = 0;
    const question = 0;
    const { answer, setAnswer } = React.useState(Math.floor(Math.random() * 4));

    React.useEffect(() => {
        if (questions.length === 0) {
            console.error('No questions available for the game');
            navagate("/");
        }
    });

    function handleFinish() {
        // Logic to finish the game and navigate to the end screen
    }

    function handleAnswer(response) {
        
    }

    function formatQuestion() {
        const currentQuestion = questions[question];
        const choices = currentQuestion.incorrect_answers;
        choices.splice(answer, 0, currentQuestion.correct_answer);

        function formatAnswer(index) {
            return (
                <button key={index} onClick={() => handleAnswer(choices[index])}>
                    {choices[index]}
                </button>
            );
        }

        return (
            <div>
                <h3>{currentQuestion.question}</h3>
                <div>
                    {formatAnswer(0)}
                    {formatAnswer(1)}
                    {formatAnswer(2)}
                    {formatAnswer(3)}
                </div>
            </div>
        )
    }

	return (
		<div>
			<h2>Game</h2>
			<div>{formatQuestion()}</div>
			<NavLink to="/end">Finish</NavLink>
		</div>
	);
}

export default Game;
