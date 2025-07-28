// components/ConfirmDialog.jsx
import { motion } from 'framer-motion';

function ConfirmDialog({ message, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-6 rounded-lg w-[90%] max-w-md shadow-lg"
      >
        <h2 className="text-lg font-semibold mb-4">Are you sure?</h2>
        <p className="mb-6 text-sm text-gray-600 dark:text-gray-300">{message}</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
          >
            Yes, Delete
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default ConfirmDialog;
