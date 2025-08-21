import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Award, Target, Clock, Zap, Trophy } from 'lucide-react';

export const ProgressDashboard: React.FC = () => {
  const stats = [
    { label: 'Chess Rating', value: '1,850', change: '+42', icon: Award, color: 'text-yellow-600' },
    { label: 'Tactics Rating', value: '2,100', change: '+28', icon: Target, color: 'text-green-600' },
    { label: 'Games Played', value: '2,347', change: '+15', icon: Trophy, color: 'text-blue-600' },
    { label: 'Study Time', value: '127h', change: '+8h', icon: Clock, color: 'text-purple-600' }
  ];

  const recentAchievements = [
    { title: 'Tactics Master', description: 'Solved 100 tactics puzzles', date: '2 days ago', icon: Target },
    { title: 'Opening Expert', description: 'Mastered 10 opening variations', date: '1 week ago', icon: Zap },
    { title: 'Rating Milestone', description: 'Reached 1800 rating', date: '2 weeks ago', icon: TrendingUp }
  ];

  const skillProgress = [
    { skill: 'Tactical Awareness', progress: 85, level: 'Advanced' },
    { skill: 'Opening Knowledge', progress: 72, level: 'Intermediate' },
    { skill: 'Endgame Technique', progress: 64, level: 'Intermediate' },
    { skill: 'Positional Understanding', progress: 58, level: 'Beginner' }
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                    <div className="flex items-center gap-2">
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <Badge variant="outline" className="text-green-600 border-green-200">
                        {stat.change}
                      </Badge>
                    </div>
                  </div>
                  <Icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Skill Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Skill Development
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {skillProgress.map((skill, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{skill.skill}</span>
                  <Badge variant="outline">{skill.level}</Badge>
                </div>
                <Progress value={skill.progress} className="h-2" />
                <p className="text-xs text-muted-foreground">{skill.progress}% Complete</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Recent Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAchievements.map((achievement, index) => {
                const Icon = achievement.icon;
                return (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                    <div className="p-2 rounded-full bg-primary/10">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm">{achievement.title}</p>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">{achievement.date}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Rating Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Rating chart visualization would go here</p>
              <p className="text-sm">Integration with chess.com API coming soon</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};