import { DragEvent, useState, useContext, useEffect } from "react";
import * as XLSX from "xlsx";
import { AccountContext } from "../admin/../../services/Account";
import UserLogoutPopup from "../../components/UserLogout";
import AdminNavBar from "../../components/navigation/AdminNavBar";

const CmEnrollment = () => {
  const [dragIsOver, setDragIsOver] = useState<boolean>(false);
  const [filename, setFilename] = useState<string>("");
  const [fileSet, setFileSet] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File>();
  const [token, setToken] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [userName, setUserName] = useState<string>("");

  const accountContext = useContext(AccountContext);

  useEffect(() => {
    if (accountContext) {
      // Now you can use accountContext.getSession
      accountContext
        .getSession()
        .then((session) => {
          setToken(session.accessToken.jwtToken);
          setRole(session["custom:role"]);
          setUserName(session.given_name + " " + session.family_name);
        })
        .catch((error) => {
          console.error(error); // Handle error
        });
    }
  }, [accountContext]);

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
    let binary = "";
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
      accessToken: token,
      role: role,
      file: base64File,
      filename: selectedFile.name,
    };

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
      if (!response.ok) {
        alert("File upload failed!: Forbidden");
        throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        alert("File uploaded successfully!");
      }
    } catch (error) {
      console.error("Error uploading the file:", error);
    }
  };

  return (
    <>
      <UserLogoutPopup />
      <AdminNavBar adminType={role} userName={userName} />
      <div>
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
    </>
  );
};

export default CmEnrollment;
