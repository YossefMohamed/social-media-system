from app import app
from routes import routes
from flask_cors import CORS

app.register_blueprint(routes)
CORS(app)

# starting the app
if __name__ == "__main__":
    app.run(port=5000, debug=True)