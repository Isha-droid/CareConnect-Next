"use client"
const cloudinaryUpload = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "myntra_social"); // Replace with your Cloudinary upload preset

  const response = await fetch("https://api.cloudinary.com/v1_1/dp6r7jk5u/image/upload", { // Replace with your Cloudinary cloud name
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to upload image to Cloudinary");
  }

  const data = await response.json();
  return data.secure_url;
};

export default cloudinaryUpload;
