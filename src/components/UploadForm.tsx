import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FileText, Upload, AlertCircle } from "lucide-react";

interface UploadFormProps {
  onComplete: (data: any) => void;
  onCancel: () => void;
}

const UploadForm = ({ onComplete, onCancel }: UploadFormProps) => {
  const [formData, setFormData] = useState({
    facultyName: "",
    employeeId: "",
    department: "",
    designation: "",
    email: "",
    academicYear: "2024-25"
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would upload and process the file
    onComplete({ ...formData, file: selectedFile });
  };

  return (
    <div className="space-y-6">
      {/* Faculty Information Card */}
      <Card className="border shadow-sm">
        <CardHeader>
          <CardTitle>Faculty Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="facultyName">
                  Faculty Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="facultyName"
                  name="facultyName"
                  placeholder="Enter full name"
                  value={formData.facultyName}
                  onChange={handleInputChange}
                  className="bg-muted/30"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="employeeId">
                  Employee ID <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="employeeId"
                  name="employeeId"
                  placeholder="Enter employee ID"
                  value={formData.employeeId}
                  onChange={handleInputChange}
                  className="bg-muted/30"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">
                  Department <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="department"
                  name="department"
                  placeholder="Enter department"
                  value={formData.department}
                  onChange={handleInputChange}
                  className="bg-muted/30"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="designation">Designation</Label>
                <Input
                  id="designation"
                  name="designation"
                  placeholder="e.g., Assistant Professor"
                  value={formData.designation}
                  onChange={handleInputChange}
                  className="bg-muted/30"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="bg-muted/30"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="academicYear">Academic Year</Label>
                <Input
                  id="academicYear"
                  name="academicYear"
                  value={formData.academicYear}
                  onChange={handleInputChange}
                  className="bg-muted/30"
                />
              </div>
            </div>

            {/* File Upload Section */}
            <Card className="border-2 border-dashed">
              <CardHeader>
                <CardTitle className="text-lg">Excel File Upload</CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    dragActive ? "border-academic bg-academic/5" : "border-muted-foreground/25"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <div className="flex flex-col items-center space-y-4">
                    <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                      <FileText className="w-6 h-6 text-muted-foreground" />
                    </div>
                    {selectedFile ? (
                      <div className="space-y-2">
                        <p className="font-medium text-foreground">{selectedFile.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <p className="text-foreground">Drag and drop your Excel file here</p>
                        <p className="text-sm text-muted-foreground">or click to browse files</p>
                      </div>
                    )}
                    <input
                      type="file"
                      accept=".xlsx,.xls,.csv"
                      onChange={handleFileSelect}
                      className="hidden"
                      id="file-upload"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById("file-upload")?.click()}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Choose File
                    </Button>
                  </div>
                </div>

                {/* File Requirements */}
                <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <div className="space-y-1 text-sm">
                      <p className="font-medium text-foreground">File Requirements:</p>
                      <ul className="text-muted-foreground space-y-1 ml-4">
                        <li>• Supported formats: .xlsx, .xls, .csv</li>
                        <li>• Maximum file size: 10MB</li>
                        <li>• The Excel file should contain faculty performance data including teaching, research, and service activities</li>
                        <li>• Our system will automatically process and calculate appraisal scores</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button type="submit" variant="academic" disabled={!selectedFile}>
                <Upload className="w-4 h-4 mr-2" />
                Upload & Process
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UploadForm;