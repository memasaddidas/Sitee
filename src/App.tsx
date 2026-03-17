import React, { useState, useEffect } from 'react';
import { Search, Book, Calendar, User, MapPin, Phone, Mail, Facebook, Instagram, Twitter, ArrowRight, ChevronRight, Clock } from 'lucide-react';
import { motion } from 'motion/react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';

// --- Types ---
interface User {
  name: string;
  email: string;
}

interface BookData {
  id: number;
  title: string;
  author: string;
  cover: string;
  category: string;
  available: boolean;
  description?: string;
}

interface EventData {
  id: number;
  title: string;
  date: string;
  time: string;
  description: string;
  image: string;
}

// --- Mock Data ---
const BOOKS: BookData[] = [
  { id: 1, title: "Преступление и наказание", author: "Фёдор Достоевский", cover: "https://picsum.photos/seed/dostoevsky/300/450", category: "Классика", available: true, description: "Глубокое философское исследование человеческой души, вины и искупления." },
  { id: 2, title: "Три мушкетера", author: "Александр Дюма", cover: "https://picsum.photos/seed/dumas/300/450", category: "Роман", available: true, description: "Классика приключенческого романа о дружбе и чести." },
  { id: 3, title: "Братья Карамазовы", author: "Фёдор Достоевский", cover: "https://picsum.photos/seed/karamazov/300/450", category: "Классика", available: true, description: "Последний роман писателя, ставший вершиной его творчества." },
  { id: 4, title: "Идиот", author: "Фёдор Достоевский", cover: "https://picsum.photos/seed/idiot/300/450", category: "Классика", available: true, description: "История о 'положительно прекрасном человеке' в жестоком мире." },
  { id: 5, title: "1984", author: "Джордж Оруэлл", cover: "https://picsum.photos/seed/1984/300/450", category: "Антиутопия", available: true },
  { id: 6, title: "Мастер и Маргарита", author: "Михаил Булгаков", cover: "https://picsum.photos/seed/bulgakov/300/450", category: "Классика", available: true },
  { id: 7, title: "Sapiens", author: "Юваль Ной Харари", cover: "https://picsum.photos/seed/sapiens/300/450", category: "Научпоп", available: true },
  { id: 8, title: "451 градус по Фаренгейту", author: "Рэй Брэдбери", cover: "https://picsum.photos/seed/fahrenheit/300/450", category: "Антиутопия", available: true },
];

const EVENTS: EventData[] = [
  { id: 1, title: "Литературный вечер: Поэзия Серебряного века", date: "15 Марта", time: "18:00", description: "Обсуждаем творчество Ахматовой и Блока в уютной атмосфере.", image: "https://picsum.photos/seed/poetry/600/400" },
  { id: 2, title: "Мастер-класс по каллиграфии", date: "20 Марта", time: "14:00", description: "Осваиваем искусство красивого письма пером.", image: "https://picsum.photos/seed/calligraphy/600/400" },
];

// --- Shared Components ---

const AuthModal: React.FC<{ isOpen: boolean; onClose: () => void; onLogin: (user: User) => void }> = ({ isOpen, onClose, onLogin }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({ name: isRegister ? name : 'Константин', email });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          {isRegister ? 'Регистрация' : 'Вход в систему'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Имя</label>
              <input 
                type="text" 
                required 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 rounded-xl border border-gray-200 outline-none focus:border-brand-blue"
                placeholder="Иван Иванов"
              />
            </div>
          )}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Email</label>
            <input 
              type="email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-gray-200 outline-none focus:border-brand-blue"
              placeholder="example@mail.ru"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Пароль</label>
            <input 
              type="password" 
              required 
              className="w-full px-4 py-2 rounded-xl border border-gray-200 outline-none focus:border-brand-blue"
              placeholder="••••••••"
            />
          </div>
          <button type="submit" className="w-full py-3 bg-brand-blue text-white rounded-xl font-bold hover:bg-blue-800 transition-colors">
            {isRegister ? 'Создать аккаунт' : 'Войти'}
          </button>
        </form>
        <div className="mt-6 text-center">
          <button 
            onClick={() => setIsRegister(!isRegister)}
            className="text-xs text-brand-blue font-bold hover:underline"
          >
            {isRegister ? 'Уже есть аккаунт? Войти' : 'Нет аккаунта? Зарегистрироваться'}
          </button>
        </div>
        <button onClick={onClose} className="mt-4 w-full text-xs text-gray-400 hover:text-gray-600">Отмена</button>
      </motion.div>
    </div>
  );
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const Navbar: React.FC<{ user: User | null; onAuthClick: () => void; onLogout: () => void }> = ({ user, onAuthClick, onLogout }) => (
  <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
    <div className="max-w-full px-4 sm:px-6 lg:px-12">
      <div className="flex justify-between h-16 items-center">
        <Link to="/" className="flex items-center gap-3">
          <Book className="text-brand-blue" size={32} />
          <div className="flex flex-col">
            <span className="text-lg font-bold leading-none text-brand-blue">БИБЛИОТЕКА</span>
            <span className="text-sm font-medium leading-none text-gray-500 uppercase tracking-tighter">Г. ОБНИНСК</span>
          </div>
        </Link>
        <nav className="hidden md:flex space-x-8">
          <Link to="/" className="text-gray-600 hover:text-brand-blue font-bold text-xs tracking-widest">ГЛАВНАЯ</Link>
          <Link to="/catalog" className="text-gray-600 hover:text-brand-blue font-bold text-xs tracking-widest">КАТАЛОГ</Link>
          <Link to="/events" className="text-gray-600 hover:text-brand-blue font-bold text-xs tracking-widest">СОБЫТИЯ</Link>
          <Link to="/about" className="text-gray-600 hover:text-brand-blue font-bold text-xs tracking-widest">О НАС</Link>
        </nav>
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <Link to="/profile" className="flex items-center gap-2 text-xs font-bold text-brand-blue hover:underline">
                <User size={18} />
                <span>ПРОФИЛЬ</span>
              </Link>
              <button 
                onClick={onLogout}
                className="text-[10px] font-bold text-gray-400 hover:text-red-500 transition-colors"
              >
                ВЫЙТИ
              </button>
            </div>
          ) : (
            <button 
              onClick={onAuthClick}
              className="flex items-center gap-2 text-xs font-bold text-gray-600 hover:text-brand-blue transition-colors"
            >
              <User size={20} />
              <span>ВОЙТИ</span>
            </button>
          )}
        </div>
      </div>
    </div>
  </header>
);

const Footer = () => (
  <footer className="bg-gray-50 border-t border-gray-200 pt-16 pb-8 px-4">
    <div className="max-w-full lg:px-12 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
      <div className="col-span-1 md:col-span-2">
        <div className="flex items-center gap-3 mb-6">
          <Book className="text-brand-blue" size={28} />
          <span className="text-xl font-bold text-brand-blue">БИБЛИОТЕКА Г. ОБНИНСК</span>
        </div>
        <p className="text-gray-500 max-w-sm mb-6">
          Официальный портал муниципальных библиотек города. Мы работаем для вас каждый день.
        </p>
        <div className="flex gap-4">
          <a href="#" className="text-gray-400 hover:text-brand-blue transition-colors"><Facebook size={20} /></a>
          <a href="#" className="text-gray-400 hover:text-brand-blue transition-colors"><Instagram size={20} /></a>
          <a href="#" className="text-gray-400 hover:text-brand-blue transition-colors"><Twitter size={20} /></a>
        </div>
      </div>
      
      <div>
        <h4 className="font-bold text-gray-900 mb-6 uppercase text-xs tracking-widest">Информация</h4>
        <ul className="space-y-4 text-gray-500 text-sm">
          <li className="flex items-start gap-3">
            <MapPin size={18} className="text-brand-blue shrink-0" />
            <span>ул. Пушкина, д. 10, Центральный район</span>
          </li>
          <li className="flex items-center gap-3">
            <Phone size={18} className="text-brand-blue shrink-0" />
            <span>+7 (800) 555-35-35</span>
          </li>
          <li className="flex items-center gap-3">
            <Mail size={18} className="text-brand-blue shrink-0" />
            <span>info@citylib.ru</span>
          </li>
        </ul>
      </div>

      <div>
        <h4 className="font-bold text-gray-900 mb-6 uppercase text-xs tracking-widest">Режим работы</h4>
        <ul className="space-y-2 text-gray-500 text-sm">
          <li className="flex justify-between">
            <span>Будни</span>
            <span className="font-medium">09:00 - 21:00</span>
          </li>
          <li className="flex justify-between">
            <span>Выходные</span>
            <span className="font-medium">10:00 - 19:00</span>
          </li>
          <li className="pt-4 flex items-center gap-2 text-brand-blue text-xs italic">
            <Clock size={14} />
            <span>Последняя пятница — санитарный день</span>
          </li>
        </ul>
      </div>
    </div>
    <div className="max-w-full lg:px-12 pt-8 border-t border-gray-200 text-center text-xs text-gray-400">
      © 2026 Муниципальное бюджетное учреждение культуры «Городская библиотека».
    </div>
  </footer>
);

// --- Components ---

const BookCard: React.FC<{ book: BookData; user: User | null; onAuthRequired: () => void }> = ({ book, user, onAuthRequired }) => {
  const [isBooked, setIsBooked] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleBook = () => {
    if (!user) {
      onAuthRequired();
      return;
    }
    setIsBooked(true);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden flex flex-col h-full hover:shadow-xl transition-all duration-300 group relative">
      {showSuccess && (
        <div className="absolute inset-x-0 top-0 z-20 bg-green-600 text-white text-[10px] py-1 px-2 font-bold text-center">
          Книга забронирована!
        </div>
      )}
      <div className="aspect-[3/4] relative overflow-hidden bg-gray-100 m-3 rounded-xl">
        <img src={book.cover} alt={book.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" referrerPolicy="no-referrer" />
        {(!book.available || isBooked) && (
          <div className="absolute inset-0 bg-white/80 flex items-center justify-center p-4 text-center">
            <span className="text-xs font-bold text-gray-900 uppercase border-2 border-gray-900 px-2 py-1">
              {isBooked ? 'ЗАБРОНИРОВАНО' : 'НЕТ В НАЛИЧИИ'}
            </span>
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <span className="text-[10px] font-bold text-brand-blue uppercase mb-1">{book.category}</span>
        <h3 className="text-sm font-bold text-gray-900 mb-1 line-clamp-2 leading-tight">{book.title}</h3>
        <p className="text-xs text-gray-500 mb-4">{book.author}</p>
        <div className="mt-auto">
          <button 
            onClick={handleBook}
            disabled={!book.available || isBooked} 
            className={`w-full py-2.5 rounded-xl text-[10px] font-bold transition-all border-2 ${
              (book.available && !isBooked) 
                ? 'bg-brand-blue border-brand-blue text-white hover:bg-blue-800 shadow-lg shadow-blue-200' 
                : 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {isBooked ? 'В КОРЗИНЕ' : book.available ? 'ЗАБРОНИРОВАТЬ' : 'В ОЧЕРЕДИ'}
          </button>
        </div>
      </div>
    </div>
  );
};

const EventCard: React.FC<{ event: EventData }> = ({ event }) => {
  const [isRegistered, setIsRegistered] = useState(false);

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden flex flex-col md:flex-row gap-0 md:gap-6">
      <div className="w-full md:w-64 h-48 md:h-auto shrink-0">
        <img src={event.image} alt={event.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
      </div>
      <div className="p-6 flex flex-col justify-center">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex items-center gap-1 text-xs font-bold text-brand-blue">
            <Calendar size={14} />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Clock size={14} />
            <span>{event.time}</span>
          </div>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
        <p className="text-sm text-gray-600 mb-6 max-w-2xl">{event.description}</p>
        <div>
          <button 
            onClick={() => setIsRegistered(true)}
            className={`px-6 py-2 rounded text-sm font-bold transition-all border-2 ${
              isRegistered 
                ? 'bg-green-600 border-green-600 text-white' 
                : 'border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white'
            }`}
          >
            {isRegistered ? 'ВЫ ЗАПИСАНЫ' : 'ЗАПИСАТЬСЯ'}
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Pages ---

const HomePage: React.FC<{ user: User | null; onAuthRequired: () => void }> = ({ user, onAuthRequired }) => (
  <div className="animate-in fade-in duration-500">
    <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
      {/* Фоновое изображение */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=2000" 
          alt="Library Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center text-white px-4">
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
        >
          Библиотека города Обнинск
        </motion.h1>
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-lg md:text-xl text-blue-50 mb-10 max-w-2xl mx-auto opacity-90"
        >
          Поиск книг, бронирование онлайн и доступ к электронным ресурсам города в одном месте.
        </motion.p>
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="relative max-w-2xl mx-auto"
        >
          <input 
            type="text" 
            placeholder="Поиск по названию, автору или жанру..." 
            className="w-full px-8 py-5 rounded-2xl bg-white text-gray-900 border-none outline-none text-lg shadow-2xl focus:ring-4 ring-brand-blue/20 transition-all"
          />
          <button className="absolute right-2.5 top-2.5 bottom-2.5 w-14 bg-brand-blue text-white rounded-xl hover:bg-blue-800 transition-all flex items-center justify-center shadow-lg active:scale-95">
            <Search size={24} />
          </button>
        </motion.div>
      </div>
    </section>

    <section className="py-10 px-4 max-w-full lg:px-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 uppercase tracking-tight">Новые поступления</h2>
        <Link to="/catalog" className="text-brand-blue text-xs font-bold flex items-center gap-1 hover:underline">
          Весь каталог <ChevronRight size={14} />
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
        {BOOKS.slice(0, 8).map(book => (
          <BookCard key={book.id} book={book} user={user} onAuthRequired={onAuthRequired} />
        ))}
      </div>
    </section>

    <section className="bg-gray-50 py-10 px-4 border-y border-gray-200">
      <div className="max-w-full lg:px-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 uppercase tracking-tight">Ближайшие события</h2>
          <Link to="/events" className="text-brand-blue text-xs font-bold flex items-center gap-1 hover:underline">
            Все мероприятия <ChevronRight size={14} />
          </Link>
        </div>
        <div className="space-y-4">
          {EVENTS.slice(0, 1).map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </section>
  </div>
);

const CatalogPage: React.FC<{ user: User | null; onAuthRequired: () => void }> = ({ user, onAuthRequired }) => {
  const [activeCategory, setActiveCategory] = useState('Все');
  const categories = ['Все', 'Классика', 'Роман', 'Антиутопия', 'Научпоп'];
  const filteredBooks = activeCategory === 'Все' ? BOOKS : BOOKS.filter(b => b.category === activeCategory);

  return (
    <div className="py-8 px-4 max-w-full lg:px-12 min-h-screen animate-in fade-in duration-500">
      <div className="border-b border-gray-200 pb-6 mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-3">Электронный каталог</h1>
        <div className="flex flex-wrap gap-1.5">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1 rounded text-[10px] font-bold transition-all border ${
                activeCategory === cat 
                  ? 'bg-brand-blue border-brand-blue text-white shadow-sm' 
                  : 'bg-white border-gray-200 text-gray-500 hover:border-brand-blue hover:text-brand-blue'
              }`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {filteredBooks.map(book => (
          <BookCard key={book.id} book={book} user={user} onAuthRequired={onAuthRequired} />
        ))}
      </div>
    </div>
  );
};

const EventsPage = () => (
  <div className="py-8 px-4 max-w-4xl mx-auto min-h-screen animate-in fade-in duration-500">
    <div className="border-b border-gray-200 pb-6 mb-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Мероприятия</h1>
      <p className="text-xs text-gray-500">Встречи и лекции в наших филиалах</p>
    </div>
    <div className="space-y-4">
      {EVENTS.map(event => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  </div>
);

const AboutPage = () => (
  <div className="py-8 px-4 max-w-full lg:px-12 animate-in fade-in duration-500">
    <div className="grid md:grid-cols-2 gap-8 items-start">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">О библиотеке</h1>
        <div className="space-y-3 text-sm text-gray-600 leading-relaxed">
          <p>Муниципальная городская библиотека — это современное информационное пространство, объединяющее традиции и технологии.</p>
          <p>Основанная в 1924 году, сегодня библиотека располагает фондом более 500 000 единиц хранения, доступных в центральном здании и 5 районных отделениях.</p>
        </div>
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <ul className="grid grid-cols-2 gap-3">
            <li className="flex items-center gap-2 text-[10px] text-gray-700 font-bold uppercase">
              <div className="w-1 h-1 bg-brand-blue rounded-full"></div>
              Бесплатный Wi-Fi
            </li>
            <li className="flex items-center gap-2 text-[10px] text-gray-700 font-bold uppercase">
              <div className="w-1 h-1 bg-brand-blue rounded-full"></div>
              Бронирование
            </li>
          </ul>
        </div>
      </div>
      <div className="relative">
        <img src="https://picsum.photos/seed/lib-interior/800/600" alt="Интерьер библиотеки" className="rounded-lg shadow-lg border border-gray-200" referrerPolicy="no-referrer" />
      </div>
    </div>
  </div>
);

const ProfilePage: React.FC<{ user: User | null }> = ({ user }) => {
  if (!user) return <div className="py-20 text-center font-bold">Пожалуйста, войдите в систему</div>;

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 animate-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden">
        <div className="bg-brand-blue p-8 text-white flex items-center gap-6">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center border-2 border-white/30">
            <User size={40} />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-blue-100 opacity-80">{user.email}</p>
            <div className="mt-2 inline-block px-3 py-1 bg-white/20 rounded-full text-[10px] font-bold uppercase tracking-wider">
              Читательский билет №84291
            </div>
          </div>
        </div>
        
        <div className="p-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Book className="text-brand-blue" size={20} />
                Мои бронирования
              </h2>
              <div className="space-y-4">
                {/* Болванка списка книг */}
                {[BOOKS[0], BOOKS[1]].map(book => (
                  <div key={book.id} className="flex gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100 items-center">
                    <img src={book.cover} className="w-12 h-16 object-cover rounded-lg shadow-sm" alt="" />
                    <div className="flex-grow">
                      <h3 className="text-sm font-bold text-gray-900">{book.title}</h3>
                      <p className="text-xs text-gray-500">{book.author}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">ГОТОВА К ВЫДАЧЕ</span>
                      <p className="text-[9px] text-gray-400 mt-1">До 24.03.2026</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-6">Статистика</h2>
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100">
                  <div className="text-2xl font-bold text-brand-blue">12</div>
                  <div className="text-[10px] font-bold text-blue-400 uppercase">Прочитано книг</div>
                </div>
                <div className="p-4 rounded-2xl bg-orange-50 border border-orange-100">
                  <div className="text-2xl font-bold text-orange-600">2</div>
                  <div className="text-[10px] font-bold text-orange-400 uppercase">Активных брони</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-white">
        <Navbar 
          user={user} 
          onAuthClick={() => setIsAuthModalOpen(true)} 
          onLogout={() => setUser(null)}
        />
        <AuthModal 
          isOpen={isAuthModalOpen} 
          onClose={() => setIsAuthModalOpen(false)} 
          onLogin={(u) => setUser(u)}
        />
        <main>
          <Routes>
            <Route path="/" element={<HomePage user={user} onAuthRequired={() => setIsAuthModalOpen(true)} />} />
            <Route path="/catalog" element={<CatalogPage user={user} onAuthRequired={() => setIsAuthModalOpen(true)} />} />
            <Route path="/profile" element={<ProfilePage user={user} />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
