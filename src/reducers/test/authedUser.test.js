import { setAuthedUser } from "../../actions/authedUser";
import authedUser from "../authedUser";

describe("authedUser", () => {
    it("will return the authedId when the authedId is passed", () => {
        var authedId = "zoshikanlu";
        expect(authedUser({}, setAuthedUser(authedId))).toBe(authedId);
    });

    it("will return null if no authedId is being passed", () => {
        expect(authedUser(null, setAuthedUser(null))).toBeNull();
    });
});