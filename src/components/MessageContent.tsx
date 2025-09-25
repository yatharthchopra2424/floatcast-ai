import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Thermometer, 
  Droplets, 
  Activity, 
  Navigation, 
  TrendingUp,
  MapPin,
  Clock
} from 'lucide-react';

interface MessageContentProps {
  content: string;
  isBot: boolean;
}

const MessageContent = ({ content, isBot }: MessageContentProps) => {
  if (!isBot) {
    return <p className="text-sm leading-relaxed">{content}</p>;
  }

  // Enhanced markdown components for oceanographic data
  const components = {
    // Enhanced table rendering
    table: ({ children }: any) => (
      <div className="my-6 overflow-x-auto">
        <Table className="min-w-full ocean-data-table shadow-lg">
          {children}
        </Table>
      </div>
    ),
    thead: ({ children }: any) => (
      <TableHeader className="bg-ocean-surface/50">
        {children}
      </TableHeader>
    ),
    tbody: ({ children }: any) => (
      <TableBody>
        {children}
      </TableBody>
    ),
    tr: ({ children }: any) => (
      <TableRow className="border-ocean-light/20 hover:bg-ocean-surface/30">
        {children}
      </TableRow>
    ),
    th: ({ children }: any) => (
      <TableHead className="text-ocean-deep font-semibold text-xs px-3 py-2">
        {children}
      </TableHead>
    ),
    td: ({ children }: any) => (
      <TableCell className="px-3 py-2 text-xs">
        {children}
      </TableCell>
    ),

    // Enhanced headings
    h1: ({ children }: any) => (
      <h1 className="text-lg font-bold text-ocean-deep mt-4 mb-2 flex items-center">
        <Activity className="h-4 w-4 mr-2 text-ocean-primary" />
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-base font-semibold text-ocean-deep mt-3 mb-2 flex items-center">
        <TrendingUp className="h-3 w-3 mr-2 text-ocean-primary" />
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-sm font-medium text-ocean-deep mt-2 mb-1 flex items-center">
        <MapPin className="h-3 w-3 mr-1 text-ocean-primary" />
        {children}
      </h3>
    ),

    // Enhanced lists
    ul: ({ children }: any) => (
      <ul className="list-disc list-inside space-y-1 my-2 text-sm">
        {children}
      </ul>
    ),
    ol: ({ children }: any) => (
      <ol className="list-decimal list-inside space-y-1 my-2 text-sm">
        {children}
      </ol>
    ),
    li: ({ children }: any) => (
      <li className="text-sm leading-relaxed">
        {children}
      </li>
    ),

    // Code blocks
    code: ({ node, inline, className, children, ...props }: any) => {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <SyntaxHighlighter
          style={oneDark}
          language={match[1]}
          PreTag="div"
          className="rounded-md my-2"
          {...props}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code className="bg-ocean-surface/50 text-ocean-deep px-1 py-0.5 rounded text-xs font-mono" {...props}>
          {children}
        </code>
      );
    },

    // Enhanced paragraphs with icon detection
    p: ({ children }: any) => {
      const text = String(children);
      
      // Detect different types of oceanographic content
      if (text.includes('°C') || text.includes('temperature')) {
        return (
          <div className="flex items-start space-x-2 my-2">
            <Thermometer className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
            <p className="text-sm leading-relaxed">{children}</p>
          </div>
        );
      }
      
      if (text.includes('PSU') || text.includes('salinity')) {
        return (
          <div className="flex items-start space-x-2 my-2">
            <Droplets className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
            <p className="text-sm leading-relaxed">{children}</p>
          </div>
        );
      }
      
      if (text.includes('m/s') || text.includes('current') || text.includes('speed')) {
        return (
          <div className="flex items-start space-x-2 my-2">
            <Navigation className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
            <p className="text-sm leading-relaxed">{children}</p>
          </div>
        );
      }
      
      return <p className="text-sm leading-relaxed my-2">{children}</p>;
    },

    // Horizontal rules
    hr: () => (
      <div className="flex items-center my-4">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-ocean-primary/30 to-transparent"></div>
        <Activity className="h-3 w-3 text-ocean-primary mx-3" />
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-ocean-primary/30 to-transparent"></div>
      </div>
    ),

    // Blockquotes for highlights
    blockquote: ({ children }: any) => (
      <Card className="my-3 border-l-4 border-ocean-primary bg-ocean-surface/30">
        <CardContent className="p-3">
          <div className="flex items-start space-x-2">
            <Clock className="h-4 w-4 text-ocean-primary mt-0.5 flex-shrink-0" />
            <div className="text-sm">{children}</div>
          </div>
        </CardContent>
      </Card>
    ),

    // Strong text with badges for important values
    strong: ({ children }: any) => {
      const text = String(children);
      
      // Highlight important oceanographic values
      if (text.match(/\d+(\.\d+)?\s*(°C|PSU|m\/s|m|Sv)/)) {
        return (
          <Badge className="mx-1 bg-ocean-primary/10 text-ocean-deep border-ocean-primary/20">
            {children}
          </Badge>
        );
      }
      
      return <strong className="font-semibold text-ocean-deep">{children}</strong>;
    }
  };

  return (
    <div className="prose prose-sm max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MessageContent;