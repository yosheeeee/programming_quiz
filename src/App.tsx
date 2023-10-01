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

const router = createBrowserRouter([
  {
    path: "/",
    element: <QuizMenu/>,
  },
  {
    path : "/quiz",
    element : <QuizBlock questions={questions.cs}/>
  }
]);

function App() {


  return (
    <RouterProvider router={router} />
  );
}

export default App;
