export interface User {
  id: string;
  username: string;
  name: string;
  email: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  category: string;
  description: string;
  coverUrl: string;
  available: boolean;
  totalCopies: number;
  availableCopies: number;
}

export interface Reservation {
  id: string;
  userId: string;
  bookId: string;
  book: Book;
  reservationDate: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  dueDate?: string;
}

export interface BorrowHistory {
  id: string;
  userId: string;
  bookId: string;
  book: Book;
  borrowDate: string;
  returnDate?: string;
  dueDate: string;
  status: 'borrowed' | 'returned' | 'overdue';
}