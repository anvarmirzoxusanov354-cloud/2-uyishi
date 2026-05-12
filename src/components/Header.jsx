import React, { useState } from 'react';
import { 
  Search, 
  NotificationsNone, 
  DarkModeOutlined, 
  KeyboardArrowDown,
  ArrowBackIosNew
} from '@mui/icons-material';
import { Switch, Select, MenuItem, FormControl } from '@mui/material';

const Header = () => {
  const [lang, setLang] = useState('uzb');

  return (
    <header className="h-16 flex items-center justify-between px-6 bg-[#f8f9fe]">
      <div className="flex items-center gap-4">
        <button className="w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm text-gray-400">
           <ArrowBackIosNew fontSize="small" className="scale-75" />
        </button>
        <div className="relative group">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
            <Search fontSize="small" />
          </div>
          <input 
            type="text" 
            placeholder="Search..." 
            className="bg-white border-none rounded-xl py-2 pl-10 pr-4 w-64 text-sm focus:ring-2 focus:ring-[#7c4dff] transition-all shadow-sm outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
      
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <FormControl size="small" variant="standard" sx={{ minWidth: 100, px: 2 }}>
            <Select
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              displayEmpty
              disableUnderline
              sx={{ fontSize: '14px', fontWeight: 500, height: '36px' }}
            >
              <MenuItem value="uzb">Uzbek</MenuItem>
              <MenuItem value="eng">English</MenuItem>
              <MenuItem value="rus">Russian</MenuItem>
            </Select>
          </FormControl>
        </div>
        
        <button className="w-10 h-10 flex items-center justify-center bg-white rounded-xl shadow-sm text-gray-500 hover:bg-gray-50 transition-all">
          <NotificationsNone />
        </button>

        <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-xl shadow-sm">
          <DarkModeOutlined fontSize="small" className="text-gray-500" />
          <Switch size="small" color="default" />
        </div>

        <div className="w-10 h-10 rounded-xl overflow-hidden shadow-sm border border-white cursor-pointer">
          <img 
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80" 
            alt="Profile" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
