import React, { useState } from 'react';
import { ChessBoard } from './ChessBoard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Play, ArrowRight, BarChart3 } from 'lucide-react';

interface Opening {
  id: string;
  name: string;
  category: 'e4' | 'd4' | 'nf3' | 'other';
  moves: string[];
  description: string;
  popularity: number;
  winRate: number;
}

const OPENINGS: Opening[] = [
  {
    id: '1',
    name: 'Ruy Lopez',
    category: 'e4',
    moves: ['e4', 'e5', 'Nf3', 'Nc6', 'Bb5'],
    description: 'One of the oldest and most classical openings, focusing on central control and piece development.',
    popularity: 85,
    winRate: 52
  },
  {
    id: '2',
    name: 'Queen\'s Gambit',
    category: 'd4',
    moves: ['d4', 'd5', 'c4'],
    description: 'A solid positional opening that offers a pawn to gain central control and rapid development.',
    popularity: 78,
    winRate: 54
  },
  {
    id: '3',
    name: 'Sicilian Defense',
    category: 'e4',
    moves: ['e4', 'c5'],
    description: 'The most popular response to e4, leading to sharp, tactical games with winning chances for both sides.',
    popularity: 92,
    winRate: 48
  },
  {
    id: '4',
    name: 'English Opening',
    category: 'nf3',
    moves: ['c4'],
    description: 'A flexible opening that can transpose into many different pawn structures.',
    popularity: 65,
    winRate: 51
  }
];

export const OpeningsTrainer: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedOpening, setSelectedOpening] = useState<Opening | null>(null);
  const [currentMoveIndex, setCurrentMoveIndex] = useState(0);

  const categories = [
    { id: 'all', label: 'All Openings' },
    { id: 'e4', label: '1.e4 Openings' },
    { id: 'd4', label: '1.d4 Openings' },
    { id: 'nf3', label: 'Flank Openings' },
  ];

  const filteredOpenings = selectedCategory === 'all' 
    ? OPENINGS 
    : OPENINGS.filter(opening => opening.category === selectedCategory);

  const startPractice = (opening: Opening) => {
    setSelectedOpening(opening);
    setCurrentMoveIndex(0);
  };

  const nextMove = () => {
    if (selectedOpening && currentMoveIndex < selectedOpening.moves.length - 1) {
      setCurrentMoveIndex(prev => prev + 1);
    }
  };

  const resetOpening = () => {
    setCurrentMoveIndex(0);
  };

  const getPopularityColor = (popularity: number) => {
    if (popularity >= 80) return 'bg-green-100 text-green-800';
    if (popularity >= 60) return 'bg-yellow-100 text-yellow-800';
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Opening Repertoire
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {categories.map(category => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  className="w-full justify-start"
                >
                  {category.label}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-3">
          {filteredOpenings.map(opening => (
            <Card key={opening.id} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-sm">{opening.name}</h3>
                  <Badge className={getPopularityColor(opening.popularity)}>
                    {opening.popularity}%
                  </Badge>
                </div>
                
                <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                  {opening.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <BarChart3 size={12} />
                    Win rate: {opening.winRate}%
                  </div>
                  <Button
                    size="sm"
                    onClick={() => startPractice(opening)}
                    className="flex items-center gap-1"
                  >
                    <Play size={12} />
                    Practice
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="lg:col-span-2 space-y-4">
        {selectedOpening ? (
          <>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{selectedOpening.name}</span>
                  <Badge variant="outline">
                    Move {currentMoveIndex + 1} of {selectedOpening.moves.length}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{selectedOpening.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedOpening.moves.map((move, index) => (
                    <Badge
                      key={index}
                      variant={index <= currentMoveIndex ? "default" : "outline"}
                      className="font-mono"
                    >
                      {index + 1}. {move}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={nextMove}
                    disabled={currentMoveIndex >= selectedOpening.moves.length - 1}
                    className="flex items-center gap-2"
                  >
                    <ArrowRight size={16} />
                    Next Move
                  </Button>
                  <Button variant="outline" onClick={resetOpening}>
                    Reset
                  </Button>
                  <Button variant="outline" onClick={() => setSelectedOpening(null)}>
                    Back to List
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-center">
              <ChessBoard />
            </div>
          </>
        ) : (
          <Card>
            <CardContent className="flex items-center justify-center h-96">
              <div className="text-center">
                <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Select an Opening</h3>
                <p className="text-muted-foreground">
                  Choose an opening from the list to start practicing
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};