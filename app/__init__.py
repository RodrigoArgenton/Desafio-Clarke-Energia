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
        return {"message": "Api supplier"}

    @app.route('/supplier', methods=['GET'])
    def list_supplier():
        supplier = load_data()
        return jsonify(supplier)

    @app.route('/supplier/recommend/<int:kwh>', methods=['GET'])
    def recommend_supplier(kwh):
        supplier = load_data()
        
        filter_supplier = [f for f in supplier if f['minimum_kWh_limit'] <= kwh]

        if not filter_supplier:
            return jsonify({"message": "No suppliers"}), 404
        
        ordered_supplier = sorted(filter_supplier, key=lambda f: f['cost_per_kwh'])
        
        return jsonify(ordered_supplier), 200

    return app