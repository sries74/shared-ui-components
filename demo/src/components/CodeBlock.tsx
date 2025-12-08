import React, { useState } from 'react';
import './CodeBlock.css';

interface CodeBlockProps {
  code: string;
  language?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = 'tsx' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <div className="code-block">
      <button className="code-block__copy" onClick={handleCopy} aria-label="Copy code">
        {copied ? (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.333 4L6 11.333 2.667 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.333 2.667H12C12.7364 2.667 13.333 3.26362 13.333 4V10.667M5.333 2.667H4C3.26362 2.667 2.667 3.26362 2.667 4V12C2.667 12.7364 3.26362 13.333 4 13.333H10.667C11.4034 13.333 12 12.7364 12 12V10.667M5.333 2.667V4C5.333 4.73638 5.92962 5.333 6.667 5.333H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
        <span>{copied ? 'Copied!' : 'Copy'}</span>
      </button>
      <pre className="code-block__pre">
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  );
};

export default CodeBlock;

