
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Download, Share2, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DocumentPreview = () => {
  const navigate = useNavigate();

  const documentContent = {
    title: "Legal Consultation Summary",
    date: "June 20, 2025",
    caseType: "Divorce",
    sections: [
      {
        title: "Case Overview",
        content: "This document summarizes the legal consultation regarding the divorce proceedings between the parties. The consultation covered key aspects including asset division, child custody arrangements, and spousal support considerations."
      },
      {
        title: "Key Issues Discussed",
        content: `1. Property Division:
- Marital home valued at $450,000
- Joint savings account balance: $75,000
- Retirement accounts and investments

2. Child Custody:
- Primary custody arrangements
- Visitation schedule
- Child support calculations

3. Spousal Support:
- Duration and amount considerations
- Income disparity analysis
- Educational support requirements`
      },
      {
        title: "Recommended Next Steps",
        content: `1. Gather financial documentation:
   - Bank statements (last 6 months)
   - Tax returns (last 3 years)
   - Property appraisals
   - Employment records

2. Schedule mediation session
3. Review and sign retainer agreement
4. Begin formal divorce proceedings`
      },
      {
        title: "Legal Considerations",
        content: "Based on the consultation, this case appears to be suitable for mediation given the cooperative nature of both parties. The estimated timeline for completion is 6-8 months, assuming no major disputes arise during the process."
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/chat')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Chat
          </Button>
          
          <div className="flex gap-2">
            <Button variant="outline" className="flex items-center gap-2">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
            <Button className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Download PDF
            </Button>
          </div>
        </div>

        {/* Document */}
        <Card className="shadow-lg">
          <CardHeader className="border-b">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <CardTitle className="text-2xl font-bold text-gray-900">
                  {documentContent.title}
                </CardTitle>
                <div className="flex gap-4 mt-2 text-sm text-gray-600">
                  <span>Date: {documentContent.date}</span>
                  <span>Case Type: {documentContent.caseType}</span>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-8">
            <div className="space-y-8">
              {documentContent.sections.map((section, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {section.title}
                  </h3>
                  <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {section.content}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="text-sm text-gray-500 space-y-2">
                <p><strong>Disclaimer:</strong> This document is for informational purposes only and does not constitute legal advice. Please consult with a qualified attorney for specific legal guidance.</p>
                <p><strong>Confidentiality:</strong> This document contains confidential and privileged information. Distribution is restricted to authorized parties only.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DocumentPreview;
