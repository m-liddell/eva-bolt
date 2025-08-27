import React from 'react';
import { ChevronLeft, Calendar, Settings as SettingsIcon, Bell, Users, Lock, ChevronRight, BookOpen } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Settings() {
  const router = useRouter();

  const settingsSections = [
    {
      id: 'calendar',
      title: 'Calendar & Term Dates',
      description: 'Configure academic year, term dates, and holidays',
      icon: Calendar,
      link: '/settings/term-dates',
      color: 'bg-[#FFF9E7] text-[#FFC83D]'
    },
    {
      id: 'classes',
      title: 'Class Information',
      description: 'Manage classes, students, and academic progress',
      icon: Users,
      link: '/settings/class-information',
      color: 'bg-green-50 text-green-600'
    },
    {
      id: 'subjects',
      title: 'Subject Specialisms',
      description: 'Set your main teaching subject and additional subjects',
      icon: BookOpen,
      link: '/settings/subject-specialisms',
      color: 'bg-blue-50 text-blue-600'
    },
    {
      id: 'notifications',
      title: 'Notifications',
      description: 'Manage email and in-app notifications',
      icon: Bell,
      link: '/settings/notifications',
      color: 'bg-purple-50 text-purple-600'
    },
    {
      id: 'security',
      title: 'Security',
      description: 'Manage security settings and permissions',
      icon: Lock,
      link: '/settings/security',
      color: 'bg-orange-50 text-orange-600'
    }
  ];

  return (
    <div className="min-h-[calc(100vh-48px)] bg-[#F8F9FA]">
      <div className="max-w-[1400px] mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => router.push('/')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-[#768396]">Settings</h1>
              <p className="text-sm text-gray-600">Configure your teaching environment</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {settingsSections.map(section => (
            <button
              key={section.id}
              onClick={() => router.push(section.link)}
              className="bg-white rounded-lg border border-gray-200 p-6 text-left hover:border-[#FFC83D] transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-lg ${section.color} flex items-center justify-center`}>
                  <section.icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-800">{section.title}</h2>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{section.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}