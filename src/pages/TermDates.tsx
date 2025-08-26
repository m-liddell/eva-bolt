import React, { useState, useEffect } from 'react';
import { ChevronLeft, Calendar, Plus, Trash2, AlertCircle, X, Edit2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTermStore, TERMS } from '../store/termStore';

interface Term {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  type: 'term' | 'holiday' | 'inset';
}

interface TermFormData {
  name: string;
  startDate: string;
  endDate: string;
  type: Term['type'];
}

export default function TermDates() {
  const navigate = useNavigate();
  const [currentYear, setCurrentYear] = useState('2024-25');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingTermId, setEditingTermId] = useState<string | null>(null);
  const [formData, setFormData] = useState<TermFormData>({
    name: '',
    startDate: '',
    endDate: '',
    type: 'term'
  });

  const updateTerm = useTermStore(state => state.updateTerm);

  // Example term data
  const [terms, setTerms] = useState<Term[]>([
    {
      id: '1',
      name: 'Autumn Term 1',
      startDate: '2024-09-02',
      endDate: '2024-10-18',
      type: 'term'
    },
    {
      id: '2',
      name: 'October Half Term',
      startDate: '2024-10-21',
      endDate: '2024-11-01',
      type: 'holiday'
    },
    {
      id: '3',
      name: 'INSET Day',
      startDate: '2024-11-04',
      endDate: '2024-11-04',
      type: 'inset'
    }
  ]);

  // Update term store when term dates change
  useEffect(() => {
    const autumnTerm1 = terms.find(term => 
      term.type === 'term' && term.name.toLowerCase().includes('autumn term 1')
    );

    if (autumnTerm1) {
      updateTerm('Autumn 1', {
        name: autumnTerm1.name,
        startDate: autumnTerm1.startDate,
        endDate: autumnTerm1.endDate,
        weeks: 0 // This will be calculated by the store
      });
    }
  }, [terms, updateTerm]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getTypeStyle = (type: Term['type']) => {
    switch (type) {
      case 'term':
        return 'bg-[#FFF9E7] text-[#FFC83D]';
      case 'holiday':
        return 'bg-green-50 text-green-600';
      case 'inset':
        return 'bg-blue-50 text-blue-600';
      default:
        return 'bg-gray-50 text-gray-600';
    }
  };

  const handleDelete = (termId: string) => {
    setTerms(terms.filter(term => term.id !== termId));
    setShowDeleteConfirm(null);
  };

  const handleEdit = (term: Term) => {
    setEditingTermId(term.id);
    setFormData({
      name: term.name,
      startDate: term.startDate,
      endDate: term.endDate,
      type: term.type
    });
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingTermId) {
      // Update existing term
      setTerms(terms.map(term => 
        term.id === editingTermId 
          ? { ...term, ...formData }
          : term
      ));
    } else {
      // Add new term
      const newTerm: Term = {
        id: Math.random().toString(36).substr(2, 9),
        ...formData
      };
      setTerms([...terms, newTerm]);
    }

    // Reset form
    setFormData({
      name: '',
      startDate: '',
      endDate: '',
      type: 'term'
    });
    setEditingTermId(null);
    setShowForm(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddNew = () => {
    setEditingTermId(null);
    setFormData({
      name: '',
      startDate: '',
      endDate: '',
      type: 'term'
    });
    setShowForm(true);
  };

  return (
    <div className="min-h-[calc(100vh-48px)] bg-[#F8F9FA]">
      <div className="max-w-[1400px] mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/settings')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-[#768396]">Term Dates</h1>
              <p className="text-sm text-gray-600">Configure academic calendar for {currentYear}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={currentYear}
              onChange={(e) => setCurrentYear(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC83D]"
            >
              <option value="2023-24">2023-24</option>
              <option value="2024-25">2024-25</option>
              <option value="2025-26">2025-26</option>
            </select>
            <button 
              onClick={handleAddNew}
              className="px-4 py-2 bg-[#FFC83D] text-white rounded-lg hover:bg-[#E6B434] transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Date</span>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <div className="grid grid-cols-4 gap-4">
              <div className="text-sm font-medium text-gray-600">Name</div>
              <div className="text-sm font-medium text-gray-600">Start Date</div>
              <div className="text-sm font-medium text-gray-600">End Date</div>
              <div className="text-sm font-medium text-gray-600">Actions</div>
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            {terms.map((term) => (
              <div key={term.id} className="p-4">
                <div className="grid grid-cols-4 gap-4">
                  <div className="flex items-center gap-3">
                    <div className={`px-2 py-1 rounded text-xs font-medium ${getTypeStyle(term.type)}`}>
                      {term.type.charAt(0).toUpperCase() + term.type.slice(1)}
                    </div>
                    <span className="text-sm text-gray-800">{term.name}</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    {formatDate(term.startDate)}
                  </div>
                  <div className="text-sm text-gray-600">
                    {formatDate(term.endDate)}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(term)}
                      className="p-2 hover:bg-[#FFF9E7] text-[#FFC83D] rounded-lg transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setShowDeleteConfirm(term.id)}
                      className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add/Edit Term Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-full max-w-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  {editingTermId ? 'Edit Date' : 'Add New Date'}
                </h3>
                <button
                  onClick={() => {
                    setShowForm(false);
                    setEditingTermId(null);
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC83D]"
                    required
                  >
                    <option value="term">Term</option>
                    <option value="holiday">Holiday</option>
                    <option value="inset">INSET Day</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC83D]"
                    placeholder="e.g., Autumn Term 1"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC83D]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC83D]"
                    required
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setEditingTermId(null);
                    }}
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-[#FFC83D] hover:bg-[#E6B434] rounded-lg transition-colors"
                  >
                    {editingTermId ? 'Save Changes' : 'Add Date'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-full max-w-md p-6">
              <div className="flex items-start gap-3 mb-6">
                <div className="p-2 bg-red-100 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Delete Date</h3>
                  <p className="text-sm text-gray-600">
                    Are you sure you want to delete this date? This action cannot be undone.
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => showDeleteConfirm && handleDelete(showDeleteConfirm)}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}