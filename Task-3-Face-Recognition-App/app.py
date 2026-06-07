from flask import Flask, render_template, request
import cv2
import os

app = Flask(__name__)

UPLOAD_FOLDER = "uploads"
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

cascade = cv2.CascadeClassifier(
    cv2.data.haarcascades +
    "haarcascade_frontalface_default.xml"
)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/detect", methods=["POST"])
def detect():

    file = request.files["image"]

    filepath = os.path.join(
        app.config["UPLOAD_FOLDER"],
        file.filename
    )

    file.save(filepath)

    image = cv2.imread(filepath)

    gray = cv2.cvtColor(
        image,
        cv2.COLOR_BGR2GRAY
    )

    faces = cascade.detectMultiScale(
        gray,
        1.1,
        5
    )

    for (x, y, w, h) in faces:
        cv2.rectangle(
            image,
            (x, y),
            (x+w, y+h),
            (0, 255, 0),
            3
        )

    result_path = "static/result.jpg"

    cv2.imwrite(result_path, image)

    return render_template(
        "index.html",
        result=result_path,
        count=len(faces)
    )

if __name__ == "__main__":
    app.run(debug=True)