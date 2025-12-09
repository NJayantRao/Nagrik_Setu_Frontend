import React from 'react';
import ImageUploading from 'react-images-uploading';
import { toast } from 'react-toastify';


//   const [images, setImages] = React.useState([]);
//   const maxNumber = 10;

//   const onChange = (imageList) => {
//     setImages(imageList);
//   };

//   return (
//     <div className="w-full flex flex-col items-center ">
//       <ImageUploading
//         multiple
//         value={images}
//         onChange={onChange}
//         maxNumber={maxNumber}
//         dataURLKey="data_url"
//       >
//         {({
//           imageList,
//           onImageUpload,
//           onImageRemoveAll,
//           onImageUpdate,
//           onImageRemove,
//           isDragging,
//           dragProps,
//         }) => (
//           <div className="w-full max-w-lg">
//             {/* Upload Box */}
//             <div
//               className={`border-2 border-dashed rounded-2xl p-4 flex flex-col items-center justify-center transition 
//               ${isDragging ? "border-green-500 bg-green-50" : "border-gray-300"}`}
//               onClick={onImageUpload}
//               {...dragProps}
//             >
//               <div className="text-gray-500 text-lg">📁 Click or Drop Images Here</div>
//               <div className="text-sm text-gray-400 mt-2">Max {maxNumber} images</div>
//             </div>

//             {/* Actions */}
//             {imageList.length > 0 && (
//               <button
//                 onClick={onImageRemoveAll}
//                 className="mt-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-xl font-medium shadow-sm"
//               >
//                 Remove All
//               </button>
//             )}

//             {/* Images Grid */}
//             <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6">
//               {imageList.map((image, index) => (
//                 <div
//                   key={index}
//                   className="relative group bg-white rounded-xl shadow p-2"
//                 >
//                   <img
//                     src={image.data_url}
//                     alt=""
//                     className="rounded-xl object-cover w-full h-32"
//                   />

//                   {/* Hover Buttons */}
//                   <div className="absolute inset-0 bg-black/50 rounded-xl opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 transition">
//                     <button
//                       onClick={() => onImageUpdate(index)}
//                       className="bg-white text-gray-800 px-3 py-1 rounded-lg text-sm shadow"
//                     >
//                       Update
//                     </button>

//                     <button
//                       onClick={() => onImageRemove(index)}
//                       className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm shadow"
//                     >
//                       Remove
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </ImageUploading>
//     </div>
//   );
// }



{/* <div className="w-full max-w-lg">
            {/* Upload Box */}
          //   <div
          //     className={`border-2 border-dashed rounded-2xl p-4 flex flex-col items-center justify-center transition 
          //     ${isDragging ? "border-green-500 bg-green-50" : "border-gray-300"}`}

          //   >
          //     <div className="text-gray-500 text-lg">📁 Click or Drop Images Here</div>
          //   </div>

           
          // </div> 
function ImageUploader({image,setImage}) {
const notify = (message, type = "success") => {
  const colors = {
    success: "#4f46e5", // Indigo (your success color)
    error: "#dc2626",   // Red-600
    info: "#2563eb",    // Blue-600
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
  const handleFileUpload= (e)=>{
    console.log(e.target.files[0]);
    const file= e.target.files[0];
    if(!file){
      notify("Image is Required...","error")
      return
    }
    setImage(file)
    notify("Image Uploaded Successfully!","success")
    
  }
  return(
<div className="w-full max-w-lg">
  <div className={`border-2 border-dashed rounded-2xl p-1 flex flex-col items-center justify-center transition`}>
    <div className='flex flex-col justify-center'>
      <img src="/image_upload.svg" alt="image_upload" className="h-15 w-full"/>
      <div className='bg-blue-600 rounded-lg px-2 py-1 text-gray-200 font-semibold'>
        <input type="file" name="Browse File" placeholder="Browse File" id="" className='h-5 w-20 hover:cursor-pointer ' onChange={(e)=>{
          handleFileUpload(e);
        }}/>
      </div>
    </div>
  </div>
</div>
  )
}

export default ImageUploader;
