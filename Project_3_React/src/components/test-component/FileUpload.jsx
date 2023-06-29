import React, { useState } from 'react';

const FileUpload = () => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");

    const submitForm = (event) => {
        event.preventDefault();

        if (!file) {
            setMessage("Please select a file to upload");
            return;
        }

        let formData = new FormData();
        formData.append("file", file);

        fetch("http://localhost:8080/upload", {
            method: "POST",
            body: formData,
            credentials: "include"
        })
        .then(response => response.text())
        .then(data => {
            setMessage(data);
        })
        .catch((error) => {
            console.error("Error:", error);
            setMessage("An error occurred during file upload");
        });
    };

    const onFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    return (
        <div>
            <form onSubmit={submitForm}>
                <input type="file" name="file" onChange={onFileChange} />
                <input type="submit" value="Upload" />
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default FileUpload;
