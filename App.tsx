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

      {/* Minimal Footer */}
      <footer className="flex-none bg-gray-100 text-gray-500 py-2 px-4 text-center text-xs z-10 landscape:py-1">
        <span>온라인 피아노 - 웹 브라우저에서 즐기는 고품질 피아노</span>
      </footer>
    </div>
  );
}

export default App;