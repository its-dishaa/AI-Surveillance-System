import { Trash2, Camera } from "lucide-react";

function CameraCard({ camera, onDelete, onOpen }) {

    const handleDelete = () => {
        if (window.confirm(`Delete camera "${camera.name}"?`)) {
            onDelete(camera.id);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-md border p-5">
            <div className="flex justify-between">

                <div>
                    <h3>{camera.name}</h3>
                    <p>ID: {camera.id}</p>
                </div>

                <div className="space-x-2">

                    <button
                        onClick={() => onOpen(camera)}
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        Open Camera
                    </button>

                    <button
                        onClick={handleDelete}
                        className="bg-red-600 text-white px-4 py-2 rounded"
                    >
                        <Trash2 size={18}/>
                    </button>

                </div>

            </div>
        </div>
    );
}

export default CameraCard;