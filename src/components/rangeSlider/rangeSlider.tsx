import React, { useState, useEffect, useRef } from 'react';

interface IRangeSliderProps {
  value : number,
  setValue : any,
}

export default function RangeSlider({ value, setValue } : IRangeSliderProps) {
    const sliderRef = useRef<HTMLInputElement>(null);
    const [tooltipPosition, setTooltipPosition] = useState<string>('0%');
  
    useEffect(() => {
      updateTooltipPosition();
    }, [value]);
  
    const updateTooltipPosition = () => {
      if (sliderRef.current) {
        const slider = sliderRef.current;
        const max = slider.max ? parseInt(slider.max) : 100; 
        const newPosition = ((value - parseInt(slider.min)) / (max - parseInt(slider.min))) * 100;
        setTooltipPosition(`${newPosition}%`);
      }
    };
  
    return (
      <div className="relative pb-12">
        <label htmlFor="slider" className="form-label absolute top-0 text-gray- -translate-y-8">
          Age
        </label>
        <div
          className="absolute left-0 top-0 mt-10 text-xs bg-purple-600 text-white py-1 px-2 rounded"
          style={{ left: `calc(${tooltipPosition} - 1rem)` }}
        >
          {value}
        </div>
        <input
          id="slider"
          type="range"
          min="8"
          max="100"
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          className="slider w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer"
          ref={sliderRef}
        />
      </div>
    );
  };
  