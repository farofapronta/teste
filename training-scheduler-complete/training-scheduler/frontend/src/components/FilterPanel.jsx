import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Filter, X, Calendar, Users, Tag, Search } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Checkbox } from '@/components/ui/checkbox.jsx'

const FilterPanel = ({ onFiltersChange, isOpen, onClose }) => {
  const [filters, setFilters] = useState({
    searchTerm: '',
    dateRange: 'all',
    trainingTypes: [],
    status: 'all',
    employees: [],
    sortBy: 'date',
    sortOrder: 'asc'
  })

  const trainingTypes = [
    'SIM Training',
    'LC Training', 
    'CRM Training',
    'RTI Training',
    'PC Training',
    'Ditching Training',
    'Delta Training',
    'CAT Training'
  ]

  const statusOptions = [
    { value: 'all', label: 'Todos' },
    { value: 'completed', label: 'Concluídos' },
    { value: 'in-progress', label: 'Em Progresso' },
    { value: 'pending', label: 'Pendentes' },
    { value: 'overdue', label: 'Vencidos' }
  ]

  const dateRangeOptions = [
    { value: 'all', label: 'Todos os períodos' },
    { value: 'today', label: 'Hoje' },
    { value: 'week', label: 'Esta semana' },
    { value: 'month', label: 'Este mês' },
    { value: 'quarter', label: 'Este trimestre' },
    { value: 'year', label: 'Este ano' },
    { value: 'custom', label: 'Período personalizado' }
  ]

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFiltersChange?.(newFilters)
  }

  const handleTrainingTypeToggle = (type) => {
    const newTypes = filters.trainingTypes.includes(type)
      ? filters.trainingTypes.filter(t => t !== type)
      : [...filters.trainingTypes, type]
    
    handleFilterChange('trainingTypes', newTypes)
  }

  const clearAllFilters = () => {
    const clearedFilters = {
      searchTerm: '',
      dateRange: 'all',
      trainingTypes: [],
      status: 'all',
      employees: [],
      sortBy: 'date',
      sortOrder: 'asc'
    }
    setFilters(clearedFilters)
    onFiltersChange?.(clearedFilters)
  }

  const getActiveFiltersCount = () => {
    let count = 0
    if (filters.searchTerm) count++
    if (filters.dateRange !== 'all') count++
    if (filters.trainingTypes.length > 0) count++
    if (filters.status !== 'all') count++
    if (filters.employees.length > 0) count++
    return count
  }

  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 300 }}
      className="fixed right-0 top-0 h-full w-80 bg-white dark:bg-slate-900 shadow-2xl z-50 overflow-y-auto"
    >
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5" />
            <h2 className="text-lg font-semibold">Filtros Avançados</h2>
            {getActiveFiltersCount() > 0 && (
              <Badge variant="secondary">{getActiveFiltersCount()}</Badge>
            )}
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Busca */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center space-x-2">
              <Search className="w-4 h-4" />
              <span>Busca</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              placeholder="Buscar colaboradores ou treinamentos..."
              value={filters.searchTerm}
              onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
            />
          </CardContent>
        </Card>

        {/* Período */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>Período</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={filters.dateRange} onValueChange={(value) => handleFilterChange('dateRange', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {dateRangeOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Status */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Status</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={filters.status} onValueChange={(value) => handleFilterChange('status', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Tipos de Treinamento */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center space-x-2">
              <Tag className="w-4 h-4" />
              <span>Tipos de Treinamento</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {trainingTypes.map(type => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox
                    id={type}
                    checked={filters.trainingTypes.includes(type)}
                    onCheckedChange={() => handleTrainingTypeToggle(type)}
                  />
                  <Label htmlFor={type} className="text-sm cursor-pointer">
                    {type}
                  </Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Ordenação */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Ordenação</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <Label className="text-xs text-slate-500">Ordenar por</Label>
              <Select value={filters.sortBy} onValueChange={(value) => handleFilterChange('sortBy', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Data</SelectItem>
                  <SelectItem value="name">Nome</SelectItem>
                  <SelectItem value="status">Status</SelectItem>
                  <SelectItem value="type">Tipo de Treinamento</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs text-slate-500">Ordem</Label>
              <Select value={filters.sortOrder} onValueChange={(value) => handleFilterChange('sortOrder', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asc">Crescente</SelectItem>
                  <SelectItem value="desc">Decrescente</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Ações */}
        <div className="space-y-3">
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={clearAllFilters}
            disabled={getActiveFiltersCount() === 0}
          >
            Limpar Filtros
          </Button>
        </div>

        {/* Filtros Ativos */}
        {getActiveFiltersCount() > 0 && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Filtros Ativos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {filters.searchTerm && (
                  <Badge variant="secondary">
                    Busca: {filters.searchTerm}
                  </Badge>
                )}
                {filters.dateRange !== 'all' && (
                  <Badge variant="secondary">
                    Período: {dateRangeOptions.find(o => o.value === filters.dateRange)?.label}
                  </Badge>
                )}
                {filters.status !== 'all' && (
                  <Badge variant="secondary">
                    Status: {statusOptions.find(o => o.value === filters.status)?.label}
                  </Badge>
                )}
                {filters.trainingTypes.map(type => (
                  <Badge key={type} variant="secondary">
                    {type}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </motion.div>
  )
}

export default FilterPanel

