import { useState } from "react";
import { setAuthedUser } from "../actions/authedUser";

export default function useAuth(dispatch) {
    const [ authed, setAuthed ] = useState(false);

    return {
        authed,
        login: (id) => (
            new Promise((res) => {
                dispatch(setAuthedUser(id));
                setAuthed(true);
                console.log(authed);

                res(true);
            })
        ),
        logout: () => (
            new Promise((res) => {
                dispatch(setAuthedUser(null));
                setAuthed(false);

                res(true);
            })
        ),
    };
};