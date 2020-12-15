import React, { FunctionComponent, useEffect } from "react";
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

class First extends React.Component {
  constructor() {
    super();
    this.state = {
      his: [],
      questionNum: -1,
      typing: false,
      chatNum: 0,
      answerNum: 0,
      qestionPoint: 1,
      hisNum: 0,
      ownerFlag: 0,
      toggle: true,
      message: null
    };
    this.chatStart = this.chatStart.bind(this);
  }

  componentDidMount = () => {
    this.chatStart();
    this.scrollToBottom();
  };
  componentDidUpdate() {
    this.scrollToBottom();
  }
  scrollToBottom = () => {
    this.el.scrollIntoView({ behavior: "smooth", block: "end" });
  };
  chatStart = () => {
    setTimeout(() => {
      this.setState({ message: null });
    }, 2000);
    this.setState({ typing: true });
    setTimeout(() => {
      if (bot[this.state.chatNum] && this.state.toggle) {
        let msg = this.state.his;
        msg.push(bot[this.state.chatNum]);
        this.setState({ his: msg });
        if (this.state.questionNum > 4) {
          this.setState({ questionNum: -1 });
        }
        if (bot[this.state.chatNum].question == 2) {
          this.setState({
            questionNum: this.state.questionNum + this.state.qestionPoint,
            chatNum: this.state.chatNum + 1,
            hisNum: this.state.hisNum + 1,
            typing: false,
            toggle: false
          });
        } else {
          this.setState({
            chatNum: this.state.chatNum + 1,
            hisNum: this.state.hisNum + 1,
            typing: true
          });
          this.chatStart();
        }
      } else {
        if (this.state.questionNum > 4) {
          this.setState({ questionNum: -1 });
        } else {
          this.setState({ typing: false, questionNum: 4 });
          return false;
        }
      }
    }, 1500);
  };
  restartChat = () => {
    if (this.state.toggle == true) return false;
    else {
      this.setState({
        his: [],
        questionNum: -1,
        chatNum: 0,
        answerNum: 0,
        qestionPoint: 1,
        hisNum: 0,
        message: 0,
        toggle: true
      });
      this.chatStart();
    }
  };
  onPressMeth = value => {
    switch (this.state.questionNum) {
      case 0:
        if (value == "Yes") {
          this.setState({
            qestionPoint: this.state.qestionPoint + 1,
            typing: false
          });
          this.makingAnswerHis(0, 0);
        } else {
          this.setState({
            qestionPoint: this.state.qestionPoint + 1,
            typing: false
          });
          this.makingAnswerHis(0, 1);
        }
        break;
      case 1:
        if (value == "Yes") {
          this.setState({
            qestionPoint: this.state.qestionPoint + 1,
            typing: false
          });
          this.makingAnswerHis(1, 0);
        } else {
          this.setState({
            qestionPoint: this.state.qestionPoint + 1,
            typing: false
          });
          this.makingAnswerHis(1, 1);
        }
        break;
      case 2:
        if (value == "Active") {
          this.setState({
            qestionPoint: this.state.qestionPoint + 1,
            typing: false
          });
          this.makingAnswerHis(2, 0);
        } else {
          this.setState({
            qestionPoint: this.state.qestionPoint + 1,
            typing: false
          });
          this.makingAnswerHis(2, 1);
        }
        break;
      case 3:
        this.setState({
          qestionPoint: this.state.qestionPoint + 1,
          typing: false
        });
        this.makingAnswerHis(3, value);
        break;
      case 4:
        this.chatStart();
        this.setState({
          his: [],
          questionNum: -1,
          chatNum: 0,
          answerNum: 0,
          qestionPoint: 1,
          hisNum: 0,
          toggle: true
        });

        break;
    }
  };
  makingAnswerHis = (firstParam, secondParam) => {
    if (firstParam == 3) {
      let mg = this.state.his;
      let newAnswer = { type: 2, message: secondParam };
      mg.push(newAnswer);
      this.setState({
        his: mg,
        questionNum: -1,
        hisNum: this.state.hisNum + 1,
        typing: true,
        toggle: true
      });
    } else {
      let mg = this.state.his;
      let newAnswer = {
        type: 2,
        message: answer[firstParam].message[secondParam]
      };
      mg.push(newAnswer);
      this.setState({
        his: mg,
        questionNum: -1,
        hisNum: this.state.hisNum + 1,
        typing: true,
        toggle: true
      });
    }
    this.chatStart();
    console.log(this.state.his);
  };
  onPressImage = num => {
    if (this.state.toggle == true) return false;
    let mg = this.state.his;
    let newArray = mg.slice(0, num * 1);
    if (num == 3)
      this.setState({
        questionNum: 0,
        chatNum: 3,
        answerNum: 0,
        qestionPoint: 1,
        hisNum: 2
      });
    else if (num == 5)
      this.setState({
        questionNum: 1,
        chatNum: 4,
        answerNum: 1,
        qestionPoint: 2,
        hisNum: 4
      });
    else if (num == 10)
      this.setState({
        questionNum: 2,
        chatNum: 8,
        answerNum: 2,
        qestionPoint: 3,
        hisNum: 9
      });
    else if (num == 13)
      this.setState({
        questionNum: 3,
        chatNum: 12,
        answerNum: 3,
        qestionPoint: 4,
        hisNum: 12
      });
    this.setState({
      his: newArray,
      toggle: true,
      message: 1
    });
    setTimeout(() => {
      this.setState({ message: null });
    }, 2000);
  };

  render() {
    return (
      <div>
        <div>
          {this.state.message == 0 ? (
            <Alert
              style={{ position: "fixed", right: 10, top: 120, zIndex: 2 }}
              severity="info"
            >
              Chat experience will restart.
            </Alert>
          ) : null}
          {this.state.message == 1 ? (
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
              onClick={this.restartChat}
              className="hamburger-icon"
            />
          </div>
          <div
            className="main-container"
            ref={el => {
              this.el = el;
            }}
          >
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
                {this.state.his.map((msg, index) => {
                  // let ownerFlag = this.state.answerType.length -1;
                  if (msg) {
                    if (msg.type == 1) {
                      return (
                        <div style={{ display: "flex" }}>
                          <Avatar />
                          <ChatBot message={msg.message} />
                        </div>
                      );
                    } else {
                      return (
                        <Owner
                          onPressImage={this.onPressImage}
                          values={index}
                          message={msg.message}
                        />
                      );
                    }
                  } else return false;
                })}
                {this.state.typing ? (
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
                  onPressMeth={this.onPressMeth}
                  dispFlag={this.state.questionNum == index ? "block" : "none"}
                />
              );
            })}
            {/* <Button message = {btn}/> */}
          </div>
        </div>
        <div className="right-flex" />
      </div>
    );
  }
}
export default First;
