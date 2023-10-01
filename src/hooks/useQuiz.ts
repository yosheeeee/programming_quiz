import { useEffect, useState } from "react"
import { IQuestion } from "../components/Question/Question"

export interface IUseQuizRezult{
    currentQuestionNumber : number,
        question : IQuestion,
        answ : string,
        isAnswered : boolean,
        next_question : React.MouseEventHandler,
        showResult : React.MouseEventHandler,
        rightAnswersCounter : number
}

export default function useQuiz({questions , elements} : {questions : any , elements: HTMLCollectionOf<Element>}) : IUseQuizRezult {

    questions  = questions as IQuestion[]
    let [isAnswered, setIsAnswered] = useState(false)
    let [currentQuestionNumber, setQurrentQuestionNumber] = useState(0)
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
        console.log(elements);
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

    return {
        currentQuestionNumber,
        question,
        answ,
        isAnswered,
        next_question,
        showResult,
        rightAnswersCounter
    }
}