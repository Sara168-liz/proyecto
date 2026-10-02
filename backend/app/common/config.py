class Config:
    USER = 'root'
    PASSWORD = ''                 # ← CAMBIA por TU contraseña
    HOST = 'localhost'
    DATABASE = 'gestor_contrasena'    # ← TU base de datos
    SQLALCHEMY_DATABASE_URI = f'mysql+pymysql://{USER}:{PASSWORD}@{HOST}/{DATABASE}'
    SQLALCHEMY_TRACK_MODIFICATIONS = False