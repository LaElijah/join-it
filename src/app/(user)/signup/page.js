"use client"

import { useReducer } from "react"
import Credentials from "./components/credentials/credentials"
import Identity from "./components/identity/identity"


import { urlToFile } from "@/app/_utils/images/imageUtils"
import { useRouter } from "next/navigation"

export default function Register() {

    const router = useRouter()

    const reducer = (state, dispatch) => {
        return {
            ...state,
            [dispatch.name]: dispatch.value
        }
    }


    // personality: [],
    // religion: [],
    // education: [],
    // age: [],
    // family: [],
    // relationship: [],
    // location: [],
    // physicalHealth: [],
    // },

    const [state, dispatch] = useReducer(reducer, {
        username: "",
        password: "",
        passwordConfirm: "",
        email: "",
        race: [],
        gender: [],
        sexuality: [],
        disability: [],
        mentalHealth: [],
        neurodivergent: [],
        socioeconomic: [],
        occupation: [],
        political: [],
        hobbies: [],
        page: 0,
        submit: "Skip",
        croppedImage: null,
    })

    const handleSubmit = async (event) => {
        const form = new FormData()
        const file = await urlToFile(state.croppedImage, "croppedImage.png");
        

        const body = {
            email: state.email,
            username: state.username,
            password: state.password,
            identity: {
                race: state.race,
                gender: state.gender,
                sexuality: state.sexuality,
                disability: state.disability,
                mentalHealth: state.mentalHealth,
                neurodivergent: state.neurodivergent,
                socioeconomic: state.socioeconomic,
                occupation: state.occupation,
                political: state.political,
                hobbies: state.hobbies,
            }
        }


        form.append("file", file)
        form.append("body", JSON.stringify(body))

        const response = await fetch("/api/auth/signup", {
            method: "POST",
            body: form
        })

        const data = await response.json()
        if (data.status === "success") {
            router.push('/api/auth/signin')
        }
        if (data.status === "error") {
            dispatch({ name: "error", value: data.message })
        }
    }
    


    if (state.page === 0) {
        return (
            <Credentials state={state} dispatch={dispatch} />

        )
    }

    if (state.page === 1) {
        return (
            <Identity handleSubmit={handleSubmit} state={state} dispatch={dispatch} />
        )
    }




}
