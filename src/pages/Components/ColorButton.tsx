import React from 'react';

export const ColorButton = ({setSelectedColor}: {setSelectedColor: (color: string) => void}) => {
  const colors = [
    { color: 'bg-red-500', focusColor: 'focus:bg-red-700'},
    { color: 'bg-blue-500', focusColor: 'focus:bg-blue-700' },
    { color: 'bg-green-500', focusColor: 'focus:bg-green-700' },
    { color: 'bg-yellow-500', focusColor: 'focus:bg-yellow-700' },
    { color: 'bg-purple-500', focusColor: 'focus:bg-purple-700' },
  ];

  return (
    <div className="my-4">
      <h3 className="font-semibold">Group Colour</h3>
      {colors.map(({color, focusColor}, index) => (
        <button
          key={index}
          className={`mr-2 w-6 h-6 rounded-full ${color} transition duration-300 ease-in-out focus:outline-none focus:ring focus:${focusColor} focus:ring-opacity-50`}
          onClick={() => setSelectedColor(color)}
        />
      ))}
    </div>
  );
};