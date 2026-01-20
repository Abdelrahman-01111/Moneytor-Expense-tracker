import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router";
import { browserLocalPersistence, getAuth, onAuthStateChanged, setPersistence, signInWithEmailAndPassword } from "firebase/auth";
import { useState, useContext } from "react";
import { doc } from "firebase/firestore";
import { app, db } from "../../firebase";

import { SignInContext } from "../Contexts";
import { u } from "motion/react-client";
const auth = getAuth(app);
export default function Auth() {
    const navigate = useNavigate();

    const { isSignedIn, setIsSignedIn } = useContext(SignInContext);
    const { userID, setUserID } = useContext(SignInContext);
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                navigate("/");
            }
        })
    }, [])
    // const [username, setUsername] = useState("");
    // const [password, setPassword] = useState("");
    return (


        <div className="flex flex-col md:flex-row-reverse w-full h-screen overflow-hidden ">
            {/* Illustration */}
            <div className="text-center p-10  flex flex-col justify-center align-center text-white md:w-1/2 w-full h-1/2 md:h-full effect relative">
                <h1 className="text-4xl mb-10 justify-self-start">Moneytor</h1>
                <p className="text-gray-300 text-2xl">Your Digital Expense Traker. </p>
            </div>

            {/* Form area */}

            <div className="bg-midnight-950 flex flex-col justify-center align-center rounded-t-3xl md:rounded-none h-1/2 md:h-screen w-full md:w-1/2 p-8">
                <h1 className="text-2xl mb-5 text-center">Login</h1>

                <form
                    className="flex flex-col"
                    onSubmit={(e) => {
                        e.preventDefault();
                        const email = e.currentTarget[0].value;
                        const password = e.currentTarget[1].value;

                        setPersistence(auth, browserLocalPersistence);

                        if (email && password) {
                            signInWithEmailAndPassword(auth, email, password)
                                .then((userCredential) => {
                                    // Signed in 
                                    const user = userCredential.user;
                                    setIsSignedIn(true);
                                    navigate("/");
                                    // ...


                                })
                                .catch((error) => {
                                    const errorCode = error.code;
                                    const errorMessage = error.message;
                                    console.log(errorCode, errorMessage);

                                });


                        }



                    }}
                >
                    <input
                        type="Email" onKeyDown={
                            (e) => {
                                if (e.key === 'Enter') {
                                    e.currentTarget.nextElementSibling.focus();
                                }
                            }}
                        placeholder="Email"
                        className="mb-5 p-3 rounded-xl bg-midnight border-2 border-midnight-700 focus:border-gray-300 outline-none"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="mb-7 p-3 rounded-xl bg-midnight border-2 border-midnight-700 focus:border-gray-300 outline-none"
                    />
                    <button
                        type="submit"
                        className="bg-white text-black p-3 rounded-xl hover:opacity-90"
                    >
                        Login
                    </button>
                </form>

                <div className="mt-4 text-center text-sm text-gray-400">
                    <NavLink to="/signup" className="underline">Create account</NavLink>
                </div>
            </div>
        </div>



    );
}