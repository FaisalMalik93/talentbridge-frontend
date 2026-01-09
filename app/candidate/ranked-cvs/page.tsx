"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Trophy,
  Medal,
  TrendingUp,
  FileText,
  Calendar,
  BarChart3,
  Award,
  Target,
  Star,
  User,
  Crown,
} from "lucide-react"
import Link from "next/link"
import { authService } from "@/lib/services/auth.service"

interface RankedCV {
  id: string
  filename: string
  overall_score: number
  ranking_result?: {
    user_cv_score: number
    comparison_summary: string
    strengths: string[]
    weaknesses: string[]
    recommendations: string[]
  }
  created_at: string
}

interface LeaderboardEntry {
  rank: number
  user_id: string
  user_name: string
  filename: string
  overall_score: number
  created_at: string
  is_current_user: boolean
}

export default function RankedCVsPage() {
  const [myRankedCVs, setMyRankedCVs] = useState<RankedCV[]>([])
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("my-rankings")

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setIsLoading(true)
      const token = authService.getToken()

      if (!token) {
        console.error("No authentication token found")
        return
      }

      // Fetch my CVs
      const myCVsResponse = await fetch("http://127.0.0.1:8000/api/cv/my-cvs", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })

      if (myCVsResponse.ok) {
        const allCVs = await myCVsResponse.json()
        // Filter only CVs with ranking results
        const rankedCVs = allCVs.filter((cv: any) => cv.ranking_result)
        setMyRankedCVs(rankedCVs)
      }

      // Fetch leaderboard
      const leaderboardResponse = await fetch("http://127.0.0.1:8000/api/cv/leaderboard", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })

      if (leaderboardResponse.ok) {
        const data = await leaderboardResponse.json()
        setLeaderboard(data.leaderboard || [])
      }
    } catch (error) {
      console.error("Error fetching CV rankings:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-400"
    if (score >= 60) return "text-yellow-400"
    if (score >= 40) return "text-orange-400"
    return "text-red-400"
  }

  const getScoreBadgeColor = (score: number) => {
    if (score >= 80) return "bg-green-600"
    if (score >= 60) return "bg-yellow-600"
    if (score >= 40) return "bg-orange-600"
    return "bg-red-600"
  }

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-6 h-6 text-yellow-400" />
    if (rank === 2) return <Medal className="w-6 h-6 text-gray-300" />
    if (rank === 3) return <Medal className="w-6 h-6 text-amber-600" />
    return <Award className="w-5 h-5 text-gray-400" />
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 text-white">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-400">Loading your CV rankings...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 text-white">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
          <BarChart3 className="w-8 h-8 text-blue-400" />
          CV Rankings
        </h1>
        <p className="text-gray-400">Track your CV performance and compare with others</p>
      </div>

      {/* Stats Overview */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6 text-center">
            <FileText className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{myRankedCVs.length}</div>
            <p className="text-gray-400 text-sm">Ranked CVs</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6 text-center">
            <Trophy className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">
              {myRankedCVs.length > 0 ? Math.max(...myRankedCVs.map(cv => cv.overall_score || 0)).toFixed(0) : 0}
            </div>
            <p className="text-gray-400 text-sm">Best Score</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6 text-center">
            <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">
              {myRankedCVs.length > 0 ? (myRankedCVs.reduce((sum, cv) => sum + (cv.overall_score || 0), 0) / myRankedCVs.length).toFixed(0) : 0}
            </div>
            <p className="text-gray-400 text-sm">Average Score</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6 text-center">
            <Target className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">
              #{leaderboard.findIndex(entry => entry.is_current_user) + 1 || "-"}
            </div>
            <p className="text-gray-400 text-sm">Your Rank</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-gray-800 border-gray-700">
          <TabsTrigger value="my-rankings" className="data-[state=active]:bg-blue-600">
            <FileText className="w-4 h-4 mr-2" />
            My Ranked CVs ({myRankedCVs.length})
          </TabsTrigger>
          <TabsTrigger value="leaderboard" className="data-[state=active]:bg-blue-600">
            <Trophy className="w-4 h-4 mr-2" />
            Leaderboard ({leaderboard.length})
          </TabsTrigger>
        </TabsList>

        {/* My Ranked CVs Tab */}
        <TabsContent value="my-rankings">
          {myRankedCVs.length === 0 ? (
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-12 text-center">
                <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Ranked CVs Yet</h3>
                <p className="text-gray-400 mb-6">
                  Upload and rank your CV to see how it compares with reference CVs
                </p>
                <Link href="/cv-analysis">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Rank Your CV
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {myRankedCVs.map((cv) => (
                <Card key={cv.id} className="bg-gray-800 border-gray-700 hover:border-blue-500 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start space-x-4 flex-1">
                        <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center">
                          <FileText className="w-6 h-6 text-blue-400" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-semibold text-white">{cv.filename}</h3>
                            <Badge className={getScoreBadgeColor(cv.overall_score || 0)}>
                              Score: {(cv.overall_score || 0).toFixed(0)}%
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                            <span className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {new Date(cv.created_at).toLocaleDateString()}
                            </span>
                          </div>

                          {cv.ranking_result && (
                            <div className="space-y-4 mt-4">
                              {/* Comparison Summary */}
                              <div className="bg-gray-700/50 rounded-lg p-4">
                                <h4 className="text-sm font-semibold text-blue-400 mb-2">Comparison Summary</h4>
                                <p className="text-sm text-gray-300">{cv.ranking_result.comparison_summary}</p>
                              </div>

                              <div className="grid md:grid-cols-2 gap-4">
                                {/* Strengths */}
                                {cv.ranking_result.strengths && cv.ranking_result.strengths.length > 0 && (
                                  <div className="bg-green-600/10 border border-green-600/30 rounded-lg p-4">
                                    <h4 className="text-sm font-semibold text-green-400 mb-2 flex items-center gap-2">
                                      <Star className="w-4 h-4" />
                                      Strengths
                                    </h4>
                                    <ul className="text-sm text-gray-300 space-y-1">
                                      {cv.ranking_result.strengths.map((strength: any, idx) => (
                                        <li key={idx} className="flex items-start gap-2">
                                          <span className="text-green-400 mt-1">•</span>
                                          <span>{typeof strength === 'string' ? strength : strength.improvement || JSON.stringify(strength)}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}

                                {/* Weaknesses */}
                                {cv.ranking_result.weaknesses && cv.ranking_result.weaknesses.length > 0 && (
                                  <div className="bg-red-600/10 border border-red-600/30 rounded-lg p-4">
                                    <h4 className="text-sm font-semibold text-red-400 mb-2 flex items-center gap-2">
                                      <Target className="w-4 h-4" />
                                      Areas to Improve
                                    </h4>
                                    <ul className="text-sm text-gray-300 space-y-1">
                                      {cv.ranking_result.weaknesses.map((weakness: any, idx) => (
                                        <li key={idx} className="flex items-start gap-2">
                                          <span className="text-red-400 mt-1">•</span>
                                          <span>{typeof weakness === 'string' ? weakness : weakness.improvement || JSON.stringify(weakness)}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              </div>

                              {/* Recommendations */}
                              {cv.ranking_result.recommendations && cv.ranking_result.recommendations.length > 0 && (
                                <div className="bg-blue-600/10 border border-blue-600/30 rounded-lg p-4">
                                  <h4 className="text-sm font-semibold text-blue-400 mb-2 flex items-center gap-2">
                                    <TrendingUp className="w-4 h-4" />
                                    Recommendations
                                  </h4>
                                  <ul className="text-sm text-gray-300 space-y-1">
                                    {cv.ranking_result.recommendations.map((rec: any, idx) => (
                                      <li key={idx} className="flex items-start gap-2">
                                        <span className="text-blue-400 mt-1">•</span>
                                        <span>
                                          {typeof rec === 'string'
                                            ? rec
                                            : (
                                              <span className="flex flex-col gap-1">
                                                {rec.category && <span className="font-semibold text-blue-300">{rec.category}:</span>}
                                                <span>{rec.improvement || rec.action || JSON.stringify(rec)}</span>
                                              </span>
                                            )
                                          }
                                        </span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Leaderboard Tab */}
        <TabsContent value="leaderboard">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-6 h-6 text-yellow-400" />
                CV Rankings Leaderboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              {leaderboard.length === 0 ? (
                <div className="text-center py-8">
                  <Trophy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400">No rankings available yet</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {leaderboard.map((entry) => (
                    <div
                      key={entry.user_id}
                      className={`flex items-center gap-4 p-4 rounded-lg transition-colors ${entry.is_current_user
                        ? "bg-blue-600/20 border border-blue-600/50"
                        : "bg-gray-700/50 hover:bg-gray-700"
                        }`}
                    >
                      <div className="flex items-center justify-center w-12">
                        {getRankIcon(entry.rank)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1">
                          <h4 className="font-semibold text-white truncate">
                            {entry.user_name}
                            {entry.is_current_user && (
                              <Badge className="ml-2 bg-blue-600">You</Badge>
                            )}
                          </h4>
                        </div>
                        <p className="text-sm text-gray-400 truncate">{entry.filename}</p>
                      </div>
                      <div className="text-right">
                        <div className={`text-2xl font-bold ${getScoreColor(entry.overall_score)}`}>
                          {entry.overall_score.toFixed(0)}
                        </div>
                        <p className="text-xs text-gray-400">Score</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* CTA Card */}
      <Card className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-blue-600/50 mt-8">
        <CardContent className="p-8 text-center">
          <Trophy className="w-12 h-12 text-blue-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-2">Want to Improve Your Ranking?</h3>
          <p className="text-gray-300 mb-6">
            Upload a new CV or refine your existing one to climb the leaderboard
          </p>
          <Link href="/cv-analysis">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <BarChart3 className="w-4 h-4 mr-2" />
              Analyze & Rank New CV
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
