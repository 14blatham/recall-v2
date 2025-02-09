"use client"

import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@/components/ui/breadcrumb"
import { 
  Brain, 
  ChevronDown, 
  FileText, 
  History, 
  Link as LinkIcon, 
  MessageSquare, 
  Mic, 
  Plus, 
  Save, 
  Search, 
  Share2, 
  Star, 
  Video 
} from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { searchAndContents, type ExaSearchResult } from "@/lib/exa"
import { useState } from "react"
import { toast } from "sonner"

export default function Home() {
  const [searchResults, setSearchResults] = useState<ExaSearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([])
      return
    }

    setIsSearching(true)
    try {
      const results = await searchAndContents(query)
      setSearchResults(results)
      
      if (results.length === 0) {
        toast.info('No results found for your search')
      }
    } catch (error) {
      console.error('Search error:', error)
      toast.error('Failed to search. Please try again.')
    } finally {
      setIsSearching(false)
    }
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-[hsl(var(--bg-gradient-start))] via-[hsl(var(--bg-gradient-middle))] to-[hsl(var(--bg-gradient-end))]">
      {/* Left Sidebar - Sources Panel */}
      <div className="w-80 border-r border-white/10 backdrop-blur-sm flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-white/10 space-y-4">
          <div className="flex items-center gap-2">
            <Brain className="h-6 w-6" />
            <h1 className="text-xl font-medium">recall</h1>
          </div>
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search sources..."
                className="pl-9"
                onChange={(e) => handleSearch(e.target.value)}
              />
              {isSearching && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full" />
                </div>
              )}
            </div>
            <Select defaultValue="date">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Date Added</SelectItem>
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="type">Type</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Sources List */}
        <div className="flex-1 overflow-auto">
          <Tabs defaultValue="articles" className="h-full flex flex-col">
            <TabsList className="justify-start px-6 pt-2 backdrop-blur-sm border-b border-white/10">
              <TabsTrigger value="articles" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Articles
              </TabsTrigger>
              <TabsTrigger value="social" className="flex items-center gap-2">
                <Share2 className="h-4 w-4" />
                Social
              </TabsTrigger>
              <TabsTrigger value="videos" className="flex items-center gap-2">
                <Video className="h-4 w-4" />
                Videos
              </TabsTrigger>
            </TabsList>
            
            <div className="flex-1 overflow-auto">
              <TabsContent value="articles" className="p-6 m-0 h-full tab-content">
                <div className="space-y-6">
                  {searchResults.length > 0 ? (
                    <div className="space-y-3">
                      {searchResults.map((result, index) => (
                        <Card key={index} className="hover:bg-white/10 cursor-pointer transition-colors backdrop-blur-sm">
                          <CardContent className="p-3">
                            <div className="flex items-start gap-3">
                              <FileText className="h-4 w-4 text-muted-foreground mt-1" />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <h4 className="font-normal text-sm truncate">{result.title}</h4>
                                  <Badge variant="secondary" className="shrink-0">Article</Badge>
                                </div>
                                <p className="text-xs text-muted-foreground truncate">{result.url}</p>
                                <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{result.text}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <>
                      <Collapsible defaultOpen className="sidebar-section">
                        <CollapsibleTrigger className="flex items-center justify-between w-full mb-3">
                          <h2 className="font-normal">Current Sources</h2>
                          <ChevronDown className="h-4 w-4 transition-transform duration-300" />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="space-y-3">
                          <Card className="hover:bg-white/10 cursor-pointer transition-colors backdrop-blur-sm">
                            <CardContent className="p-3">
                              <div className="flex items-start gap-3">
                                <FileText className="h-4 w-4 text-muted-foreground mt-1" />
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 mb-1">
                                    <h4 className="font-normal text-sm truncate">AI in Productivity Tools</h4>
                                    <Badge variant="secondary" className="shrink-0">Tech</Badge>
                                  </div>
                                  <p className="text-xs text-muted-foreground">techblog.com • 2 hours ago</p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                          <Card className="hover:bg-white/10 cursor-pointer transition-colors backdrop-blur-sm">
                            <CardContent className="p-3">
                              <div className="flex items-start gap-3">
                                <FileText className="h-4 w-4 text-muted-foreground mt-1" />
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 mb-1">
                                    <h4 className="font-normal text-sm truncate">Research Paper on ML</h4>
                                    <Badge variant="secondary" className="shrink-0">AI Research</Badge>
                                  </div>
                                  <p className="text-xs text-muted-foreground">arxiv.org • 1 day ago</p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </CollapsibleContent>
                      </Collapsible>

                      <Collapsible defaultOpen className="sidebar-section">
                        <CollapsibleTrigger className="flex items-center justify-between w-full mb-3">
                          <h2 className="font-normal">Suggested Sources</h2>
                          <ChevronDown className="h-4 w-4 transition-transform duration-300" />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="space-y-3">
                          <Card className="hover:bg-white/10 cursor-pointer transition-colors backdrop-blur-sm">
                            <CardContent className="p-3">
                              <div className="flex items-start gap-3">
                                <FileText className="h-4 w-4 text-muted-foreground mt-1" />
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 mb-1">
                                    <h4 className="font-normal text-sm truncate">Future of AI Development</h4>
                                    <Badge variant="secondary" className="shrink-0">Startups</Badge>
                                  </div>
                                  <p className="text-xs text-muted-foreground">medium.com • 3 days ago</p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </CollapsibleContent>
                      </Collapsible>
                    </>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="social" className="p-6 m-0">
                <div className="space-y-6">
                  <Card className="hover:bg-white/10 cursor-pointer transition-colors backdrop-blur-sm">
                    <CardContent className="p-3">
                      <div className="flex items-start gap-3">
                        <Share2 className="h-4 w-4 text-muted-foreground mt-1" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-normal text-sm truncate">Thread on AI Ethics</h4>
                            <Badge variant="secondary" className="shrink-0">Twitter</Badge>
                          </div>
                          <p className="text-xs text-muted-foreground">@airesearcher • 5h ago</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="videos" className="p-6 m-0">
                <div className="space-y-6">
                  <Card className="hover:bg-white/10 cursor-pointer transition-colors backdrop-blur-sm">
                    <CardContent className="p-3">
                      <div className="flex items-start gap-3">
                        <Video className="h-4 w-4 text-muted-foreground mt-1" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-normal text-sm truncate">AI Tools Demo</h4>
                            <Badge variant="secondary" className="shrink-0">YouTube</Badge>
                          </div>
                          <p className="text-xs text-muted-foreground">TechChannel • 1d ago</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>

        {/* Bottom Controls */}
        <div className="p-6 border-t border-white/10 backdrop-blur-sm">
          <div className="flex justify-center gap-4">
            <Button 
              size="icon" 
              className="w-12 h-12 rounded-full bg-[hsl(267,54%,65%)] hover:bg-[hsl(267,54%,70%)] transition-colors"
            >
              <Mic className="h-5 w-5 text-white" />
            </Button>
            <Button 
              size="icon"
              className="w-12 h-12 rounded-full bg-[hsl(267,54%,65%)] hover:bg-[hsl(267,54%,70%)] transition-colors"
            >
              <Plus className="h-5 w-5 text-white" />
            </Button>
          </div>
        </div>
      </div>

      {/* Center Panel - Editor */}
      <div className="flex-1 flex flex-col border-r border-white/10">
        {/* Editor Header */}
        <header className="border-b border-white/10 backdrop-blur-sm p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Breadcrumb>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Projects</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Q2 Planning</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Meeting Notes</BreadcrumbLink>
                </BreadcrumbItem>
              </Breadcrumb>
              <Button variant="ghost" size="sm">
                <History className="h-4 w-4 mr-2" />
                <span>Previous Compositions</span>
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
              <ModeToggle />
              <UserNav />
            </div>
          </div>
        </header>

        {/* Editor Content */}
        <div className="flex-1 overflow-auto">
          <div className="max-w-3xl mx-auto p-8">
            <div className="prose prose-sm dark:prose-invert">
              <h1 className="text-3xl font-normal mb-2">Project Planning Meeting Notes</h1>
              <p className="text-muted-foreground mb-8">Last edited 2 hours ago</p>
              <div className="min-h-[500px] relative">
                <p className="text-muted-foreground text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300">
                  Start writing or use voice input...
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - AI Chat & Suggestions */}
      <div className="w-96 backdrop-blur-sm flex flex-col">
        <div className="flex-1 overflow-auto p-6">
          <div className="space-y-6">
            <div className="ai-container">
              <h3 className="text-lg font-normal mb-4">AI Assistant</h3>
              <div className="ai-suggestion">
                <p className="text-sm text-muted-foreground italic mb-3">
                  "Please write 2 paragraphs here in this composition."
                </p>
                <div className="space-y-3">
                  <p className="text-sm">
                    The implementation of artificial intelligence in modern productivity tools represents a significant shift in how we approach daily tasks and workflow optimization. By leveraging machine learning algorithms and natural language processing, these tools can now understand context, predict user needs, and automate routine processes with unprecedented accuracy.
                  </p>
                  <p className="text-sm">
                    This evolution in productivity software not only streamlines existing workflows but also introduces new possibilities for creative problem-solving and collaboration. Teams can now focus on higher-level strategic thinking while AI handles the more repetitive aspects of their work, leading to improved efficiency and innovation across organizations.
                  </p>
                </div>
                <Button className="mt-4 action-btn w-full">
                  Apply to Composition
                </Button>
              </div>
            </div>

            <div className="ai-container">
              <h3 className="text-lg font-normal mb-4">Smart Suggestions</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Structure Recommendations</h4>
                  <ul className="space-y-2">
                    <li className="text-sm text-muted-foreground">
                      • Add an executive summary section
                    </li>
                    <li className="text-sm text-muted-foreground">
                      • Break down the implementation timeline
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2">Content Ideas</h4>
                  <ul className="space-y-2">
                    <li className="text-sm text-muted-foreground">
                      • Include metrics from the Q1 review
                    </li>
                    <li className="text-sm text-muted-foreground">
                      • Reference the product roadmap document
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}