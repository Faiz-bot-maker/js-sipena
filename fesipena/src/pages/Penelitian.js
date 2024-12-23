import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaPlus, FaTrash, FaEdit, FaSearch } from 'react-icons/fa';
import { BiBookBookmark } from 'react-icons/bi';
import { MdLocationOn, MdCalendarToday } from 'react-icons/md';

const Penelitian = () => {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    judul: '',
    lokasi: '',
    thn_akademik: '',
    tanggal: '',
    status: ''
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [isDeleteSuccessOpen, setIsDeleteSuccessOpen] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get('http://localhost:3010/api/penelitian')
      .then(response => {
        const fetchedData = Array.isArray(response.data) ? response.data : response.data.data;
        setData(fetchedData);
      })
      .catch(error => console.error('Error fetching data:', error));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.judul || !formData.lokasi || !formData.thn_akademik || !formData.tanggal || !formData.status) {
      setIsAlertOpen(true);
      return;
    }
    axios.post('http://localhost:3010/api/penelitian', formData)
      .then(() => {
        fetchData();
        setFormData({
          judul: '',
          lokasi: '',
          thn_akademik: '',
          tanggal: '',
          status: ''
        });
        setIsModalOpen(false);
        setIsSuccessOpen(true);
      })
      .catch(error => console.error('Error creating data:', error));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!formData.kd_penelitian || !formData.judul || !formData.lokasi || !formData.thn_akademik || !formData.tanggal || !formData.status) {
      setIsAlertOpen(true);
      return;
    }
    axios.put(`http://localhost:3010/api/penelitian/${currentId}`, formData)
      .then(() => {
        fetchData();
        setFormData({
          kd_penelitian: '',
          judul: '',
          lokasi: '',
          thn_akademik: '',
          tanggal: '',
          status: ''
        });
        setIsEditModalOpen(false);
        setIsSuccessOpen(true);
      })
      .catch(error => console.error('Error updating data:', error));
  };

  const handleDelete = async (id) => {
    setDeleteId(id);
    setIsConfirmDeleteOpen(true);
  };

  const executeDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:3010/api/penelitian/${deleteId}`);

      if (response.status === 200) {
        setData(data.filter(item => item.kd_penelitian !== deleteId));
        setIsDeleteSuccessOpen(true);
      } else {
        throw new Error('Gagal menghapus data');
      }
    } catch (error) {
      console.error('Error:', error);
      alert("Terjadi kesalahan saat menghapus data");
    } finally {
      setIsConfirmDeleteOpen(false);
    }
  };

  const handleEdit = (item) => {
    setFormData(item);
    setCurrentId(item.kd_penelitian);
    setIsEditModalOpen(true);
  };

  const formatTanggal = (tanggal) => {
    const date = new Date(tanggal);
    return date.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  // Fungsi untuk mengkonversi angka status ke teks
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

  // Fungsi untuk mengkonversi teks status ke angka
  const getStatusNumber = (statusText) => {
    switch (statusText) {
      case 'Aktif':
        return 1;
      case 'Selesai':
        return 2;
      case 'Tidak Aktif':
        return 0;
      default:
        return 0;
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <BiBookBookmark className="text-blue-600 text-4xl mr-3" />
          <h1 className="text-3xl font-bold text-gray-800">Daftar Penelitian</h1>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)} 
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center transition duration-300 shadow-md"
        >
          <FaPlus className="mr-2" />
          Tambah Penelitian
        </button>
      </div>

      <div className="mb-6 flex justify-between items-center bg-white p-4 rounded-lg shadow-sm">
        <div className="flex-1 max-w-md relative">
          <input
            type="text"
            placeholder="Cari penelitian..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kode</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Judul</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lokasi</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tahun Akademik</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data
              .filter(item => 
                item.judul.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.lokasi.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((item) => (
                <tr key={item.kd_penelitian} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.kd_penelitian}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{item.judul}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    <div className="flex items-center">
                      <MdLocationOn className="text-red-500 mr-2" />
                      {item.lokasi}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.thn_akademik}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      <MdCalendarToday className="text-gray-500 mr-2" />
                      {formatTanggal(item.tanggal)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${item.status === 1 ? 'bg-green-100 text-green-800' : 
                        item.status === 2 ? 'bg-blue-100 text-blue-800' : 
                        'bg-red-100 text-red-800'}`}>
                      {getStatusText(item.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleEdit(item)}
                        className="text-blue-600 hover:text-blue-900 p-1"
                      >
                        <FaEdit className="text-xl" />
                      </button>
                      <button 
                        onClick={() => handleDelete(item.kd_penelitian)}
                        className="text-red-600 hover:text-red-900 p-1"
                      >
                        <FaTrash className="text-xl" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-2xl w-full mx-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Tambah Penelitian</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Judul Penelitian</label>
                <textarea 
                  name="judul" 
                  value={formData.judul} 
                  onChange={handleInputChange} 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Lokasi</label>
                <input 
                  type="text" 
                  name="lokasi" 
                  value={formData.lokasi} 
                  onChange={handleInputChange} 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tahun Akademik</label>
                <input 
                  type="text" 
                  name="thn_akademik" 
                  value={formData.thn_akademik} 
                  onChange={handleInputChange} 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal</label>
                <input 
                  type="date" 
                  name="tanggal" 
                  value={formData.tanggal} 
                  onChange={handleInputChange} 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select 
                  name="status" 
                  value={formData.status} 
                  onChange={handleInputChange} 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Pilih Status</option>
                  <option value="1">Aktif</option>
                  <option value="0">Tidak Aktif</option>
                  <option value="2">Selesai</option>
                </select>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isEditModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">Edit Penelitian</h2>
            <form onSubmit={handleEditSubmit}>
              <input type="text" name="kd_penelitian" value={formData.kd_penelitian} onChange={handleInputChange} placeholder="Kode" className="border px-2 py-1 mb-4 mr-4 w-1/4" />
              <input type="text" name="judul" value={formData.judul} onChange={handleInputChange} placeholder="Judul" className="border px-2 py-1 mb-4 w-full h-24" />
              <input type="text" name="lokasi" value={formData.lokasi} onChange={handleInputChange} placeholder="Lokasi" className="border px-2 py-1 mb-4 mr-4 w-full" />
              <input type="text" name="thn_akademik" value={formData.thn_akademik} onChange={handleInputChange} placeholder="Tahun Akademik" className="border px-2 py-1 mb-4 mr-4 w-1/2" />
              <input type="date" name="tanggal" value={formData.tanggal} onChange={handleInputChange} className="border px-2 py-1 mb-4 mr-4 w-1/2" />
              
              <select name="status" value={formData.status} onChange={handleInputChange} className="border px-2 py-1 mb-4 w-1/2">
                <option value="">Pilih Status</option>
                <option value="1">Aktif</option>
                <option value="0">Tidak Aktif</option>
                <option value="2">Selesai</option>
              </select>
              
              <div className="flex justify-end">
                <button type="button" onClick={() => setIsEditModalOpen(false)} className="bg-gray-500 text-white px-4 py-2 mr-2">Batal</button>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2">Simpan</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isAlertOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm text-center">
            <div className="mb-4">
              <svg className="w-12 h-12 text-red-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </div>
            <h2 className="text-lg font-bold mb-2 text-red-600">Peringatan</h2>
            <p className="mb-4 text-gray-700">Semua bidang harus diisi!</p>
            <button onClick={() => setIsAlertOpen(false)} className="bg-red-500 text-white px-4 py-2 rounded">Tutup</button>
          </div>
        </div>
      )}

      {isSuccessOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm text-center">
            <div className="mb-4">
              <svg className="w-12 h-12 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h2 className="text-lg font-bold mb-2 text-green-600">Berhasil</h2>
            <p className="mb-4 text-gray-700">Operasi berhasil!</p>
            <button onClick={() => setIsSuccessOpen(false)} className="bg-blue-500 text-white px-4 py-2 rounded">OK</button>
          </div>
        </div>
      )}

      {isDeleteSuccessOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm text-center">
            <div className="mb-4">
              <svg className="w-12 h-12 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h2 className="text-lg font-bold mb-2 text-green-600">Berhasil</h2>
            <p className="mb-4 text-gray-700">Data berhasil dihapus!</p>
            <button onClick={() => setIsDeleteSuccessOpen(false)} className="bg-blue-500 text-white px-4 py-2 rounded">OK</button>
          </div>
        </div>
      )}

      {isConfirmDeleteOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm text-center">
            <div className="mb-4">
              <svg className="w-12 h-12 text-red-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
              </svg>
            </div>
            <h2 className="text-lg font-bold mb-2 text-red-600">Konfirmasi Penghapusan</h2>
            <p className="mb-4 text-gray-700">Apakah Anda yakin ingin menghapus data ini?</p>
            <div className="flex justify-center space-x-4">
              <button 
                onClick={() => setIsConfirmDeleteOpen(false)} 
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Batal
              </button>
              <button 
                onClick={executeDelete} 
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Penelitian; 