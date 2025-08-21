import React, { useState } from 'react';
import { ChessBoard, Position } from './ChessBoard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Play, RotateCcw, Flag, Clock, Crown, Cpu } from 'lucide-react';

export const PlayArea: React.FC = () => {
  const [gameMode, setGameMode] = useState<'human' | 'ai'>('ai');
  const [gameStatus, setGameStatus] = useState<'setup' | 'playing' | 'finished'>('setup');
  const [moves, setMoves] = useState<string[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState<'white' | 'black'>('white');

  const handleMove = (from: Position, to: Position) => {
    // In a real implementation, this would validate and record the move
    const moveNotation = `${String.fromCharCode(97 + from.col)}${8 - from.row}-${String.fromCharCode(97 + to.col)}${8 - to.row}`;
    setMoves(prev => [...prev, moveNotation]);
    setCurrentPlayer(prev => prev === 'white' ? 'black' : 'white');
  };

  const startGame = () => {
    setGameStatus('playing');
    setMoves([]);
    setCurrentPlayer('white');
  };

  const resetGame = () => {
    setGameStatus('setup');
    setMoves([]);
    setCurrentPlayer('white');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        {/* Game Controls */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Crown className="h-5 w-5" />
                Chess Game
              </div>
              {gameStatus === 'playing' && (
                <Badge variant="outline" className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {currentPlayer === 'white' ? 'White' : 'Black'} to move
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex gap-2">
                <Button
                  variant={gameMode === 'ai' ? 'default' : 'outline'}
                  onClick={() => setGameMode('ai')}
                  className="flex items-center gap-2"
                >
                  <Cpu className="h-4 w-4" />
                  vs AI
                </Button>
                <Button
                  variant={gameMode === 'human' ? 'default' : 'outline'}
                  onClick={() => setGameMode('human')}
                  className="flex items-center gap-2"
                >
                  <Crown className="h-4 w-4" />
                  vs Human
                </Button>
              </div>
              
              <Separator orientation="vertical" className="h-8" />
              
              <div className="flex gap-2">
                {gameStatus === 'setup' ? (
                  <Button onClick={startGame} className="flex items-center gap-2">
                    <Play className="h-4 w-4" />
                    Start Game
                  </Button>
                ) : (
                  <>
                    <Button variant="outline" onClick={resetGame} className="flex items-center gap-2">
                      <RotateCcw className="h-4 w-4" />
                      New Game
                    </Button>
                    <Button variant="destructive" className="flex items-center gap-2">
                      <Flag className="h-4 w-4" />
                      Resign
                    </Button>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Chess Board */}
        <div className="flex justify-center">
          <ChessBoard 
            onMove={handleMove}
            className="shadow-2xl"
          />
        </div>

        {/* Game Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Game Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center text-muted-foreground">
              <p>AI analysis will appear here during and after the game</p>
              <p className="text-sm mt-2">Real-time evaluation, best moves, and tactical opportunities</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        {/* Move History */}
        <Card>
          <CardHeader>
            <CardTitle>Move History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="max-h-64 overflow-y-auto">
              {moves.length === 0 ? (
                <p className="text-muted-foreground text-sm">No moves yet</p>
              ) : (
                <div className="space-y-1">
                  {moves.map((move, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <span className="font-mono">{Math.floor(index / 2) + 1}.</span>
                      <span className="font-mono flex-1 text-center">{move}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Player Info */}
        <Card>
          <CardHeader>
            <CardTitle>Players</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-white border-2 border-gray-400"></div>
                  <span className="font-medium">You</span>
                </div>
                <Badge variant="outline">1850</Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-gray-800"></div>
                  <span className="font-medium">
                    {gameMode === 'ai' ? 'Chess AI' : 'Opponent'}
                  </span>
                </div>
                <Badge variant="outline">
                  {gameMode === 'ai' ? '2000' : '1920'}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Learning</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full justify-start">
              📊 Analyze Position
            </Button>
            <Button variant="outline" className="w-full justify-start">
              💡 Get Hint
            </Button>
            <Button variant="outline" className="w-full justify-start">
              📚 Similar Positions
            </Button>
            <Button variant="outline" className="w-full justify-start">
              🎯 Find Tactics
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};