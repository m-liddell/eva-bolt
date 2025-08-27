import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Target, Search } from 'lucide-react';

// Generate 30 mock students with random ratings
const MOCK_STUDENTS = Array.from({ length: 30 }, (_, i) => {
  const ratings = ['green', 'amber', 'red'];
  const names = [
    'Alice', 'Bob', 'Charlie', 'David', 'Emma', 'Frank', 'Grace', 'Henry', 'Ivy', 'Jack',
    'Kate', 'Liam', 'Mia', 'Noah', 'Olivia', 'Peter', 'Quinn', 'Rachel', 'Sam', 'Tara',
    'Uma', 'Victor', 'Wendy', 'Xavier', 'Yara', 'Zack', 'Adam', 'Beth', 'Carl', 'Diana'
  ];
  const surnames = [
    'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez',
    'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin',
    'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson'
  ];
  return {
    id: i + 1,
    name: `${names[i]} ${surnames[i]}`,
    rating: ratings[Math.floor(Math.random() * ratings.length)]
  };
});

const LEARNING_OBJECTIVE = 'To analyze how writers use language and structure to create tension in dystopian narratives.';

export default function StudentSelfAssessment() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const getRatingStyle = (rating: string) => {
    switch (rating) {
      case 'green':
        return 'bg-green-500';
      case 'amber':
        return 'bg-amber-500';
      case 'red':
        return 'bg-red-500';
      default:
        return 'bg-gray-300';
    }
  };

  const filteredStudents = MOCK_STUDENTS.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Group students by rating
  const groupedStudents = {
    green: filteredStudents.filter(student => student.rating === 'green'),
    amber: filteredStudents.filter(student => student.rating === 'amber'),
    red: filteredStudents.filter(student => student.rating === 'red')
  };

  return (
    <div className="min-h-[calc(100vh-48px)] bg-[#F8F9FA]">
      <div className="max-w-[1400px] mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button 
             onClick={() => router.push('/assess')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-[#768396]">Student Self-Assessments</h1>
              <p className="text-sm text-gray-600">View how students rated their understanding</p>
            </div>
          </div>
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search students..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC83D] w-64"
            />
          </div>
        </div>

        {/* Learning Objective */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-[#FFF9E7] rounded-lg flex items-center justify-center">
              <Target className="w-4 h-4 text-[#FFC83D]" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Learning Objective</h3>
          </div>
          <p className="text-gray-700">{LEARNING_OBJECTIVE}</p>
        </div>

        {/* Student Grid - Grouped by rating */}
        <div className="space-y-6">
          {/* Green - Good Understanding */}
          {groupedStudents.green.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-green-600 mb-3">Good Understanding ({groupedStudents.green.length} students)</h3>
              <div className="grid grid-cols-6 gap-4">
                {groupedStudents.green.map(student => (
                  <div 
                    key={student.id}
                    className="bg-white rounded-lg border border-gray-200 p-4 flex items-center justify-between"
                  >
                    <span className="text-sm text-gray-900">{student.name}</span>
                    <div className={`w-3 h-3 rounded-full ${getRatingStyle(student.rating)}`} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Amber - Some Support Needed */}
          {groupedStudents.amber.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-amber-600 mb-3">Some Support Needed ({groupedStudents.amber.length} students)</h3>
              <div className="grid grid-cols-6 gap-4">
                {groupedStudents.amber.map(student => (
                  <div 
                    key={student.id}
                    className="bg-white rounded-lg border border-gray-200 p-4 flex items-center justify-between"
                  >
                    <span className="text-sm text-gray-900">{student.name}</span>
                    <div className={`w-3 h-3 rounded-full ${getRatingStyle(student.rating)}`} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Red - Needs Help */}
          {groupedStudents.red.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-red-600 mb-3">Needs Help ({groupedStudents.red.length} students)</h3>
              <div className="grid grid-cols-6 gap-4">
                {groupedStudents.red.map(student => (
                  <div 
                    key={student.id}
                    className="bg-white rounded-lg border border-gray-200 p-4 flex items-center justify-between"
                  >
                    <span className="text-sm text-gray-900">{student.name}</span>
                    <div className={`w-3 h-3 rounded-full ${getRatingStyle(student.rating)}`} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}