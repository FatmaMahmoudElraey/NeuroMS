import numpy as np
from PIL import Image
from tensorflow.keras.models import load_model
import cv2
import os

def getPrediction(filename):
    my_model = load_model("models/finalunet.h5")
    img_path = 'static/images2/'+filename
    img= cv2.imread(img_path)
    img = Image.fromarray(img, 'RGB')
    img = img.resize((224, 224))
    img = np.array(img)/255
    img = np.expand_dims(img, axis=0)
    predictions = np.argmax(my_model.predict(img))

    if str(predictions)=='0':
        return "Not diagnosed with MS"
    else:
        return "diagnosed with MS"
