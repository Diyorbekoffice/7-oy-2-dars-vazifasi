import React, { useState, useEffect, createContext, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import searchIcon from './assets/Search.svg';
import locationIco from './assets/ic_Pin.svg';
import phoneIco from './assets/iPhoneico.png';
import translations from './language/language.json';
import './style.css';

const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light'); 
  const toggleTheme = (selectedTheme) => {
    setTheme(selectedTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function App() {
  const [language, setLanguage] = useState('en');
  const { theme, toggleTheme } = useContext(ThemeContext); 

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const handleThemeChange = (e) => {
    const selectedTheme = e.target.value;
    if (selectedTheme === 'dark') {
      toggleTheme('dark');
      toast.success('Dark theme enabled!'); 
    } else {
      toggleTheme('light');
      toast.info('Light theme enabled!'); 
    }
  };

  return (
    <div className={theme === 'dark' ? 'bg-gray-900 text-white' : ''}> 
      <header className={`flex justify-between items-center p-5 border shadow-lg shadow-slate-200 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
        <a href="#" className="text-2xl font-bold">
          {translations[language].logo}
        </a>

        <nav className="font-medium">
          <ul className="flex space-x-6">
            <details className="cursor-pointer">
              <summary>{translations[language].assets}</summary>
            </details>
            <li><a href="#" className="hover:text-gray-900">{translations[language].creators}</a></li>
            <li><a href="#" className="hover:text-gray-900">{translations[language].careers}</a></li>
            <li><a href="#" className="hover:text-gray-900">{translations[language].goPro}</a></li>
          </ul>
        </nav>

        <div className="flex items-center gap-3 p-4 bg-zinc-100 rounded-3xl">
          <img src={searchIcon} alt="search" className="w-5 h-5" />
          <input type="text" placeholder={translations[language].searchPlaceholder} className="bg-zinc-100" />
        </div>

        <select className={theme === 'dark' ? ' text-black rounded-md p-2 ml-4 ' : 'border border-gray-300 rounded-md p-2 ml-4 focus:outline-none focus:ring focus:ring-blue-300'} value={language} onChange={handleLanguageChange}>
          <option value="en">English</option>
          <option value="ru">Русский</option>
        </select>

        <select className={theme === 'dark' ? ' text-black rounded-md p-2 ml-4 ' : "border p-2 rounded-md"} value={theme} onChange={handleThemeChange}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>

      </header>

      <section className={`flex items-center m-10 py-40 px-36 rounded-3xl ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-sky-100 text-black'}`}>
        <div className="w-1/2">
          <p className="text-lg text-gray-500"> {translations[language].securitySolution}  </p>
          <h3 className="font-extrabold text-3xl mt-5"> {translations[language].keepTrack} </h3>
          <div className="flex items-center my-4 gap-5 mt-16">
            <img src={locationIco} alt="Location Icon" className="w-14" />
            <p className="font-medium"> {translations[language].noticed} </p>
          </div>
          <h3 className="text-xl font-bold mt-16"> {translations[language].joinWaitlist} </h3>
          <p className="font-medium"> {translations[language].notify}  </p>
          <div className="flex items-center mt-4 border bg-white w-80 pl-4 p-1 justify-between rounded-3xl">
            <input type="email" placeholder={translations[language].emailPlaceholder} />
            <button className="bg-blue-500 text-white rounded-3xl px-4 py-2 hover:bg-blue-600">  {translations[language].joinList}  </button>
          </div>
        </div>
        <div className="w-1/2 flex justify-end">
          <img src={phoneIco} alt="Phone Icon" className="w-3/4 h-auto" />
        </div>
      </section>

      <ToastContainer />
    </div>
  );
}

export default function Main() {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
}
