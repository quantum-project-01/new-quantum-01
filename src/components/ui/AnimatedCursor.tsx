import React, { useEffect, useState } from 'react';

interface CursorPosition {
  x: number;
  y: number;
}

const AnimatedCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState<CursorPosition>({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    // Force cursor hiding on body and html elements immediately
    document.body.style.cursor = 'none';
    document.documentElement.style.cursor = 'none';
    
    // Hide cursor on all existing elements
    const allElements = document.querySelectorAll('*');
    allElements.forEach((element) => {
      (element as HTMLElement).style.cursor = 'none';
    });
    
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Handle hoverable elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isHoverableElement = target.closest('button, a, input, textarea, select, [role="button"], .cursor-pointer, .hover-effect');
      setIsHovering(!!isHoverableElement);
      
      // Force cursor hiding on the target element
      if (target) {
        target.style.cursor = 'none';
      }
    };

    // Additional cursor hiding for dynamically added elements
    const hideCursorOnNewElements = (mutations: MutationRecord[]) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const element = node as HTMLElement;
              element.style.cursor = 'none';
              // Also hide cursor on all child elements
              const allChildren = element.querySelectorAll('*');
              allChildren.forEach((child) => {
                (child as HTMLElement).style.cursor = 'none';
              });
            }
          });
        }
      });
    };

    // Observer for dynamically added elements
    const observer = new MutationObserver(hideCursorOnNewElements);
    observer.observe(document.body, { childList: true, subtree: true });

    document.addEventListener('mousemove', updateMousePosition);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      document.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
      observer.disconnect();
    };
  }, []);

  // Don't render on mobile devices
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  if (isMobile) return null;

  return (
    <>
      {/* Hide default cursor - More comprehensive approach */}
      <style dangerouslySetInnerHTML={{
        __html: `
          *, *::before, *::after {
            cursor: none !important;
          }
          
          html, body {
            cursor: none !important;
          }
          
          a, button, input, textarea, select, label, 
          [role="button"], [role="link"], [role="menuitem"],
          .cursor-pointer, .hover-effect {
            cursor: none !important;
          }
          
          /* Handle iframe and embedded content */
          iframe, embed, object {
            cursor: none !important;
          }
          
          /* Handle text selection */
          ::selection {
            cursor: none !important;
          }
          
          /* Handle drag and drop */
          [draggable="true"] {
            cursor: none !important;
          }
          
          /* Handle scrollbars */
          ::-webkit-scrollbar {
            cursor: none !important;
          }
          
          /* Handle resize cursors */
          .resize {
            cursor: none !important;
          }
          
          /* Override any inline styles */
          [style*="cursor"] {
            cursor: none !important;
          }
        `
      }} />

      {/* Main Cursor */}
      <div
        className={`fixed pointer-events-none z-[9999] transition-all duration-150 ease-out ${
          isVisible ? 'opacity-100' : 'opacity-0'
        } ${isHovering ? 'scale-150' : 'scale-100'} ${isClicking ? 'scale-75' : ''}`}
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          transform: 'translate(-50%, -50%)',
        }}
      >
        {/* Inner Dot */}
        <div
          className={`w-2 h-2 rounded-full transition-all duration-150 ease-out ${
            isHovering 
              ? 'bg-gradient-to-r from-blue-400 to-purple-400 shadow-lg shadow-blue-400/50' 
              : 'bg-white shadow-sm'
          } ${isClicking ? 'scale-150' : 'scale-100'}`}
        />
      </div>

      {/* Trailing Circle with delay */}
      <div
        className={`fixed pointer-events-none z-[9998] transition-all duration-300 ease-out ${
          isVisible ? 'opacity-60' : 'opacity-0'
        } ${isHovering ? 'scale-125' : 'scale-100'} ${isClicking ? 'scale-90' : ''}`}
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div
          className={`w-8 h-8 rounded-full border-2 transition-all duration-300 ease-out ${
            isHovering 
              ? 'border-blue-400/60 bg-blue-400/10 shadow-lg shadow-blue-400/25' 
              : 'border-white/30 bg-white/5'
          } backdrop-blur-sm`}
        />
      </div>

      {/* Outer Glow Effect */}
      <div
        className={`fixed pointer-events-none z-[9997] transition-all duration-500 ease-out ${
          isVisible ? 'opacity-40' : 'opacity-0'
        } ${isHovering ? 'scale-150' : 'scale-100'}`}
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div
          className={`w-16 h-16 rounded-full transition-all duration-500 ease-out ${
            isHovering 
              ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20' 
              : 'bg-white/10'
          } blur-xl`}
        />
      </div>

      {/* Magnetic Field Effect */}
      {isHovering && (
        <div
          className="fixed pointer-events-none z-[9996] transition-all duration-300 ease-out"
          style={{
            left: mousePosition.x,
            top: mousePosition.y,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-2xl animate-pulse" />
        </div>
      )}

      {/* Ripple Effect on Click */}
      {isClicking && (
        <div
          className="fixed pointer-events-none z-[9994] animate-ping"
          style={{
            left: mousePosition.x,
            top: mousePosition.y,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div className="w-12 h-12 rounded-full border-2 border-blue-400/50 bg-blue-400/10" />
        </div>
      )}
    </>
  );
};

export default AnimatedCursor; 