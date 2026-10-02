from flask import Flask, jsonify
from flask_cors import CORS
from flasgger import Swagger

from app.models import db
from app.common.config import Config
from app.common.error import error_bp
from app.controller import baul_bp

app = Flask(__name__)
app.config.from_object(Config)

CORS(app)
swagger = Swagger(app)
db.init_app(app)

with app.app_context():
    db.create_all()

@app.route("/", methods=["GET"])
def home():
    return jsonify({"mensaje": "API funcionando correctamente"}), 200

app.register_blueprint(error_bp)
app.register_blueprint(baul_bp)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)