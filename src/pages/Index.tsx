
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { Sparkles, RefreshCw, Copy } from "lucide-react";

const Index = () => {
  const [industry, setIndustry] = useState("");
  const [theme, setTheme] = useState("");
  const [attributes, setAttributes] = useState("");
  const [style, setStyle] = useState("modern");
  const [generatedNames, setGeneratedNames] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const generateNames = () => {
    setIsLoading(true);
    
    // Simulated API call - in a real app, this would call an API
    setTimeout(() => {
      const nameIdeas = generateNameIdeas(industry, theme, attributes, style);
      setGeneratedNames(nameIdeas);
      setIsLoading(false);
      
      toast({
        title: "Names Generated!",
        description: "Check out your new project name suggestions",
      });
    }, 1500);
  };

  const copyToClipboard = (name: string) => {
    navigator.clipboard.writeText(name);
    toast({
      title: "Copied!",
      description: `"${name}" copied to clipboard`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 flex justify-center items-center gap-2">
            <Sparkles className="h-8 w-8 text-purple-500" />
            Idea Bloom Craft
          </h1>
          <p className="text-lg text-gray-600">
            Generate unique, catchy names for your next big project
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="col-span-1 shadow-md">
            <CardHeader>
              <CardTitle>Project Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="industry">Industry</Label>
                <Input
                  id="industry"
                  placeholder="e.g. Technology, Food, Health"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="theme">Theme/Purpose</Label>
                <Input
                  id="theme"
                  placeholder="e.g. Blog, App, E-commerce"
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="attributes">Key Attributes (comma-separated)</Label>
                <Input
                  id="attributes"
                  placeholder="e.g. innovative, sustainable, creative"
                  value={attributes}
                  onChange={(e) => setAttributes(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="style">Naming Style</Label>
                <Select value={style} onValueChange={setStyle}>
                  <SelectTrigger id="style">
                    <SelectValue placeholder="Select style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="modern">Modern & Sleek</SelectItem>
                    <SelectItem value="quirky">Fun & Quirky</SelectItem>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="creative">Creative & Artistic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button 
                className="w-full mt-4" 
                onClick={generateNames}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Generate Names"
                )}
              </Button>
            </CardContent>
          </Card>
          
          <div className="col-span-1 lg:col-span-2">
            <Card className="h-full shadow-md">
              <CardHeader>
                <CardTitle>Name Suggestions</CardTitle>
              </CardHeader>
              <CardContent>
                {generatedNames.length === 0 ? (
                  <div className="text-center py-10">
                    <p className="text-gray-500">
                      Fill in the details and click "Generate Names" to see suggestions
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {generatedNames.map((name, index) => (
                      <Card key={index} className="border border-purple-100 hover:border-purple-300 transition-colors">
                        <CardContent className="p-4 flex justify-between items-center">
                          <span className="font-medium text-gray-800">{name}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => copyToClipboard(name)}
                            title="Copy to clipboard"
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to generate name ideas
const generateNameIdeas = (
  industry: string,
  theme: string,
  attributes: string,
  style: string
): string[] => {
  // This is a simple name generator - in a real app you might use an API
  const industryWords = getIndustryWords(industry);
  const themeWords = getThemeWords(theme);
  const attributeWords = attributes
    .split(',')
    .map(attr => attr.trim())
    .filter(attr => attr.length > 0);
  
  const prefixes = ["Nova", "Elevate", "Peak", "Pulse", "Nexus", "Echo", "Pixel", "Bloom", "Horizon", "Spark"];
  const suffixes = ["Hub", "Flow", "Craft", "Labs", "Works", "Studio", "Pro", "Sphere", "Sync", "Wave"];

  const nameIdeas: string[] = [];
  
  // Generate different name types based on style
  for (let i = 0; i < 8; i++) {
    let name = "";
    
    if (style === "modern") {
      // Modern names: shorter, abstract
      const prefix = getRandomItem([...prefixes, ...industryWords]);
      const suffix = getRandomItem([...suffixes, ...themeWords]);
      name = `${prefix}${suffix}`;
    } else if (style === "quirky") {
      // Quirky names: unexpected combinations
      const adjective = getRandomItem([...attributeWords, "Bouncy", "Quirky", "Zesty", "Funky"]);
      const noun = getRandomItem([...industryWords, ...themeWords, "Panda", "Pickle", "Bean", "Rocket"]);
      name = `${adjective} ${noun}`;
    } else if (style === "professional") {
      // Professional names: straightforward, clear
      const industry = getRandomItem(industryWords);
      const concept = getRandomItem([...themeWords, ...attributeWords, "Solutions", "Partners", "Group"]);
      name = `${industry} ${concept}`;
    } else if (style === "creative") {
      // Creative names: more playful combinations
      const creative = getRandomItem(["Art", "Create", "Dream", "Vision", "Imagine"]);
      const word = getRandomItem([...industryWords, ...themeWords, ...attributeWords]);
      name = `${creative}${word}`;
    }
    
    // Ensure we have valid names
    if (!name || name.trim() === "") {
      name = `${getRandomItem(prefixes)}${getRandomItem(suffixes)}`;
    }
    
    nameIdeas.push(name);
  }
  
  return nameIdeas;
};

// Helper functions for word generation
const getIndustryWords = (industry: string): string[] => {
  if (!industry) return [];
  
  const words = industry.toLowerCase().split(" ");
  const result: string[] = [];
  
  // Common industry words
  const industryMap: Record<string, string[]> = {
    "tech": ["Tech", "Byte", "Code", "Dev", "Digital"],
    "food": ["Taste", "Bite", "Flavor", "Spice", "Feast"],
    "health": ["Vital", "Well", "Health", "Care", "Life"],
    "finance": ["Wealth", "Cash", "Fund", "Fin", "Capital"],
    "education": ["Learn", "Edu", "Wisdom", "Mind", "Academy"],
    "art": ["Art", "Canvas", "Create", "Design", "Studio"]
  };
  
  // Try to find industry-specific words
  words.forEach(word => {
    for (const [key, values] of Object.entries(industryMap)) {
      if (word.includes(key)) {
        result.push(...values);
      }
    }
  });
  
  // If no matches, return capitalized words from input
  if (result.length === 0) {
    return words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
  }
  
  return result;
};

const getThemeWords = (theme: string): string[] => {
  if (!theme) return [];
  
  const words = theme.toLowerCase().split(" ");
  const result: string[] = [];
  
  // Common theme words
  const themeMap: Record<string, string[]> = {
    "app": ["App", "Mobile", "Connect", "Link"],
    "blog": ["Blog", "Post", "Story", "Write"],
    "store": ["Shop", "Store", "Market", "Cart"],
    "game": ["Play", "Game", "Fun", "Joy"],
    "social": ["Social", "Share", "Connect", "Community"],
  };
  
  // Try to find theme-specific words
  words.forEach(word => {
    for (const [key, values] of Object.entries(themeMap)) {
      if (word.includes(key)) {
        result.push(...values);
      }
    }
  });
  
  // If no matches, return capitalized words from input
  if (result.length === 0) {
    return words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
  }
  
  return result;
};

// Helper to get random item from array
const getRandomItem = <T,>(array: T[]): T => {
  if (array.length === 0) return "" as unknown as T;
  return array[Math.floor(Math.random() * array.length)];
};

export default Index;
