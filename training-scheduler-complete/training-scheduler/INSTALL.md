# 🚀 Guia de Instalação Rápida - Training Scheduler

## ⚡ Instalação em 5 Minutos

### 1. Pré-requisitos
- Node.js 20+ instalado
- Python 3.11+ instalado
- pnpm instalado (`npm install -g pnpm`)

### 2. Extrair e Navegar
```bash
# Extrair o arquivo ZIP
unzip training-scheduler-complete.zip
cd training-scheduler
```

### 3. Configurar Backend
```bash
cd backend

# Criar ambiente virtual
python -m venv venv

# Ativar ambiente virtual
# Linux/Mac:
source venv/bin/activate
# Windows:
venv\Scripts\activate

# Instalar dependências
pip install -r requirements.txt

# Iniciar servidor (porta 5000)
python src/main.py
```

### 4. Configurar Frontend (Nova aba do terminal)
```bash
cd frontend

# Instalar dependências
pnpm install

# Iniciar servidor de desenvolvimento (porta 5173)
pnpm run dev
```

### 5. Acessar Aplicativo
Abra o navegador em: `http://localhost:5173`

## 🔧 Configuração Google Sheets

### 1. Criar Projeto no Google Cloud
1. Acesse [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um novo projeto
3. Ative a **Google Sheets API**

### 2. Criar Conta de Serviço
1. Vá em **IAM & Admin > Service Accounts**
2. Clique em **Create Service Account**
3. Preencha os dados e clique em **Create**
4. Baixe o arquivo JSON das credenciais

### 3. Configurar no Aplicativo
1. No aplicativo, vá em **Configurações**
2. Cole o conteúdo do JSON nas credenciais
3. Adicione o ID da sua planilha
4. Clique em **Conectar**

## 📊 Formato da Planilha

Sua planilha deve ter esta estrutura:

| ID | Nome | SIM Training | LC Training | CRM Training |
|----|------|--------------|-------------|--------------|
| 001| João | 15/01/2025   | 01/02/2025  | 10/02/2025   |
| 002| Maria| 20/01/2025   | 05/02/2025  | 15/02/2025   |

## 🎯 Primeiros Passos

1. **Conecte sua planilha** usando as configurações
2. **Explore o Dashboard** para ver estatísticas
3. **Visualize o Cronograma** no Gráfico de Gantt
4. **Use os filtros** para encontrar informações específicas
5. **Personalize** as configurações conforme necessário

## 🆘 Problemas Comuns

### Erro de Porta em Uso
```bash
# Se a porta 5173 estiver em uso, o Vite usará automaticamente 5174
# Acesse: http://localhost:5174
```

### Erro de Dependências Python
```bash
# Certifique-se de estar no ambiente virtual
source venv/bin/activate  # Linux/Mac
pip install --upgrade pip
pip install -r requirements.txt
```

### Erro de Dependências Node.js
```bash
# Limpar cache e reinstalar
rm -rf node_modules package-lock.json
pnpm install
```

## 📞 Suporte

- Consulte o **README.md** para documentação completa
- Verifique os logs do console para erros
- Teste a conexão com Google Sheets no painel de configurações

---

**🎉 Pronto! Seu sistema de gerenciamento de treinamentos está funcionando!**

