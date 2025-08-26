import React, { useState } from 'react';
import { ChevronLeft, Search, Users, BookOpen, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Sample data
const SAMPLE_CLASSES = [
  {
    id: '1',
    name: '10A',
    subject: 'English',
    yearGroup: 'Year 10',
    academicYear: '2024-25',
    students: 28,
    topics: [
      'Victorian Literature',
      'Poetry Analysis',
      'Creative Writing'
    ]
  },
  {
    id: '2',
    name: '9B',
    subject: 'Science',
    yearGroup: 'Year 9',
    academicYear: '2024-25',
    students: 25,
    topics: [
      'Energy Conservation',
      'Chemical Reactions',
      'Forces and Motion'
    ]
  },
  {
    id: '3',
    name: '11C',
    subject: 'History',
    yearGroup: 'Year 11',
    academicYear: '2024-25',
    students: 26,
    topics: [
      'Industrial Revolution',
      'World War II',
      'Cold War'
    ]
  },
  {
    id: '4',
    name: '10D',
    subject: 'Mathematics',
    yearGroup: 'Year 10',
    academicYear: '2024-25',
    students: 24,
    topics: [
      'Algebra',
      'Geometry',
      'Statistics'
    ]
  }
];

const YEAR_GROUPS = ['Year 7', 'Year 8', 'Year 9', 'Year 10', 'Year 11'];
const SUBJECTS = [
  'English', 'Mathematics', 'Science', 'History', 'Geography',
  'Modern Languages', 'Art', 'Music', 'Physical Education', 'Computing'
];

export default function ClassInformation() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYearGroup, setSelectedYearGroup] = useState<string | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  const filteredClasses = SAMPLE_CLASSES.filter(cls => {
    const matchesSearch = 
      cls.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cls.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cls.yearGroup.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesYearGroup = !selectedYearGroup || cls.yearGroup === selectedYearGroup;
    const matchesSubject = !selectedSubject || cls.subject === selectedSubject;

    return matchesSearch && matchesYearGroup && matchesSubject;
  });

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
              <h1 className="text-2xl font-bold text-[#768396]">Class Information</h1>
              <p className="text-sm text-gray-600">Academic Year 2024-25</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <select
                value={selectedYearGroup || ''}
                onChange={(e) => setSelectedYearGroup(e.target.value || null)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC83D]"
              >
                <option value="">All Year Groups</option>
                {YEAR_GROUPS.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
              <select
                value={selectedSubject || ''}
                onChange={(e) => setSelectedSubject(e.target.value || null)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC83D]"
              >
                <option value="">All Subjects</option>
                {SUBJECTS.map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
            </div>
            <div className="relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search classes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC83D] w-64"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {filteredClasses.map(cls => (
              <div
                key={cls.id}
                className="p-4 border border-gray-200 rounded-lg hover:border-[#FFC83D] transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-medium text-gray-900">{cls.name}</h3>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-sm text-gray-600">{cls.subject}</span>
                      <span className="text-sm text-gray-600">{cls.yearGroup}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Users className="w-4 h-4" />
                    <span>{cls.students} students</span>
                  </div>
                </div>

                <div className="space-y-2 mt-4">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-[#FFC83D]" />
                    <span className="text-sm font-medium text-gray-700">Topics</span>
                  </div>
                  <div className="space-y-1">
                    {cls.topics.map((topic, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                        <span className="text-sm text-gray-600">{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => navigate('/my-timetable')}
                    className="text-sm text-[#FFC83D] hover:text-[#E6B434] transition-colors"
                  >
                    View in Planning
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}