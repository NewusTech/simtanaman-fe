"use client";

import { useState } from "react";

interface ImageUploaderProps {
  label: string;
  image: string | ArrayBuffer | null;
  setImage: (image: string | ArrayBuffer | null) => void;
}
export default function ImageUploader({
  image,
  setImage,
  label,
}: ImageUploaderProps) {
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (
      files &&
      files[0] &&
      (files[0].type === "image/jpeg" || files[0].type === "image/png")
    ) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please upload a JPG or PNG image.");
    }
  };

  return (
    <div>
      <div className="text-sm">{label}</div>
      <label
        htmlFor="imageUpload"
        className="flex flex-col items-center justify-center w-56 h-56 border-2 border-dashed border-green-600 rounded-lg cursor-pointer hover:bg-green-50"
      >
        {image ? (
          typeof image === "string" ? (
            <img
              src={image}
              alt="Uploaded"
              className="w-full h-full object-cover rounded-lg"
            />
          ) : null
        ) : (
          <div className="flex flex-col items-center">
            <span className="text-3xl text-green-600">+</span>
            <p className="text-sm text-green-700">JPG or PNG</p>
            <p className="text-xs text-green-500">(Max 450 x 450 px)</p>
          </div>
        )}
        <input
          id="imageUpload"
          type="file"
          accept="image/jpeg, image/png"
          className="hidden"
          onChange={handleImageChange}
        />
      </label>
    </div>
  );
}
