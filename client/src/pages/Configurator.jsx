import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import axios from 'axios';
import Scene from '../three/Scene';

const Configurator = () => {
  // --- 3D Scene States ---
  const [carColor, setCarColor] = useState('#ffffff');
  const [windowTint, setWindowTint] = useState('clear');
  const [headlightsOn, setHeadlightsOn] = useState(false);
  const [environmentMap, setEnvironmentMap] = useState('city');
  
  // --- UI States ---
  const [activeTab, setActiveTab] = useState('paint');
  const [saveStatus, setSaveStatus] = useState('');

  const handleSaveConfiguration = async () => {
    try {
      setSaveStatus('Authenticating & Saving...');
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      
      if (!userInfo || !userInfo.token) {
        setSaveStatus('Error: Registration required to save.');
        return;
      }

      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };

      await axios.post(
        'http://localhost:5000/api/auth/save-config',
        {
          modelName: 'AeroGT',
          color: carColor,
          basePrice: 145000,
          // We can expand the backend later to save these new variables too!
          details: { windowTint, headlightsOn, environmentMap }
        },
        config
      );

      setSaveStatus('Saved to your Garage!');
      setTimeout(() => setSaveStatus(''), 4000);
    } catch (error) {
      setSaveStatus(error.response?.data?.message || 'Failed to connect to servers.');
    }
  };

  return (
    <div className="relative h-screen w-full bg-[#050505] overflow-hidden flex font-sans">
      
      {/* 3D CANVAS */}
      <div className="absolute inset-0 z-0">
        <Canvas shadows dpr={[1, 2]} gl={{ antialias: true, toneMappingExposure: 1.2 }}>
          <color attach="background" args={environmentMap === 'night' ? ['#020202'] : ['#111111']} />
          <Scene 
            carColor={carColor} 
            windowTint={windowTint} 
            headlightsOn={headlightsOn} 
            environmentMap={environmentMap} 
          />
        </Canvas>
      </div>

      {/* FRONTEND UI OVERLAY */}
      <div className="relative z-10 w-full h-full pointer-events-none flex justify-between p-8 md:p-12 mt-20">
        
        {/* LEFT SIDE: Brand & Telemetry */}
        <div className="flex flex-col justify-between h-full max-w-sm pointer-events-auto">
          <div>
            <h1 className="text-5xl font-light tracking-[0.2em] uppercase mb-2 text-white drop-shadow-lg">Aero<span className="font-bold">GT</span></h1>
            <p className="text-gray-400 text-xs tracking-[0.3em] uppercase mb-6 border-l-2 border-white pl-3">Project Portfolio</p>
          </div>
          
          <div className="space-y-6 bg-black/20 backdrop-blur-md p-6 rounded-xl border border-white/5">
            <h3 className="uppercase tracking-widest text-[10px] text-gray-400 border-b border-white/10 pb-2">Live Telemetry</h3>
            <div className="flex justify-between items-end">
              <span className="text-xs uppercase tracking-widest text-gray-500">Acceleration</span>
              <span className="text-lg font-light text-white">2.9<span className="text-xs text-gray-500 ml-1">s</span></span>
            </div>
            <div className="flex justify-between items-end">
              <span className="text-xs uppercase tracking-widest text-gray-500">Top Speed</span>
              <span className="text-lg font-light text-white">215<span className="text-xs text-gray-500 ml-1">mph</span></span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: Interactive Configurator Panel */}
        <div className="flex flex-col justify-center h-full w-[380px] pointer-events-auto">
          <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            
            {/* TABS HEADER */}
            <div className="flex border-b border-white/10">
              {['paint', 'accessories', 'scene'].map((tab) => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-4 text-[10px] uppercase tracking-widest transition-all duration-300 ${activeTab === tab ? 'bg-white/10 text-white font-bold border-b-2 border-white' : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'}`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* TAB CONTENT: PAINT */}
            {activeTab === 'paint' && (
              <div className="p-8 space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                <div>
                  <h3 className="uppercase tracking-widest text-[10px] text-gray-400 mb-4">Signature Colors</h3>
                  <div className="grid grid-cols-4 gap-4">
                    {/* Color Swatches */}
                    {[
                      { hex: '#ffffff', name: 'Polar' },
                      { hex: '#0a0a0a', name: 'Midnight' },
                      { hex: '#dc2626', name: 'Inferno' },
                      { hex: '#1e3a8a', name: 'Cobalt' },
                      { hex: '#166534', name: 'Emerald' },
                      { hex: '#f59e0b', name: 'Solar' },
                      { hex: '#6b7280', name: 'Tungsten' },
                      { hex: '#9333ea', name: 'Nebula' }
                    ].map((color) => (
                      <div key={color.hex} className="flex flex-col items-center gap-2">
                        <button 
                          onClick={() => setCarColor(color.hex)} 
                          style={{ backgroundColor: color.hex }}
                          className={`w-10 h-10 rounded-full border-2 shadow-inner transition-all duration-300 ${carColor === color.hex ? 'border-white scale-110 shadow-[0_0_15px_rgba(255,255,255,0.3)]' : 'border-white/20 hover:scale-105'}`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: ACCESSORIES */}
            {activeTab === 'accessories' && (
              <div className="p-8 space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                {/* Window Tint */}
                <div>
                  <h3 className="uppercase tracking-widest text-[10px] text-gray-400 mb-4 flex justify-between">
                    <span>Window Privacy</span>
                    <span className="text-white">{windowTint === 'dark' ? 'Limousine' : 'Standard'}</span>
                  </h3>
                  <div className="flex bg-black/40 p-1 rounded-lg">
                    <button onClick={() => setWindowTint('clear')} className={`flex-1 py-2 text-xs rounded-md transition-all ${windowTint === 'clear' ? 'bg-white/20 text-white' : 'text-gray-500 hover:text-white'}`}>Clear</button>
                    <button onClick={() => setWindowTint('dark')} className={`flex-1 py-2 text-xs rounded-md transition-all ${windowTint === 'dark' ? 'bg-white/20 text-white' : 'text-gray-500 hover:text-white'}`}>Dark Tint</button>
                  </div>
                </div>

                {/* Headlights */}
                <div>
                  <h3 className="uppercase tracking-widest text-[10px] text-gray-400 mb-4 flex justify-between">
                    <span>LED Signature Lights</span>
                    <span className={headlightsOn ? "text-green-400" : "text-gray-500"}>{headlightsOn ? 'Active' : 'Off'}</span>
                  </h3>
                  <button 
                    onClick={() => setHeadlightsOn(!headlightsOn)}
                    className={`w-full py-3 text-xs uppercase tracking-widest rounded-lg border transition-all duration-500 ${headlightsOn ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.4)]' : 'bg-transparent text-gray-400 border-white/20 hover:border-white/50'}`}
                  >
                    {headlightsOn ? 'Disable Optics' : 'Ignite Optics'}
                  </button>
                </div>
              </div>
            )}

            {/* TAB CONTENT: SCENE ENVIRONMENT */}
            {activeTab === 'scene' && (
              <div className="p-8 space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                <div>
                  <h3 className="uppercase tracking-widest text-[10px] text-gray-400 mb-4">Lighting Studio</h3>
                  <div className="space-y-3">
                    <button onClick={() => setEnvironmentMap('studio')} className={`w-full p-4 flex flex-col items-start border rounded-xl transition-all ${environmentMap === 'studio' ? 'border-white bg-white/10' : 'border-white/10 hover:border-white/30'}`}>
                      <span className="text-sm text-white mb-1">Clean Studio</span>
                      <span className="text-[10px] text-gray-500 uppercase tracking-widest">Bright neutral reflections</span>
                    </button>
                    <button onClick={() => setEnvironmentMap('city')} className={`w-full p-4 flex flex-col items-start border rounded-xl transition-all ${environmentMap === 'city' ? 'border-white bg-white/10' : 'border-white/10 hover:border-white/30'}`}>
                      <span className="text-sm text-white mb-1">Sunset Boulevard</span>
                      <span className="text-[10px] text-gray-500 uppercase tracking-widest">Warm dramatic lighting</span>
                    </button>
                    <button onClick={() => setEnvironmentMap('night')} className={`w-full p-4 flex flex-col items-start border rounded-xl transition-all ${environmentMap === 'night' ? 'border-white bg-white/10' : 'border-white/10 hover:border-white/30'}`}>
                      <span className="text-sm text-white mb-1">Midnight Run</span>
                      <span className="text-[10px] text-gray-500 uppercase tracking-widest">High contrast dark scene</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ACTION FOOTER */}
            <div className="p-6 border-t border-white/10 bg-black/40 mt-auto">
              <button 
                onClick={handleSaveConfiguration}
                className="w-full py-4 bg-white text-black uppercase tracking-[0.2em] text-[10px] font-bold hover:bg-gray-200 transition-colors rounded-sm"
              >
                Sync to Database
              </button>
              {saveStatus && (
                <p className={`mt-4 text-center text-[10px] tracking-widest uppercase animate-pulse ${saveStatus.includes('Error') ? 'text-red-400' : 'text-green-400'}`}>
                  {saveStatus}
                </p>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Configurator;