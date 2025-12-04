import React, { useState } from 'react';
import { Piano } from './components/Piano';
import { SheetMusic } from './components/SheetMusic';

function App() {
  const [showLabels, setShowLabels] = useState(true);
  const [activeKeys, setActiveKeys] = useState<Set<string>>(new Set());

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between">
      
      <div className="flex flex-col items-center justify-start pt-8 px-4 sm:px-6">
        <div className="w-full max-w-5xl space-y-6">
          
          {/* Header */}
          <div className="space-y-4 text-center sm:text-left">
            <h1 className="text-4xl font-bold text-gray-800 tracking-tight">
              온라인 피아노
            </h1>
            <p className="text-gray-500 text-lg">
              누구나 쉽게 즐길 수 있는 웹 기반 피아노입니다. 마우스 클릭이나 키보드 단축키를 활용해 나만의 연주를 시작해보세요.
            </p>
          </div>

          {/* Controls */}
          <div className="flex space-x-4">
            <button
              onClick={() => setShowLabels(true)}
              className={`
                px-6 py-2 rounded shadow-sm text-sm font-medium transition-colors border
                ${showLabels 
                  ? 'bg-gray-100 text-gray-900 border-gray-300' 
                  : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}
              `}
            >
              표시하기
            </button>
            <button
              onClick={() => setShowLabels(false)}
              className={`
                px-6 py-2 rounded shadow-sm text-sm font-medium transition-colors border
                ${!showLabels 
                  ? 'bg-gray-100 text-gray-900 border-gray-300' 
                  : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}
              `}
            >
              음이름 숨기기
            </button>
          </div>

          {/* Main Visuals Area */}
          <div className="w-full">
            {/* Sheet Music Display */}
            <SheetMusic activeKeys={activeKeys} />
            
            {/* Piano Container */}
            <Piano 
              showLabels={showLabels} 
              activeKeys={activeKeys} 
              setActiveKeys={setActiveKeys} 
            />
          </div>
          
        </div>
      </div>

      {/* Stylized Footer */}
      <footer className="w-full bg-gray-900 text-white mt-16 py-8 px-6 border-t border-gray-800">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* Left Side: Brand Info */}
          <div className="flex flex-col items-center md:items-start space-y-2 text-center md:text-left">
            <h2 className="text-2xl font-extrabold tracking-wider text-white">VOCAL LOGIC</h2>
            <div className="flex flex-col md:flex-row md:space-x-2 text-sm text-gray-400">
              <span className="font-medium">발성교정 전문 보컬트레이닝</span>
              <span className="hidden md:inline text-gray-600">|</span>
              <span className="italic text-gray-500">"세상에 나쁜 목소리는 없다."</span>
            </div>
             <div className="text-xs text-gray-600 pt-1">
               © 2025 VOCAL LOGIC. All rights reserved.
            </div>
          </div>

          {/* Right Side: Links */}
          <div className="flex space-x-4">
            <a 
              href="https://www.youtube.com/@VOCAL-LOGIC" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group p-3 bg-gray-800 rounded-full hover:bg-white hover:text-red-600 text-gray-400 transition-all duration-300 transform hover:scale-110"
              title="YouTube"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
              </svg>
            </a>

            <a 
              href="https://open.kakao.com/o/g9nFmjXf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group p-3 bg-gray-800 rounded-full hover:bg-yellow-400 hover:text-gray-900 text-gray-400 transition-all duration-300 transform hover:scale-110"
              title="Open Chat"
            >
               <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                 <path d="M12 3c-4.97 0-9 3.13-9 7 0 2.26 1.38 4.27 3.53 5.56-.24.89-.87 3.23-.9 3.37-.05.21.22.34.36.23.51-.38 3.06-2.12 3.56-2.48.8.11 1.63.17 2.45.17 4.97 0 9-3.13 9-7s-4.03-7-9-7z"/>
               </svg>
            </a>

            <a 
              href="https://blog.naver.com/jellman" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group p-3 bg-gray-800 rounded-full hover:bg-green-500 hover:text-white text-gray-400 transition-all duration-300 transform hover:scale-110"
              title="Blog"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M3 3h18v18H3V3zm16 16V5H5v14h14zM7 7h10v2H7V7zm0 4h10v2H7v-2zm0 4h7v2H7v-2z"/>
              </svg>
            </a>
          </div>
          
        </div>
      </footer>
    </div>
  );
}

export default App;
