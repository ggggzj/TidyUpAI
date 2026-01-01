
import React, { useState, useRef } from 'react';
import { AppState, AnalysisResponse } from './types';
import { analyzeMessyRoom } from './services/aiService';
import ClutterCard from './components/ClutterCard';

const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<AppState>(AppState.HOME);
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResponse | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = (reader.result as string).split(',')[1];
        setImage(reader.result as string);
        await startAnalysis(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const startAnalysis = async (base64: string) => {
    setIsAnalyzing(true);
    setCurrentTab(AppState.ANALYZING);
    try {
      const data = await analyzeMessyRoom(base64);
      setResult(data);
      setCurrentTab(AppState.RESULT);
    } catch (error) {
      console.error("Analysis failed", error);
      alert("Something went wrong with the AI analysis. Please try again.");
      setCurrentTab(AppState.HOME);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const reset = () => {
    setImage(null);
    setResult(null);
    setCurrentTab(AppState.HOME);
  };

  return (
    <div className="min-h-screen pb-24 max-w-md mx-auto relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-indigo-50 to-transparent -z-10" />
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-100 rounded-full blur-3xl opacity-50 -z-10" />

      {/* Header */}
      <header className="px-6 pt-12 pb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">TidyAI</h1>
          <p className="text-slate-500 text-sm">Your Personal Organizing Coach</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center border border-slate-100">
          <span className="text-indigo-600 font-bold">AI</span>
        </div>
      </header>

      <main className="px-6">
        {currentTab === AppState.HOME && (
          <div className="space-y-8 animate-in fade-in duration-700">
            <div className="bg-indigo-600 rounded-3xl p-8 text-white shadow-xl shadow-indigo-200">
              <h2 className="text-2xl font-bold mb-2">Feeling Overwhelmed?</h2>
              <p className="opacity-90 mb-6 text-sm leading-relaxed">
                Take a photo of your messy room. Our AI will spot the clutter and give you a simple step-by-step plan to get it organized.
              </p>
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="w-full bg-white text-indigo-600 font-bold py-4 rounded-2xl shadow-lg active:scale-95 transition-all flex items-center justify-center space-x-2"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                <span>Start Scanning</span>
              </button>
              <input 
                type="file" 
                accept="image/*" 
                capture="environment" 
                className="hidden" 
                ref={fileInputRef}
                onChange={handleFileChange}
              />
            </div>

            <section>
              <h3 className="text-lg font-bold text-slate-800 mb-4">Why TidyAI?</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                  <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center mb-3 font-bold text-amber-600">Scan</div>
                  <h4 className="font-bold text-sm">Cluster Detection</h4>
                  <p className="text-xs text-slate-500">Spots hidden piles you have grown blind to.</p>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                  <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center mb-3 font-bold text-emerald-600">Buy</div>
                  <h4 className="font-bold text-sm">Product Match</h4>
                  <p className="text-xs text-slate-500">Knows exactly which bins you need.</p>
                </div>
              </div>
            </section>
          </div>
        )}

        {currentTab === AppState.ANALYZING && (
          <div className="flex flex-col items-center justify-center py-20 space-y-8 animate-in zoom-in-95 duration-300">
            <div className="relative">
              <div className="w-48 h-48 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                {image && <img src={image} className="w-full h-full object-cover grayscale opacity-50" alt="Analysis" />}
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
              <div className="absolute top-0 left-0 w-full h-1 bg-indigo-600 animate-[bounce_2s_infinite] opacity-50"></div>
            </div>
            <div className="text-center">
              <h2 className="text-xl font-bold text-slate-800">Analyzing Your Space</h2>
              <p className="text-slate-500 text-sm mt-2">Identifying objects and finding logic in the mess.</p>
            </div>
            <div className="bg-indigo-50 px-6 py-3 rounded-full text-indigo-600 font-medium text-xs animate-pulse">
              AI Vision is decoding patterns
            </div>
          </div>
        )}

        {currentTab === AppState.RESULT && result && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="flex items-center justify-between">
              <button onClick={reset} className="text-slate-400 hover:text-slate-600 flex items-center text-sm font-medium">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
                Back
              </button>
              <div className="flex space-x-2">
                <span className="bg-slate-100 px-3 py-1 rounded-full text-[10px] font-bold text-slate-600 uppercase">
                  Time: {result.estimatedTime}
                </span>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
              <h2 className="text-xl font-bold text-slate-900 mb-2">{result.vibeCheck}</h2>
              <p className="text-slate-600 text-sm leading-relaxed">{result.summary}</p>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest px-2">Action Items ({result.tasks.length})</h3>
              {result.tasks.map((task, idx) => (
                <ClutterCard key={idx} task={task} index={idx} />
              ))}
            </div>

            <div className="pt-6 pb-12">
              <button 
                onClick={reset}
                className="w-full bg-slate-900 text-white font-bold py-4 rounded-2xl shadow-xl active:scale-95 transition-all"
              >
                Clear Room and Start Fresh
              </button>
            </div>
          </div>
        )}

        {currentTab === AppState.TIPS && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <h2 className="text-2xl font-bold">Maintenance Hacks</h2>
            <div className="space-y-4">
              {[
                { title: 'The 2-Minute Rule', desc: 'If a mess takes less than 2 minutes to fix, do it immediately.', icon: 'TIME' },
                { title: 'One In, One Out', desc: 'For every new item you buy, donate or discard an old one.', icon: 'LOOP' },
                { title: 'Label Everything', desc: 'Visual markers prevent items from drifting.', icon: 'TAG' }
              ].map((tip, i) => (
                <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                  <div className="text-xs font-bold text-indigo-600 mb-2 uppercase tracking-widest">{tip.icon}</div>
                  <h3 className="font-bold text-lg">{tip.title}</h3>
                  <p className="text-slate-500 text-sm">{tip.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 p-4 max-w-md mx-auto z-50">
        <div className="glass rounded-3xl shadow-2xl border border-white/50 flex justify-around items-center p-2">
          <button 
            onClick={() => setCurrentTab(AppState.HOME)}
            className={`flex flex-col items-center p-3 rounded-2xl transition-all ${currentTab === AppState.HOME ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400'}`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
            <span className="text-[10px] font-bold mt-1">Home</span>
          </button>
          
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="w-14 h-14 bg-indigo-600 rounded-full shadow-lg shadow-indigo-300 flex items-center justify-center text-white -mt-12 border-4 border-slate-50 active:scale-90 transition-all"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/></svg>
          </button>

          <button 
            onClick={() => setCurrentTab(AppState.TIPS)}
            className={`flex flex-col items-center p-3 rounded-2xl transition-all ${currentTab === AppState.TIPS ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400'}`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            <span className="text-[10px] font-bold mt-1">Hacks</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default App;
