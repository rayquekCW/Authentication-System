const SetPassword = () => {
  return (
    <div className=" container-fluid border border-primary h-100">
      <div className="passwordDesign row p-0">
        <div className="d-none d-md-block col-md-8 p-0"></div>
        <div className="heightDesign col-md-4 d-flex justify-content-center align-items-center px-3">
          <div className="container">
            <div className="boxInput row d-flex justify-content-center align-items-center">
              <div className=" p-2 rounded">
                <img
                  className="mb-5 w-50 text-center"
                  src="https://internet-banking.dbs.com.sg/IB/posb/images/desktoplogo.png"
                  alt=""
                />
                <div className="text-start">Password must:</div>
                <ul className="text-start">
                  <li>Be between 9-64 characters</li>
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
                  placeholder="Password"
                ></input>
                <input
                  type="password"
                  className="form-control mb-3"
                  placeholder="Confirm Password"
                ></input>
                <div className="text-start">
                  <input
                    type="checkbox"
                    className="mb-3"
                    value="show"
                    id="Show"
                  />
                  <label htmlFor="Show">Show Password</label>
                </div>
                <button className="rounded btn btn-sm defaultBtn mt-2">
                  Set Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetPassword;
