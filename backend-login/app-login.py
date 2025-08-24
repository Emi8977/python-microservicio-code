from flask import Flask, render_template, request, jsonify
from flask_pymongo import PyMongo
from flask_cors import cross_origin
import os

# Obtener rutas absolutas de templates y static
base_dir = os.path.dirname(os.path.abspath(__file__))
template_dir = os.path.abspath(os.path.join(base_dir, '..', 'frontend-service', 'templates'))
static_dir = os.path.abspath(os.path.join(base_dir, '..', 'frontend-service', 'static'))

app = Flask(__name__, template_folder=template_dir, static_folder=static_dir)

# Configuración de MongoDB
app.config["MONGO_URI"] = "mongodb+srv://actividadesitu:marcopolo89@micluster123.mjgzogc.mongodb.net/pruebaMongoDB?retryWrites=true&w=majority"
mongo = PyMongo(app)

@app.route('/auth/api/login', methods=['POST', 'OPTIONS'])
@cross_origin(origins="https://atale.comercial.cloud", supports_credentials=True)
def login():
    if request.method == 'OPTIONS':
        return '', 204  # Preflight

    username = request.json.get('username')
    password = request.json.get('password')
    user = mongo.db.users.find_one({'username': username})
    if user and user['password'] == password:
        return jsonify({"msg": "Login exitoso"}), 200
    return jsonify({"msg": "Credenciales inválidas"}), 401

@app.route('/dashboard')
def dashboard_proxy():
    return render_template('dashboard.html')

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5002)



