import axios from "axios";

const api = axios.create({

    baseURL: "http://127.0.0.1:8000",

    headers: {
        "Content-Type": "application/json"
    }

});

export default api;



export const DashboardAPI = () =>
    api.get("/dashboard/overview");



export const CamerasAPI = () =>
    api.get("/cameras");



export const CameraAPI = (id) =>
    api.get(`/cameras/${id}`);



export const DeleteCameraAPI = (id) =>
    api.delete(`/cameras/${id}`);



export const CreateCameraAPI = (data) =>
    api.post("/cameras", data);



export const VideosAPI = () =>
    api.get("/videos");



export const DeleteVideoAPI = (id) =>
    api.delete(`/videos/${id}`);



export const UploadVideoAPI = (formData) =>
    api.post("/upload", formData, {

        headers: {
            "Content-Type": "multipart/form-data"
        }

    });



export const ProcessVideoAPI = (id) =>
    api.post(`/process/${id}`);



export const AnalyticsAPI = (id) =>
    api.get(`/analytics/videos/${id}`);



export const EventsAPI = () =>
    api.get("/events/");



export const VideoEventsAPI = (id) =>
    api.get(`/videos/${id}/events`);



export const TracksAPI = (id) =>
    api.get(`/videos/${id}/tracks`);



export const TrackPointsAPI = (id) =>
    api.get(`/tracks/${id}/points`);



export const StreamAPI = (id) =>
    `http://127.0.0.1:8000/stream/${id}`;