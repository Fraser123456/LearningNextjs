"use client";
import React, { useState } from "react";
import { CldUploadWidget, CldImage } from "next-cloudinary";

interface CloudinaryResult {
  public_id: string;
}
const styles = {
  palette: {
    window: "#F5F5F5",
    sourceBg: "#FFFFFF",
    windowBorder: "#90a0b3",
    tabIcon: "#0094c7",
    inactiveTabIcon: "#69778A",
    menuIcons: "#0094C7",
    link: "#53ad9d",
    action: "#8F5DA5",
    inProgress: "#0194c7",
    complete: "#53ad9d",
    error: "#c43737",
    textDark: "#000000",
    textLight: "#FFFFFF",
  },
  fonts: {
    default: null,
    "'Poppins', sans-serif": {
      url: "https://fonts.googleapis.com/css?family=Poppins",
      active: true,
    },
  },
};

function UploadPage() {
  const [publicId, setPublicId] = useState("");

  return (
    <>
      {publicId && (
        <CldImage src={publicId} width={270} height={180} alt="Image" />
      )}
      <CldUploadWidget
        options={{
          sources: ["local"],
          multiple: false,
          maxFiles: 5,
          styles: styles,
        }}
        uploadPreset="ijsuhuq5"
        onSuccess={(result, { widget }) => {
          if (result.event !== "success") return;

          const info = result.info as CloudinaryResult;
          setPublicId(info.public_id);
        }}
      >
        {({ open }) => (
          <button className="btn btn-primary mt-4" onClick={() => open()}>
            upload
          </button>
        )}
      </CldUploadWidget>
    </>
  );
}

export default UploadPage;
