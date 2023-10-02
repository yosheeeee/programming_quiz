import React, { useState } from 'react';
import logo from './logo.svg';
import './App.scss'
import {QuizBlock } from './components/Question/Question';
import { QuizMenu } from './components/QuizMenu/QuizMenu';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import quest from './questions.json'

let questions   = JSON.parse(JSON.stringify(quest))

let routes = [
  {
    path: "/",
    element: <QuizMenu/>,
  }
]

for (let key in questions){
  routes.push({
    path: `/quiz/${key}`,
    element : <QuizBlock questions={questions[key]}/>
  })
}
const router = createBrowserRouter(routes);

function App() {


  return (
    <RouterProvider router={router} />
  );
}

export default App;
