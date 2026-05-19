import { useState, useRef, useEffect } from 'react';
import {
  AddOutlined, DeleteOutlineOutlined, EditOutlined,
  SearchOutlined, FilterListOutlined, ArchiveOutlined,
  CloseOutlined, ChevronLeftOutlined, ChevronRightOutlined,
  EmailOutlined, CalendarTodayOutlined, CloudUploadOutlined,
  LocationOnOutlined, VisibilityOutlined,
} from '@mui/icons-material';



const BADGE_COLORS = [
  { bg: '#e8f0fe', text: '#1565c0' },
  { bg: '#fce8f3', text: '#c2185b' },
  { bg: '#fff3e0', text: '#e65100' },
  { bg: '#e8f5e9', text: '#2e7d32' },
];

const Avatar = ({ name }) => (
  <div className="w-8 h-8 rounded-full bg-[#ede9ff] flex items-center justify-center font-bold text-[13px] text-[#7c4dff] shrink-0">
    {name?.charAt(0)?.toUpperCase() || 'S'}
  </div>
);

const LIMIT = 5;

const Students = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [page, setPage]         = useState(1);
  const [refresh, setRefresh]   = useState(0); // API ni qayta chaqirish uchun trigger

  const [search, setSearch]         = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editId, setEditId]         = useState(null);
  const [showArchived, setShowArchived] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [filterGuruh, setFilterGuruh] = useState('');
  const [form, setForm] = useState({ name: '', phone: '+998', email: '', born: '', guruh: '', manzil: '', avatarName: '', password: '' });
  const fileInputRef = useRef(null);

  // Fetch students from API
  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('accessToken');
        const res = await fetch(
          `https://najot-edu.softwareengineer.uz/api/v1/students?limit=1000`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (res.status === 401) {
          localStorage.removeItem('isLogged');
          localStorage.removeItem('accessToken');
          window.location.reload();
          return;
        }
        if (res.ok) {
          const data = await res.json();
          console.log('Students API fetch response:', data); // Xatoni topish uchun log

          // Backenddan kelgan data formatini aniqlash va array'ni olish
          let list = [];
          if (Array.isArray(data)) list = data;
          else if (Array.isArray(data.data)) list = data.data;
          else if (Array.isArray(data.students)) list = data.students;
          else if (Array.isArray(data.items)) list = data.items;
          else if (data.data && Array.isArray(data.data.students)) list = data.data.students;
          else if (data.data && Array.isArray(data.data.items)) list = data.data.items;

          const total = data.total || data.totalCount || data.count || (data.data && data.data.total) || list.length;
          
          const mapped = list.map((s, i) => ({
            id: s.id || s._id || i + 1,
            name: `${s.first_name || ''} ${s.last_name || ''}`.trim() || s.name || s.fullName || '',
            guruhlar: s.groups ? s.groups.map(g => g.name || g) : (s.group ? [s.group] : []),
            phone: s.phone || '',
            email: s.email || '',
            born: (() => {
              const raw = s.birth_date || s.birthDate || s.born || '';
              if (!raw) return '';
              try {
                const d = new Date(raw);
                if (isNaN(d)) return raw;
                return d.toLocaleDateString('uz-UZ', { day: '2-digit', month: '2-digit', year: 'numeric' });
              } catch { return raw; }
            })(),
            manzil: s.address || s.manzil || '',
            created: s.createdAt || s.created_at
              ? new Date(s.createdAt || s.created_at).toLocaleDateString('ru-RU')
              : '',
            selected: false,
            archived: false,
          }));
          setStudents(mapped);
        }
      } catch (e) {
        console.error('Students fetch error:', e);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, [refresh]);

  const filteredStudents = students.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.phone.includes(search);
    const matchArchived = showArchived ? s.archived : !s.archived;
    const matchGroup = filterGuruh ? (s.guruhlar || []).includes(filterGuruh) : true;
    return matchSearch && matchArchived && matchGroup;
  });
  
  const totalPages = Math.max(1, Math.ceil(filteredStudents.length / LIMIT));
  const paginated  = filteredStudents.slice((page - 1) * LIMIT, page * LIMIT);
  const allChecked = paginated.length > 0 && paginated.every(s => s.selected);

  const toggleSelect = id => setStudents(p => p.map(s => s.id === id ? { ...s, selected: !s.selected } : s));
  const toggleAll    = () => {
    const all = paginated.every(s => s.selected);
    setStudents(p => p.map(s => ({ ...s, selected: !all })));
  };
  const deleteOne = id => setStudents(p => p.filter(s => s.id !== id));
  const archiveOne = id => setStudents(p => p.map(s => s.id === id ? { ...s, archived: !s.archived } : s));

  const resetForm = () => setForm({ name: '', phone: '+998', email: '', born: '', guruh: '', manzil: '', avatarName: '', password: '' });

  const openAdd  = ()  => { setEditId(null); resetForm(); setDrawerOpen(true); };
  const openEdit = (s) => {
    setEditId(s.id);
    setForm({ name: s.name, phone: s.phone, email: s.email, born: s.born, guruh: (s.guruhlar || []).join(', '), manzil: s.manzil, avatarName: '', password: '' });
    setDrawerOpen(true);
  };

  const handleSave = async () => {
    if (!form.name.trim()) return;
    const guruhlar = form.guruh.split(',').map(g => g.trim()).filter(Boolean);
    if (editId !== null) {
      // Local edit
      setStudents(p => p.map(s => s.id === editId ? { ...s, name: form.name.trim(), phone: form.phone, email: form.email, born: form.born, guruhlar, manzil: form.manzil } : s));
    } else {
      // POST yangi talaba
      try {
        const token = localStorage.getItem('accessToken');
        
       
        let isoDate = null;
        if (form.born) {
          const parts = form.born.split('.');
          if (parts.length === 3) {
            isoDate = `${parts[2]}-${parts[1]}-${parts[0]}T00:00:00.000Z`;
          } else {
            try { isoDate = new Date(form.born).toISOString(); } catch { /* ignore */ }
          }
        }

        const res = await fetch('https://najot-edu.softwareengineer.uz/api/v1/students', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            full_name: form.name.trim(),
            phone: form.phone,
            email: form.email,
            password: form.password || 'Student123!', 
            address: form.manzil || '',
            birth_date: isoDate,
          })
        });
        
        if (res.ok) {
          // Muvaffaqiyatli saqlandi, ro'yxatni yangilash uchun fetch qildiramiz
          setRefresh(r => r + 1);
        } else {
          let errMsg = 'Xatolik yuz berdi!';
          if (res.status === 409) {
            errMsg = 'Bu telefon raqam yoki email allaqachon mavjud!';
          } else {
            try {
              const err = await res.json();
              errMsg = err.message || err.error || JSON.stringify(err);
            } catch {
              errMsg = `Server xatosi: ${res.status}`;
            }
          }
          alert(errMsg);
          return;
        }
      } catch {
        alert('Server bilan ulanishda xatolik!');
        return;
      }
    }
    resetForm(); setEditId(null); setDrawerOpen(false);
  };

  const pageNums = () => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    return [1, 2, 3, '...', totalPages - 2, totalPages - 1, totalPages];
  };

  return (
    <div className="p-2 sm:p-4 lg:p-6 bg-[#f1f5f9] h-full flex flex-col overflow-hidden">

      {/* Drawer overlay */}
      {drawerOpen && (
        <div onClick={() => { setDrawerOpen(false); resetForm(); }}
          className="fixed inset-0 z-[1100] bg-black/20" />
      )}

      {/* Slide-out Drawer */}
      <div className={`fixed top-0 right-0 h-screen w-full sm:w-[420px] bg-white z-[1200] flex flex-col shadow-[-4px_0_24px_rgba(0,0,0,0.10)] transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${drawerOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-[20px_20px_14px] border-b border-[#f1f1f5] flex justify-between items-start">
          <div>
            <h2 className="m-0 mb-1 text-[16px] font-bold text-[#1a1a2e]">{editId ? "Talabani tahrirlash" : "Talaba qo'shish"}</h2>
            <p className="m-0 text-[12.5px] text-[#9ca3af]">Bu yerda siz yangi talaba qo'shishingiz mumkin.</p>
          </div>
          <button onClick={() => { setDrawerOpen(false); resetForm(); }} className="bg-transparent border-none cursor-pointer text-[#9ca3af] flex p-[2px]">
            <CloseOutlined fontSize="small" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-[20px_24px]">
          <div className="mb-4">
            <label className="block text-[13px] font-bold text-[#1a1a2e] mb-[8px]">Telefon raqam</label>
            <input type="text" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
              className="w-full p-[10px_14px] rounded-[10px] border-[1.5px] border-[#e5e7eb] text-[13.5px] outline-none box-border focus:border-[#7c4dff] text-[#1a1a2e]" />
          </div>
          <div className="mb-4">
            <label className="block text-[13px] font-bold text-[#1a1a2e] mb-[8px]">Mail</label>
            <input type="email" placeholder="Elektron pochtani kiriting" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
              className="w-full p-[10px_14px] rounded-[10px] border-[1.5px] border-[#e5e7eb] text-[13.5px] outline-none box-border focus:border-[#7c4dff] placeholder-[#9ca3af] text-[#1a1a2e]" />
          </div>
          <div className="mb-4">
            <label className="block text-[13px] font-bold text-[#1a1a2e] mb-[8px]">Talaba FIO</label>
            <input type="text" placeholder="Ma'lumotni kiriting" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
              className="w-full p-[10px_14px] rounded-[10px] border-[1.5px] border-[#e5e7eb] text-[13.5px] outline-none box-border focus:border-[#7c4dff] placeholder-[#9ca3af] text-[#1a1a2e]" />
          </div>
          <div className="mb-4">
            <label className="block text-[13px] font-bold text-[#1a1a2e] mb-[8px]">Tug'ilgan sanasi</label>
            <div className="relative">
              <input type="text" placeholder="dd/mm/yyyy" value={form.born} onChange={e => setForm({ ...form, born: e.target.value })}
                className="w-full p-[10px_14px_10px_14px] rounded-[10px] border-[1.5px] border-[#e5e7eb] text-[13.5px] outline-none box-border focus:border-[#7c4dff] placeholder-[#9ca3af] text-[#1a1a2e]" />
              <CalendarTodayOutlined className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1a1a2e]" style={{ fontSize: 18 }} />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-[13px] font-bold text-[#1a1a2e] mb-[8px]">Manzil</label>
            <input type="text" placeholder="Manzilni kiriting" value={form.manzil} onChange={e => setForm({ ...form, manzil: e.target.value })}
              className="w-full p-[10px_14px] rounded-[10px] border-[1.5px] border-[#e5e7eb] text-[13.5px] outline-none box-border focus:border-[#7c4dff] placeholder-[#9ca3af] text-[#1a1a2e]" />
          </div>
          <div className="mb-4">
            <label className="block text-[13px] font-bold text-[#1a1a2e] mb-[8px]">Parol</label>
            <input type="password" placeholder="Parolni kiriting" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}
              className="w-full p-[10px_14px] rounded-[10px] border-[1.5px] border-[#e5e7eb] text-[13.5px] outline-none box-border focus:border-[#7c4dff] placeholder-[#9ca3af] text-[#1a1a2e]" />
          </div>
          <div className="mb-4">
            <label className="block text-[13px] font-bold text-[#1a1a2e] mb-[8px]">Guruh</label>
            <button className="w-full flex items-center justify-start gap-2 p-[12px_14px] rounded-[10px] border-[1.5px] border-[#e5e7eb] bg-white cursor-pointer hover:border-[#7c4dff] transition-colors">
              <span className="text-[#7c4dff] font-bold text-[18px] leading-none mb-0.5">+</span>
              <span className="text-[#7c4dff] font-bold text-[14px]">Guruh qo'shish</span>
            </button>
          </div>
          <div className="mb-4">
            <label className="block text-[13px] font-bold text-[#1a1a2e] mb-[8px]">Surati</label>
            <div onClick={() => fileInputRef.current?.click()}
              className="border-[1.5px] border-dashed border-[#e5e7eb] rounded-[12px] p-[28px_14px] text-center cursor-pointer bg-white hover:border-[#7c4dff] transition-colors relative">
              <CloudUploadOutlined style={{ fontSize: 32, color: '#9ca3af', mb: '8px' }} />
              <p className="m-0 mb-1 text-[13px] text-[#374151] font-medium mt-2"><span className="text-[#7c4dff] font-bold">Click to upload</span> or drag and drop</p>
              <p className="m-0 text-[11.5px] text-[#9ca3af]">JPG or PNG (max. 2 MB)</p>
              {form.avatarName && <p className="m-0 mt-2 text-[12px] text-[#7c4dff] font-bold">{form.avatarName}</p>}
            </div>
            <input ref={fileInputRef} type="file" accept="image/jpeg,image/png" className="hidden"
              onChange={e => { if (e.target.files[0]) setForm(p => ({ ...p, avatarName: e.target.files[0].name })); }} />
          </div>
        </div>

        <div className="p-[16px_24px] border-t border-[#f1f1f5] flex gap-3 justify-between">
          <button onClick={() => { setDrawerOpen(false); resetForm(); }}
            className="flex-1 p-[11px_18px] rounded-[10px] border-[1.5px] border-[#e5e7eb] bg-white text-[#4b5563] text-[13.5px] font-bold cursor-pointer hover:bg-[#f5f5fb] transition-colors">
            Bekor qilish
          </button>
          <button onClick={handleSave}
            className={`flex-1 p-[11px_18px] rounded-[10px] border-none text-[13.5px] font-bold transition-colors ${form.name.trim() ? 'bg-[#7c4dff] text-white cursor-pointer shadow-[0_2px_8px_rgba(124,77,255,0.2)] hover:opacity-90' : 'bg-[#f3f4f6] text-[#9ca3af] cursor-default'}`}>
            Saqlash
          </button>
        </div>
      </div>

      {/* ── Page Header ── */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="m-0 mb-1 text-[22px] font-bold text-[#1a1a2e]">Talabalar</h1>
          <p className="m-0 text-[13px] text-[#9ca3af]">
            Ushbu sahifada siz Talabalar ro'yxatini va ularning ma'lumotlarini topasiz. Har bir Talaba ismi, fanlari va aloqa ma'lumotlari keltirilgan.
          </p>
        </div>
        <button onClick={openAdd}
          className="flex items-center gap-1.5 p-[10px_20px] border-none rounded-[10px] bg-[#7c4dff] text-white text-[13px] font-semibold cursor-pointer whitespace-nowrap hover:opacity-90 shrink-0 ml-6">
          <AddOutlined fontSize="small" /> Talaba qo'shish
        </button>
      </div>

      {/* ── White Card ── */}
      <div className="bg-white rounded-[16px] shadow-[0_1px_8px_rgba(0,0,0,0.06)] flex flex-col flex-1 min-h-0">

        {/* Toolbar inside card */}
        <div className="flex items-center justify-between p-[14px_18px] border-b border-[#f1f1f5] gap-3 shrink-0">
          {/* Search */}
          <div className="relative w-[220px]">
            <SearchOutlined className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#9ca3af]" style={{ fontSize: 18 }} />
            <input placeholder="Search" value={search} onChange={e => { setSearch(e.target.value); setPage(1); }}
              className="w-full p-[8px_14px_8px_34px] rounded-[8px] border-[1.5px] border-[#e5e7eb] text-[13px] outline-none bg-white focus:border-[#7c4dff]" />
          </div>
          {/* Right buttons */}
          <div className="flex gap-2 items-center">
            <div className="relative">
              <button onClick={() => setShowFilter(f => !f)}
                className={`flex items-center gap-1.5 p-[7px_14px] border-[1.5px] rounded-[8px] text-[13px] cursor-pointer transition-colors ${showFilter ? 'border-[#7c4dff] bg-[#f0ebff] text-[#7c4dff]' : 'border-[#e5e7eb] bg-white text-[#374151] hover:bg-[#f5f5fb]'}`}>
                <FilterListOutlined style={{ fontSize: 16 }} /> Filters {filterGuruh && <span className="bg-[#7c4dff] text-white rounded-[10px] text-[10px] p-[1px_6px] ml-0.5">1</span>}
              </button>
              {showFilter && (
                <div className="absolute top-[42px] right-0 bg-white border border-[#e5e7eb] rounded-[12px] p-3.5 z-[500] w-full min-w-[200px] shadow-[0_4px_20px_rgba(0,0,0,0.1)]">
                  <p className="m-0 mb-2 text-[12px] font-semibold text-[#374151]">Guruh bo'yicha</p>
                  <select value={filterGuruh} onChange={e => { setFilterGuruh(e.target.value); setPage(1); }}
                    className="w-full p-[8px_10px] rounded-[8px] border-[1.5px] border-[#e5e7eb] text-[13px] outline-none bg-white">
                    <option value="">Barchasi</option>
                    {[...new Set(students.flatMap(s => s.guruhlar || []))].map(g => <option key={g} value={g}>{g}</option>)}
                  </select>
                  {filterGuruh && (
                    <button onClick={() => { setFilterGuruh(''); setPage(1); }}
                      className="mt-2 w-full p-1.5 border-none rounded-[8px] bg-[#f5f5fb] text-[#7c4dff] text-[12.5px] cursor-pointer font-semibold">
                      Filterni tozalash
                    </button>
                  )}
                </div>
              )}
            </div>
            <button onClick={() => { setShowArchived(a => !a); setPage(1); }}
              className={`flex items-center gap-1.5 p-[7px_14px] border-[1.5px] rounded-[8px] text-[13px] cursor-pointer whitespace-nowrap transition-colors ${showArchived ? 'border-[#7c4dff] bg-[#f0ebff] text-[#7c4dff]' : 'border-[#e5e7eb] bg-white text-[#374151] hover:bg-[#f5f5fb]'}`}>
              <ArchiveOutlined style={{ fontSize: 16 }} /> {showArchived ? 'Faollar' : 'Arxiv'}
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto">
          <table className="w-full border-collapse text-[13px] min-w-[900px]">
            <thead>
              <tr className="border-b border-[#f1f1f5]">
                <th className="p-[11px_14px] w-9 text-left">
                  <input type="checkbox" checked={allChecked} onChange={toggleAll} className="accent-[#7c4dff] w-[15px] h-[15px] cursor-pointer" />
                </th>
                {['Nomi ↓', 'Guruh', 'Telefon raqamlari', 'Email', "Tug'ilgan sanasi", 'Manzil', 'Yaratilgan sana', 'Amallar'].map((col, i) => (
                  <th key={i} className="p-[11px_10px] text-left font-semibold text-[#374151] text-[12.5px] whitespace-nowrap">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={9} className="text-center py-14 text-[#9ca3af] text-[13px]">
                  <div className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-[#7c4dff]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Ma'lumotlar yuklanmoqda...
                  </div>
                </td></tr>
              ) : paginated.map((s, idx) => (
                <tr key={s.id} className={`border-b border-[#f9f9fb] transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-[#fafafa]'} hover:bg-[#f5f0ff]`}>
                  <td className="p-[10px_14px]">
                    <input type="checkbox" checked={s.selected} onChange={() => toggleSelect(s.id)} className="accent-[#7c4dff] w-[15px] h-[15px] cursor-pointer" />
                  </td>
                  {/* Nomi */}
                  <td className="p-[10px_10px]">
                    <div className="flex items-center gap-2">
                      <Avatar name={s.name} />
                      <span className="font-semibold text-[#1a1a2e] text-[13px]">{s.name}</span>
                    </div>
                  </td>
                  {/* Guruh badges */}
                  <td className="p-[10px_10px]">
                    <div className="flex gap-1 flex-wrap">
                      {(s.guruhlar || []).map((g, i) => (
                        <span key={i} className="rounded-[6px] px-2 py-[2px] text-[11px] font-semibold whitespace-nowrap"
                          style={{ background: BADGE_COLORS[i % BADGE_COLORS.length].bg, color: BADGE_COLORS[i % BADGE_COLORS.length].text }}>
                          {g}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-[10px_10px] text-[#374151]">{s.phone}</td>
                  <td className="p-[10px_10px] text-[#6b7280]">{s.email}</td>
                  <td className="p-[10px_10px] text-[#6b7280]">{s.born}</td>
                  <td className="p-[10px_10px] text-[#6b7280]">{s.manzil}</td>
                  <td className="p-[10px_10px] text-[#6b7280]">{s.created}</td>
                  {/* Amallar */}
                  <td className="p-[10px_10px]">
                    <div className="flex gap-1 items-center">
                      <button title="Ko'rish" className="bg-transparent border-none cursor-pointer text-[#9ca3af] flex p-[3px] hover:text-[#7c4dff]">
                        <VisibilityOutlined style={{ fontSize: 16 }} />
                      </button>
                      <button onClick={() => archiveOne(s.id)} title={s.archived ? "Arxivdan chiqarish" : "Arxivga qo'shish"} className="bg-transparent border-none cursor-pointer text-[#f59e0b] flex p-[3px] hover:text-[#d97706]">
                        <ArchiveOutlined style={{ fontSize: 16 }} />
                      </button>
                      <button onClick={() => deleteOne(s.id)} className="bg-transparent border-none cursor-pointer text-[#ef5350] flex p-[3px]">
                        <DeleteOutlineOutlined style={{ fontSize: 16 }} />
                      </button>
                      <button onClick={() => openEdit(s)} className="bg-transparent border-none cursor-pointer text-[#7c4dff] flex p-[3px]">
                        <EditOutlined style={{ fontSize: 16 }} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {paginated.length === 0 && (
                <tr><td colSpan={9} className="text-center py-14 text-[#9ca3af] text-[14px]">Ma'lumotlar mavjud emas</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination inside card */}
        <div className="flex justify-between items-center px-5 py-3 border-t border-[#f1f1f5] shrink-0">
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
            className={`flex items-center gap-1 p-[7px_14px] border-[1.5px] border-[#e5e7eb] rounded-[8px] bg-white text-[13px] font-medium ${page === 1 ? 'text-[#d1d5db] cursor-default' : 'text-[#374151] cursor-pointer hover:bg-[#f5f5fb]'}`}>
            <ChevronLeftOutlined fontSize="small" /> Previous
          </button>
          <div className="flex gap-1">
            {pageNums().map((n, i) =>
              n === '...' ? (
                <span key={i} className="w-[34px] h-[34px] flex items-center justify-center text-[#9ca3af] text-[13px]">...</span>
              ) : (
                <button key={i} onClick={() => setPage(n)}
                  className={`w-[34px] h-[34px] rounded-[8px] border-none text-[13px] cursor-pointer transition-colors ${page === n ? 'bg-[#7c4dff] text-white font-bold' : 'bg-transparent text-[#374151] hover:bg-[#f5f0ff]'}`}>
                  {n}
                </button>
              )
            )}
          </div>
          <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
            className={`flex items-center gap-1 p-[7px_14px] border-[1.5px] border-[#e5e7eb] rounded-[8px] bg-white text-[13px] font-medium ${page === totalPages ? 'text-[#d1d5db] cursor-default' : 'text-[#374151] cursor-pointer hover:bg-[#f5f5fb]'}`}>
            Next <ChevronRightOutlined fontSize="small" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Students;
