import React, { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAlert } from "react-alert";
import "./common.css";
import ThreeDots from "../threedots/ThreeDots";
import Avatar from "../avatar/Avatar";
import ChatBot from "../chatbot/chatbot";
import Owner from "../owner/owner";
// import DatePicker from 'react-mobile-datepicker';
import Button from "../button/button";
// // import Hamburger from "/asset/hamburger.png"
// import {NotificationContainer, NotificationManager} from 'react-notifications';
// import   Toasts  from 'react-toast-notifications'
import Alert from "@material-ui/lab/Alert";

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
    message: "Passive investors like their investments to be managed for them.",
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

const FirstFunctionalComp = () => {
  const [his, setHis] = useState([]);
  const [questionNum, setQuestionNum] = useState(-1);
  const [typing, setTyping] = useState(false);
  const [chatNum, setChatNum] = useState(0);
  const [answerNum, setAnswerNum] = useState(0);
  const [questionPoint, setQuestionPoint] = useState(1);
  const [hisNum, setHisNum] = useState(0);
  const [ownerFlag, setOwnerFlag] = useState(0);
  const [toggle, setToggle] = useState(true);
  const [message, setMessage] = useState(null);

  const myInput = useRef();

  useEffect(() => {
    chatStart();
    scrollToBottom();
  });

  const scrollToBottom = () => {
    myInput.current.scrollIntoView({ behavior: "smooth", block: "end" });
  };

  const chatStart = () => {
    setTimeout(() => {
      setMessage(null);
    }, 2000);
    setTyping(true);
    setTimeout(() => {
      if (bot[chatNum] && toggle) {
        let msg = his;
        msg.push(bot[chatNum]);
        setHis(msg);
        if (questionNum > 4) {
          setQuestionNum(-1);
        }
        if (bot[chatNum].question === 2) {
          setQuestionNum(questionNum + questionPoint);
          setChatNum(chatNum + 1);
          setHisNum(hisNum + 1);
          setTyping(false);
          setToggle(false);
        } else {
          setChatNum(chatNum + 1);
          setHisNum(hisNum + 1);
          setTyping(true);

          chatStart();
        }
      } else {
        if (questionNum > 4) {
          setQuestionNum(-1);
        } else {
          setTyping(false);
          setQuestionNum(4);

          return false;
        }
      }
    }, 1500);
  };

  const restartChat = () => {
    if (toggle == true) return false;
    else {
      setHis([]);
      setQuestionNum(-1);
      setChatNum(0);
      setAnswerNum(0);
      setQuestionPoint(1);
      setHisNum(0);
      setMessage(0);
      setToggle(true);
    }
    chatStart();
  };

  const onPressMeth = value => {
    switch (questionNum) {
      case 0:
        if (value == "Yes") {
          setQuestionPoint(questionPoint + 1);
          setTyping(false);

          makingAnswerHis(0, 0);
        } else {
          setQuestionPoint(questionPoint + 1);
          setTyping(false);
          makingAnswerHis(0, 1);
        }
        break;
      case 1:
        if (value == "Yes") {
          setQuestionPoint(questionPoint + 1);
          setTyping(false);
          makingAnswerHis(1, 0);
        } else {
          setQuestionPoint(questionPoint + 1);
          setTyping(false);
          makingAnswerHis(1, 1);
        }
        break;
      case 2:
        if (value == "Active") {
          setQuestionPoint(questionPoint + 1);
          setTyping(false);
          makingAnswerHis(2, 0);
        } else {
          setQuestionPoint(questionPoint + 1);
          setTyping(false);
          makingAnswerHis(2, 1);
        }
        break;
      case 3:
        setQuestionPoint(questionPoint + 1);
        setTyping(false);
        makingAnswerHis(3, value);
        break;
      case 4:
        chatStart();
        setHis([]);
        setQuestionNum(-1);
        setChatNum(0);
        setQuestionPoint(1);
        setHisNum(0);
        setToggle(true);

        break;
    }
  };

  const makingAnswerHis = (firstParam, secondParam) => {
    if (firstParam == 3) {
      let mg = his;
      let newAnswer = { type: 2, message: secondParam };
      mg.push(newAnswer);
      setHis(mg);
      setQuestionNum(-1);
      setHisNum(hisNum + 1);
      setTyping(true);
      setToggle(true);
    } else {
      let mg = his;
      let newAnswer = {
        type: 2,
        message: answer[firstParam].message[secondParam]
      };
      mg.push(newAnswer);

      setHis(mg);
      setQuestionNum(-1);
      setHisNum(hisNum + 1);
      setTyping(true);
      setToggle(true);
    }
    chatStart();
  };

  const onPressImage = num => {
    if (toggle === true) return false;
    let mg = his;
    let newArray = mg.slice(0, num * 1);
    if (num === 3) {
      setQuestionNum(0);
      setChatNum(3);
      setAnswerNum(0);
      setQuestionPoint(1);
      setHisNum(2);
    } else if (num === 5) {
      setQuestionNum(1);
      setChatNum(4);
      setAnswerNum(1);
      setQuestionPoint(2);
      setHisNum(4);
    } else if (num === 10) {
      setQuestionNum(2);
      setChatNum(8);
      setAnswerNum(2);
      setQuestionPoint(3);
      setHisNum(9);
    } else if (num == 13) {
      setQuestionNum(3);
      setChatNum(12);
      setAnswerNum(3);
      setQuestionPoint(4);
      setHisNum(12);
    }
    setHis(newArray);
    setToggle(true);
    setMessage(1);
    setTimeout(() => {
      setMessage(null);
    }, 2000);
  };

  return (
    <div>
      <div>
        {message === 0 ? (
          <Alert
            style={{ position: "fixed", right: 10, top: 120, zIndex: 2 }}
            severity="info"
          >
            Chat experience will restart.
          </Alert>
        ) : null}
        {message === 1 ? (
          <Alert
            style={{ position: "fixed", right: 10, top: 120, zIndex: 2 }}
            severity="info"
          >
            Reselect your answer.
          </Alert>
        ) : null}
      </div>
      <div className="middle-flex">
        <div className="header-menu">
          <div className="header-content">
            <label>Manifest</label>
          </div>
          <img
            src="/asset/img/hamburger.png"
            onClick={restartChat}
            className="hamburger-icon"
          />
        </div>
        <div className="main-container" ref={myInput}>
          <div className="middle-container">
            <ul className="center-ul">
              <li className="avatar-list">
                <img src="/asset/img/henry.png" className="henry-avatar" />
              </li>
              <li className="henry-name">
                <label>Henry</label>
              </li>
              <li className="henry-reception">
                <label>TRANSFER SPECIALIST</label>
              </li>
            </ul>

            <div className="message-content">
              {his.map((msg, index) => {
                // let ownerFlag = this.state.answerType.length -1;
                if (msg) {
                  if (msg.type === 1) {
                    return (
                      <div style={{ display: "flex" }}>
                        <Avatar />
                        <ChatBot message={msg.message} />
                      </div>
                    );
                  } else {
                    return (
                      <Owner
                        onPressImage={onPressImage}
                        values={index}
                        message={msg.message}
                      />
                    );
                  }
                } else return false;
              })}
              {typing ? (
                <div className="three-dots">
                  {" "}
                  <ThreeDots />
                </div>
              ) : null}
            </div>
          </div>
          {answer.map((item, index) => {
            return (
              <Button
                message={item.btnText}
                onPressMeth={onPressMeth}
                dispFlag={questionNum == index ? "block" : "none"}
              />
            );
          })}
          {/* <Button message = {btn}/> */}
        </div>
      </div>
      <div className="right-flex" />
    </div>
  );
};

export default FirstFunctionalComp;
