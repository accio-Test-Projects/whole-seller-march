import React from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { TextField } from "@mui/material";
import { storage } from "../../firebaseconfig";
function FileUpload({ onChange, value }) {
  const [progress, setProgress] = React.useState(0);
  const upload = (e) => {
    console.log(e.target.files[0]);
    const file = e.target.files[0];
    const storageRef = ref(storage, `images/${file.name}`);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const p = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + p + "% done");
        setProgress(progress);
      },
      (error) => {
        // Handle unsuccessful uploads
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          onChange(downloadURL);
          setProgress(0);
        });
      }
    );
  };
  return progress > 0 ? (
    <div
      style={{
        padding: "10px",
        fontWeight: "bold",
      }}
    >
      {progress} %
    </div>
  ) : (
    <div>
      <TextField
        type={"file"}
        inputProps={{
          accept: "image/*",
        }}
        size="small"
        fullWidth
        name="productImage"
        id="productImage"
        // value={formik.values.productImage}

        onChange={(e) => upload(e)}
        // error={formik.touched.productImage && Boolean(formik.errors.productImage)}
        // helperText={formik.touched.productImage && formik.errors.productImage}
      />
      {value && (
        <div
          style={{
            maxWidth: "250px",
            display: "flex",
            margin: "auto",
          }}
        >
          <img src={value} width="100%" alt="productImage" />
        </div>
      )}
    </div>
  );
}

export default FileUpload;
