import React from 'react';

interface ComingSoonProps {
    title?: string;
    message?: string;
    className?: string;
}
export function ComingSoon({
    title = "Coming Soon...",
    message = "This site is under construction.",
    className = ""
}: ComingSoonProps) {
    return (
        <div className={`flex bg-blue-50 border border-blue-200 rounded-lg ${className}`}>
            <div className="flex-1 text-center">
            <h3 className="text-sm font-medium text-gray-800">{title}</h3>
            <p className="text-sm text-gray-600">{message}</p>
            </div>
        </div>
    );
};

