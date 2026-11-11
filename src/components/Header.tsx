import React, { useState } from 'react';
import {
  ShieldCheck,
  Stethoscope,
  UserCheck,
  Languages,
  Menu,
  X,
  UploadCloud,
  ChevronDown,
  LayoutDashboard,
  FileText,
  Sparkles,
  GitCompare,
  Compass
} from 'lucide-react';
import { User } from '../types.ts';

interface HeaderProps {
  currentUser: User | null;
  activeTab: 'hero' | 'dashboard' | 'vault' | 'chat' | 'compare' | 'safety';
  setActiveTab: (tab: 'hero' | 'dashboard' | 'vault' | 'chat' | 'compare' | 'safety') => void;
  currentMode: 'patient' | 'doctor';
  onToggleMode: (mode: 'patient' | 'doctor') => void;
  currentLanguage: 'en' | 'hinglish';
  onToggleLanguage: (lang: 'en' | 'hinglish') => void;
  onOpenUpload: () => void;
  onOpenDoctorVerification: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentUser,
  activeTab,
  setActiveTab,
  currentMode,
  onToggleMode,
  currentLanguage,
  onToggleLanguage,
  onOpenUpload,
  onOpenDoctorVerification,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleModeChange = (mode: 'patient' | 'doctor') => {
    if (mode === 'doctor') {
      if (currentUser?.role !== 'doctor' && !currentUser?.doctorCredentials?.verified) {
        onOpenDoctorVerification();
        return;
      }
    }
    onToggleMode(mode);
  };

  return (
    <header className="sticky top-0 z-40 bg-paper border-b border-rule">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        {/* Brand Left */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('hero')}
            className="flex items-center gap-2.5 text-left focus:outline-none group"
          >
            <div className="w-6 h-6 rounded-md bg-zinc-900 text-white flex items-center justify-center text-xs font-bold">
              D
            </div>
            <span className="text-sm font-bold tracking-tight text-ink group-hover:text-accent-deep transition-colors">
              DocuMed
            </span>
          </button>
        </div>

        {/* Desktop Public Navigation (Minimal Top Navigation) */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-muted">
          <button
            onClick={() => setActiveTab('hero')}
            className={`transition-colors py-1 ${
              activeTab === 'hero' ? 'text-ink font-semibold' : 'hover:text-ink'
            }`}
          >
            How It Works
          </button>
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`transition-colors py-1 ${
              activeTab === 'dashboard' ? 'text-ink font-semibold' : 'hover:text-ink'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('vault')}
            className={`transition-colors py-1 ${
              activeTab === 'vault' ? 'text-ink font-semibold' : 'hover:text-ink'
            }`}
          >
            Reports Vault
          </button>
          <button
            onClick={() => setActiveTab('chat')}
            className={`transition-colors py-1 ${
              activeTab === 'chat' ? 'text-ink font-semibold' : 'hover:text-ink'
            }`}
          >
            AI Assistant
          </button>
          <button
            onClick={() => setActiveTab('compare')}
            className={`transition-colors py-1 ${
              activeTab === 'compare' ? 'text-ink font-semibold' : 'hover:text-ink'
            }`}
          >
            Compare
          </button>
        </nav>

        {/* Right Action & Mode Controls */}
        <div className="flex items-center gap-2.5">
          {/* Mode Switcher Segmented Control */}
          <div className="hidden sm:inline-flex p-0.5 bg-paper-2 rounded-lg text-xs font-medium border border-rule">
            <button
              onClick={() => handleModeChange('patient')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-colors ${
                currentMode === 'patient'
                  ? 'bg-paper text-ink shadow-sm font-semibold'
                  : 'text-muted hover:text-ink'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5 text-accent" />
              <span>Patient</span>
            </button>
            <button
              onClick={() => handleModeChange('doctor')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-colors ${
                currentMode === 'doctor'
                  ? 'bg-zinc-900 text-white shadow-sm font-semibold'
                  : 'text-muted hover:text-ink'
              }`}
            >
              <Stethoscope className="w-3.5 h-3.5 text-accent-soft" />
              <span>Doctor</span>
            </button>
          </div>

          {/* Language Toggle */}
          <button
            onClick={() => onToggleLanguage(currentLanguage === 'en' ? 'hinglish' : 'en')}
            className="hidden sm:flex items-center gap-1 px-2 py-1 text-xs font-medium text-ink-2 bg-paper border border-rule rounded-lg hover:bg-paper-2 transition-colors"
            title="Toggle between English and Hinglish"
          >
            <Languages className="w-3.5 h-3.5 text-muted" />
            <span className="font-semibold text-[11px]">
              {currentLanguage === 'en' ? 'EN' : 'Hinglish'}
            </span>
          </button>

          {/* Primary Action Button */}
          <button
            onClick={onOpenUpload}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-accent hover:bg-accent-deep rounded-lg transition-colors shadow-sm"
          >
            <UploadCloud className="w-3.5 h-3.5" />
            <span>Upload</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-muted hover:text-ink rounded-md md:hidden focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-rule bg-paper px-4 py-3 space-y-2 text-xs">
          <div className="flex items-center justify-between py-2 border-b border-rule">
            <span className="text-muted font-medium">Mode:</span>
            <div className="inline-flex p-0.5 bg-paper-2 rounded-md">
              <button
                onClick={() => handleModeChange('patient')}
                className={`px-2 py-1 rounded ${
                  currentMode === 'patient' ? 'bg-paper font-bold text-ink' : 'text-muted'
                }`}
              >
                Patient
              </button>
              <button
                onClick={() => handleModeChange('doctor')}
                className={`px-2 py-1 rounded ${
                  currentMode === 'doctor' ? 'bg-zinc-900 text-white font-bold' : 'text-muted'
                }`}
              >
                Doctor
              </button>
            </div>
          </div>

          <div className="space-y-1 pt-1">
            <button
              onClick={() => {
                setActiveTab('hero');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left py-2 px-2 rounded hover:bg-paper-2 flex items-center gap-2"
            >
              <Compass className="w-4 h-4 text-muted" />
              <span>How It Works</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('dashboard');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left py-2 px-2 rounded hover:bg-paper-2 flex items-center gap-2"
            >
              <LayoutDashboard className="w-4 h-4 text-muted" />
              <span>Dashboard Overview</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('vault');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left py-2 px-2 rounded hover:bg-paper-2 flex items-center gap-2"
            >
              <FileText className="w-4 h-4 text-muted" />
              <span>My Reports Vault</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('chat');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left py-2 px-2 rounded hover:bg-paper-2 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-teal-600" />
              <span>AI Assistant</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('compare');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left py-2 px-2 rounded hover:bg-paper-2 flex items-center gap-2"
            >
              <GitCompare className="w-4 h-4 text-muted" />
              <span>Compare Reports</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('safety');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left py-2 px-2 rounded hover:bg-paper-2 flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-muted" />
              <span>Privacy & DPDP Safety</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
