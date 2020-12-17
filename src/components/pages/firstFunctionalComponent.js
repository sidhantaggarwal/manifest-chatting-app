import React, { useEffect, useState, useRef, useContext } from "react";

import "./common.css";
import ThreeDots from "../threedots/ThreeDots";
import Avatar from "../avatar/Avatar";
import ChatBot from "../chatbot/chatbot";
import Owner from "../owner/owner";
import Button from "../button/button";
import Alert from "@material-ui/lab/Alert";
import UserContext from "../../Context/userContext";
import AnswerContext from "../../Context/answerContext";
import BotContext from "../../Context/botContext";

function FirstFunctionalComp() {
  let el = useRef();
  let user = useContext(UserContext);
  let answer = useContext(AnswerContext);
  let bot = useContext(BotContext);

  let [state, setState] = useState({
    his: [],
    questionNum: -1,
    typing: false,
    chatNum: 0,
    answerNum: 0,
    questionPoint: 1,
    hisNum: 0,
    ownerFlag: 0,
    toggle: true,
    message: null,
    startChat: true
  });

  useEffect(
    () => {
      chatStart();
      scrollToBottom();
    },
    [state.chatNum, state.hisNum, state.answerNum]
  );

  useEffect(() => {
    scrollToBottom();
  });

  let scrollToBottom = () => {
    el.current.scrollIntoView({ behavior: "smooth", block: "end" });
  };

  let chatStart = () => {
    setTimeout(() => {
      setState({ ...state, message: null });
    }, 2000);
    setState({ ...state, typing: true });
    setTimeout(() => {
      if (bot[state.chatNum] && state.toggle) {
        let msg = state.his;
        msg.push(bot[state.chatNum]);
        setState({ ...state, his: msg });
        if (state.questionNum > 4) {
          setState({ ...state, questionNum: -1 });
        }
        if (bot[state.chatNum].question === 2) {
          setState({
            ...state,
            questionNum: state.questionNum + state.questionPoint,
            chatNum: ++state.chatNum,
            hisNum: ++state.hisNum,
            typing: false,
            toggle: false
          });
        } else {
          console.log(state.chatNum, state.his);
          setState({
            ...state,
            chatNum: ++state.chatNum,
            hisNum: ++state.hisNum,
            typing: true
          });
          // chatStart();
        }
      } else {
        if (state.questionNum > 4) {
          setState({ ...state, questionNum: -1 });
        } else {
          setState({ ...state, typing: false, questionNum: 4 });
          return false;
        }
      }
    }, 1500);
  };

  let restartChat = () => {
    console.log("questionNum", state.questionNum);
    if (state.toggle === true) return false;
    else {
      setState({
        ...state,
        his: [],
        questionNum: -1,
        chatNum: 0,
        answerNum: 0,
        questionPoint: 1,
        hisNum: 0,
        message: 0,
        toggle: true
      });
      // chatStart();
    }
  };

  let onClickAnswer = value => {
    console.log("Click", value);
    switch (state.questionNum) {
      case 0:
        if (value === "Yes") {
          setState({
            ...state,
            questionPoint: ++state.questionPoint,
            typing: false
          });
          makingAnswerHis(0, 0);
        } else {
          setState({
            ...state,
            questionPoint: state.questionPoint++,
            typing: false
          });
          makingAnswerHis(0, 1);
        }
        break;
      case 1:
        if (value === "Yes") {
          setState({
            ...state,
            questionPoint: ++state.questionPoint,
            typing: false
          });
          makingAnswerHis(1, 0);
        } else {
          setState({
            ...state,
            questionPoint: ++state.questionPoint,
            typing: false
          });
          makingAnswerHis(1, 1);
        }
        break;
      case 2:
        if (value === "Active") {
          setState({
            ...state,
            questionPoint: ++state.questionPoint,
            typing: false
          });
          makingAnswerHis(2, 0);
        } else {
          setState({
            ...state,
            questionPoint: ++state.questionPoint,
            typing: false
          });
          makingAnswerHis(2, 1);
        }
        break;
      case 3:
        setState({
          ...state,
          questionPoint: ++state.questionPoint,
          typing: false
        });
        makingAnswerHis(3, value);
        break;
      case 4:
        // chatStart();
        setState({
          ...state,
          his: [],
          questionNum: -1,
          chatNum: 0,
          answerNum: 0,
          questionPoint: 1,
          hisNum: 0,
          toggle: true
        });
        break;
    }
  };

  let makingAnswerHis = (firstParam, secondParam) => {
    if (firstParam === 3) {
      let mg = state.his;
      let newAnswer = { type: 2, message: secondParam };
      mg.push(newAnswer);
      setState({
        ...state,
        his: mg,
        questionNum: -1,
        hisNum: state.hisNum + 1,
        typing: true,
        toggle: true
      });
    } else {
      let mg = state.his;
      let newAnswer = {
        type: 2,
        message: answer[firstParam].message[secondParam]
      };
      mg.push(newAnswer);
      setState({
        ...state,
        his: mg,
        questionNum: -1,
        hisNum: state.hisNum + 1,
        typing: true,
        toggle: true
      });
    }
    // chatStart();
  };

  let onClickImage = num => {
    if (state.toggle === true) return false;
    let mg = state.his;
    let newArray = mg.slice(0, num * 1);
    if (num === 3) {
      console.log(num, newArray);
      setState({
        ...state,
        questionNum: 0,
        chatNum: 3,
        answerNum: 0,
        questionPoint: 1,
        hisNum: 2
      });
      console.log(state.his);
    } else if (num === 5) {
      setState({
        ...state,
        questionNum: 1,
        chatNum: 4,
        answerNum: 1,
        questionPoint: 2,
        hisNum: 4
      });
    } else if (num === 10) {
      setState({
        ...state,
        questionNum: 2,
        chatNum: 8,
        answerNum: 2,
        questionPoint: 3,
        hisNum: 9
      });
    } else if (num === 13) {
      setState({
        ...state,
        questionNum: 3,
        chatNum: 12,
        answerNum: 3,
        questionPoint: 4,
        hisNum: 12
      });
    }
    setState({
      ...state,
      his: newArray,
      toggle: true,
      message: 1
    });
    setTimeout(() => {
      setState({ ...state, message: null });
    }, 2000);
  };

  return (
    <div>
      <div>
        {state.message === 0 ? (
          <Alert
            style={{ position: "fixed", right: 10, top: 120, zIndex: 2 }}
            severity="info"
          >
            Chat experience will restart.
          </Alert>
        ) : null}
        {state.message === 1 ? (
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
        <div className="main-container" ref={el}>
          <div className="middle-container">
            <ul className="center-ul">
              <li className="avatar-list">
                <img src="/asset/img/henry.png" className="henry-avatar" />
              </li>
              <li className="henry-name">
                <label>{user.name}</label>
              </li>
              <li className="henry-reception">
                <label>{user.about}</label>
              </li>
            </ul>

            <div className="message-content">
              {state.his.map((msg, index) => {
                if (msg) {
                  if (msg.type === 1) {
                    return (
                      <div style={{ display: "flex" }} key={index}>
                        <Avatar />
                        <ChatBot message={msg.message} />
                      </div>
                    );
                  } else {
                    return (
                      <Owner
                        onClickImage={onClickImage}
                        values={index}
                        message={msg.message}
                      />
                    );
                  }
                } else return false;
              })}
              {state.typing ? (
                <div className="three-dots">
                  {" "}
                  <ThreeDots />
                </div>
              ) : null}
            </div>
          </div>
          {answer.map((item, index) => {
            // console.log(state.questionNum === index);
            // if (state.questionNum === index) {
            // console.log(index, state.questionNum);
            return (
              <Button
                message={item.btnText}
                onClickAnswer={onClickAnswer}
                dispFlag={state.questionNum == index ? "block" : "none"}
              />
            );
            // }
          })}
          {/* <Button message = {btn}/> */}
        </div>
      </div>
      <div className="right-flex" />
    </div>
  );
}

export default FirstFunctionalComp;
