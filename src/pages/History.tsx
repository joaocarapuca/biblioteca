import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, History as HistoryIcon, BookOpen, Calendar, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { useLibrary } from '../context/LibraryContext';

const History: React.FC = () => {
  const navigate = useNavigate();
  const { history } = useLibrary();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'returned':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'borrowed':
        return <Clock className="w-4 h-4 text-blue-600" />;
      case 'overdue':
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      default:
        return <BookOpen className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'returned':
        return 'Devolvido';
      case 'borrowed':
        return 'Emprestado';
      case 'overdue':
        return 'Atrasado';
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'returned':
        return 'bg-green-100 text-green-800';
      case 'borrowed':
        return 'bg-blue-100 text-blue-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-PT');
  };

  const isOverdue = (dueDate: string, returnDate?: string) => {
    if (returnDate) return false;
    return new Date(dueDate) < new Date();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate('/dashboard')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h1 className="text-2xl font-bold text-gray-900">Histórico</h1>
      </div>

      {history.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <HistoryIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Nenhum histórico disponível
          </h3>
          <p className="text-gray-600 mb-6">
            Você ainda não possui histórico de empréstimos.
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
          {history.map((item) => {
            const actualStatus = isOverdue(item.dueDate, item.returnDate) ? 'overdue' : item.status;
            
            return (
              <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-20 bg-gray-200 rounded flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-6 h-6 text-gray-400" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {item.book.title}
                        </h3>
                        <p className="text-gray-600 mb-1">{item.book.author}</p>
                        <p className="text-sm text-gray-500">{item.book.category}</p>
                      </div>
                      
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(actualStatus)}`}>
                        {getStatusIcon(actualStatus)}
                        <span className="ml-1">{getStatusText(actualStatus)}</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <div>
                          <span className="text-gray-600">Emprestado: </span>
                          <span className="font-medium text-gray-900">
                            {formatDate(item.borrowDate)}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <div>
                          <span className="text-gray-600">Prazo: </span>
                          <span className={`font-medium ${
                            actualStatus === 'overdue' ? 'text-red-600' : 'text-gray-900'
                          }`}>
                            {formatDate(item.dueDate)}
                          </span>
                        </div>
                      </div>
                      
                      {item.returnDate && (
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <div>
                            <span className="text-gray-600">Devolvido: </span>
                            <span className="font-medium text-gray-900">
                              {formatDate(item.returnDate)}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {actualStatus === 'overdue' && (
                      <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <AlertCircle className="w-4 h-4 text-red-600" />
                          <p className="text-red-800 text-sm font-medium">
                            Este livro está em atraso. Por favor, devolva o mais rápido possível.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default History;