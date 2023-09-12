import { useState } from "react";
import PasswordValidator from "password-validator";

const ChangePassword = () => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [valRules, setValRules] = useState<Array<String>>()
    const [color, setColor] = useState("red")
    // var passwordValidator = require('password-validator');

    // Create a schema
    var schema = new PasswordValidator();

    // Add properties to it
    schema
        .is().min(9)                                    // Minimum length 8
        .is().max(64)                                  // Maximum length 100
        .has().uppercase()                              // Must have uppercase letters
        .has().lowercase()                              // Must have lowercase letters
        .has().digits(2)                                // Must have at least 2 digits
        .has().symbols()                                // Must have symbols
        .has().not().spaces()                           // Should not have spaces
        .is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values

    // setValRules(schema.validate(newPassword, {list:true}))

    console.log(schema.validate(newPassword, { list: true }))

    const rulesCheck = (values: Array<String>): boolean => {
        if (typeof valRules === "undefined") return false;
        let validation = true;
        values.forEach(function (value) {
            validation &&= valRules.includes(value);
        })
        // if (!validation) setColor("red"); else setColor("green")
        return !validation;
    }

    const updateColour = (colour:string, ) => {
        var x = document.getElementById("lengthReq");
        // x?.setAttribute("colour", color);
    }
    

    console.log(rulesCheck(["min"]))

    // const validatePassword = (value: string): false | true => {
    //     const { length } = value;

    //     // most likely first
    //     // more resource intensive rules should be last.
    //     return validateLength(9, 64, length) && newPassword === confirmPassword
    // }

    // const validateLength = (min: number, max: number, actual: number) => {
    //     return actual >= min && actual <= max
    // }

    // const isUpperCase = (value: string) => /^[A-Z]*$/.test(value)
    // const isLowerCase = (value: string) => /^[a-z]*$/.test(value)
    // // console.log(validatePassword(newPassword))
    // console.log(isUpperCase(newPassword))

    return (
        <>
            <div className="container bg-light shadow-sm mt-4" style={{ height: '50' }}>
                <div className="row p-3">
                    <div className="col-md-4 col-12 text-start">
                    </div>
                    <div className="col pt-5 pt-md-0">
                        <div className="row">
                            <div className="col-6 text-start">
                                <h4>Your Profile</h4>
                                <small className="text-secondary">Change Password</small>
                            </div>
                            <div className="col-6 text-end">
                                <button className="btn btn-primary">View Account</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <input
                type="password"
                className="form-control mb-3 mt-3"
                placeholder="Password"
                value={newPassword}
                // onChange={(e) => setNewPassword(e.target.value), setValRules(e.target)}
                onChange={(e) => {
                    setNewPassword(e.target.value);
                    // @ts-ignore
                    setValRules(schema.validate(e.target.value, { list: true }));
                }
                }
            ></input>
            <div className="text-start">Password must:</div>
            <ul className="text-start">
                <li id="lengthReq" style={{ color: rulesCheck(["min", "max"]) ? "red" : "green" }}>Be between 9-64 characters</li>
                <li>Include at least two of the following:</li>
                <ul>
                    <li>An uppercase character</li>
                    <li>A lowercase character</li>
                    <li>A number</li>
                    <li>A special character</li>
                </ul>
            </ul>
            <input
                type="password"
                className="form-control mb-3"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            ></input>
            <div className="text-start">
                <input
                    type="checkbox"
                    className="mb-3"
                    value="show"
                    id="Show"
                />
                <label htmlFor="Show" style={{ paddingLeft: 3 }}>Show Password</label>
                <br></br>
                <button className="btn mt-md-0 mt-3 btn-primary mx-2 primary">
                    Set Password
                </button>
            </div>


        </>
    );
}



export default ChangePassword;