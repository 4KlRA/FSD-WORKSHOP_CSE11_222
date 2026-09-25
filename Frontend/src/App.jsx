import { useState } from "react";
import axios from "axios";
import "./App.css";

const API_URL = "http://localhost:3000";

function App() {

    /* =========================
       PAGE
    ========================= */

    const [page, setPage] = useState("tester");


    /* =========================
       API TESTER STATES
    ========================= */

    const [method, setMethod] = useState("GET");

    const [endpoint, setEndpoint] = useState("/user");

    const [requestBody, setRequestBody] = useState(
        JSON.stringify(
            {
                name: "Rahul",
                age: 20
            },
            null,
            2
        )
    );

    const [response, setResponse] = useState(null);

    const [status, setStatus] = useState("");

    const [loading, setLoading] = useState(false);


    /* =========================
       SIGNUP STATES
    ========================= */

    const [signupData, setSignupData] = useState({
        name: "",
        age: ""
    });

    const [signupResponse, setSignupResponse] = useState(null);

    const [signupStatus, setSignupStatus] = useState("");

    const [signupLoading, setSignupLoading] = useState(false);


    /* =====================================================
       API TESTER
    ===================================================== */

    const sendRequest = async () => {

        setLoading(true);

        setResponse(null);

        setStatus("");

        try {

            let result;


            /* GET */

            if (method === "GET") {

                result = await axios.get(
                    `${API_URL}${endpoint}`
                );

            }


            /* POST */

            if (method === "POST") {

                const data = JSON.parse(requestBody);

                result = await axios.post(
                    `${API_URL}${endpoint}`,
                    data
                );

            }


            /* PUT */

            if (method === "PUT") {

                const data = JSON.parse(requestBody);

                result = await axios.put(
                    `${API_URL}${endpoint}`,
                    data
                );

            }


            /* DELETE */

            if (method === "DELETE") {

                result = await axios.delete(
                    `${API_URL}${endpoint}`
                );

            }


            setStatus(
                `${result.status} ${result.statusText}`
            );

            setResponse(result.data);

        }
        catch (error) {

            console.error(error);

            if (error.response) {

                setStatus(
                    `${error.response.status} ${error.response.statusText}`
                );

                setResponse(error.response.data);

            }
            else {

                setStatus("Request failed");

                setResponse({
                    message: error.message
                });

            }

        }
        finally {

            setLoading(false);

        }
    };


    /* =====================================================
       SELECT ENDPOINT
    ===================================================== */

    const selectEndpoint = (
        selectedEndpoint,
        selectedMethod
    ) => {

        setEndpoint(selectedEndpoint);

        setMethod(selectedMethod);

    };


    /* =====================================================
       HANDLE SIGNUP CHANGE
    ===================================================== */

    const handleChange = (e) => {

        const { name, value } = e.target;

        setSignupData({
            ...signupData,
            [name]: value
        });

    };


    /* =====================================================
       HANDLE SIGNUP SUBMIT
    ===================================================== */

    const handleSubmit = async (e) => {

        e.preventDefault();

        setSignupLoading(true);

        setSignupResponse(null);

        setSignupStatus("");

        try {

            const response = await axios.post(
                `${API_URL}/signup`,
                {
                    name: signupData.name,
                    age: Number(signupData.age)
                }
            );


            console.log(
                "Signup successful:",
                response.data
            );


            setSignupStatus(
                `${response.status} ${response.statusText}`
            );


            setSignupResponse(
                response.data
            );


            /* Clear form */

            setSignupData({
                name: "",
                age: ""
            });

        }
        catch (error) {

            console.error(
                "Signup failed:",
                error
            );


            if (error.response) {

                setSignupStatus(
                    `${error.response.status} ${error.response.statusText}`
                );

                setSignupResponse(
                    error.response.data
                );

            }
            else {

                setSignupStatus(
                    "Signup failed"
                );

                setSignupResponse({
                    message: error.message
                });

            }

        }
        finally {

            setSignupLoading(false);

        }
    };


    /* =====================================================
       UI
    ===================================================== */

    return (

        <div className="app">


            {/* ================= HEADER ================= */}

            <header className="header">

                <h1>
                    REST API TESTER
                </h1>

                <p>
                    React Frontend + Express Backend
                </p>


                {/* NAVIGATION */}

                <nav className="navbar">

                    <button
                        className={
                            page === "tester"
                                ? "nav-active"
                                : ""
                        }
                        onClick={() =>
                            setPage("tester")
                        }
                    >
                        API Tester
                    </button>


                    <button
                        className={
                            page === "signup"
                                ? "nav-active"
                                : ""
                        }
                        onClick={() =>
                            setPage("signup")
                        }
                    >
                        Signup
                    </button>

                </nav>

            </header>


            {/* =================================================
                API TESTER PAGE
            ================================================= */}

            {page === "tester" && (

                <main className="container">


                    {/* REQUEST */}

                    <section className="tester-card">

                        <h2>
                            API Request
                        </h2>


                        <div className="request-row">


                            {/* METHOD */}

                            <select
                                value={method}
                                onChange={(e) =>
                                    setMethod(
                                        e.target.value
                                    )
                                }
                            >

                                <option value="GET">
                                    GET
                                </option>

                                <option value="POST">
                                    POST
                                </option>

                                <option value="PUT">
                                    PUT
                                </option>

                                <option value="DELETE">
                                    DELETE
                                </option>

                            </select>


                            {/* ENDPOINT */}

                            <input
                                type="text"
                                value={endpoint}
                                onChange={(e) =>
                                    setEndpoint(
                                        e.target.value
                                    )
                                }
                                placeholder="/user"
                            />


                            {/* SEND */}

                            <button
                                onClick={sendRequest}
                                disabled={loading}
                            >

                                {loading
                                    ? "Sending..."
                                    : "Send"}

                            </button>

                        </div>


                        {/* REQUEST BODY */}

                        {(method === "POST" ||
                            method === "PUT") && (

                            <div className="body-section">

                                <h3>
                                    Request Body
                                </h3>

                                <textarea
                                    value={requestBody}
                                    onChange={(e) =>
                                        setRequestBody(
                                            e.target.value
                                        )
                                    }
                                />

                            </div>

                        )}

                    </section>


                    {/* ENDPOINTS */}

                    <section className="endpoints-card">

                        <h2>
                            Available Endpoints
                        </h2>


                        <div className="endpoint-list">


                            <button
                                className="endpoint"
                                onClick={() =>
                                    selectEndpoint(
                                        "/",
                                        "GET"
                                    )
                                }
                            >

                                <span className="get">
                                    GET
                                </span>

                                <span>
                                    /
                                </span>

                            </button>


                            <button
                                className="endpoint"
                                onClick={() =>
                                    selectEndpoint(
                                        "/msg",
                                        "GET"
                                    )
                                }
                            >

                                <span className="get">
                                    GET
                                </span>

                                <span>
                                    /msg
                                </span>

                            </button>


                            <button
                                className="endpoint"
                                onClick={() =>
                                    selectEndpoint(
                                        "/user",
                                        "GET"
                                    )
                                }
                            >

                                <span className="get">
                                    GET
                                </span>

                                <span>
                                    /user
                                </span>

                            </button>


                            <button
                                className="endpoint"
                                onClick={() =>
                                    selectEndpoint(
                                        "/user/1",
                                        "GET"
                                    )
                                }
                            >

                                <span className="get">
                                    GET
                                </span>

                                <span>
                                    /user/:id
                                </span>

                            </button>


                            <button
                                className="endpoint"
                                onClick={() =>
                                    selectEndpoint(
                                        "/create",
                                        "POST"
                                    )
                                }
                            >

                                <span className="post">
                                    POST
                                </span>

                                <span>
                                    /create
                                </span>

                            </button>


                            <button
                                className="endpoint"
                                onClick={() =>
                                    selectEndpoint(
                                        "/signup",
                                        "POST"
                                    )
                                }
                            >

                                <span className="post">
                                    POST
                                </span>

                                <span>
                                    /signup
                                </span>

                            </button>


                            <button
                                className="endpoint"
                                onClick={() =>
                                    selectEndpoint(
                                        "/user/1",
                                        "PUT"
                                    )
                                }
                            >

                                <span className="put">
                                    PUT
                                </span>

                                <span>
                                    /user/:id
                                </span>

                            </button>


                            <button
                                className="endpoint"
                                onClick={() =>
                                    selectEndpoint(
                                        "/user/1",
                                        "DELETE"
                                    )
                                }
                            >

                                <span className="delete">
                                    DELETE
                                </span>

                                <span>
                                    /user/:id
                                </span>

                            </button>

                        </div>

                    </section>


                    {/* RESPONSE */}

                    <section className="response-card">

                        <div className="response-header">

                            <h2>
                                Response
                            </h2>


                            {status && (

                                <span
                                    className={
                                        status.startsWith("2")
                                            ? "status success"
                                            : "status error"
                                    }
                                >
                                    {status}
                                </span>

                            )}

                        </div>


                        <pre>

                            {response
                                ? JSON.stringify(
                                    response,
                                    null,
                                    2
                                )
                                : "Response will appear here..."}

                        </pre>

                    </section>

                </main>

            )}


            {/* =================================================
                SIGNUP PAGE
            ================================================= */}

            {page === "signup" && (

                <main className="signup-container">


                    <section className="signup-card">

                        <h2>
                            Create Account
                        </h2>

                        <p className="signup-subtitle">
                            Register a new user
                        </p>


                        {/* FORM */}

                        <form
                            onSubmit={handleSubmit}
                        >


                            {/* NAME */}

                            <div className="form-group">

                                <label>
                                    Name
                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    value={
                                        signupData.name
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="Enter your name"
                                    required
                                />

                            </div>


                            {/* AGE */}

                            <div className="form-group">

                                <label>
                                    Age
                                </label>

                                <input
                                    type="number"
                                    name="age"
                                    value={
                                        signupData.age
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="Enter your age"
                                    min="1"
                                    required
                                />

                            </div>


                            {/* SUBMIT */}

                            <button
                                type="submit"
                                className="signup-button"
                                disabled={
                                    signupLoading
                                }
                            >

                                {signupLoading
                                    ? "Creating Account..."
                                    : "Sign Up"}

                            </button>

                        </form>


                        {/* STATUS */}

                        {signupStatus && (

                            <div
                                className={
                                    signupStatus.startsWith(
                                        "2"
                                    )
                                        ? "signup-status success"
                                        : "signup-status error"
                                }
                            >

                                {signupStatus}

                            </div>

                        )}


                        {/* RESPONSE */}

                        {signupResponse && (

                            <div className="signup-response">

                                <h3>
                                    Server Response
                                </h3>

                                <pre>

                                    {JSON.stringify(
                                        signupResponse,
                                        null,
                                        2
                                    )}

                                </pre>

                            </div>

                        )}

                    </section>

                </main>

            )}

        </div>
    );
}

export default App;