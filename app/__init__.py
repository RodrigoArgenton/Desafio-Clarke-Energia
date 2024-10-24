from flask import Flask, jsonify
import json

def create_app():
    app = Flask(__name__)

    def load_data():
        with open('app/data/supplier.json', 'r', encoding='utf-8') as file:
            supplier = json.load(file)
        return supplier

    @app.route('/')
    def home():
        return {"message": "Api de fonecedores"}

    @app.route('/supplier', methods=['GET'])
    def list_supplier():
        supplier = load_data()
        return jsonify(supplier)

    return app