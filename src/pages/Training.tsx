import React, { useState, useRef } from 'react';
import { ChevronLeft, Calendar, Clock, MapPin, GraduationCap, BookOpen, Users, ArrowRight, ChevronRight, CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Mock training sessions
const UPCOMING_SESSIONS = [
  {
    id: '1',
    title: 'Advanced Assessment Techniques',
    date: 'April 15, 2024',
    time: '14:00 - 16:00',
    location: 'Online',
    type: 'Virtual Workshop',
    subject: 'Cross-curricular',
    spaces: 12,
    booked: true
  },
  {
    id: '2',
    title: 'Differentiation Strategies',
    date: 'April 22, 2024',
    time: '09:30 - 15:30',
    location: 'Learning Centre, London',
    type: 'Full-day Workshop',
    subject: 'Teaching Methods',
    spaces: 8,
    booked: true
  },
  {
    id: '3',
    title: 'Digital Tools for Engagement',
    date: 'May 1, 2024',
    time: '16:00 - 17:30',
    location: 'Online',
    type: 'Webinar',
    subject: 'EdTech',
    spaces: 50,
    booked: true
  }
];

// Mock recommended training
const RECOMMENDED_TRAINING = [
  {
    id: '1',
    title: 'Assessment for Learning',
    provider: 'National Teaching Institute',
    duration: '6 weeks',
    format: 'Online Course',
    cost: '£299',
    subject: 'Assessment',
    level: 'Intermediate',
    startDate: 'May 15, 2024'
  },
  {
    id: '2',
    title: 'Behaviour Management Mastery',
    provider: 'Teaching Excellence Academy',
    duration: '2 days',
    format: 'In-person Workshop',
    cost: '£450',
    subject: 'Classroom Management',
    level: 'Advanced',
    startDate: 'June 3, 2024'
  },
  {
    id: '3',
    title: 'SEND Teaching Strategies',
    provider: 'Inclusive Education Institute',
    duration: '8 weeks',
    format: 'Blended Learning',
    cost: '£599',
    subject: 'Special Education',
    level: 'Advanced',
    startDate: 'September 1, 2024'
  },
  {
    id: '4',
    title: 'Digital Assessment Tools',
    provider: 'EdTech Academy',
    duration: '4 weeks',
    format: 'Online Course',
    cost: '£199',
    subject: 'Assessment',
    level: 'Intermediate',
    startDate: 'May 20, 2024'
  },
  {
    id: '5',
    title: 'Advanced Differentiation',
    provider: 'Teaching Excellence Academy',
    duration: '6 weeks',
    format: 'Blended Learning',
    cost: '£399',
    subject: 'Teaching Methods',
    level: 'Advanced',
    startDate: 'June 10, 2024'
  }
];

export default function Training() {
  const router = useRouter();
  const [upcomingIndex, setUpcomingIndex] = useState(0);
  const [recommendedIndex, setRecommendedIndex] = useState(0);

  const handleUpcomingPrev = () => {
    setUpcomingIndex(prev => Math.max(0, prev - 1));
  };

  const handleUpcomingNext = () => {
    setUpcomingIndex(prev => Math.min(UPCOMING_SESSIONS.length - 1, prev + 1));
  };

  const handleRecommendedPrev = () => {
    setRecommendedIndex(prev => Math.max(0, prev - 1));
  };

  const handleRecommendedNext = () => {
    setRecommendedIndex(prev => Math.min(RECOMMENDED_TRAINING.length - 1, prev + 1));
  };

  return (
    <div className="min-h-[calc(100vh-48px)] bg-[#F8F9FA]">
      <div className="max-w-[1400px] mx-auto px-4 py-6">
        <div className="flex items-center gap-4 mb-6">
          <button 
            onClick={() => router.push('/')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-[#768396]">Professional Development</h1>
            <p className="text-sm text-gray-600">Enhance your teaching practice with targeted training</p>
          </div>
        </div>

        {/* Upcoming Sessions Panel */}
        <div className="bg-white rounded-lg border border-[#A4AAB2] p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Upcoming Training Sessions</h2>
          <div className="relative">
            <button
              onClick={handleUpcomingPrev}
              disabled={upcomingIndex === 0}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center z-10 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div className="flex gap-4">
              {UPCOMING_SESSIONS.slice(upcomingIndex, upcomingIndex + 3).map(session => (
                <div 
                  key={session.id} 
                  className="bg-white rounded-lg border border-gray-200 p-4 w-1/3"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="px-2 py-1 bg-[#FFF9E7] text-[#FFC83D] rounded text-xs font-medium">
                      {session.type}
                    </div>
                    <div className={`px-2 py-1 rounded text-xs font-medium ${
                      session.booked 
                        ? 'bg-green-50 text-green-600'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {session.booked ? 'Booked' : `${session.spaces} spaces left`}
                    </div>
                  </div>
                  <h3 className="font-medium text-gray-800 mb-3">{session.title}</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>{session.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>{session.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{session.location}</span>
                    </div>
                  </div>
                  {session.booked && (
                    <div className="mt-4 flex items-center gap-2 text-green-600">
                      <CheckCircle2 className="w-4 h-4" />
                      <span className="text-sm font-medium">Session Confirmed</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <button
              onClick={handleUpcomingNext}
              disabled={upcomingIndex >= UPCOMING_SESSIONS.length - 3}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center z-10 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Recommended Training Panel */}
        <div className="bg-white rounded-lg border border-[#A4AAB2] p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Recommended for You</h2>
          <div className="relative">
            <button
              onClick={handleRecommendedPrev}
              disabled={recommendedIndex === 0}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center z-10 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div className="flex gap-4">
              {RECOMMENDED_TRAINING.slice(recommendedIndex, recommendedIndex + 3).map(training => (
                <div 
                  key={training.id} 
                  className="bg-white rounded-lg border border-gray-200 p-4 w-1/3"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="px-2 py-1 bg-[#FFF9E7] text-[#FFC83D] rounded text-xs font-medium">
                      {training.subject}
                    </div>
                    <div className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-medium">
                      {training.level}
                    </div>
                  </div>
                  <h3 className="font-medium text-gray-800 mb-3">{training.title}</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <GraduationCap className="w-4 h-4" />
                      <span>{training.provider}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>{training.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <BookOpen className="w-4 h-4" />
                      <span>{training.format}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>Starts {training.startDate}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <span className="font-medium text-gray-900">{training.cost}</span>
                    <button className="flex items-center gap-1 text-[#FFC83D] hover:text-[#E6B434] transition-colors">
                      <span>Learn More</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={handleRecommendedNext}
              disabled={recommendedIndex >= RECOMMENDED_TRAINING.length - 3}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center z-10 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}