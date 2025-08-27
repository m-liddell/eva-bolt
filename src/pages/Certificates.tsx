import React, { useState } from 'react';
import { ChevronLeft, Award, Download, Calendar, Clock, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Mock certificates
const CERTIFICATES = [
  {
    id: '1',
    title: 'Advanced Assessment Techniques',
    provider: 'National Teaching Institute',
    completionDate: 'March 15, 2024',
    duration: '6 weeks',
    type: 'Professional Certificate',
    status: 'completed'
  },
  {
    id: '2',
    title: 'Digital Learning Fundamentals',
    provider: 'EdTech Academy',
    completionDate: 'January 10, 2024',
    duration: '4 weeks',
    type: 'Course Certificate',
    status: 'completed'
  },
  {
    id: '3',
    title: 'Behaviour Management in Practice',
    provider: 'Teaching Excellence Academy',
    completionDate: 'In Progress',
    duration: '8 weeks',
    type: 'Professional Certificate',
    status: 'in-progress',
    progress: 75
  }
];

export default function MyCertificates() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCertificates = CERTIFICATES.filter(cert => 
    cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cert.provider.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
              <h1 className="text-2xl font-bold text-[#768396]">My Certificates</h1>
              <p className="text-sm text-gray-600">View and download your training certificates</p>
            </div>
          </div>
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search certificates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC83D] w-64"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {filteredCertificates.map(certificate => (
            <div key={certificate.id} className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="px-2 py-1 bg-[#FFF9E7] text-[#FFC83D] rounded text-xs font-medium">
                  {certificate.type}
                </div>
                {certificate.status === 'in-progress' ? (
                  <div className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-xs font-medium">
                    {certificate.progress}% Complete
                  </div>
                ) : (
                  <Award className="w-5 h-5 text-[#FFC83D]" />
                )}
              </div>
              <h3 className="font-medium text-gray-800 mb-3">{certificate.title}</h3>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">{certificate.provider}</p>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>{certificate.completionDate}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>{certificate.duration}</span>
                </div>
              </div>
              {certificate.status === 'completed' && (
                <button className="flex items-center gap-2 mt-4 px-4 py-2 bg-[#FFC83D] text-white rounded-lg hover:bg-[#E6B434] transition-colors w-full justify-center">
                  <Download className="w-4 h-4" />
                  <span>Download Certificate</span>
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}