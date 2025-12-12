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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const UploadForm = ({ onComplete, onCancel }: UploadFormProps) => {
  const [formData, setFormData] = useState({
    facultyName: "",
    employeeId: "",
    department: "",
    designation: "",
    email: "",
    academicYear: "2024-25"
  });
  const [selectedExcelFile, setSelectedExcelFile] = useState<File | null>(null);
  const [selectedWordFile, setSelectedWordFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
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
    // Only handle Excel file drop here
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedExcelFile(e.dataTransfer.files[0]);
    }
  };

  const handleExcelFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedExcelFile(e.target.files[0]);
    }
  };

  const handleWordFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedWordFile(e.target.files[0]);
    }
  };

  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!selectedExcelFile || !selectedWordFile) {
      setError("Please select both Excel and Word template files.");
      return;
    }
    try {
      const data = new FormData();
      data.append("name", formData.facultyName);
      data.append("designation", formData.designation);
      data.append("department", formData.department);
      data.append("employee_id", formData.employeeId);
      data.append("excel_file", selectedExcelFile);
      data.append("word_file", selectedWordFile);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: data,
        credentials: "include",
      });
      if (res.redirected || res.ok) {
        onComplete({ ...formData, excelFile: selectedExcelFile, wordFile: selectedWordFile });
      } else {
        setError("Upload failed. Please check your files and try again.");
      }
    } catch (err) {
      setError("Unable to connect to server.");
    }
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
              <Select
                onValueChange={(value) => handleSelectChange("designation", value)}
                value={formData.designation}
              >
                <SelectTrigger id="designation" className="bg-muted/30">
                  <SelectValue placeholder="Select designation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Professor">Professor</SelectItem>
                  <SelectItem value="Assistant Professor">Assistant Professor</SelectItem>
                  <SelectItem value="Associate Professor">Associate Professor</SelectItem>
                </SelectContent>
              </Select>
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
                    {selectedExcelFile ? (
                      <div className="space-y-2">
                        <p className="font-medium text-foreground">{selectedExcelFile.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {(selectedExcelFile.size / 1024 / 1024).toFixed(2)} MB
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
                      onChange={handleExcelFileSelect}
                      className="hidden"
                      id="excel-file-upload"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById("excel-file-upload")?.click()}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Choose Excel File
                    </Button>
                {/* Word Template Upload Section */}
                <div className="mt-6">
                  <Label htmlFor="word-file-upload">Word Template File <span className="text-destructive">*</span></Label>
                  <div className="flex items-center gap-4 mt-2">
                    <input
                      type="file"
                      accept=".docx"
                      onChange={handleWordFileSelect}
                      className="hidden"
                      id="word-file-upload"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById("word-file-upload")?.click()}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Choose Word File
                    </Button>
                    {selectedWordFile && (
                      <span className="ml-2 text-sm text-foreground">{selectedWordFile.name}</span>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">Supported format: .docx</div>
                </div>
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
            <div className="flex flex-col gap-2">
              {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
              <div className="flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={onCancel}>
                  Cancel
                </Button>
                <Button type="submit" variant="academic" disabled={!selectedExcelFile || !selectedWordFile}>
                  <Upload className="w-4 h-4 mr-2" />
                  Upload & Process
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UploadForm;