import React, { useEffect, useRef, useState } from 'react'
import './Question.scss'
import quest from '../../questions.json'

interface IQuestion {
    question: string,
    answers: [],
    right_answer: string,
}


export function QuizBlock() {

    let [isAnswered, setIsAnswered] = useState(false)
    let [currentQuestionNumber, setQurrentQuestionNumber] = useState(0)
    let { questions } = JSON.parse(JSON.stringify(quest))
    let [rightAnswersCounter , setRightAnswersCounter] = useState(0)

    let question: IQuestion = currentQuestionNumber < questions.length ? questions[currentQuestionNumber] : {}

    let [answ, setAnsw] = useState("")

    let showResult = (event: React.MouseEvent<HTMLInputElement>) => {

        setIsAnswered(prev => !prev)
        let target = event.target as HTMLButtonElement

        if (target.value == question.right_answer) {
            setAnsw(prev => "You are right !")
            setRightAnswersCounter(prev => prev + 1)
        } else {
            setAnsw("You are wrong ...")
        }
    }

    useEffect(() => {
        let elements = document.getElementsByClassName('answers_item')
        for (let i = 0; i < elements.length; i++) {
            let elem = elements[i] as HTMLInputElement

            if (!isAnswered) {
                elem.classList.remove('wrong')
                elem.classList.remove('right')
            } else if (elem.value != question.right_answer) {
                elem.classList.add("wrong")
            } else elem.classList.add("right")

            elem.classList.toggle("not-answered")
        }
    }, [isAnswered])

    let next_question = (event: React.MouseEvent<HTMLButtonElement>) => {
        setQurrentQuestionNumber(prevState => prevState + 1)
        setAnsw("")
        setIsAnswered(prevState => !prevState)
    }

    // @ts-ignore
    return (
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

