#from flask import Flask, render_template, redirect, url_for, request, jsonify
#from flask_pymongo import PyMongo
#from flask_cors import CORS
#import os

#PROBANDO COMMIT

# Obtener ruta absoluta de la carpeta donde está app.py
#base_dir = os.path.dirname(os.path.abspath(__file__))

# Definir rutas absolutas para templates y static, yendo un nivel arriba y entrando a frontend-service
#template_dir = os.path.abspath(os.path.join(base_dir, '..', 'frontend-service', 'templates'))
#static_dir = os.path.abspath(os.path.join(base_dir, '..', 'frontend-service', 'static'))

#app = Flask(__name__, template_folder=template_dir, static_folder=static_dir)

#app = Flask(__name__) 
#app = Flask(__name__, static_folder='static', template_folder='templates')
#CORS(app) #no permite por defecto credenciales

#from flask_cors import CORS

#cors_origins = [
  #  "http://127.0.0.1:5000",
 #   "http://localhost:5000"
#]

#CORS(app, supports_credentials=True, resources={r"/api/*": {"origins": cors_origins}})


# Configuración de MongoDB (usando Mongo Atlas)
#app.config["MONGO_URI"] = "mongodb+srv://actividadesitu:marcopolo89@micluster123.mjgzogc.mongodb.net/pruebaMongoDB?retryWrites=true&w=majority"

#mongo = PyMongo(app)
#@app.route('/api/register', methods=['POST'])
#def api_register():
 #   data = request.get_json()
  #  username = data.get('username')
   # password = data.get('password')

#    if not username or not password:
 #       return jsonify({'message': 'Faltan datos'}), 400

  #  if mongo.db.users.find_one({'username': username}):
   #     return jsonify({'message': 'El usuario ya existe'}), 409

    #mongo.db.users.insert_one({'username': username, 'password': password})
    #return jsonify({'message': 'Usuario registrado exitosamente'}), 200


#para los botones de login y register en index.html al regresar
#@app.route('/login')
#def login_proxy():
 #   return render_template('login.html')

#@app.route('/')
#def index_proxy():
#    return render_template('index.html')
#if __name__ == '__main__':
#    app.run(port=5001)
from flask import Flask, render_template, request, jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS
import os

# Rutas absolutas para frontend
base_dir = os.path.dirname(os.path.abspath(__file__))
template_dir = os.path.abspath(os.path.join(base_dir, '..', 'frontend-service', 'templates'))
static_dir = os.path.abspath(os.path.join(base_dir, '..', 'frontend-service', 'static'))

app = Flask(__name__, template_folder=template_dir, static_folder=static_dir)

# Configuración CORS para permitir credenciales

cors_origins = [
    "http://127.0.0.1:5000",
    "http://127.0.0.1:5002",
    "http://127.0.0.1:5003",
    "http://localhost:5000",
    "http://localhost:5002",
    "http://localhost:5003",
    "https://atale.comercial.cloud"
]

CORS(app, supports_credentials=True, resources={r"/api/*": {"origins": cors_origins}})

# MongoDB
app.config["MONGO_URI"] = "mongodb+srv://actividadesitu:marcopolo89@micluster123.mjgzogc.mongodb.net/pruebaMongoDB?retryWrites=true&w=majority"
mongo = PyMongo(app)

# Registro de usuario
@app.route('/api/register', methods=['POST'])
def api_register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'message': 'Faltan datos'}), 400

    if mongo.db.users.find_one({'username': username}):
        return jsonify({'message': 'El usuario ya existe'}), 409

    mongo.db.users.insert_one({'username': username, 'password': password})
    return jsonify({'message': 'Usuario registrado exitosamente'}), 200

# Páginas
@app.route('/login')
def login_page():
    return render_template('login.html')

@app.route('/')
def index_page():
    return render_template('index.html')

# DEBUG: imprime el Origin de cada request
@app.before_request
def log_origin():
    print("Request Origin:", request.headers.get("Origin"))

if __name__ == '__main__':
    app.run(port=5001)
