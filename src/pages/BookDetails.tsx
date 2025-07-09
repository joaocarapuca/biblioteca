import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, User, Hash, Tag, Calendar, Check } from 'lucide-react';
import { useLibrary } from '../context/LibraryContext';

const BookDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getBookById, reserveBook, reservations } = useLibrary();
  const [showReservationSuccess, setShowReservationSuccess] = useState(false);

  const book = getBookById(id!);
  const isAlreadyReserved = reservations.some(r => r.bookId === id && r.status !== 'cancelled');

  if (!book) {
    return (
      <div className="text-center py-12">
        <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Livro não encontrado
        </h3>
        <button
          onClick={() => navigate('/search')}
          className="text-indigo-600 hover:text-indigo-700"
        >
          Voltar à pesquisa
        </button>
      </div>
    );
  }

  const handleReservation = () => {
    if (book.available && !isAlreadyReserved) {
      reserveBook(book.id);
      setShowReservationSuccess(true);
      setTimeout(() => setShowReservationSuccess(false), 3000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h1 className="text-2xl font-bold text-gray-900">Detalhes do Livro</h1>
      </div>

      {showReservationSuccess && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Reserva Realizada</h2>
          <p className="text-gray-600">
            Sua reserva foi registrada com sucesso. Você será notificado quando o livro estiver disponível para retirada.
          </p>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
            {/* Capa do Livro */}
            <div className="flex-shrink-0">
              <div className="w-48 h-64 bg-gray-200 rounded-lg flex items-center justify-center mx-auto md:mx-0">
                <BookOpen className="w-16 h-16 text-gray-400" />
              </div>
            </div>

            {/* Informações do Livro */}
            <div className="flex-1 space-y-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {book.title}
                </h1>
                <div className="flex items-center space-x-2 text-gray-600 mb-4">
                  <User className="w-4 h-4" />
                  <span className="text-lg">{book.author}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Hash className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">ISBN: {book.isbn}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Tag className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">Categoria: {book.category}</span>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  book.available 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {book.available ? 'Disponível' : 'Indisponível'}
                </span>
                <span className="text-sm text-gray-600">
                  {book.availableCopies} de {book.totalCopies} exemplares disponíveis
                </span>
              </div>

              {book.available && !isAlreadyReserved && (
                <button
                  onClick={handleReservation}
                  className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
                >
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Reservar Livro
                </button>
              )}

              {isAlreadyReserved && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <p className="text-yellow-800 text-sm font-medium">
                    Você já possui uma reserva ativa para este livro.
                  </p>
                </div>
              )}

              {!book.available && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-red-800 text-sm font-medium">
                    Este livro não está disponível no momento.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Informações adicionais
          </h3>
          <p className="text-gray-700 leading-relaxed">
            {book.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;