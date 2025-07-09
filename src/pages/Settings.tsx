import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Mail, Phone, MapPin, Bell, Shield, HelpCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const settingsItems = [
    {
      icon: User,
      title: 'Informações Pessoais',
      description: 'Gerir dados da conta',
      onClick: () => console.log('Informações pessoais')
    },
    {
      icon: Bell,
      title: 'Notificações',
      description: 'Configurar alertas e lembretes',
      onClick: () => console.log('Notificações')
    },
    {
      icon: Shield,
      title: 'Privacidade e Segurança',
      description: 'Alterar senha e configurações de privacidade',
      onClick: () => console.log('Privacidade')
    },
    {
      icon: HelpCircle,
      title: 'Ajuda e Suporte',
      description: 'FAQ e contacto com suporte',
      onClick: () => console.log('Ajuda')
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate('/dashboard')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h1 className="text-2xl font-bold text-gray-900">Definições</h1>
      </div>

      {/* Perfil do Utilizador */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-indigo-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{user?.name}</h2>
            <p className="text-gray-600">@{user?.username}</p>
          </div>
        </div>
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-3">
            <Mail className="w-4 h-4 text-gray-400" />
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p className="font-medium text-gray-900">{user?.email}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Phone className="w-4 h-4 text-gray-400" />
            <div>
              <p className="text-sm text-gray-600">Telefone</p>
              <p className="font-medium text-gray-900">+351 912 345 678</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <MapPin className="w-4 h-4 text-gray-400" />
            <div>
              <p className="text-sm text-gray-600">Localização</p>
              <p className="font-medium text-gray-900">Lisboa, Portugal</p>
            </div>
          </div>
        </div>
      </div>

      {/* Opções de Configuração */}
      <div className="space-y-3">
        {settingsItems.map((item, index) => (
          <button
            key={index}
            onClick={item.onClick}
            className="w-full bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow text-left"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gray-100 rounded-lg">
                <item.icon className="w-5 h-5 text-gray-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
              <ArrowLeft className="w-5 h-5 text-gray-400 transform rotate-180" />
            </div>
          </button>
        ))}
      </div>

      {/* Informações da Aplicação */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Sobre a Aplicação
        </h3>
        <div className="space-y-2 text-sm text-gray-600">
          <p><strong>Versão:</strong> 1.0.0</p>
          <p><strong>Última atualização:</strong> Janeiro 2025</p>
          <p><strong>Desenvolvido por:</strong> Sistema de Biblioteca</p>
        </div>
      </div>
    </div>
  );
};

export default Settings;