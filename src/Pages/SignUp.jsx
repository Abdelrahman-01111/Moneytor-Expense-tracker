import { NavLink } from "react-router";
import { getAuth, createUserWithEmailAndPassword, setPersistence, onAuthStateChanged, browserLocalPersistence } from "firebase/auth";
import { useNavigate } from "react-router";
const auth = getAuth();
import { useContext, useEffect } from "react";
import { SignInContext } from "../Contexts";

export default function SignUp() {

    const navigate = useNavigate();
    const { isSignedIn, setIsSignedIn, setUserID } = useContext(SignInContext);
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsSignedIn(true);
                navigate("/");
            }
        })
    }, [])

    return (

        <div className="">
            <div className="flex flex-col  md:flex-row-reverse w-full overflow-hidden h-screen">
                {/* Illustration */}
                <div className="text-center flex flex-col justify-center align-center text-white md:w-1/2 w-full h-1/2 md:h-full effect relative">
                    <div className="text-center p-10 flex flex-col justify-center align-center text-white h-full">
                        <h1 className="text-4xl mb-10 justify-self-start">Moneytor</h1>
                        <p className="text-gray-300 text-2xl">Your Digital Expense Traker. </p>
                    </div>
                </div>

                {/* Form area */}

                <div className="bg-midnight-950 flex flex-col justify-center align-center rounded-t-3xl md:rounded-none h-1/2  md:h-screen w-full md:w-1/2 p-8">
                    <h1 className="text-2xl mb-5 text-center">Sign In</h1>

                    <form
                        className="flex flex-col"
                        onSubmit={(e) => {
                            e.preventDefault();
                            const email = e.currentTarget[0].value;
                            const password = e.currentTarget[1].value;
                            if (!email || !password) {
                                alert("Please enter username and password");
                                return;
                            }
                            // Stub: replace with real auth logic
                            setPersistence(auth, browserLocalPersistence);
                            createUserWithEmailAndPassword(auth, email, password)
                                .then((userCredential) => {
                                    // Signed up 
                                    const user = userCredential.user;
                                    // ...
                                    setUserID(pre => user.uid);

                                    navigate("/");


                                })
                                .catch((error) => {
                                    const errorCode = error.code;
                                    const errorMessage = error.message;
                                    // ..
                                    alert(errorMessage);
                                });


                        }}
                    >
                        <input onKeyDown={
                            (e) => {
                                if (e.key === 'Enter') {
                                    e.currentTarget.nextElementSibling.focus();
                                }
                            }}
                            type="email"
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
                            Sign Up
                        </button>
                    </form>

                    <div className="mt-4 text-center text-sm text-gray-400">
                        <NavLink to="/auth" className="underline">Have an account?</NavLink>
                    </div>
                </div>
            </div>
        </div>


    );
}
