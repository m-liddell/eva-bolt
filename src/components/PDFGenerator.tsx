'use client';

import React from 'react';
import { Download, FileText, Printer } from 'lucide-react';

interface StudentActivity {
  id: string;
  title: string;
  learning_objective: string;
  duration: string;
  year_group: string;
  success_criteria: string[];
  differentiation: {
    support: string[];
    extension: string[];
  };
  pdf_content: {
    header: string;
    instructions: string[];
    worksheet_sections: {
      title: string;
      content: string;
      space_for_answers: boolean;
    }[];
    footer: string;
  };
  tasks?: {
    points?: number;
  }[];
}

interface PDFGeneratorProps {
  activity: StudentActivity;
  className?: string;
}

export function PDFGenerator({ activity, className = '' }: PDFGeneratorProps) {
  const generatePDF = () => {
    const pdfContent = `
${activity.pdf_content.header}

Learning Objective: ${activity.learning_objective}
Duration: ${activity.duration}
Year Group: ${activity.year_group}

INSTRUCTIONS:
${activity.pdf_content.instructions.map(instruction => `• ${instruction}`).join('\n')}

${activity.pdf_content.worksheet_sections.map((section, index) => `
${section.title}
${'='.repeat(section.title.length)}

${section.content}

${section.space_for_answers ? `
Answer Space:
_________________________________________________
_________________________________________________
_________________________________________________
_________________________________________________
_________________________________________________

` : ''}
`).join('\n')}

SUCCESS CRITERIA:
${activity.success_criteria.map(criteria => `• ${criteria}`).join('\n')}

DIFFERENTIATION:
Support:
${activity.differentiation.support.map(item => `• ${item}`).join('\n')}

Extension:
${activity.differentiation.extension.map(item => `• ${item}`).join('\n')}

${activity.pdf_content.footer}

Generated on: ${new Date().toLocaleDateString('en-GB')}
    `;

    const blob = new Blob([pdfContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${activity.title.replace(/\s+/g, '-').toLowerCase()}-worksheet.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const printWorksheet = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>${activity.title} - Worksheet</title>
            <style>
              body { 
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
                margin: 0; 
                padding: 20px; 
                line-height: 1.6; 
                color: #333;
                background-color: #fafafa;
              }
              .page-container {
                max-width: 800px;
                margin: 0 auto;
                background: white;
                box-shadow: 0 0 20px rgba(0,0,0,0.1);
                border-radius: 8px;
                overflow: hidden;
              }
              .header { 
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                text-align: center; 
                padding: 30px 20px;
                margin-bottom: 0;
              }
              .header h1 {
                margin: 0 0 10px 0;
                font-size: 24px;
                font-weight: 700;
              }
              .header .meta {
                font-size: 14px;
                opacity: 0.9;
                margin: 5px 0;
              }
              .content-area {
                padding: 30px;
              }
              .section { 
                margin-bottom: 30px; 
                page-break-inside: avoid;
                border: 2px solid #e1e5e9;
                border-radius: 8px;
                overflow: hidden;
                background: white;
              }
              .section-header {
                background: linear-gradient(90deg, #f8f9fa 0%, #e9ecef 100%);
                padding: 15px 20px;
                border-bottom: 2px solid #e1e5e9;
              }
              .section-title { 
                font-weight: 700; 
                font-size: 18px; 
                margin: 0;
                color: #495057;
                display: flex;
                align-items: center;
                gap: 10px;
              }
              .section-number {
                background: #667eea;
                color: white;
                width: 28px;
                height: 28px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 14px;
                font-weight: bold;
              }
              .section-content {
                padding: 20px;
              }
              .content { 
                margin-bottom: 15px; 
                font-size: 15px;
                line-height: 1.6;
              }
              .answer-space { 
                border-bottom: 2px solid #dee2e6; 
                margin: 12px 0; 
                height: 25px;
                position: relative;
              }
              .answer-space::before {
                content: '';
                position: absolute;
                left: 0;
                bottom: -1px;
                width: 100%;
                height: 1px;
                background: linear-gradient(90deg, #667eea 0%, transparent 100%);
              }
              .instructions { 
                background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
                padding: 20px; 
                border-radius: 8px; 
                margin-bottom: 25px;
                border: 2px solid #2196f3;
                position: relative;
              }
              .instructions::before {
                content: '📋';
                position: absolute;
                top: -15px;
                left: 20px;
                background: white;
                padding: 5px 10px;
                border-radius: 20px;
                border: 2px solid #2196f3;
                font-size: 16px;
              }
              .instructions h3 {
                margin-top: 0;
                color: #1565c0;
                font-size: 18px;
              }
              .success-criteria { 
                background: linear-gradient(135deg, #e8f5e8 0%, #c8e6c8 100%);
                padding: 20px; 
                border-radius: 8px; 
                border: 2px solid #4caf50;
                position: relative;
                margin-top: 25px;
              }
              .success-criteria::before {
                content: '🎯';
                position: absolute;
                top: -15px;
                left: 20px;
                background: white;
                padding: 5px 10px;
                border-radius: 20px;
                border: 2px solid #4caf50;
                font-size: 16px;
              }
              .success-criteria h3 {
                margin-top: 0;
                color: #2e7d32;
                font-size: 18px;
              }
              .differentiation {
                background: linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%);
                padding: 20px;
                border-radius: 8px;
                border: 2px solid #ff9800;
                margin: 20px 0;
                position: relative;
              }
              .differentiation::before {
                content: '🔧';
                position: absolute;
                top: -15px;
                left: 20px;
                background: white;
                padding: 5px 10px;
                border-radius: 20px;
                border: 2px solid #ff9800;
                font-size: 16px;
              }
              .differentiation h3 {
                margin-top: 0;
                color: #e65100;
                font-size: 18px;
              }
              .diff-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 15px;
                margin-top: 15px;
              }
              .diff-section {
                padding: 15px;
                border-radius: 6px;
                border: 1px solid #ffcc02;
              }
              .diff-support {
                background: #fff8e1;
              }
              .diff-extension {
                background: #f3e5f5;
              }
              ul { 
                margin: 10px 0; 
                padding-left: 25px;
              }
              li {
                margin-bottom: 8px;
                position: relative;
              }
              li::marker {
                color: #667eea;
                font-weight: bold;
              }
              .footer {
                text-align: center;
                margin-top: 40px;
                padding: 20px;
                background: linear-gradient(90deg, #f8f9fa 0%, #e9ecef 100%);
                border-top: 3px solid #667eea;
                font-size: 14px;
                color: #6c757d;
                border-radius: 0 0 8px 8px;
              }
              .task-points {
                float: right;
                background: #667eea;
                color: white;
                padding: 4px 12px;
                border-radius: 15px;
                font-size: 12px;
                font-weight: bold;
              }
              @media print { 
                body { margin: 0; background: white; } 
                .no-print { display: none; }
                .page-container { box-shadow: none; }
              }
            </style>
          </head>
          <body>
            <div class="page-container">
              <div class="header">
                <h1>${activity.pdf_content.header}</h1>
                <div class="meta">
                  <div><strong>Learning Objective:</strong> ${activity.learning_objective}</div>
                  <div><strong>Duration:</strong> ${activity.duration} | <strong>Year Group:</strong> ${activity.year_group} | <strong>Subject:</strong> ${activity.subject}</div>
                </div>
              </div>

              <div class="content-area">
                <div class="instructions">
                  <h3>Instructions</h3>
                  <ul>
                    ${activity.pdf_content.instructions.map(instruction => `<li>${instruction}</li>`).join('')}
                  </ul>
                </div>

                ${activity.pdf_content.worksheet_sections.map((section, index) => `
                  <div class="section">
                    <div class="section-header">
                      <div class="section-title">
                        <div class="section-number">${index + 1}</div>
                        ${section.title}
                        ${activity.tasks && activity.tasks[index]?.points ? `<span class="task-points">${activity.tasks[index].points} points</span>` : ''}
                      </div>
                    </div>
                    <div class="section-content">
                      <div class="content">${section.content.replace(/\n/g, '<br>')}</div>
                      ${section.space_for_answers ? `
                        <div style="margin-top: 20px;">
                          <div class="answer-space"></div>
                          <div class="answer-space"></div>
                          <div class="answer-space"></div>
                          <div class="answer-space"></div>
                          <div class="answer-space"></div>
                        </div>
                      ` : ''}
                    </div>
                  </div>
                `).join('')}

                <div class="success-criteria">
                  <h3>Success Criteria</h3>
                  <ul>
                    ${activity.success_criteria.map(criteria => `<li>${criteria}</li>`).join('')}
                  </ul>
                </div>

                <div class="differentiation">
                  <h3>Differentiation</h3>
                  <div class="diff-grid">
                    <div class="diff-section diff-support">
                      <h4 style="margin-top: 0; color: #e65100;">Support:</h4>
                      <ul>
                        ${activity.differentiation.support.map(item => `<li>${item}</li>`).join('')}
                      </ul>
                    </div>
                    <div class="diff-section diff-extension">
                      <h4 style="margin-top: 0; color: #4a148c;">Extension:</h4>
                      <ul>
                        ${activity.differentiation.extension.map(item => `<li>${item}</li>`).join('')}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div class="footer">
                <div>${activity.pdf_content.footer}</div>
                <div style="margin-top: 10px; font-size: 12px;">Generated on: ${new Date().toLocaleDateString('en-GB')} | EVA Teaching Platform</div>
              </div>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <button
        onClick={generatePDF}
        className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 text-sm"
      >
        <Download className="w-4 h-4" />
        <span>Download PDF</span>
      </button>
      <button
        onClick={printWorksheet}
        className="px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2 text-sm"
      >
        <Printer className="w-4 h-4" />
        <span>Print</span>
      </button>
    </div>
  );
}