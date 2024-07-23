"use client";
import { useState, useCallback } from "react";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import cloudinaryUpload from "@/lib/utils/cloudinaryUpload";

type FileUploaderProps = {
  files?: string; // Optional, default value should be handled within the component
  onChange: (fileUrl: string) => void;
};

export const FileUploader = ({ files, onChange }: FileUploaderProps) => {
  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setUploading(true);
      try {
        const uploadedImageUrl = await cloudinaryUpload(acceptedFiles[0]);
        if (typeof onChange === 'function') {
          onChange(uploadedImageUrl);
        } else {
          console.error("onChange is not a function");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      } finally {
        setUploading(false);
      }
    }
  }, [onChange]);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className="file-upload border border-dashed border-gray-600 p-4 rounded-lg">
      <input {...getInputProps()} />
      {uploading ? (
        <p className="text-white">Uploading...</p>
      ) : files ? (
        <Image
          src={files}
          width={1000}
          height={1000}
          alt="uploaded image"
          className="max-h-[400px] overflow-hidden object-cover"
        />
      ) : (
        <>
          <Image
            src="/assets/icons/upload.svg"
            width={40}
            height={40}
            alt="upload"
          />
          <div className="file-upload_label mt-2 text-center">
            <p className="text-14-regular text-white">
              <span className="text-green-500">Click to upload </span>
              or drag and drop
            </p>
            <p className="text-12-regular text-gray-400">
              SVG, PNG, JPG or GIF (max. 800x400px)
            </p>
          </div>
        </>
      )}
    </div>
  );
};
