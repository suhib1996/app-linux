import { useState } from 'react';

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [previous, setPrevious] = useState('');
  const [operation, setOperation] = useState('');
  const [newNumber, setNewNumber] = useState(true);

  const handleNumber = (num: string) => {
    if (newNumber) {
      setDisplay(num);
      setNewNumber(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleOperation = (op: string) => {
    setPrevious(display);
    setOperation(op);
    setNewNumber(true);
  };

  const calculate = () => {
    if (!previous || !operation) return;
    const a = parseFloat(previous);
    const b = parseFloat(display);
    let result = 0;
    switch (operation) {
      case '+': result = a + b; break;
      case '-': result = a - b; break;
      case '*': result = a * b; break;
      case '/': result = b !== 0 ? a / b : 0; break;
      case '%': result = a % b; break;
      case '^': result = Math.pow(a, b); break;
    }
    setDisplay(String(Number(result.toFixed(8))));
    setOperation('');
    setPrevious('');
    setNewNumber(true);
  };

  const clear = () => {
    setDisplay('0');
    setPrevious('');
    setOperation('');
    setNewNumber(true);
  };

  const handleFunction = (fn: string) => {
    const val = parseFloat(display);
    let result = val;
    switch (fn) {
      case 'sin': result = Math.sin(val); break;
      case 'cos': result = Math.cos(val); break;
      case 'tan': result = Math.tan(val); break;
      case 'log': result = Math.log10(val); break;
      case 'ln': result = Math.log(val); break;
      case 'sqrt': result = Math.sqrt(val); break;
      case '1/x': result = 1 / val; break;
      case 'pi': result = Math.PI; break;
      case 'e': result = Math.E; break;
    }
    setDisplay(String(Number(result.toFixed(8))));
    setNewNumber(true);
  };

  const buttons = [
    [{ label: 'sin', fn: () => handleFunction('sin'), cls: 'text-xs' }, { label: 'cos', fn: () => handleFunction('cos'), cls: 'text-xs' }, { label: 'tan', fn: () => handleFunction('tan'), cls: 'text-xs' }, { label: 'C', fn: clear, cls: 'bg-red-500/20 text-red-400' }],
    [{ label: 'ln', fn: () => handleFunction('ln'), cls: 'text-xs' }, { label: 'log', fn: () => handleFunction('log'), cls: 'text-xs' }, { label: '1/x', fn: () => handleFunction('1/x'), cls: 'text-xs' }, { label: '/', fn: () => handleOperation('/'), cls: 'bg-zinc-700' }],
    [{ label: '7', fn: () => handleNumber('7') }, { label: '8', fn: () => handleNumber('8') }, { label: '9', fn: () => handleNumber('9') }, { label: '*', fn: () => handleOperation('*'), cls: 'bg-zinc-700' }],
    [{ label: '4', fn: () => handleNumber('4') }, { label: '5', fn: () => handleNumber('5') }, { label: '6', fn: () => handleNumber('6') }, { label: '-', fn: () => handleOperation('-'), cls: 'bg-zinc-700' }],
    [{ label: '1', fn: () => handleNumber('1') }, { label: '2', fn: () => handleNumber('2') }, { label: '3', fn: () => handleNumber('3') }, { label: '+', fn: () => handleOperation('+'), cls: 'bg-zinc-700' }],
    [{ label: '0', fn: () => handleNumber('0'), cls: 'col-span-2' }, { label: '.', fn: () => handleNumber('.') }, { label: '=', fn: calculate, cls: 'bg-blue-500/30 text-blue-400' }],
  ];

  return (
    <div className="w-full h-full bg-zinc-900 p-4 flex flex-col">
      <div className="bg-zinc-800 rounded-xl p-4 mb-4 text-right">
        <div className="text-xs text-zinc-500 h-4">{previous} {operation}</div>
        <div className="text-3xl font-light text-zinc-100 overflow-hidden">{display}</div>
      </div>
      <div className="grid grid-cols-4 gap-2 flex-1">
        {buttons.flat().map((btn, i) => (
          <button
            key={i}
            onClick={btn.fn}
            className={`${btn.cls?.includes('col-span') ? 'col-span-2' : ''} ${btn.cls || 'bg-zinc-800 hover:bg-zinc-700'} rounded-xl text-zinc-200 font-medium transition-colors active:scale-95`}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
}
