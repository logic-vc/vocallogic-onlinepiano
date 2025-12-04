import React, { useState } from 'react';
import { Piano } from './components/Piano';
import { SheetMusic } from './components/SheetMusic';

function App() {
  const [showLabels, setShowLabels] = useState(true);
  const [activeKeys, setActiveKeys] = useState<Set<string>>(new Set());

  return (
    // h-[100dvh] ensures it fits exactly on the mobile/desktop screen without body scroll
    <div className="h-[100dvh] bg-white flex flex-col overflow-hidden">
      
      {/* Header Section - Compact */}
      <header className="flex-none pt-4 pb-2 px-4 sm:px-6 flex flex-col items-center md:flex-row md:justify-between md:items-end border-b border-gray-100 z-10 landscape:py-1">
        <div className="text-center md:text-left mb-2 md:mb-0 landscape:mb-0 landscape:flex landscape:items-baseline landscape:gap-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 tracking-tight landscape:text-xl">
            온라인 피아노
          </h1>
          <p className="text-gray-500 text-xs sm:text-sm hidden sm:block mt-1 landscape:mt-0 landscape:text-xs">
             웹 브라우저에서 즐기는 고품질 피아노
          </p>
        </div>

        {/* Controls */}
        <div className="flex space-x-2">
          <button
            onClick={() => setShowLabels(true)}
            className={`
              px-3 py-1.5 rounded text-xs sm:text-sm font-medium transition-colors border
              ${showLabels 
                ? 'bg-gray-800 text-white border-gray-800' 
                : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}
            `}
          >
            표시하기
          </button>
          <button
            onClick={() => setShowLabels(false)}
            className={`
              px-3 py-1.5 rounded text-xs sm:text-sm font-medium transition-colors border
              ${!showLabels 
                ? 'bg-gray-800 text-white border-gray-800' 
                : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}
            `}
          >
            숨기기
          </button>
        </div>
      </header>

      {/* Main Visuals Area - Expands to fill available space */}
      <main className="flex-1 min-h-0 flex flex-col w-full max-w-7xl mx-auto px-2 sm:px-4 py-2 gap-2 sm:gap-4 landscape:gap-2">
        
        {/* Sheet Music - Flex-1 */}
        <div className="flex-1 min-h-0 w-full bg-white rounded-xl border border-gray-100 shadow-sm relative landscape:max-w-4xl landscape:mx-auto">
           <SheetMusic activeKeys={activeKeys} />
        </div>
        
        {/* Piano - Flex-1.25 (Reduced from 2 to shrink height by ~20%) */}
        <div className="flex-[1.25] landscape:flex-[2] min-h-0 w-full relative landscape:max-w-5xl landscape:mx-auto">
          <Piano 
            showLabels={showLabels} 
            activeKeys={activeKeys} 
            setActiveKeys={setActiveKeys} 
          />
        </div>
      </main>

      {/* Stylized Footer - Compact */}
      <footer className="flex-none bg-gray-900 text-white py-3 px-4 sm:px-6 z-10 landscape:py-1">
        <div className="max-w-7xl mx-auto flex flex-row justify-between items-center gap-4">
          
          {/* Left Side: Brand Info */}
          <div className="flex flex-col items-start justify-center">
            <div className="flex items-baseline gap-2">
               <h2 className="text-lg sm:text-xl font-extrabold tracking-wider text-white landscape:text-base">VOCAL LOGIC</h2>
               <span className="hidden sm:inline text-xs text-gray-400">발성교정 전문 보컬트레이닝</span>
            </div>
             <div className="text-[10px] sm:text-xs text-gray-500">
               © 2025 VOCAL LOGIC
            </div>
          </div>

          {/* Right Side: Links */}
          <div className="flex space-x-3">
            <a 
              href="https://www.youtube.com/@VOCAL-LOGIC" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group p-2 bg-gray-800 rounded-full hover:bg-white hover:text-red-600 text-gray-400 transition-all duration-300 landscape:p-1.5"
              title="YouTube"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
              </svg>
            </a>

            <a 
              href="https://open.kakao.com/o/g9nFmjXf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group p-2 bg-gray-800 rounded-full hover:bg-yellow-400 hover:text-gray-900 text-gray-400 transition-all duration-300 landscape:p-1.5"
              title="Open Chat"
            >
               <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                 <path d="M12 3c-4.97 0-9 3.13-9 7 0 2.26 1.38 4.27 3.53 5.56-.24.89-.87 3.23-.9 3.37-.05.21.22.34.36.23.51-.38 3.06-2.12 3.56-2.48.8.11 1.63.17 2.45.17 4.97 0 9-3.13 9-7s-4.03-7-9-7z"/>
               </svg>
            </a>

            <a 
              href="https://blog.naver.com/jellman" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group p-2 bg-gray-800 rounded-full hover:bg-green-500 hover:text-white text-gray-400 transition-all duration-300 landscape:p-1.5"
              title="Blog"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
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