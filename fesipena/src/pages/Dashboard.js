import React, { useEffect, useState } from 'react';
import { FaBook, FaUsers, FaCheckCircle, FaClock } from 'react-icons/fa';
import axios from 'axios';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalPenelitian: 0,
    penelitianAktif: 0,
    penelitianSelesai: 0,
    totalPeneliti: 0
  });

  const [recentResearch, setRecentResearch] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Mengambil data penelitian
      const response = await axios.get('http://localhost:3010/api/penelitian');
      const penelitianData = Array.isArray(response.data) ? response.data : response.data.data;

      // Menghitung statistik dengan status angka
      const totalPenelitian = penelitianData.length;
      const penelitianAktif = penelitianData.filter(item => item.status === 1).length;
      const penelitianSelesai = penelitianData.filter(item => item.status === 2).length;
      
      // Update stats
      setStats({
        totalPenelitian,
        penelitianAktif,
        penelitianSelesai,
        totalPeneliti: totalPenelitian
      });

      // Mengambil 5 penelitian terbaru
      const sortedResearch = [...penelitianData].sort((a, b) => 
        new Date(b.tanggal) - new Date(a.tanggal)
      ).slice(0, 5);

      setRecentResearch(sortedResearch);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Fungsi untuk mengkonversi status angka ke teks
  const getStatusText = (statusNumber) => {
    switch (statusNumber) {
      case 1:
        return 'Aktif';
      case 2:
        return 'Selesai';
      case 0:
        return 'Tidak Aktif';
      default:
        return 'Tidak Aktif';
    }
  };

  const statsCards = [
    {
      title: "Total Penelitian",
      value: stats.totalPenelitian,
      icon: <FaBook className="text-blue-500" size={24} />,
      bgColor: "bg-blue-50",
      textColor: "text-blue-500"
    },
    {
      title: "Penelitian Aktif",
      value: stats.penelitianAktif,
      icon: <FaClock className="text-green-500" size={24} />,
      bgColor: "bg-green-50",
      textColor: "text-green-500"
    },
    {
      title: "Penelitian Selesai",
      value: stats.penelitianSelesai,
      icon: <FaCheckCircle className="text-purple-500" size={24} />,
      bgColor: "bg-purple-50",
      textColor: "text-purple-500"
    },
    {
      title: "Total Peneliti",
      value: stats.totalPeneliti,
      icon: <FaUsers className="text-orange-500" size={24} />,
      bgColor: "bg-orange-50",
      textColor: "text-orange-500"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <div className="text-sm text-gray-500">
          {new Date().toLocaleDateString('id-ID', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </div>

      {/* Statistik Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsCards.map((stat, index) => (
          <div key={index} className={`${stat.bgColor} rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300`}>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-600 text-sm font-medium">{stat.title}</p>
                <h3 className={`text-2xl font-bold ${stat.textColor} mt-2`}>{stat.value}</h3>
              </div>
              <div className={`${stat.bgColor} p-3 rounded-full`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Penelitian Terbaru */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-800">Penelitian Terbaru</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Judul</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lokasi</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentResearch.map((research) => (
                <tr key={research.kd_penelitian} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">{research.judul}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{research.lokasi}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {new Date(research.tanggal).toLocaleDateString('id-ID')}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${research.status === 1 
                        ? 'bg-green-100 text-green-800' 
                        : research.status === 2
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-red-100 text-red-800'}`}>
                      {getStatusText(research.status)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
