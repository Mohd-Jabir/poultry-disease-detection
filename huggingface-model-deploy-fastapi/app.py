

from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import numpy as np
from io import BytesIO
from PIL import Image
import tensorflow as tf
from tensorflow.keras.applications.resnet50 import preprocess_input
from tensorflow.keras.models import Model

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allows access from any frontend/domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MODEL = tf.keras.models.load_model("mohdshahnawazalam/poultry_resnet_weights")

CLASS_NAMES = ["cocci", "healthy", "ncd","salmo"]

#for doing severity analysis
def make_gradcam_heatmap(img_array, model, last_conv_layer_name="conv5_block3_out", pred_index=None):
    """
    Generates a heat map for a specific image using the model's last conv layer.
    """
    # 1. Create a sub-model that maps: Input Image -> [Last Conv Layer Output, Final Predictions]
    grad_model = Model(
        inputs=model.inputs,
        outputs=[model.get_layer(last_conv_layer_name).output, model.output]
    )

    # 2. Record operations for automatic differentiation
    with tf.GradientTape() as tape:
        last_conv_layer_output, preds = grad_model(img_array)
        
        # If no specific class index is provided, use the one with the highest probability
        if pred_index is None:
            pred_index = tf.argmax(preds[0])
        
        # Get the "score" (probability) of the winning class
        class_channel = preds[:, pred_index]

    # 3. Calculate gradients of the class score with respect to the feature map
    grads = tape.gradient(class_channel, last_conv_layer_output)

    # 4. Global Average Pooling of the gradients (get "importance weight" for each channel)
    pooled_grads = tf.reduce_mean(grads, axis=(0, 1, 2))

    # 5. Multiply feature map by importance weights
    last_conv_layer_output = last_conv_layer_output[0]
    heatmap = last_conv_layer_output @ pooled_grads[..., tf.newaxis]
    heatmap = tf.squeeze(heatmap)

    # 6. Apply ReLU (keep only positive influence) & Normalize between 0 and 1
    heatmap = tf.maximum(heatmap, 0) / tf.math.reduce_max(heatmap)
    
    return heatmap.numpy()



@app.get("/ping")
async def ping():
    return "Hello, I am alive"

def read_file_as_image(data) -> np.ndarray:
    # 1. Load image and ensure it's in RGB
    image = Image.open(BytesIO(data)).convert("RGB")
    
    # 2. Resize to MobileNetV2 default input size
    image = image.resize((224, 224))
    
    return np.array(image)

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    image = read_file_as_image(await file.read())
    
    # 3. Add batch dimension
    img_batch = np.expand_dims(image, 0)
    
    # 4. MobileNetV2 specific preprocessing (scales pixels to [-1, 1])
    processed_image = preprocess_input(img_batch)
    
    predictions = MODEL.predict(processed_image)
    print(predictions)
    predicted_class = CLASS_NAMES[np.argmax(predictions[0])]
    confidence = np.max(predictions[0])

    # 5. severity ration calculation
     # Count pixels that are "hot" (above threshold)
    heatmap = make_gradcam_heatmap(processed_image,MODEL, last_conv_layer_name="conv5_block3_out")
    threshold=0.6
    hot_pixels = np.sum(heatmap > threshold)
    total_pixels = heatmap.size
    
    # Calculate ratio (0.0 to 1.0)
    severity_ratio = hot_pixels / total_pixels
    
    return {
        'class': predicted_class,
        'confidence': float(confidence),
        'severity' : severity_ratio
    }

if __name__ == "__main__":
    uvicorn.run(app, host='localhost', port=7860)
