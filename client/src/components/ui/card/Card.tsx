import classNames from 'classnames';
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div className={classNames('bg-white shadow rounded-lg', className)}>
      {children}
    </div>
  );
};

export const CardHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="border-b border-gray-200 p-4">{children}</div>;
};

export const CardTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <h2 className="text-xl font-bold text-gray-800">{children}</h2>;
};

export const CardDescription: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <p className="text-sm text-gray-500">{children}</p>;
};

export const CardContent: React.FC<CardProps> = ({ children, className }) => {
  return <div className={classNames('p-4', className)}>{children}</div>;
};
