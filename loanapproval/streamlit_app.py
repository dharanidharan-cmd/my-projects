import streamlit as st
import joblib
import pandas as pd
# Load model and encoders
model = joblib.load("loan_model.pkl")
encoders = joblib.load("encoders.pkl")

st.set_page_config(page_title="Loan Approval AI")

st.title("🏦 Loan Approval Prediction")

st.write("Enter applicant details below.")

# User Inputs
gender = st.selectbox("Gender", ["male", "female"])

married = st.selectbox("Married", ["yes", "no"])

dependents = st.selectbox("Dependents", ["0", "1", "2", "3+"])

education = st.selectbox("Education", ["graduate", "not graduate"])

self_employed = st.selectbox("Self Employed", ["yes", "no"])

applicantincome = st.number_input("Applicant Income", min_value=0)

coapplicantincome = st.number_input("Coapplicant Income", min_value=0)

loanamount = st.number_input("Loan Amount", min_value=0)

loan_amount_term = st.number_input("Loan Amount Term", min_value=0)

credit_history = st.selectbox("Credit History", [0, 1])

property_area = st.selectbox(
    "Property Area",
    ["rural", "semiurban", "urban"]
)

if st.button("Predict"):

    # Encode text inputs
    gender_encoded = encoders["gender"].transform([gender])[0]
    married_encoded = encoders["married"].transform([married])[0]
    dependents_encoded = encoders["dependents"].transform([dependents])[0]
    education_encoded = encoders["education"].transform([education])[0]
    self_employed_encoded = encoders["self_employed"].transform([self_employed])[0]
    property_area_encoded = encoders["property_area"].transform([property_area])[0]

    # Create DataFrame
    input_data = pd.DataFrame([[
        gender_encoded,
        married_encoded,
        dependents_encoded,
        education_encoded,
        self_employed_encoded,
        applicantincome,
        coapplicantincome,
        loanamount,
        loan_amount_term,
        credit_history,
        property_area_encoded
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

    # Predict
    prediction = model.predict(input_data)

    if prediction[0] == 1:
        st.success("✅ Loan Approved")
    else:
        st.error("❌ Loan Rejected")