import React, {useContext} from "react";
import { authContext } from "@/lib/store/auth-context";
import { FcGoogle } from "react-icons/fc"
import { FaGithub } from "react-icons/fa";
import { BsPiggyBank } from "react-icons/bs";


function SignIn() {
    const { googleLoginHandler } = useContext(authContext);
    const { githubLoginHandler } = useContext(authContext);
    return (
        <main className="h-screen flex flex-col items-center justify-center container mx-auto mb-4">
            <h1 className="mb-6 font-bold text-center"><BsPiggyBank className="text-8xl"/></h1>
            <div className="block w-1/2 h-1/2 shadow-md shadow-slate-500 bg-slate-800 rounded-xl">
                <div className="flex flex-col w-full h-full items-center justify-evenly">
                    <h3 className="text-2xl text-center ">Please sign in to continue</h3>
                    <div className="flex flex-col items-center justify-center gap-5 w-full max-w-2xl">
                        <button onClick={googleLoginHandler} className="flex flex-col items-center justify-center w-3/4 py-4 font-medium text-white align-middle bg-gray-700 rounded-lg">
                            <FcGoogle className="text-2xl mx-1"/>Continue with Google
                        </button>
                        <button onClick={githubLoginHandler} className="flex flex-col items-center justify-center w-3/4 py-4 font-medium text-white align-middle bg-gray-700 rounded-lg">
                            <FaGithub className="text-2xl mx-1"/>Continue with Github
                        </button>
                    </div>
                </div>
            </div>
        </main>

    )
}

export default SignIn