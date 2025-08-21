import React, { useState, useEffect } from 'react';
import { ChessBoard, Position } from './ChessBoard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, RotateCcw, Lightbulb, Target } from 'lucide-react';

interface TacticsPuzzle {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  solution: Position[];
  hint: string;
}

const SAMPLE_PUZZLES: TacticsPuzzle[] = [
  {
    id: '1',
    title: 'Mate in 2',
    description: 'White to play and mate in 2 moves',
    difficulty: 'beginner',
    solution: [],
    hint: 'Look for a back rank mate opportunity'
  },
  {
    id: '2',
    title: 'Knight Fork',
    description: 'Win material with a knight fork',
    difficulty: 'intermediate',
    solution: [],
    hint: 'The knight can attack two pieces at once'
  },
  {
    id: '3',
    title: 'Pin and Win',
    description: 'Use a pin to win material',
    difficulty: 'advanced',
    solution: [],
    hint: 'Pin the piece to the king'
  }
];

export const TacticsTrainer: React.FC = () => {
  const [currentPuzzle, setCurrentPuzzle] = useState<TacticsPuzzle>(SAMPLE_PUZZLES[0]);
  const [showHint, setShowHint] = useState(false);
  const [solved, setSolved] = useState<boolean | null>(null);
  const [attempts, setAttempts] = useState(0);

  const handleMove = (from: Position, to: Position) => {
    setAttempts(prev => prev + 1);
    // In a real implementation, check if move matches solution
    // For demo, randomly succeed after a few attempts
    if (attempts >= 2) {
      setSolved(true);
    }
  };

  const nextPuzzle = () => {
    const currentIndex = SAMPLE_PUZZLES.findIndex(p => p.id === currentPuzzle.id);
    const nextIndex = (currentIndex + 1) % SAMPLE_PUZZLES.length;
    setCurrentPuzzle(SAMPLE_PUZZLES[nextIndex]);
    setSolved(null);
    setShowHint(false);
    setAttempts(0);
  };

  const resetPuzzle = () => {
    setSolved(null);
    setShowHint(false);
    setAttempts(0);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                {currentPuzzle.title}
              </CardTitle>
              <Badge className={getDifficultyColor(currentPuzzle.difficulty)}>
                {currentPuzzle.difficulty}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">{currentPuzzle.description}</p>
            
            {solved !== null && (
              <div className={`flex items-center gap-2 p-3 rounded-lg mb-4 ${
                solved ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
              }`}>
                {solved ? <CheckCircle size={16} /> : <XCircle size={16} />}
                {solved ? 'Excellent! Puzzle solved!' : 'Not quite right, try again!'}
              </div>
            )}

            {showHint && (
              <div className="bg-accent/10 p-3 rounded-lg mb-4">
                <div className="flex items-center gap-2 text-accent-foreground">
                  <Lightbulb size={16} />
                  <span className="font-medium">Hint:</span>
                </div>
                <p className="text-sm mt-1">{currentPuzzle.hint}</p>
              </div>
            )}

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setShowHint(!showHint)}
                className="flex items-center gap-2"
              >
                <Lightbulb size={16} />
                {showHint ? 'Hide' : 'Show'} Hint
              </Button>
              <Button
                variant="outline"
                onClick={resetPuzzle}
                className="flex items-center gap-2"
              >
                <RotateCcw size={16} />
                Reset
              </Button>
              {solved && (
                <Button onClick={nextPuzzle}>
                  Next Puzzle
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Your Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">1,247</div>
                <div className="text-sm text-muted-foreground">Puzzles Solved</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">1,850</div>
                <div className="text-sm text-muted-foreground">Current Rating</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center">
        <ChessBoard onMove={handleMove} />
      </div>
    </div>
  );
};