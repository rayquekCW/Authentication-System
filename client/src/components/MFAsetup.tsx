import "../styles/_variable.scss";

// create Type "Email" to take in a string with a default value of an empty string
type MFAsetup = {
  email: string;
  logoURL: string;
};

// Create component to setup MFA with some text and a button and takes in a email prop
const MFAsetup = ({ email, logoURL }: MFAsetup) => {
  // if email is provided, use that, otherwise use "No email provided"
  const emailData = email || "placeholder@gmail.com";

  // if logoURL is provided, use that, otherwise use "../src/assets/logo.png"
  const logoData = logoURL || "../src/assets/react.svg";

  return (
    <>
      <div
        className="container text-start"
        style={{
          backgroundColor: "white",
        }}
      >
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col mx-2 my-2">
            <img src={logoData} style={{ width: "150px" }} alt="Logo" />
            <p>{emailData}</p>

            <h1>More Information is required</h1>
            <p>
              Your organization needs more information to keep your account
              secure
            </p>

            <p>Click the button below to setup MFA for your account.</p>
            <button className="btn btn-primary text-end">Setup MFA</button>
          </div>

          <div className="col-md-1"></div>
        </div>
      </div>
    </>
  );
};

export default MFAsetup;
