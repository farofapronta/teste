import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Settings, Database, Palette, Bell, Shield, Download, Upload, Save } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Switch } from '@/components/ui/switch.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Badge } from '@/components/ui/badge.jsx'

const SettingsPanel = () => {
  const [settings, setSettings] = useState({
    spreadsheetId: '',
    sheetName: 'Sheet1',
    refreshInterval: '30',
    notifications: true,
    darkMode: false,
    language: 'pt-BR',
    dateFormat: 'DD/MM/YYYY',
    timeZone: 'America/Sao_Paulo'
  })

  const [credentials, setCredentials] = useState('')
  const [isConnected, setIsConnected] = useState(false)

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const handleSaveSettings = () => {
    // Aqui seria feita a chamada para salvar as configurações
    console.log('Salvando configurações:', settings)
  }

  const handleConnectGoogleSheets = () => {
    // Aqui seria feita a autenticação real com Google Sheets
    setIsConnected(true)
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <div className="space-y-6">
      {/* Configurações de Conexão */}
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Database className="w-5 h-5" />
              <span>Conexão com Google Sheets</span>
            </CardTitle>
            <CardDescription>
              Configure a integração com sua planilha do Google Sheets
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="spreadsheet-id">ID da Planilha</Label>
                <Input
                  id="spreadsheet-id"
                  placeholder="1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms"
                  value={settings.spreadsheetId}
                  onChange={(e) => handleSettingChange('spreadsheetId', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sheet-name">Nome da Aba</Label>
                <Input
                  id="sheet-name"
                  placeholder="Sheet1"
                  value={settings.sheetName}
                  onChange={(e) => handleSettingChange('sheetName', e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="credentials">Credenciais do Google (JSON)</Label>
              <Textarea
                id="credentials"
                placeholder="Cole aqui o JSON das credenciais da conta de serviço..."
                value={credentials}
                onChange={(e) => setCredentials(e.target.value)}
                rows={4}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'} animate-pulse`} />
                <span className="text-sm text-slate-600 dark:text-slate-300">
                  {isConnected ? 'Conectado' : 'Desconectado'}
                </span>
              </div>
              <Button onClick={handleConnectGoogleSheets} disabled={isConnected}>
                {isConnected ? 'Conectado' : 'Conectar'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Configurações de Aparência */}
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Palette className="w-5 h-5" />
              <span>Aparência e Personalização</span>
            </CardTitle>
            <CardDescription>
              Personalize a aparência do aplicativo
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="language">Idioma</Label>
                <Select value={settings.language} onValueChange={(value) => handleSettingChange('language', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                    <SelectItem value="en-US">English (US)</SelectItem>
                    <SelectItem value="es-ES">Español</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="date-format">Formato de Data</Label>
                <Select value={settings.dateFormat} onValueChange={(value) => handleSettingChange('dateFormat', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                    <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                    <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="timezone">Fuso Horário</Label>
              <Select value={settings.timeZone} onValueChange={(value) => handleSettingChange('timeZone', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="America/Sao_Paulo">América/São Paulo (BRT)</SelectItem>
                  <SelectItem value="America/New_York">América/Nova York (EST)</SelectItem>
                  <SelectItem value="Europe/London">Europa/Londres (GMT)</SelectItem>
                  <SelectItem value="Asia/Tokyo">Ásia/Tóquio (JST)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Modo Escuro</Label>
                <p className="text-sm text-slate-500">Ativar tema escuro automaticamente</p>
              </div>
              <Switch
                checked={settings.darkMode}
                onCheckedChange={(checked) => handleSettingChange('darkMode', checked)}
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Configurações de Notificações */}
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="w-5 h-5" />
              <span>Notificações e Alertas</span>
            </CardTitle>
            <CardDescription>
              Configure alertas e notificações do sistema
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Notificações Ativas</Label>
                <p className="text-sm text-slate-500">Receber notificações sobre treinamentos</p>
              </div>
              <Switch
                checked={settings.notifications}
                onCheckedChange={(checked) => handleSettingChange('notifications', checked)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="refresh-interval">Intervalo de Atualização (minutos)</Label>
              <Select value={settings.refreshInterval} onValueChange={(value) => handleSettingChange('refreshInterval', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 minutos</SelectItem>
                  <SelectItem value="15">15 minutos</SelectItem>
                  <SelectItem value="30">30 minutos</SelectItem>
                  <SelectItem value="60">1 hora</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Tipos de Alerta</Label>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">Treinamentos Vencidos</Badge>
                <Badge variant="outline">Vencendo em 30 dias</Badge>
                <Badge variant="outline">Novos Treinamentos</Badge>
                <Badge variant="outline">Atualizações da Planilha</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Configurações de Segurança */}
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="w-5 h-5" />
              <span>Segurança e Backup</span>
            </CardTitle>
            <CardDescription>
              Configurações de segurança e backup dos dados
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button variant="outline" className="flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Exportar Configurações</span>
              </Button>
              <Button variant="outline" className="flex items-center space-x-2">
                <Upload className="w-4 h-4" />
                <span>Importar Configurações</span>
              </Button>
            </div>

            <div className="space-y-2">
              <Label>Backup Automático</Label>
              <p className="text-sm text-slate-500">
                As configurações são salvas automaticamente no navegador
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Botão de Salvar */}
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.5 }}
        className="flex justify-end"
      >
        <Button onClick={handleSaveSettings} className="flex items-center space-x-2">
          <Save className="w-4 h-4" />
          <span>Salvar Configurações</span>
        </Button>
      </motion.div>
    </div>
  )
}

export default SettingsPanel

