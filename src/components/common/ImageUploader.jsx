import React, { useState } from "react";
import { notify } from "../../utils/notify";

function ImageUploader({ image, setImage, preview, setPreview }) {
  const [isDisabled, setIsDisabled] = useState(false);

  const handleFileUpload = (e) => {
    setIsDisabled(true);
    // console.log(e.target.files[0]);
    const file = e.target.files[0];
    if (!file) {
      notify("Image is Required...", "error");
      setIsDisabled(false);
      return;
    }
    setImage(file);
    setPreview(URL.createObjectURL(file));
    notify("Image Uploaded Successfully!", "success");
    setIsDisabled(false);
  };
  return (
    <div className="w-full max-w-lg">
      <div
        className={`border-2 border-dashed rounded-2xl p-1 flex flex-col items-center justify-center transition`}
      >
        <div className="flex flex-col justify-center">
          <img
            src={`${preview ? preview : "/image_upload.svg"}`}
            alt="image_upload"
            className="h-10 sm:h-15 w-full rounded-lg"
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
