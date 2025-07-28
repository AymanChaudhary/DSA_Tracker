// components/Home.jsx
import { useState } from 'react';
import { Trash2, ClipboardPlus } from 'lucide-react';
import FilterDropdown from './FilterDropdown';
import ConfirmDialog from './ConfirmDialog';
import { showToast } from './Toaster';
import { motion, AnimatePresence } from 'framer-motion';

function Home() {
  const [topics, setTopics] = useState([]);
  const [isTopicModalOpen, setIsTopicModalOpen] = useState(false);
  const [newTopic, setNewTopic] = useState('');
  const [activeTopicIndex, setActiveTopicIndex] = useState(null);
  const [isProblemModalOpen, setIsProblemModalOpen] = useState(false);
  const [newProblem, setNewProblem] = useState({ title: '', link: '' });
  const [filters, setFilters] = useState({});
  const [topicToDelete, setTopicToDelete] = useState(null);

  const handleAddTopic = () => {
    const trimmed = newTopic.trim();
    if (trimmed && !topics.some((t) => t.name === trimmed)) {
      setTopics([...topics, { name: trimmed, problems: [] }]);
      setNewTopic('');
      setIsTopicModalOpen(false);
    }
  };

  const handleAddProblem = () => {
    const { title, link } = newProblem;
    if (!title.trim() || !link.trim()) return;

    const updatedTopics = [...topics];
    const topic = updatedTopics[activeTopicIndex];
    topic.problems.push({ title, link, solved: false });

    setTopics(updatedTopics);
    setNewProblem({ title: '', link: '' });
    setIsProblemModalOpen(false);
    showToast('add', title, topic.name);
  };

  const toggleSolved = (topicIdx, problemIdx) => {
    const updatedTopics = [...topics];
    const problem = updatedTopics[topicIdx].problems[problemIdx];
    const wasSolved = problem.solved;
    problem.solved = !problem.solved;
    setTopics(updatedTopics);
    showToast(wasSolved ? 'unsolved' : 'solved', problem.title);
  };

  const deleteProblem = (topicIdx, problemIdx) => {
    const updatedTopics = [...topics];
    const removed = updatedTopics[topicIdx].problems.splice(problemIdx, 1)[0];
    setTopics(updatedTopics);
    showToast('delete', removed.title);
  };

  const deleteTopic = (index) => {
    const removed = topics[index];
    const updated = [...topics];
    updated.splice(index, 1);
    setTopics(updated);
    setTopicToDelete(null);
    showToast('delete', removed.name, '', 'TOPIC REMOVED');
  };

  const filteredProblems = (topic) => {
    const filter = filters[topic.index] || 'all';
    if (filter === 'solved') return topic.problems.filter((p) => p.solved);
    if (filter === 'unsolved') return topic.problems.filter((p) => !p.solved);
    return topic.problems;
  };

  return (
    <main className="flex flex-col items-center py-12 px-4 min-h-[calc(100vh-72px)] bg-white dark:bg-gray-950 transition-colors">
      <button
        className="mb-6 px-6 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition"
        onClick={() => setIsTopicModalOpen(true)}
      >
        + Add Topic
      </button>

      {/* Topic Modal */}
      <AnimatePresence>
        {isTopicModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ duration: 0.25 }}
              className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-6 rounded-xl w-[90%] max-w-md"
            >
              <h2 className="text-xl font-semibold mb-4">Add New Topic</h2>
              <input
                type="text"
                placeholder="e.g. Arrays, Trees"
                value={newTopic}
                onChange={(e) => setNewTopic(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddTopic()}
                className="w-full p-2 mb-4 rounded bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                autoFocus
              />
              <div className="flex justify-end space-x-3">
                <button
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white rounded"
                  onClick={() => setIsTopicModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-purple-600 text-white rounded"
                  onClick={handleAddTopic}
                >
                  Add Topic
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Problem Modal */}
      <AnimatePresence>
        {isProblemModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ duration: 0.25 }}
              className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-6 rounded-xl w-[90%] max-w-md"
            >
              <h2 className="text-xl font-semibold mb-4">Add New Problem</h2>
              <input
                type="text"
                placeholder="Problem Name"
                value={newProblem.title}
                onChange={(e) => setNewProblem({ ...newProblem, title: e.target.value })}
                className="w-full p-2 mb-4 rounded bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
              />
              <input
                type="url"
                placeholder="Problem link/url"
                value={newProblem.link}
                onChange={(e) => setNewProblem({ ...newProblem, link: e.target.value })}
                className="w-full p-2 mb-4 rounded bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
              />
              <div className="flex justify-end space-x-3">
                <button
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white rounded"
                  onClick={() => setIsProblemModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-purple-600 text-white rounded"
                  onClick={handleAddProblem}
                >
                  Add Problem
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confirm Dialog */}
      <AnimatePresence>
        {topicToDelete !== null && (
          <ConfirmDialog
            message={`Are you sure you want to delete the topic "${topics[topicToDelete].name}"? All problems will be deleted.`}
            onConfirm={() => deleteTopic(topicToDelete)}
            onCancel={() => setTopicToDelete(null)}
          />
        )}
      </AnimatePresence>

      {/* Topics Section */}
      {topics.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center space-y-4"
        >
          <ClipboardPlus className="w-16 h-16 text-purple-500" />
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            No topics added yet
          </h2>
          <p className="text-gray-500 max-w-md dark:text-gray-400">
            Click "Add Topic" to get started!
          </p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl">
          <AnimatePresence>
            {topics.map((topic, topicIdx) => {
              const total = topic.problems.length;
              const solved = topic.problems.filter((p) => p.solved).length;
              const percentage = total ? Math.round((solved / total) * 100) : 0;
              const currentFilter = filters[topicIdx] || 'all';

              return (
                <motion.div
                  key={topicIdx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white p-4 rounded-lg shadow-md"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-semibold">{topic.name}</h3>
                    <div className="flex items-center space-x-2">
                      <FilterDropdown
                        currentFilter={currentFilter}
                        onSelect={(filter) =>
                          setFilters({ ...filters, [topicIdx]: filter })
                        }
                      />
                      <button
                        title="Delete Topic"
                        onClick={() => setTopicToDelete(topicIdx)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>

                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{`${solved} of ${total} solved — ${percentage}% complete`}</p>
                  <div className="w-full bg-gray-200 dark:bg-gray-600 h-2 rounded mb-2">
                    <div
                      className="h-2 bg-green-500 rounded"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>

                  <div className="mb-3 space-y-2 max-h-40 overflow-y-auto">
                    {filteredProblems({ ...topic, index: topicIdx }).length === 0 ? (
                      <p className="text-gray-500 dark:text-gray-400 text-sm">No problems added yet.</p>
                    ) : (
                      filteredProblems({ ...topic, index: topicIdx }).map((problem, probIdx) => (
                        <div key={probIdx} className="flex justify-between items-center">
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={problem.solved}
                              onChange={() => toggleSolved(topicIdx, probIdx)}
                              className="accent-green-500"
                            />
                            <a
                              href={problem.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:underline text-sm"
                            >
                              {problem.title}
                            </a>
                          </div>
                          <button onClick={() => deleteProblem(topicIdx, probIdx)}>
                            <Trash2 size={16} className="text-red-500 hover:text-red-600" />
                          </button>
                        </div>
                      ))
                    )}
                  </div>

                  <button
                    onClick={() => {
                      setActiveTopicIndex(topicIdx);
                      setIsProblemModalOpen(true);
                    }}
                    className="w-full py-1 border border-dashed border-gray-400 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    + Add Problem
                  </button>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </main>
  );
}

export default Home;
