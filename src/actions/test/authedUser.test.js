import { SET_AUTHED_USER, setAuthedUser } from "../authedUser";

describe("setAuthedUser", () => {
    it(`will return an object with type of ${SET_AUTHED_USER} and user ID`, () => {
        var id = "sarahedo";

        expect(setAuthedUser(id)).toEqual({
            type: SET_AUTHED_USER,
            id,
        });
    });
});