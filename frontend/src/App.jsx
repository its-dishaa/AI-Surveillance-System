// src/App.jsx

import { Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Dashboard from "./pages/Dashboard";
import Cameras from "./pages/Cameras";
import Videos from "./pages/Videos";
import Upload from "./pages/Upload";
import Analytics from "./pages/Analytics";
import Streaming from "./pages/Streaming";
import Events from "./pages/Events";
import Tracks from "./pages/Tracks";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>

        {/* Dashboard */}
        <Route index element={<Dashboard />} />

        {/* Cameras */}
        <Route path="cameras" element={<Cameras />} />

        {/* Videos */}
        <Route path="videos" element={<Videos />} />

        {/* Upload */}
        <Route path="upload" element={<Upload />} />

        {/* Analytics */}
        <Route path="analytics" element={<Analytics />} />

        {/* Streaming */}
        <Route path="streaming" element={<Streaming />} />

        {/* Events */}
        <Route path="events" element={<Events />} />

        {/* Tracks */}
        <Route path="tracks" element={<Tracks />} />

        {/* NEW Profile Page */}
        <Route path="profile" element={<Profile />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />

      </Route>
    </Routes>
  );
}

export default App;