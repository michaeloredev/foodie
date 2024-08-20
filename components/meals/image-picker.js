"use client";
import React, { useRef, useState } from "react";
import classes from "./image-picker.module.css";
import Image from "next/image";

export default function ImagePicker({ label, name }) {
  const useImageRef = useRef();
  const [pickedImage, setPickedImage] = useState();

  function handleImageClick() {
    useImageRef.current.click();
  }

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (!file) {
      setPickedImage(null);
    }

    const fileReader = new FileReader();
    
    fileReader.onload = () => {
      setPickedImage(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <input
          className={classes.input}
          type="file"
          id={name}
          name={name}
          accept="image/png, image/jpg"
          ref={useImageRef}
          onChange={handleImageChange}
        />
        <div className={classes.preview}>
          <>
            {pickedImage && (
              <Image
                src={pickedImage}
                alt="the image selected by the user"
                fill
              />
            )}
            {!pickedImage && <p>No image has been picked</p>}
          </>
        </div>
        <button
          onClick={handleImageClick}
          className={classes.button}
          type="button"
        >
          Pick Image
        </button>
      </div>
    </div>
  );
}
