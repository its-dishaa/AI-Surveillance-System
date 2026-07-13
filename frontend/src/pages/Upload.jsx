import UploadBox from "../components/UploadBox";

function Upload() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold ">
          Upload Video
        </h1>

        <p className="mt-2 text-gray-500">
          Select a camera, upload a surveillance video, and start AI processing.
        </p>
      </div>

      {/* Upload Component */}
      <UploadBox />
    </div>
  );
}

export default Upload;