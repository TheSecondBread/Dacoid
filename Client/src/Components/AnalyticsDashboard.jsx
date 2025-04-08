import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  Legend,
  ResponsiveContainer,
} from "recharts";

const AnalyticsDashboard = () => {
  const [tableData, setTableData] = useState([]);
  const [clickStats, setClickStats] = useState([]);
  const [deviceStats, setDeviceStats] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/url/user", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("jwt")}`,
          },
        });

        const urls = await response.json();
        console.log("Fetched Data:", urls);

        //table data
        const formattedTable = urls.map((url) => ({
          originalUrl: url.originalUrl,
          shortUrl: url.shortUrl,
          totalClicks: url.clickCount || 0,
          createdDate: new Date(url.createdAt).toISOString().split("T")[0],
          expirationStatus: "Active",
        }));
        setTableData(formattedTable);

        //clicks 
        const clickMap = {};
        urls.forEach((url) => {
          const dateKey = new Date(url.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          });
          clickMap[dateKey] = (clickMap[dateKey] || 0) + url.clickCount;
        });
        const clicksOverTime = Object.entries(clickMap).map(([date, clicks]) => ({
          date,
          clicks,
        }));
        setClickStats(clicksOverTime);

        const deviceMap = {};
        urls.forEach((url) => {
          url.clicks?.forEach((click) => {
            const device = click.deviceType || "Unknown";
            deviceMap[device] = (deviceMap[device] || 0) + 1;
          });
        });
        const deviceStatsFormatted = Object.entries(deviceMap).map(([device, clicks]) => ({
          device,
          clicks,
        }));
        setDeviceStats(deviceStatsFormatted);

      } catch (error) {
        console.error("Fetch Error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6 space-y-10">
      <h1 className="text-3xl font-bold">Analytics Dashboard</h1>

      {/* table */}
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-gray-800 text-white rounded">
          <thead className="bg-gray-900 text-white font-bold">
            <tr>
              <th className="px-4 py-2">Original URL</th>
              <th className="px-4 py-2">Short URL</th>
              <th className="px-4 py-2">Total Clicks</th>
              <th className="px-4 py-2">Created Date</th>
              <th className="px-4 py-2">Expiration Status</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr
                key={index}
                className="text-center border-t border-gray-700 hover:bg-gray-700 transition"
              >
                <td className="px-4 py-2">{row.originalUrl}</td>
                <a className="px-4 py-2 text-blue-400" href={`http://localhost:8000/api/url/r/${row.shortUrl}`}>
                  http://localhost:8000/api/url/r/{row.shortUrl}
                </a>
                <td className="px-4 py-2">{row.totalClicks}</td>
                <td className="px-4 py-2">{row.createdDate}</td>
                <td
                  className={`px-4 py-2 ${
                    row.expirationStatus === "Active"
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {row.expirationStatus}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-black text-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-4">Clicks Over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={clickStats}>
              <CartesianGrid strokeDasharray="3 3"  />
              <XAxis dataKey="date" stroke="#ffffff" />
              <YAxis stroke="#ffffff" />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="clicks"
                stroke="#ffffff"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-black rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-4">Device Breakdown</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={deviceStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="device" stroke="#ffffff" />
              <YAxis stroke="#ffffff" />
              <Tooltip />
              <Legend />
              <Bar dataKey="clicks" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;


