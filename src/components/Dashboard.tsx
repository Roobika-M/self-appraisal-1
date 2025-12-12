import { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
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
  timestamp: string;
  scores: {
    teaching: number;
    research: number;
    service: number;
    mentor: number;
    hod: number;
    overall: number;
  };
}

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogout = () => {
    try {
      sessionStorage.removeItem("isLoggedIn");
    } catch {}
    navigate("/login", { replace: true });
  };
  const currentView: "dashboard" | "upload" | "results" = location.pathname.includes("/upload")
    ? "upload"
    : location.pathname.includes("/results")
    ? "results"
    : "dashboard";
  const [appraisalHistory, setAppraisalHistory] = useState<FacultyRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/download_path", {
        method: "GET",
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        const mappedData = data.map((item: any, index: number) => ({
          id: (index + 1).toString(),
          name: item.name || "",
          employeeId: item.emp_id || "",
          department: item.department || "",
          designation: item.designation || "",
          academicYear: "2024-25",
          uploadDate: new Date().toLocaleDateString(),
          status: "completed",
          timestamp: item.timestamp || "",
          scores: {
            teaching: item.academics || 0,
            research: item.research || 0,
            service: item.selfm || 0,
            mentor: item.mentor || 0,
            hod: item.hod || 0,
            overall: (item.academics || 0) + (item.research || 0) + (item.selfm || 0) + (item.mentor || 0) + (item.hod || 0)
          }
        }));
        setAppraisalHistory(mappedData);
      } else {
        setAppraisalHistory([]);
      }
    } catch {
      setAppraisalHistory([]);
    }
    setLoading(false);
  };

  // Fetch latest scores/details from backend on dashboard load
  useEffect(() => {
    fetchData();
  }, []);

  // current view is driven by URL (see navigate calls below)
  const [latestScores, setLatestScores] = useState<any | null>(null);
  const params = useParams();
  const resultTimestamp = params?.id;
  const [displayScores, setDisplayScores] = useState<any | null>(null);
  // determine which scores to show on results page: param -> appraisalHistory -> latestScores -> fetch
  useEffect(() => {
    const findByTimestamp = async (ts: string | undefined) => {
      if (!ts) {
        setDisplayScores(latestScores);
        return;
      }
      const found = appraisalHistory.find((r) => r.timestamp === ts);
      if (found) {
        setDisplayScores({
          research: found.scores.research,
          selfm: found.scores.service,
          mentor: found.scores.mentor,
          academics: found.scores.teaching,
          hod: found.scores.hod,
          name: found.name,
        });
        return;
      }
      try {
        const res = await fetch("http://localhost:5000/download_path", { method: "GET", credentials: "include" });
        if (res.ok) {
          const list = await res.json();
          const matched = list.find((it: any) => it.timestamp === ts);
          if (matched) {
            setDisplayScores(matched);
            return;
          }
        }
      } catch {}
      setDisplayScores(latestScores);
    };
    findByTimestamp(resultTimestamp);
  }, [resultTimestamp, appraisalHistory, latestScores]);

  const stats = {
    totalUploads: appraisalHistory.length,
    processing: appraisalHistory.filter(r => r.status === "processing").length,
    completed: appraisalHistory.filter(r => r.status === "completed").length,
    averageScore: appraisalHistory.length > 0
      ? Math.round(appraisalHistory.reduce((sum, r) => sum + r.scores.overall, 0) / appraisalHistory.length * 10) / 10
      : 0
  };

  const handleNewUpload = () => {
    navigate("/dashboard/upload");
  };

  const handleBackToDashboard = () => {
    navigate("/dashboard");
  };

  const handleUploadComplete = async (data: any) => {
    // After upload, fetch scores from backend and show results page
    try {
      const res = await fetch("http://localhost:5000/download_path", {
        method: "GET",
        credentials: "include",
      });
      if (res.ok) {
        const scores = await res.json();
        const last = scores.length > 0 ? scores[scores.length - 1] : null;
        setLatestScores(last);
        const ts = last?.timestamp || "";
        navigate(`/dashboard/results/${encodeURIComponent(ts)}`);
      } else {
        setLatestScores(null);
        navigate("/dashboard");
      }
    } catch {
      setLatestScores(null);
      navigate("/dashboard");
    }
  };

  if (currentView === "upload") {
    return (
      <div className="min-h-screen bg-background">
        <Header onLogout={handleLogout} />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" size="sm" onClick={handleBackToDashboard}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-semibold text-foreground">Upload Faculty Appraisal</h1>
              <p className="text-muted-foreground">Upload Excel and Word template files</p>
            </div>
          </div>
          <UploadForm onComplete={handleUploadComplete} onCancel={handleBackToDashboard} />
        </div>
      </div>
    );
  }

  if (currentView === "results" && displayScores) {
    return (
      <div className="min-h-screen bg-background">
        <Header onLogout={handleLogout} />
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-foreground">Faculty Appraisal Results</h1>
            <p className="text-muted-foreground">Scores for {displayScores.name}</p>
          </div>
          <div className="grid grid-cols-2 gap-6 mb-8">
            <StatCard title="Research" value={displayScores.research || 0} icon={BarChart3} />
            <StatCard title="Self" value={displayScores.selfm || 0} icon={BarChart3} />
            <StatCard title="Mentor" value={displayScores.mentor || 0} icon={BarChart3} />
            <StatCard title="Academics" value={displayScores.academics || 0} icon={BarChart3} />
            <StatCard title="HOD" value={displayScores.hod || 0} icon={BarChart3} />
          </div>
          <div className="mb-8">
            <div className="flex gap-4 flex-wrap">
              <Button
                variant="outline"
                onClick={async () => {
                  const res = await fetch("http://localhost:5000/download/pdf", {
                    method: "GET",
                    credentials: "include",
                  });
                  if (res.ok) {
                    const blob = await res.blob();
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = "filled_template.pdf";
                    document.body.appendChild(a);
                    a.click();
                    a.remove();
                  }
                }}
              >
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
              <Button
                variant="outline"
                onClick={async () => {
                  const res = await fetch("http://localhost:5000/download/docx", {
                    method: "GET",
                    credentials: "include",
                  });
                  if (res.ok) {
                    const blob = await res.blob();
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = "filled_template.docx";
                    document.body.appendChild(a);
                    a.click();
                    a.remove();
                  }
                }}
              >
                <Download className="w-4 h-4 mr-2" />
                Download Word
              </Button>
              <Button
                variant="outline"
                onClick={async () => {
                  const res = await fetch("http://localhost:5000/download/corrective", {
                    method: "GET",
                    credentials: "include",
                  });
                  if (res.ok) {
                    const blob = await res.blob();
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = "corrective_action_report.docx";
                    document.body.appendChild(a);
                    a.click();
                    a.remove();
                  }
                }}
              >
                <Download className="w-4 h-4 mr-2" />
                Download Corrective Report
              </Button>
              <Button variant="ghost" onClick={handleBackToDashboard}>
                Back to Dashboard
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header onLogout={handleLogout} />
      
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
            {loading ? (
              <div className="text-center py-12">Loading...</div>
            ) : appraisalHistory.length === 0 ? (
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
                {appraisalHistory.map((record) => (
                  <div key={record.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <h3 className="font-medium text-foreground">{record.name}</h3>
                          <Badge variant={record.status === "completed" ? "default" : "secondary"}>
                            {record.status === "completed" ? "Completed" : "Processing"}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          ID: {record.employeeId} • {record.designation} • {record.academicYear} • {record.uploadDate}
                        </p>
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={async () => {
                            const res = await fetch("http://localhost:5000/download/pdf", {
                              method: "GET",
                              credentials: "include",
                            });
                            if (res.ok) {
                              const blob = await res.blob();
                              const url = window.URL.createObjectURL(blob);
                              const a = document.createElement("a");
                              a.href = url;
                              a.download = "filled_template.pdf";
                              document.body.appendChild(a);
                              a.click();
                              a.remove();
                            }
                          }}
                        >
                          <Download className="w-4 h-4 mr-1" />
                          Download PDF
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            if (record.timestamp) navigate(`/dashboard/results/${encodeURIComponent(record.timestamp)}`);
                          }}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View Results
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={async () => {
                            const res = await fetch("http://localhost:5000/download/docx", {
                              method: "GET",
                              credentials: "include",
                            });
                            if (res.ok) {
                              const blob = await res.blob();
                              const url = window.URL.createObjectURL(blob);
                              const a = document.createElement("a");
                              a.href = url;
                              a.download = "filled_template.docx";
                              document.body.appendChild(a);
                              a.click();
                              a.remove();
                            }
                          }}
                        >
                          <Download className="w-4 h-4 mr-1" />
                          Download Word
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={async () => {
                            const res = await fetch("http://localhost:5000/download/corrective", {
                              method: "GET",
                              credentials: "include",
                            });
                            if (res.ok) {
                              const blob = await res.blob();
                              const url = window.URL.createObjectURL(blob);
                              const a = document.createElement("a");
                              a.href = url;
                              a.download = "corrective_action_report.docx";
                              document.body.appendChild(a);
                              a.click();
                              a.remove();
                            }
                          }}
                        >
                          <Download className="w-4 h-4 mr-1" />
                          Download Corrective
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={async () => {
                            if (record.timestamp) {
                              await fetch(`http://localhost:5000/history/${record.timestamp}`, {
                                method: "DELETE",
                                credentials: "include",
                              });
                              await fetchData();
                            }
                          }}
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                    {record.status === "completed" && (
                      <div className="grid grid-cols-5 gap-4 pt-2 border-t">
                        <div>
                          <p className="text-sm text-muted-foreground">Academics</p>
                          <p className="font-medium">{record.scores.teaching}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Research</p>
                          <p className="font-medium">{record.scores.research}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Self</p>
                          <p className="font-medium">{record.scores.service}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Mentor</p>
                          <p className="font-medium">{record.scores.mentor}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">HOD</p>
                          <p className="font-medium">{record.scores.hod}</p>
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