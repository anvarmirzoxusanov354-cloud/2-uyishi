import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowBackOutlined,
  CheckCircleOutlined,
  StarOutlined,
  DiamondOutlined,
  WorkspacePremiumOutlined,
  BoltOutlined,
} from '@mui/icons-material';

const plans = [
  {
    key: 'standart',
    name: 'Standart',
    price: "150,000",
    icon: <StarOutlined style={{ fontSize: '32px' }} />,
    color: '#6b7280',
    bg: '#f9fafb',
    border: '#e5e7eb',
    btnBg: '#6b7280',
    features: [
      '1 ta filial',
      '50 tagacha talaba',
      'Kurslar boshqaruvi',
      'Hodimlar boshqaruvi',
      'Asosiy hisobotlar',
      "Email qo'llab-quvvatlash",
    ],
  },
  {
    key: 'premium',
    name: 'Premium',
    price: "500,000",
    icon: <WorkspacePremiumOutlined style={{ fontSize: '32px' }} />,
    color: '#7c4dff',
    bg: '#f5f0ff',
    border: '#c4b5fd',
    btnBg: '#7c4dff',
    popular: true,
    features: [
      '3 tagacha filial',
      '200 tagacha talaba',
      'Kurslar boshqaruvi',
      'Hodimlar va rollar',
      'Coin tizimi',
      'Kengaytirilgan hisobotlar',
      'SMS xabar yuborish',
      "Ustuvor qo'llab-quvvatlash",
    ],
  },
  {
    key: 'vip',
    name: 'VIP',
    price: "1,000,000",
    icon: <DiamondOutlined style={{ fontSize: '32px' }} />,
    color: '#f59e0b',
    bg: '#fffbeb',
    border: '#fcd34d',
    btnBg: '#f59e0b',
    features: [
      'Cheksiz filiallar',
      'Cheksiz talabalar',
      'Barcha Premium imkoniyatlar',
      'Xonalar boshqaruvi',
      'Telegram bot integratsiyasi',
      'Tekshiruv tizimi',
      'FAQ boshqaruvi',
      'Shaxsiy menejer',
      "24/7 qo'llab-quvvatlash",
    ],
  },
];

const Subscription = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fe', padding: '0' }}>
      {/* Header */}
      <div style={{ background: '#fff', borderBottom: '1px solid #f1f1f5', padding: '16px 32px', display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button
          onClick={() => navigate(-1)}
          style={{ width: '36px', height: '36px', borderRadius: '10px', border: 'none', background: '#f5f5fb', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7c4dff', transition: 'background 0.2s' }}
          onMouseEnter={e => (e.currentTarget.style.background = '#ede9ff')}
          onMouseLeave={e => (e.currentTarget.style.background = '#f5f5fb')}
        >
          <ArrowBackOutlined fontSize="small" />
        </button>
        <div>
          <h1 style={{ margin: 0, fontSize: '20px', fontWeight: 700, color: '#1a1a2e' }}>Obuna rejalarini tanlang</h1>
          <p style={{ margin: 0, fontSize: '13px', color: '#9ca3af' }}>O'zingizga mos tarifni tanlang va imkoniyatlardan foydalaning</p>
        </div>
      </div>

      {/* Plans */}
      <div style={{ padding: '40px 32px', maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          {plans.map((plan) => (
            <div
              key={plan.key}
              onClick={() => setSelected(plan.key)}
              style={{
                background: plan.bg,
                border: `2px solid ${selected === plan.key ? plan.color : plan.border}`,
                borderRadius: '20px',
                padding: '28px 24px',
                cursor: 'pointer',
                position: 'relative',
                transition: 'all 0.2s',
                boxShadow: selected === plan.key ? `0 4px 20px ${plan.color}33` : '0 1px 6px rgba(0,0,0,0.05)',
                transform: selected === plan.key ? 'translateY(-4px)' : 'none',
              }}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: '#7c4dff', color: '#fff', fontSize: '11px', fontWeight: 700, padding: '4px 14px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                  <BoltOutlined style={{ fontSize: '12px', verticalAlign: 'middle' }} /> Mashhur
                </div>
              )}

              {/* Icon */}
              <div style={{ color: plan.color, marginBottom: '14px' }}>{plan.icon}</div>

              {/* Name */}
              <h2 style={{ margin: '0 0 4px 0', fontSize: '20px', fontWeight: 700, color: '#1a1a2e' }}>{plan.name}</h2>

              {/* Price */}
              <div style={{ marginBottom: '20px' }}>
                <span style={{ fontSize: '28px', fontWeight: 800, color: plan.color }}>{plan.price}</span>
                <span style={{ fontSize: '13px', color: '#9ca3af', marginLeft: '4px' }}>so'm/oy</span>
              </div>

              {/* Features */}
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px 0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {plan.features.map((f, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#374151' }}>
                    <CheckCircleOutlined style={{ fontSize: '16px', color: plan.color, flexShrink: 0 }} />
                    {f}
                  </li>
                ))}
              </ul>

              {/* Button */}
              <button
                style={{
                  width: '100%', padding: '12px', border: 'none', borderRadius: '12px',
                  background: selected === plan.key ? plan.btnBg : '#fff',
                  color: selected === plan.key ? '#fff' : plan.color,
                  fontWeight: 700, fontSize: '14px', cursor: 'pointer',
                  border: `2px solid ${plan.color}`,
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = plan.btnBg; e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={e => {
                  if (selected !== plan.key) {
                    e.currentTarget.style.background = '#fff';
                    e.currentTarget.style.color = plan.color;
                  }
                }}
                onClick={e => { e.stopPropagation(); setSelected(plan.key); }}
              >
                {selected === plan.key ? '✓ Tanlandi' : "Tanlash"}
              </button>
            </div>
          ))}
        </div>

        {/* Confirm button */}
        {selected && (
          <div style={{ textAlign: 'center', marginTop: '32px' }}>
            <button style={{ background: '#7c4dff', color: '#fff', border: 'none', borderRadius: '14px', padding: '14px 48px', fontSize: '15px', fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 16px rgba(124,77,255,0.3)', transition: 'opacity 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.9')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              <BoltOutlined style={{ verticalAlign: 'middle', marginRight: '6px' }} />
              Obunani faollashtirish
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Subscription;
