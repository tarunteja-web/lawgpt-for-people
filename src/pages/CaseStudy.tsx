
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Upload, ArrowLeft, Plus, X, Folder, File } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const CaseStudy = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [activeTab, setActiveTab] = useState('upload');

  const documentTypes = [
    { 
      id: 'contract', 
      title: 'Contract Documents', 
      description: 'Employment contracts, service agreements, etc.', 
      accept: '.pdf,.doc,.docx',
      color: 'bg-blue-100 border-blue-300',
      icon: FileText
    },
    { 
      id: 'evidence', 
      title: 'Evidence Documents', 
      description: 'Photos, screenshots, witness statements', 
      accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
      color: 'bg-green-100 border-green-300',
      icon: FileText
    },
    { 
      id: 'correspondence', 
      title: 'Email & Correspondence', 
      description: 'Email chains, letters, messages', 
      accept: '.pdf,.doc,.docx,.txt,.eml',
      color: 'bg-purple-100 border-purple-300',
      icon: FileText
    },
    { 
      id: 'financial', 
      title: 'Financial Records', 
      description: 'Pay stubs, bank statements, invoices', 
      accept: '.pdf,.doc,.docx,.xls,.xlsx',
      color: 'bg-orange-100 border-orange-300',
      icon: FileText
    },
    { 
      id: 'legal', 
      title: 'Legal Documents', 
      description: 'Court filings, legal notices, previous judgments', 
      accept: '.pdf,.doc,.docx',
      color: 'bg-red-100 border-red-300',
      icon: FileText
    },
    { 
      id: 'other', 
      title: 'Other Documents', 
      description: 'Any other relevant documents', 
      accept: '.pdf,.doc,.docx,.txt,.jpg,.jpeg,.png',
      color: 'bg-gray-100 border-gray-300',
      icon: FileText
    }
  ];

  // Mock file system structure
  const [fileSystem] = useState({
    'Documents': {
      'Legal': ['contract.pdf', 'agreement.docx'],
      'Personal': ['id.pdf', 'resume.pdf'],
      'Financial': ['bank_statement.pdf', 'tax_return.pdf']
    },
    'Downloads': ['screenshot.png', 'email.pdf'],
    'Desktop': ['notes.txt', 'case_info.docx']
  });

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

  const handleFileSystemSelect = (fileName: string, folderPath: string) => {
    // Create a mock file object for demo purposes
    const mockFile = new File([''], fileName, { type: 'application/pdf' });
    setUploadedFiles(prev => [...prev, mockFile]);
    toast({
      title: "File added from explorer",
      description: `${fileName} has been added to your case study`,
    });
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => navigate('/chat')}
              className="flex items-center space-x-2 hover:bg-white/50"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Chat</span>
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Case Study Documents</h1>
              <p className="text-gray-600 mt-1">Upload and organize your legal documents</p>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="upload" className="flex items-center space-x-2">
              <Upload className="h-4 w-4" />
              <span>Upload Documents</span>
            </TabsTrigger>
            <TabsTrigger value="explorer" className="flex items-center space-x-2">
              <Folder className="h-4 w-4" />
              <span>File Explorer</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {documentTypes.map((docType) => {
                const IconComponent = docType.icon;
                return (
                  <Card key={docType.id} className={`hover:shadow-lg transition-all duration-200 cursor-pointer border-2 ${docType.color}`}>
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center space-x-3 text-lg">
                        <IconComponent className="h-6 w-6 text-gray-700" />
                        <span>{docType.title}</span>
                      </CardTitle>
                      <CardDescription className="text-sm text-gray-600">
                        {docType.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button
                        onClick={() => handleFileUpload(docType.id, docType.accept)}
                        variant="outline"
                        className="w-full flex items-center space-x-2 hover:bg-white/80"
                      >
                        <Upload className="h-4 w-4" />
                        <span>Upload Files</span>
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="explorer" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Folder className="h-5 w-5" />
                  <span>Browse Your Files</span>
                </CardTitle>
                <CardDescription>
                  Select files from your computer to add to your case study
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(fileSystem).map(([folderName, contents]) => (
                    <div key={folderName} className="border rounded-lg p-4 bg-gray-50">
                      <div className="flex items-center space-x-2 mb-3">
                        <Folder className="h-5 w-5 text-blue-600" />
                        <span className="font-semibold text-gray-800">{folderName}</span>
                      </div>
                      <div className="ml-7 space-y-2">
                        {typeof contents === 'object' ? (
                          Object.entries(contents).map(([subFolder, files]) => (
                            <div key={subFolder} className="space-y-1">
                              <div className="flex items-center space-x-2">
                                <Folder className="h-4 w-4 text-blue-500" />
                                <span className="text-sm font-medium text-gray-700">{subFolder}</span>
                              </div>
                              <div className="ml-6 space-y-1">
                                {files.map((file: string) => (
                                  <div key={file} className="flex items-center justify-between p-2 hover:bg-white rounded border">
                                    <div className="flex items-center space-x-2">
                                      <File className="h-4 w-4 text-gray-500" />
                                      <span className="text-sm">{file}</span>
                                    </div>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => handleFileSystemSelect(file, `${folderName}/${subFolder}`)}
                                    >
                                      <Plus className="h-3 w-3" />
                                    </Button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))
                        ) : (
                          contents.map((file: string) => (
                            <div key={file} className="flex items-center justify-between p-2 hover:bg-white rounded border">
                              <div className="flex items-center space-x-2">
                                <File className="h-4 w-4 text-gray-500" />
                                <span className="text-sm">{file}</span>
                              </div>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleFileSystemSelect(file, folderName)}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Uploaded Files Section */}
        {uploadedFiles.length > 0 && (
          <Card className="mt-8 border-2 border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-green-800">
                <FileText className="h-5 w-5" />
                <span>Selected Documents ({uploadedFiles.length})</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-white rounded-lg border border-green-200 shadow-sm">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-green-600" />
                      <div>
                        <span className="text-sm font-medium text-gray-900">{file.name}</span>
                        <p className="text-xs text-gray-500">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(index)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <div className="flex justify-end space-x-3">
                <Button variant="outline" onClick={() => navigate('/chat')}>
                  Cancel
                </Button>
                <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700 flex items-center space-x-2">
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
