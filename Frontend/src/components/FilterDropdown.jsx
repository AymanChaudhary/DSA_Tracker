// components/FilterDropdown.jsx
import { useState } from 'react';
import { CheckSquare, FileText, XSquare, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function FilterDropdown({ currentFilter, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (value) => {
    onSelect(value);
    setIsOpen(false);
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button className="text-sm bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white px-2 py-1 rounded flex items-center gap-1">
        Filter <ChevronDown size={14} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-36 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded shadow-lg z-10"
          >
            <button
              onClick={() => handleSelect('all')}
              className={`w-full flex items-center px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 text-sm ${
                currentFilter === 'all' ? 'text-purple-600 dark:text-purple-400' : 'text-gray-800 dark:text-white'
              }`}
            >
              <FileText size={16} className="mr-2" /> All
            </button>
            <button
              onClick={() => handleSelect('solved')}
              className={`w-full flex items-center px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 text-sm ${
                currentFilter === 'solved' ? 'text-green-600 dark:text-green-400' : 'text-gray-800 dark:text-white'
              }`}
            >
              <CheckSquare size={16} className="mr-2" /> Solved
            </button>
            <button
              onClick={() => handleSelect('unsolved')}
              className={`w-full flex items-center px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 text-sm ${
                currentFilter === 'unsolved' ? 'text-red-600 dark:text-red-400' : 'text-gray-800 dark:text-white'
              }`}
            >
              <XSquare size={16} className="mr-2" /> Unsolved
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default FilterDropdown;
