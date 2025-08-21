import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Crown, Target, BookOpen, TrendingUp } from 'lucide-react';

interface ChessHeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const ChessHeader: React.FC<ChessHeaderProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'play', label: 'Play', icon: Crown },
    { id: 'tactics', label: 'Tactics', icon: Target },
    { id: 'openings', label: 'Openings', icon: BookOpen },
    { id: 'progress', label: 'Progress', icon: TrendingUp }
  ];

  return (
    <Card className="p-6 mb-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Chess Guru AI
          </h1>
          <p className="text-muted-foreground">Master chess through intelligent training</p>
        </div>
        
        <nav className="flex gap-2">
          {tabs.map(({ id, label, icon: Icon }) => (
            <Button
              key={id}
              variant={activeTab === id ? "default" : "ghost"}
              onClick={() => onTabChange(id)}
              className="flex items-center gap-2"
            >
              <Icon size={16} />
              {label}
            </Button>
          ))}
        </nav>
      </div>
    </Card>
  );
};