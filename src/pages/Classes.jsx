import React, { useState } from 'react';
import {
  AddOutlined,
  SearchOutlined,
  FilterListOutlined,
  ArchiveOutlined,
  MoreVertOutlined,
  PeopleAltOutlined,
  SchoolOutlined,
  RefreshOutlined,
  KeyboardArrowDownOutlined
} from '@mui/icons-material';

const initialGroups = [
  {
    id: 1,
    status: 'FAOL',
    name: 'N26',
    course: 'Backend',
    duration: '6 oy',
    time: '09:30',
    days: 'Du, Se, Chor, Pay, Ju',
    room: 'Autodesk',
    teacher: 'Mohirbek',
    students: 1,
    active: true,
  },
  {
    id: 2,
    status: 'FAOL',
    name: 'n105',
    course: 'Backend',
    duration: '6 oy',
    time: '16:00',
    days: 'Se, Pay, Shan',
    room: 'Autodesk',
    teacher: 'Mohirbek',
    students: 4,
    active: true,
  },
];

const Classes = () => {
  const [activeTab, setActiveTab] = useState('Guruhlar');
  const [search, setSearch] = useState('');

  return (
    <div className="p-4 lg:p-6 bg-[#f1f5f9] h-full flex flex-col overflow-hidden">
      {/* ── Page Header ── */}
      <div className="flex justify-between items-start mb-6 shrink-0">
        <h1 className="m-0 text-[26px] font-bold text-[#1a1a2e] tracking-tight">Guruhlar</h1>
        <button className="flex items-center gap-1.5 p-[10px_20px] border-none rounded-[10px] bg-[#7c4dff] text-white text-[13.5px] font-semibold cursor-pointer whitespace-nowrap hover:opacity-90 shadow-[0_4px_12px_rgba(124,77,255,0.2)]">
          <AddOutlined fontSize="small" /> Guruh qo'shish
        </button>
      </div>

      {/* ── Tabs ── */}
      <div className="flex gap-2 mb-4 shrink-0">
        <button
          onClick={() => setActiveTab('Guruhlar')}
          className={`px-4 py-2 rounded-[10px] text-[13.5px] font-semibold cursor-pointer transition-colors border ${
            activeTab === 'Guruhlar'
              ? 'bg-white text-[#1a1a2e] border-[#e5e7eb] shadow-sm'
              : 'bg-transparent text-[#6b7280] border-transparent hover:bg-white/50'
          }`}
        >
          Guruhlar
        </button>
        <button
          onClick={() => setActiveTab('Arxiv')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-[10px] text-[13.5px] font-medium cursor-pointer transition-colors border ${
            activeTab === 'Arxiv'
              ? 'bg-white text-[#1a1a2e] border-[#e5e7eb] shadow-sm'
              : 'bg-transparent text-[#6b7280] border-transparent hover:bg-white/50'
          }`}
        >
          <ArchiveOutlined style={{ fontSize: 18 }} /> Arxiv
        </button>
      </div>

      {/* ── KPI Cards ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 shrink-0">
        {/* Card 1 */}
        <div className="bg-white p-[18px_24px] rounded-[16px] shadow-[0_1px_8px_rgba(0,0,0,0.04)] relative">
          <div className="w-[34px] h-[34px] rounded-[10px] bg-[#f5f5fb] flex items-center justify-center mb-2">
            <PeopleAltOutlined className="text-[#6b7280]" style={{ fontSize: 20 }} />
          </div>
          <MoreVertOutlined className="absolute top-4 right-4 text-[#9ca3af] cursor-pointer" style={{ fontSize: 20 }} />
          <p className="m-0 text-[12.5px] text-[#6b7280] font-medium mb-1">Jami guruhlar</p>
          <p className="m-0 text-[28px] font-bold text-[#1a1a2e]">2</p>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-[18px_24px] rounded-[16px] shadow-[0_1px_8px_rgba(0,0,0,0.04)] relative">
          <div className="w-[34px] h-[34px] rounded-[10px] bg-[#f5f5fb] flex items-center justify-center mb-2">
            <PeopleAltOutlined className="text-[#6b7280]" style={{ fontSize: 20 }} />
          </div>
          <MoreVertOutlined className="absolute top-4 right-4 text-[#9ca3af] cursor-pointer" style={{ fontSize: 20 }} />
          <p className="m-0 text-[12.5px] text-[#6b7280] font-medium mb-1">O'qituvchilar</p>
          <p className="m-0 text-[28px] font-bold text-[#1a1a2e]">0</p>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-[18px_24px] rounded-[16px] shadow-[0_1px_8px_rgba(0,0,0,0.04)] relative flex justify-between items-end">
          <div>
            <div className="w-[34px] h-[34px] rounded-[10px] bg-[#f5f5fb] flex items-center justify-center mb-2">
              <SchoolOutlined className="text-[#6b7280]" style={{ fontSize: 20 }} />
            </div>
            <p className="m-0 text-[12.5px] text-[#6b7280] font-medium mb-1">O'quvchilar</p>
            <p className="m-0 text-[28px] font-bold text-[#1a1a2e]">0</p>
          </div>
          <MoreVertOutlined className="absolute top-4 right-4 text-[#9ca3af] cursor-pointer" style={{ fontSize: 20 }} />
          {/* Overlapping avatars */}
          <div className="flex -space-x-2">
            <div className="w-[26px] h-[26px] rounded-full bg-[#1a1a2e] text-white flex items-center justify-center text-[11px] font-bold border-2 border-white relative z-10">M</div>
            <div className="w-[26px] h-[26px] rounded-full bg-[#f97316] text-white flex items-center justify-center text-[11px] font-bold border-2 border-white relative z-20">M</div>
            <div className="w-[26px] h-[26px] rounded-full bg-[#ec4899] text-white flex items-center justify-center text-[11px] font-bold border-2 border-white relative z-30">N</div>
          </div>
        </div>
      </div>

      {/* ── Table Card ── */}
      <div className="bg-white rounded-[16px] shadow-[0_1px_8px_rgba(0,0,0,0.06)] flex flex-col flex-1 min-h-0">
        
        {/* Toolbar */}
        <div className="flex items-center justify-between p-[14px_18px] border-b border-[#f1f1f5] shrink-0">
          {/* Search */}
          <div className="relative w-[240px]">
            <SearchOutlined className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af]" style={{ fontSize: 18 }} />
            <input 
              placeholder="Qidirish..." 
              value={search} 
              onChange={e => setSearch(e.target.value)}
              className="w-full p-[9px_14px_9px_38px] rounded-[10px] border-[1.5px] border-[#e5e7eb] text-[13px] outline-none bg-white focus:border-[#7c4dff] transition-colors placeholder-[#9ca3af]" 
            />
          </div>
          {/* Right Buttons */}
          <div className="flex gap-2.5 items-center">
            <button className="flex items-center gap-1.5 p-[8px_16px] border-[1.5px] border-[#e5e7eb] rounded-[10px] bg-white text-[13px] text-[#374151] font-medium cursor-pointer hover:bg-[#f5f5fb] transition-colors">
              <FilterListOutlined style={{ fontSize: 18 }} /> Filters
            </button>
            <button className="flex items-center gap-1.5 p-[8px_16px] border-[1.5px] border-[#e5e7eb] rounded-[10px] bg-white text-[13px] text-[#374151] font-medium cursor-pointer hover:bg-[#f5f5fb] transition-colors">
              <ArchiveOutlined style={{ fontSize: 18 }} /> Arxiv
            </button>
          </div>
        </div>

        {/* Table Content */}
        <div className="flex-1 overflow-auto">
          <table className="w-full border-collapse text-[13px] min-w-[1000px]">
            <thead className="sticky top-0 bg-white z-10">
              <tr className="border-b border-[#f1f1f5]">
                <th className="p-[14px_24px] text-left font-semibold text-[#6b7280] text-[12.5px] whitespace-nowrap w-[140px]">Status</th>
                <th className="p-[14px_16px] text-left font-semibold text-[#6b7280] text-[12.5px] whitespace-nowrap">Guruh nomi</th>
                <th className="p-[14px_16px] text-left font-semibold text-[#6b7280] text-[12.5px] whitespace-nowrap">Kurs</th>
                <th className="p-[14px_16px] text-center font-semibold text-[#6b7280] text-[12.5px] whitespace-nowrap">Davomiyligi</th>
                <th className="p-[14px_16px] text-center font-semibold text-[#6b7280] text-[12.5px] whitespace-nowrap">Dars vaqti</th>
                <th className="p-[14px_16px] text-left font-semibold text-[#6b7280] text-[12.5px] whitespace-nowrap">Xona</th>
                <th className="p-[14px_16px] text-left font-semibold text-[#6b7280] text-[12.5px] whitespace-nowrap">O'qituvchi</th>
                <th className="p-[14px_16px] text-center font-semibold text-[#6b7280] text-[12.5px] whitespace-nowrap">Talabalar</th>
                <th className="p-[14px_24px] text-right font-semibold text-[#6b7280] text-[12.5px] whitespace-nowrap">
                  <RefreshOutlined style={{ fontSize: 18, cursor: 'pointer' }} />
                </th>
              </tr>
            </thead>
            <tbody>
              {initialGroups.map((group, idx) => (
                <tr key={group.id} className="border-b border-[#f1f1f5] hover:bg-[#fafafa] transition-colors group">
                  {/* Status Toggle + Pill */}
                  <td className="p-[16px_24px]">
                    <div className="flex items-center gap-3">
                      {/* Custom Toggle Switch */}
                      <div className={`w-[36px] h-[20px] rounded-full relative cursor-pointer transition-colors ${group.active ? 'bg-[#7c4dff]' : 'bg-[#d1d5db]'}`}>
                        <div className={`absolute top-[2px] w-[16px] h-[16px] bg-white rounded-full transition-all shadow-sm ${group.active ? 'right-[2px]' : 'left-[2px]'}`}></div>
                      </div>
                      {/* FAOL Pill */}
                      <span className="px-[8px] py-[3px] rounded-[6px] text-[10.5px] font-bold tracking-wide bg-[#e8f5e9] text-[#2e7d32]">
                        {group.status}
                      </span>
                    </div>
                  </td>
                  
                  {/* Guruh nomi */}
                  <td className="p-[16px_16px]">
                    <span className="font-bold text-[#1a1a2e] text-[13.5px]">{group.name}</span>
                  </td>
                  
                  {/* Kurs Pill */}
                  <td className="p-[16px_16px]">
                    <span className="px-[10px] py-[5px] rounded-[8px] text-[11.5px] font-bold bg-[#f3e8ff] text-[#9333ea]">
                      {group.course}
                    </span>
                  </td>
                  
                  {/* Davomiyligi */}
                  <td className="p-[16px_16px] text-center">
                    <span className="text-[#374151] font-medium">{group.duration}</span>
                  </td>
                  
                  {/* Dars vaqti */}
                  <td className="p-[16px_16px] text-center">
                    <div className="flex flex-col">
                      <span className="font-bold text-[#1a1a2e] mb-0.5">{group.time}</span>
                      <span className="text-[12px] text-[#6b7280] whitespace-nowrap">{group.days}</span>
                    </div>
                  </td>
                  
                  {/* Xona */}
                  <td className="p-[16px_16px]">
                    <span className="text-[#374151] font-medium">{group.room}</span>
                  </td>
                  
                  {/* O'qituvchi Pill */}
                  <td className="p-[16px_16px]">
                    <span className="px-[12px] py-[6px] rounded-full bg-[#f3f4f6] text-[#374151] font-semibold text-[12px]">
                      {group.teacher}
                    </span>
                  </td>
                  
                  {/* Talabalar */}
                  <td className="p-[16px_16px] text-center">
                    <span className="font-bold text-[#1a1a2e] text-[14px]">{group.students}</span>
                  </td>
                  
                  {/* Actions */}
                  <td className="p-[16px_24px] text-right">
                    <button className="bg-transparent border-none p-1 cursor-pointer text-[#9ca3af] hover:text-[#1a1a2e] opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreVertOutlined style={{ fontSize: 20 }} />
                    </button>
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

export default Classes;
