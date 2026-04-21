import React, { useState, useEffect } from 'react';
import { Search, Book, Calendar, User, MapPin, Phone, Mail, Send, Share2, ArrowRight, ChevronRight, Clock, ShoppingCart, Trash2, Users, Plus, Settings, History, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useParams } from 'react-router-dom';

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

interface NewsData {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  image: string;
  content: string;
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
  { id: 1, title: "Преступление и наказание", author: "Ф. М. Достоевский", cover: "https://picsum.photos/seed/dostoevsky/300/450", category: "РОМАН", available: true },
  { id: 2, title: "Три мушкетёра", author: "Д. Александр", cover: "https://picsum.photos/seed/dumas/300/450", category: "РОМАН", available: true },
  { id: 3, title: "Записки из мертвого дома", author: "Ф. М. Достоевский", cover: "https://picsum.photos/seed/karamazov/300/450", category: "ПОВЕСТЬ", available: true },
  { id: 4, title: "Божественная комедия", author: "А. Данте", cover: "https://picsum.photos/seed/idiot/300/450", category: "ПОЭМА", available: true },
  { id: 5, title: "Евгений Онегин", author: "А. С. Пушкин", cover: "https://picsum.photos/seed/onegin/300/450", category: "РОМАН", available: true },
  { id: 6, title: "Ревизор", author: "Н. В. Гоголь", cover: "https://picsum.photos/seed/revizor/300/450", category: "КОМЕДИЯ", available: true },
];

const EVENTS: EventData[] = [
  { id: 1, title: "Литературный вечер: Поэзия Серебряного века", date: "15 Марта", time: "18:00", description: "Обсуждаем творчество Ахматовой и Блока в уютной атмосфере.", image: "https://picsum.photos/seed/poetry/600/400" },
  { id: 2, title: "Мастер-класс по каллиграфии", date: "20 Марта", time: "14:00", description: "Осваиваем искусство красивого письма пером.", image: "https://picsum.photos/seed/calligraphy/600/400" },
];

const NEWS: NewsData[] = [
  { 
    id: 1, 
    title: "Открытие нового филиала в микрорайоне 'Солнечный'", 
    date: "10 Марта, 2026", 
    excerpt: "Рады сообщить, что теперь библиотека стала еще ближе к жителям северной части города.", 
    image: "https://picsum.photos/seed/library-new/800/500",
    content: "Мы открыли двери нашего нового, шестого филиала! Современный дизайн, комфортные зоны для чтения и, конечно, тысячи новых книг уже ждут своих читателей. Филиал оборудован по последнему слову техники: станции самообслуживания, высокоскоростной Wi-Fi и уютная кофейня."
  },
  { 
    id: 2, 
    title: "Пополнение фонда: Новинки современной прозы", 
    date: "05 Марта, 2026", 
    excerpt: "Более 200 новых наименований поступили в наш фонд на этой неделе.", 
    image: "https://picsum.photos/seed/books-new/800/500",
    content: "В наш фонд поступили долгожданные новинки от ведущих издательств. Среди них — лауреаты литературных премий, захватывающие детективы и актуальный научпоп. Все книги уже доступны для бронирования в нашем электронном каталоге."
  },
  { 
    id: 3, 
    title: "Библионочь-2026: Программа мероприятий", 
    date: "01 Марта, 2026", 
    excerpt: "Готовимся к самому масштабному литературному событию года. Узнайте, что ждет гостей в этом году.", 
    image: "https://picsum.photos/seed/biblionight/800/500",
    content: "Ежегодная акция 'Библионочь' в этом году пройдет под девизом 'Магия слова'. В программе: встречи с известными писателями, ночные экскурсии по книгохранилищу, квесты для детей и взрослых, а также живая музыка в стенах библиотеки."
  }
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
          <button type="submit" className="w-full py-3 bg-[#1c3a93] text-white rounded-xl font-bold hover:bg-blue-800 transition-colors">
            {isRegister ? 'Создать аккаунт' : 'Войти'}
          </button>
        </form>
        <div className="mt-6 text-center">
          <button 
            onClick={() => setIsRegister(!isRegister)}
            className="text-xs text-[#1c3a93] font-bold hover:underline"
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

const Navbar: React.FC<{ user: User | null; cartCount: number; onAuthClick: () => void; onLogout: () => void }> = ({ user, cartCount, onAuthClick, onLogout }) => (
  <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
    <div className="max-w-full px-4 sm:px-6 lg:px-12">
      <div className="flex justify-between h-20 items-center">
        <Link to="/" className="flex items-center gap-3">
          <Book className="text-[#1c3a93]" size={32} strokeWidth={1.5} />
          <div className="flex flex-col">
            <span className="text-[20px] font-bold leading-none text-[#1c3a93]">БИБЛИОТЕКА</span>
            <span className="text-[12px] font-medium leading-none text-[#1c3a93] uppercase tracking-wide mt-0.5">Г. ЕКАТЕРИНБУРГ</span>
          </div>
        </Link>
        <nav className="hidden md:flex space-x-10">
          <Link to="/" className="text-[#1c3a93] font-bold text-[13px] tracking-wide uppercase">ГЛАВНАЯ</Link>
          <Link to="/catalog" className="text-gray-500 hover:text-[#1c3a93] font-bold text-[13px] tracking-wide uppercase">КАТАЛОГ</Link>
          <Link to="/news" className="text-gray-500 hover:text-[#1c3a93] font-bold text-[13px] tracking-wide uppercase">НОВОСТИ</Link>
          <Link to="/about" className="text-gray-500 hover:text-[#1c3a93] font-bold text-[13px] tracking-wide uppercase">О НАС</Link>
          <Link to="/cart" className="text-gray-500 hover:text-[#1c3a93] font-bold text-[13px] tracking-wide uppercase">СПИСОК КНИГ</Link>
        </nav>
        <div className="flex items-center gap-6">
          <Link to="/cart" className="relative text-gray-500 hover:text-[#1c3a93] transition-colors">
            <Star size={28} strokeWidth={1.5} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#1c3a93] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
          {user ? (
            <div className="flex items-center gap-4">
              <Link to="/profile" className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-[#1c3a93]">
                <User size={28} strokeWidth={1.5} />
              </Link>
              <button 
                onClick={onLogout}
                className="text-[10px] font-bold text-gray-400 hover:text-red-500 transition-colors uppercase"
                title="Выйти"
              >
                ВЫЙТИ
              </button>
            </div>
          ) : (
            <button 
              onClick={onAuthClick}
              className="flex items-center gap-2 text-gray-500 hover:text-[#1c3a93] transition-colors"
            >
              <User size={28} strokeWidth={1.5} />
            </button>
          )}
        </div>
      </div>
    </div>
  </header>
);

const VKIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M13.162 18.994c.609 0 .858-.406.858-.915v-2.217c0-.306.075-.456.258-.456.183 0 .483.15.975.645 1.074 1.08 1.488 1.515 2.493 1.515h2.133c.609 0 .916-.305.739-.9-.177-.595-1.162-1.635-1.635-2.133-.473-.498-.375-.675 0-1.275 0 0 1.59-2.235 1.755-3.015.09-.42-.09-.72-.69-.72h-2.133c-.51 0-.744.27-.87.57 0 0-1.08 2.64-2.61 4.35-.495.495-.72.645-.975.645-.128 0-.315-.15-.315-.585V10.134c0-.51-.147-.72-.57-.72h-3.345c-.315 0-.51.234-.51.456 0 .483.72.594.795 1.95v2.955c0 .645-.117.762-.372.762-.675 0-2.325-2.655-3.3-5.685-.195-.57-.39-.801-.9-.801H2.487c-.69 0-.825.324-.825.675 0 .63 1.185 3.735 3.9 7.53 2.58 3.6 6.21 5.535 9.51 5.535l.09-.015z" />
  </svg>
);

const Footer = () => (
  <footer className="bg-white border-t border-gray-200 mt-16 py-12 px-4">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
      <div>
        <div className="flex items-center gap-3 mb-6">
          <Book className="text-[#1c3a93]" size={28} strokeWidth={1.5} />
          <span className="text-lg font-bold text-[#1c3a93] uppercase tracking-wide">БИБЛИОТЕКА Г. ЕКАТЕРИНБУРГ</span>
        </div>
        <p className="text-gray-500 text-[14px] leading-relaxed mb-6 pe-8">
          Главная городская библиотека — ваш надежный проводник в мире литературы и знаний с 1964 года.
        </p>
        <div className="flex gap-4 items-center">
          <a href="https://t.me/your_tg" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#1c3a93] transition-colors" title="Telegram"><Send size={24} strokeWidth={1.5} /></a>
          <a href="https://vk.com/your_vk" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#1c3a93] transition-colors" title="VK">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M13.162 18.994c.609 0 .858-.406.858-.915v-2.217c0-.306.075-.456.258-.456.183 0 .483.15.975.645 1.074 1.08 1.488 1.515 2.493 1.515h2.133c.609 0 .916-.305.739-.9-.177-.595-1.162-1.635-1.635-2.133-.473-.498-.375-.675 0-1.275 0 0 1.59-2.235 1.755-3.015.09-.42-.09-.72-.69-.72h-2.133c-.51 0-.744.27-.87.57 0 0-1.08 2.64-2.61 4.35-.495.495-.72.645-.975.645-.128 0-.315-.15-.315-.585V10.134c0-.51-.147-.72-.57-.72h-3.345c-.315 0-.51.234-.51.456 0 .483.72.594.795 1.95v2.955c0 .645-.117.762-.372.762-.675 0-2.325-2.655-3.3-5.685-.195-.57-.39-.801-.9-.801H2.487c-.69 0-.825.324-.825.675 0 .63 1.185 3.735 3.9 7.53 2.58 3.6 6.21 5.535 9.51 5.535l.09-.015z" /></svg>
          </a>
        </div>
      </div>
      
      <div>
        <h4 className="font-bold text-gray-900 mb-6 uppercase text-[15px] tracking-wide">ИНФОРМАЦИЯ</h4>
        <ul className="space-y-4 text-gray-500 text-[14px]">
          <li className="flex items-center gap-3">
            <Phone size={20} strokeWidth={1.5} className="shrink-0" />
            <span>+7 (800) 123-45-67</span>
          </li>
          <li className="flex items-start gap-3">
            <MapPin size={20} strokeWidth={1.5} className="shrink-0" />
            <span>Г. Екатеринбург, ул. Победы, 17</span>
          </li>
          <li className="flex items-center gap-3">
            <Mail size={20} strokeWidth={1.5} className="shrink-0" />
            <span>contact@ekb-library.ru</span>
          </li>
        </ul>
      </div>

      <div>
        <h4 className="font-bold text-gray-900 mb-6 uppercase text-[15px] tracking-wide">РЕЖИМ РАБОТЫ</h4>
        <ul className="space-y-2 text-gray-500 text-[14px]">
          <li className="flex justify-between">
            <span>Пн-Пт: 09:00 — 20:00</span>
          </li>
          <li className="flex justify-between">
            <span>Сб-Вс: 10:00 — 18:00</span>
          </li>
          <li className="pt-3 flex items-center gap-2 text-[#1c3a93] italic">
            <span>Последняя пятница — санитарный день</span>
          </li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto pt-8 border-t border-gray-100 text-center text-[13px] text-gray-400">
      © 2026 Муниципальное бюджетное учреждение культуры «Городская библиотека».
    </div>
  </footer>
);

// --- Components ---

const BookCard: React.FC<{ book: BookData; user: User | null; isInCart: boolean; onAddToCart: (book: BookData) => void; onAuthRequired: () => void }> = ({ book, user, isInCart, onAddToCart, onAuthRequired }) => {
  const [showSuccess, setShowSuccess] = useState(false);

  const handleBook = () => {
    if (!user) {
      onAuthRequired();
      return;
    }
    if (!isInCart) {
      onAddToCart(book);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    }
  };

  return (
    <div className="bg-white border border-[#e5e7eb] rounded-[1.5rem] p-3 flex flex-col h-[400px] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 group relative">
      <div className="bg-[#fefce8] rounded-[1rem] p-3 relative mb-4 flex-grow aspect-[3/4] flex items-center justify-center">
        <div className="absolute top-3 left-3 z-10 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-[13px] text-gray-800 font-medium shadow-sm leading-none flex items-center h-7">
            Подробнее
        </div>
        <img src={book.cover} alt={book.title} className="w-full h-full object-cover rounded-lg shadow-sm transition-transform duration-500 group-hover:scale-105" referrerPolicy="no-referrer" />
        {showSuccess && (
          <div className="absolute inset-0 z-20 bg-green-600/90 text-white text-[12px] py-1 px-2 font-bold text-center flex items-center justify-center rounded-[1rem]">
            В ИЗБРАННОМ
          </div>
        )}
      </div>
      <div className="px-2 pb-1 flex flex-col shrink-0">
        <span className="text-[12px] font-medium text-[#1c3a93] uppercase mb-1 tracking-wider">{book.category}</span>
        <h3 className="text-[16px] font-medium text-gray-900 mb-1 leading-tight line-clamp-1">{book.title}</h3>
        <p className="text-[14px] text-gray-400 mb-4 truncate">{book.author}</p>
        <button 
          onClick={handleBook}
          disabled={!book.available || isInCart} 
          className={`w-full py-2.5 rounded-[12px] text-[13px] font-bold tracking-wide transition-all border-0 ${
            (book.available && !isInCart) 
              ? 'bg-[#1c3a93] text-white hover:bg-[#14296b]' 
              : 'bg-[#1c3a93] text-white opacity-90 cursor-not-allowed'
          }`}
        >
          {isInCart ? 'В ИЗБРАННОМ' : 'В ИЗБРАННОЕ'}
        </button>
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
                : 'border-[#1c3a93] text-[#1c3a93] hover:bg-[#1c3a93] hover:text-white'
            }`}
          >
            {isRegistered ? 'ВЫ ЗАПИСАНЫ' : 'ЗАПИСАТЬСЯ'}
          </button>
        </div>
      </div>
    </div>
  );
};

const NewsCard: React.FC<{ news: NewsData }> = ({ news }) => (
  <Link to={`/news/${news.id}`} className="bg-white border border-gray-100 rounded-2xl overflow-hidden flex flex-col hover:shadow-lg transition-all group">
    <div className="aspect-video overflow-hidden">
      <img src={news.image} alt={news.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" referrerPolicy="no-referrer" />
    </div>
    <div className="p-5">
      <span className="text-[10px] font-bold text-gray-400 uppercase mb-2 block">{news.date}</span>
      <h3 className="text-sm font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#1c3a93] transition-colors leading-tight">{news.title}</h3>
      <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">{news.excerpt}</p>
    </div>
  </Link>
);

// --- Pages ---

const HomePage: React.FC<{ user: User | null; cart: BookData[]; onAddToCart: (book: BookData) => void; onAuthRequired: () => void }> = ({ user, cart, onAddToCart, onAuthRequired }) => (
  <div className="animate-in fade-in duration-500">
    <section className="bg-[#1c3a93] py-14 flex items-center justify-center">
      <div className="relative z-10 w-full mx-auto text-center text-white px-4">
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-[44px] md:text-[54px] font-bold mb-3 tracking-tight"
        >
          Библиотека города Екатеринбург
        </motion.h1>
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-[18px] md:text-[20px] font-light max-w-2xl mx-auto"
        >
          Поиск книг и бронирование онлайн в одном месте.
        </motion.p>
      </div>
    </section>

    <section className="pt-10 pb-20 px-4 sm:px-6 lg:px-12 max-w-full mx-auto">
      <div className="mb-6">
        <h2 className="text-[26px] font-bold text-black uppercase tracking-tight">НОВЫЕ ПОСТУПЛЕНИЯ</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {BOOKS.map(book => (
          <BookCard 
            key={book.id} 
            book={book} 
            user={user} 
            isInCart={cart.some(b => b.id === book.id)}
            onAddToCart={onAddToCart}
            onAuthRequired={onAuthRequired} 
          />
        ))}
      </div>
    </section>
  </div>
);

const CatalogPage: React.FC<{ user: User | null; cart: BookData[]; onAddToCart: (book: BookData) => void; onAuthRequired: () => void }> = ({ user, cart, onAddToCart, onAuthRequired }) => {
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
                  ? 'bg-[#1c3a93] border-[#1c3a93] text-white shadow-sm' 
                  : 'bg-white border-gray-200 text-gray-500 hover:border-[#1c3a93] hover:text-[#1c3a93]'
              }`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {filteredBooks.map(book => (
          <BookCard 
            key={book.id} 
            book={book} 
            user={user} 
            isInCart={cart.some(b => b.id === book.id)}
            onAddToCart={onAddToCart}
            onAuthRequired={onAuthRequired} 
          />
        ))}
      </div>
    </div>
  );
};

const CartPage: React.FC<{ cart: BookData[]; onRemoveFromCart: (id: number) => void; onCheckout: () => void }> = ({ cart, onRemoveFromCart, onCheckout }) => {
  return (
    <div className="py-12 px-4 max-w-full lg:px-12 min-h-[60vh] animate-in fade-in duration-500">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
          <ShoppingCart className="text-[#1c3a93]" size={32} />
          Корзина бронирования
        </h1>
        
        {cart.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
            <Book className="mx-auto text-gray-300 mb-4" size={64} />
            <p className="text-gray-500 mb-6 font-medium">В вашей корзине пока пусто</p>
            <Link to="/catalog" className="inline-block px-8 py-3 bg-[#1c3a93] text-white rounded-xl font-bold hover:bg-blue-800 transition-all shadow-lg shadow-blue-100">
              Перейти в каталог
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cart.map(book => (
                <div key={book.id} className="flex gap-6 p-6 bg-white border border-gray-100 rounded-3xl shadow-sm items-center hover:shadow-md transition-all">
                  <img src={book.cover} className="w-20 h-28 object-cover rounded-xl shadow-md" alt={book.title} />
                  <div className="flex-grow">
                    <span className="text-[10px] font-bold text-[#1c3a93] uppercase tracking-wider">{book.category}</span>
                    <h3 className="text-lg font-bold text-gray-900 mb-1 leading-tight">{book.title}</h3>
                    <p className="text-sm text-gray-500">{book.author}</p>
                  </div>
                  <button 
                    onClick={() => onRemoveFromCart(book.id)}
                    className="p-3 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>
            
            <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 h-fit sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Детали заказа</h2>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Книг к получению:</span>
                  <span className="font-bold text-gray-900">{cart.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Срок брони:</span>
                  <span className="font-bold text-gray-900">5 дней</span>
                </div>
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-900 font-bold">Итого</span>
                    <span className="text-[#1c3a93] font-bold">Бесплатно</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={onCheckout}
                className="w-full py-4 bg-[#1c3a93] text-white rounded-2xl font-bold hover:bg-blue-800 transition-all shadow-xl shadow-blue-200 active:scale-95"
              >
                ПОДТВЕРДИТЬ БРОНЬ
              </button>
              <p className="mt-4 text-[10px] text-gray-400 text-center leading-relaxed">
                Книги будут ждать вас в библиотеке по адресу: ул. Пушкина, 10. При себе необходимо иметь читательский билет.
              </p>
            </div>
          </div>
        )}
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

const NewsPage = () => (
  <div className="py-8 px-4 max-w-full lg:px-12 min-h-screen animate-in fade-in duration-500">
    <div className="border-b border-gray-200 pb-6 mb-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Новости библиотеки</h1>
      <p className="text-xs text-gray-500">События, анонсы и важные объявления</p>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {NEWS.map(news => (
        <NewsCard key={news.id} news={news} />
      ))}
    </div>
  </div>
);

const NewsDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const news = NEWS.find(n => n.id === Number(id));

  if (!news) return <div className="py-20 text-center font-bold">Новость не найдена</div>;

  return (
    <div className="py-12 px-4 max-w-3xl mx-auto min-h-screen animate-in fade-in duration-500">
      <Link to="/news" className="inline-flex items-center gap-2 text-xs font-bold text-[#1c3a93] mb-8 hover:underline uppercase tracking-widest">
        <ChevronRight size={14} className="rotate-180" /> Назад к новостям
      </Link>
      <img src={news.image} alt={news.title} className="w-full aspect-video object-cover rounded-3xl mb-8 shadow-lg" referrerPolicy="no-referrer" />
      <span className="text-xs font-bold text-gray-400 uppercase mb-4 block tracking-widest">{news.date}</span>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">{news.title}</h1>
      <div className="prose prose-blue max-w-none text-gray-600 leading-relaxed">
        <p className="text-lg mb-6 font-medium text-gray-900">{news.excerpt}</p>
        <p>{news.content}</p>
      </div>
    </div>
  );
};

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
              <div className="w-1 h-1 bg-[#1c3a93] rounded-full"></div>
              Бесплатный Wi-Fi
            </li>
            <li className="flex items-center gap-2 text-[10px] text-gray-700 font-bold uppercase">
              <div className="w-1 h-1 bg-[#1c3a93] rounded-full"></div>
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
    <div className="py-12 px-4 max-w-full lg:px-12 bg-gray-50 min-h-screen animate-in fade-in duration-500">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-[#1c3a93] text-white p-8 rounded-3xl shadow-xl">
              <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md border border-white/30">
                <User size={40} />
              </div>
              <h1 className="text-2xl font-bold mb-1">{user.name}</h1>
              <p className="text-blue-100 opacity-80 text-sm mb-4">{user.email}</p>
              <div className="inline-block px-3 py-1 bg-white/20 rounded-full text-[10px] font-bold uppercase tracking-wider">
                №84291
              </div>
            </div>
            
            <nav className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100">
              <button className="w-full flex items-center gap-3 p-4 text-[#1c3a93] bg-blue-50 rounded-2xl font-bold text-sm">
                <Book size={18} /> Мои книги
              </button>
              <button className="w-full flex items-center gap-3 p-4 text-gray-500 hover:bg-gray-50 rounded-2xl font-bold text-sm transition-all">
                <History size={18} /> История
              </button>
              <button className="w-full flex items-center gap-3 p-4 text-gray-500 hover:bg-gray-50 rounded-2xl font-bold text-sm transition-all">
                <Users size={18} /> Профили семьи
              </button>
              <button className="w-full flex items-center gap-3 p-4 text-gray-500 hover:bg-gray-50 rounded-2xl font-bold text-sm transition-all">
                <Settings size={18} /> Настройки
              </button>
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                <Book className="text-[#1c3a93]" size={24} />
                Активные бронирования
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {[BOOKS[0], BOOKS[1]].map(book => (
                  <div key={book.id} className="flex gap-4 p-5 rounded-2xl bg-gray-50 border border-gray-100 items-center">
                    <img src={book.cover} className="w-14 h-20 object-cover rounded-xl shadow-sm" alt="" />
                    <div className="flex-grow">
                      <h3 className="text-sm font-bold text-gray-900">{book.title}</h3>
                      <p className="text-xs text-gray-500 mb-2">{book.author}</p>
                      <span className="text-[9px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full uppercase">ГОТОВА К ВЫДАЧЕ</span>
                    </div>
                    <div className="text-right">
                      <p className="text-[9px] text-gray-400">До 24.03</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-3">
                  <Users className="text-[#1c3a93]" size={24} />
                  Связанные профили
                </h2>
                <button className="flex items-center gap-2 text-xs font-bold text-[#1c3a93] hover:underline">
                  <Plus size={14} /> Добавить
                </button>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-6 rounded-3xl border-2 border-dashed border-gray-100 flex flex-col items-center justify-center text-center group transition-all cursor-pointer">
                  <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center mb-4 text-gray-400 group-hover:bg-blue-50 transition-all">
                    <Plus size={24} />
                  </div>
                  <p className="text-xs font-bold text-gray-400">Детский билет</p>
                </div>
                <div className="p-6 rounded-3xl bg-gray-50 border border-transparent flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-4 text-[#1c3a93] shadow-sm">
                    <User size={24} />
                  </div>
                  <p className="text-xs font-bold text-gray-900">Мария (Дочь)</p>
                  <p className="text-[10px] text-gray-500 mt-1">№84292</p>
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
  const [cart, setCart] = useState<BookData[]>([]);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const addToCart = (book: BookData) => {
    if (!cart.find(b => b.id === book.id)) {
      setCart([...cart, book]);
    }
  };

  const removeFromCart = (id: number) => {
    setCart(cart.filter(b => b.id !== id));
  };

  const clearCart = () => {
    setCart([]);
    alert('Бронирование успешно подтверждено! Книги будут ждать вас в библиотеке.');
  };

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-white">
        <Navbar 
          user={user} 
          cartCount={cart.length}
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
            <Route path="/" element={<HomePage user={user} cart={cart} onAddToCart={addToCart} onAuthRequired={() => setIsAuthModalOpen(true)} />} />
            <Route path="/catalog" element={<CatalogPage user={user} cart={cart} onAddToCart={addToCart} onAuthRequired={() => setIsAuthModalOpen(true)} />} />
            <Route path="/cart" element={<CartPage cart={cart} onRemoveFromCart={removeFromCart} onCheckout={clearCart} />} />
            <Route path="/profile" element={<ProfilePage user={user} />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/news/:id" element={<NewsDetailPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
