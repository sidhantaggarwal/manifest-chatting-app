import React, { useState, useEffect } from "react";
import "./button.css";
//import DatePicker from "react-mobile-datepicker";

const Button = props => {
  const [time, setTime] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState(null);
  // console.log(props.dispFlag);

  const updateData = e => {
    setDate(e.target.value);
  };

  return (
    <div style={{ display: props.dispFlag }}>
      <div className="bottom-fixed">
        <div className="button-group">
          {props.message.map((msg, i) => {
            if (msg == "Confirm" && time === null) {
              return (
                <div className="datepicker-button" key={i}>
                  <center>
                    <button
                      className="buttons"
                      disabled={date ? null : "disabled"}
                      onClick={() => props.onClickAnswer(date)}
                    >
                      Confirm
                    </button>
                    <input
                      type="date"
                      defaultValue={new Date()}
                      className="date-picker"
                      onChange={updateData}
                    />
                  </center>
                </div>
              );
            } else if (time) {
              // console.log("Else", props.dispFlag);
              return (
                <div className="right-button" key={i}>
                  <center>
                    <button
                      className="buttons"
                      onClick={() => props.onClickAnswer("Continue")}
                    >
                      Continue
                    </button>
                  </center>
                </div>
              );
            } else if (msg !== "Continue") {
              // console.log("Else", props.dispFlag);
              return (
                <div className="right-button" key={i}>
                  <center>
                    <button
                      className="buttons"
                      onClick={() => props.onClickAnswer(msg)}
                    >
                      {msg}
                    </button>
                  </center>
                </div>
              );
            }
          })}
        </div>
        <center>
          <div className="hr-line" />
        </center>
      </div>
    </div>
  );
};

export default Button;
