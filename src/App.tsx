import React, { useState, useEffect } from 'react';
import { Search, Book, Calendar, User, MapPin, Phone, Mail, Facebook, Instagram, Twitter, ArrowRight, ChevronRight, Clock } from 'lucide-react';
import { motion } from 'motion/react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';

// --- Types ---
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
  { id: 2, title: "1984", author: "Джордж Оруэлл", cover: "https://picsum.photos/seed/1984/300/450", category: "Антиутопия", available: true, description: "Культовый роман о тоталитарном обществе и потере индивидуальности." },
  { id: 3, title: "Мастер и Маргарита", author: "Михаил Булгаков", cover: "https://picsum.photos/seed/bulgakov/300/450", category: "Классика", available: true, description: "Мистическая история о любви, творчестве и визите дьявола в Москву." },
  { id: 4, title: "Цветы для Элджернона", author: "Дэниел Киз", cover: "https://picsum.photos/seed/algernon/300/450", category: "Фантастика", available: true, description: "Трогательная история об эксперименте по повышению интеллекта." },
  { id: 5, title: "Маленький принц", author: "Антуан де Сент-Экзюпери", cover: "https://picsum.photos/seed/prince/300/450", category: "Сказка", available: true, description: "Мудрая сказка для детей и взрослых о самом важном в жизни." },
  { id: 6, title: "Sapiens", author: "Юваль Ной Харари", cover: "https://picsum.photos/seed/sapiens/300/450", category: "Научпоп", available: true, description: "Краткая история человечества от каменного века до современности." },
  { id: 7, title: "Портрет Дориана Грея", author: "Оскар Уайльд", cover: "https://picsum.photos/seed/dorian/300/450", category: "Классика", available: true, description: "История о вечной молодости и моральном разложении." },
  { id: 8, title: "451 градус по Фаренгейту", author: "Рэй Брэдбери", cover: "https://picsum.photos/seed/fahrenheit/300/450", category: "Антиутопия", available: true, description: "Мир, где книги сжигают, а чтение — преступление." },
  { id: 9, title: "Три товарища", author: "Эрих Мария Ремарк", cover: "https://picsum.photos/seed/remarque/300/450", category: "Классика", available: true, description: "Роман о дружбе, любви и потерянном поколении." },
  { id: 10, title: "Алхимик", author: "Пауло Коэльо", cover: "https://picsum.photos/seed/alchemist/300/450", category: "Философия", available: true, description: "Притча о следовании своей мечте." },
  { id: 11, title: "Великий Гэтсби", author: "Ф. Скотт Фицджеральд", cover: "https://picsum.photos/seed/gatsby/300/450", category: "Классика", available: true, description: "История о любви и американской мечте в эпоху джаза." },
  { id: 12, title: "Убить пересмешника", author: "Харпер Ли", cover: "https://picsum.photos/seed/mockingbird/300/450", category: "Классика", available: true, description: "Роман о взрослении и борьбе с несправедливостью." },
];

const EVENTS: EventData[] = [
  { id: 1, title: "Литературный вечер: Поэзия Серебряного века", date: "15 Марта", time: "18:00", description: "Обсуждаем творчество Ахматовой и Блока в уютной атмосфере.", image: "https://picsum.photos/seed/poetry/600/400" },
  { id: 2, title: "Мастер-класс по каллиграфии", date: "20 Марта", time: "14:00", description: "Осваиваем искусство красивого письма пером.", image: "https://picsum.photos/seed/calligraphy/600/400" },
];

// --- Shared Components ---

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const Navbar = () => (
  <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
    <div className="max-w-full px-4 sm:px-6 lg:px-12">
      <div className="flex justify-between h-16 items-center">
        <Link to="/" className="flex items-center gap-3">
          <Book className="text-brand-blue" size={32} />
          <div className="flex flex-col">
            <span className="text-lg font-bold leading-none text-brand-blue">ГОРОДСКАЯ</span>
            <span className="text-sm font-medium leading-none text-gray-500">БИБЛИОТЕКА</span>
          </div>
        </Link>
        <nav className="hidden md:flex space-x-8">
          <Link to="/catalog" className="text-gray-600 hover:text-brand-blue font-medium">Каталог</Link>
          <Link to="/events" className="text-gray-600 hover:text-brand-blue font-medium">Мероприятия</Link>
          <Link to="/about" className="text-gray-600 hover:text-brand-blue font-medium">О библиотеке</Link>
        </nav>
        <div className="flex items-center gap-4">
          <button className="hidden sm:flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-brand-blue">
            <User size={20} />
            <span>Личный кабинет</span>
          </button>
          <button className="md:hidden p-2 text-gray-600">
            <Search size={24} />
          </button>
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
          <span className="text-xl font-bold text-brand-blue">ГОРОДСКАЯ БИБЛИОТЕКА</span>
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

const BookCard: React.FC<{ book: BookData }> = ({ book }) => {
  const [isBooked, setIsBooked] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleBook = () => {
    setIsBooked(true);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow relative">
      {showSuccess && (
        <div className="absolute inset-x-0 top-0 z-20 bg-green-600 text-white text-[10px] py-1 px-2 font-bold text-center">
          Книга забронирована!
        </div>
      )}
      <div className="aspect-[3/4] relative overflow-hidden bg-gray-100">
        <img src={book.cover} alt={book.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
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
            className={`w-full py-2 rounded text-xs font-bold transition-colors border-2 ${
              (book.available && !isBooked) 
                ? 'bg-brand-blue border-brand-blue text-white hover:bg-blue-800' 
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

const HomePage = () => (
  <div className="animate-in fade-in duration-500">
    <section className="bg-brand-blue py-10 px-4">
      <div className="max-w-full lg:px-12 grid md:grid-cols-2 gap-8 items-center text-white">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
            Ваша библиотека — <br />всегда рядом
          </h1>
          <p className="text-base text-blue-100 mb-6 max-w-lg">
            Поиск книг, бронирование онлайн и доступ к электронным ресурсам города в одном месте.
          </p>
          <div className="relative max-w-md">
            <input 
              type="text" 
              placeholder="Поиск по каталогу..." 
              className="w-full px-5 py-3 rounded bg-white text-gray-900 border-none outline-none text-sm shadow-lg"
            />
            <button className="absolute right-1.5 top-1.5 bottom-1.5 px-3 bg-brand-blue text-white rounded hover:bg-blue-800 transition-colors">
              <Search size={18} />
            </button>
          </div>
        </div>
        <div className="hidden md:block">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm border border-white/10 text-center">
              <div className="text-2xl font-bold mb-0.5">500к+</div>
              <div className="text-[10px] uppercase tracking-wider opacity-70">Книг</div>
            </div>
            <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm border border-white/10 text-center">
              <div className="text-2xl font-bold mb-0.5">15к</div>
              <div className="text-[10px] uppercase tracking-wider opacity-70">Читателей</div>
            </div>
            <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm border border-white/10 text-center">
              <div className="text-2xl font-bold mb-0.5">12</div>
              <div className="text-[10px] uppercase tracking-wider opacity-70">Филиалов</div>
            </div>
            <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm border border-white/10 text-center">
              <div className="text-2xl font-bold mb-0.5">24/7</div>
              <div className="text-[10px] uppercase tracking-wider opacity-70">Онлайн</div>
            </div>
          </div>
        </div>
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
          <BookCard key={book.id} book={book} />
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

const CatalogPage = () => {
  const [activeCategory, setActiveCategory] = useState('Все');
  const categories = ['Все', 'Классика', 'Фантастика', 'Антиутопия', 'Научпоп', 'Сказка'];
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
          <BookCard key={book.id} book={book} />
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
          <p>Основанная в 1924 году, сегодня библиотека располагает фондом более 500 000 единиц хранения.</p>
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

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-white">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
