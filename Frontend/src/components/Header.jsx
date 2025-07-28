// components/Header.jsx
import { Sun, Moon } from 'lucide-react';
import { useEffect, useState } from 'react';

function Header() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b bg-white dark:bg-gray-900 dark:border-gray-700">
      <div className="flex items-center gap-2">
        <img
          src="/favicon.png"
          alt="DSA Tracker Logo"
          className="w-14 h-14" // ⬅️ increased size
        />
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          DSA Tracker
        </h1>
      </div>
      <button
        onClick={() => setIsDark(!isDark)}
        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        aria-label="Toggle Theme"
      >
        {isDark ? (
          <Sun className="w-5 h-5 text-yellow-400" />
        ) : (
          <Moon className="w-5 h-5 text-gray-800" />
        )}
      </button>
    </header>
  );
}

export default Header;
