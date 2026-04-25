import React, { useState, useCallback } from 'react';
import { AppTab, Language } from '../types';
import BranchedNavButton from './BranchedNavButton';
import { 
  Compass, Map, Gamepad2, 
  BookOpen, Landmark, History,
  Coffee, Utensils, Bed 
} from 'lucide-react';

interface TopFloatingNavProps {
  activeTab: AppTab;
  onSelectTab: (tab: AppTab) => void;
  lang: Language;
  /** When true, renders as a bottom bar with 90% width, 50% idle opacity, sub-buttons go UP */
  isAndroidLight?: boolean;
  /** Fired when any sub-menu expands/collapses — used for blur overlay */
  onExpandChange?: (expanded: boolean) => void;
}

const TopFloatingNav: React.FC<TopFloatingNavProps> = ({
  activeTab,
  onSelectTab,
  lang,
  isAndroidLight = false,
  onExpandChange
}) => {
  const isExplorerActive = activeTab === AppTab.MAP || activeTab === AppTab.QUEST;
  const isGuideActive = activeTab === AppTab.CITY_GUIDE || activeTab === AppTab.HISTORY;
  const isEssentialsActive = activeTab === AppTab.FOOD || activeTab === AppTab.ACCOMMODATION;

  const [anyExpanded, setAnyExpanded] = useState(false);

  const handleExpandChange = useCallback((expanded: boolean) => {
    setAnyExpanded(expanded);
    onExpandChange?.(expanded);
  }, [onExpandChange]);

  const t = {
    en: { explorer: 'Explorer', guide: 'Guide', essentials: 'Food and Drinks', map: 'Map', quest: 'Quest', city: 'City', history: 'History', food: 'Food', stay: 'Stay' },
    bs: { explorer: 'Istraži', guide: 'Vodič', essentials: 'Hrana i Piće', map: 'Mapa', quest: 'Potraga', city: 'Grad', history: 'Historija', food: 'Hrana', stay: 'Smještaj' },
    de: { explorer: 'Entdecker', guide: 'Führer', essentials: 'Essen & Trinken', map: 'Karte', quest: 'Quest', city: 'Stadt', history: 'Geschichte', food: 'Essen', stay: 'Stay' },
    tr: { explorer: 'Kaşif', guide: 'Rehber', essentials: 'Yiyecek ve İçecek', map: 'Harita', quest: 'Görev', city: 'Şehir', history: 'Tarih', food: 'Yemek', stay: 'Konak' },
  }[lang] || { explorer: 'Explorer', guide: 'Guide', essentials: 'Food and Drinks', map: 'Map', quest: 'Quest', city: 'City', history: 'History', food: 'Food', stay: 'Stay' };

  /* ── Android bottom-bar mode ── */
  if (isAndroidLight) {
    return (
      <div
        className="fixed bottom-0 left-1/2 -translate-x-1/2 z-[60] flex items-center justify-around gap-3 px-3 py-2 rounded-t-2xl border-x border-t border-white/10 shadow-[0_-4px_20px_rgba(0,0,0,0.25)] transition-opacity duration-300"
        style={{
          width: '90%',
          opacity: anyExpanded ? 1 : 0.5,
          background: 'rgba(0,0,0,0.30)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          willChange: anyExpanded ? 'opacity' : 'auto',
        }}
      >
        <BranchedNavButton
          mainIcon={Compass}
          branch1Icon={Map}
          branch2Icon={Gamepad2}
          branch1Label={t.map}
          branch2Label={t.quest}
          onSelectBranch1={() => onSelectTab(AppTab.MAP)}
          onSelectBranch2={() => onSelectTab(AppTab.QUEST)}
          isActive={isExplorerActive}
          label={t.explorer}
          direction="row"
          expandUp
          onExpandChange={handleExpandChange}
        />
        <div className="w-px h-6 bg-white/20 mx-1" />
        <BranchedNavButton
          mainIcon={BookOpen}
          branch1Icon={Landmark}
          branch2Icon={History}
          branch1Label={t.city}
          branch2Label={t.history}
          onSelectBranch1={() => onSelectTab(AppTab.CITY_GUIDE)}
          onSelectBranch2={() => onSelectTab(AppTab.HISTORY)}
          isActive={isGuideActive}
          label={t.guide}
          direction="row"
          expandUp
          onExpandChange={handleExpandChange}
        />
        <div className="w-px h-6 bg-white/20 mx-1" />
        <BranchedNavButton
          mainIcon={Coffee}
          branch1Icon={Utensils}
          branch2Icon={Bed}
          branch1Label={t.food}
          branch2Label={t.stay}
          onSelectBranch1={() => onSelectTab(AppTab.FOOD)}
          onSelectBranch2={() => onSelectTab(AppTab.ACCOMMODATION)}
          isActive={isEssentialsActive}
          label={t.essentials}
          direction="row"
          expandUp
          onExpandChange={handleExpandChange}
        />
      </div>
    );
  }

  /* ── Desktop / web top-bar mode (unchanged) ── */
  return (
    <div className="fixed top-0 left-1/2 -translate-x-1/2 z-[60] flex items-center gap-3 px-3 py-1 rounded-b-2xl bg-white border-x border-b border-blue-100 shadow-[0_4px_20px_rgba(0,0,0,0.1)]">
      <BranchedNavButton
        mainIcon={Compass}
        branch1Icon={Map}
        branch2Icon={Gamepad2}
        branch1Label={t.map}
        branch2Label={t.quest}
        onSelectBranch1={() => onSelectTab(AppTab.MAP)}
        onSelectBranch2={() => onSelectTab(AppTab.QUEST)}
        isActive={isExplorerActive}
        label={t.explorer}
        direction="column"
      />
      <div className="w-px h-6 bg-slate-200 mx-1" />
      <BranchedNavButton
        mainIcon={BookOpen}
        branch1Icon={Landmark}
        branch2Icon={History}
        branch1Label={t.city}
        branch2Label={t.history}
        onSelectBranch1={() => onSelectTab(AppTab.CITY_GUIDE)}
        onSelectBranch2={() => onSelectTab(AppTab.HISTORY)}
        isActive={isGuideActive}
        label={t.guide}
        direction="row"
      />
      <div className="w-px h-6 bg-slate-200 mx-1" />
      <BranchedNavButton
        mainIcon={Coffee}
        branch1Icon={Utensils}
        branch2Icon={Bed}
        branch1Label={t.food}
        branch2Label={t.stay}
        onSelectBranch1={() => onSelectTab(AppTab.FOOD)}
        onSelectBranch2={() => onSelectTab(AppTab.ACCOMMODATION)}
        isActive={isEssentialsActive}
        label={t.essentials}
        direction="column"
      />
    </div>
  );
};

export default TopFloatingNav;
