"use client";

import { useReducer } from "react";
import SignUp from "@/app/_components/signUp";
import Identity from "@/app/_components/identity";

import { urlToFile } from "@/app/_utils/images/imageUtils";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();

  const reducer = (state: any, dispatch: any) => {
    return {
      ...state,
      [dispatch.name]: dispatch.payload,
    };
  };

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
    password_confirmation: "",
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
    verifyUsername: false,
    disableForm: true,
    usernameExists: false,
    tagGroup: "all",
    passwordMatchError: false,
  });

  const handleSubmit = async () => {
    const form = new FormData();
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
      },
    };

    form.append("file", file);
    form.append("body", JSON.stringify(body));

    const response = await fetch("/api/auth/signup", {
      method: "POST",
      body: form,
    });

    const data = await response.json();
    if (data.status === "success") {
      router.push("/api/auth/signin");
    }
    if (data.status === "error") {
      dispatch({ name: "error", payload: data.message });
    }
  };

  if (state.page === 0) {
    return <SignUp state={state} dispatch={dispatch} />;
  }

  if (state.page === 1) {
    return (
      <Identity handleSubmit={handleSubmit} state={state} dispatch={dispatch} />
    );
  }
}
