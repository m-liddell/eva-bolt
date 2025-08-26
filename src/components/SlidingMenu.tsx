import React, { useState } from 'react';
import { X, Home, BookOpen, GraduationCap, ClipboardList, Brain, FileText, Settings, Library, Calendar, Users, Target, BarChart2, ChevronDown } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface SlidingMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MenuItem {
  icon: React.ElementType;
  label: string;
  path: string;
  subItems?: {
    label: string;
    path: string;
  }[];
}

export function SlidingMenu({ isOpen, onClose }: SlidingMenuProps) {
  const navigate = useNavigate();
  const menuItems: MenuItem[] = [
    { 
      icon: Home, 
      label: 'Home', 
      path: '/' 
    },
    { 
      icon: BookOpen, 
      label: 'Plan', 
      path: '/my-timetable',
      subItems: [
        { label: 'My Timetable', path: '/my-timetable' },
        { label: 'Curriculum Objectives', path: '/curriculum-objectives' },
        { label: 'Resources', path: '/resources' },
        { label: 'Approve Week', path: '/approve-week' }
      ]
    },
    { 
      icon: GraduationCap, 
      label: 'Teach', 
      path: '/weekly-timetable',
      subItems: [
        { label: 'This Week\'s Lessons', path: '/weekly-timetable' },
        { label: 'My Timetable', path: '/weekly-timetable' },
        { label: 'Quick-Start', path: '/quick-start' }
      ]
    },
    { 
      icon: ClipboardList, 
      label: 'Assess', 
      path: '/assess',
      subItems: [
        { label: 'Quick Assessment', path: '/assess' },
        { label: 'Detailed Assessment', path: '/detailed-assessment' },
        { label: 'Design Assessment', path: '/assessment-design' }
      ]
    },
    { 
      icon: Brain, 
      label: 'Train', 
      path: '/training',
      subItems: [
        { label: 'Training Courses', path: '/training' },
        { label: 'My Certificates', path: '/certificates' }
      ]
    },
    { 
      icon: FileText, 
      label: 'Report', 
      path: '/teaching-patterns',
      subItems: [
        { label: 'My Statistics', path: '/teaching-patterns' },
        { label: 'Student Reports', path: '/end-of-year' }
      ]
    },
    {
      icon: Settings,
      label: 'Settings',
      path: '/settings'
    }
  ];

  const adminItems: MenuItem[] = [
    { 
      icon: Library, 
      label: 'Lesson Library', 
      path: '/admin/lesson-library' 
    }
  ];

  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const handleItemClick = (item: MenuItem) => {
    if (item.subItems) {
      setExpandedItem(expandedItem === item.label ? null : item.label);
    } else {
      navigate(item.path);
      onClose();
    }
  };

  return (
    <div className={`fixed inset-0 z-50 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="absolute inset-0 bg-black bg-opacity-25" onClick={onClose} />
      
      <div className={`absolute top-0 left-0 w-64 h-full bg-white shadow-lg transform transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <Link 
              to="/"
              onClick={onClose}
              className="text-lg font-bold text-[#FFC83D]"
            >
              EVA
            </Link>
            <button 
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-lg"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.label}>
                <div className="space-y-1">
                  {item.subItems ? (
                    <button
                      onClick={() => handleItemClick(item)}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-700"
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className="w-5 h-5" />
                        <span>{item.label}</span>
                      </div>
                      <ChevronDown 
                        className={`w-4 h-4 transition-transform ${expandedItem === item.label ? 'rotate-180' : ''}`}
                      />
                    </button>
                  ) : (
                    <Link
                      to={item.path}
                      onClick={onClose}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-700"
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </Link>
                  )}
                  
                  {item.subItems && expandedItem === item.label && (
                    <ul className="ml-8 space-y-1">
                      {item.subItems.map((subItem) => (
                        <li key={subItem.path}>
                          <Link
                            to={subItem.path}
                            className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg"
                            onClick={onClose}
                          >
                            {subItem.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="px-3 text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
              Admin
            </h3>
            <ul className="space-y-2">
              {adminItems.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.path}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-700"
                    onClick={onClose}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
}