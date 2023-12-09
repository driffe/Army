import React, {useContext} from "react";
import { authContext } from "@/lib/store/auth-context";
import { FcGoogle } from "react-icons/fc"

function SignIn() {
    const { googleLoginHandler } = useContext(authContext);
    return (
        <main className="container max-w-2xl px-6 mx-auto">
            <h1 className="mb-6 text-6xl font-bold text-center">Welcome 👋</h1>
            <div className="flex flex-col overflow-hidden shadow-md shadow-slate-500 bg-slate-800 rounded-xl">
                <div className="object-cover w-full -hull">
                    <img className="object-cover w-full h-full" src="money.jpg"></img>
                </div>
                <div className="px-4 py-4">
                    <h3 className="text-2xl text-center mb-2">Please sign in to continue</h3>
                    <button onClick={googleLoginHandler} className="flex self-start gap-2 p-4 mx-auto font-medium text-white align-middle bg-gray-700 rounded-lg">
                        <FcGoogle className="text-2xl"/>Google
                    </button>
                </div>
            </div>
        </main>

    )
}

export default SignIn