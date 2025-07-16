import os
import json
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google.oauth2.service_account import Credentials as ServiceAccountCredentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

class GoogleSheetsService:
    def __init__(self):
        self.SCOPES = ['https://www.googleapis.com/auth/spreadsheets']
        self.service = None
        self.credentials_file = None
        self.token_file = None
        
    def authenticate_with_service_account(self, credentials_json):
        """
        Autentica usando uma conta de serviço do Google
        
        Args:
            credentials_json (dict): Credenciais da conta de serviço em formato JSON
        """
        try:
            credentials = ServiceAccountCredentials.from_service_account_info(
                credentials_json, scopes=self.SCOPES
            )
            self.service = build('sheets', 'v4', credentials=credentials)
            return True
        except Exception as e:
            print(f"Erro na autenticação: {e}")
            return False
    
    def authenticate_with_oauth(self, credentials_file_path, token_file_path=None):
        """
        Autentica usando OAuth2 (para desenvolvimento/teste)
        
        Args:
            credentials_file_path (str): Caminho para o arquivo credentials.json
            token_file_path (str): Caminho para o arquivo token.json (opcional)
        """
        creds = None
        
        if token_file_path and os.path.exists(token_file_path):
            creds = Credentials.from_authorized_user_file(token_file_path, self.SCOPES)
        
        if not creds or not creds.valid:
            if creds and creds.expired and creds.refresh_token:
                creds.refresh(Request())
            else:
                flow = InstalledAppFlow.from_client_secrets_file(
                    credentials_file_path, self.SCOPES
                )
                creds = flow.run_local_server(port=0)
            
            if token_file_path:
                with open(token_file_path, 'w') as token:
                    token.write(creds.to_json())
        
        self.service = build('sheets', 'v4', credentials=creds)
        return True
    
    def read_sheet_data(self, spreadsheet_id, range_name):
        """
        Lê dados de uma planilha do Google Sheets
        
        Args:
            spreadsheet_id (str): ID da planilha
            range_name (str): Range dos dados (ex: 'Sheet1!A1:Z1000')
            
        Returns:
            list: Lista de listas com os dados da planilha
        """
        try:
            if not self.service:
                raise Exception("Serviço não autenticado")
            
            sheet = self.service.spreadsheets()
            result = sheet.values().get(
                spreadsheetId=spreadsheet_id,
                range=range_name
            ).execute()
            
            values = result.get('values', [])
            return values
            
        except HttpError as error:
            print(f"Erro ao ler dados: {error}")
            return []
        except Exception as e:
            print(f"Erro geral: {e}")
            return []
    
    def write_sheet_data(self, spreadsheet_id, range_name, values):
        """
        Escreve dados em uma planilha do Google Sheets
        
        Args:
            spreadsheet_id (str): ID da planilha
            range_name (str): Range onde escrever (ex: 'Sheet1!A1')
            values (list): Lista de listas com os dados a serem escritos
            
        Returns:
            bool: True se sucesso, False caso contrário
        """
        try:
            if not self.service:
                raise Exception("Serviço não autenticado")
            
            body = {
                'values': values
            }
            
            result = self.service.spreadsheets().values().update(
                spreadsheetId=spreadsheet_id,
                range=range_name,
                valueInputOption='RAW',
                body=body
            ).execute()
            
            return True
            
        except HttpError as error:
            print(f"Erro ao escrever dados: {error}")
            return False
        except Exception as e:
            print(f"Erro geral: {e}")
            return False
    
    def append_sheet_data(self, spreadsheet_id, range_name, values):
        """
        Adiciona dados ao final de uma planilha do Google Sheets
        
        Args:
            spreadsheet_id (str): ID da planilha
            range_name (str): Range onde adicionar (ex: 'Sheet1!A:Z')
            values (list): Lista de listas com os dados a serem adicionados
            
        Returns:
            bool: True se sucesso, False caso contrário
        """
        try:
            if not self.service:
                raise Exception("Serviço não autenticado")
            
            body = {
                'values': values
            }
            
            result = self.service.spreadsheets().values().append(
                spreadsheetId=spreadsheet_id,
                range=range_name,
                valueInputOption='RAW',
                body=body
            ).execute()
            
            return True
            
        except HttpError as error:
            print(f"Erro ao adicionar dados: {error}")
            return False
        except Exception as e:
            print(f"Erro geral: {e}")
            return False
    
    def get_sheet_info(self, spreadsheet_id):
        """
        Obtém informações sobre a planilha (abas, ranges, etc.)
        
        Args:
            spreadsheet_id (str): ID da planilha
            
        Returns:
            dict: Informações da planilha
        """
        try:
            if not self.service:
                raise Exception("Serviço não autenticado")
            
            sheet = self.service.spreadsheets()
            result = sheet.get(spreadsheetId=spreadsheet_id).execute()
            
            return result
            
        except HttpError as error:
            print(f"Erro ao obter informações: {error}")
            return {}
        except Exception as e:
            print(f"Erro geral: {e}")
            return {}
    
    def parse_training_data(self, raw_data):
        """
        Converte os dados brutos da planilha em um formato estruturado para treinamentos
        
        Args:
            raw_data (list): Dados brutos da planilha
            
        Returns:
            dict: Dados estruturados dos treinamentos
        """
        if not raw_data or len(raw_data) < 2:
            return {"employees": [], "trainings": []}
        
        # A primeira linha contém os cabeçalhos dos treinamentos
        headers = raw_data[0]
        
        # Lista dos treinamentos identificados
        training_columns = [
            "Delta", "Charla y Trans AQP", "Ult SIM", "Vence SIM BD", "Ult PC", 
            "Delta", "Planif SIM", "CAT", "Prog SIM", "Ult LC", "Vence LC", 
            "Delta", "Planif LC", "Prog LC", "Ult RTI 1", "Vence RTI 1", 
            "Delta", "Planif RTI 1", "Prog RTI 1", "Ult RTI 2", "Vence RTI 2", 
            "Delta", "Planif RTI 2", "Prog RTI 2", "Ult CRM", "Vence CRM", 
            "Delta", "Planif CRM", "Prog CRM", "Ult Ditching", "Vence Ditching", 
            "Delta", "Planif Ditching", "Prog Ditching"
        ]
        
        employees = []
        trainings = []
        
        # Processa cada linha de dados (pula o cabeçalho)
        for row_index, row in enumerate(raw_data[1:], start=1):
            if len(row) < 2:  # Pula linhas vazias ou incompletas
                continue
            
            # Extrai informações básicas do colaborador
            employee_id = row[0] if len(row) > 0 else ""
            employee_name = row[1] if len(row) > 1 else ""
            
            if not employee_id or not employee_name:
                continue
            
            employee = {
                "id": employee_id,
                "name": employee_name,
                "row_index": row_index
            }
            employees.append(employee)
            
            # Processa os treinamentos para este colaborador
            for col_index, header in enumerate(headers[2:], start=2):  # Pula ID e Nome
                if col_index < len(row) and header in training_columns:
                    training_value = row[col_index]
                    
                    if training_value and training_value.strip():
                        training = {
                            "employee_id": employee_id,
                            "employee_name": employee_name,
                            "training_type": header,
                            "date": training_value.strip(),
                            "row_index": row_index,
                            "col_index": col_index
                        }
                        trainings.append(training)
        
        return {
            "employees": employees,
            "trainings": trainings,
            "headers": headers
        }

