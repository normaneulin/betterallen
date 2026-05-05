import React from 'react';
import { Info, AlertTriangle, XCircle, CheckCircle } from 'lucide-react';

interface BannerProps {
  type?: 'info' | 'warning' | 'error' | 'success';
  title?: string;
  description: string;
  icon?: boolean;
  className?: string;
}

const iconMap = {
  info: <Info className="h-5 w-5 text-blue-500" />,
  warning: <AlertTriangle className="h-5 w-5 text-yellow-500" />,
  error: <XCircle className="h-5 w-5 text-red-500" />,
  success: <CheckCircle className="h-5 w-5 text-green-500" />,
};

const bgMap = {
  info: 'bg-blue-50 border-blue-200',
  warning: 'bg-yellow-50 border-yellow-200',
  error: 'bg-red-50 border-red-200',
  success: 'bg-green-50 border-green-200',
};

const Banner: React.FC<BannerProps> = ({
  type = 'info',
  title,
  description,
  icon = true,
  className = '',
}) => (
  <div
    className={`flex items-start gap-3 border-l-4 rounded-md p-4 mb-4 ${bgMap[type]} ${className}`}
    role={type === 'error' ? 'alert' : 'status'}
  >
    {icon && <span>{iconMap[type]}</span>}
    <div>
      {title && <div className="font-semibold mb-1">{title}</div>}
      <div className="text-sm text-gray-700">{description}</div>
    </div>
  </div>
);

export default Banner;
