from flask import jsonify, request, abort
from app.models import Baul, db

def baul_list():
    registros = db.session.execute(db.select(Baul)).scalars().all()
    return jsonify([r.to_dict() for r in registros]), 200

def baul_detail(id_baul):
    registro = db.session.get(Baul, id_baul)
    if not registro:
        abort(404, description="Registro no encontrado")
    return jsonify(registro.to_dict()), 200

def baul_add():
    data = request.get_json()
    if not data:
        abort(400, description="No se recibió información JSON")
    for field in ["Plataforma", "usuario", "clave"]:
        if field not in data:
            abort(400, description=f"Falta el campo obligatorio: {field}")
    nuevo = Baul(
        Plataforma=data["Plataforma"],
        usuario=data["usuario"],
        clave=data["clave"]
    )
    db.session.add(nuevo)
    db.session.commit()
    return jsonify(nuevo.to_dict()), 201

def baul_update(id_baul):
    data = request.get_json()
    registro = db.session.get(Baul, id_baul)
    if not registro:
        abort(404, description="Registro no encontrado")
    registro.Plataforma = data.get("Plataforma", registro.Plataforma)
    registro.usuario = data.get("usuario", registro.usuario)
    registro.clave = data.get("clave", registro.clave)
    db.session.commit()
    return jsonify(registro.to_dict()), 200

def baul_delete(id_baul):
    registro = db.session.get(Baul, id_baul)
    if not registro:
        abort(404, description="Registro no encontrado")
    db.session.delete(registro)
    db.session.commit()
    return jsonify({"mensaje": "Registro eliminado correctamente"}), 200