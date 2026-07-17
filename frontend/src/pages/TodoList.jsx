import React, { useState, useEffect } from 'react';
import { FaListCheck, FaPlus, FaTrash, FaCheck, FaEdit, FaClock, FaFire, FaSearch } from 'react-icons/fa';
import { toast } from 'react-toastify';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');
  const [filter, setFilter] = useState('all');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('medium');
  const [searchTerm, setSearchTerm] = useState('');

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('todoList_v2');
    if (saved) {
      try {
        setTodos(JSON.parse(saved));
      } catch (error) {
        console.error('Error loading todos:', error);
      }
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('todoList_v2', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (!input.trim()) {
      toast.error('Please enter a task!');
      return;
    }

    const newTodo = {
      id: Date.now(),
      text: input,
      completed: false,
      createdAt: new Date(),
      dueDate: dueDate || null,
      priority
    };

    setTodos([newTodo, ...todos]);
    setInput('');
    setDueDate('');
    setPriority('medium');
    toast.success('Task added! ✅');
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(t => t.id !== id));
    toast.success('Task deleted! 🗑️');
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(t => 
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

  const startEdit = (id, text) => {
    setEditingId(id);
    setEditingText(text);
  };

  const saveEdit = (id) => {
    if (!editingText.trim()) {
      toast.error('Task cannot be empty!');
      return;
    }
    setTodos(todos.map(t => 
      t.id === id ? { ...t, text: editingText } : t
    ));
    setEditingId(null);
    toast.success('Task updated! ✏️');
  };

  // Filter and search
  let filtered = todos.filter(t => {
    const matchFilter = 
      filter === 'all' ? true :
      filter === 'active' ? !t.completed :
      filter === 'completed' ? t.completed :
      true;
    
    const matchSearch = t.text.toLowerCase().includes(searchTerm.toLowerCase());
    return matchFilter && matchSearch;
  });

  // Sort
  filtered = filtered.sort((a, b) => {
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    if (priorityOrder[b.priority] !== priorityOrder[a.priority]) {
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    }
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  const stats = {
    total: todos.length,
    completed: todos.filter(t => t.completed).length,
    active: todos.filter(t => !t.completed).length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <FaListCheck className="text-6xl text-indigo-600 animate-bounce mx-auto mb-4" />
          <h1 className="text-5xl font-bold text-gray-800 dark:text-white mb-2">My Todo List</h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">Stay organized and boost your productivity 🚀</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <StatCard title="Total" value={stats.total} color="blue" />
          <StatCard title="Active" value={stats.active} color="orange" />
          <StatCard title="Done" value={stats.completed} color="green" />
        </div>

        {/* Input Section */}
        <div className="bg-white dark:bg-slate-700 rounded-xl shadow-xl p-6 mb-8 space-y-4">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Add New Task</h2>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTodo()}
            placeholder="What needs to be done? 📝"
            className="w-full px-4 py-3 border-2 border-gray-300 dark:border-slate-500 dark:bg-slate-600 dark:text-white rounded-lg focus:border-indigo-500 outline-none text-lg"
          />
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">Due Date</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-slate-500 dark:bg-slate-600 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-slate-500 dark:bg-slate-600 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                <option value="low">Low 🟢</option>
                <option value="medium">Medium 🟡</option>
                <option value="high">High 🔴</option>
              </select>
            </div>
          </div>
          <button
            onClick={addTodo}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg transition flex items-center justify-center gap-2 text-lg"
          >
            <FaPlus /> Add Task
          </button>
        </div>

        {/* Search and Filter */}
        <div className="bg-white dark:bg-slate-700 rounded-xl shadow-lg p-6 mb-6 space-y-3">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="🔍 Search tasks..."
            className="w-full px-4 py-2 border border-gray-300 dark:border-slate-500 dark:bg-slate-600 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          />
          <div className="flex gap-2">
            {['all', 'active', 'completed'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  filter === f
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 dark:bg-slate-600 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
                }`}
              >
                {f === 'all' ? '📋 All' : f === 'active' ? '⏳ Active' : '✅ Done'}
              </button>
            ))}
          </div>
        </div>

        {/* Tasks List */}
        <div className="space-y-3">
          {filtered.length === 0 ? (
            <div className="bg-white dark:bg-slate-700 rounded-xl shadow-lg p-12 text-center">
              <FaListCheck className="text-6xl text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                {searchTerm ? 'No tasks match your search' : 'No tasks! Great job! 🎉'}
              </p>
            </div>
          ) : (
            filtered.map(todo => (
              <div
                key={todo.id}
                className={`bg-white dark:bg-slate-700 rounded-lg shadow-md p-4 hover:shadow-lg transition border-l-4 ${
                  todo.completed
                    ? 'border-gray-300'
                    : todo.priority === 'high'
                    ? 'border-red-500'
                    : todo.priority === 'medium'
                    ? 'border-yellow-500'
                    : 'border-green-500'
                }`}
              >
                <div className="flex gap-4 items-start">
                  <button
                    onClick={() => toggleTodo(todo.id)}
                    className={`mt-1 flex-shrink-0 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition ${
                      todo.completed
                        ? 'bg-green-500 border-green-500'
                        : 'border-gray-300 hover:border-indigo-500'
                    }`}
                  >
                    {todo.completed && <FaCheck className="text-white text-sm" />}
                  </button>

                  <div className="flex-1">
                    {editingId === todo.id ? (
                      <div className="space-y-2">
                        <input
                          type="text"
                          value={editingText}
                          onChange={(e) => setEditingText(e.target.value)}
                          className="w-full px-3 py-2 border-2 border-indigo-500 dark:bg-slate-600 dark:text-white rounded-lg outline-none"
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={() => saveEdit(todo.id)}
                            className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm font-semibold"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-500 text-sm font-semibold"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <p className={`font-semibold text-lg ${
                          todo.completed ? 'line-through text-gray-500' : 'text-gray-800 dark:text-gray-100'
                        }`}>
                          {todo.text}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <span className={`text-xs font-bold px-2 py-1 rounded ${
                            todo.priority === 'high' ? 'bg-red-100 text-red-800' :
                            todo.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {todo.priority === 'high' ? '🔴' : todo.priority === 'medium' ? '🟡' : '🟢'} {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
                          </span>
                          {todo.dueDate && (
                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded flex items-center gap-1 font-semibold">
                              <FaClock /> {new Date(todo.dueDate).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </>
                    )}
                  </div>

                  {editingId !== todo.id && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => startEdit(todo.id, todo.text)}
                        className="text-blue-600 hover:text-blue-800 text-lg transition"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => deleteTodo(todo.id)}
                        className="text-red-600 hover:text-red-800 text-lg transition"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Clear Completed */}
        {stats.completed > 0 && (
          <button
            onClick={() => {
              setTodos(todos.filter(t => !t.completed));
              toast.success('Cleaned up! 🧹');
            }}
            className="w-full mt-8 bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition"
          >
            Clear Completed Tasks 🧹
          </button>
        )}
      </div>
    </div>
  );
}

function StatCard({ title, value, color }) {
  const colors = {
    blue: 'bg-blue-100 text-blue-800',
    orange: 'bg-orange-100 text-orange-800',
    green: 'bg-green-100 text-green-800'
  };

  return (
    <div className={`${colors[color]} rounded-lg shadow p-4 text-center`}>
      <p className="text-xs font-semibold opacity-75">{title}</p>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
}

export default TodoList;