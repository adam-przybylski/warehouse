import './App.css'
import './api/api.config.ts'
import {useEffect, useState} from "react";
import {api} from "./api/api.ts";

function App() {

    const [loading, setLoading] = useState(true)

    const logIn = async () => {
        setLoading(true)
        try {
            const {data} = await api.logIn('testAdmin', 'password')
            window.localStorage.setItem('token', data)
            console.log(data)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        logIn()
    }, [])

    return (
        <>
            <div className="App">
                {loading && <p>Loading...</p>}
                {!loading && <p>{window.localStorage.getItem('token')}</p>}
            </div>
        </>
    )
}

export default App
