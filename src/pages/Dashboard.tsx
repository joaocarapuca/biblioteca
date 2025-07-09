import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Calendar, History, Settings, BookOpen, Clock, CheckCircle } from 'lucide-react';
import { useLibrary } from '../context/LibraryContext';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { reservations, history } = useLibrary();

  const activeReservations = reservations.filter(r => r.status !== 'cancelled');
  const recentHistory = history.slice(0, 3);

  const menuItems = [
    {
      title: 'Pesquisa',
      icon: Search,
      description: 'Procurar livros no catálogo',
      onClick: () => navigate('/search'),
      color: 'bg-blue-500'
    },
    {
      title: 'Reservas',
      icon: Calendar,
      description: 'Gerir as suas reservas',
      onClick: () => navigate('/reservations'),
      color: 'bg-green-500',
      badge: activeReservations.length
    },
    {
      title: 'Histórico',
      icon: History,
      description: 'Ver histórico de empréstimos',
      onClick: () => navigate('/history'),
      color: 'bg-purple-500'
    },
    {
      title: 'Definições',
      icon: Settings,
      description: 'Configurações da conta',
      onClick: () => navigate('/settings'),
      color: 'bg-gray-500'
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Bem-vindo ao sistema da biblioteca</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={item.onClick}
            className="relative bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200 text-left group"
          >
            <div className="flex items-start space-x-4">
              <div className={`${item.color} p-3 rounded-lg text-white group-hover:scale-110 transition-transform`}>
                <item.icon className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
              {item.badge && item.badge > 0 && (
                <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                  {item.badge}
                </div>
              )}
            </div>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Reservas Ativas */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Calendar className="w-5 h-5 text-green-600" />
            <h2 className="text-lg font-semibold text-gray-900">Reservas Ativas</h2>
          </div>
          
          {activeReservations.length === 0 ? (
            <p className="text-gray-500 text-center py-4">Nenhuma reserva ativa</p>
          ) : (
            <div className="space-y-3">
              {activeReservations.map((reservation) => (
                <div key={reservation.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <BookOpen className="w-4 h-4 text-gray-400" />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{reservation.book.title}</p>
                    <p className="text-sm text-gray-600">{reservation.book.author}</p>
                  </div>
                  <div className="text-right">
                    <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      reservation.status === 'confirmed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {reservation.status === 'confirmed' ? (
                        <>
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Confirmada
                        </>
                      ) : (
                        <>
                          <Clock className="w-3 h-3 mr-1" />
                          Pendente
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Histórico Recente */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-2 mb-4">
            <History className="w-5 h-5 text-purple-600" />
            <h2 className="text-lg font-semibold text-gray-900">Histórico Recente</h2>
          </div>
          
          {recentHistory.length === 0 ? (
            <p className="text-gray-500 text-center py-4">Nenhum histórico disponível</p>
          ) : (
            <div className="space-y-3">
              {recentHistory.map((item) => (
                <div key={item.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <BookOpen className="w-4 h-4 text-gray-400" />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{item.book.title}</p>
                    <p className="text-sm text-gray-600">
                      {item.status === 'returned' ? 'Devolvido' : 'Emprestado'} em {
                        new Date(item.status === 'returned' ? item.returnDate! : item.borrowDate)
                          .toLocaleDateString('pt-PT')
                      }
                    </p>
                  </div>
                  <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    item.status === 'returned' 
                      ? 'bg-green-100 text-green-800' 
                      : item.status === 'overdue'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {item.status === 'returned' ? 'Devolvido' : 
                     item.status === 'overdue' ? 'Atrasado' : 'Emprestado'}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;