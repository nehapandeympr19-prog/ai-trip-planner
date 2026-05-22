from app import app

with app.app_context():
    print("🔍 Current Database Configuration:")
    print(f"SQLALCHEMY_DATABASE_URI: {app.config.get('SQLALCHEMY_DATABASE_URI')}")
    print(f"SQLALCHEMY_BINDS: {app.config.get('SQLALCHEMY_BINDS')}")