import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

//{"type":"multiple","difficulty":"medium","category":"Animals","question":"What type of animal is a natterjack?",
// "correct_answer":"Toad","incorrect_answers":["Bird","Fish","Insect"]}
function Game() {
    const navagate = useNavigate();
    const location = useLocation();
    const questions = location.state.questions || [];
    const [ score, setScore ] = React.useState(0);
    const [ streak, setStreak ] = React.useState(0);
    const [ question, setQuestion ] = React.useState(0);
    const  [answer, setAnswer ] = React.useState(Math.floor(Math.random() * 4));

    React.useEffect(() => {
        if (questions.length === 0) {
            console.error('No questions available for the game');
            navagate("/");
        }
    });

    function handleFinish() {
        navagate("/end", {state: { score: score, steak: streak } });
    }

    function difficultyMultiplier(difficulty) {
        switch (difficulty) {
            case 'easy':
                return 1;
            case 'medium':
                return 1.5;
            case 'hard':
                return 2;
            default:
                return 1;
        }
    }

    function handleAnswer(response) {
        if (response === questions[question].correct_answer) {
            setScore(score + 100 * ((streak * 0.5) + 1) * difficultyMultiplier(questions[question].difficulty));
            setStreak(streak + 1);
        }
        else {
            setStreak(0);
        }
        if (question ===  7) {
            handleFinish();
            return;
        }
        setQuestion(question + 1);
        setAnswer(Math.floor(Math.random() * 4));
    }

    function formatQuestion() {
        if (!questions[question]) {
            return <div>Loading next question...</div>;
        }
        const currentQuestion = questions[question];
        const choices = currentQuestion.incorrect_answers;
        choices.splice(answer, 0, currentQuestion.correct_answer);

        function formatAnswer(index) {
            return (
                <button className="answer-button" key={index} onClick={() => handleAnswer(choices[index])}>
                    {choices[index]}
                </button>
            );
        }

        return (
            <div>
                <h3>{currentQuestion.question}</h3>
                <div className = "answer-pair">
                    {formatAnswer(0)}
                    {formatAnswer(1)}
                </div>
                <div className = "answer-pair">
                    {formatAnswer(2)}
                    {formatAnswer(3)}
                </div>
            </div>
        )
    }

	return (
		<div>
			<h2>Game</h2>
            <h3>Score: {score} | Streak: {streak}</h3>
			<div>{formatQuestion()}</div>
			<NavLink to="/end">Finish</NavLink>
		</div>
	);
}

export default Game;
