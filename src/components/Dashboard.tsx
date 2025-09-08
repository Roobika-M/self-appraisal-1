import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Clock, CheckCircle, BarChart3, Plus, Upload, Eye, Download, Trash2, ArrowLeft } from "lucide-react";
import StatCard from "./StatCard";
import Header from "./Header";
import UploadForm from "./UploadForm";

interface FacultyRecord {
  id: string;
  name: string;
  employeeId: string;
  department: string;
  designation: string;
  academicYear: string;
  uploadDate: string;
  status: "completed" | "processing" | "pending";
  scores: {
    teaching: number;
    research: number;
    service: number;
    overall: number;
  };
}

const Dashboard = ({ onLogout }: { onLogout: () => void }) => {
  const [currentView, setCurrentView] = useState<"dashboard" | "upload">("dashboard");
  const [facultyRecords, setFacultyRecords] = useState<FacultyRecord[]>([
    {
      id: "1",
      name: "hhh",
      employeeId: "nj",
      department: "Assistant Professor",
      designation: "Assistant Professor",
      academicYear: "2024-25",
      uploadDate: "9/6/2025",
      status: "completed",
      scores: {
        teaching: 70,
        research: 73,
        service: 71,
        overall: 71
      }
    }
  ]);

  const stats = {
    totalUploads: facultyRecords.length,
    processing: facultyRecords.filter(r => r.status === "processing").length,
    completed: facultyRecords.filter(r => r.status === "completed").length,
    averageScore: facultyRecords.length > 0 
      ? Math.round(facultyRecords.reduce((sum, r) => sum + r.scores.overall, 0) / facultyRecords.length * 10) / 10
      : 0
  };

  const handleNewUpload = () => {
    setCurrentView("upload");
  };

  const handleBackToDashboard = () => {
    setCurrentView("dashboard");
  };

  const handleUploadComplete = (data: any) => {
    // In a real app, this would process the upload
    setCurrentView("dashboard");
  };

  if (currentView === "upload") {
    return (
      <div className="min-h-screen bg-background">
        <Header onLogout={onLogout} />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" size="sm" onClick={handleBackToDashboard}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-semibold text-foreground">Upload Faculty Appraisal</h1>
              <p className="text-muted-foreground">Upload Excel file with faculty data</p>
            </div>
          </div>
          <UploadForm onComplete={handleUploadComplete} onCancel={handleBackToDashboard} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header onLogout={onLogout} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Uploads"
            value={stats.totalUploads}
            icon={Users}
            variant="default"
          />
          <StatCard
            title="Processing"
            value={stats.processing}
            icon={Clock}
            variant="processing"
          />
          <StatCard
            title="Completed"
            value={stats.completed}
            icon={CheckCircle}
            variant="success"
          />
          <StatCard
            title="Average Score"
            value={`${stats.averageScore}%`}
            icon={BarChart3}
            variant="default"
          />
        </div>

        {/* Faculty Uploads Section */}
        <Card className="border shadow-sm">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Faculty Appraisal Uploads</CardTitle>
              <Button onClick={handleNewUpload} variant="academic">
                <Plus className="w-4 h-4 mr-2" />
                New Upload
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {facultyRecords.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Upload className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-2">No Uploads Yet</h3>
                <p className="text-muted-foreground mb-4">
                  Start by uploading your first faculty appraisal Excel file
                </p>
                <Button onClick={handleNewUpload} variant="academic">
                  <Plus className="w-4 h-4 mr-2" />
                  Upload First File
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {facultyRecords.map((record) => (
                  <div key={record.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <h3 className="font-medium text-foreground">{record.name}</h3>
                          <Badge variant={record.status === "completed" ? "default" : "secondary"}>
                            {record.status === "completed" ? "Completed" : "Processing"}
                          </Badge>
                          {record.status === "completed" && (
                            <Badge variant="outline" className="text-academic border-academic">
                              B+
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          ID: {record.employeeId} • {record.designation} • {record.academicYear} • {record.uploadDate}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-1" />
                          View Results
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-1" />
                          Download
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="w-4 h-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                    
                    {record.status === "completed" && (
                      <div className="grid grid-cols-4 gap-4 pt-2 border-t">
                        <div>
                          <p className="text-sm text-muted-foreground">Teaching</p>
                          <p className="font-medium">{record.scores.teaching}%</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Research</p>
                          <p className="font-medium">{record.scores.research}%</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Service</p>
                          <p className="font-medium">{record.scores.service}%</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Overall</p>
                          <p className="font-medium">{record.scores.overall}%</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;