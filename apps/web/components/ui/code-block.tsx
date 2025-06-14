// apps/web/components/ui/code-block.tsx
'use client';
import { useState } from 'react';
import { FiCopy, FiCheck } from 'react-icons/fi';
import { Highlight, themes } from 'prism-react-renderer';

interface CodeBlockProps {
  code: string;
  language: string;
  title?: string;
  showLineNumbers?: boolean;
}

export function CodeBlock({ 
  code, 
  language, 
  title, 
  showLineNumbers = false 
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
      {title && (
        <div className="flex items-center justify-between px-4 py-2 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-700">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {title}
          </span>
          <button
            onClick={copyToClipboard}
            className="text-gray-500 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
            aria-label="Copy code"
          >
            {copied ? (
              <FiCheck className="w-4 h-4 text-green-500" />
            ) : (
              <FiCopy className="w-4 h-4" />
            )}
          </button>
        </div>
      )}
      <div className="p-4 overflow-x-auto">
        <Highlight
          theme={themes.github}
          code={code}
          language={language}
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre className={className} style={style}>
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })}>
                  {showLineNumbers && (
                    <span className="inline-block w-8 text-gray-400 select-none">
                      {i + 1}
                    </span>
                  )}
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </div>
    </div>
  );
}