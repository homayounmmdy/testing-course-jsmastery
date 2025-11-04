import React, { useState, useMemo } from 'react';

interface Task {
  id: string;
  name: string;
  priority: number;
  difficulty: number;
  score: number;
}

type FilterType = 'all' | 'valuable' | 'easiest' | 'hardest';

export default function TaskPrioritizer() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskName, setTaskName] = useState('');
  const [priority, setPriority] = useState(5);
  const [difficulty, setDifficulty] = useState(5);
  const [filter, setFilter] = useState<FilterType>('all');
  const [editingId, setEditingId] = useState<string | null>(null);

  const addTask = () => {
    if (!taskName.trim()) return;

    const newTask: Task = {
      id: Date.now().toString(),
      name: taskName,
      priority,
      difficulty,
      score: priority + difficulty
    };

    setTasks([...tasks, newTask]);
    setTaskName('');
    setPriority(5);
    setDifficulty(5);
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const startEdit = (task: Task) => {
    setEditingId(task.id);
    setTaskName(task.name);
    setPriority(task.priority);
    setDifficulty(task.difficulty);
  };

  const saveEdit = () => {
    if (!editingId) return;
    
    setTasks(tasks.map(t => 
      t.id === editingId 
        ? { ...t, name: taskName, priority, difficulty, score: priority + difficulty }
        : t
    ));
    
    setEditingId(null);
    setTaskName('');
    setPriority(5);
    setDifficulty(5);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setTaskName('');
    setPriority(5);
    setDifficulty(5);
  };

  const sortedTasks = useMemo(() => {
    let filtered = [...tasks];
    
    switch (filter) {
      case 'valuable':
        filtered.sort((a, b) => b.priority - a.priority);
        break;
      case 'easiest':
        filtered.sort((a, b) => a.difficulty - b.difficulty);
        break;
      case 'hardest':
        filtered.sort((a, b) => b.difficulty - a.difficulty);
        break;
      default:
        filtered.sort((a, b) => b.score - a.score);
    }
    
    return filtered;
  }, [tasks, filter]);

  const topPriorityTasks = useMemo(() => {
    return [...tasks]
      .sort((a, b) => b.priority - a.priority)
      .slice(0, 3);
  }, [tasks]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-stone-50 to-amber-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-serif font-bold text-stone-800 mb-3">
            Task Prioritizer
          </h1>
          <p className="text-lg text-stone-600 font-light">
            Focus on what matters most
          </p>
        </div>

        {/* Input Form */}
        <div className="bg-white border-2 border-stone-300 rounded-lg shadow-lg p-8 mb-8">
          <div>
            <div className="space-y-6">
              <div>
                <label className="block text-stone-700 font-semibold mb-2 text-lg">
                  Task Name
                </label>
                <input
                  type="text"
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-stone-300 rounded-md focus:border-amber-600 focus:outline-none text-lg transition-colors"
                  placeholder="Enter your task..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-stone-700 font-semibold mb-2 text-lg">
                    Priority Level: <span className="text-amber-700">{priority}</span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={priority}
                    onChange={(e) => setPriority(Number(e.target.value))}
                    className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
                  />
                  <div className="flex justify-between text-sm text-stone-500 mt-1">
                    <span>Low (0)</span>
                    <span>High (10)</span>
                  </div>
                </div>

                <div>
                  <label className="block text-stone-700 font-semibold mb-2 text-lg">
                    Difficulty Level: <span className="text-amber-700">{difficulty}</span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={difficulty}
                    onChange={(e) => setDifficulty(Number(e.target.value))}
                    className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
                  />
                  <div className="flex justify-between text-sm text-stone-500 mt-1">
                    <span>Easy (0)</span>
                    <span>Hard (10)</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  onClick={addTask}
                  className="flex-1 bg-amber-700 hover:bg-amber-800 text-white font-semibold py-3 px-6 rounded-md transition-colors text-lg shadow-md"
                >
                  {editingId ? 'Save Changes' : 'Add Task'}
                </button>
                {editingId && (
                  <button
                    type="button"
                    onClick={cancelEdit}
                    className="px-6 py-3 bg-stone-400 hover:bg-stone-500 text-white font-semibold rounded-md transition-colors text-lg shadow-md"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Top Priority Section */}
        {topPriorityTasks.length > 0 && (
          <div className="bg-amber-100 border-2 border-amber-300 rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-serif font-bold text-amber-900 mb-4">
              🎯 Top Priority Tasks
            </h2>
            <div className="space-y-2">
              {topPriorityTasks.map((task, idx) => (
                <div key={task.id} className="bg-white border border-amber-200 rounded-md p-3 flex items-center gap-3">
                  <span className="text-2xl font-bold text-amber-700">{idx + 1}</span>
                  <span className="flex-1 text-lg text-stone-800">{task.name}</span>
                  <span className="text-sm text-stone-600 bg-amber-50 px-3 py-1 rounded-full">
                    Priority: {task.priority}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Filter Buttons */}
        {tasks.length > 0 && (
          <div className="flex flex-wrap gap-3 mb-6">
            {[
              { value: 'all', label: 'All Tasks' },
              { value: 'valuable', label: 'Most Valuable' },
              { value: 'easiest', label: 'Easiest First' },
              { value: 'hardest', label: 'Hardest First' }
            ].map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setFilter(value as FilterType)}
                className={`px-5 py-2 rounded-md font-semibold transition-all text-base ${
                  filter === value
                    ? 'bg-amber-700 text-white shadow-md'
                    : 'bg-white text-stone-700 border-2 border-stone-300 hover:border-amber-600'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        )}

        {/* Main Tasks Table */}
        {sortedTasks.length > 0 ? (
          <div className="bg-white border-2 border-stone-300 rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-stone-200 border-b-2 border-stone-300">
                  <tr>
                    <th className="px-6 py-4 text-left text-stone-800 font-bold text-lg">Rank</th>
                    <th className="px-6 py-4 text-left text-stone-800 font-bold text-lg">Task</th>
                    <th className="px-6 py-4 text-center text-stone-800 font-bold text-lg">Priority</th>
                    <th className="px-6 py-4 text-center text-stone-800 font-bold text-lg">Difficulty</th>
                    <th className="px-6 py-4 text-center text-stone-800 font-bold text-lg">Score</th>
                    <th className="px-6 py-4 text-center text-stone-800 font-bold text-lg">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200">
                  {sortedTasks.map((task, idx) => (
                    <tr key={task.id} className="hover:bg-amber-50 transition-colors">
                      <td className="px-6 py-4 text-stone-600 font-bold text-xl">{idx + 1}</td>
                      <td className="px-6 py-4 text-stone-800 text-lg font-medium">{task.name}</td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold">
                          {task.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-block bg-orange-100 text-orange-800 px-3 py-1 rounded-full font-semibold">
                          {task.difficulty}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-block bg-amber-100 text-amber-800 px-3 py-1 rounded-full font-bold text-lg">
                          {task.score}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex gap-2 justify-center">
                          <button
                            onClick={() => startEdit(task)}
                            className="px-3 py-1 bg-stone-600 hover:bg-stone-700 text-white rounded-md transition-colors text-sm font-semibold"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteTask(task.id)}
                            className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors text-sm font-semibold"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white border-2 border-stone-300 rounded-lg shadow-lg p-12 text-center">
            <p className="text-2xl text-stone-500 font-light">
              No tasks yet. Add your first task above to get started!
            </p>
          </div>
        )}
      </div>
</div>
 );
}
