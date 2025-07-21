/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useState, useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { Loader2, Play, Terminal, PanelRightOpenIcon, PanelRightCloseIcon } from 'lucide-react';
import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import { usePlaygroundStore } from '@hooks/usePlaygroundStore';

// Pyodideの型定義
declare global {
  interface Window {
    loadPyodide: (options?: any) => Promise<any>;
  }
}

export default function PythonPlayground() {
  const [code, setCode] = useState('name = input("名前を入力してください: ")\nprint(f"こんにちは、{name}さん！")');
  const [output, setOutput] = useState('');
  const [pyodide, setPyodide] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isExecuting, setIsExecuting] = useState(false);
  const {isOpen, toggle} = usePlaygroundStore();

  // input()のための状態管理
  const [isAwaitingInput, setIsAwaitingInput] = useState(false);
  const [inputPrompt, setInputPrompt] = useState('');
  const [inputValue, setInputValue] = useState('');
  const inputResolver = useRef<((value: string) => void) | null>(null);

  // JS側で定義する、Promiseを返す入力関数
  const promptForInput = (prompt: string): Promise<string> => {
    return new Promise((resolve) => {
      setIsAwaitingInput(true);
      setInputPrompt(prompt || '');
      inputResolver.current = resolve;
    });
  };

  // Pyodideの初期化とJSモジュールの登録
  useEffect(() => {
    const initPyodide = async () => {
      try {
        const pyodideInstance = await window.loadPyodide({
          indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.1/full/',
        });

        pyodideInstance.setStdout({ batched: (msg: string) => setOutput(prev => prev + msg + '\n') });
        pyodideInstance.setStderr({ batched: (msg: string) => setOutput(prev => prev + msg + '\n') });

        // JSの関数をPythonモジュールとして登録
        pyodideInstance.registerJsModule('js_input_module', {
          prompt_for_input: promptForInput,
        });

        setPyodide(pyodideInstance);
        setIsLoading(false);
      } catch (error) {
        console.error('Pyodideの初期化に失敗しました', error);
        setOutput('Pyodideの読み込みに失敗しました。リロードしてください。');
        setIsLoading(false);
      }
    };

    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/pyodide/v0.26.1/full/pyodide.js';
    script.onload = initPyodide;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const runCode = async () => {
    if (!pyodide) return;

    setIsExecuting(true);
    setOutput('');
    try {
      // ユーザーコード内の特殊文字をエスケープ
      const escapedCode = code.replace(/'/g, "'").replaceAll("input", "await input");
      console.log('Running code:', escapedCode);

      // ユーザーコードを非同期関数でラップし、inputを上書きする
      const pythonCode = `
import asyncio
import js_input_module

# 組み込みのinputを上書き
async def custom_input(prompt=""):
    return await js_input_module.prompt_for_input(prompt)

__builtins__.input = custom_input

async def main():
    # ユーザーのコードをここに展開
${escapedCode.split('\n').map(line => '    ' + line).join('\n')}

# トップレベルのawaitを許可して実行
await main()
`;

      await pyodide.runPythonAsync(pythonCode);

    } catch (error: any) {
      setOutput(prev => prev + error.toString());
    } finally {
      setIsExecuting(false);
    }
  };

  const handleInputSubmit = () => {
    if (inputResolver.current) {
      inputResolver.current(inputValue);
      setOutput(prev => prev + inputValue + '\n');
      setIsAwaitingInput(false);
      setInputValue('');
      inputResolver.current = null;
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-4 border rounded-lg h-96">
        <Loader2 className="animate-spin text-primary mb-2" size={32} />
        <p className="text-muted-foreground">実行環境を準備しています...</p>
      </div>
    );
  }

  return (
    <>
    { isOpen ?
      <div
        className='min-w-[500px]'
      >
        <div
          className='w-full flex justify-end mb-2'
        >
          <Button onClick={ toggle }>
            <PanelRightCloseIcon size={16} />
          </Button>
        </div>
        <h2 className="text-xl font-bold text-foreground my-1">Python実行環境</h2>
        <div className="border rounded-lg overflow-hidden">
          <Editor
            height="300px"
            language="python"
            theme="vs-dark"
            value={code}
            onChange={(value) => setCode(value || '')}
            options={{ minimap: { enabled: false }, fontSize: 14 }}
          />
          <div className="p-2 flex items-center justify-between bg-gray-100 dark:bg-gray-800">
            <Button onClick={runCode} disabled={isExecuting || isAwaitingInput}>
              {isExecuting ? <Loader2 className="animate-spin mr-2" size={16} /> : <Play className="mr-2" size={16} />}
              実行
            </Button>
          </div>
          <div className="bg-gray-900">
            <pre className="p-4 text-white text-sm whitespace-pre-wrap break-all min-h-[100px] max-h-[200px] overflow-y-auto">
              <code>{output}</code>
            </pre>
            {isAwaitingInput && (
              <div className="p-2 flex items-center gap-2 border-t border-gray-700">
                <Terminal size={16} className="text-gray-400" />
                <label htmlFor="python-input" className="text-gray-400 text-sm shrink-0">{inputPrompt}</label>
                <Input
                  id="python-input"
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleInputSubmit()}
                  className="bg-gray-800 border-gray-600 text-white focus:ring-primary"
                  autoFocus
                />
                <Button onClick={handleInputSubmit} size="sm">送信</Button>
              </div>
            )}
          </div>
        </div>
      </div>
      :
      <div
            className='flex justify-center items-center flex-col gap-4'
      >
        <Button onClick={ toggle }>
          <PanelRightOpenIcon size={16} />
        </Button>
        <p className="text-muted-foreground [writing-mode:vertical-rl]">Python実行環境を開く</p>
      </div>
    }
    </>
  );
}