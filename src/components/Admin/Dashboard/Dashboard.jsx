'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  FaSignOutAlt, 
  FaCalendar, 
  FaImage, 
  FaCog, 
  FaUsers,
  FaMoneyBillWave,
  FaChartBar,
  FaHome,
  FaUserCog
} from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const router = useRouter();

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth');
    const adminUser = localStorage.getItem('adminUser');
    
    if (auth === 'true' && adminUser) {
      setIsAuthenticated(true);
      setUser(adminUser);
    } else {
      router.push('/admin/login');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    localStorage.removeItem('adminUser');
    localStorage.removeItem('galleryData');
    router.push('/admin/login');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  const stats = [
    { label: 'Total Bookings', value: '156', icon: <FaCalendar />, color: 'yellow', change: '+12%' },
    { label: 'Pending Approvals', value: '12', icon: <FaUsers />, color: 'blue', change: '+5%' },
    { label: 'Monthly Revenue', value: '₹2.4L', icon: <FaMoneyBillWave />, color: 'green', change: '+18%' },
    { label: 'Gallery Items', value: '48', icon: <FaImage />, color: 'purple', change: '+8%' }
  ];

  const navigation = [
    { id: 'overview', label: 'Overview', icon: <FaHome />, href: '/admin/dashboard' },
    { id: 'bookings', label: 'Bookings', icon: <FaCalendar />, href: '/admin/dashboard/bookings' },
    { id: 'gallery', label: 'Gallery', icon: <FaImage />, href: '/admin/dashboard/gallery' },
    { id: 'users', label: 'Users', icon: <FaUsers />, href: '/admin/dashboard/users' },
    { id: 'reports', label: 'Reports', icon: <FaChartBar />, href: '/admin/dashboard/reports' },
    { id: 'settings', label: 'Settings', icon: <FaCog />, href: '/admin/dashboard/settings' },
  ];

  const recentActivities = [
    { type: 'booking', message: 'New booking from Sarah Ahmed', time: '2 min ago', status: 'pending' },
    { type: 'gallery', message: 'New image uploaded to gallery', time: '1 hour ago', status: 'completed' },
    { type: 'payment', message: 'Payment received for booking #12345', time: '3 hours ago', status: 'completed' },
    { type: 'user', message: 'New user registration', time: '5 hours ago', status: 'pending' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900/80 backdrop-blur-lg border-r border-yellow-500/30">
        <div className="p-6 border-b border-yellow-500/30">
          <h1 className="text-2xl font-cinzel font-bold gold-gradient">
            GrandVenue Admin
          </h1>
          <p className="text-gray-400 text-sm mt-1">Management Portal</p>
        </div>

        <nav className="p-4 space-y-2">
          {navigation.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                activeTab === item.id
                  ? 'bg-yellow-500 text-black font-semibold'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
              onClick={() => setActiveTab(item.id)}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-300 w-full border border-red-500/30"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-gray-900/50 backdrop-blur-lg border-b border-yellow-500/30 p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-cinzel font-bold text-white capitalize">
                {activeTab}
              </h2>
              <p className="text-gray-400">Welcome back, {user}</p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-white font-semibold">{user}</p>
                <p className="text-gray-400 text-sm">Administrator</p>
              </div>
              <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold">
                {user.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-6">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-yellow-500/30"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-${stat.color}-500/20 text-${stat.color}-400`}>
                    {stat.icon}
                  </div>
                  <span className={`text-${stat.color}-400 text-sm font-semibold`}>
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
                <p className="text-gray-400 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Activities */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-yellow-500/30"
            >
              <h3 className="text-xl font-cinzel font-bold text-yellow-400 mb-4">
                Recent Activities
              </h3>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 bg-gray-800/50 rounded-lg">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.status === 'pending' ? 'bg-yellow-400' : 'bg-green-400'
                    }`}></div>
                    <div className="flex-1">
                      <p className="text-white text-sm">{activity.message}</p>
                      <p className="text-gray-400 text-xs">{activity.time}</p>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs ${
                      activity.status === 'pending' 
                        ? 'bg-yellow-500/20 text-yellow-400' 
                        : 'bg-green-500/20 text-green-400'
                    }`}>
                      {activity.status}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-yellow-500/30"
            >
              <h3 className="text-xl font-cinzel font-bold text-yellow-400 mb-4">
                Quick Actions
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <Link
                  href="/admin/dashboard/bookings"
                  className="p-4 bg-yellow-500/20 border border-yellow-500/30 rounded-xl text-yellow-400 hover:bg-yellow-500/30 transition-all text-center"
                >
                  <FaCalendar className="text-2xl mx-auto mb-2" />
                  <span className="text-sm">Manage Bookings</span>
                </Link>
                <Link
                  href="/admin/dashboard/gallery"
                  className="p-4 bg-blue-500/20 border border-blue-500/30 rounded-xl text-blue-400 hover:bg-blue-500/30 transition-all text-center"
                >
                  <FaImage className="text-2xl mx-auto mb-2" />
                  <span className="text-sm">Update Gallery</span>
                </Link>
                <Link
                  href="/admin/dashboard/reports"
                  className="p-4 bg-green-500/20 border border-green-500/30 rounded-xl text-green-400 hover:bg-green-500/30 transition-all text-center"
                >
                  <FaChartBar className="text-2xl mx-auto mb-2" />
                  <span className="text-sm">View Reports</span>
                </Link>
                <Link
                  href="/admin/dashboard/settings"
                  className="p-4 bg-purple-500/20 border border-purple-500/30 rounded-xl text-purple-400 hover:bg-purple-500/30 transition-all text-center"
                >
                  <FaCog className="text-2xl mx-auto mb-2" />
                  <span className="text-sm">Settings</span>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}