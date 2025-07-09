import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, BookOpen, Clock, CheckCircle, X } from 'lucide-react';
import { useLibrary } from '../context/LibraryContext';

const Reservations: React.FC = () => {
  const navigate = useNavigate();
  const { reservations, cancelReservation } = useLibrary();

  const handleCancelReservation = (reservationId: string) => {
    if (window.confirm('Tem certeza que deseja cancelar esta reserva?')) {
      cancelReservation(reservationId);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      default:
        return <Calendar className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'Confirmada';
      case 'pending':
        return 'Pendente';
      case 'completed':
        return 'Concluída';
      case 'cancelled':
        return 'Cancelada';
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const activeReservations = reservations.filter(r => r.status !== 'cancelled' && r.status !== 'completed');

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate('/dashboard')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h1 className="text-2xl font-bold text-gray-900">Reservas</h1>
      </div>

      {activeReservations.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Nenhuma reserva ativa
          </h3>
          <p className="text-gray-600 mb-6">
            Você não possui reservas no momento. Que tal procurar um livro interessante?
          </p>
          <button
            onClick={() => navigate('/search')}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
          >
            Pesquisar Livros
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {activeReservations.map((reservation) => (
            <div key={reservation.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-20 bg-gray-200 rounded flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-6 h-6 text-gray-400" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {reservation.book.title}
                      </h3>
                      <p className="text-gray-600 mb-2">{reservation.book.author}</p>
                      <p className="text-sm text-gray-500 mb-3">{reservation.book.category}</p>
                    </div>
                    
                    <button
                      onClick={() => handleCancelReservation(reservation.id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Cancelar reserva"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(reservation.status)}`}>
                        {getStatusIcon(reservation.status)}
                        <span className="ml-1">{getStatusText(reservation.status)}</span>
                      </div>
                      
                      <div className="text-sm text-gray-600">
                        <span>Reservado em: </span>
                        <span className="font-medium">
                          {new Date(reservation.reservationDate).toLocaleDateString('pt-PT')}
                        </span>
                      </div>
                    </div>
                    
                    {reservation.dueDate && (
                      <div className="text-sm text-gray-600">
                        <span>Prazo: </span>
                        <span className="font-medium">
                          {new Date(reservation.dueDate).toLocaleDateString('pt-PT')}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {reservations.filter(r => r.status === 'cancelled' || r.status === 'completed').length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Histórico de Reservas</h2>
          {reservations
            .filter(r => r.status === 'cancelled' || r.status === 'completed')
            .map((reservation) => (
              <div key={reservation.id} className="bg-gray-50 rounded-xl border border-gray-200 p-6 opacity-75">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-20 bg-gray-200 rounded flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-6 h-6 text-gray-400" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {reservation.book.title}
                        </h3>
                        <p className="text-gray-600 mb-2">{reservation.book.author}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(reservation.status)}`}>
                        {getStatusIcon(reservation.status)}
                        <span className="ml-1">{getStatusText(reservation.status)}</span>
                      </div>
                      
                      <div className="text-sm text-gray-600">
                        <span>Reservado em: </span>
                        <span className="font-medium">
                          {new Date(reservation.reservationDate).toLocaleDateString('pt-PT')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Reservations;