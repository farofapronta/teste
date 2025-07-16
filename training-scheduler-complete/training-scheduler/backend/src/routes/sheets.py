from flask import Blueprint, request, jsonify
from src.services.google_sheets import GoogleSheetsService
import json

sheets_bp = Blueprint('sheets', __name__)
sheets_service = GoogleSheetsService()

@sheets_bp.route('/authenticate', methods=['POST'])
def authenticate():
    """
    Endpoint para autenticar com Google Sheets
    Aceita credenciais de conta de serviço ou OAuth
    """
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({"error": "Dados não fornecidos"}), 400
        
        # Verifica se são credenciais de conta de serviço
        if 'type' in data and data['type'] == 'service_account':
            success = sheets_service.authenticate_with_service_account(data)
            if success:
                return jsonify({"message": "Autenticação realizada com sucesso", "type": "service_account"})
            else:
                return jsonify({"error": "Falha na autenticação"}), 401
        
        # Para OAuth (desenvolvimento)
        elif 'credentials_file' in data:
            credentials_file = data['credentials_file']
            token_file = data.get('token_file')
            
            success = sheets_service.authenticate_with_oauth(credentials_file, token_file)
            if success:
                return jsonify({"message": "Autenticação realizada com sucesso", "type": "oauth"})
            else:
                return jsonify({"error": "Falha na autenticação"}), 401
        
        else:
            return jsonify({"error": "Formato de credenciais inválido"}), 400
            
    except Exception as e:
        return jsonify({"error": f"Erro interno: {str(e)}"}), 500

@sheets_bp.route('/read', methods=['POST'])
def read_sheet():
    """
    Endpoint para ler dados de uma planilha
    """
    try:
        data = request.get_json()
        
        if not data or 'spreadsheet_id' not in data:
            return jsonify({"error": "spreadsheet_id é obrigatório"}), 400
        
        spreadsheet_id = data['spreadsheet_id']
        range_name = data.get('range', 'Sheet1!A:Z')  # Range padrão
        
        raw_data = sheets_service.read_sheet_data(spreadsheet_id, range_name)
        
        if not raw_data:
            return jsonify({"error": "Nenhum dado encontrado ou erro na leitura"}), 404
        
        # Processa os dados para o formato de treinamentos
        processed_data = sheets_service.parse_training_data(raw_data)
        
        return jsonify({
            "message": "Dados lidos com sucesso",
            "raw_data": raw_data,
            "processed_data": processed_data
        })
        
    except Exception as e:
        return jsonify({"error": f"Erro interno: {str(e)}"}), 500

@sheets_bp.route('/write', methods=['POST'])
def write_sheet():
    """
    Endpoint para escrever dados em uma planilha
    """
    try:
        data = request.get_json()
        
        if not data or 'spreadsheet_id' not in data or 'values' not in data:
            return jsonify({"error": "spreadsheet_id e values são obrigatórios"}), 400
        
        spreadsheet_id = data['spreadsheet_id']
        range_name = data.get('range', 'Sheet1!A1')
        values = data['values']
        
        success = sheets_service.write_sheet_data(spreadsheet_id, range_name, values)
        
        if success:
            return jsonify({"message": "Dados escritos com sucesso"})
        else:
            return jsonify({"error": "Falha ao escrever dados"}), 500
            
    except Exception as e:
        return jsonify({"error": f"Erro interno: {str(e)}"}), 500

@sheets_bp.route('/append', methods=['POST'])
def append_sheet():
    """
    Endpoint para adicionar dados ao final de uma planilha
    """
    try:
        data = request.get_json()
        
        if not data or 'spreadsheet_id' not in data or 'values' not in data:
            return jsonify({"error": "spreadsheet_id e values são obrigatórios"}), 400
        
        spreadsheet_id = data['spreadsheet_id']
        range_name = data.get('range', 'Sheet1!A:Z')
        values = data['values']
        
        success = sheets_service.append_sheet_data(spreadsheet_id, range_name, values)
        
        if success:
            return jsonify({"message": "Dados adicionados com sucesso"})
        else:
            return jsonify({"error": "Falha ao adicionar dados"}), 500
            
    except Exception as e:
        return jsonify({"error": f"Erro interno: {str(e)}"}), 500

@sheets_bp.route('/info', methods=['POST'])
def get_sheet_info():
    """
    Endpoint para obter informações sobre uma planilha
    """
    try:
        data = request.get_json()
        
        if not data or 'spreadsheet_id' not in data:
            return jsonify({"error": "spreadsheet_id é obrigatório"}), 400
        
        spreadsheet_id = data['spreadsheet_id']
        
        info = sheets_service.get_sheet_info(spreadsheet_id)
        
        if info:
            return jsonify({
                "message": "Informações obtidas com sucesso",
                "info": info
            })
        else:
            return jsonify({"error": "Falha ao obter informações"}), 500
            
    except Exception as e:
        return jsonify({"error": f"Erro interno: {str(e)}"}), 500

@sheets_bp.route('/trainings', methods=['POST'])
def get_trainings():
    """
    Endpoint específico para obter dados de treinamentos formatados
    """
    try:
        data = request.get_json()
        
        if not data or 'spreadsheet_id' not in data:
            return jsonify({"error": "spreadsheet_id é obrigatório"}), 400
        
        spreadsheet_id = data['spreadsheet_id']
        range_name = data.get('range', 'Sheet1!A:Z')
        
        raw_data = sheets_service.read_sheet_data(spreadsheet_id, range_name)
        
        if not raw_data:
            return jsonify({"error": "Nenhum dado encontrado"}), 404
        
        # Processa especificamente para treinamentos
        processed_data = sheets_service.parse_training_data(raw_data)
        
        return jsonify({
            "message": "Dados de treinamentos obtidos com sucesso",
            "employees": processed_data["employees"],
            "trainings": processed_data["trainings"],
            "total_employees": len(processed_data["employees"]),
            "total_trainings": len(processed_data["trainings"])
        })
        
    except Exception as e:
        return jsonify({"error": f"Erro interno: {str(e)}"}), 500

@sheets_bp.route('/status', methods=['GET'])
def get_status():
    """
    Endpoint para verificar o status da autenticação
    """
    try:
        is_authenticated = sheets_service.service is not None
        
        return jsonify({
            "authenticated": is_authenticated,
            "message": "Autenticado" if is_authenticated else "Não autenticado"
        })
        
    except Exception as e:
        return jsonify({"error": f"Erro interno: {str(e)}"}), 500

