import React, { useState } from "react";
import ImageUploading from "react-images-uploading";
import { toast } from "react-toastify";

function ImageUploader({ image, setImage, preview, setPreview }) {
  const notify = (message, type = "success") => {
    const colors = {
      success: "#4f46e5", // Indigo (your success color)
      error: "#dc2626", // Red-600
      info: "#2563eb", // Blue-600
      warning: "#f59e0b", // Amber-500
    };

    toast[type](message, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      theme: "colored",
      style: {
        background: colors[type],
        color: "#fff",
        fontWeight: "600",
        borderRadius: "10px",
      },
    });
  };
  const handleFileUpload = (e) => {
    console.log(e.target.files[0]);
    const file = e.target.files[0];
    if (!file) {
      notify("Image is Required...", "error");
      return;
    }
    setImage(file);
    setPreview(URL.createObjectURL(file));
    notify("Image Uploaded Successfully!", "success");
  };
  return (
    <div className="w-full max-w-lg">
      <div
        className={`border-2 border-dashed rounded-2xl p-1 flex flex-col items-center justify-center transition`}
      >
        <div className="flex flex-col justify-center">
          <img
            src={`${preview?preview:"/image_upload.svg"}`}
            alt="image_upload"
            className="h-10 sm:h-15 w-full"
          />
          <div className="bg-blue-600 rounded-lg px-2 py-1 text-gray-200 font-semibold">
            <input
              type="file"
              name="Browse File"
              placeholder="Browse File"
              id=""
              className="h-5 w-20 hover:cursor-pointer "
              onChange={(e) => {
                handleFileUpload(e);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageUploader;
