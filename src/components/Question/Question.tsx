import React from 'react'
import './Question.scss'
import quest from '../../questions.json'
import useQuiz from '../../hooks/useQuiz'
import { Link, useParams } from 'react-router-dom'

export interface IQuestion {
    question: string,
    answers: [],
    right_answer: string,
}

interface IParams{
    theme: string
}

export function QuizBlock( {questions } :{ questions: any} ) {

    let params  = useParams()
    let elements = document.getElementsByClassName('answers_item')
    let {currentQuestionNumber,
        question,
        answ,
        isAnswered,
        next_question,
        showResult,
        rightAnswersCounter} = useQuiz({questions , elements})

    // @ts-ignore
    return (
        <div className='quiz_block'>
        <HomeButton/>
        <div id="question_block" className='shadow'>
            {
                questions.length != currentQuestionNumber ?

                <Question currentQuestionNumber={currentQuestionNumber}
                length={questions.length}
                question={question}
                answ={answ}
                isAnswered = {isAnswered}
                next_question={next_question}
                showResult={showResult}/>
                :
                <QuizRezult
                rightAnswersCounter={rightAnswersCounter}
                length={questions.length}/>
            }


        </div>
        </div>
    )
}



interface QuestionProps{
    currentQuestionNumber : number,
    length: number,
    question : IQuestion,
    answ: string,
    isAnswered : boolean,
    next_question: React.MouseEventHandler,
    showResult : React.MouseEventHandler
}

function Question(
    {currentQuestionNumber,
        length,
        question,
        answ,
        isAnswered,
        next_question,
        showResult
} : QuestionProps) {
    return(
        <>
                    <div className='questions'>
                        <h1 id='question__counter'>Question {currentQuestionNumber + 1}<span
                            className='small_nums'>/{length}</span></h1>
                        <h2>{question.question}</h2>


                        <h3>{answ}</h3>

                        {isAnswered && <NextButton onClick={next_question} />}


                    </div>
                    <div className='answers'>
                        {question.answers.map((elem: string) => <Answer text={elem} right_answer={question.right_answer}
                            onClick={showResult} isAnswered={isAnswered} />)}
                    </div>
            </>    
    )
}

function HomeButton(){
    return(
        <Link to='/' className="home_link">
            <img src={`../img/home_logo.svg`}/>
        </Link>
    )
}


interface QuizResultProps{
    rightAnswersCounter : number,
    length: number
}

function QuizRezult({rightAnswersCounter, length} : QuizResultProps) {
    return(
        <h1 className='result'>You scored {rightAnswersCounter}/{length}</h1>
    )
}


interface AnswerProps {
    text: string,
    right_answer: string,
    onClick: React.MouseEventHandler<HTMLInputElement>,
    isAnswered: boolean,
}

function Answer(props: AnswerProps) {


    return (
        <input type='button' value={props.text} onClick={event => {
            if (!props.isAnswered) props.onClick(event)
        }} className='answers_item not-answered' />
    )
}

interface NextButtonProps {
    onClick: React.MouseEventHandler<HTMLButtonElement>,
}

function NextButton(props: NextButtonProps) {
    return (
        <button className='next shadow' onClick={props.onClick}>Next question</button>
    )
}



