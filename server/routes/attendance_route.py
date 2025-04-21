from flask import Blueprint, request, jsonify
import os
import base64
import numpy as np
import cv2
import datetime
from openpyxl import Workbook, load_workbook
import face_recognition
from models.user_model import users_collection, tasks_collection
attendance_bp = Blueprint('attendance', __name__)

# Folder for registered face images
REGISTER_FOLDER = "./register_face"

if not os.path.exists(REGISTER_FOLDER):
    os.makedirs(REGISTER_FOLDER)

# Load known faces
def load_known_faces():
    path = REGISTER_FOLDER
    encodings = []
    names = []

    if not os.path.exists(path):
        return encodings, names

    for filename in os.listdir(path):
        if filename.endswith(('.jpg', '.jpeg', '.png')):
            filepath = os.path.join(path, filename)
            img = face_recognition.load_image_file(filepath)
            enc = face_recognition.face_encodings(img)
            if enc:
                encodings.append(enc[0])
                name = os.path.splitext(filename)[0].rsplit("_", 1)[0]
                names.append(name)

    return encodings, names




@attendance_bp.route('/api/register', methods=['POST'])
def register():
    print("🛠️ You are in register route")
    if request.method == "OPTIONS":
        print("✅ Handling preflight OPTIONS request")
        return '', 200

    try:
        data = request.get_json()
        if not data:
            print("❗ No JSON received")
            return jsonify({'message': 'Invalid JSON'}), 400

        name = data.get('name')
        images = data.get('images', [])

        print("👉 Received name:", name)
        print("👉 Number of images:", len(images))

        if not name or len(images) != 3:
            return jsonify({'message': 'Name or 3 images missing'}), 400

        for i, image_data in enumerate(images):
            try:
                if ',' not in image_data:
                    return jsonify({'message': f'Image {i+1} is not base64 encoded properly'}), 400

                header, encoded = image_data.split(',', 1)
                img_bytes = base64.b64decode(encoded)

                filename = os.path.join(REGISTER_FOLDER, f"{name}_{i+1}.jpg")
                with open(filename, 'wb') as f:
                    f.write(img_bytes)

                print(f"✅ Saved: {filename}")

            except Exception as image_error:
                print(f"❌ Error processing image {i+1}:", image_error)
                return jsonify({'message': f'Error saving image {i+1}', 'error': str(image_error)}), 500

        return jsonify({'message': 'Face registered with 3 images!'})

    except Exception as e:
        print("🔥 Register Error:", e)
        return jsonify({'message': 'Internal server error', 'error': str(e)}), 500


@attendance_bp.route('/mark_attendance', methods=['POST'])
def mark_attendance():
    try:
        data = request.get_json()
        image_data = data['image']

        # Decode base64 image
        header, encoded = image_data.split(",", 1)
        img_bytes = base64.b64decode(encoded)
        np_arr = np.frombuffer(img_bytes, np.uint8)
        frame = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

        # Load known faces
        encodings, names = load_known_faces()
        if not encodings:
            return jsonify({"status": "error", "message": "No known faces found"})

        rgb_small_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        face_locations = face_recognition.face_locations(rgb_small_frame)
        face_encodings = face_recognition.face_encodings(rgb_small_frame, face_locations)

        if not face_encodings:
            return jsonify({"status": "error", "message": "No face detected"})

        now = datetime.datetime.now()
        today = now.day
        month = now.month
        filename = f"{month}.xlsx"

        if os.path.exists(filename):
            book = load_workbook(filename)
        else:
            book = Workbook()

        sheet = book.active
        attendance_marked = []

        for face_encoding in face_encodings:
            matches = face_recognition.compare_faces(encodings, face_encoding)
            face_distances = face_recognition.face_distance(encodings, face_encoding)
            name = "Unknown"

            if True in matches:
                best_match_index = np.argmin(face_distances)
                if matches[best_match_index]:
                    name = names[best_match_index]

                    if sheet.cell(row=1, column=today).value is None:
                        sheet.cell(row=1, column=today).value = f"{today}-{month}"

                    row_index = best_match_index + 2
                    sheet.cell(row=row_index, column=1).value = name
                    sheet.cell(row=row_index, column=today).value = "Present"

                    attendance_marked.append(name)

        book.save(filename)
        return jsonify({"status": "success", "marked": attendance_marked})

    except Exception as e:
        print("🔥 Attendance Error:", e)
        return jsonify({"status": "error", "message": str(e)}), 500

