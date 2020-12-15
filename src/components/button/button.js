import React, { useState } from "react";
import "./button.css";
//import DatePicker from "react-mobile-datepicker";

const Button = props => {
  const [time, setTime] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState(null);

  const updateData = e => {
    setDate(e.target.value);
  };

  return (
    <div style={{ display: props.dispFlag }}>
      <div className="bottom-fixed">
        <div className="button-group">
          {props.message.map(msg => {
            if (msg == "Confirm") {
              return (
                <div className="datepicker-button">
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
                      defaultValue={time}
                      className="date-picker"
                      onChange={updateData}
                    />
                  </center>
                </div>
              );
            } else {
              return (
                <div className="right-button">
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
