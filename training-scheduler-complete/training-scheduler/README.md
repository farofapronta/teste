# Training Scheduler - Sistema de Gerenciamento de Treinamentos

Um aplicativo web profissional e personalizável para gerenciamento de escalas de treinamento de colaboradores, com visualização em Gráfico de Gantt e integração com Google Sheets.

## 🚀 Características Principais

### ✨ Interface Moderna
- **Design responsivo** com suporte a desktop e mobile
- **Modo escuro/claro** com transições suaves
- **Animações elegantes** com Framer Motion
- **Componentes profissionais** usando shadcn/ui
- **Glassmorphism** e efeitos visuais modernos

### 📊 Gráfico de Gantt Interativo
- **Visualização em tempo real** dos treinamentos
- **Drag & drop** para reposicionar tarefas
- **Zoom e navegação** intuitivos
- **Cores personalizáveis** por tipo de treinamento
- **Estatísticas em tempo real**

### 🔗 Integração Google Sheets
- **API completa** para leitura e escrita
- **Autenticação segura** via conta de serviço
- **Sincronização automática** de dados
- **Suporte a múltiplas planilhas**

### ⚙️ Funcionalidades Avançadas
- **Filtros inteligentes** por período, status, tipo
- **Busca em tempo real**
- **Notificações e alertas**
- **Exportação de dados**
- **Configurações personalizáveis**

## 🏗️ Arquitetura do Sistema

```
training-scheduler/
├── backend/                 # API Flask
│   ├── src/
│   │   ├── main.py         # Aplicação principal
│   │   ├── routes/         # Rotas da API
│   │   │   └── sheets.py   # Endpoints Google Sheets
│   │   └── services/       # Serviços
│   │       └── google_sheets.py # Integração Google Sheets
│   ├── requirements.txt    # Dependências Python
│   └── venv/              # Ambiente virtual
│
├── frontend/               # Interface React
│   ├── src/
│   │   ├── App.jsx        # Componente principal
│   │   ├── components/    # Componentes React
│   │   │   ├── GanttChart.jsx      # Gráfico de Gantt
│   │   │   ├── SettingsPanel.jsx   # Painel de configurações
│   │   │   └── FilterPanel.jsx     # Filtros avançados
│   │   └── components/ui/ # Componentes UI (shadcn/ui)
│   ├── package.json       # Dependências Node.js
│   └── index.html         # HTML principal
│
└── README.md              # Esta documentação
```

## 🛠️ Tecnologias Utilizadas

### Backend
- **Flask** - Framework web Python
- **Google API Client** - Integração Google Sheets
- **Flask-CORS** - Suporte a CORS
- **Python 3.11** - Linguagem de programação

### Frontend
- **React 19** - Framework JavaScript
- **Vite** - Build tool moderna
- **Tailwind CSS** - Framework CSS utilitário
- **shadcn/ui** - Componentes UI profissionais
- **Framer Motion** - Animações suaves
- **Lucide React** - Ícones modernos
- **wx-react-gantt** - Biblioteca Gráfico de Gantt

## 📋 Pré-requisitos

- **Node.js** 20.18.0 ou superior
- **Python** 3.11 ou superior
- **pnpm** (gerenciador de pacotes)
- **Conta Google** com acesso ao Google Sheets API

## 🚀 Instalação e Configuração

### 1. Clone o Repositório
```bash
git clone <url-do-repositorio>
cd training-scheduler
```

### 2. Configuração do Backend

```bash
cd backend

# Criar ambiente virtual
python -m venv venv

# Ativar ambiente virtual (Linux/Mac)
source venv/bin/activate

# Ativar ambiente virtual (Windows)
venv\Scripts\activate

# Instalar dependências
pip install -r requirements.txt
```

### 3. Configuração do Frontend

```bash
cd frontend

# Instalar dependências
pnpm install
```

### 4. Configuração do Google Sheets API

1. Acesse o [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um novo projeto ou selecione um existente
3. Ative a **Google Sheets API**
4. Crie credenciais de **Conta de Serviço**
5. Baixe o arquivo JSON das credenciais
6. Configure as credenciais no painel de configurações do aplicativo

## 🎯 Como Usar

### 1. Iniciar o Backend
```bash
cd backend
source venv/bin/activate  # Linux/Mac
python src/main.py
```

### 2. Iniciar o Frontend
```bash
cd frontend
pnpm run dev
```

### 3. Acessar o Aplicativo
Abra o navegador em `http://localhost:5173`

### 4. Configurar Integração
1. Clique em **"Conectar Planilha"**
2. Cole o ID da sua planilha Google Sheets
3. Configure as credenciais da API
4. Teste a conexão

## 📊 Estrutura da Planilha Google Sheets

### Formato Esperado
```
| ID Colaborador | Nome Colaborador | SIM Training | LC Training | CRM Training | ... |
|----------------|------------------|--------------|-------------|--------------|-----|
| 3039082        | João Silva       | 15/01/2025   | 01/02/2025  | 10/02/2025   | ... |
| 6000985        | Maria Santos     | 20/01/2025   | 05/02/2025  | 15/02/2025   | ... |
```

### Tipos de Treinamento Suportados
- **SIM Training** - Simulador
- **LC Training** - Line Check
- **CRM Training** - Crew Resource Management
- **RTI Training** - Recurrent Training Item
- **PC Training** - Proficiency Check
- **Ditching Training** - Treinamento de Emergência
- **Delta Training** - Treinamento Delta
- **CAT Training** - Category Training

## 🎨 Personalização

### Cores dos Treinamentos
As cores são automaticamente atribuídas por tipo:
- **SIM**: Azul (#3b82f6)
- **LC**: Verde (#10b981)
- **CRM**: Amarelo (#f59e0b)
- **RTI**: Roxo (#8b5cf6)
- **PC**: Ciano (#06b6d4)
- **Ditching**: Vermelho (#ef4444)

### Temas
- **Modo Claro**: Interface clara e profissional
- **Modo Escuro**: Interface escura para reduzir fadiga visual

## 🔧 API Endpoints

### Autenticação
```
POST /api/sheets/authenticate
```

### Leitura de Dados
```
GET /api/sheets/read?spreadsheet_id=<id>&range=<range>
```

### Escrita de Dados
```
POST /api/sheets/write
Body: {
  "spreadsheet_id": "string",
  "range": "string",
  "values": [["data"]]
}
```

### Obter Treinamentos
```
GET /api/sheets/trainings?spreadsheet_id=<id>
```

## 🚀 Deploy

### Frontend (Netlify/Vercel)
```bash
cd frontend
pnpm run build
# Deploy da pasta dist/
```

### Backend (Heroku/Railway)
```bash
cd backend
# Configurar variáveis de ambiente
# Deploy do diretório backend/
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 🆘 Suporte

Para suporte e dúvidas:
- Abra uma **Issue** no GitHub
- Consulte a **documentação** da API
- Verifique os **logs** do console para debugging

## 🔄 Atualizações Futuras

- [ ] Notificações push
- [ ] Relatórios avançados
- [ ] Integração com calendários
- [ ] App mobile
- [ ] Múltiplos idiomas
- [ ] Backup automático

---

**Desenvolvido com ❤️ para otimizar o gerenciamento de treinamentos**

