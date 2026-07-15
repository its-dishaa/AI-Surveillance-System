import { useState } from "react";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
  CamerasAPI,
  CreateCameraAPI,
  DeleteCameraAPI,
} from "../api/api";

import useFetch from "../hooks/useFetch";
import Loading from "../components/Loading";
import CameraCard from "../components/CameraCard";

function Cameras() {
  const navigate = useNavigate();

  const {
    data: cameras,
    loading,
    error,
    refresh,
  } = useFetch(CamerasAPI);
  const [search, setSearch] = useState("");
const filteredCameras = Array.isArray(cameras)
  ? cameras.filter((camera) =>
      camera.name.toLowerCase().includes(search.toLowerCase())
    )
  : [];

  const [formData, setFormData] = useState({
  name: "",
  latitude: "",
  longitude: "",
  source: "",
});

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAddCamera = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert("Camera name is required.");
      return;
    }

    if (
    formData.latitude === "" ||
    formData.longitude === "" ||
    formData.source.trim() === ""
) {
    alert("All fields are required.");
    return;
}

    try {
      setSubmitting(true);

      await CreateCameraAPI({
  name: formData.name,
  latitude: Number(formData.latitude),
  longitude: Number(formData.longitude),
  source: formData.source,
});

      setFormData({
        name: "",
        latitude: "",
        longitude: "",
        source: "",
      });

      refresh();
    } catch (err) {
      console.error(err);

      if (err.response?.data) {
        console.log(err.response.data);
      }

      alert("Failed to create camera.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this camera?"
    );

    if (!confirmed) return;

    try {
      await DeleteCameraAPI(id);
      refresh();
    } catch (err) {
      console.error(err);
      alert("Failed to delete camera.");
    }
  };

  // Opens the live camera page
  const handleOpenCamera = (camera) => {
    navigate(`/streaming?camera=${camera.id}`);
};

  if (loading) {
    return <Loading text="Loading cameras..." />;
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-100 p-4 text-red-700">
        Failed to load cameras.
      </div>
    );
  }

  return (
  <div className="space-y-8">

    {/* Header */}
    <div>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">
            Camera Management
          </h1>

          <p className="text-gray-500 mt-1">
            Monitor, configure and manage surveillance cameras.
          </p>
        </div>

        <div className="bg-white shadow rounded-xl px-6 py-4">
          <p className="text-sm text-gray-500">
            Total Cameras
          </p>

          <h2 className="text-3xl font-bold text-blue-600">
            {filteredCameras.length}
          </h2>
        </div>
      </div>

      <p className="mt-1 text-gray-500">
        Manage surveillance cameras.
      </p>
    </div>

      {/* Add Camera */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md">
        <h2 className="mb-5 text-xl font-semibold">
          Add Camera
        </h2>

        <form
          onSubmit={handleAddCamera}
          className="grid gap-4 md:grid-cols-5"
        >
          <input
          type="text"
          name="source"
          placeholder="Camera Source (RTSP URL or Webcam)"
          value={formData.source}
          onChange={handleChange}
  className="rounded-lg border px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
/>
          <input
            type="text"
            name="name"
            placeholder="Camera Name"
            value={formData.name}
            onChange={handleChange}
            className="rounded-lg border px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="number"
            step="any"
            name="latitude"
            placeholder="Latitude"
            value={formData.latitude}
            onChange={handleChange}
            className="rounded-lg border px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="number"
            step="any"
            name="longitude"
            placeholder="Longitude"
            value={formData.longitude}
            onChange={handleChange}
            className="rounded-lg border px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            disabled={submitting}
            className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-60"
          >
            <Plus size={18} />
            {submitting ? "Adding..." : "Add Camera"}
          </button>
        </form>
      </div>
<input
  type="text"
  placeholder="Search cameras..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="w-full rounded-lg border px-4 py-2 mb-6 focus:ring-2 focus:ring-blue-500"
/>
      {/* Camera List */}
      {Array.isArray(cameras) && cameras.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-white p-8 text-center text-gray-500 shadow">
          No cameras available.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
  {filteredCameras.map((camera) => (
    <CameraCard
      key={camera.id}
      camera={camera}
      onDelete={handleDelete}
      onOpen={handleOpenCamera}
    />
  ))}
</div>
      )}
    </div>
    
  );
}

export default Cameras;