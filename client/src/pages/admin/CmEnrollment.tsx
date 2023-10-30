import { DragEvent, useState } from "react";
import { Link } from "react-router-dom";
import { AiFillExclamationCircle } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { IoMdLogOut } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import Sidebar from "../../components/SideBar";
import SideBarSuper from "../../components/SideBarSuper";
// import BankLogo from "../assets/posb.svg";
import * as XLSX from "xlsx";

const CmEnrollment = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [dragIsOver, setDragIsOver] = useState<boolean>(false);
  const [adminType] = useState(window.localStorage.getItem("adminType")); //TODO: for demo of different admin types use protected routes and checking of tokens to determine admin type for actual implementation
  // isSuperAdmin is true if adminType is superAdmin from local storage
  const isSuper = adminType === "superAdmin";
  const [filename, setFilename] = useState<string>("");
  const [fileSet, setFileSet] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File>();


  const inlineStyle = {
    fontSize: "16px",
    backgroundColor: "#0078CE",
    padding: "20px",
  };

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragIsOver(true);
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragIsOver(false);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragIsOver(false);
    const files = event.dataTransfer.files;
    const file = files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const previewContainer = document.getElementById("previewContainer");
        if (previewContainer) {
          if (
            file.type ===
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          ) {
            const data = new Uint8Array(reader.result as ArrayBuffer);
            const workbook = XLSX.read(data, { type: "array" });
            const sheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonResult = XLSX.utils.sheet_to_json(sheet);
            const preview = document.createElement("pre");
            preview.textContent = JSON.stringify(jsonResult, null, 2);
            previewContainer.innerHTML = "";
            previewContainer.appendChild(preview);
            reader.readAsArrayBuffer(file);
            setFileSet(true);
          } else if (file.type === "text/csv") {
            // Handle CSV file
            const data = reader.result as string;
            const preview = document.createElement("pre");
            preview.textContent = data;
            previewContainer.innerHTML = "";
            previewContainer.appendChild(preview);
            setFilename(file.name);
            reader.readAsText(file);
            setFileSet(true);
          }
        }
      };
      if (
        file.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) {
        reader.readAsArrayBuffer(file);
      } else if (file.type === "text/csv") {
        reader.readAsText(file);
      }
      setFilename(file.name);
      setSelectedFile(file);
    }
  };

  const handleDivClick = () => {
    const fileInput = document.getElementById("fileInput");
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const previewContainer = document.getElementById("previewContainer");
        if (previewContainer) {
          if (
            file.type ===
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          ) {
            const data = new Uint8Array(reader.result as ArrayBuffer);
            const workbook = XLSX.read(data, { type: "array" });
            const sheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonResult = XLSX.utils.sheet_to_json(sheet);
            const preview = document.createElement("pre");
            preview.textContent = JSON.stringify(jsonResult, null, 2);
            previewContainer.innerHTML = "";
            previewContainer.appendChild(preview);
            reader.readAsArrayBuffer(file);

            setFileSet(true);
          } else if (file.type === "text/csv") {
            // Handle CSV file
            const data = reader.result as string;
            const preview = document.createElement("pre");
            preview.textContent = data;
            previewContainer.innerHTML = "";
            previewContainer.appendChild(preview);
            setFilename(file.name);
            reader.readAsText(file);
            setFileSet(true);
          }
        }
      };
      if (
        file.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) {
        reader.readAsArrayBuffer(file);
      } else if (file.type === "text/csv") {
        reader.readAsText(file);
      }
      setFilename(file.name);
      setSelectedFile(file);
    }
  };

  const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
};

  const handleUpload = async () => {
    if (!selectedFile) return;

    const fileContent = await selectedFile.arrayBuffer();
    const base64File = arrayBufferToBase64(fileContent);

    const payload = {
      file: base64File,
      filename: selectedFile.name,
    };
    console.log("Sending payload:", payload);
    const LAMBDA_ENDPOINT =
      "https://xr6gnon0x3.execute-api.ap-southeast-1.amazonaws.com/dev/store-csv";
    try {
      const response = await fetch(LAMBDA_ENDPOINT, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseBody = await response.json();
      console.log(responseBody);
      window.alert("Upload successful!");
    } catch (error) {
      console.error("Error uploading the file:", error);
    }
  };



  return (
    <div>
      <div className="navbar navbar-expand-lg navbar-light" style={inlineStyle}>
        <div className="container-fluid">
          <div onClick={handleClick} style={{ cursor: "pointer" }}>
            <GiHamburgerMenu
              style={{ fontSize: "25px", color: "white", marginRight: "5px" }}
            />
          </div>
          {/* <BankLogo /> */}
          <ul className="navbar-nav" style={{ marginLeft: "auto" }}>
            <li className="nav-item me-4">
              <Link className="nav-link" to="" style={{ color: "white" }}>
                {
                  <AiFillExclamationCircle
                    style={{ marginRight: "5px", marginBottom: "3px" }}
                  />
                }
                Edit Tooltips
              </Link>
            </li>
            <li className="nav-item me-4">
              <Link className="nav-link" to="" style={{ color: "white" }}>
                <CgProfile
                  style={{ marginRight: "5px", marginBottom: "3px" }}
                />
                Ray Quek
              </Link>
            </li>
            <li className="nav-item me-4">
              {/* TODO: Logout functionality */}
              <Link className="nav-link" to="/" style={{ color: "white" }}>
                <IoMdLogOut
                  style={{ marginRight: "5px", marginBottom: "3px" }}
                />
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className={`sidebar-container ${isOpen ? "open" : ""}`}>
        {isSuper ? (
          <SideBarSuper handleClick={handleClick} />
        ) : (
          <Sidebar handleClick={handleClick} />
        )}
      </div>
      <h1 className="mt-5 ms-5">Enrollment</h1>
      <div
        className="mt-5 ms-5 mb-5"
        onDrop={handleDrop}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onClick={handleDivClick}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100px",
          width: "400px",
          border: "1px solid",
          backgroundColor: dragIsOver ? "lightgray" : "white",
        }}
      >
        <p>Drag & drop files or Click here </p>
        <label htmlFor="fileInput">
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={handleFileChange}
            accept=".xlsx, .csv"
          />
        </label>
      </div>
      <div className="mt-5 ms-5 mb-5 d-flex align-items-center">
        <p>{filename}</p>
        {fileSet && (
          <button className="btn btn-primary ms-5" onClick={handleUpload}>
            Upload
          </button>
        )}
      </div>
      <div
        className="container ms-5"
        id="previewContainer"
        style={{
          width: "100%",
          height: "300px",
          overflowY: "scroll", // Add this to enable scrolling if needed
        }}
      ></div>
    </div>
  );
};

export default CmEnrollment;

