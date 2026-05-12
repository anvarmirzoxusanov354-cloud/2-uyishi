import React from 'react';
import { 
  GroupOutlined, 
  MenuBookOutlined, 
  SchoolOutlined, 
  CardGiftcardOutlined,
  PeopleAltOutlined,
  ExpandMore
} from '@mui/icons-material';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';

const Dashboard = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
     
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-1">Salom, creator!</h1>
        <p className="text-gray-400 text-sm">EduCoin platformasiga xush kelibsiz!</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-50 flex flex-col items-center">
          <GroupOutlined className="text-purple-400 mb-2" />
          <span className="text-[10px] text-gray-400 font-bold uppercase mb-1">Sinflar</span>
          <p className="text-2xl font-bold text-gray-800">0</p>
        </div>

       
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-50 flex flex-col items-center">
          <MenuBookOutlined className="text-pink-400 mb-2" />
          <span className="text-[10px] text-gray-400 font-bold uppercase mb-1">Fanlar</span>
          <p className="text-2xl font-bold text-gray-800">0</p>
        </div>

      
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-50 flex flex-col items-center">
          <SchoolOutlined className="text-cyan-400 mb-2" />
          <span className="text-[10px] text-gray-400 font-bold uppercase mb-1">Talabalar</span>
          <p className="text-2xl font-bold text-gray-800">1</p>
        </div>

      
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-50 flex flex-col items-center">
          <CardGiftcardOutlined className="text-indigo-400 mb-2" />
          <span className="text-[10px] text-gray-400 font-bold uppercase mb-1">Sovg'alar</span>
          <p className="text-2xl font-bold text-gray-800">3</p>
        </div>

        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-50 flex flex-col items-center">
          <PeopleAltOutlined className="text-purple-400 mb-2" />
          <span className="text-[10px] text-gray-400 font-bold uppercase mb-1">O'qituvchilar</span>
          <p className="text-2xl font-bold text-gray-800">0</p>
        </div>
      </div>


      <div className="shadow-sm">
        <Accordion sx={{ borderRadius: '16px !important', '&:before': { display: 'none' }, border: '1px solid #f9fafb' }}>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            sx={{ px: 3, py: 1 }}
          >
            <Typography sx={{ fontSize: '14px', fontWeight: 'bold', color: '#374151' }}>Dars Jadvali</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ py: 10, display: 'flex', justifyContent: 'center' }}>
            <Typography sx={{ color: '#9ca3af', fontSize: '14px' }}>
              Ma'lumotlar mavjud emas
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};

export default Dashboard;
