import React, { useState, useEffect, useRef } from 'react';
import {
  AddOutlined, DeleteOutlineOutlined, EditOutlined, SearchOutlined, FileDownloadOutlined,
  FilterListOutlined, ArchiveOutlined, CloseOutlined, ChevronLeftOutlined, ChevronRightOutlined, 
  RefreshOutlined, AddCircleOutlineOutlined, RemoveCircleOutlineOutlined, EmailOutlined, 
  CalendarTodayOutlined, CloudUploadOutlined,
} from '@mui/icons-material';

const TTL_MS = 2 * 60 * 60 * 1000;
const setTTL = (key, val) => localStorage.setItem(key, JSON.stringify({ v: val, exp: Date.now() + TTL_MS }));
const getTTL = (key, fb) => { try { const i = JSON.parse(localStorage.getItem(key)); if (i && i.exp > Date.now()) return i.v; } catch {} return fb; };

const initialTeachers = Array.from({ length: 5 }, (_, i) => ({
  id: i + 1, name: 'Qwerty qwert', phone: '+998(33)4082808', born: '24 Jan 2022', created: '24 Jan 2022', coin: 123123,
  labels: ['Label'], selected: i === 0 || i === 1 || i === 4, archived: false
}));

const S = {
  btn: { display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', border: '1.5px solid #e5e7eb', borderRadius: '8px', background: '#fff', fontSize: '13px', cursor: 'pointer' },
  input: { width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #e5e7eb', fontSize: '13.5px', outline: 'none' },
  badge: (idx) => ({ background: ['#e8f0fe', '#fce8f3', '#fff3e0', '#e8f5e9', '#f3e5f5'][idx % 5], color: ['#1565c0', '#c2185b', '#e65100', '#2e7d32', '#6a1b9a'][idx % 5], borderRadius: '6px', padding: '2px 8px', fontSize: '11px', fontWeight: 600 })
};

const Teachers = () => {
  const [teachers, setTeachers] = useState(() => JSON.parse(localStorage.getItem('teachers')) || initialTeachers);
  const [search, setSearch] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [page, setPage] = useState(() => getTTL('t_page', 1));
  const [form, setForm] = useState({ phone: '+998', email: '', name: '', born: '', guruhlar: [], jinsi: '', avatarName: '' });
  const [guruhSearch, setGuruhSearch] = useState('');
  const [showParol, setShowParol] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [filterGuruh, setFilterGuruh] = useState(() => getTTL('t_filterGuruh', ''));
  const [showArchived, setShowArchived] = useState(() => getTTL('t_showArchived', false));
  const fileInputRef = useRef(null);

  useEffect(() => { setTTL('t_page', page); setTTL('t_filterGuruh', filterGuruh); setTTL('t_showArchived', showArchived); }, [page, filterGuruh, showArchived]);
  useEffect(() => { localStorage.setItem('teachers', JSON.stringify(teachers)); localStorage.setItem('teachersCount', teachers.filter(t => !t.archived).length); }, [teachers]);

  const filtered = teachers.filter(t => (t.name.toLowerCase().includes(search.toLowerCase()) || t.phone.includes(search)) && (!filterGuruh || t.guruh === filterGuruh) && (showArchived ? t.archived : !t.archived));
  const totalPages = Math.max(1, Math.ceil(filtered.length / 10));
  const paginated = filtered.slice((page - 1) * 10, page * 10);

  const handleSave = () => {
    if (!form.name.trim()) return;
    const data = { ...form, name: form.name.trim(), labels: form.guruhlar, created: new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }) };
    setTeachers(prev => editId ? prev.map(t => t.id === editId ? { ...t, ...data } : t) : [{ id: Date.now(), ...data, coin: 0, selected: false, archived: false }, ...prev]);
    setDrawerOpen(false); setEditId(null); setForm({ phone: '+998', email: '', name: '', born: '', guruhlar: [], jinsi: '', avatarName: '' });
  };

  return (
    <div style={{ padding: '24px 28px', minHeight: '100vh', background: '#f8f9fe' }}>
      {drawerOpen && <div onClick={() => setDrawerOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 1100, background: 'rgba(0,0,0,0.2)' }} />}
      <div style={{ position: 'fixed', top: 0, right: 0, height: '100vh', width: '420px', transform: drawerOpen ? 'translateX(0)' : 'translateX(100%)', transition: '0.3s', background: '#fff', zIndex: 1200, display: 'flex', flexDirection: 'column', boxShadow: '-4px 0 24px rgba(0,0,0,0.1)' }}>
        <div style={{ padding: '20px', borderBottom: '1px solid #f1f1f5', display: 'flex', justifyContent: 'space-between' }}>
          <div><h2 style={{ margin: 0, fontSize: '16px' }}>{editId ? "Tahrirlash" : "Qo'shish"}</h2><p style={{ margin: 0, fontSize: '12px', color: '#9ca3af' }}>Ma'lumotlarni kiriting.</p></div>
          <CloseOutlined onClick={() => setDrawerOpen(false)} style={{ cursor: 'pointer', color: '#9ca3af' }} />
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
          <label style={{ fontSize: '13px', fontWeight: 600 }}>Ismi</label>
          <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={{ ...S.input, marginBottom: '15px' }} />
          <label style={{ fontSize: '13px', fontWeight: 600 }}>Telefon</label>
          <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} style={{ ...S.input, marginBottom: '15px' }} />
          <label style={{ fontSize: '13px', fontWeight: 600 }}>Tug'ilgan kuni</label>
          <input placeholder="01.03.1990" value={form.born} onChange={e => setForm({ ...form, born: e.target.value })} style={{ ...S.input, marginBottom: '15px' }} />
        </div>
        <div style={{ padding: '20px', borderTop: '1px solid #f1f1f5', display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
          <button onClick={() => setDrawerOpen(false)} style={S.btn}>Bekor qilish</button>
          <button onClick={handleSave} style={{ ...S.btn, background: form.name.trim() ? '#7c4dff' : '#c4b5fd', color: '#fff' }}>Saqlash</button>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div><h1 style={{ margin: 0, fontSize: '22px' }}>O'qituvchilar</h1></div>
        <button onClick={() => { setEditId(null); setForm({ phone: '+998', email: '', name: '', born: '', guruhlar: [], jinsi: '', avatarName: '' }); setDrawerOpen(true); }} style={{ ...S.btn, background: '#7c4dff', color: '#fff' }}>+ Qo'shish</button>
      </div>

      <div style={{ background: '#fff', borderRadius: '16px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead><tr style={{ borderBottom: '1px solid #f1f1f5' }}>{['', 'Nomi', 'Guruh', 'Telefon', 'Sana', 'Coin', ''].map(h => <th key={h} style={{ padding: '12px', textAlign: 'left', fontSize: '12px' }}>{h}</th>)}</tr></thead>
          <tbody>
            {paginated.map(t => (
              <tr key={t.id} style={{ borderBottom: '1px solid #f9f9fb' }}>
                <td style={{ padding: '12px' }}><input type="checkbox" checked={t.selected} onChange={() => setTeachers(prev => prev.map(x => x.id === t.id ? { ...x, selected: !x.selected } : x))} /></td>
                <td style={{ padding: '12px' }}>{t.name}</td>
                <td style={{ padding: '12px' }}>{t.guruh || '—'}</td>
                <td style={{ padding: '12px' }}>{t.phone}</td>
                <td style={{ padding: '12px' }}>{t.created}</td>
                <td style={{ padding: '12px' }}>{t.coin}</td>
                <td style={{ padding: '12px' }}>
                  <EditOutlined onClick={() => { setEditId(t.id); setForm({ ...t, guruhlar: t.labels }); setDrawerOpen(true); }} style={{ cursor: 'pointer', marginRight: '10px', color: '#7c4dff' }} />
                  <DeleteOutlineOutlined onClick={() => setTeachers(prev => prev.filter(x => x.id !== t.id))} style={{ cursor: 'pointer', color: '#ef5350' }} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Teachers;
