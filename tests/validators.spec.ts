import {areFieldsEqual, isEmailValid, isFieldEmpty} from "../src/validators";
import {_FieldEmptyErrorMsg,  _isFieldEmptyErrorMsg} from "../src/_errors";

const isFieldEmptyResult = (limit: number) => ({
    isValid: false,
    messages: [`Must be at least ${limit} characters`],
});

describe("#isFieldEmpty()", () => {
    it("should raise an error with a message", () => {
        try{
            expect(isFieldEmpty()("1234"))
        } catch(err) {
            expect(err).toEqual(new _FieldEmptyErrorMsg(_isFieldEmptyErrorMsg))
        }
    });
    it("should return isValid equals false & the correct validation message", () => {
        expect(isFieldEmpty(5)("1234")).toEqual(isFieldEmptyResult(5));
        expect(isFieldEmpty(1)("")).toEqual(isFieldEmptyResult(1));
    });
    it("should return is valid & contain no errors", () => {
       expect(isFieldEmpty(5)("12345")).toEqual({
           isValid: true,
           messages: [],
       });
        expect(isFieldEmpty(0)("")).toEqual({
            isValid: true,
            messages: [],
        });
        expect(isFieldEmpty(5)("abcdefghi")).toEqual({
            isValid: true,
            messages: [],
        });
    });

});



describe("#areFieldsEqual()", () => {
    let context = {
        state: {
            username: "hello"
        }
    };
    expect(areFieldsEqual("username")("hello", context)).toEqual({
        isValid: true,
        messages: [],
    });
    expect(areFieldsEqual("username")("gooodbye", context)).toEqual({
        isValid: false,
        messages: ["Fields do not match"],
    });
});

describe("#isEmailValid()", () => {
    let context = {
        state: {
            my_email: "joebloggs@gmail.com",
        }
    };
    expect(isEmailValid()(context.state.my_email, context)).toEqual({
        isValid: true,
        messages: [],
    });
    expect(isEmailValid()("joe@joe", context)).toEqual({
        isValid: false,
        messages: ["Must be a valid email"],
    });
    expect(isEmailValid()("joe@joe.com", context)).toEqual({
        isValid: true,
        messages: [],
    });
    expect(isEmailValid()("joe@joe.", context)).toEqual({
        isValid: false,
        messages: ["Must be a valid email"],
    });
});

describe("#customValidator()", () => {

});
