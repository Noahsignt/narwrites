'use client'
import React from "react";
import signIn from "@/lib/firebase/auth/signin";
import { useRouter } from 'next/navigation'
import Header from "../components/Header";
import styles from './page.module.css'

function Page() {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const router = useRouter()

    const handleForm = async (event : any) => {
        event.preventDefault()

        const { result, error } = await signIn(email, password);

        if (error) {
            return console.log(error)
        }

        // else successful
        console.log(result)
        return router.push("/editor")
    }
    return (<div className="wrapper">
        <Header />
        <div className={styles['sign-in-wrapper']}>
            <h1>Sign in</h1>
            <form onSubmit={handleForm}>
                <label htmlFor="email">
                    <p>Email</p>
                    <input onChange={(e) => setEmail(e.target.value)} required type="email" name="email" id="email" />
                </label>
                <label htmlFor="password">
                    <p>Password</p>
                    <input onChange={(e) => setPassword(e.target.value)} required type="password" name="password" id="password" />
                </label>
                <button type="submit">Sign in</button>
            </form>
        </div>

    </div>);
}

export default Page;