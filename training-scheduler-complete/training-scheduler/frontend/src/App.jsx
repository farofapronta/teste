import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Users, Settings, BarChart3, Upload, Download, Filter, Search, Plus, Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import GanttChart from './components/GanttChart.jsx'
import './App.css'

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [isConnected, setIsConnected] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [trainingData, setTrainingData] = useState(null)

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark')
  }

  // Simula conexão com Google Sheets
  const handleConnectSheet = async () => {
    setIsConnected(true)
    // Aqui seria feita a integração real com o backend
    // Por enquanto, vamos simular dados
    setTimeout(() => {
      setTrainingData({
        employees: [
          { id: '3039082', name: 'Abanto Soto, Carlos' },
          { id: '6000985', name: 'Abt Aguilar, Sebastián' },
          { id: '4670857', name: 'Acuña Bocanegra, Elmer Eduardo' }
        ],
        trainings: [
          { employee_id: '3039082', training_type: 'SIM Training', date: '15/01/2025' },
          { employee_id: '3039082', training_type: 'LC Training', date: '01/02/2025' },
          { employee_id: '6000985', training_type: 'PC Training', date: '20/01/2025' },
          { employee_id: '6000985', training_type: 'RTI Training', date: '05/02/2025' }
        ]
      })
    }, 1500)
  }

  // Animação de entrada para os cards
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  // Animação para os botões da sidebar
  const sidebarItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
    hover: { scale: 1.05, x: 5 }
  }

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'calendar', label: 'Cronograma', icon: Calendar },
    { id: 'employees', label: 'Colaboradores', icon: Users },
    { id: 'settings', label: 'Configurações', icon: Settings }
  ]

  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 transition-all duration-500 ${darkMode ? 'dark' : ''}`}>
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-700 sticky top-0 z-50"
      >
        <div className="flex items-center justify-between px-6 py-4">
          <motion.div 
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Training Scheduler
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">Gerenciamento de Treinamentos</p>
            </div>
          </motion.div>

          <div className="flex items-center space-x-4">
            {/* Status de Conexão */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex items-center space-x-2"
            >
              <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'} animate-pulse`} />
              <span className="text-sm text-slate-600 dark:text-slate-300">
                {isConnected ? 'Conectado' : 'Desconectado'}
              </span>
            </motion.div>

            {/* Toggle Dark Mode */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </motion.button>
          </div>
        </div>
      </motion.header>

      <div className="flex">
        {/* Sidebar */}
        <motion.aside 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-64 bg-white/50 dark:bg-slate-900/50 backdrop-blur-lg border-r border-slate-200 dark:border-slate-700 min-h-screen p-4"
        >
          <nav className="space-y-2">
            {menuItems.map((item, index) => {
              const Icon = item.icon
              return (
                <motion.button
                  key={item.id}
                  variants={sidebarItemVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    activeTab === item.id
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </motion.button>
              )
            })}
          </nav>
        </motion.aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <AnimatePresence mode="wait">
            {activeTab === 'dashboard' && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                {/* Header da seção */}
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100">Dashboard</h2>
                    <p className="text-slate-600 dark:text-slate-400">Visão geral dos treinamentos</p>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <motion.div whileHover={{ scale: 1.05 }}>
                      <Button 
                        onClick={handleConnectSheet}
                        disabled={isConnected}
                        className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:opacity-50"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        {isConnected ? 'Conectado' : 'Conectar Planilha'}
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }}>
                      <Button variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        Exportar
                      </Button>
                    </motion.div>
                  </div>
                </div>

                {/* Cards de estatísticas */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { title: 'Total de Colaboradores', value: trainingData?.employees?.length || '156', change: '+12%', color: 'from-blue-500 to-blue-600' },
                    { title: 'Treinamentos Ativos', value: trainingData?.trainings?.length || '23', change: '+5%', color: 'from-green-500 to-green-600' },
                    { title: 'Vencendo em 30 dias', value: '8', change: '-3%', color: 'from-yellow-500 to-yellow-600' },
                    { title: 'Vencidos', value: '2', change: '-50%', color: 'from-red-500 to-red-600' }
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="relative overflow-hidden hover:shadow-lg transition-shadow duration-300">
                        <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${stat.color}`} />
                        <CardHeader className="pb-2">
                          <CardDescription className="text-sm">{stat.title}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between">
                            <span className="text-2xl font-bold">{stat.value}</span>
                            <Badge variant={stat.change.startsWith('+') ? 'default' : 'destructive'}>
                              {stat.change}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {/* Seção de busca e filtros */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Search className="w-5 h-5" />
                      <span>Buscar e Filtrar</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-4">
                      <div className="flex-1">
                        <Input
                          placeholder="Buscar colaboradores ou treinamentos..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full"
                        />
                      </div>
                      <Button variant="outline">
                        <Filter className="w-4 h-4 mr-2" />
                        Filtros
                      </Button>
                      <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Novo Treinamento
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Gráfico de Gantt */}
                <GanttChart data={trainingData} isConnected={isConnected} />
              </motion.div>
            )}

            {activeTab === 'calendar' && (
              <motion.div
                key="calendar"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100">Cronograma</h2>
                    <p className="text-slate-600 dark:text-slate-400">Visualização detalhada do Gráfico de Gantt</p>
                  </div>
                </div>
                
                <GanttChart data={trainingData} isConnected={isConnected} />
              </motion.div>
            )}

            {activeTab === 'employees' && (
              <motion.div
                key="employees"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100">Colaboradores</h2>
                
                {isConnected && trainingData ? (
                  <div className="grid gap-4">
                    {trainingData.employees.map((employee) => (
                      <Card key={employee.id}>
                        <CardHeader>
                          <CardTitle className="flex items-center space-x-2">
                            <Users className="w-5 h-5" />
                            <span>{employee.name}</span>
                          </CardTitle>
                          <CardDescription>ID: {employee.id}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-wrap gap-2">
                            {trainingData.trainings
                              .filter(t => t.employee_id === employee.id)
                              .map((training, index) => (
                                <Badge key={index} variant="outline">
                                  {training.training_type} - {training.date}
                                </Badge>
                              ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="p-8">
                      <div className="text-center">
                        <Users className="w-16 h-16 mx-auto mb-4 text-slate-400" />
                        <h3 className="text-xl font-semibold mb-2">Gerenciamento de Colaboradores</h3>
                        <p className="text-slate-500">Conecte uma planilha para visualizar os colaboradores</p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div
                key="settings"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100">Configurações</h2>
                <Card>
                  <CardContent className="p-8">
                    <div className="text-center">
                      <Settings className="w-16 h-16 mx-auto mb-4 text-slate-400" />
                      <h3 className="text-xl font-semibold mb-2">Configurações do Sistema</h3>
                      <p className="text-slate-500">Configurações de integração e personalização</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}

export default App
