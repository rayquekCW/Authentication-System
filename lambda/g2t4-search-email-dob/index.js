const AWS = require("aws-sdk");
const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider({
  region: "ap-southeast-1",
});

const validateEmailAndBirthdate = async (emailParam, birthdateParam) =>
  await new Promise((resolve, reject) => {
    const params = {
      UserPoolId: "ap-southeast-1_crimtf1ce",
    };

    cognitoidentityserviceprovider.listUsers(params, (err, data) => {
      if (err) {
        console.error("Error while listing users:", err.message);
        reject({
          success: false,
          message: "Email or birthdate verification failed.",
        });
      } else {
        try {
          data.Users.forEach((user) => {
            const email = user.Attributes.find((attr) => attr.Name === "email");
            const dateOfBirth = user.Attributes.find(
              (attr) => attr.Name === "birthdate"
            );
            if (
              email.Value == emailParam &&
              dateOfBirth.Value == birthdateParam
            ) {
              console.log(
                `User: ${user.Username}, Email: ${email.Value}, Date of Birth: ${dateOfBirth.Value}`
              );
              resolve({ success: true, message: "Email and birthdate match." });
            }
          });
          // If no match was found, reject the promise
          reject({
            success: false,
            message: "Email or birthdate verification failed.",
          });
        } catch (err) {
          console.error("Error while processing user data:", err);
          reject({
            success: false,
            message: "Email or birthdate verification failed.",
          });
        }
      }
    });
  });

const main = async (event) => {
  console.log("Event:", event);
  return validateEmailAndBirthdate(event.email, event.birthdate);
};

exports.handler = main;
