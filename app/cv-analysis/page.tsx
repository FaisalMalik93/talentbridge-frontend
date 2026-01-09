'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Upload,
  FileText,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Target,
  Award,
  Lightbulb,
  Loader2,
  Download,
  Briefcase,
  Code,
} from 'lucide-react';
import { cvService } from '@/lib/services/cv.service';
import { toast } from 'sonner';
import type { CompleteAnalysisResponse, CVRankResponse, LeaderboardResponse } from '@/lib/types';

export default function CVAnalysisPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isRanking, setIsRanking] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<CompleteAnalysisResponse | null>(null);
  const [rankingResult, setRankingResult] = useState<CVRankResponse | null>(null);
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardResponse | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileSelect = (selectedFile: File) => {
    // Validate file type
    const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!validTypes.includes(selectedFile.type)) {
      toast.error('Please upload a PDF or DOCX file');
      return;
    }

    // Validate file size (10MB max)
    if (selectedFile.size > 10 * 1024 * 1024) {
      toast.error('File size must be less than 10MB');
      return;
    }

    setFile(selectedFile);
    toast.success(`File "${selectedFile.name}" selected!`);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleAnalyze = async () => {
    if (!file) {
      toast.error('Please select a file first');
      return;
    }

    setIsAnalyzing(true);
    setAnalysisResult(null);
    setRankingResult(null);

    try {
      const response = await cvService.completeAnalysis(file);

      if (response.error) {
        toast.error(response.error);
        return;
      }

      if (response.data) {
        setAnalysisResult(response.data);

        // Check if this is a duplicate CV
        if ((response.data as any).is_duplicate) {
          toast.info((response.data as any).message || 'This CV was already analyzed. Showing previous results.');
        } else {
          toast.success('CV analyzed successfully with feedback!');
        }
      }
    } catch (error) {
      toast.error('Failed to analyze CV. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleRank = async () => {
    if (!file) {
      toast.error('Please select a file first');
      return;
    }

    setIsRanking(true);

    try {
      // First rank the CV (this saves it with a score)
      const rankResponse = await cvService.rankCV(file);

      if (rankResponse.error) {
        toast.error(rankResponse.error);
        return;
      }

      if (rankResponse.data) {
        setRankingResult(rankResponse.data);

        // Check if this is a duplicate ranking
        if ((rankResponse.data as any).is_duplicate) {
          toast.info((rankResponse.data as any).message || 'This CV was already ranked. Showing previous ranking.');
        }
      }

      // Then get the leaderboard
      const leaderboardResponse = await cvService.getLeaderboard();

      if (leaderboardResponse.error) {
        toast.error('Failed to load leaderboard');
        return;
      }

      if (leaderboardResponse.data) {
        setLeaderboardData(leaderboardResponse.data);

        // Only show success if not a duplicate
        if (!(rankResponse.data as any).is_duplicate) {
          toast.success('CV ranked successfully! Check the leaderboard.');
        }
      }
    } catch (error) {
      toast.error('Failed to rank CV. Please try again.');
    } finally {
      setIsRanking(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setAnalysisResult(null);
    setRankingResult(null);
    setLeaderboardData(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">AI-Powered CV Analysis</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Upload your CV and get AI-powered insights, skill extraction, and personalized feedback
          </p>
        </div>

        {/* Upload Section */}
        {!analysisResult && !rankingResult && (
          <Card className="max-w-2xl mx-auto bg-gray-800 border-gray-700">
            <CardContent className="p-8">
              <div
                className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${isDragOver
                  ? 'border-blue-500 bg-blue-500/10'
                  : 'border-gray-600 hover:border-gray-500'
                  }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div className="w-24 h-24 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Upload className="w-12 h-12 text-blue-400" />
                </div>

                {!file ? (
                  <>
                    <h2 className="text-2xl font-bold mb-4">Upload Your CV</h2>
                    <p className="text-gray-400 mb-8">
                      Drag and drop your CV here, or click to browse
                    </p>
                    <label htmlFor="cv-upload">
                      <Button className="bg-blue-600 hover:bg-blue-700" asChild>
                        <span>Choose File</span>
                      </Button>
                    </label>
                    <input
                      id="cv-upload"
                      type="file"
                      accept=".pdf,.docx"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <p className="text-sm text-gray-500 mt-4">
                      Supported formats: PDF, DOCX (Max size: 10MB)
                    </p>
                  </>
                ) : (
                  <>
                    <FileText className="w-16 h-16 text-green-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">{file.name}</h3>
                    <p className="text-gray-400 mb-6">
                      {(file.size / 1024).toFixed(2)} KB
                    </p>
                    <div className="flex justify-center gap-4">
                      <Button
                        onClick={handleAnalyze}
                        disabled={isAnalyzing}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        {isAnalyzing ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Analyzing...
                          </>
                        ) : (
                          <>
                            <Target className="w-4 h-4 mr-2" />
                            Analyze CV
                          </>
                        )}
                      </Button>
                      <Button
                        onClick={handleRank}
                        disabled={isRanking}
                        className="bg-purple-600 hover:bg-purple-700"
                      >
                        {isRanking ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Ranking...
                          </>
                        ) : (
                          <>
                            <Award className="w-4 h-4 mr-2" />
                            Rank CV
                          </>
                        )}
                      </Button>
                      <Button
                        onClick={handleReset}
                        variant="outline"
                        className="border-gray-600 text-black hover:bg-gray-700"
                      >
                        Cancel
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Analysis Loading */}
        {isAnalyzing && (
          <Card className="max-w-2xl mx-auto bg-gray-800 border-gray-700">
            <CardContent className="p-12 text-center">
              <div className="w-24 h-24 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                <FileText className="w-12 h-12 text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Analyzing Your CV...</h2>
              <p className="text-gray-400 mb-8">
                Our AI is extracting skills, experience, and education from your CV
              </p>
              <Progress value={65} className="w-full" />
            </CardContent>
          </Card>
        )}

        {/* Analysis Results */}
        {analysisResult && !isAnalyzing && (
          <div className="space-y-8">
            {/* Header */}
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">CV Analysis Complete</h2>
                    <p className="text-gray-400">AI-extracted information from your CV</p>
                  </div>
                  <div className="flex items-center space-x-6">
                    {analysisResult.overall_score !== undefined && (
                      <div className="text-center">
                        <div className="text-4xl font-bold text-blue-400">
                          {analysisResult.overall_score}
                        </div>
                        <p className="text-xs text-gray-400 mt-1">Overall Score</p>
                      </div>
                    )}
                    <CheckCircle className="w-12 h-12 text-green-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Detailed Analysis */}
            <Tabs defaultValue="skills" className="space-y-6">
              <TabsList className="bg-gray-800 border-gray-700">
                <TabsTrigger value="skills">Skills</TabsTrigger>
                <TabsTrigger value="experience">Experience</TabsTrigger>
                <TabsTrigger value="education">Education</TabsTrigger>
                <TabsTrigger value="projects">Projects</TabsTrigger>
                <TabsTrigger value="summary">Summary</TabsTrigger>
                <TabsTrigger value="feedback">Feedback</TabsTrigger>
              </TabsList>

              {/* Skills Tab */}
              <TabsContent value="skills">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle>Extracted Skills</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {analysisResult.analysis.skills.map((skill, index) => (
                        <Badge key={index} className="bg-blue-600 text-white px-3 py-1">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    {analysisResult.analysis.skills.length === 0 && (
                      <p className="text-gray-400">No skills extracted</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Experience Tab */}
              <TabsContent value="experience">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle>Work Experience</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {analysisResult.analysis.experience.map((exp, index) => (
                        <div key={index} className="border-l-4 border-blue-600 pl-4">
                          <h3 className="text-lg font-semibold text-white">{exp.title}</h3>
                          <p className="text-blue-400 mb-2">{exp.company}</p>
                          <p className="text-sm text-gray-400 mb-2">{exp.duration}</p>
                          <p className="text-gray-300">{exp.description}</p>
                        </div>
                      ))}
                    </div>
                    {analysisResult.analysis.experience.length === 0 && (
                      analysisResult.analysis.projects && analysisResult.analysis.projects.length > 0 ? (
                        <div className="flex flex-col items-center justify-center p-8 text-center border border-dashed border-gray-700 rounded-lg bg-gray-800/50">
                          <Briefcase className="w-12 h-12 text-blue-400 mb-3 opacity-50" />
                          <p className="text-lg font-medium text-white mb-2">No Formal Work Experience</p>
                          <p className="text-gray-400 max-w-md">
                            Candidate has relevant expertise and project experience.
                            Please check the <span className="text-purple-400 font-semibold cursor-pointer hover:underline" onClick={() => (document.querySelector('[value="projects"]') as HTMLElement)?.click()}>Projects</span> tab.
                          </p>
                        </div>
                      ) : (
                        <p className="text-gray-400 text-center py-4">No experience extracted</p>
                      )
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Education Tab */}
              <TabsContent value="education">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle>Education</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {analysisResult.analysis.education.map((edu, index) => (
                        <div key={index} className="border border-gray-700 rounded-lg p-4">
                          <h3 className="text-lg font-semibold text-white">{edu.degree}</h3>
                          <p className="text-blue-400">{edu.institution}</p>
                          <p className="text-sm text-gray-400">{edu.year}</p>
                        </div>
                      ))}
                    </div>
                    {analysisResult.analysis.education.length === 0 && (
                      <p className="text-gray-400">No education extracted</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Projects Tab */}
              <TabsContent value="projects">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Code className="w-5 h-5 text-purple-400" />
                      Projects & Portfolio
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {analysisResult.analysis.projects?.map((project, index) => (
                        <div key={index} className="border-l-4 border-purple-500 pl-4 bg-gray-800/50 p-4 rounded-r-lg hover:bg-gray-700/30 transition-colors">
                          <h3 className="text-lg font-semibold text-white">{project.name}</h3>
                          {project.description && <p className="text-gray-300 mb-3 mt-1 text-sm leading-relaxed">{project.description}</p>}
                          {project.technologies && project.technologies.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-2">
                              {project.technologies.map((tech, i) => (
                                <Badge key={i} variant="secondary" className="bg-gray-700 text-purple-300 text-xs hover:bg-purple-900/40">
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    {(!analysisResult.analysis.projects || analysisResult.analysis.projects.length === 0) && (
                      <div className="text-center py-8">
                        <Code className="w-12 h-12 text-gray-600 mx-auto mb-3 opacity-50" />
                        <p className="text-gray-400">No projects extracted</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Summary Tab */}
              <TabsContent value="summary">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle>Professional Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 leading-relaxed">
                      {analysisResult.analysis.summary || 'No summary available'}
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Feedback Tab */}
              <TabsContent value="feedback">
                {analysisResult.feedback ? (
                  <>
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Strengths */}
                      <Card className="bg-gray-800 border-gray-700">
                        <CardHeader>
                          <CardTitle className="flex items-center space-x-2">
                            <CheckCircle className="w-5 h-5 text-green-400" />
                            <span>Strengths</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-3">
                            {analysisResult.feedback.strengths?.map((strength, index) => (
                              <li key={index} className="flex items-start space-x-2">
                                <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                                <span className="text-gray-300">
                                  {typeof strength === 'string' ? strength : (strength as any).improvement || (strength as any).section || JSON.stringify(strength)}
                                </span>
                              </li>
                            ))}
                          </ul>
                          {(!analysisResult.feedback.strengths || analysisResult.feedback.strengths.length === 0) && (
                            <p className="text-gray-400">No strengths identified</p>
                          )}
                        </CardContent>
                      </Card>

                      {/* Weaknesses */}
                      <Card className="bg-gray-800 border-gray-700">
                        <CardHeader>
                          <CardTitle className="flex items-center space-x-2">
                            <AlertCircle className="w-5 h-5 text-yellow-400" />
                            <span>Areas to Improve</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-3">
                            {analysisResult.feedback.weaknesses?.map((weakness, index) => (
                              <li key={index} className="flex items-start space-x-2">
                                <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0" />
                                <span className="text-gray-300">
                                  {typeof weakness === 'string' ? weakness : (weakness as any).improvement || (weakness as any).section || JSON.stringify(weakness)}
                                </span>
                              </li>
                            ))}
                          </ul>
                          {(!analysisResult.feedback.weaknesses || analysisResult.feedback.weaknesses.length === 0) && (
                            <p className="text-gray-400">No weaknesses identified</p>
                          )}
                        </CardContent>
                      </Card>
                    </div>

                    {/* Suggestions */}
                    <Card className="bg-gray-800 border-gray-700 mt-6">
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <Lightbulb className="w-5 h-5 text-blue-400" />
                          <span>Improvement Suggestions</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          {analysisResult.feedback.suggestions?.map((suggestion, index) => {
                            const displayText = typeof suggestion === 'string'
                              ? suggestion
                              : (suggestion as any).improvement || (suggestion as any).section || JSON.stringify(suggestion);

                            return (
                              <li key={index} className="flex items-start space-x-2">
                                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                                <span className="text-gray-300">{displayText}</span>
                              </li>
                            );
                          })}
                        </ul>
                        {(!analysisResult.feedback.suggestions || analysisResult.feedback.suggestions.length === 0) && (
                          <p className="text-gray-400">No suggestions available</p>
                        )}
                      </CardContent>
                    </Card>

                    {/* Formatting Issues */}
                    {analysisResult.feedback.formatting_issues && analysisResult.feedback.formatting_issues.length > 0 && (
                      <Card className="bg-gray-800 border-gray-700 mt-6">
                        <CardHeader>
                          <CardTitle className="flex items-center space-x-2">
                            <AlertCircle className="w-5 h-5 text-orange-400" />
                            <span>Formatting Issues</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-3">
                            {analysisResult.feedback.formatting_issues.map((issue, index) => (
                              <li key={index} className="flex items-start space-x-2">
                                <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0" />
                                <span className="text-gray-300">
                                  {typeof issue === 'string' ? issue : (issue as any).improvement || (issue as any).section || JSON.stringify(issue)}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    )}

                    {/* Missing Elements */}
                    {analysisResult.feedback.missing_elements && analysisResult.feedback.missing_elements.length > 0 && (
                      <Card className="bg-gray-800 border-gray-700 mt-6">
                        <CardHeader>
                          <CardTitle className="flex items-center space-x-2">
                            <TrendingUp className="w-5 h-5 text-purple-400" />
                            <span>Missing Elements</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-3">
                            {analysisResult.feedback.missing_elements.map((element, index) => (
                              <li key={index} className="flex items-start space-x-2">
                                <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0" />
                                <span className="text-gray-300">
                                  {typeof element === 'string' ? element : (element as any).improvement || (element as any).section || JSON.stringify(element)}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    )}
                  </>
                ) : (
                  <Card className="bg-gray-800 border-gray-700">
                    <CardContent className="p-8 text-center">
                      <AlertCircle className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold mb-2">No Feedback Available</h3>
                      <p className="text-gray-400">
                        Feedback data is not available for this analysis. Please try analyzing your CV again.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            </Tabs>

            {/* Action Buttons */}
            <div className="flex justify-center space-x-4">
              <Button
                onClick={handleRank}
                disabled={isRanking}
                className="bg-purple-600 hover:bg-purple-700"
              >
                {isRanking ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Ranking...
                  </>
                ) : (
                  <>
                    <Award className="w-4 h-4 mr-2" />
                    Get CV Ranking
                  </>
                )}
              </Button>
              <Button
                onClick={handleReset}
                variant="outline"
                className="border-gray-600 text-black hover:bg-gray-700"
              >
                Upload New CV
              </Button>
            </div>
          </div>
        )}

        {/* Leaderboard */}
        {leaderboardData && !isRanking && (
          <div className="space-y-8 mt-8">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="w-6 h-6 text-yellow-400" />
                  <span>CV Leaderboard - All Ranked CVs</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 mb-6">
                  Showing {leaderboardData.total_cvs} CVs ranked by overall score
                </p>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Rank</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">User</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">CV Filename</th>
                        <th className="px-4 py-3 text-center text-sm font-semibold text-gray-300">Score</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leaderboardData.leaderboard.map((entry) => (
                        <tr
                          key={entry.rank}
                          className={`border-b border-gray-700/50 transition-colors ${entry.is_current_user
                            ? 'bg-blue-600/20 hover:bg-blue-600/30'
                            : 'hover:bg-gray-700/30'
                            }`}
                        >
                          <td className="px-4 py-4">
                            <div className="flex items-center space-x-2">
                              {entry.rank === 1 && <span className="text-2xl">🥇</span>}
                              {entry.rank === 2 && <span className="text-2xl">🥈</span>}
                              {entry.rank === 3 && <span className="text-2xl">🥉</span>}
                              <span className={`text-lg font-bold ${entry.rank <= 3 ? 'text-yellow-400' : 'text-gray-300'
                                }`}>
                                #{entry.rank}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex items-center space-x-2">
                              <span className="text-white font-medium">{entry.user_name}</span>
                              {entry.is_current_user && (
                                <Badge className="bg-blue-600 text-white text-xs">You</Badge>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-4 text-gray-300 text-sm">
                            {entry.filename}
                          </td>
                          <td className="px-4 py-4 text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600">
                              <span className="text-xl font-bold text-white">
                                {entry.overall_score}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-gray-400 text-sm">
                            {new Date(entry.created_at).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-center">
              <Button
                onClick={handleReset}
                variant="outline"
                className="border-gray-600 text-black hover:bg-gray-700"
              >
                Upload New CV
              </Button>
            </div>
          </div>
        )}

        {/* Ranking Results */}
        {rankingResult && !isRanking && !leaderboardData && (
          <div className="space-y-8 mt-8">
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">CV Ranking Results</h2>
                    <p className="text-gray-400">Your CV compared to professional standards</p>
                  </div>
                  <div className="text-center">
                    <div className="text-5xl font-bold text-blue-400 mb-2">
                      {rankingResult.ranking.user_cv_score}
                    </div>
                    <p className="text-sm text-gray-400">Overall Score</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mt-8">
                  {/* Strengths */}
                  <Card className="bg-gray-900 border-gray-700">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <span>Strengths</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {rankingResult.ranking.strengths.map((strength, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                            <span className="text-gray-300">
                              {typeof strength === 'string'
                                ? strength
                                : (strength as any).improvement || (strength as any).description || (strength as any).category || JSON.stringify(strength)}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Weaknesses */}
                  <Card className="bg-gray-900 border-gray-700">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <AlertCircle className="w-5 h-5 text-yellow-400" />
                        <span>Areas to Improve</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {rankingResult.ranking.weaknesses.map((weakness, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0" />
                            <span className="text-gray-300">
                              {typeof weakness === 'string'
                                ? weakness
                                : (weakness as any).improvement || (weakness as any).description || (weakness as any).category || JSON.stringify(weakness)}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                {/* Recommendations */}
                <Card className="bg-gray-900 border-gray-700 mt-8">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Lightbulb className="w-5 h-5 text-blue-400" />
                      <span>Recommendations</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {rankingResult.ranking.recommendations.map((rec, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-gray-300">
                            {typeof rec === 'string'
                              ? rec
                              : (rec as any).improvement || (rec as any).description || (rec as any).category || JSON.stringify(rec)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Comparison Results */}
                {rankingResult.ranking.comparison_results.length > 0 && (
                  <Card className="bg-gray-900 border-gray-700 mt-8">
                    <CardHeader>
                      <CardTitle>Comparison with Reference CVs</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {rankingResult.ranking.comparison_results.map((comparison, index) => (
                          <div key={index} className="border border-gray-700 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold text-white">{comparison.reference_cv}</h4>
                              <Badge className="bg-blue-600">{comparison.score}/100</Badge>
                            </div>
                            <p className="text-sm text-gray-400">{comparison.feedback}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>

            <div className="flex justify-center">
              <Button
                onClick={handleReset}
                variant="outline"
                className="border-gray-600 text-black hover:bg-gray-700"
              >
                Upload New CV
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
