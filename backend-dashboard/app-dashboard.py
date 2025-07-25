from flask import Flask, render_template, redirect, url_for, request, jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS
import os

##PROBANDO COMMIT

# Obtener ruta absoluta de la carpeta donde está app.py
base_dir = os.path.dirname(os.path.abspath(__file__))

# Definir rutas absolutas para templates y static, yendo un nivel arriba y entrando a frontend-service
template_dir = os.path.abspath(os.path.join(base_dir, '..', 'frontend-service', 'templates'))
static_dir = os.path.abspath(os.path.join(base_dir, '..', 'frontend-service', 'static'))

app = Flask(__name__, template_folder=template_dir, static_folder=static_dir)
CORS(app)

#app = Flask(__name__) 
#app = Flask(__name__, static_folder='static', template_folder='templates')


# Configuración de MongoDB (usando Mongo Atlas)
app.config["MONGO_URI"] = "mongodb+srv://actividadesitu:marcopolo89@micluster123.mjgzogc.mongodb.net/pruebaMongoDB?retryWrites=true&w=majority"

mongo = PyMongo(app)


@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')

@app.route('/ofertas', methods=['GET'])
def get_ofertas():
    return render_template('ofertas.html')


if __name__ == '__main__':
    app.run(port=5003)


