import { isFieldEmpty } from "../src/validators";
import {_FieldEmptyErrorMsg,  _isFieldEmptyErrorMsg} from "../src/_errors";

describe("#isFieldEmpty()", () => {
    it("should raise an error with a message", () => {
        try{
            expect(isFieldEmpty()("1234"))
        } catch(err) {
            expect(err).toEqual(new _FieldEmptyErrorMsg(_isFieldEmptyErrorMsg))
        }

    });
});
