import { Book, User, Reservation, BorrowHistory } from '../types';

export const mockUser: User = {
  id: '1',
  username: 'joao.silva',
  name: 'João Silva',
  email: 'joao.silva@email.com'
};

export const mockBooks: Book[] = [
  {
    id: '1',
    title: 'O Alquimista',
    author: 'Paulo Coelho',
    isbn: '978-85-325-1158-9',
    category: 'Ficção',
    description: 'A história de Santiago, um jovem pastor andaluz que viaja desde a sua terra natal, em Espanha, até ao deserto egípcio, em busca de um tesouro.',
    coverUrl: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=300',
    available: true,
    totalCopies: 3,
    availableCopies: 2
  },
  {
    id: '2',
    title: 'Dom Casmurro',
    author: 'Machado de Assis',
    isbn: '978-85-359-0277-5',
    category: 'Literatura Clássica',
    description: 'Romance narrado em primeira pessoa por Bento Santiago, que relembra sua juventude e seu amor por Capitu.',
    coverUrl: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=300',
    available: true,
    totalCopies: 2,
    availableCopies: 1
  },
  {
    id: '3',
    title: 'O Cortiço',
    author: 'Aluísio Azevedo',
    isbn: '978-85-359-0123-5',
    category: 'Literatura Clássica',
    description: 'Romance naturalista que retrata a vida em um cortiço no Rio de Janeiro do século XIX.',
    coverUrl: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=300',
    available: false,
    totalCopies: 1,
    availableCopies: 0
  },
  {
    id: '4',
    title: 'Capitães da Areia',
    author: 'Jorge Amado',
    isbn: '978-85-359-0456-4',
    category: 'Literatura Brasileira',
    description: 'Romance que conta a história de um grupo de meninos de rua em Salvador.',
    coverUrl: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=300',
    available: true,
    totalCopies: 2,
    availableCopies: 2
  },
  {
    id: '5',
    title: 'A Moreninha',
    author: 'Joaquim Manuel de Macedo',
    isbn: '978-85-359-0789-3',
    category: 'Romance',
    description: 'Primeiro romance urbano brasileiro, conta a história de amor entre Augusto e Carolina.',
    coverUrl: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=300',
    available: true,
    totalCopies: 1,
    availableCopies: 1
  }
];

export const mockReservations: Reservation[] = [
  {
    id: '1',
    userId: '1',
    bookId: '1',
    book: mockBooks[0],
    reservationDate: '2025-01-05',
    status: 'confirmed',
    dueDate: '2025-01-19'
  },
  {
    id: '2',
    userId: '1',
    bookId: '4',
    book: mockBooks[3],
    reservationDate: '2025-01-07',
    status: 'pending'
  }
];

export const mockHistory: BorrowHistory[] = [
  {
    id: '1',
    userId: '1',
    bookId: '2',
    book: mockBooks[1],
    borrowDate: '2024-12-15',
    returnDate: '2024-12-29',
    dueDate: '2024-12-29',
    status: 'returned'
  },
  {
    id: '2',
    userId: '1',
    bookId: '5',
    book: mockBooks[4],
    borrowDate: '2024-11-20',
    returnDate: '2024-12-05',
    dueDate: '2024-12-04',
    status: 'returned'
  },
  {
    id: '3',
    userId: '1',
    bookId: '1',
    book: mockBooks[0],
    borrowDate: '2025-01-01',
    dueDate: '2025-01-15',
    status: 'borrowed'
  }
];