# python-microservicio-code
## Proyecto de microservicios con python
### Tecnologias
Frontend:
   1. HTML
   2. CSS
   3. Javascript
Backend:
   1. Python con framework Flask
   2. Gateway hecho con Javascript
Base de datos:
   MongoAtlas

### Arquitectura del software
La aplicacion tendra una arquitectura de microservicios con una API Gateway de KONG

### CI/CD
#### CI
El pipeline de CI es por un archivo .yaml para uso en GitAction

#### CD
El despliegue continuo sera en ArgoCD configurado en un archivo aplicacionPythonMicro.yaml
