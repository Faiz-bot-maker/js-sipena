import React from 'react';

const Content = ({ children }) => {
  return (
    <main className="p-6">
      <div className="h-full">
        {children}
      </div>
    </main>
  );
};

export default Content;
