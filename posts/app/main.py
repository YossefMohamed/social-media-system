from app import app
from routes import routes
from flask_cors import CORS,cross_origin

app.register_blueprint(routes)
CORS(app, support_credentials=True)

# starting the app
if __name__ == "__main__":
    app.run(port=5001, debug=True)