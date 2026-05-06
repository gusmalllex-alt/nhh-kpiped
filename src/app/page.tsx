"use client";

import React, { useState } from "react";
import { 
  Users, 
  Baby, 
  Activity, 
  Syringe, 
  CalendarDays,
  TrendingUp,
  Download,
  Search,
  Filter
} from "lucide-react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts";

// Mock Data
const kpiSummary = [
  { id: 1, title: "ผู้ป่วยเด็กทั้งหมด", value: "1,248", unit: "คน", icon: Baby, color: "text-blue-500", bg: "bg-blue-100" },
  { id: 2, title: "อัตราการติดเชื้อ", value: "0.8", unit: "%", icon: Activity, color: "text-pink-500", bg: "bg-pink-100" },
  { id: 3, title: "รับวัคซีนครบถ้วน", value: "95.2", unit: "%", icon: Syringe, color: "text-emerald-500", bg: "bg-emerald-100" },
  { id: 4, title: "จำนวนวันนอนเฉลี่ย", value: "3.4", unit: "วัน", icon: CalendarDays, color: "text-purple-500", bg: "bg-purple-100" },
];

const monthlyData = [
  { month: "ม.ค.", admissions: 120, infections: 2 },
  { month: "ก.พ.", admissions: 135, infections: 1 },
  { month: "มี.ค.", admissions: 148, infections: 3 },
  { month: "เม.ย.", admissions: 110, infections: 0 },
  { month: "พ.ค.", admissions: 165, infections: 1 },
  { month: "มิ.ย.", admissions: 180, infections: 2 },
];

const recentPatients = [
  { id: "HN10293", name: "ด.ช. สมชาย ใจดี", age: "5 ขวบ", diagnosis: "Pneumonia", status: "Admitted", date: "06 พ.ค. 2026" },
  { id: "HN10294", name: "ด.ญ. สมหญิง รักเรียน", age: "2 ขวบ", diagnosis: "RSV", status: "Discharged", date: "05 พ.ค. 2026" },
  { id: "HN10295", name: "ด.ช. ปิติ มุ่งมั่น", age: "8 เดือน", diagnosis: "Gastroenteritis", status: "Admitted", date: "04 พ.ค. 2026" },
  { id: "HN10296", name: "ด.ญ. นารี สุขใจ", age: "7 ขวบ", diagnosis: "Dengue Fever", status: "Observation", date: "03 พ.ค. 2026" },
];

export default function PediatricDashboard() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans">
      
      {/* Header Section */}
      <header className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">ระบบติดตามตัวชี้วัด (KPI)</h1>
          <p className="text-slate-500 mt-1 flex items-center gap-2">
            <Baby className="w-5 h-5 text-blue-500" /> ตึกเด็ก โรงพยาบาลหนองหาน
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-xl shadow-sm hover:bg-slate-50 transition-colors font-medium">
            <Filter className="w-4 h-4" /> กรองข้อมูล
          </button>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl shadow-sm shadow-blue-200 hover:bg-blue-700 transition-colors font-medium">
            <Download className="w-4 h-4" /> ส่งออกรายงาน
          </button>
        </div>
      </header>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {kpiSummary.map((kpi) => (
          <div key={kpi.id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-start justify-between group hover:shadow-md transition-shadow">
            <div>
              <p className="text-slate-500 text-sm font-medium mb-1">{kpi.title}</p>
              <div className="flex items-baseline gap-2">
                <h3 className="text-3xl font-bold text-slate-800">{kpi.value}</h3>
                <span className="text-sm font-medium text-slate-400">{kpi.unit}</span>
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs font-medium text-emerald-600 bg-emerald-50 w-fit px-2 py-1 rounded-md">
                <TrendingUp className="w-3 h-3" /> +2.5% จากเดือนก่อน
              </div>
            </div>
            <div className={`p-3 rounded-xl ${kpi.bg}`}>
              <kpi.icon className={`w-6 h-6 ${kpi.color}`} />
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        
        {/* Main Line Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-slate-800">สถิติผู้ป่วยรับใหม่ (Admissions)</h2>
            <select className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500/20">
              <option>ปี 2026</option>
              <option>ปี 2025</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  cursor={{ stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '4 4' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="admissions" 
                  name="จำนวนผู้ป่วย (คน)"
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  dot={{ r: 4, strokeWidth: 2, fill: '#fff' }}
                  activeDot={{ r: 6, strokeWidth: 0, fill: '#3b82f6' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Small Bar Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <h2 className="text-lg font-bold text-slate-800 mb-6">อัตราการติดเชื้อรายเดือน</h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData} margin={{ top: 5, right: 0, bottom: 5, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <Tooltip 
                  cursor={{ fill: '#f1f5f9' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="infections" name="จำนวนติดเชื้อ (ครั้ง)" fill="#ec4899" radius={[4, 4, 0, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Data Table Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-lg font-bold text-slate-800">ข้อมูลผู้ป่วยล่าสุด (จำลอง)</h2>
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="ค้นหา HN, ชื่อ..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-sm w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-500 uppercase font-semibold text-xs">
              <tr>
                <th className="px-6 py-4">HN</th>
                <th className="px-6 py-4">ชื่อ - สกุล</th>
                <th className="px-6 py-4">อายุ</th>
                <th className="px-6 py-4">การวินิจฉัย (Diagnosis)</th>
                <th className="px-6 py-4">สถานะ</th>
                <th className="px-6 py-4 text-right">วันที่</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentPatients.map((patient, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-800">{patient.id}</td>
                  <td className="px-6 py-4">{patient.name}</td>
                  <td className="px-6 py-4">{patient.age}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                      {patient.diagnosis}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                      ${patient.status === 'Admitted' ? 'bg-blue-100 text-blue-700' : 
                        patient.status === 'Discharged' ? 'bg-emerald-100 text-emerald-700' : 
                        'bg-amber-100 text-amber-700'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 
                        ${patient.status === 'Admitted' ? 'bg-blue-500' : 
                        patient.status === 'Discharged' ? 'bg-emerald-500' : 
                        'bg-amber-500'}`}></span>
                      {patient.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right text-slate-500">{patient.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
    </div>
  );
}
