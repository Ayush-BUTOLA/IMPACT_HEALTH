import React from 'react';
import DotGrid from './backgrounds/DotGrid';

export default function PageBackground({ variant = 'default', showInteractiveDots = true }) {
  switch (variant) {
    case 'school':
      return (
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none select-none">
          {/* Base radiant wash */}
          <div className="absolute top-0 left-0 w-full h-[850px] bg-gradient-to-b from-[#E6FFFA] via-[#F0FDF4] to-[#F4F7FB]" />
          
          {/* Animated glowing orbs */}
          <div className="absolute -top-20 left-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-[#0D9488]/20 via-[#10B981]/25 to-transparent rounded-full filter blur-[100px] animate-ambient-1" />
          <div className="absolute top-80 -right-20 w-[550px] h-[550px] bg-gradient-to-bl from-[#14B8A6]/25 via-[#34D399]/20 to-transparent rounded-full filter blur-[90px] animate-ambient-2" />
          <div className="absolute top-[800px] left-10 w-[500px] h-[500px] bg-gradient-to-r from-[#059669]/15 to-transparent rounded-full filter blur-[110px] animate-ambient-3" />

          {/* Interactive DotGrid */}
          {showInteractiveDots && (
            <div className="absolute inset-0 opacity-40">
              <DotGrid
                dotColor="rgba(13, 148, 136, 0.18)"
                dotActiveColor="rgba(13, 148, 136, 0.75)"
                dotSize={1.5}
                gap={28}
                mouseRadius={140}
              />
            </div>
          )}

          {/* Clean architectural radial grid */}
          <div
            className="absolute inset-0 opacity-25"
            style={{
              backgroundImage: 'radial-gradient(#0D9488 1.2px, transparent 1.2px)',
              backgroundSize: '32px 32px'
            }}
          />
        </div>
      );

    case 'corporate':
      return (
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none select-none">
          {/* Base radiant wash */}
          <div className="absolute top-0 left-0 w-full h-[850px] bg-gradient-to-b from-[#E0F2FE] via-[#F0F9FF] to-[#F4F7FB]" />

          {/* Animated glowing orbs */}
          <div className="absolute -top-20 right-10 w-[650px] h-[650px] bg-gradient-to-bl from-[#0284C7]/25 via-[#38BDF8]/20 to-transparent rounded-full filter blur-[100px] animate-ambient-1" />
          <div className="absolute top-96 -left-20 w-[600px] h-[600px] bg-gradient-to-tr from-[#0369A1]/20 via-[#60A5FA]/20 to-transparent rounded-full filter blur-[95px] animate-ambient-2" />
          
          {/* Interactive DotGrid */}
          {showInteractiveDots && (
            <div className="absolute inset-0 opacity-40">
              <DotGrid
                dotColor="rgba(2, 132, 199, 0.2)"
                dotActiveColor="rgba(2, 132, 199, 0.8)"
                dotSize={1.5}
                gap={32}
                mouseRadius={150}
              />
            </div>
          )}

          {/* Precision Enterprise Grid Lines */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'linear-gradient(to right, rgba(2, 132, 199, 0.3) 1px, transparent 1px), linear-gradient(to bottom, rgba(2, 132, 199, 0.3) 1px, transparent 1px)',
              backgroundSize: '48px 48px'
            }}
          />
        </div>
      );

    case 'patients':
      return (
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none select-none">
          {/* Base radiant wash */}
          <div className="absolute top-0 left-0 w-full h-[850px] bg-gradient-to-b from-[#EBF4FF] via-[#F0F7FF] to-[#F4F7FB]" />

          {/* Animated glowing orbs */}
          <div className="absolute -top-10 left-10 w-[650px] h-[650px] bg-gradient-to-br from-[#0066FF]/22 via-[#38BDF8]/25 to-transparent rounded-full filter blur-[100px] animate-ambient-1" />
          <div className="absolute top-80 right-10 w-[550px] h-[550px] bg-gradient-to-tl from-[#818CF8]/20 via-[#60A5FA]/20 to-transparent rounded-full filter blur-[90px] animate-ambient-2" />
          
          {/* Interactive DotGrid */}
          {showInteractiveDots && (
            <div className="absolute inset-0 opacity-40">
              <DotGrid
                dotColor="rgba(0, 102, 255, 0.2)"
                dotActiveColor="rgba(0, 102, 255, 0.85)"
                dotSize={1.6}
                gap={26}
                mouseRadius={130}
              />
            </div>
          )}

          {/* Soft Dot Matrix */}
          <div
            className="absolute inset-0 opacity-25"
            style={{
              backgroundImage: 'radial-gradient(#0066FF 1.3px, transparent 1.3px)',
              backgroundSize: '28px 28px'
            }}
          />
        </div>
      );

    case 'practitioners':
      return (
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none select-none">
          {/* Base radiant wash */}
          <div className="absolute top-0 left-0 w-full h-[850px] bg-gradient-to-b from-[#EEF2FF] via-[#FAF5FF] to-[#F4F7FB]" />

          {/* Animated glowing orbs */}
          <div className="absolute -top-20 right-1/4 w-[600px] h-[600px] bg-gradient-to-b from-[#6366F1]/25 via-[#8B5CF6]/20 to-transparent rounded-full filter blur-[100px] animate-ambient-1" />
          <div className="absolute top-80 left-10 w-[500px] h-[500px] bg-gradient-to-tr from-[#4F46E5]/20 via-[#3B82F6]/20 to-transparent rounded-full filter blur-[90px] animate-ambient-2" />
          
          {/* Interactive DotGrid */}
          {showInteractiveDots && (
            <div className="absolute inset-0 opacity-40">
              <DotGrid
                dotColor="rgba(99, 102, 241, 0.2)"
                dotActiveColor="rgba(99, 102, 241, 0.85)"
                dotSize={1.5}
                gap={28}
                mouseRadius={140}
              />
            </div>
          )}

          {/* Medical Clinical Grid */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'radial-gradient(#4F46E5 1.2px, transparent 1.2px)',
              backgroundSize: '24px 24px'
            }}
          />
        </div>
      );

    case 'about':
      return (
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none select-none">
          {/* Base radiant wash */}
          <div className="absolute top-0 left-0 w-full h-[800px] bg-gradient-to-b from-[#F1F5F9] via-[#E2E8F0]/40 to-[#F4F7FB]" />

          {/* Animated glowing orbs */}
          <div className="absolute top-10 right-10 w-[600px] h-[600px] bg-gradient-to-bl from-[#0066FF]/15 via-[#0B132B]/10 to-transparent rounded-full filter blur-[110px] animate-ambient-1" />
          <div className="absolute top-96 left-10 w-[500px] h-[500px] bg-gradient-to-tr from-[#0D9488]/15 via-[#38BDF8]/15 to-transparent rounded-full filter blur-[95px] animate-ambient-2" />

          {/* Interactive DotGrid */}
          {showInteractiveDots && (
            <div className="absolute inset-0 opacity-30">
              <DotGrid
                dotColor="rgba(11, 19, 43, 0.15)"
                dotActiveColor="rgba(0, 102, 255, 0.7)"
                dotSize={1.4}
                gap={30}
                mouseRadius={130}
              />
            </div>
          )}

          {/* Institutional Grid */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'radial-gradient(#0B132B 1.2px, transparent 1.2px)',
              backgroundSize: '32px 32px'
            }}
          />
        </div>
      );

    case 'contact':
      return (
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none select-none">
          {/* Base radiant wash */}
          <div className="absolute top-0 left-0 w-full h-[800px] bg-gradient-to-b from-[#EBF3FC] via-[#F1F5F9] to-[#F4F7FB]" />

          {/* Animated glowing orbs */}
          <div className="absolute top-0 left-1/3 w-[650px] h-[650px] bg-gradient-to-br from-[#0066FF]/20 via-[#38BDF8]/20 to-transparent rounded-full filter blur-[100px] animate-ambient-1" />
          <div className="absolute top-72 right-10 w-[500px] h-[500px] bg-gradient-to-tl from-[#0D9488]/18 to-transparent rounded-full filter blur-[90px] animate-ambient-2" />

          {/* Interactive DotGrid */}
          {showInteractiveDots && (
            <div className="absolute inset-0 opacity-35">
              <DotGrid
                dotColor="rgba(0, 102, 255, 0.18)"
                dotActiveColor="rgba(0, 102, 255, 0.75)"
                dotSize={1.5}
                gap={28}
                mouseRadius={130}
              />
            </div>
          )}
        </div>
      );

    default:
      return (
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none select-none">
          {/* Base radiant wash */}
          <div className="absolute top-0 left-0 w-full h-[900px] bg-gradient-to-b from-[#EBF4FF] via-[#F0FDF4]/50 to-[#F4F7FB]" />

          {/* Animated glowing orbs */}
          <div className="absolute -top-20 right-10 w-[700px] h-[700px] bg-gradient-to-bl from-[#0066FF]/22 via-[#38BDF8]/22 to-transparent rounded-full filter blur-[110px] animate-ambient-1" />
          <div className="absolute top-96 -left-10 w-[600px] h-[600px] bg-gradient-to-tr from-[#0D9488]/20 via-[#34D399]/18 to-transparent rounded-full filter blur-[100px] animate-ambient-2" />
          <div className="absolute top-[1200px] right-20 w-[550px] h-[550px] bg-gradient-to-l from-[#6366F1]/15 to-transparent rounded-full filter blur-[120px] animate-ambient-3" />

          {/* Interactive DotGrid */}
          {showInteractiveDots && (
            <div className="absolute inset-0 opacity-35">
              <DotGrid
                dotColor="rgba(0, 102, 255, 0.18)"
                dotActiveColor="rgba(0, 102, 255, 0.75)"
                dotSize={1.5}
                gap={30}
                mouseRadius={140}
              />
            </div>
          )}

          {/* Medical Blueprint Grid */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'radial-gradient(#0066FF 1.2px, transparent 1.2px)',
              backgroundSize: '32px 32px'
            }}
          />
        </div>
      );
  }
}
