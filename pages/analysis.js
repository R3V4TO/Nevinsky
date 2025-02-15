import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";

export default function Analysis() {
  const [aiAnalysis, setAiAnalysis] = useState("");

  useEffect(() => {
    const fetchAnalysis = async () => {
      const response = await fetch("/api/analyze");
      const data = await response.json();
      setAiAnalysis(data.analysis || "No analysis available.");
    };

    fetchAnalysis();
  }, []);

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="content">
        <h1>AI Analysis Results</h1>
        <p>{aiAnalysis}</p>
      </div>
    </div>
  );
}
