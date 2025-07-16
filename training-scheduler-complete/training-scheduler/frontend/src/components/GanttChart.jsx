import React, { useState, useEffect } from 'react'
import { Gantt } from 'wx-react-gantt'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Calendar, Users, Clock, AlertTriangle, CheckCircle, XCircle } from 'lucide-react'

const GanttChart = ({ data = null, isConnected = false }) => {
  const [ganttData, setGanttData] = useState([])
  const [scales, setScales] = useState([
    { unit: 'month', step: 1, format: 'MMMM yyyy' },
    { unit: 'day', step: 1, format: 'd' }
  ])

  // Dados de exemplo para demonstração
  const sampleData = [
    {
      id: 1,
      text: 'Abanto Soto, Carlos',
      type: 'project',
      open: true,
      data: [
        {
          id: 11,
          text: 'SIM Training',
          start: new Date(2025, 0, 15),
          end: new Date(2025, 0, 20),
          type: 'task',
          progress: 0.8,
          color: '#3b82f6'
        },
        {
          id: 12,
          text: 'LC Training',
          start: new Date(2025, 1, 1),
          end: new Date(2025, 1, 5),
          type: 'task',
          progress: 0.6,
          color: '#10b981'
        },
        {
          id: 13,
          text: 'CRM Training',
          start: new Date(2025, 1, 10),
          end: new Date(2025, 1, 12),
          type: 'task',
          progress: 0.3,
          color: '#f59e0b'
        }
      ]
    },
    {
      id: 2,
      text: 'Abt Aguilar, Sebastián',
      type: 'project',
      open: true,
      data: [
        {
          id: 21,
          text: 'PC Training',
          start: new Date(2025, 0, 20),
          end: new Date(2025, 0, 25),
          type: 'task',
          progress: 1.0,
          color: '#3b82f6'
        },
        {
          id: 22,
          text: 'RTI 1 Training',
          start: new Date(2025, 1, 5),
          end: new Date(2025, 1, 8),
          type: 'task',
          progress: 0.4,
          color: '#8b5cf6'
        },
        {
          id: 23,
          text: 'Ditching Training',
          start: new Date(2025, 1, 15),
          end: new Date(2025, 1, 17),
          type: 'task',
          progress: 0.0,
          color: '#ef4444'
        }
      ]
    },
    {
      id: 3,
      text: 'Acuña Bocanegra, Elmer',
      type: 'project',
      open: true,
      data: [
        {
          id: 31,
          text: 'SIM Training',
          start: new Date(2025, 0, 10),
          end: new Date(2025, 0, 15),
          type: 'task',
          progress: 0.9,
          color: '#3b82f6'
        },
        {
          id: 32,
          text: 'LC Training',
          start: new Date(2025, 0, 25),
          end: new Date(2025, 0, 30),
          type: 'task',
          progress: 0.7,
          color: '#10b981'
        }
      ]
    }
  ]

  useEffect(() => {
    if (data && data.trainings && data.employees) {
      // Processa dados reais do Google Sheets
      const processedData = processGoogleSheetsData(data)
      setGanttData(processedData)
    } else {
      // Usa dados de exemplo
      setGanttData(sampleData)
    }
  }, [data])

  const processGoogleSheetsData = (sheetsData) => {
    const { employees, trainings } = sheetsData
    
    return employees.map(employee => {
      const employeeTrainings = trainings.filter(t => t.employee_id === employee.id)
      
      const tasks = employeeTrainings.map((training, index) => {
        // Converte a data string para objeto Date
        const startDate = parseDate(training.date)
        const endDate = new Date(startDate)
        endDate.setDate(endDate.getDate() + 3) // Duração padrão de 3 dias
        
        return {
          id: `${employee.id}_${index}`,
          text: training.training_type,
          start: startDate,
          end: endDate,
          type: 'task',
          progress: Math.random() * 0.8 + 0.2, // Progress aleatório entre 0.2 e 1.0
          color: getTrainingColor(training.training_type)
        }
      })

      return {
        id: employee.id,
        text: employee.name,
        type: 'project',
        open: true,
        data: tasks
      }
    })
  }

  const parseDate = (dateString) => {
    // Tenta diferentes formatos de data
    if (!dateString) return new Date()
    
    // Formato DD/MM/YYYY
    if (dateString.includes('/')) {
      const [day, month, year] = dateString.split('/')
      return new Date(year, month - 1, day)
    }
    
    // Formato DD-MM-YYYY
    if (dateString.includes('-')) {
      const [day, month, year] = dateString.split('-')
      return new Date(year, month - 1, day)
    }
    
    // Fallback para formato ISO
    return new Date(dateString)
  }

  const getTrainingColor = (trainingType) => {
    const colors = {
      'SIM': '#3b82f6',      // Azul
      'LC': '#10b981',       // Verde
      'CRM': '#f59e0b',      // Amarelo
      'RTI': '#8b5cf6',      // Roxo
      'PC': '#06b6d4',       // Ciano
      'Ditching': '#ef4444', // Vermelho
      'Delta': '#6b7280',    // Cinza
      'CAT': '#f97316'       // Laranja
    }
    
    // Procura por palavras-chave no tipo de treinamento
    for (const [key, color] of Object.entries(colors)) {
      if (trainingType.includes(key)) {
        return color
      }
    }
    
    return '#6b7280' // Cor padrão
  }

  const getStatusInfo = () => {
    if (!ganttData.length) return { total: 0, completed: 0, inProgress: 0, pending: 0 }
    
    let total = 0, completed = 0, inProgress = 0, pending = 0
    
    ganttData.forEach(employee => {
      if (employee.data) {
        employee.data.forEach(task => {
          total++
          if (task.progress >= 1.0) completed++
          else if (task.progress > 0) inProgress++
          else pending++
        })
      }
    })
    
    return { total, completed, inProgress, pending }
  }

  const statusInfo = getStatusInfo()

  if (!isConnected) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="w-5 h-5" />
            <span>Cronograma de Treinamentos</span>
          </CardTitle>
          <CardDescription>Conecte uma planilha do Google Sheets para visualizar os dados</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <Calendar className="w-12 h-12 mx-auto mb-4 text-slate-400" />
              <p className="text-slate-500 dark:text-slate-400 mb-2">Nenhuma planilha conectada</p>
              <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700">
                Conectar Planilha
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Estatísticas do Gantt */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Total</p>
                <p className="text-2xl font-bold">{statusInfo.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Concluídos</p>
                <p className="text-2xl font-bold text-green-600">{statusInfo.completed}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-yellow-500" />
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Em Progresso</p>
                <p className="text-2xl font-bold text-yellow-600">{statusInfo.inProgress}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <XCircle className="w-5 h-5 text-red-500" />
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Pendentes</p>
                <p className="text-2xl font-bold text-red-600">{statusInfo.pending}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Legenda de cores */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Legenda de Treinamentos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            {[
              { name: 'SIM Training', color: '#3b82f6' },
              { name: 'LC Training', color: '#10b981' },
              { name: 'CRM Training', color: '#f59e0b' },
              { name: 'RTI Training', color: '#8b5cf6' },
              { name: 'PC Training', color: '#06b6d4' },
              { name: 'Ditching Training', color: '#ef4444' }
            ].map((item, index) => (
              <Badge key={index} variant="outline" className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                />
                <span>{item.name}</span>
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Gráfico de Gantt */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="w-5 h-5" />
            <span>Cronograma de Treinamentos</span>
          </CardTitle>
          <CardDescription>
            Visualização interativa dos treinamentos por colaborador
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-96 border rounded-lg overflow-hidden">
            <Gantt
              data={ganttData}
              scales={scales}
              columns={[
                { name: 'text', label: 'Colaborador/Treinamento', width: 250 },
                { name: 'start', label: 'Início', width: 100 },
                { name: 'end', label: 'Fim', width: 100 }
              ]}
              cellHeight={40}
              scaleHeight={50}
              readonly={false}
            />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default GanttChart

