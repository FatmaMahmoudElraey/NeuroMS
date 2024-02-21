from flask import Flask, request, render_template,redirect, flash, jsonify
import numpy as np
import os
import sys
from werkzeug.utils import secure_filename
import pandas as pd
import joblib
from msDetection_main import getPrediction
import pickle

# ================================================================================== ms detection
UPLOAD_FOLDER = 'static/images2/'

app = Flask(__name__)
app.secret_key = "secret key"

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

current_directory = os.path.dirname(os.path.abspath(sys.argv[0]))
@app.route('/', methods=['GET'])
def index():
    return render_template('msdetection.html')

@app.route('/', methods=['POST'])
def submit_file():
    if request.method == 'POST':
        file = request.files['imagefile']
        if file:
            filename = secure_filename(file.filename)  
            file.save(os.path.join(app.config['UPLOAD_FOLDER'],filename))
            label = getPrediction(filename)
            flash(label)
            full_filename = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            flash(full_filename)
        return render_template('msdetection.html')
    return render_template('msdetection.html')


# ================================================================================== risk to have ms

risk_model = pickle.load(open("models/riskmodel.pkl", "rb"))

@app.route("/risk_home")
def risk_home():
    return render_template("risk.html")

@app.route("/risk_detect", methods=["POST"])

def risk_detect():
    if request.form.get("input_type") == "risk_file_input":
        try:
            file = request.files["risk_file"]
            df = pd.read_csv(file)
            prediction = risk_model.predict(df)
            return render_template("risk.html", prediction_text="The risk of having Multiple sclerosis based on your medical history is {}".format(str(prediction*100)))
        except Exception as e:
            return render_template("risk.html", error_message="An error occurred during prediction: {}".format(str(e)))
    elif request.form.get("input_type") == "input_fields":
        try:
            float_features = [float(request.form[key]) for key in request.form if request.form[key].isdigit()]
            if not float_features:
                return render_template("risk.html", error_message="Invalid input. Please enter numeric values.")
            # float_features = [float(x) for x in request.form.values()]
            print(float_features)
            features = [np.array(float_features)]
            prediction = risk_model.predict(features)
            return render_template("risk.html", prediction_text="The risk of having Multiple sclerosis based on your medical history is {}".format(str(prediction*100)))
        except Exception as e:
            return render_template("risk.html", error_message="An error occurred during prediction: {}".format(str(e)))
    print(request.form.get("input_type"))
    return render_template("risk.html")
# ================================================================================== ms types
ms_types_model = joblib.load(open("models/ms_types_model.pkl", "rb"))

@app.route("/ms_types")
def ms_types_home():
    return render_template("ms_types.html")

@app.route("/ms_types_detect", methods=["POST"])

def ms_types_detect():
    if request.form.get("input_type") == "cis_file_input":
        try:

            file = request.files["cis_file"]
            df = pd.read_csv(file)
            prediction = ms_types_model.predict(df)
            if prediction == [0]:
                prediction="Type of MS is RR-MS"
            elif prediction == [1]:
                prediction = "Type of MS is PP-MS"
            else:
                prediction = "Type of MS is SP-MS"
            return render_template("ms_types.html", prediction_text="{}".format(str(prediction)))
        except Exception as e:
            return render_template("ms_types.html", error_message="An error occurred during prediction: {}".format(str(e)))
    print(request.form.get("input_type"))
    return render_template("ms_types.html")

# ================================================================================== CIS detection

cis_model = pickle.load(open("models/cismodel.pkl", "rb"))

@app.route("/cis_home")
def cis_home():
    return render_template("cis.html")

@app.route("/cis_detect", methods=["POST"])

def cis_detect():
    if request.form.get("input_type") == "cis_file_input":
        try:

            file = request.files["cis_file"]
            df = pd.read_csv(file)
            prediction = cis_model.predict(df)
            if prediction == [1]:
                prediction = "Diagnosed with CIS"
            else:
                prediction = "Not Diagnosed with CIS"
            return render_template("cis.html", prediction_text="{}".format(str(prediction)))
        except Exception as e:
            return render_template("cis.html", error_message="An error occurred during prediction: {}".format(str(e)))
    elif request.form.get("input_type") == "input_fields":
        try:
            float_features = [float(request.form[key]) for key in request.form if request.form[key].isdigit()]
            if not float_features:
                return render_template("cis.html", error_message="Invalid input. Please enter numeric values.")
            # float_features = [float(x) for x in request.form.values()]
            print(float_features)
            features = [np.array(float_features)]
            prediction = cis_model.predict(features)
            if prediction == [1]:
                prediction = "Diagnosed with CIS"
            else:
                prediction = "Not Diagnosed with CIS"
            return render_template("cis.html", prediction_text="{}".format(str(prediction)))
        except Exception as e:
            return render_template("cis.html", error_message="An error occurred during prediction: {}".format(str(e)))
    print(request.form.get("input_type"))
    return render_template("cis.html")




# ================================================================================== EDSS detection

edss_sc_X = joblib.load('scalers/edss_sc_X_scaler.joblib')
edss_sc_y = joblib.load('scalers/edss_sc_y_scaler.joblib')


edss_model = pickle.load(open("models/edss_model.pkl", "rb"))
@app.route("/edss_home")
def edss_home():
    return render_template("edss.html")

@app.route("/edss_detect", methods=["POST"])
def edss_detect():
    file = request.files["edss_file"]
    df = pd.read_csv(file)
    scaled_inputs = []
    row_values = df.values.reshape(1, -1)
    for feature_index in range(row_values.shape[1]):
        feature_column = row_values[:, feature_index].reshape(-1, 1)
        scaled_feature = edss_sc_X.transform(feature_column)
        scaled_inputs.append(scaled_feature)

    scaled_inputs = np.hstack(scaled_inputs)
    prediction = edss_model.predict(scaled_inputs)
    prediction_original = edss_sc_y.inverse_transform(prediction.reshape(-1, 1))

    print(prediction_original)

    return render_template("edss.html", prediction_text="The Expanded Disability Status Scale is {}".format(str(prediction_original)))


# ================================================================================== monitoring ms

monitor_model = pickle.load(open("models/monitoring_model.pkl", "rb"))

@app.route("/monitor_home")
def monitor_home():
    return render_template("monitor.html")

@app.route("/monitor_result", methods=["POST"])
def monitor_result():
    if request.form.get("input_type") == "monitor_file_input":
        try:

            file = request.files["monitor_file"]
            df = pd.read_csv(file)
            prediction = monitor_model.predict(df)
            if prediction == [1]:
                prediction = "The patient has cognitive difficulties and doesn't fully control the rest of his body"
            else:
                prediction = "The patient doesn't have cognitive difficulties and fully control the rest of his body"
            return render_template("monitor.html", prediction_text="{}".format(str(prediction)))
        except Exception as e:
            return render_template("monitor.html", error_message="An error occurred during prediction: {}".format(str(e)))
    elif request.form.get("input_type") == "input_fields":
        try:
            float_features = [float(request.form[key]) for key in request.form if request.form[key].isdigit()]
            if not float_features:
                return render_template("monitor.html", error_message="Invalid input. Please enter numeric values.")
            # float_features = [float(x) for x in request.form.values()]
            print(float_features)
            features = [np.array(float_features)]
            prediction = monitor_model.predict(features)
            if prediction == [1]:
                prediction = "The patient has cognitive difficulties and doesn't fully control the rest of his body"
            else:
                prediction = "The patient doesn't have cognitive difficulties and fully control the rest of his body"
            return render_template("monitor.html", prediction_text="{}".format(str(prediction)))
        except Exception as e:
            return render_template("monitor.html", error_message="An error occurred during prediction: {}".format(str(e)))
    print(request.form.get("input_type"))
    return render_template("monitor.html")


# ================================================================================== SDMT

sdmt_sc_X = joblib.load('scalers/sdmt_sc_X_scaler.joblib')
sdmt_sc_y = joblib.load('scalers/sdmt_sc_y_scaler.joblib')


sdmt_model = pickle.load(open("models/sdmtmodel.pkl", "rb"))
@app.route("/sdmt_home")
def sdmt_home():
    return render_template("sdmt.html")

@app.route("/sdmt_result", methods=["POST"])
def sdmt_result():
    file = request.files["sdmt_file"]
    df = pd.read_csv(file)
    scaled_inputs = []
    row_values = df.values.reshape(1, -1)
    for feature_index in range(row_values.shape[1]):
        feature_column = row_values[:, feature_index].reshape(-1, 1)
        scaled_feature = sdmt_sc_X.transform(feature_column)
        scaled_inputs.append(scaled_feature)

    scaled_inputs = np.hstack(scaled_inputs)
    prediction = sdmt_model.predict(scaled_inputs)
    prediction_original = sdmt_sc_y.inverse_transform(prediction.reshape(-1, 1))

    print(prediction_original)

    return render_template("sdmt.html", prediction_text="The result of the Symbol Digit Modalities Test is {}".format(str(prediction_original)))

# ================================================================================== CombiWise

combi_sc_X = joblib.load('scalers/combi_sc_X_scaler.joblib')
combi_sc_y = joblib.load('scalers/combi_sc_y_scaler.joblib')


combi_model = pickle.load(open("models/combi_model.pkl", "rb"))
@app.route("/combi_home")
def combi_home():
    return render_template("combi.html")

@app.route("/combi_result", methods=["POST"])
def combi_result():
    file = request.files["combi_file"]
    df = pd.read_csv(file)
    scaled_inputs = []
    row_values = df.values.reshape(1, -1)
    for feature_index in range(row_values.shape[1]):
        feature_column = row_values[:, feature_index].reshape(-1, 1)
        scaled_feature = combi_sc_X.transform(feature_column)
        scaled_inputs.append(scaled_feature)

    scaled_inputs = np.hstack(scaled_inputs)
    prediction = combi_model.predict(scaled_inputs)
    prediction_original = combi_sc_y.inverse_transform(prediction.reshape(-1, 1))

    print(prediction_original)

    return render_template("combi.html", prediction_text="The result of the Combinatorial Weight-Adjusted Disability Score is {}".format(str(prediction_original)))

# ================================================================================== SNRS

snrs_sc_X = joblib.load('scalers/snrs_sc_X_scaler.joblib')
snrs_sc_y = joblib.load('scalers/snrs_sc_y_scaler.joblib')


snrs_model = pickle.load(open("models/snrs_model.pkl", "rb"))
@app.route("/snrs_home")
def snrs_home():
    return render_template("snrs.html")

@app.route("/snrs_result", methods=["POST"])
def snrs_result():
    file = request.files["snrs_file"]
    df = pd.read_csv(file)
    scaled_inputs = []
    row_values = df.values.reshape(1, -1)
    for feature_index in range(row_values.shape[1]):
        feature_column = row_values[:, feature_index].reshape(-1, 1)
        scaled_feature = snrs_sc_X.transform(feature_column)
        scaled_inputs.append(scaled_feature)

    scaled_inputs = np.hstack(scaled_inputs)
    prediction = snrs_model.predict(scaled_inputs)
    prediction_original = snrs_sc_y.inverse_transform(prediction.reshape(-1, 1))

    print(prediction_original)

    return render_template("snrs.html", prediction_text="The result of The Scripps neurologic rating scale is {}".format(str(prediction_original)))

if __name__ == '__main__':
    app.run(port=5000, debug=True)

