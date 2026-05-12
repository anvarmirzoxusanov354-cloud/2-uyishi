import React, { useState } from 'react';
import {
  AddOutlined, DeleteOutlineOutlined, EditOutlined,
  SchoolOutlined, MeetingRoomOutlined, AccountBalanceOutlined,
  PeopleAltOutlined, ReportProblemOutlined, AdminPanelSettingsOutlined,
  MonetizationOnOutlined, SendOutlined, HelpOutlineOutlined,
  FactCheckOutlined, ChevronLeftOutlined, ChevronRightOutlined,
  RefreshOutlined, CloseOutlined, CreditCardOutlined,
} from '@mui/icons-material';

const SIDEBAR_W = 256;
const PANEL_W = 220;

const menuItems = [
  { icon: <SchoolOutlined fontSize="small" />, label: 'Kurslar' },
  { icon: <MeetingRoomOutlined fontSize="small" />, label: 'Xonalar' },
  { icon: <AccountBalanceOutlined fontSize="small" />, label: 'Filiallar' },
  { icon: <PeopleAltOutlined fontSize="small" />, label: 'Hodimlar' },
  { icon: <AdminPanelSettingsOutlined fontSize="small" />, label: 'Rollar' },
  { icon: <MonetizationOnOutlined fontSize="small" />, label: 'Coin' },
  { icon: <ReportProblemOutlined fontSize="small" />, label: 'Sabablar' },
  { icon: <SendOutlined fontSize="small" />, label: 'Xabar yuborish' },
  { icon: <HelpOutlineOutlined fontSize="small" />, label: 'FAQ' },
  { icon: <FactCheckOutlined fontSize="small" />, label: 'Tekshiruv' },
];

const filialTabs = ['Filial 1', 'Filial 2', 'Arxiv'];

const initialCourseCards = [
  { title: 'Human Resources Manager', desc: "A little about the company and the team that you'll be working with. A li...", duration: '90 min', period: '3 oy', price: '1 000 000 mln', bg: '#e8f0fe', border: '#c5d7fb' },
  { title: 'Human Resources Manager', desc: "A little about the company and the team that you'll be working with. A li...", duration: '90 min', period: '3 oy', price: '1 000 000 mln', bg: '#fce8f3', border: '#f5c6e4' },
  { title: 'Human Resources Manager', desc: "A little about the company and the team that you'll be working with. A li...", duration: '90 min', period: '3 oy', price: '1 000 000 mln', bg: '#fff3e0', border: '#ffe0b2' },
  { title: 'Human Resources Manager', desc: "A little about the company and the team that you'll be working with. A li...", duration: '90 min', period: '3 oy', price: '1 000 000 mln', bg: '#e8f5e9', border: '#c8e6c9' },
  { title: 'Human Resources Manager', desc: "A little about the company and the team that you'll be working with. A li...", duration: '90 min', period: '3 oy', price: '1 000 000 mln', bg: '#e8f0fe', border: '#c5d7fb' },
  { title: 'Human Resources Manager', desc: "A little about the company and the team that you'll be working with. A li...", duration: '90 min', period: '3 oy', price: '1 000 000 mln', bg: '#fce8f3', border: '#f5c6e4' },
];

const darsDavomiyligi = ['30 min', '45 min', '60 min', '90 min', '120 min'];
const kursDavomlyligi = ['1 oy', '2 oy', '3 oy', '4 oy', '6 oy', '12 oy'];
const rangli = ['#2c3e50','#7c4dff','#e53935','#f57c00','#2e7d32','#00838f','#1565c0','#4527a0','#c2185b'];
const bgColors = ['#e8f0fe','#fce8f3','#fff3e0','#e8f5e9','#e0f7fa','#fffde7','#f3e5f5','#fbe9e7'];
const borderColors = ['#c5d7fb','#f5c6e4','#ffe0b2','#c8e6c9','#b2ebf2','#fff9c4','#e1bee7','#ffccbc'];

const KurslarContent = () => {
  const [activeFilial, setActiveFilial] = useState(0);
  const [courses, setCourses] = useState(() => {
    try { return JSON.parse(localStorage.getItem('courses')) || initialCourseCards; }
    catch { return initialCourseCards; }
  });
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [form, setForm] = useState({
    nomi: '', filiallar: ['Filial 1', 'Filial 2'],
    darsDavomiyligi: '', kursDavomiyligi: '',
    narx: '', description: '', rangi: rangli[1],
  });

  const resetForm = () => setForm({ nomi: '', filiallar: ['Filial 1', 'Filial 2'], darsDavomiyligi: '', kursDavomiyligi: '', narx: '', description: '', rangi: rangli[1] });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => { localStorage.setItem('courses', JSON.stringify(courses)); }, [courses]);

  const toggleFilial = (f) => {
    setForm(prev => ({
      ...prev,
      filiallar: prev.filiallar.includes(f) ? prev.filiallar.filter(x => x !== f) : [...prev.filiallar, f],
    }));
  };

  const handleSave = () => {
    if (!form.nomi.trim()) return;
    const idx = courses.length % bgColors.length;
    setCourses(prev => [...prev, {
      title: form.nomi.trim(),
      desc: form.description || "A little about the company and the team that you'll be working with. A li...",
      duration: form.darsDavomiyligi || '90 min',
      period: form.kursDavomiyligi || '3 oy',
      price: form.narx ? `${form.narx} mln` : '1 000 000 mln',
      bg: bgColors[idx],
      border: borderColors[idx],
    }]);
    resetForm();
    setDrawerOpen(false);
  };

  return (
    <div style={{ background: '#fff', borderRadius: '16px', padding: '20px', boxShadow: '0 1px 8px rgba(0,0,0,0.06)' }}>

      {/* Overlay */}
      {drawerOpen && <div onClick={() => { setDrawerOpen(false); resetForm(); }} style={{ position: 'fixed', inset: 0, zIndex: 1100, background: 'rgba(0,0,0,0.22)' }} />}

      {/* Slide-out Drawer */}
      <div style={{ position: 'fixed', top: 0, right: 0, height: '100vh', width: '420px', transform: drawerOpen ? 'translateX(0)' : 'translateX(100%)', transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1)', background: '#fff', zIndex: 1200, display: 'flex', flexDirection: 'column', boxShadow: '-4px 0 24px rgba(0,0,0,0.12)' }}>
        {/* Header */}
        <div style={{ padding: '20px 20px 14px', borderBottom: '1px solid #f1f1f5' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h2 style={{ margin: '0 0 4px', fontSize: '17px', fontWeight: 700, color: '#1a1a2e' }}>Kurs qoshish</h2>
              <p style={{ margin: 0, fontSize: '12.5px', color: '#9ca3af' }}>Bu yerda siz yangi Sovg'a qo'shishingiz mumkin.</p>
            </div>
            <button onClick={() => { setDrawerOpen(false); resetForm(); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', display: 'flex', padding: '2px' }}>
              <CloseOutlined fontSize="small" />
            </button>
          </div>
        </div>

        {/* Form */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
          {/* Nomi */}
          <div style={{ marginBottom: '18px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '7px' }}>Nomi</label>
            <input type="text" placeholder="HR Manager..." value={form.nomi} onChange={e => setForm({ ...form, nomi: e.target.value })}
              style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #e5e7eb', fontSize: '13.5px', outline: 'none', boxSizing: 'border-box' }}
              onFocus={e => (e.target.style.borderColor = '#7c4dff')} onBlur={e => (e.target.style.borderColor = '#e5e7eb')} />
          </div>

          {/* Filiallar */}
          <div style={{ marginBottom: '18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <label style={{ fontSize: '13px', fontWeight: 600, color: '#374151' }}>Kurs mavjud boledigon filiallar</label>
              <button onClick={() => setForm({ ...form, filiallar: ['Filial 1', 'Filial 2'] })} style={{ background: 'none', border: 'none', color: '#7c4dff', fontSize: '12.5px', cursor: 'pointer', fontWeight: 600 }}>Hammasini tanlash</button>
            </div>
            {['Filial 1', 'Filial 2'].map(f => (
              <label key={f} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', cursor: 'pointer', fontSize: '13.5px', color: '#374151' }}>
                <input type="checkbox" checked={form.filiallar.includes(f)} onChange={() => toggleFilial(f)}
                  style={{ accentColor: '#7c4dff', width: '16px', height: '16px', cursor: 'pointer' }} />
                {f}
              </label>
            ))}
          </div>

          {/* Dars davomiyligi */}
          <div style={{ marginBottom: '18px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '7px' }}>Dars davomiyligi</label>
            <select value={form.darsDavomiyligi} onChange={e => setForm({ ...form, darsDavomiyligi: e.target.value })}
              style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #e5e7eb', fontSize: '13.5px', outline: 'none', background: '#fff', cursor: 'pointer', color: form.darsDavomiyligi ? '#1a1a2e' : '#9ca3af' }}>
              <option value="">Tanlang</option>
              {darsDavomiyligi.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>

          {/* Kurs davomiyligi */}
          <div style={{ marginBottom: '18px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '7px' }}>Kurs davomiyligi (oylarda)</label>
            <select value={form.kursDavomiyligi} onChange={e => setForm({ ...form, kursDavomiyligi: e.target.value })}
              style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #e5e7eb', fontSize: '13.5px', outline: 'none', background: '#fff', cursor: 'pointer', color: form.kursDavomiyligi ? '#1a1a2e' : '#9ca3af' }}>
              <option value="">Tanlang</option>
              {kursDavomlyligi.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>

          {/* Narx */}
          <div style={{ marginBottom: '18px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '7px' }}>Narx</label>
            <div style={{ position: 'relative' }}>
              <CreditCardOutlined style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '18px', color: '#9ca3af' }} />
              <input type="text" placeholder="Narxini kiriting" value={form.narx} onChange={e => setForm({ ...form, narx: e.target.value })}
                style={{ width: '100%', padding: '10px 14px 10px 38px', borderRadius: '10px', border: '1.5px solid #e5e7eb', fontSize: '13.5px', outline: 'none', boxSizing: 'border-box' }}
                onFocus={e => (e.target.style.borderColor = '#7c4dff')} onBlur={e => (e.target.style.borderColor = '#e5e7eb')} />
            </div>
          </div>

          {/* Description */}
          <div style={{ marginBottom: '18px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '7px' }}>Description</label>
            <textarea placeholder="A little about the company and the team that you'll be working with." value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
              rows={4} style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #e5e7eb', fontSize: '13.5px', outline: 'none', resize: 'none', boxSizing: 'border-box', fontFamily: 'inherit' }}
              onFocus={e => (e.target.style.borderColor = '#7c4dff')} onBlur={e => (e.target.style.borderColor = '#e5e7eb')} />
            <p style={{ margin: '5px 0 0', fontSize: '12px', color: '#9ca3af' }}>This is a hint text to help user.</p>
          </div>

          {/* Rangi */}
          <div style={{ marginBottom: '8px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '4px' }}>Rangi</label>
            <p style={{ margin: '0 0 10px', fontSize: '12px', color: '#9ca3af' }}>The color you choose will be displayed to users and in the list of roles.</p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {rangli.map(c => (
                <button key={c} onClick={() => setForm({ ...form, rangi: c })}
                  style={{ width: '32px', height: '32px', borderRadius: '50%', background: c, border: form.rangi === c ? '3px solid #7c4dff' : '3px solid transparent', cursor: 'pointer', outline: form.rangi === c ? '2px solid #fff' : 'none', outlineOffset: '-5px', transition: 'all 0.15s' }} />
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: '14px 20px', borderTop: '1px solid #f1f1f5', display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
          <button onClick={() => { setDrawerOpen(false); resetForm(); }}
            style={{ padding: '10px 20px', borderRadius: '10px', border: '1.5px solid #e5e7eb', background: '#fff', color: '#6b7280', fontSize: '13.5px', fontWeight: 600, cursor: 'pointer' }}
            onMouseEnter={e => (e.currentTarget.style.background = '#f5f5fb')} onMouseLeave={e => (e.currentTarget.style.background = '#fff')}>
            Bekor qilish
          </button>
          <button onClick={handleSave}
            style={{ padding: '10px 24px', borderRadius: '10px', border: 'none', background: '#7c4dff', color: '#fff', fontSize: '13.5px', fontWeight: 600, cursor: 'pointer' }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.88')} onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
            Saqlash
          </button>
        </div>
      </div>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <span style={{ fontWeight: 600, fontSize: '15px', color: '#1a1a2e' }}>Kurslar</span>
        <button onClick={() => setDrawerOpen(true)} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#7c4dff', color: '#fff', border: 'none', borderRadius: '10px', padding: '8px 16px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
          <AddOutlined fontSize="small" /> Kurslar qo'shish
        </button>
      </div>

      {/* Filial tabs */}
      <div style={{ display: 'flex', gap: '4px', marginBottom: '20px' }}>
        {filialTabs.map((tab, i) => (
          <button key={i} onClick={() => setActiveFilial(i)} style={{ padding: '7px 16px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: activeFilial === i ? 600 : 400, background: activeFilial === i ? '#f0ebff' : '#f5f5fb', color: activeFilial === i ? '#7c4dff' : '#6b7280', transition: 'all 0.15s' }}>
            {tab}
          </button>
        ))}
      </div>

      {/* Course cards grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
        {courses.map((card, i) => (
          <div key={i} style={{ background: card.bg, border: `1px solid ${card.border}`, borderRadius: '12px', padding: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
              <span style={{ fontWeight: 600, fontSize: '13px', color: '#1a1a2e', lineHeight: 1.4 }}>{card.title}</span>
              <div style={{ display: 'flex', gap: '4px', flexShrink: 0, marginLeft: '6px' }}>
                <button onClick={() => setCourses(prev => prev.filter((_, idx) => idx !== i))} style={{ background: 'rgba(255,255,255,0.85)', border: 'none', borderRadius: '6px', padding: '4px', cursor: 'pointer', color: '#ef5350', display: 'flex' }}>
                  <DeleteOutlineOutlined style={{ fontSize: '14px' }} />
                </button>
                <button style={{ background: 'rgba(255,255,255,0.85)', border: 'none', borderRadius: '6px', padding: '4px', cursor: 'pointer', color: '#7c4dff', display: 'flex' }}>
                  <EditOutlined style={{ fontSize: '14px' }} />
                </button>
              </div>
            </div>
            <p style={{ fontSize: '11.5px', color: '#6b7280', margin: '0 0 10px 0', lineHeight: 1.5 }}>{card.desc}</p>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {[card.duration, card.period, card.price].map((info, j) => (
                <span key={j} style={{ fontSize: '11px', color: '#374151', fontWeight: 500, background: 'rgba(255,255,255,0.75)', borderRadius: '6px', padding: '2px 7px' }}>{info}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const xonalarFilialTabs = ['Fizika va Matematika', '4-maktab', 'Niner markazi', 'IELTS full mock', 'IELTS full mock centre', 'Arxiv'];

const initialRooms = [
  { name: 'genius room', capacity: 15 },
  { name: 'Impact room', capacity: 12 },
  { name: '1A', capacity: 25 },
  { name: '205-xona', capacity: 32 },
  { name: '16-xona', capacity: 18 },
  { name: '5 xona', capacity: 30 },
  { name: 'IELTS with islombek', capacity: 20 },
  { name: 'Beginner', capacity: 18 },
  { name: '99', capacity: 25 },
];

const XonalarContent = () => {
  const [activeFilial, setActiveFilial] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [form, setForm] = useState({ nomi: '', sigimi: '' });
  const [rooms, setRooms] = useState(() => {
    try { return JSON.parse(localStorage.getItem('rooms')) || initialRooms; }
    catch { return initialRooms; }
  });
  const [editIndex, setEditIndex] = useState(null);

  React.useEffect(() => { localStorage.setItem('rooms', JSON.stringify(rooms)); }, [rooms]);

  const openAdd = () => {
    setEditIndex(null);
    setForm({ nomi: '', sigimi: '' });
    setDrawerOpen(true);
  };

  const openEdit = (i) => {
    setEditIndex(i);
    setForm({ nomi: rooms[i].name, sigimi: String(rooms[i].capacity) });
    setDrawerOpen(true);
  };

  const handleDelete = (i) => {
    setRooms(prev => prev.filter((_, idx) => idx !== i));
  };

  const handleSave = () => {
    if (!form.nomi.trim()) return;
    if (editIndex !== null) {
      setRooms(prev => prev.map((r, i) => i === editIndex ? { name: form.nomi.trim(), capacity: Number(form.sigimi) || 0 } : r));
    } else {
      setRooms(prev => [...prev, { name: form.nomi.trim(), capacity: Number(form.sigimi) || 0 }]);
    }
    setForm({ nomi: '', sigimi: '' });
    setEditIndex(null);
    setDrawerOpen(false);
  };

  return (
    <div style={{ background: '#fff', borderRadius: '16px', padding: '20px', boxShadow: '0 1px 8px rgba(0,0,0,0.06)', position: 'relative' }}>

      {/* Right-side drawer overlay */}
      {drawerOpen && (
        <div onClick={() => setDrawerOpen(false)}
          style={{ position: 'fixed', inset: 0, zIndex: 1100, background: 'rgba(0,0,0,0.18)' }} />
      )}

      {/* Drawer panel — slides from right */}
      <div style={{
        position: 'fixed', top: 0, right: 0, height: '100vh',
        width: '360px',
        transform: drawerOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1)',
        background: '#fff', zIndex: 1200,
        display: 'flex', flexDirection: 'column',
        boxShadow: '-4px 0 24px rgba(0,0,0,0.10)',
      }}>
        {/* Drawer header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '20px 20px 16px 16px', borderBottom: '1px solid #f1f1f5' }}>
          <button onClick={() => setDrawerOpen(false)}
            style={{ width: '30px', height: '30px', borderRadius: '8px', border: 'none', background: '#f5f5fb', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7c4dff', flexShrink: 0, transition: 'background 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.background = '#ede9ff')}
            onMouseLeave={e => (e.currentTarget.style.background = '#f5f5fb')}>
            <ChevronRightOutlined fontSize="small" />
          </button>
          <span style={{ fontWeight: 700, fontSize: '16px', color: '#1a1a2e' }}>
            {editIndex !== null ? "Xonani tahrirlash" : "Xonani qo'shish"}
          </span>
        </div>

        {/* Drawer form */}
        <div style={{ flex: 1, padding: '24px 20px', overflowY: 'auto' }}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '8px' }}>
              Nomi <span style={{ color: '#ef5350' }}>*</span>
            </label>
            <input
              type="text"
              placeholder="Xona nomi"
              value={form.nomi}
              onChange={e => setForm({ ...form, nomi: e.target.value })}
              style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #e5e7eb', fontSize: '13.5px', color: '#1a1a2e', outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s' }}
              onFocus={e => (e.target.style.borderColor = '#7c4dff')}
              onBlur={e => (e.target.style.borderColor = '#e5e7eb')}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '8px' }}>
              Sig'imi <span style={{ color: '#ef5350' }}>*</span>
            </label>
            <input
              type="number"
              placeholder="Masalan: 20"
              value={form.sigimi}
              onChange={e => setForm({ ...form, sigimi: e.target.value })}
              style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #e5e7eb', fontSize: '13.5px', color: '#1a1a2e', outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s' }}
              onFocus={e => (e.target.style.borderColor = '#7c4dff')}
              onBlur={e => (e.target.style.borderColor = '#e5e7eb')}
            />
          </div>
        </div>

        {/* Drawer footer */}
        <div style={{ padding: '16px 20px', borderTop: '1px solid #f1f1f5', display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
          <button onClick={() => { setDrawerOpen(false); setForm({ nomi: '', sigimi: '' }); }}
            style={{ padding: '10px 20px', borderRadius: '10px', border: '1.5px solid #e5e7eb', background: '#fff', color: '#6b7280', fontSize: '13.5px', fontWeight: 600, cursor: 'pointer', transition: 'background 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.background = '#f5f5fb')}
            onMouseLeave={e => (e.currentTarget.style.background = '#fff')}>
            Bekor qilish
          </button>
          <button
            onClick={handleSave}
            style={{ padding: '10px 24px', borderRadius: '10px', border: 'none', background: '#7c4dff', color: '#fff', fontSize: '13.5px', fontWeight: 600, cursor: 'pointer', transition: 'opacity 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.88')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
            Saqlash
          </button>
        </div>
      </div>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontWeight: 600, fontSize: '15px', color: '#1a1a2e' }}>Xonalar</span>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', display: 'flex', alignItems: 'center', padding: '2px' }}>
            <RefreshOutlined style={{ fontSize: '16px' }} />
          </button>
        </div>
        <button onClick={openAdd}
          style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#7c4dff', color: '#fff', border: 'none', borderRadius: '10px', padding: '8px 16px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
          <AddOutlined fontSize="small" /> Xonani qo'shish
        </button>
      </div>

      {/* Filial tabs */}
      <div style={{ display: 'flex', gap: '6px', marginBottom: '20px', flexWrap: 'wrap' }}>
        {xonalarFilialTabs.map((tab, i) => (
          <button key={i} onClick={() => setActiveFilial(i)} style={{ padding: '6px 14px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '12.5px', fontWeight: activeFilial === i ? 600 : 400, background: activeFilial === i ? '#f0ebff' : '#f5f5fb', color: activeFilial === i ? '#7c4dff' : '#6b7280', transition: 'all 0.15s' }}>
            {tab}
          </button>
        ))}
      </div>

      {/* Rooms grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
        {rooms.map((room, i) => (
          <div key={i} style={{ background: '#fafafa', border: '1px solid #f1f1f5', borderRadius: '10px', padding: '14px 14px 12px 14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <p style={{ margin: '0 0 4px 0', fontWeight: 600, fontSize: '13px', color: '#1a1a2e' }}>{room.name}</p>
                <p style={{ margin: 0, fontSize: '12px', color: '#9ca3af' }}>Sig'imi: {room.capacity}</p>
              </div>
              <div style={{ display: 'flex', gap: '4px', flexShrink: 0 }}>
                <button onClick={() => handleDelete(i)} style={{ background: '#fff', border: 'none', borderRadius: '6px', padding: '4px', cursor: 'pointer', color: '#ef5350', display: 'flex', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                  <DeleteOutlineOutlined style={{ fontSize: '14px' }} />
                </button>
                <button onClick={() => openEdit(i)} style={{ background: '#fff', border: 'none', borderRadius: '6px', padding: '4px', cursor: 'pointer', color: '#7c4dff', display: 'flex', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                  <EditOutlined style={{ fontSize: '14px' }} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


const Management = () => {
  const [open, setOpen] = useState(true);
  const [activeItem, setActiveItem] = useState(0);

  return (
    <div style={{ position: 'relative' }}>

      {/* Fixed full-height sliding panel */}
      <div style={{
        position: 'fixed', top: 0, left: `${SIDEBAR_W}px`,
        height: '100vh', width: open ? `${PANEL_W}px` : '0px',
        overflow: 'hidden', transition: 'width 0.35s cubic-bezier(0.4,0,0.2,1)',
        zIndex: 1000, boxShadow: open ? '4px 0 24px rgba(124,77,255,0.10)' : 'none',
      }}>
        <div style={{ width: `${PANEL_W}px`, height: '100%', background: '#fff', borderRight: '1px solid #f1f1f5', display: 'flex', flexDirection: 'column' }}>
          {/* Panel header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 16px 14px 16px', borderBottom: '1px solid #f1f1f5' }}>
            <span style={{ fontWeight: 700, fontSize: '15px', color: '#1a1a2e' }}>Menu</span>
            <button onClick={() => setOpen(false)} style={{ width: '28px', height: '28px', borderRadius: '8px', border: 'none', background: '#f5f5fb', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7c4dff', transition: 'background 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.background = '#ede9ff')}
              onMouseLeave={e => (e.currentTarget.style.background = '#f5f5fb')}>
              <ChevronLeftOutlined fontSize="small" />
            </button>
          </div>
          {/* Menu items */}
          <nav style={{ padding: '10px', flex: 1, overflowY: 'auto' }}>
            {menuItems.map((item, idx) => (
              <button key={idx} onClick={() => setActiveItem(idx)} style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%', padding: '10px 12px', borderRadius: '10px', border: 'none', cursor: 'pointer', background: activeItem === idx ? '#ede9ff' : 'transparent', color: activeItem === idx ? '#7c4dff' : '#6b7280', fontWeight: activeItem === idx ? 600 : 500, fontSize: '13.5px', textAlign: 'left', marginBottom: '2px', transition: 'background 0.18s, color 0.18s', whiteSpace: 'nowrap' }}
                onMouseEnter={e => { if (activeItem !== idx) { e.currentTarget.style.background = '#f5f5fb'; e.currentTarget.style.color = '#7c4dff'; } }}
                onMouseLeave={e => { if (activeItem !== idx) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#6b7280'; } }}>
                <span style={{ color: activeItem === idx ? '#7c4dff' : '#9ca3af', display: 'flex', alignItems: 'center' }}>{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Toggle button (visible when panel closed) */}
      {!open && (
        <button onClick={() => setOpen(true)}
          style={{ position: 'fixed', top: '12px', left: `${SIDEBAR_W + 12}px`, zIndex: 1001, width: '32px', height: '32px', borderRadius: '8px', border: 'none', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7c4dff', boxShadow: '0 1px 8px rgba(124,77,255,0.13)', transition: 'background 0.2s' }}
          onMouseEnter={e => (e.currentTarget.style.background = '#ede9ff')}
          onMouseLeave={e => (e.currentTarget.style.background = '#fff')}
          title="Menyuni ochish">
          <ChevronRightOutlined fontSize="small" />
        </button>
      )}

      {/* Main content — shifts right when panel is open */}
      <div style={{ marginLeft: open ? `${PANEL_W}px` : '0px', transition: 'margin-left 0.35s cubic-bezier(0.4,0,0.2,1)', padding: '4px 0' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#1a1a2e', margin: '0 0 6px 0' }}>Boshqarish</h1>
        <p style={{ fontSize: '13.5px', color: '#6b7280', margin: '0 0 20px 0', lineHeight: 1.6 }}>
          Ushbu sahifada siz sovg'alarni boshqarish imkoniyatiga ega bo'lasiz. Har bir sovg'a haqida batafsil ma'lumot va yangi sovg'a qo'shish imkoniyat bor.
        </p>

        {/* Horizontal tabs — panel bilan sinxron */}
        <div style={{ display: 'flex', borderBottom: '2px solid #f1f1f5', marginBottom: '20px', overflowX: 'auto' }}>
          {menuItems.map((item, i) => (
            <button key={i} onClick={() => setActiveItem(i)} style={{ padding: '10px 16px', border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '13.5px', fontWeight: activeItem === i ? 600 : 400, color: activeItem === i ? '#7c4dff' : '#6b7280', borderBottom: activeItem === i ? '2px solid #7c4dff' : '2px solid transparent', marginBottom: '-2px', whiteSpace: 'nowrap', transition: 'color 0.18s, border-color 0.18s' }}>
              {item.label}
            </button>
          ))}
        </div>

        {activeItem === 0 ? (
          <KurslarContent />
        ) : activeItem === 1 ? (
          <XonalarContent />
        ) : (
          <div style={{ background: '#fff', borderRadius: '16px', padding: '32px', boxShadow: '0 1px 8px rgba(0,0,0,0.06)', color: '#9ca3af', textAlign: 'center', fontSize: '14px' }}>
            {menuItems[activeItem].label} bo'limi tez orada qo'shiladi.
          </div>
        )}
      </div>
    </div>
  );
};

export default Management;
