
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Upload, ArrowLeft, Plus, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const CaseStudy = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const documentTypes = [
    { id: 'contract', title: 'Contract Documents', description: 'Employment contracts, service agreements, etc.', accept: '.pdf,.doc,.docx' },
    { id: 'evidence', title: 'Evidence Documents', description: 'Photos, screenshots, witness statements', accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png' },
    { id: 'correspondence', title: 'Email & Correspondence', description: 'Email chains, letters, messages', accept: '.pdf,.doc,.docx,.txt,.eml' },
    { id: 'financial', title: 'Financial Records', description: 'Pay stubs, bank statements, invoices', accept: '.pdf,.doc,.docx,.xls,.xlsx' },
    { id: 'legal', title: 'Legal Documents', description: 'Court filings, legal notices, previous judgments', accept: '.pdf,.doc,.docx' },
    { id: 'other', title: 'Other Documents', description: 'Any other relevant documents', accept: '.pdf,.doc,.docx,.txt,.jpg,.jpeg,.png' }
  ];

  const handleFileUpload = (documentType: string, accept: string) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = accept;
    input.multiple = true;
    input.onchange = (e) => {
      const files = Array.from((e.target as HTMLInputElement).files || []);
      if (files.length > 0) {
        setUploadedFiles(prev => [...prev, ...files]);
        toast({
          title: "Files uploaded successfully",
          description: `${files.length} file(s) added to your case study`,
        });
      }
    };
    input.click();
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
    toast({
      title: "File removed",
      description: "Document has been removed from your case study",
    });
  };

  const handleSubmit = () => {
    if (uploadedFiles.length === 0) {
      toast({
        title: "No documents uploaded",
        description: "Please upload at least one document for your case study",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Case study submitted",
      description: `${uploadedFiles.length} document(s) have been analyzed and added to your case`,
    });
    
    navigate('/chat');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => navigate('/chat')}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Chat</span>
            </Button>
            <h1 className="text-2xl font-bold">Case Study Documents</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {documentTypes.map((docType) => (
            <Card key={docType.id} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2 text-lg">
                  <FileText className="h-5 w-5" />
                  <span>{docType.title}</span>
                </CardTitle>
                <CardDescription className="text-sm">
                  {docType.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={() => handleFileUpload(docType.id, docType.accept)}
                  variant="outline"
                  className="w-full flex items-center space-x-2"
                >
                  <Upload className="h-4 w-4" />
                  <span>Upload Files</span>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {uploadedFiles.length > 0 && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Uploaded Documents ({uploadedFiles.length})</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-100 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-4 w-4 text-gray-500" />
                      <span className="text-sm font-medium">{file.name}</span>
                      <span className="text-xs text-gray-500">
                        ({(file.size / 1024 / 1024).toFixed(2)} MB)
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-end space-x-3">
                <Button variant="outline" onClick={() => navigate('/chat')}>
                  Cancel
                </Button>
                <Button onClick={handleSubmit} className="flex items-center space-x-2">
                  <Plus className="h-4 w-4" />
                  <span>Submit Case Study</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CaseStudy;
