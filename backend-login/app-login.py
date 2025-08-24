from flask import Flask, render_template, redirect, url_for, request, jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS
import os

#PROBANDO COMMIT 29/7

# Obtener ruta absoluta de la carpeta donde está app.py
base_dir = os.path.dirname(os.path.abspath(__file__))

# Definir rutas absolutas para templates y static, yendo un nivel arriba y entrando a frontend-service
template_dir = os.path.abspath(os.path.join(base_dir, '..', 'frontend-service', 'templates'))
static_dir = os.path.abspath(os.path.join(base_dir, '..', 'frontend-service', 'static'))

app = Flask(__name__, template_folder=template_dir, static_folder=static_dir)
#app = Flask(__name__, static_folder='static', template_folder='templates')
CORS(app, resources={r"/auth/api/*": {"origins": [
    "http://127.0.0.1:5000",
    "http://127.0.0.1:5002",
    "http://127.0.0.1:5003",
    "http://localhost:5000",
    "http://localhost:5002",
    "http://localhost:5003",
    "https://atale.comercial.cloud"
]}}, supports_credentials=True)

#CORS(app)

# Configuración de MongoDB (usando Mongo Atlas)
app.config["MONGO_URI"] = "mongodb+srv://actividadesitu:marcopolo89@micluster123.mjgzogc.mongodb.net/pruebaMongoDB?retryWrites=true&w=majority"

mongo = PyMongo(app)

@app.route('/auth/api/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.json.get('username')  # ← si estás usando JS y fetch
        password = request.json.get('password')

        user = mongo.db.users.find_one({'username': username})
        if user and user['password'] == password:
            return jsonify({"msg": "Login exitoso"}), 200
            
        else:
            return jsonify({"msg": "Credenciales inválidas"}), 401

    # Si es GET, podés devolver algo genérico o un mensaje de salud
    return jsonify({"msg": "Login service online"}), 200


    return render_template('login.html')

@app.route('/dashboard')
def dashboard_proxy():
    return render_template('dashboard.html')


#if __name__ == '__main__':
    #app.run(port=5002)
if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5002)

