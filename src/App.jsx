import React, { useState } from "react";
import Logo from "./components/logo/Logo";
import Heading from "./components/Heading/Heading";
import { FiUploadCloud } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";

const App = () => {
  // State to manage images and selected images
  const [images, setImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);

  // Function to handle image uploads
  const handleImageUpload = (e) => {
    const newImages = Array.from(e.target.files);
    setImages([...images, ...newImages]);
  };

  // Function to handle clicking on an image
  const handleImageClick = (index) => {
    const selectedImageIndex = selectedImages.indexOf(index);
    if (selectedImageIndex === -1) {
      setSelectedImages([...selectedImages, index]);
    } else {
      const newSelectedImages = [...selectedImages];
      newSelectedImages.splice(selectedImageIndex, 1);
      setSelectedImages(newSelectedImages);
    }
  };

  // Function to delete selected images
  const handleDeleteSelected = () => {
    const remainingImages = images.filter(
      (_, index) => !selectedImages.includes(index)
    );
    setImages(remainingImages);
    setSelectedImages([]);
  };

  // Function to handle drag-and-drop image reordering
  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("index", index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, toIndex) => {
    e.preventDefault();
    const fromIndex = e.dataTransfer.getData("index");

    const reorderedImages = [...images];
    const [draggedImage] = reorderedImages.splice(fromIndex, 1);
    reorderedImages.splice(toIndex, 0, draggedImage);

    setImages(reorderedImages);
  };

  // CSS classes for image overlay animations
  const overlayBaseClass =
    "bg-[#0000005b] absolute top-0 p-3 left-0 w-full h-full duration-300 !hover:translate-y-0";
  const overlayActiveClass = "translate-y-0";
  const overlayInactiveClass = "translate-y-[-100%]";

  return (
    <div className="px-4">
      <div className="max-w-container mx-auto p-4 m-5 rounded-lg shadow-lg">
        <div className="flex justify-between border-b py-3 items-center mb-5">
          <Logo />
          {/* Show heading when images are selected */}
          {selectedImages.length === 0 ? (
            <Heading />
          ) : (
            <h3 className="text-[1rem] md:text-[1.5rem] text-[#9d9d9d]">
              Delete {selectedImages.length}{" "}
              {selectedImages.length === 1 ? "Image" : "Images"}
            </h3>
          )}
        </div>
        <div className="relative flex gap-3 flex-wrap items-baseline">
          {images.length === 0
            ? <h5 className="text-center font-thin !text-[#9d9d9d] w-full">No images to show</h5>
            : images.map((image, index) => (
                <div
                  key={index}
                  // Dynamically set image dimensions and center them
                  className={`relative cursor-pointer group border p-2 rounded-lg duration-300 overflow-hidden ${
                    index === 0
                      ? "w-[292px] h-[292px] "
                      : "w-[133px] md:w-[140px] h-[133px] md:h-[140px]"
                  }`}
                  onDragStart={(e) => handleDragStart(e, index)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, index)}
                  draggable={true}
                >
                  {image && (
                    <>
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Image ${index}`}
                        onClick={() => handleImageClick(index)}
                        className="group-hover:scale-[1.1] duration-300 w-full h-full rounded-lg"
                      />
                      <div
                        className={`${overlayBaseClass}  ${
                          selectedImages.includes(index)
                            ? overlayActiveClass
                            : overlayInactiveClass
                        }`}
                        onClick={() => handleImageClick(index)}
                      >
                        {selectedImages.includes(index) && (
                          <input
                            type="checkbox"
                            className="checkbox"
                            checked={selectedImages.includes(index)}
                            onChange={() => handleImageClick(index)}
                          />
                        )}
                      </div>
                    </>
                  )}
                </div>
              ))}
        </div>
        <div className="mt-10 flex justify-center ">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            multiple
            className="hidden"
            id="fileInput"
          />
          <label
            htmlFor="fileInput"
            className="bg-[#27cf9d]  py-2 px-4 rounded-lg cursor-pointer duration-300 group hover:bg-[#27cf9d75]"
          >
            <FiUploadCloud className="text-[30px] text-white group-hover:translate-y-[-3px] duration-300 mt-[5px]" />
          </label>
          {selectedImages.length > 0 && (
            <button
              onClick={handleDeleteSelected}
              className="ml-3 bg-red-500 duration-300 hover:bg-red-400 text-white py-2 px-4 group rounded-lg"
            >
              <AiOutlineDelete className="text-[30px] text-white group-hover:translate-y-[-3px] duration-300" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
