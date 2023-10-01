import React, { useState } from 'react';
import logo from './logo.svg';
import './App.scss'
import {QuizBlock } from './components/Question/Question';
import { QuizMenu } from './components/QuizMenu/QuizMenu';


function App() {
  return (
    <QuizMenu/>
    // <QuizBlock/>
  );
}

export default App;
