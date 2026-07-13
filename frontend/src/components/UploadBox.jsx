import { useEffect, useState } from "react";
import { UploadCloud, Loader2 } from "lucide-react";

import {
  CamerasAPI,
  UploadVideoAPI,
  ProcessVideoAPI,
} from "../api/api";

function UploadBox() {
  const [cameras, setCameras] = useState([]);
  const [cameraId, setCameraId] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadCameras();
  }, []);

  async function loadCameras() {
    try {
      const res = await CamerasAPI();
      setCameras(res.data);
    } catch (err) {
      console.error(err);
      setMessage("Unable to load cameras.");
    }
  }

  function handleFileChange(e) {
    if (e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  }

  async function handleUpload(e) {
    e.preventDefault();

    if (!cameraId) {
      setMessage("Please select a camera.");
      return;
    }

    if (!selectedFile) {
      setMessage("Please choose a video file.");
      return;
    }

    try {
      setUploading(true);
      setMessage("");

      const formData = new FormData();

      formData.append("camera_id", cameraId);
      formData.append("video", selectedFile);

      const uploadRes = await UploadVideoAPI(formData);

      const uploadedVideo =
        uploadRes.data ?? uploadRes;

      const videoId =
        uploadedVideo.id ||
        uploadedVideo.video_id;

      if (videoId) {
        await ProcessVideoAPI(videoId);
      }

      setMessage("Video uploaded and processing started.");

      setSelectedFile(null);
      setCameraId("");

      document.getElementById("video-upload-input").value = "";
    } catch (err) {
      console.error(err);
      setMessage("Upload failed.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
      <h2 className="text-2xl font-semibold mb-6">
        Upload Video
      </h2>

      <form
        onSubmit={handleUpload}
        className="space-y-5"
      >
        {/* Camera Selection */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">
            Select Camera
          </label>

          <select
            value={cameraId}
            onChange={(e) => setCameraId(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="">
              Select Camera
            </option>

            {cameras.map((camera) => (
              <option
                key={camera.id}
                value={camera.id}
              >
                {camera.name}
              </option>
            ))}
          </select>
        </div>

        {/* File Picker */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">
            Video File
          </label>

          <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-8 cursor-pointer hover:border-blue-500 transition">
            <UploadCloud
              size={40}
              className="text-blue-600 mb-3"
            />

            <span className="text-gray-600">
              {selectedFile
                ? selectedFile.name
                : "Click to choose a video"}
            </span>

            <input
              id="video-upload-input"
              type="file"
              accept="video/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        </div>

        {/* Upload Button */}
        <button
          type="submit"
          disabled={uploading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-3 font-semibold transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {uploading ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2
                size={18}
                className="animate-spin"
              />
              Uploading...
            </span>
          ) : (
            "Upload & Process"
          )}
        </button>

        {/* Status Message */}
        {message && (
          <div className="rounded-lg bg-gray-100 px-4 py-3 text-sm text-gray-700">
            {message}
          </div>
        )}
      </form>
    </div>
  );
}

export default UploadBox;