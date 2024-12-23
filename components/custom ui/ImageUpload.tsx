import { CldUploadWidget } from "next-cloudinary";
import { Plus, Trash } from "lucide-react";

import { Button } from "../ui/button";
import Image from "next/image";

interface ImageUploadProps {
  value: string[]; // Array of image URLs
  onChange: (value: string) => void; // Called when a new image is added
  onRemove: (value: string) => void; // Called when an image is removed
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onChange,
  onRemove,
  value,
}) => {
  // Handle upload success
  const onUpload = (result: any) => {
    if (result?.info?.secure_url) {
      onChange(result.info.secure_url);
    } else {
      console.error("Upload failed: Invalid result format", result);
    }
  };

  return (
    <div>
      {/* Display uploaded images */}
      <div className="mb-4 flex flex-wrap items-center gap-4">
        {value.map((url) => (
          <div key={url} className="relative w-[200px] h-[200px]">
            <div className="absolute top-0 right-0 z-10">
              <Button
                type="button"
                onClick={() => onRemove(url)}
                size="sm"
                className="bg-red-500 text-white"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image
              src={url}
              alt="Uploaded Image"
              className="object-cover rounded-lg"
              fill
              unoptimized // Bypass Next.js image optimization
            />
          </div>
        ))}
      </div>

      {/* Upload Button */}
      <CldUploadWidget
        uploadPreset="swagify" // Ensure the upload preset exists in your Cloudinary account
        onUpload={onUpload} // Handle successful upload
        options={{
          maxFiles: 5, // Limit the number of files per upload
          sources: ["local", "url", "camera"], // Allow file selection from multiple sources
          clientAllowedFormats: ["image"], // Restrict to image uploads
          maxFileSize: 10485760, // Set max file size (10MB)
        }}
      >
        {({ open }) => {
          return (
            <Button
              type="button"
              onClick={() => {
                if (open) open(); // Open the upload widget
                else console.error("Upload widget could not open.");
              }}
              className="bg-gray-500 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Upload Image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
