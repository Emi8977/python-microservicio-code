from flask import Flask, render_template, redirect, url_for, request, jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS
import os

#PROBANDO COMMIT

# Obtener ruta absoluta de la carpeta donde está app.py
base_dir = os.path.dirname(os.path.abspath(__file__))

# Definir rutas absolutas para templates y static, yendo un nivel arriba y entrando a frontend-service
template_dir = os.path.abspath(os.path.join(base_dir, '..', 'frontend-service', 'templates'))
static_dir = os.path.abspath(os.path.join(base_dir, '..', 'frontend-service', 'static'))

app = Flask(__name__, template_folder=template_dir, static_folder=static_dir)

#app = Flask(__name__) 
#app = Flask(__name__, static_folder='static', template_folder='templates')
CORS(app)

# Configuración de MongoDB (usando Mongo Atlas)
app.config["MONGO_URI"] = "mongodb+srv://actividadesitu:marcopolo89@micluster123.mjgzogc.mongodb.net/pruebaMongoDB?retryWrites=true&w=majority"

mongo = PyMongo(app)

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')

        if not username or not password:
            return jsonify({'message': 'Faltan datos'}), 400

        # Verificar si el usuario ya existe
        if mongo.db.users.find_one({'username': username}):
            return jsonify({'message': 'El usuario ya existe'}), 409

        # Crear nuevo usuario
        mongo.db.users.insert_one({'username': username, 'password': password})
        return jsonify({'message': 'Usuario registrado exitosamente'}), 200

    return render_template('register.html')

#para los botones de login y register en index.html al regresar
@app.route('/login')
def login_proxy():
    return render_template('login.html')

@app.route('/')
def index_proxy():
    return render_template('index.html')
if __name__ == '__main__':
    app.run(port=5001)
