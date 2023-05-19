from app import app
from routes import routes

app.register_blueprint(routes)

# starting the app
if __name__ == "__main__":
    app.run(port=3000, debug=True)