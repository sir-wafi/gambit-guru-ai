import React, { useState } from 'react';
import { ChessHeader } from '@/components/chess/ChessHeader';
import { PlayArea } from '@/components/chess/PlayArea';
import { TacticsTrainer } from '@/components/chess/TacticsTrainer';
import { OpeningsTrainer } from '@/components/chess/OpeningsTrainer';
import { ProgressDashboard } from '@/components/chess/ProgressDashboard';

const Index = () => {
  const [activeTab, setActiveTab] = useState('play');

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'play':
        return <PlayArea />;
      case 'tactics':
        return <TacticsTrainer />;
      case 'openings':
        return <OpeningsTrainer />;
      case 'progress':
        return <ProgressDashboard />;
      default:
        return <PlayArea />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <ChessHeader activeTab={activeTab} onTabChange={setActiveTab} />
        {renderActiveTab()}
      </div>
    </div>
  );
};

export default Index;
