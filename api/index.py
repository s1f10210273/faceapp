from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import io
import base64
import numpy as np
import cv2
from tensorflow.keras.models import load_model
import traceback

app = Flask(__name__)
CORS(app)

@app.route("/api/python")
def hello_world():
    return "<p>Hello, World!</p>"

# 事前に学習した年齢予測モデルの読み込み
model = load_model('api/age_model_0716_2.h5')

# 年齢ラベル
age_ranges = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90]

def predict_age(image, target_size=(64, 64)):
    # PILのImageオブジェクトをnumpy配列に変換
    image_np = np.array(image)

    # モデルの入力サイズにリサイズ
    image_resized = cv2.resize(image_np, target_size)

    # 正規化
    image_normalized = image_resized / 255.0

    # バッチ次元を追加
    image_batch = np.expand_dims(image_normalized, axis=0)

    # 予測を行う
    prediction = model.predict(image_batch)
    predicted_age_range = np.argmax(prediction)

    # 予測結果の年齢ラベルを取得
    predicted_age_label = age_ranges[predicted_age_range]

    return predicted_age_label

def extract_faces(image, padding=100):
    # 顔検出器の読み込み
    cascade_path = cv2.data.haarcascades + './haarcascade_frontalface_default.xml'
    face_cascade = cv2.CascadeClassifier(cascade_path)

    # 画像の読み込み
    image = np.array(image)

    # グレースケールに変換
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # 顔の検出
    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))

    face_list = []

    # 顔が検出されたか確認
    if len(faces) == 0:
        face_list.append(image)

    # 検出された顔部分を切り出してリストに追加
    for (x, y, w, h) in faces:
        # 顔の周りに余白を追加
        x1 = max(0, x - padding)
        y1 = max(0, y - padding)
        x2 = min(image.shape[1], x + w + padding)
        y2 = min(image.shape[0], y + h + padding)

        face = image[y1:y2, x1:x2]
        face_list.append(face)

    return face_list

@app.route('/api/faceage', methods=['POST'])
def upload_image():
    try:
        if request.content_type != 'application/json':
            return jsonify({"error": "Content-Type must be application/json"}), 400

        data = request.get_json()
        if 'image' not in data:
            return jsonify({"error": "Image data not found in the request"}), 400

        # デバッグ用にリクエストデータをログに出力
        print("Received data:", data)

        image_data = data['image'].split(",")[1]
        image_bytes = base64.b64decode(image_data)
        image = Image.open(io.BytesIO(image_bytes))
        d = "ノーマル"

        # 画像を加工して年齢を予測
        images = extract_faces(image)
        if len(images) > 1:
            d = "opencv"
            images = images[1]
        else:
            images = images[0]
        predicted_age = predict_age(images)

        # 加工した画像をバイトストリームに変換
        processed_image = Image.fromarray(images)  # Numpy配列をPILのImageに変換
        image_io = io.BytesIO()
        processed_image.save(image_io, 'JPEG')
        image_io.seek(0)
        processed_image_base64 = base64.b64encode(image_io.getvalue()).decode('utf-8')

        # レスポンス用のデータ
        response_data = {
            "image": f"data:image/jpeg;base64,{processed_image_base64}",
            "predicted_age": predicted_age,
            "message": d
        }

        return jsonify(response_data)

    except Exception as e:
        # エラーメッセージとスタックトレースをログに出力
        print(f"Error: {e}")
        print(traceback.format_exc())
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
