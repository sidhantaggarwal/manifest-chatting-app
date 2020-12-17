import React, { FunctionComponent, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/pages/first";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
// import First from "./components/pages/first";
import UserContext from "./Context/userContext";
import BotContext from "./Context/botContext";
import AnswerContext from "./Context/answerContext";
import First from "./components/pages/firstFunctionalComponent";
import { ToastProvider, useToasts } from "react-toast-notifications";

function App() {
  const [author, setAuthor] = useState({
    name: "Henry",
    about: "TRANSFER SPECIALIST"
  });

  const bot = [
    {
      type: 1,
      message: "Hi! I'm Henry, your personal transfer specialist.",
      question: 1
    },
    {
      type: 1,
      message:
        "Nice work deciding to consolidate your retirement accounts. Choosing the right account can be hard. Luckily, I'm here to help!",
      question: 1
    },
    {
      type: 1,
      message:
        "Tell me, do you have at least 6 months of personal savings outside of your retirement accounts?",
      question: 2
    },
    {
      type: 1,
      message:
        "Some retirement plans allow you to take out loans. Is this feature important to you?",
      question: 2
    },

    {
      type: 1,
      message: "There are 2 types of investors:",
      question: 1
    },
    {
      type: 1,
      message:
        "Active investors prefer to frequently monitor their investment choices, adjust allocations, and follow the market.",
      question: 1
    },
    {
      type: 1,
      message:
        "Passive investors like their investments to be managed for them.",
      question: 1
    },
    {
      type: 1,
      message: "Which one best describes you?",
      question: 2
    },
    {
      type: 1,
      message:
        "We are required by your provider to collect some identity information.",
      question: 1
    },
    {
      type: 1,
      message: "What is your Date of Birth?",
      question: 2
    },
    {
      type: 1,
      message:
        "Thank you for walking me through your preferences, this will make it much easier for us to choose the right destination for you.",
      question: 1
    }
  ];

  const answer = [
    {
      type: 2,
      btnText: ["Yes", "No"],
      message: ["Yes I do", "No I am not."]
    },
    {
      type: 2,
      btnText: ["Yes", "Not Really"],
      message: ["Yes I do", "Not really"]
    },
    {
      type: 2,
      btnText: ["Active", "Passive"],
      message: ["Active", "Passive"]
    },
    {
      type: 2,
      btnText: ["Confirm"],
      message: ["Calendar"]
    },
    {
      type: 2,
      btnText: ["Continue"],
      message: ["Continue"]
    }
  ];

  return (
    <UserContext.Provider value={author}>
      <ToastProvider>
        <BotContext.Provider value={bot}>
          <AnswerContext.Provider value={answer}>
            <First />
          </AnswerContext.Provider>
        </BotContext.Provider>
      </ToastProvider>
    </UserContext.Provider>
  );
}

export default App;
