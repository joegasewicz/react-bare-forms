import {
    areFieldsEqual,
    customValidator,
    isEmailValid,
    isFieldEmpty,
    isValidDate,
    IValidationVariable
} from "../src/validators";
import {
    _DateValidatorArgsError,
    _DateValidatorArgsErrorMsg,
    _FieldEmptyErrorMsg,
    _isFieldEmptyErrorMsg
} from "../src/core/_errors";

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
    expect(isEmailValid()("", context)).toEqual({
        isValid: false,
        messages: ["Must be a valid email"],
    });
});

describe("#isValidDate()", () => {
    let context = {
        state: {
            date: new Date("2021-04-07T11:00:00.000"),
        }
    }
    try {
        expect(isValidDate()(context.state.date, context)).toEqual({
            isValid: true,
            messages: [],
        });
    } catch (err) {
        expect(err).toEqual(new _DateValidatorArgsError(_DateValidatorArgsErrorMsg));
    }

    // Test Days
    expect(isValidDate(["2021-04-1", "2021-04-10"])(context.state.date, context)).toEqual({
        isValid: true,
        messages: [],
    });

    expect(isValidDate(["2021-04-8", "2021-04-10"])(context.state.date, context)).toEqual({
        isValid: false,
        messages: [`Must be a valid date`],
    });

    // Test Months
    context.state.date = new Date("2021-03-07T11:00:00.000");
    expect(isValidDate(["2021-04-8", "2021-04-10"])(context.state.date, context)).toEqual({
        isValid: false,
        messages: [`Must be a valid date`],
    });

    context.state.date = new Date("2021-05-07T11:00:00.000");
    expect(isValidDate(["2021-04-8", "2021-04-10"])(context.state.date, context)).toEqual({
        isValid: false,
        messages: [`Must be a valid date`],
    });

    // Test Years
    context.state.date = new Date("2020-04-07T11:00:00.000");
    expect(isValidDate(["2021-04-8", "2021-04-10"])(context.state.date, context)).toEqual({
        isValid: false,
        messages: [`Must be a valid date`],
    });

    context.state.date = new Date("2019-01-07T11:00:00.000");
    expect(isValidDate(["2021-04-8", "2021-04-10"])(context.state.date, context)).toEqual({
        isValid: false,
        messages: [`Must be a valid date`],
    });

});

describe("#customValidator()", () => {
    const testIsTrue: IValidationVariable = customValidator((undefined, fieldValue, _) => {
        if(!fieldValue) {
            return [`Must be true`];
        }
    });
    expect(testIsTrue()(true, {})).toEqual({
        isValid: true,
        messages: [],
    });
    expect(testIsTrue()(false, {})).toEqual({
        isValid: false,
        messages: ["Must be true"],
    });

    const context = {
        state: {
            someKey: "bananas",
        }
    };
    const testContext: IValidationVariable = customValidator((myKey, fieldValue, context) => {
        const result = context.state[myKey];

        if(result !== "bananas") {
            return [`Should equal bananas`];
        }
    });
    expect(testContext("someKey")(undefined, context)).toEqual({
        isValid: true,
        messages: [],
    });

    expect(testContext("someKey")(undefined, {state: "apples"})).toEqual({
        isValid: false,
        messages: ["Should equal bananas"],
    });

    expect(testContext("wrongKey")(undefined, context)).toEqual({
        isValid: false,
        messages: ["Should equal bananas"],
    });

});
