from flask import Flask, render_template, request, jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS, cross_origin
import os

# Obtener ruta absoluta de la carpeta donde está app.py
base_dir = os.path.dirname(os.path.abspath(__file__))

# Definir rutas absolutas para templates y static (frontend-service)
template_dir = os.path.abspath(os.path.join(base_dir, '..', 'frontend-service', 'templates'))
static_dir = os.path.abspath(os.path.join(base_dir, '..', 'frontend-service', 'static'))

app = Flask(__name__, template_folder=template_dir, static_folder=static_dir)

# Configuración global de CORS (opcional, útil para otras rutas)
CORS(app, supports_credentials=True, origins=[
    "http://127.0.0.1:5000",
    "http://127.0.0.1:5002",
    "http://127.0.0.1:5003",
    "http://localhost:5000",
    "http://localhost:5002",
    "http://localhost:5003",
    "https://atale.comercial.cloud"
])

# Configuración de MongoDB
app.config["MONGO_URI"] = "mongodb+srv://actividadesitu:marcopolo89@micluster123.mjgzogc.mongodb.net/pruebaMongoDB?retryWrites=true&w=majority"
mongo = PyMongo(app)

# Ruta de login con manejo explícito de preflight OPTIONS
@app.route('/auth/api/login', methods=['POST', 'OPTIONS'])
@cross_origin(origins="https://atale.comercial.cloud", supports_credentials=True)
def login():
    if request.method == 'OPTIONS':
        # Preflight CORS
        return '', 204

    # POST normal
    username = request.json.get('username')
    password = request.json.get('password')

    user = mongo.db.users.find_one({'username': username})
    if user and user['password'] == password:
        return jsonify({"msg": "Login exitoso"}), 200
    else:
        return jsonify({"msg": "Credenciales inválidas"}), 401

# Ruta de dashboard
@app.route('/dashboard')
def dashboard_proxy():
    return render_template('dashboard.html')

# Ruta de salud
@app.route('/auth/api/health', methods=['GET'])
def health():
    return jsonify({"msg": "Login service online"}), 200

if __name__ == '__main__':
    # Ejecutar Flask en todas las interfaces, puerto 5002
    app.run(host="0.0.0.0", port=5002)



