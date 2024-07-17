from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import base64
import io

app = Flask(__name__)
CORS(app)

@app.route('/upload', methods=['POST'])
def upload_image():
    try:
        data = request.get_json()
        image_data = data['image'].split(",")[1]
        image_bytes = base64.b64decode(image_data)
        image = Image.open(io.BytesIO(image_bytes))
        
        # 画像を加工する例
        processed_image = image.convert("L")

        # 加工した画像をバイトストリームに変換
        image_io = io.BytesIO()
        processed_image.save(image_io, 'JPEG')
        image_io.seek(0)
        processed_image_base64 = base64.b64encode(image_io.getvalue()).decode('utf-8')

        # レスポンス用のデータ
        response_data = {
            "image": f"data:image/jpeg;base64,{processed_image_base64}",
            "message": "Image processed successfully"
        }

        return jsonify(response_data)

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5328)
