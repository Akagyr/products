import React, { useCallback, useEffect, useRef, useState } from 'react';

export default function PriceRangeSlider({
  minPrice,
  maxPrice,
  onPriceChange,
}: {
  minPrice: number;
  maxPrice: number;
  onPriceChange: (min: number, max: number) => void;
}) {
  const [minValue, setMinValue] = useState<number>(minPrice);
  const [maxValue, setMaxValue] = useState<number>(maxPrice);
  const [activeThumb, setActiveThumb] = useState<'min' | 'max' | null>(null);
  const minInputRef = useRef<HTMLInputElement>(null);
  const maxInputRef = useRef<HTMLInputElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const updateProgress = useCallback(() => {
    if (progressRef.current) {
      const percent1 = Math.max(((minValue - minPrice) / (maxPrice - minPrice)) * 100, 0);
      const percent2 = Math.min(((maxValue - minPrice) / (maxPrice - minPrice)) * 100, 100);
      progressRef.current.style.left = `${percent1}%`;
      progressRef.current.style.width = `${percent2 - percent1}%`;
    }
  }, [minValue, maxValue, minPrice, maxPrice]);

  useEffect(() => {
    updateProgress();
  }, [minValue, maxValue, updateProgress]);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    const newMinVal = Math.max(Math.min(value, maxValue - 1), minPrice);
    setMinValue(newMinVal);
    onPriceChange(newMinVal, maxValue);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    const newMaxVal = Math.min(Math.max(value, minValue + 1), maxPrice);
    setMaxValue(newMaxVal);
    onPriceChange(minValue, newMaxVal);
  };

  return (
    <div className='relative flex flex-col gap-[15px]'>
      <div className='flex items-center gap-[10px]'>
        <input
          type='number'
          value={minValue}
          onChange={handleMinChange}
          className='w-[80px] px-[5px] py-[2px] border-2 rounded-lg text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
          min={minPrice}
          max={maxPrice}
        />
        <span>-</span>
        <input
          type='number'
          value={maxValue}
          onChange={handleMaxChange}
          className='w-[80px] px-[5px] py-[2px] border-2 rounded-lg text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
          min={minPrice}
          max={maxPrice}
        />
      </div>

      <div className='relative w-full h-[5px] bg-gray-200 rounded'>
        <div ref={progressRef} className='absolute h-full bg-violet rounded' />
        <input
          ref={minInputRef}
          type='range'
          min={minPrice}
          max={maxPrice}
          value={minValue}
          onChange={handleMinChange}
          onMouseDown={() => setActiveThumb('min')}
          onTouchStart={() => setActiveThumb('min')}
          className={`absolute w-full h-[5px] appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-[15px] [&::-webkit-slider-thumb]:h-[15px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-violet [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:shadow-[0_0_4px_rgba(0,0,0,0.4)] ${
            activeThumb === 'min' ? 'z-[2]' : 'z-[1]'
          }`}
        />
        <input
          ref={maxInputRef}
          type='range'
          min={minPrice}
          max={maxPrice}
          value={maxValue}
          onChange={handleMaxChange}
          onMouseDown={() => setActiveThumb('max')}
          onTouchStart={() => setActiveThumb('max')}
          className={`absolute w-full h-[5px] appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-[15px] [&::-webkit-slider-thumb]:h-[15px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-violet [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:shadow-[0_0_4px_rgba(0,0,0,0.4)] ${
            activeThumb === 'max' ? 'z-[2]' : 'z-[1]'
          }`}
        />
      </div>
    </div>
  );
}
