import React, { useState, useEffect } from 'react';
import { 
  SchoolOutlined, GroupsOutlined, PersonOutlineOutlined, SettingsOutlined, 
  SearchOutlined, AddOutlined, EditOutlined, DeleteOutlineOutlined, CloseOutlined,
  MoreVertOutlined, LocationOnOutlined, AccessTimeOutlined, CreditCardOutlined
} from '@mui/icons-material';

const TTL_MS = 2 * 60 * 60 * 1000;
const setTTL = (key, val) => localStorage.setItem(key, JSON.stringify({ v: val, exp: Date.now() + TTL_MS }));
const getTTL = (key, fb) => { try { const i = JSON.parse(localStorage.getItem(key)); if (i && i.exp > Date.now()) return i.v; } catch {} return fb; };

const S = {
  tab: (active) => ({ padding: '10px 20px', borderRadius: '10px', background: active ? '#7c4dff' : '#f5f5fb', color: active ? '#fff' : '#6b7280', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 600 }),
  card: { background: '#fff', borderRadius: '16px', padding: '16px', boxShadow: '0 1px 10px rgba(0,0,0,0.05)', position: 'relative' },
  drawer: (open) => ({ position: 'fixed', top: 0, right: 0, height: '100vh', width: '400px', transform: open ? 'translateX(0)' : 'translateX(100%)', transition: '0.3s', background: '#fff', zIndex: 1200, display: 'flex', flexDirection: 'column', boxShadow: '-4px 0 20px rgba(0,0,0,0.1)' }),
  input: { width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #e5e7eb', outline: 'none', marginBottom: '15px' }
};

const KurslarContent = () => {
  const [courses, setCourses] = useState(() => JSON.parse(localStorage.getItem('courses')) || []);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [form, setForm] = useState({ nomi: '', narx: '', rangi: '#e0f2fe' });

  useEffect(() => { localStorage.setItem('courses', JSON.stringify(courses)); }, [courses]);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 700 }}>Kurslar ro'yxati</h2>
        <button onClick={() => setDrawerOpen(true)} style={{ ...S.tab(true), padding: '8px 16px' }}>+ Kurs qo'shish</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
        {courses.map((c, i) => (
          <div key={i} style={S.card}>
            <div style={{ background: c.rangi, height: '140px', borderRadius: '12px', marginBottom: '12px' }} />
            <h3 style={{ fontSize: '15px', fontWeight: 700 }}>{c.nomi}</h3>
            <p style={{ color: '#6b7280', fontSize: '13px' }}>{c.narx} UZS</p>
            <DeleteOutlineOutlined onClick={() => setCourses(courses.filter((_, idx) => idx !== i))} style={{ position: 'absolute', top: '10px', right: '10px', cursor: 'pointer', color: '#ef5350' }} />
          </div>
        ))}
      </div>
      {drawerOpen && <div onClick={() => setDrawerOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 1100, background: 'rgba(0,0,0,0.1)' }} />}
      <div style={S.drawer(drawerOpen)}>
        <div style={{ padding: '20px', borderBottom: '1px solid #f1f1f5', display: 'flex', justifyContent: 'space-between' }}>
          <h2 style={{ fontSize: '16px', margin: 0 }}>Kurs qo'shish</h2>
          <CloseOutlined onClick={() => setDrawerOpen(false)} style={{ cursor: 'pointer' }} />
        </div>
        <div style={{ padding: '20px' }}>
          <input placeholder="Kurs nomi" value={form.nomi} onChange={e => setForm({ ...form, nomi: e.target.value })} style={S.input} />
          <input placeholder="Narxi" value={form.narx} onChange={e => setForm({ ...form, narx: e.target.value })} style={S.input} />
          <button onClick={() => { setCourses([...courses, form]); setDrawerOpen(false); setForm({ nomi: '', narx: '', rangi: '#e0f2fe' }); }} style={{ ...S.tab(true), width: '100%' }}>Saqlash</button>
        </div>
      </div>
    </div>
  );
};

const Management = () => {
  const [activeItem, setActiveItem] = useState(() => getTTL('mgmt_activeItem', 0));
  const menu = [
    { label: 'Kurslar', icon: <SchoolOutlined /> },
    { label: 'Xonalar', icon: <GroupsOutlined /> },
    { label: 'Filiallar', icon: <LocationOnOutlined /> },
    { label: 'Rollar', icon: <SettingsOutlined /> }
  ];

  useEffect(() => { setTTL('mgmt_activeItem', activeItem); }, [activeItem]);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f8f9fe' }}>
      <div style={{ width: '240px', background: '#fff', borderRight: '1px solid #f1f1f5', padding: '20px' }}>
        <h1 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '30px' }}>Boshqarish</h1>
        {menu.map((m, i) => (
          <div key={i} onClick={() => setActiveItem(i)} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', borderRadius: '10px', cursor: 'pointer', background: activeItem === i ? '#f0ebff' : 'transparent', color: activeItem === i ? '#7c4dff' : '#6b7280', marginBottom: '5px' }}>
            {m.icon} <span style={{ fontSize: '14px', fontWeight: 600 }}>{m.label}</span>
          </div>
        ))}
      </div>
      <div style={{ flex: 1, padding: '30px' }}>
        {activeItem === 0 ? <KurslarContent /> : <div style={{ textAlign: 'center', padding: '100px', color: '#9ca3af' }}>Tez orada qo'shiladi...</div>}
      </div>
    </div>
  );
};

export default Management;
