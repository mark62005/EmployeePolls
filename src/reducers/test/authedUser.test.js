import { SET_AUTHED_USER } from "../../actions/authedUser";
import authedUser from "../authedUser";

describe("authedUser", () => {
    it(`will return authedId if the action type is ${SET_AUTHED_USER}`, () => {
        var authedId = "zoshikanlu";
        var setAuthedUserAction = {
            type: SET_AUTHED_USER,
            id: authedId,
        };

        expect(authedUser({}, setAuthedUserAction)).toBe(authedId);
    });

    it("will return an empty state if nothing is being passed", () => {
        expect(authedUser(null, {})).toBeNull();
    });
});