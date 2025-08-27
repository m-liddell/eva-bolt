import React from 'react';
import { ChevronLeft, BookOpen, Plus, X, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTeacherStore } from '../store/teacherStore';

const SUBJECTS = [
  'English', 'Mathematics', 'Science', 'History', 'Geography',
  'Modern Languages', 'Art', 'Music', 'Physical Education', 'Computing'
];

const YEAR_GROUPS = ['Year 7', 'Year 8', 'Year 9', 'Year 10', 'Year 11'];

export default function SubjectSpecialisms() {
  const router = useRouter();
  const { profile, updateProfile } = useTeacherStore();

  const handleMainSubjectChange = (subject: string) => {
    updateProfile({
      mainSubject: subject,
      // Remove from additional subjects if it becomes main subject
      additionalSubjects: profile.additionalSubjects.filter(s => s !== subject)
    });
  };

  const toggleAdditionalSubject = (subject: string) => {
    if (subject === profile.mainSubject) return;

    const newAdditionalSubjects = profile.additionalSubjects.includes(subject)
      ? profile.additionalSubjects.filter(s => s !== subject)
      : [...profile.additionalSubjects, subject];

    updateProfile({ additionalSubjects: newAdditionalSubjects });
  };

  const toggleYearGroup = (yearGroup: string) => {
    const newYearGroups = profile.yearGroups.includes(yearGroup)
      ? profile.yearGroups.filter(y => y !== yearGroup)
      : [...profile.yearGroups, yearGroup];

    updateProfile({ yearGroups: newYearGroups });
  };

  return (
    <div className="min-h-[calc(100vh-48px)] bg-[#F8F9FA]">
      <div className="max-w-[1400px] mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button 
             onClick={() => router.push('/settings')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-[#768396]">Subject Specialisms</h1>
              <p className="text-sm text-gray-600">Configure your teaching subjects and year groups</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Main Subject */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-[#FFF9E7] rounded-lg flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-[#FFC83D]" />
              </div>
              <h2 className="text-lg font-semibold text-gray-800">Main Teaching Subject</h2>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {SUBJECTS.map(subject => (
                <button
                  key={subject}
                  onClick={() => handleMainSubjectChange(subject)}
                  className={`p-3 rounded-lg border-2 transition-colors text-left ${
                    profile.mainSubject === subject
                      ? 'border-[#FFC83D] bg-[#FFF9E7]'
                      : 'border-gray-200 hover:border-[#FFC83D]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">{subject}</span>
                    {profile.mainSubject === subject && (
                      <Check className="w-4 h-4 text-[#FFC83D]" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Additional Subjects */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
                <Plus className="w-4 h-4 text-green-600" />
              </div>
              <h2 className="text-lg font-semibold text-gray-800">Additional Subjects</h2>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {SUBJECTS.map(subject => (
                <button
                  key={subject}
                  onClick={() => toggleAdditionalSubject(subject)}
                  disabled={subject === profile.mainSubject}
                  className={`p-3 rounded-lg border-2 transition-colors text-left ${
                    profile.additionalSubjects.includes(subject)
                      ? 'border-green-600 bg-green-50'
                      : subject === profile.mainSubject
                        ? 'border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed'
                        : 'border-gray-200 hover:border-green-600'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">{subject}</span>
                    {profile.additionalSubjects.includes(subject) && (
                      <Check className="w-4 h-4 text-green-600" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Year Groups */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-blue-600" />
              </div>
              <h2 className="text-lg font-semibold text-gray-800">Year Groups</h2>
            </div>
            <div className="grid grid-cols-5 gap-3">
              {YEAR_GROUPS.map(yearGroup => (
                <button
                  key={yearGroup}
                  onClick={() => toggleYearGroup(yearGroup)}
                  className={`p-3 rounded-lg border-2 transition-colors text-left ${
                    profile.yearGroups.includes(yearGroup)
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-600'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">{yearGroup}</span>
                    {profile.yearGroups.includes(yearGroup) && (
                      <Check className="w-4 h-4 text-blue-600" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}