import { useState, useEffect } from "react";
import EnergyChart from "../components/EnergyChart";
import Link from "next/link";

export default function Dashboard() {
  const [energyData, setEnergyData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/data");
        if (!response.ok) throw new Error("Failed to fetch data");

        const data = await response.json();
        setEnergyData(data);
      } catch (err) {
        console.error("Error fetching energy data:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Energy Dashboard</h1>
      <Link href="/form">
        <button>Add New Data</button>
      </Link>
      <EnergyChart data={energyData} />
    </div>
  );
}
