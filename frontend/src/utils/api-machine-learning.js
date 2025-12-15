const BASE_URL = "https://backend-prevo.vercel.app";
const ML_BASE_URL = "https://tridarma6-ml-prevo.hf.space";

async function uploadDataset(file) {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${ML_BASE_URL}/dataset/upload`, {
      method: "POST",
      body: formData,
      headers: {
        "ngrok-skip-browser-warning": "true",
      },
    });

    const responseJson = await response.json();

    if (responseJson.status === "success") {
      return {
        error: false,
        message: responseJson.message,
        path: responseJson.path,
      };
    }

    return {
      error: true,
      errorMessage: responseJson.detail || "Upload failed",
    };
  } catch (error) {
    console.error("Upload Error:", error);
    return {
      error: true,
      message: "Network error or server unreachable",
    };
  }
}

async function runMachineLearningModel() {
  try {
    const response = await fetch(`${ML_BASE_URL}/model/run`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    });

    const responseJson = await response.json();

    if (responseJson.status === "success") {
      return {
        error: false,
        message: responseJson.message,
        data: responseJson.processed_records,
      };
    }

    return {
      error: true,
      message: responseJson.detail || "Model execution failed",
    };
  } catch (error) {
    console.error("Model Run Error:", error);
    return {
      error: true,
      message: "Network error or server unreachable",
    };
  }
}

export {
  uploadDataset,
  runMachineLearningModel
};