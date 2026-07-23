import joblib
import pandas as pd

# Load model and encoders
model = joblib.load("loan_model.pkl")
encoders = joblib.load("encoders.pkl")

# -------------------------
# Sample Applicant
# -------------------------

gender = "male"
married = "yes"
dependents = "0"
education = "graduate"
self_employed = "no"


applicantincome = 5000
coapplicantincome = 1500
loanamount = 120
loan_amount_term = 360
credit_history = 1

property_area = "urban"

# -------------------------
# Encode text values
# -------------------------

gender = encoders["gender"].transform([gender])[0]
married = encoders["married"].transform([married])[0]
dependents = encoders["dependents"].transform([dependents])[0]
education = encoders["education"].transform([education])[0]
self_employed = encoders["self_employed"].transform([self_employed])[0]
property_area = encoders["property_area"].transform([property_area])[0]

# -------------------------
# Create DataFrame
# -------------------------

input_data = pd.DataFrame([[
    gender,
    married,
    dependents,
    education,
    self_employed,
    applicantincome,
    coapplicantincome,
    loanamount,
    loan_amount_term,
    credit_history,
    property_area
]], columns=[
    "gender",
    "married",
    "dependents",
    "education",
    "self_employed",
    "applicantincome",
    "coapplicantincome",
    "loanamount",
    "loan_amount_term",
    "credit_history",
    "property_area"
])

# -------------------------
# Predict
# -------------------------

prediction = model.predict(input_data)

if prediction[0] == 1:
    print("✅ Loan Approved")
else:
    print("❌ Loan Rejected")