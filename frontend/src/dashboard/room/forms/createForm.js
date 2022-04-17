import React, { useEffect, useState } from "react";
import "./joinForm.js";

const CreateForm = (func) => {
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState();

    useEffect(() => {
        setToken(func.accessToken);
    }, [func]);

    function formResultToObject(e) {
        e.preventDefault();
        let result = {};
        for (let i = 0; i < e.target.length - 2; i++) {
            if (e.target[i].type === "checkbox") {
                result[e.target[i].id] = e.target[i].checked;
            } else {
                result[e.target[i].id] = e.target[i].value;
            }
        }
        setLoading(true);
        console.log(result, token);
    }

    return (
        <div className="create-form">
            {!loading ? (
                <div className="create-form-content">
                    <h1>Create A Room</h1>
                    <form
                        onSubmit={(e) => {
                            formResultToObject(e);
                        }}
                    >
                        <div className="create-form-inputs">
                            <label>
                                <h3>Name</h3>
                                <input
                                    id="room_name"
                                    name="room_name"
                                    type="text"
                                    placeholder="Room name"
                                />
                            </label>
                            <label>
                                <h3>Description</h3>
                                <textarea
                                    id="room_description"
                                    name="room_description"
                                    placeholder="Write here the description of your room."
                                ></textarea>
                            </label>

                            <div className="radio-option">
                                <div className="radio-option-info">
                                    <h2>Party mode</h2>
                                    <p>
                                        Creates a playlist and aftermovie
                                        afterwards.
                                    </p>
                                </div>
                                <div className="radio">
                                    <label className="switch">
                                        <input
                                            type="checkbox"
                                            id="party_mode"
                                        />
                                        <span className="slider round"></span>
                                    </label>
                                </div>
                            </div>

                            <div className="radio-option">
                                <div className="radio-option-info">
                                    <h2>Save Data</h2>
                                    <p>Save data for statistics tests.</p>
                                </div>
                                <div className="radio">
                                    <label className="switch">
                                        <input type="checkbox" id="save_data" />
                                        <span className="slider round"></span>
                                    </label>
                                </div>
                            </div>
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
                        <button
                            className="cta-button submit-button"
                            type="submit"
                        >
                            Create Room
                        </button>
                    </form>
                </div>
            ) : (
                <div className="create-form-loading">
                    <h2>Your room is being created</h2>
                    <div className="loading-animation">
                        <span className="loading-ball" id="loading-ball1">
                            {" "}
                        </span>
                        <span className="loading-ball" id="loading-ball2">
                            {" "}
                        </span>
                        <span className="loading-ball" id="loading-ball3">
                            {" "}
                        </span>
                    </div>
                    <button
                        className="border-button"
                        onClick={() => {
                            setLoading(false);
                        }}
                    >
                        Cancel
                    </button>
                </div>
            )}
        </div>
    );
};

export default CreateForm;
