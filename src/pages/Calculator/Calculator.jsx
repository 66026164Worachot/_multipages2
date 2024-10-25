import React, { useState, useEffect } from 'react';
import './Calculator.css';

function Calculator() {
  const [currentInput, setCurrentInput] = useState('0');
  const [previousInput, setPreviousInput] = useState('');
  const [operator, setOperator] = useState(null);
  const [lastOperator, setLastOperator] = useState(null);
  const [lastValue, setLastValue] = useState(null);
  const [resetInput, setResetInput] = useState(false);
  const [isResult, setIsResult] = useState(false);

  const updateDisplay = () => {
    return currentInput;
  };

  const inputNumber = (num) => {
    removeActiveClass();

    if (resetInput) {
      setCurrentInput(String(num));
      setResetInput(false);
    } else {
      setCurrentInput(currentInput === '0' ? String(num) : currentInput + num);
    }
    setIsResult(false);
  };

  const inputDecimal = () => {
    if (!currentInput.includes('.')) {
      setCurrentInput(currentInput + '.');
    }
  };

  const clearAll = () => {
    setCurrentInput('0');
    setPreviousInput('');
    setOperator(null);
    setLastOperator(null);
    setLastValue(null);
    setResetInput(false);
    setIsResult(false);
  };

  const clearEntry = () => {
    setCurrentInput('0');
  };

  const inputOperator = (op) => {
    removeActiveClass();

    if (operator && !resetInput) {
      calculateResult();
    }

    setPreviousInput(currentInput);
    setOperator(op);
    setResetInput(true);
    setIsResult(false);
  };

  const removeActiveClass = () => {
    const activeButton = document.querySelector('.button.red.active');
    if (activeButton) {
      activeButton.classList.remove('active');
    }
  };

  const calculateResult = () => {
    let prev = parseFloat(previousInput);
    let curr = parseFloat(currentInput);

    if (isResult && lastOperator) {
      prev = parseFloat(currentInput);
      curr = lastValue;
      setOperator(lastOperator);
    } else {
      setLastValue(curr);
      setLastOperator(operator);
    }

    if (!operator) return;

    switch (operator) {
      case '+':
        setCurrentInput(String(prev + curr));
        break;
      case '-':
        setCurrentInput(String(prev - curr));
        break;
      case '*':
        setCurrentInput(String(prev * curr));
        break;
      case '÷':
        setCurrentInput(curr !== 0 ? String(prev / curr) : 'Error');
        break;
      case '%':
        setCurrentInput(String(prev % curr));
        break;
      default:
        break;
    }

    setOperator(null);
    setResetInput(true);
    setIsResult(true);
  };

  // Key handling logic
  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key;
      const numKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
      const operatorKeys = ['+', '-', '*', '/'];

      if (numKeys.includes(key)) {
        inputNumber(key);
      } else if (operatorKeys.includes(key)) {
        const op = key === '/' ? '÷' : key; // Map '/' to division symbol
        inputOperator(op);
      } else if (key === 'Enter' || key === '=') {
        calculateResult();
      } else if (key === '.') {
        inputDecimal();
      } else if (key === 'Escape') {
        clearAll();
      } else if (key === 'Backspace') {
        clearEntry();
      }
    };

    // Attach keydown event listener
    document.addEventListener('keydown', handleKeyDown);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentInput, operator]); // Ensure effect updates when relevant state changes

  return (
    <div className='calculator'>
      <div className='display'>
        <input type='text' value={updateDisplay()} readOnly />
      </div>
      <div className='buttons'>
        <button className='button clear' onClick={clearAll}>AC</button>
        <button className='button sign' onClick={clearEntry}>C</button>
        <button className='button percent' onClick={() => inputOperator('%')}>%</button>
        <button className='button red' onClick={() => inputOperator('÷')}>÷</button>

        {[7, 8, 9].map(num => (
          <button key={num} className='button number' onClick={() => inputNumber(num)}>{num}</button>
        ))}
        <button className='button red' onClick={() => inputOperator('*')}>×</button>

        {[4, 5, 6].map(num => (
          <button key={num} className='button number' onClick={() => inputNumber(num)}>{num}</button>
        ))}
        <button className='button red' onClick={() => inputOperator('-')}>-</button>

        {[1, 2, 3].map(num => (
          <button key={num} className='button number' onClick={() => inputNumber(num)}>{num}</button>
        ))}
        <button className='button red' onClick={() => inputOperator('+')}>+</button>

        <button className='button number zero' onClick={() => inputNumber(0)}>0</button>
        <button className='button' onClick={inputDecimal}>.</button>
        <button className='button equal operator' onClick={calculateResult}>=</button>
      </div>
    </div>
  );
}

export default Calculator;
