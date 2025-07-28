// components/Toaster.jsx
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';

export const showToast = (type, problemName, topicName = '') => {
  switch (type) {
    case 'add':
      toast.success(
        <div>
          <strong>Problem Added</strong>
          <div>{`${problemName} has been added to ${topicName}`}</div>
        </div>
      );
      break;

    case 'solved':
      toast.success(
        <div>
          <strong>Problem Solved</strong>
          <div>{`${problemName} marked as solved`}</div>
        </div>
      );
      break;

    case 'unsolved':
      toast.info(
        <div>
          <strong>Problem Status Updated</strong>
          <div>{`${problemName} is marked as unsolved`}</div>
        </div>
      );
      break;

    case 'delete':
      toast.error(
        <div>
          <strong>Problem Deleted</strong>
          <div>{`${problemName} has been removed.`}</div>
        </div>
      );
      break;

    default:
      break;
  }
};

// Automatically detects current theme from <html class="dark">
export function ToasterContainer() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains('dark');
      setTheme(isDark ? 'dark' : 'light');
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    // Initial theme check
    setTheme(document.documentElement.classList.contains('dark') ? 'dark' : 'light');

    return () => observer.disconnect();
  }, []);

  return (
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme={theme} // light or dark
    />
  );
}
