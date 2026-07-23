import pandas as pd
import joblib

from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score

# -------------------------
# Load Dataset
# -------------------------
data = pd.read_csv("loan.csv")

# -------------------------
# Fill Missing Values
# -------------------------
data["gender"] = data["gender"].fillna(data["gender"].mode()[0])
data["married"] = data["married"].fillna(data["married"].mode()[0])
data["dependents"] = data["dependents"].fillna(data["dependents"].mode()[0])
data["self_employed"] = data["self_employed"].fillna(data["self_employed"].mode()[0])

data["loanamount"] = data["loanamount"].fillna(data["loanamount"].mean())
data["loan_amount_term"] = data["loan_amount_term"].fillna(data["loan_amount_term"].mean())
data["credit_history"] = data["credit_history"].fillna(data["credit_history"].mean())

# -------------------------
# Encode Text Columns
# -------------------------
# Create a dictionary to store encoders
encoders = {}

text_columns = [
    "gender",
    "married",
    "dependents",
    "education",
    "self_employed",
    "property_area",
    "loan_status"
]

for col in text_columns:
    le = LabelEncoder()
    data[col] = le.fit_transform(data[col])

    # Save encoder
    encoders[col] = le
# -------------------------
# Remove loan_id
# -------------------------
data = data.drop("loan_id", axis=1)

# -------------------------
# Features and Target
# -------------------------
X = data.drop("loan_status", axis=1)
y = data["loan_status"]

# -------------------------
# Split Data
# -------------------------
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

# -------------------------
# Train Model
# -------------------------
model = LogisticRegression(max_iter=3000)

model.fit(X_train, y_train)

# -------------------------
# Save Model
# -------------------------
joblib.dump(model, "loan_model.pkl")
joblib.dump(encoders, "encoders.pkl")
# -------------------------
# Test Accuracy
# -------------------------
y_pred = model.predict(X_test)

accuracy = accuracy_score(y_test, y_pred)

print("Model trained successfully!")
print("Accuracy:", accuracy)
print("Model saved as loan_model.pkl")