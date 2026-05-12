import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  HomeOutlined, 
  PeopleAltOutlined, 
  SchoolOutlined, 
  GroupOutlined, 
  CardGiftcardOutlined, 
  SettingsOutlined,
  DescriptionOutlined
} from '@mui/icons-material';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const getLinkClass = (path) => {
    const baseClass = "flex items-center gap-3 px-4 py-3 rounded-xl transition-all ";
    if (location.pathname === path) {
      return baseClass + "bg-[#7c4dff] text-white";
    }
    return baseClass + "text-gray-500 hover:bg-gray-50";
  };

  return (
    <div className="w-64 bg-white border-r border-gray-100 flex flex-col h-screen sticky top-0 p-4">
      
      <div className="flex items-center gap-2 mb-10 px-2">
        <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center text-white font-bold">E</div>
        <span className="text-xl font-bold">Najotedu</span>
      </div>

      
      <div className="space-y-2 flex-1">
        <Link to="/" className={getLinkClass("/")}>
          <HomeOutlined fontSize="small" />
          <span className="text-sm font-medium">Asosiy</span>
        </Link>

        <Link to="/teachers" className={getLinkClass("/teachers")}>
          <PeopleAltOutlined fontSize="small" />
          <span className="text-sm font-medium">O'qituvchilar</span>
        </Link>

        <Link to="/classes" className={getLinkClass("/classes")}>
          <SchoolOutlined fontSize="small" />
          <span className="text-sm font-medium">Sinflar</span>
        </Link>

        <Link to="/students" className={getLinkClass("/students")}>
          <GroupOutlined fontSize="small" />
          <span className="text-sm font-medium">Talabalar</span>
        </Link>

        <Link to="/gifts" className={getLinkClass("/gifts")}>
          <CardGiftcardOutlined fontSize="small" />
          <span className="text-sm font-medium">Sovg'alar</span>
        </Link>

        <Link to="/management" className={getLinkClass("/management")}>
          <SettingsOutlined fontSize="small" />
          <span className="text-sm font-medium">Boshqarish</span>
        </Link>
      </div>

      <div className="mt-auto">
        <div className="bg-gray-50 p-4 rounded-2xl">
          <div className="flex gap-3 mb-4">
             <div className="p-2 bg-white rounded shadow-sm">
                <DescriptionOutlined className="text-orange-400" fontSize="small" />
             </div>
             <div>
                <p className="text-xs font-bold">Obuna</p>
                <p className="text-[10px] text-red-500">Obunangiz tugagan</p>
             </div>
          </div>
          <button onClick={() => navigate('/subscription')} className="w-full bg-[#ff3d00] text-white py-2 rounded-xl text-xs font-bold hover:bg-opacity-90 cursor-pointer">
            ⚡ Obunani yangilash
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
