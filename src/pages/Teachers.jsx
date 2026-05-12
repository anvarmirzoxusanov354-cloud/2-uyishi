import React, { useState, useEffect, useRef } from 'react';
import {
  AddOutlined, DeleteOutlineOutlined, EditOutlined,
  SearchOutlined, FileDownloadOutlined,
  FilterListOutlined, ArchiveOutlined, CloseOutlined,
  ChevronLeftOutlined, ChevronRightOutlined, RefreshOutlined,
  AddCircleOutlineOutlined, RemoveCircleOutlineOutlined,
  EmailOutlined, CalendarTodayOutlined, CloudUploadOutlined,
} from '@mui/icons-material';

const LABELS_COLORS = ['#e8f0fe', '#fce8f3', '#fff3e0', '#e8f5e9', '#f3e5f5'];
const LABELS_TEXT = ['#1565c0', '#c2185b', '#e65100', '#2e7d32', '#6a1b9a'];

const initialTeachers = Array.from({ length: 5 }, (_, i) => ({
  id: i + 1,
  name: 'Qwerty qwert',
  avatar: null,
  guruh: '',
  phone: '+998(33)4082808',
  born: '24 Jan 2022',
  created: '24 Jan 2022',
  coin: 123123,
  labels: i % 4 === 0 ? ['Label', 'Label', 'Label', 'Label', 'LabelExtra', 'LabelFull']
        : i % 3 === 0 ? ['Label', 'Label', 'Label']
        : i % 2 === 0 ? ['Label', 'Label']
        : ['Label'],
  selected: i === 0 || i === 1 || i === 4,
}));

const COLS = ['Nomi', 'Guruh', 'Telefon raqamlari', "Tug'ilgan sanasi", 'Yaratilgan sana', 'Coin', ''];

const LabelBadge = ({ text, idx }) => (
  <span style={{
    background: LABELS_COLORS[idx % LABELS_COLORS.length],
    color: LABELS_TEXT[idx % LABELS_TEXT.length],
    borderRadius: '6px', padding: '2px 8px', fontSize: '11px', fontWeight: 600, whiteSpace: 'nowrap',
  }}>{text}</span>
);

const Avatar = ({ name }) => (
  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#ede9ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '13px', color: '#7c4dff', flexShrink: 0 }}>
    {name?.charAt(0)?.toUpperCase() || 'Q'}
  </div>
);

const Teachers = () => {
  const [teachers, setTeachers] = useState(() => {
    try { return JSON.parse(localStorage.getItem('teachers')) || initialTeachers; }
    catch { return initialTeachers; }
  });
  const [search, setSearch] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [page, setPage] = useState(1);
  const [form, setForm] = useState({ phone: '+998', email: '', name: '', born: '', guruhlar: [], jinsi: '', avatarName: '' });
  const [guruhSearch, setGuruhSearch] = useState('');
  const [showParol, setShowParol] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [filterGuruh, setFilterGuruh] = useState('');
  const [showArchived, setShowArchived] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('teachers', JSON.stringify(teachers));
    localStorage.setItem('teachersCount', teachers.filter(t => !t.archived).length);
  }, [teachers]);
  const PER_PAGE = 10;

  const filtered = teachers.filter(t => {
    const matchSearch = t.name.toLowerCase().includes(search.toLowerCase()) || t.phone.includes(search);
    const matchGuruh = filterGuruh ? t.guruh === filterGuruh : true;
    const matchArchived = showArchived ? t.archived : !t.archived;
    return matchSearch && matchGuruh && matchArchived;
  });
  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const allGuruhlar = [...new Set(teachers.filter(t => t.guruh).map(t => t.guruh))];

  const toggleSelect = (id) =>
    setTeachers(prev => prev.map(t => t.id === id ? { ...t, selected: !t.selected } : t));
  const toggleAll = () => {
    const allSelected = paginated.every(t => t.selected);
    setTeachers(prev => prev.map(t => paginated.find(p => p.id === t.id) ? { ...t, selected: !allSelected } : t));
  };
  const changeCoin = (id, delta) =>
    setTeachers(prev => prev.map(t => t.id === id ? { ...t, coin: Math.max(0, t.coin + delta) } : t));
  const deleteSelected = () =>
    setTeachers(prev => prev.filter(t => !t.selected));
  const deleteOne = (id) =>
    setTeachers(prev => prev.filter(t => t.id !== id));
  const archiveOne = (id) =>
    setTeachers(prev => prev.map(t => t.id === id ? { ...t, archived: !t.archived } : t));

  const exportCSV = (list) => {
    const header = ['Ismi', 'Guruh', 'Telefon', "Tug'ilgan sana", 'Yaratilgan sana', 'Coin'];
    const rows = list.map(t => [t.name, t.guruh || '', t.phone, t.born, t.created, t.coin]);
    const csv = [header, ...rows].map(r => r.join(',')).join('\n');
    const a = document.createElement('a');
    a.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
    a.download = 'oqituvchilar.csv';
    a.click();
  };

  const openEdit = (t) => {
    setEditId(t.id);
    setForm({ phone: t.phone, email: t.email || '', name: t.name, born: t.born, guruhlar: t.labels || [], jinsi: t.jinsi || '', avatarName: '' });
    setGuruhSearch('');
    setDrawerOpen(true);
  };
  const openAdd = () => {
    setEditId(null);
    resetForm();
    setDrawerOpen(true);
  };

  const resetForm = () => { setForm({ phone: '+998', email: '', name: '', born: '', guruhlar: [], jinsi: '', avatarName: '' }); setGuruhSearch(''); setShowParol(false); };
  const handleSave = () => {
    if (!form.name.trim()) return;
    if (editId !== null) {
      setTeachers(prev => prev.map(t => t.id === editId ? {
        ...t, name: form.name.trim(), phone: form.phone, born: form.born, email: form.email,
        guruh: form.guruhlar[0] || '', labels: form.guruhlar, jinsi: form.jinsi,
      } : t));
    } else {
      const newT = {
        id: Date.now(), name: form.name.trim(), avatar: null, email: form.email,
        guruh: form.guruhlar[0] || '', phone: form.phone, born: form.born, jinsi: form.jinsi,
        created: new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }),
        coin: 0, labels: form.guruhlar, selected: false, archived: false,
      };
      setTeachers(prev => [newT, ...prev]);
    }
    setEditId(null);
    resetForm();
    setDrawerOpen(false);
  };

  const anySelected = teachers.some(t => t.selected);
  const allSelected = paginated.length > 0 && paginated.every(t => t.selected);

  const pageNums = () => {
    const nums = [];
    if (totalPages <= 7) { for (let i = 1; i <= totalPages; i++) nums.push(i); return nums; }
    nums.push(1, 2, 3, '...', totalPages - 1, totalPages);
    return nums;
  };

  return (
    <div style={{ padding: '24px 28px', minHeight: '100vh', background: '#f8f9fe' }}>

      {/* Slide-out Add Drawer */}
      {drawerOpen && <div onClick={() => { setDrawerOpen(false); resetForm(); }} style={{ position: 'fixed', inset: 0, zIndex: 1100, background: 'rgba(0,0,0,0.2)' }} />}
      <div style={{ position: 'fixed', top: 0, right: 0, height: '100vh', width: '420px', transform: drawerOpen ? 'translateX(0)' : 'translateX(100%)', transition: 'transform 0.32s cubic-bezier(0.4,0,0.2,1)', background: '#fff', zIndex: 1200, display: 'flex', flexDirection: 'column', boxShadow: '-4px 0 24px rgba(0,0,0,0.1)' }}>
        {/* Drawer Header */}
        <div style={{ padding: '20px 20px 14px', borderBottom: '1px solid #f1f1f5', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h2 style={{ margin: '0 0 4px', fontSize: '16px', fontWeight: 700, color: '#1a1a2e' }}>
              {editId ? "O'qituvchini tahrirlash" : "O'qituvchi qoshish"}
            </h2>
            <p style={{ margin: 0, fontSize: '12.5px', color: '#9ca3af' }}>Bu yerda siz yangi o'qituvchi qo'shishingiz mumkin.</p>
          </div>
          <button onClick={() => { setDrawerOpen(false); resetForm(); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', display: 'flex', padding: '2px' }}>
            <CloseOutlined fontSize="small" />
          </button>
        </div>

        {/* Drawer Form */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>

          {/* Telefon raqam */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '7px' }}>Telefon raqam</label>
            <input type="text" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
              style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #e5e7eb', fontSize: '13.5px', outline: 'none', boxSizing: 'border-box' }}
              onFocus={e => (e.target.style.borderColor = '#7c4dff')} onBlur={e => (e.target.style.borderColor = '#e5e7eb')} />
          </div>

          {/* Mail */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '7px' }}>Mail</label>
            <div style={{ position: 'relative' }}>
              <EmailOutlined style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '18px', color: '#9ca3af' }} />
              <input type="email" placeholder="Elektron pochtani kiriting" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                style={{ width: '100%', padding: '10px 14px 10px 38px', borderRadius: '10px', border: '1.5px solid #e5e7eb', fontSize: '13.5px', outline: 'none', boxSizing: 'border-box' }}
                onFocus={e => (e.target.style.borderColor = '#7c4dff')} onBlur={e => (e.target.style.borderColor = '#e5e7eb')} />
            </div>
          </div>

          {/* O'qituvchi FIO */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '7px' }}>O'qituvchi FIO</label>
            <input type="text" placeholder="Ma'lumotni kiriting" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
              style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #e5e7eb', fontSize: '13.5px', outline: 'none', boxSizing: 'border-box' }}
              onFocus={e => (e.target.style.borderColor = '#7c4dff')} onBlur={e => (e.target.style.borderColor = '#e5e7eb')} />
          </div>

          {/* Tug'ilgan sanasi */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '7px' }}>Tug'ilgan sanasi</label>
            <div style={{ position: 'relative' }}>
              <CalendarTodayOutlined style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '16px', color: '#9ca3af' }} />
              <input type="text" placeholder="01.03.1990" value={form.born} onChange={e => setForm({ ...form, born: e.target.value })}
                style={{ width: '100%', padding: '10px 14px 10px 38px', borderRadius: '10px', border: '1.5px solid #e5e7eb', fontSize: '13.5px', outline: 'none', boxSizing: 'border-box' }}
                onFocus={e => (e.target.style.borderColor = '#7c4dff')} onBlur={e => (e.target.style.borderColor = '#e5e7eb')} />
            </div>
          </div>

          {/* Guruh — tag chips input */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '7px' }}>Guruh</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', padding: '8px 12px', borderRadius: '10px', border: '1.5px solid #e5e7eb', background: '#fff', alignItems: 'center', minHeight: '44px' }}
              onFocus={() => {}} onClick={() => document.getElementById('guruh-search-input').focus()}>
              <SearchOutlined style={{ fontSize: '17px', color: '#9ca3af', flexShrink: 0 }} />
              {form.guruhlar.map((g, i) => (
                <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '3px', background: '#f0ebff', color: '#7c4dff', borderRadius: '6px', padding: '2px 8px', fontSize: '12px', fontWeight: 600 }}>
                  {g}
                  <button onClick={() => setForm(prev => ({ ...prev, guruhlar: prev.guruhlar.filter((_, idx) => idx !== i) }))}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#7c4dff', fontSize: '13px', lineHeight: 1, padding: '0 1px' }}>×</button>
                </span>
              ))}
              <input id="guruh-search-input" type="text" placeholder={form.guruhlar.length === 0 ? 'Guruh qidiring...' : ''}
                value={guruhSearch} onChange={e => setGuruhSearch(e.target.value)}
                onKeyDown={e => { if ((e.key === 'Enter' || e.key === ',') && guruhSearch.trim()) { e.preventDefault(); setForm(prev => ({ ...prev, guruhlar: [...prev.guruhlar, guruhSearch.trim()] })); setGuruhSearch(''); } }}
                style={{ border: 'none', outline: 'none', fontSize: '13px', flex: 1, minWidth: '80px', padding: '2px 0' }} />
            </div>
            <p style={{ margin: '4px 0 0', fontSize: '11.5px', color: '#9ca3af' }}>Enter yoki vergul bilan guruh qo'shing</p>
          </div>

          {/* Jinsi */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '10px' }}>Jinsi</label>
            <div style={{ display: 'flex', gap: '20px' }}>
              {['Erkak', 'Ayol'].map(j => (
                <label key={j} style={{ display: 'flex', alignItems: 'center', gap: '7px', cursor: 'pointer', fontSize: '13.5px', color: '#374151' }}>
                  <input type="radio" name="jinsi" value={j} checked={form.jinsi === j} onChange={() => setForm({ ...form, jinsi: j })}
                    style={{ accentColor: '#7c4dff', width: '16px', height: '16px', cursor: 'pointer' }} />
                  {j}
                </label>
              ))}
            </div>
          </div>

          {/* Surati */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '7px' }}>Surati</label>
            <div onClick={() => fileInputRef.current?.click()}
              style={{ border: '1.5px dashed #d1d5db', borderRadius: '10px', padding: '28px 14px', textAlign: 'center', cursor: 'pointer', background: '#fafafa' }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = '#7c4dff')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = '#d1d5db')}>
              <CloudUploadOutlined style={{ fontSize: '28px', color: '#9ca3af', marginBottom: '8px' }} />
              <p style={{ margin: '0 0 4px', fontSize: '13px', color: '#374151' }}>
                <span style={{ color: '#7c4dff', fontWeight: 600 }}>Click to upload</span> or drag and drop
              </p>
              <p style={{ margin: 0, fontSize: '12px', color: '#9ca3af' }}>JPG or PNG (max. 800x800px)</p>
              {form.avatarName && <p style={{ margin: '6px 0 0', fontSize: '12px', color: '#7c4dff', fontWeight: 500 }}>{form.avatarName}</p>}
            </div>
            <input ref={fileInputRef} type="file" accept="image/jpeg,image/png" style={{ display: 'none' }}
              onChange={e => { if (e.target.files[0]) setForm(prev => ({ ...prev, avatarName: e.target.files[0].name })); }} />
          </div>

          {/* + Parol qo'shish */}
          <div style={{ textAlign: 'right', marginBottom: '4px' }}>
            <button onClick={() => setShowParol(p => !p)}
              style={{ background: 'none', border: 'none', color: '#7c4dff', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
              + Parol qoshish
            </button>
          </div>
          {showParol && (
            <div style={{ marginBottom: '8px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '7px' }}>Parol</label>
              <input type="password" placeholder="Parolni kiriting" value={form.parol || ''} onChange={e => setForm({ ...form, parol: e.target.value })}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #e5e7eb', fontSize: '13.5px', outline: 'none', boxSizing: 'border-box' }}
                onFocus={e => (e.target.style.borderColor = '#7c4dff')} onBlur={e => (e.target.style.borderColor = '#e5e7eb')} />
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        <div style={{ padding: '14px 20px', borderTop: '1px solid #f1f1f5', display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
          <button onClick={() => { setDrawerOpen(false); resetForm(); }}
            style={{ padding: '9px 18px', borderRadius: '10px', border: '1.5px solid #e5e7eb', background: '#fff', color: '#6b7280', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}
            onMouseEnter={e => (e.currentTarget.style.background = '#f5f5fb')}
            onMouseLeave={e => (e.currentTarget.style.background = '#fff')}>
            Bekor qilish
          </button>
          <button onClick={handleSave}
            style={{ padding: '9px 22px', borderRadius: '10px', border: 'none', background: form.name.trim() ? '#7c4dff' : '#c4b5fd', color: '#fff', fontSize: '13px', fontWeight: 600, cursor: form.name.trim() ? 'pointer' : 'default', opacity: form.name.trim() ? 1 : 0.7 }}>
            Saqlash
          </button>
        </div>
      </div>

      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
        <div>
          <h1 style={{ margin: '0 0 6px', fontSize: '22px', fontWeight: 700, color: '#1a1a2e' }}>O'qituvchilar</h1>
          <p style={{ margin: 0, fontSize: '13px', color: '#9ca3af' }}>Ushbu sahifada siz o'qituvchilar ro'yxatini va ularning ma'lumotlarini topasiz. Har bir o'qituvchining ismi, fanlari va aloqa ma'lumotlari keltirilgan.</p>
        </div>
        <div style={{ display: 'flex', gap: '10px', flexShrink: 0, marginLeft: '20px' }}>
          <button onClick={() => exportCSV(filtered)}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 18px', border: '1.5px solid #e5e7eb', borderRadius: '10px', background: '#fff', color: '#374151', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
            <FileDownloadOutlined fontSize="small" /> Export
          </button>
          <button onClick={openAdd}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 18px', border: 'none', borderRadius: '10px', background: '#7c4dff', color: '#fff', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
            <AddOutlined fontSize="small" /> O'qituvchi qo'shish
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', position: 'relative' }}>
        <div style={{ position: 'relative' }}>
          <button onClick={() => setShowFilter(f => !f)}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', border: `1.5px solid ${showFilter ? '#7c4dff' : '#e5e7eb'}`, borderRadius: '8px', background: showFilter ? '#f0ebff' : '#fff', color: showFilter ? '#7c4dff' : '#374151', fontSize: '13px', cursor: 'pointer' }}>
            <FilterListOutlined fontSize="small" /> Filters {filterGuruh && <span style={{ background: '#7c4dff', color: '#fff', borderRadius: '10px', fontSize: '10px', padding: '1px 6px', marginLeft: '2px' }}>1</span>}
          </button>
          {showFilter && (
            <div style={{ position: 'absolute', top: '42px', left: 0, background: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '14px', zIndex: 500, minWidth: '200px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
              <p style={{ margin: '0 0 8px', fontSize: '12px', fontWeight: 600, color: '#374151' }}>Guruh bo'yicha</p>
              <select value={filterGuruh} onChange={e => { setFilterGuruh(e.target.value); setPage(1); }}
                style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1.5px solid #e5e7eb', fontSize: '13px', outline: 'none', background: '#fff' }}>
                <option value="">Barchasi</option>
                {allGuruhlar.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
              {filterGuruh && (
                <button onClick={() => { setFilterGuruh(''); setPage(1); }}
                  style={{ marginTop: '8px', width: '100%', padding: '6px', border: 'none', borderRadius: '8px', background: '#f5f5fb', color: '#7c4dff', fontSize: '12.5px', cursor: 'pointer', fontWeight: 600 }}>
                  Filterni tozalash
                </button>
              )}
            </div>
          )}
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            <SearchOutlined style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', fontSize: '18px' }} />
            <input placeholder="Search" value={search} onChange={e => { setSearch(e.target.value); setPage(1); }}
              style={{ padding: '8px 14px 8px 34px', borderRadius: '8px', border: '1.5px solid #e5e7eb', fontSize: '13px', outline: 'none', width: '220px', background: '#fff' }}
              onFocus={e => (e.target.style.borderColor = '#7c4dff')}
              onBlur={e => (e.target.style.borderColor = '#e5e7eb')} />
          </div>
          <button onClick={() => { setShowArchived(a => !a); setPage(1); }}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', border: `1.5px solid ${showArchived ? '#7c4dff' : '#e5e7eb'}`, borderRadius: '8px', background: showArchived ? '#f0ebff' : '#fff', color: showArchived ? '#7c4dff' : '#374151', fontSize: '13px', cursor: 'pointer' }}>
            <ArchiveOutlined fontSize="small" /> {showArchived ? 'Faollar' : 'Arxiv'}
          </button>
        </div>
      </div>

      {/* Bulk action row */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
        <button onClick={() => exportCSV(anySelected ? teachers.filter(t => t.selected) : filtered)}
          style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '7px 14px', border: '1.5px solid #e5e7eb', borderRadius: '8px', background: '#fff', color: '#374151', fontSize: '13px', cursor: 'pointer' }}>
          <FileDownloadOutlined fontSize="small" /> Export {anySelected ? `(${teachers.filter(t => t.selected).length})` : ''}
        </button>
        <button onClick={deleteSelected} disabled={!anySelected}
          style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '7px 14px', border: `1.5px solid ${anySelected ? '#ef5350' : '#e5e7eb'}`, borderRadius: '8px', background: '#fff', color: anySelected ? '#ef5350' : '#9ca3af', fontSize: '13px', cursor: anySelected ? 'pointer' : 'default' }}>
          <DeleteOutlineOutlined fontSize="small" /> Delete
        </button>
      </div>

      {/* Table */}
      <div style={{ background: '#fff', borderRadius: '16px', boxShadow: '0 1px 8px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #f1f1f5' }}>
              <th style={{ padding: '12px 14px', textAlign: 'left', width: '36px' }}>
                <input type="checkbox" checked={allSelected} onChange={toggleAll} style={{ accentColor: '#7c4dff', width: '15px', height: '15px', cursor: 'pointer' }} />
              </th>
              {COLS.map((col, i) => (
                <th key={i} style={{ padding: '12px 10px', textAlign: 'left', fontWeight: 600, color: '#374151', fontSize: '12.5px', whiteSpace: 'nowrap' }}>
                  {col}{col === 'Nomi' ? ' ↓' : ''}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginated.map((t, rowIdx) => {
              const visibleLabels = t.labels.slice(0, 3);
              const extra = t.labels.length - 3;
              return (
                <tr key={t.id} style={{ borderBottom: '1px solid #f9f9fb', background: rowIdx % 2 === 0 ? '#fff' : '#fafafa', transition: 'background 0.15s' }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#f5f0ff')}
                  onMouseLeave={e => (e.currentTarget.style.background = rowIdx % 2 === 0 ? '#fff' : '#fafafa')}>
                  <td style={{ padding: '10px 14px' }}>
                    <input type="checkbox" checked={t.selected} onChange={() => toggleSelect(t.id)} style={{ accentColor: '#7c4dff', width: '15px', height: '15px', cursor: 'pointer' }} />
                  </td>
                  {/* Name + labels */}
                  <td style={{ padding: '10px 10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Avatar name={t.name} />
                      <div>
                        <div style={{ fontWeight: 600, color: '#1a1a2e', fontSize: '13px', marginBottom: '3px' }}>{t.name}</div>
                        <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                          {visibleLabels.map((l, i) => <LabelBadge key={i} text={l} idx={i} />)}
                          {extra > 0 && <span style={{ background: '#f1f1f5', borderRadius: '6px', padding: '2px 7px', fontSize: '11px', color: '#6b7280', fontWeight: 600 }}>+{extra}</span>}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '10px', color: '#6b7280' }}>{t.guruh || '—'}</td>
                  <td style={{ padding: '10px', color: '#374151' }}>{t.phone}</td>
                  <td style={{ padding: '10px', color: '#6b7280' }}>{t.born}</td>
                  <td style={{ padding: '10px', color: '#6b7280' }}>{t.created}</td>
                  {/* Coin */}
                  <td style={{ padding: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontSize: '13px', color: '#f59e0b' }}>●</span>
                      <span style={{ fontWeight: 700, color: '#1a1a2e', fontSize: '13px' }}>{t.coin.toLocaleString()}</span>
                      <button onClick={() => changeCoin(t.id, -100)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef5350', display: 'flex', padding: '1px' }}>
                        <RemoveCircleOutlineOutlined style={{ fontSize: '16px' }} />
                      </button>
                      <button onClick={() => changeCoin(t.id, 100)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#22c55e', display: 'flex', padding: '1px' }}>
                        <AddCircleOutlineOutlined style={{ fontSize: '16px' }} />
                      </button>
                    </div>
                  </td>
                  {/* Actions */}
                  <td style={{ padding: '10px' }}>
                    <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                      <button onClick={() => archiveOne(t.id)} title={t.archived ? 'Arxivdan chiqarish' : 'Arxivga qo\'shish'} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', display: 'flex', padding: '3px' }}><RefreshOutlined style={{ fontSize: '16px' }} /></button>
                      <button onClick={() => deleteOne(t.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef5350', display: 'flex', padding: '3px' }}><DeleteOutlineOutlined style={{ fontSize: '16px' }} /></button>
                      <button onClick={() => openEdit(t)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#7c4dff', display: 'flex', padding: '3px' }}><EditOutlined style={{ fontSize: '16px' }} /></button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
        <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
          style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '8px 16px', border: '1.5px solid #e5e7eb', borderRadius: '8px', background: '#fff', color: page === 1 ? '#d1d5db' : '#374151', fontSize: '13px', cursor: page === 1 ? 'default' : 'pointer', fontWeight: 500 }}>
          <ChevronLeftOutlined fontSize="small" /> Previous
        </button>
        <div style={{ display: 'flex', gap: '4px' }}>
          {pageNums().map((n, i) =>
            n === '...' ? (
              <span key={i} style={{ padding: '7px 6px', color: '#9ca3af', fontSize: '13px' }}>...</span>
            ) : (
              <button key={i} onClick={() => setPage(n)}
                style={{ width: '34px', height: '34px', borderRadius: '8px', border: 'none', background: page === n ? '#7c4dff' : 'transparent', color: page === n ? '#fff' : '#374151', fontSize: '13px', fontWeight: page === n ? 700 : 400, cursor: 'pointer' }}>
                {n}
              </button>
            )
          )}
        </div>
        <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
          style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '8px 16px', border: '1.5px solid #e5e7eb', borderRadius: '8px', background: '#fff', color: page === totalPages ? '#d1d5db' : '#374151', fontSize: '13px', cursor: page === totalPages ? 'default' : 'pointer', fontWeight: 500 }}>
          Next <ChevronRightOutlined fontSize="small" />
        </button>
      </div>
    </div>
  );
};

export default Teachers;
