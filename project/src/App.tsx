import React, { useState } from 'react';
import { Calculator, Notebook as Robot, User, DollarSign, TrendingUp, Clock } from 'lucide-react';

interface MetricsType {
  contactsPerDay: number;
  responseTime: number;
  conversionRate: number;
  ticketValue: number;
}

function App() {
  const [metrics, setMetrics] = useState<MetricsType>({
    contactsPerDay: 100,
    responseTime: 180, // 3 hours in minutes
    conversionRate: 2,
    ticketValue: 1200
  });

  const calculateMonthlyMetrics = (isAI: boolean) => {
    const monthlyContacts = metrics.contactsPerDay * 30;
    const lostLeadsRate = isAI ? 0.05 : 0.30; // 5% loss for AI, 30% for human
    const respondedContacts = monthlyContacts * (1 - lostLeadsRate);
    const conversions = (respondedContacts * (isAI ? metrics.conversionRate * 1.5 : metrics.conversionRate)) / 100;
    const revenue = conversions * metrics.ticketValue;
    
    return {
      respondedContacts: Math.round(respondedContacts),
      conversions: Math.round(conversions),
      revenue: revenue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
      lostRevenue: (monthlyContacts * lostLeadsRate * (metrics.conversionRate / 100) * metrics.ticketValue)
        .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    };
  };

  const humanMetrics = calculateMonthlyMetrics(false);
  const aiMetrics = calculateMonthlyMetrics(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 mb-4 flex items-center justify-center">
            <Calculator className="inline-block mr-2 mb-1 text-cyan-400" />
            Calculadora de Eficiência Operacional
          </h1>
          <p className="text-gray-400">Compare o desempenho entre atendimento humano e IA</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-10">
          {/* Métricas de Entrada */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-lg shadow-[0_0_15px_rgba(6,182,212,0.15)] border border-gray-700">
            <h2 className="text-2xl font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Configurar Métricas</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Contatos por Dia
                </label>
                <input
                  type="number"
                  value={metrics.contactsPerDay}
                  onChange={(e) => setMetrics({...metrics, contactsPerDay: Number(e.target.value)})}
                  className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-gray-200 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Tempo Médio de Resposta (minutos)
                </label>
                <input
                  type="number"
                  value={metrics.responseTime}
                  onChange={(e) => setMetrics({...metrics, responseTime: Number(e.target.value)})}
                  className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-gray-200 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Taxa de Conversão (%)
                </label>
                <input
                  type="number"
                  value={metrics.conversionRate}
                  onChange={(e) => setMetrics({...metrics, conversionRate: Number(e.target.value)})}
                  className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-gray-200 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Ticket Médio (R$)
                </label>
                <input
                  type="number"
                  value={metrics.ticketValue}
                  onChange={(e) => setMetrics({...metrics, ticketValue: Number(e.target.value)})}
                  className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-gray-200 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Comparativo */}
          <div className="grid grid-cols-2 gap-4">
            {/* Atendimento Humano */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-lg shadow-lg border border-gray-700">
              <div className="flex items-center justify-center mb-4">
                <User className="w-12 h-12 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-center mb-4 text-gray-200">Atendimento Humano</h3>
              <div className="space-y-3">
                <div className="text-sm">
                  <p className="text-gray-400">Atendimentos/mês:</p>
                  <p className="font-semibold text-gray-200">{humanMetrics.respondedContacts}</p>
                </div>
                <div className="text-sm">
                  <p className="text-gray-400">Conversões:</p>
                  <p className="font-semibold text-gray-200">{humanMetrics.conversions}</p>
                </div>
                <div className="text-sm">
                  <p className="text-gray-400">Faturamento:</p>
                  <p className="font-semibold text-emerald-400 text-lg">{humanMetrics.revenue}</p>
                </div>
                <div className="text-sm">
                  <p className="text-gray-400">Perda Mensal:</p>
                  <p className="font-semibold text-red-400">{humanMetrics.lostRevenue}</p>
                </div>
              </div>
            </div>

            {/* Atendimento IA */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-lg shadow-[0_0_20px_rgba(6,182,212,0.2)] border border-cyan-900">
              <div className="flex items-center justify-center mb-4">
                <Robot className="w-12 h-12 text-cyan-400" />
              </div>
              <h3 className="text-xl font-semibold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Atendimento IA</h3>
              <div className="space-y-3">
                <div className="text-sm">
                  <p className="text-gray-400">Atendimentos/mês:</p>
                  <p className="font-semibold text-gray-200">{aiMetrics.respondedContacts}</p>
                </div>
                <div className="text-sm">
                  <p className="text-gray-400">Conversões:</p>
                  <p className="font-semibold text-gray-200">{aiMetrics.conversions}</p>
                </div>
                <div className="text-sm">
                  <p className="text-gray-400">Faturamento:</p>
                  <p className="font-semibold text-emerald-400 text-lg">{aiMetrics.revenue}</p>
                </div>
                <div className="text-sm">
                  <p className="text-gray-400">Perda Mensal:</p>
                  <p className="font-semibold text-red-400">{aiMetrics.lostRevenue}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Vantagens da IA */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-lg shadow-[0_0_15px_rgba(6,182,212,0.15)] border border-gray-700">
          <h2 className="text-2xl font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Vantagens do Atendimento com IA</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-start space-x-3">
              <Clock className="w-6 h-6 text-cyan-400 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-200">Resposta Imediata</h3>
                <p className="text-sm text-gray-400">Atendimento em menos de 5 minutos</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <TrendingUp className="w-6 h-6 text-cyan-400 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-200">Maior Conversão</h3>
                <p className="text-sm text-gray-400">Aumento natural na taxa de agendamentos</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <DollarSign className="w-6 h-6 text-cyan-400 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-200">Redução de Perdas</h3>
                <p className="text-sm text-gray-400">Minimização de oportunidades perdidas</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;