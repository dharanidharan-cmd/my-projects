import joblib

encoders = joblib.load("encoders.pkl")

for col, encoder in encoders.items():
    print(col, ":", encoder.classes_)