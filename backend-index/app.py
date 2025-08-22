from flask import Flask, send_from_directory
import os

# Carpeta base dentro del contenedor
base_dir = os.path.dirname(os.path.abspath(__file__))

# Rutas relativas dentro del contenedor
template_dir = os.path.join(base_dir, 'templates')
static_dir = os.path.join(base_dir, 'static')

app = Flask(__name__, static_folder=static_dir, template_folder=template_dir)

# Servir HTML
@app.route('/')
def index():
    return send_from_directory(template_dir, 'index.html')

@app.route('/login')
def login():
    return send_from_directory(template_dir, 'login.html')

@app.route('/register')
def register():
    return send_from_directory(template_dir, 'register.html')

@app.route('/dashboard')
def dashboard():
    return send_from_directory(template_dir, 'dashboard.html')

# Servir estáticos (JS, CSS, imágenes)
@app.route('/static/<path:path>')
def static_files(path):
    return send_from_directory(static_dir, path)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)






