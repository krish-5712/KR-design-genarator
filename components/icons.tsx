import React from 'react';

export const LogoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12.75 3.837a.75.75 0 00-1.5 0v2.759a2.25 2.25 0 00-1.423 2.072l-.02.115a2.25 2.25 0 00.35 1.571l.026.033c.12.14.25.272.39.395l1.072 1.072a.75.75 0 001.06 0l1.073-1.072c.14-.123.27-.255.39-.395l.026-.033a2.25 2.25 0 00.35-1.571l-.02-.115a2.25 2.25 0 00-1.424-2.072V3.837z" />
    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM4.074 11.03a8.23 8.23 0 013.16-5.018.75.75 0 01.99 1.123 6.73 6.73 0 00-2.535 4.14.75.75 0 01-1.48-.232zM12 15.75a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0v-2.25a.75.75 0 01.75-.75zM8.396 7.132a.75.75 0 01.99-1.123 8.23 8.23 0 015.228 0 .75.75 0 11.99 1.123A6.73 6.73 0 0012 5.56a6.73 6.73 0 00-3.604 1.572zM16.766 6.012a.75.75 0 011.123-.99 8.23 8.23 0 013.16 5.018.75.75 0 01-1.48.232 6.73 6.73 0 00-2.535-4.14z" clipRule="evenodd" />
  </svg>
);

export const TshirtIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none" {...props}>
        <path d="M78.07,17.72,69.5,12.5a4,4,0,0,0-3.83-1H34.33a4,4,0,0,0-3.83,1l-8.57,5.22a4,4,0,0,0-2,3.46V33.6a4,4,0,0,0,1.17,2.83L39.87,55.2a4,4,0,0,1,1.17,2.83V86.5a4,4,0,0,0,4,4H55a4,4,0,0,0,4-4V58.03a4,4,0,0,1,1.17-2.83L78.83,36.43a4,4,0,0,0,1.17-2.83V21.18A4,4,0,0,0,78.07,17.72Z" fill="#FFF" stroke="#E5E7EB" strokeWidth="2" />
    </svg>
);

export const BagIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none" {...props}>
        <path d="M75,30H25a5,5,0,0,0-5,5V85a5,5,0,0,0,5,5H75a5,5,0,0,0,5-5V35A5,5,0,0,0,75,30Z" fill="#FFF" stroke="#E5E7EB" strokeWidth="2" />
        <path d="M65,30V20A15,15,0,0,0,35,20v10" stroke="#E5E7EB" strokeWidth="2" />
    </svg>
);

// Shared base path for all phone mockups
const phoneBodyPath = "M82.5,5h-65C9.45,5,5,9.45,5,17.5v65C5,90.55,9.45,95,17.5,95h65c8.05,0,12.5-4.45,12.5-12.5v-65C95,9.45,90.55,5,82.5,5Z";

const lensGradient = (
    <defs>
        <radialGradient id="lensGrad" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" style={{stopColor:'#6B7280', stopOpacity:1}} />
            <stop offset="100%" style={{stopColor:'#2D3748', stopOpacity:1}} />
        </radialGradient>
    </defs>
);

export const Iphone15ProIcon: React.FC<React.SVGProps<SVGSVGElement> & { imageHref?: string }> = ({ imageHref, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" {...props}>
    <defs>
      {imageHref && (
        <pattern id="iphone-15-pro-pattern" patternUnits="userSpaceOnUse" width="100" height="100">
          <image href={imageHref} x="0" y="0" width="100" height="100" />
        </pattern>
      )}
    </defs>
    {lensGradient}
    <g>
      <path d={phoneBodyPath} fill={imageHref ? "url(#iphone-15-pro-pattern)" : "#fff"} stroke="#e0e0e0" strokeWidth="1.5"/>
      <path d="M17,16a8,8,0,0,0-8,8v26a8,8,0,0,0,8,8h26a8,8,0,0,0,8-8V24a8,8,0,0,0-8-8Z" fill="#f0f0f0" stroke="#d1d5db" strokeWidth="1"/>
      <circle cx="28" cy="27" r="6" fill="url(#lensGrad)" stroke="#d1d5db" strokeWidth="0.5"/>
      <circle cx="28" cy="43" r="6" fill="url(#lensGrad)" stroke="#d1d5db" strokeWidth="0.5"/>
      <circle cx="42" cy="27" r="6" fill="url(#lensGrad)" stroke="#d1d5db" strokeWidth="0.5"/>
      <circle cx="43" cy="42" r="2" fill="#4a5568"/>
      <circle cx="19" cy="44" r="1.5" fill="#4a5568"/>
    </g>
  </svg>
);

export const Iphone15Icon: React.FC<React.SVGProps<SVGSVGElement> & { imageHref?: string }> = ({ imageHref, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" {...props}>
    <defs>
      {imageHref && (
        <pattern id="iphone-15-pattern" patternUnits="userSpaceOnUse" width="100" height="100">
          <image href={imageHref} x="0" y="0" width="100" height="100" />
        </pattern>
      )}
    </defs>
    {lensGradient}
    <g>
      <path d={phoneBodyPath} fill={imageHref ? "url(#iphone-15-pattern)" : "#fff"} stroke="#e0e0e0" strokeWidth="1.5"/>
      <path d="M17,16a8,8,0,0,0-8,8v26a8,8,0,0,0,8,8h26a8,8,0,0,0,8-8V24a8,8,0,0,0-8-8Z" fill="#f0f0f0" stroke="#d1d5db" strokeWidth="1"/>
      <circle cx="25" cy="27" r="7" fill="url(#lensGrad)" stroke="#d1d5db" strokeWidth="0.5"/>
      <circle cx="39" cy="41" r="7" fill="url(#lensGrad)" stroke="#d1d5db" strokeWidth="0.5"/>
      <circle cx="42" cy="24" r="2" fill="#4a5568"/>
    </g>
  </svg>
);

export const Pixel8ProIcon: React.FC<React.SVGProps<SVGSVGElement> & { imageHref?: string }> = ({ imageHref, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" {...props}>
    <defs>
      {imageHref && (
        <pattern id="pixel-8-pro-pattern" patternUnits="userSpaceOnUse" width="100" height="100">
          <image href={imageHref} x="0" y="0" width="100" height="100" />
        </pattern>
      )}
    </defs>
    {lensGradient}
    <g>
      <path d={phoneBodyPath} fill={imageHref ? "url(#pixel-8-pro-pattern)" : "#fff"} stroke="#e0e0e0" strokeWidth="1.5"/>
      <path d="M10,18h80v16H10Z" fill="#f0f0f0" stroke="#d1d5db" strokeWidth="1"/>
      <path d="M22,26 a6,6 0 0,1 30,0 a6,6 0 0,1 -30,0" fill="url(#lensGrad)" stroke="#d1d5db" strokeWidth="0.5"/>
      <circle cx="60" cy="26" r="6" fill="url(#lensGrad)" stroke="#d1d5db" strokeWidth="0.5"/>
      <circle cx="72" cy="26" r="2" fill="#4a5568"/>
    </g>
  </svg>
);

export const SamsungS24UltraIcon: React.FC<React.SVGProps<SVGSVGElement> & { imageHref?: string }> = ({ imageHref, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" {...props}>
    <defs>
      {imageHref && (
        <pattern id="samsung-s24-ultra-pattern" patternUnits="userSpaceOnUse" width="100" height="100">
          <image href={imageHref} x="0" y="0" width="100" height="100" />
        </pattern>
      )}
    </defs>
    {lensGradient}
    <g>
      <path d={phoneBodyPath} fill={imageHref ? "url(#samsung-s24-ultra-pattern)" : "#fff"} stroke="#e0e0e0" strokeWidth="1.5"/>
      <circle cx="25" cy="28" r="7" fill="url(#lensGrad)" stroke="#d1d5db" strokeWidth="0.5"/>
      <circle cx="25" cy="50" r="7" fill="url(#lensGrad)" stroke="#d1d5db" strokeWidth="0.5"/>
      <circle cx="25" cy="72" r="7" fill="url(#lensGrad)" stroke="#d1d5db" strokeWidth="0.5"/>
      <circle cx="42" cy="55" r="5" fill="url(#lensGrad)" stroke="#d1d5db" strokeWidth="0.5"/>
      <circle cx="42" cy="77" r="5" fill="url(#lensGrad)" stroke="#d1d5db" strokeWidth="0.5"/>
      <circle cx="42" cy="28" r="2" fill="#4a5568"/>
    </g>
  </svg>
);

export const SamsungS24Icon: React.FC<React.SVGProps<SVGSVGElement> & { imageHref?: string }> = ({ imageHref, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" {...props}>
    <defs>
      {imageHref && (
        <pattern id="samsung-s24-pattern" patternUnits="userSpaceOnUse" width="100" height="100">
          <image href={imageHref} x="0" y="0" width="100" height="100" />
        </pattern>
      )}
    </defs>
    {lensGradient}
    <g>
      <path d={phoneBodyPath} fill={imageHref ? "url(#samsung-s24-pattern)" : "#fff"} stroke="#e0e0e0" strokeWidth="1.5"/>
      <circle cx="25" cy="28" r="7" fill="url(#lensGrad)" stroke="#d1d5db" strokeWidth="0.5"/>
      <circle cx="25" cy="50" r="7" fill="url(#lensGrad)" stroke="#d1d5db" strokeWidth="0.5"/>
      <circle cx="25" cy="72" r="7" fill="url(#lensGrad)" stroke="#d1d5db" strokeWidth="0.5"/>
      <circle cx="40" cy="28" r="2" fill="#4a5568"/>
    </g>
  </svg>
);

export const SamsungA33Icon: React.FC<React.SVGProps<SVGSVGElement> & { imageHref?: string }> = ({ imageHref, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" {...props}>
    <defs>
      {imageHref && (
        <pattern id="samsung-a33-pattern" patternUnits="userSpaceOnUse" width="100" height="100">
          <image href={imageHref} x="0" y="0" width="100" height="100" />
        </pattern>
      )}
    </defs>
    {lensGradient}
    <g>
      <path d={phoneBodyPath} fill={imageHref ? "url(#samsung-a33-pattern)" : "#fff"} stroke="#e0e0e0" strokeWidth="1.5"/>
      <path d="M19,16.5a6,6,0,0,0-6,6v27a6,6,0,0,0,6,6h24a6,6,0,0,0,6-6v-27a6,6,0,0,0-6-6Z" fill="#f0f0f0" stroke="#d1d5db" strokeWidth="1"/>
      <circle cx="30" cy="27" r="6" fill="url(#lensGrad)" stroke="#d1d5db" strokeWidth="0.5"/>
      <circle cx="22" cy="41" r="3.5" fill="url(#lensGrad)" stroke="#d1d5db" strokeWidth="0.5"/>
      <circle cx="38" cy="41" r="3.5" fill="url(#lensGrad)" stroke="#d1d5db" strokeWidth="0.5"/>
      <circle cx="39" cy="23" r="2" fill="#4a5568"/>
    </g>
  </svg>
);

export const Xiaomi14UltraIcon: React.FC<React.SVGProps<SVGSVGElement> & { imageHref?: string }> = ({ imageHref, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" {...props}>
     <defs>
      {imageHref && (
        <pattern id="xiaomi-14-ultra-pattern" patternUnits="userSpaceOnUse" width="100" height="100">
          <image href={imageHref} x="0" y="0" width="100" height="100" />
        </pattern>
      )}
    </defs>
    {lensGradient}
    <g>
      <path d={phoneBodyPath} fill={imageHref ? "url(#xiaomi-14-ultra-pattern)" : "#fff"} stroke="#e0e0e0" strokeWidth="1.5"/>
      <circle cx="50" cy="43" r="28" fill="#f0f0f0" stroke="#d1d5db" strokeWidth="1"/>
      <circle cx="38" cy="33" r="7" fill="url(#lensGrad)" stroke="#d1d5db" strokeWidth="0.5"/>
      <circle cx="62" cy="33" r="7" fill="url(#lensGrad)" stroke="#d1d5db" strokeWidth="0.5"/>
      <circle cx="38" cy="53" r="7" fill="url(#lensGrad)" stroke="#d1d5db" strokeWidth="0.5"/>
      <circle cx="62" cy="53" r="7" fill="url(#lensGrad)" stroke="#d1d5db" strokeWidth="0.5"/>
    </g>
  </svg>
);

export const PhoneIconSquare: React.FC<React.SVGProps<SVGSVGElement> & { imageHref?: string }> = ({ imageHref, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" {...props}>
     <defs>
      {imageHref && (
        <pattern id="phone-square-pattern" patternUnits="userSpaceOnUse" width="100" height="100">
          <image href={imageHref} x="0" y="0" width="100" height="100" />
        </pattern>
      )}
    </defs>
    {lensGradient}
    <g>
      <path d={phoneBodyPath} fill={imageHref ? "url(#phone-square-pattern)" : "#fff"} stroke="#e0e0e0" strokeWidth="1.5"/>
      <path d="M17,16a8,8,0,0,0-8,8v26a8,8,0,0,0,8,8h26a8,8,0,0,0,8-8V24a8,8,0,0,0-8-8Z" fill="#f0f0f0" stroke="#d1d5db" strokeWidth="1"/>
      <circle cx="28" cy="27" r="5" fill="url(#lensGrad)" stroke="#d1d5db" strokeWidth="0.5"/>
      <circle cx="28" cy="41" r="5" fill="url(#lensGrad)" stroke="#d1d5db" strokeWidth="0.5"/>
      <circle cx="40" cy="27" r="5" fill="url(#lensGrad)" stroke="#d1d5db" strokeWidth="0.5"/>
    </g>
  </svg>
);

export const PhoneIconVertical: React.FC<React.SVGProps<SVGSVGElement> & { imageHref?: string }> = ({ imageHref, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" {...props}>
     <defs>
      {imageHref && (
        <pattern id="phone-vertical-pattern" patternUnits="userSpaceOnUse" width="100" height="100">
          <image href={imageHref} x="0" y="0" width="100" height="100" />
        </pattern>
      )}
    </defs>
    {lensGradient}
    <g>
      <path d={phoneBodyPath} fill={imageHref ? "url(#phone-vertical-pattern)" : "#fff"} stroke="#e0e0e0" strokeWidth="1.5"/>
      <path d="M18,17a7,7,0,0,0-7,7v38a7,7,0,0,0,7,7h18a7,7,0,0,0,7-7V24a7,7,0,0,0-7-7Z" fill="#f0f0f0" stroke="#d1d5db" strokeWidth="1"/>
      <circle cx="27" cy="30" r="6" fill="url(#lensGrad)" stroke="#d1d5db" strokeWidth="0.5"/>
      <circle cx="27" cy="48" r="6" fill="url(#lensGrad)" stroke="#d1d5db" strokeWidth="0.5"/>
    </g>
  </svg>
);

export const PhoneIcon: React.FC<React.SVGProps<SVGSVGElement> & { imageHref?: string }> = ({ imageHref, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" {...props}>
     <defs>
      {imageHref && (
        <pattern id="phone-generic-pattern" patternUnits="userSpaceOnUse" width="100" height="100">
          <image href={imageHref} x="0" y="0" width="100" height="100" />
        </pattern>
      )}
    </defs>
    <g>
      <path d={phoneBodyPath} fill={imageHref ? "url(#phone-generic-pattern)" : "#fff"} stroke="#e0e0e0" strokeWidth="1.5"/>
    </g>
  </svg>
);


export const GenerateIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path d="M10 3.5a1.5 1.5 0 011.5 1.5.75.75 0 001.5 0A3 3 0 0010 2a3 3 0 00-3 3 .75.75 0 001.5 0A1.5 1.5 0 0110 3.5zM10 5.5a1 1 0 00-1 1v2.25a.75.75 0 001.5 0V6.5a1 1 0 00-1-1z" />
    <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM3.636 6.364a6.5 6.5 0 019.192 9.192A6.5 6.5 0 013.636 6.364z" clipRule="evenodd" />
  </svg>
);

export const DownloadIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
        <path d="M10.75 2.75a.75.75 0 00-1.5 0v8.614L6.295 8.235a.75.75 0 10-1.09 1.03l4.25 4.5a.75.75 0 001.09 0l4.25-4.5a.75.75 0 00-1.09-1.03l-2.955 3.129V2.75z" />
        <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
    </svg>
);

export const ChevronDownIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 011.06 0L10 11.94l3.72-3.72a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.22 9.28a.75.75 0 010-1.06z" clipRule="evenodd" />
  </svg>
);