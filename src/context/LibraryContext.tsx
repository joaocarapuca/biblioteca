import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Book, Reservation, BorrowHistory } from '../types';
import { mockBooks, mockReservations, mockHistory } from '../data/mockData';

interface LibraryContextType {
  books: Book[];
  reservations: Reservation[];
  history: BorrowHistory[];
  searchBooks: (query: string) => Book[];
  reserveBook: (bookId: string) => void;
  cancelReservation: (reservationId: string) => void;
  getBookById: (bookId: string) => Book | undefined;
}

const LibraryContext = createContext<LibraryContextType | undefined>(undefined);

export const useLibrary = () => {
  const context = useContext(LibraryContext);
  if (context === undefined) {
    throw new Error('useLibrary must be used within a LibraryProvider');
  }
  return context;
};

interface LibraryProviderProps {
  children: ReactNode;
}

export const LibraryProvider: React.FC<LibraryProviderProps> = ({ children }) => {
  const [books] = useState<Book[]>(mockBooks);
  const [reservations, setReservations] = useState<Reservation[]>(mockReservations);
  const [history] = useState<BorrowHistory[]>(mockHistory);

  const searchBooks = (query: string): Book[] => {
    if (!query.trim()) return books;
    
    const lowercaseQuery = query.toLowerCase();
    return books.filter(book => 
      book.title.toLowerCase().includes(lowercaseQuery) ||
      book.author.toLowerCase().includes(lowercaseQuery) ||
      book.category.toLowerCase().includes(lowercaseQuery)
    );
  };

  const reserveBook = (bookId: string) => {
    const book = books.find(b => b.id === bookId);
    if (book && book.available) {
      const newReservation: Reservation = {
        id: Date.now().toString(),
        userId: '1',
        bookId,
        book,
        reservationDate: new Date().toISOString().split('T')[0],
        status: 'pending'
      };
      setReservations(prev => [...prev, newReservation]);
    }
  };

  const cancelReservation = (reservationId: string) => {
    setReservations(prev => prev.filter(r => r.id !== reservationId));
  };

  const getBookById = (bookId: string): Book | undefined => {
    return books.find(book => book.id === bookId);
  };

  return (
    <LibraryContext.Provider value={{
      books,
      reservations,
      history,
      searchBooks,
      reserveBook,
      cancelReservation,
      getBookById
    }}>
      {children}
    </LibraryContext.Provider>
  );
};