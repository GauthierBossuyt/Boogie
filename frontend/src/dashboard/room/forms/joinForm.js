import React from "react";
import "./forms.css";

const JoinForm = (func) => {
    const input1 = React.createRef();
    const input2 = React.createRef();
    const input3 = React.createRef();
    const input4 = React.createRef();

    function OnFocus(e) {
        if (e.target.value.length > 0) {
            switch (e.target.nextSibling.id) {
                case "2":
                    input2.current.focus();
                    break;
                case "3":
                    input3.current.focus();
                    break;
                case "4":
                    input4.current.focus();
                    break;
                default:
                    break;
            }
        }
    }

    return (
        <div className="join-form">
            <div className="join-form-content">
                <h1>Fill in the room code</h1>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        let value = "";
                        for (let i = 0; i < 4; i++) {
                            value += e.target[i].value;
                        }
                        console.log(value);
                    }}
                >
                    <div className="input-fields">
                        <input
                            type="text"
                            ref={input1}
                            maxLength={1}
                            id="1"
                            onChange={OnFocus}
                        ></input>
                        <input
                            type="text"
                            ref={input2}
                            id="2"
                            onChange={OnFocus}
                            maxLength={1}
                        ></input>
                        <input
                            type="text"
                            ref={input3}
                            id="3"
                            onChange={OnFocus}
                            maxLength={1}
                        ></input>
                        <input
                            type="text"
                            ref={input4}
                            id="4"
                            maxLength={1}
                        ></input>
                    </div>
                    <button
                        type="button"
                        className="border-button"
                        onClick={() => {
                            func.func("selection");
                        }}
                    >
                        Back
                    </button>
                    <button className="cta-button submit-button" type="submit">
                        Join Room
                    </button>
                </form>
            </div>
        </div>
    );
};

export default JoinForm;
