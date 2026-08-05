import { useState, useEffect, useRef } from 'react';
import './Pendulum.css';

const MESSAGES = [
  "REACT - BUILD ONCE, RUN EVERYWHERE!",
  "JAVASCRIPT - THE LANGUAGE THAT POWERS THE WEB",
  "VITE - LIGHTNING FAST. BLAZINGLY MODERN.",
  "CSS ANIMATIONS - BRINGING PIXELS TO LIFE",
  "HOOKS - STATE MANAGEMENT MADE SIMPLE",
  "COMPONENTS - REUSABLE. COMPOSABLE. POWERFUL.",
  "RESPONSIVE DESIGN - FROM MOBILE TO DESKTOP",
  "MODERN WEB DEVELOPMENT AT ITS FINEST",
  "INTERACTIVE EXPERIENCES THAT CAPTIVATE",
];

const Pendulum = () => {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showInstruction, setShowInstruction] = useState(true);
  const [loading, setLoading] = useState(true);
  
  const audioRef = useRef(null);
  const wrapperRef = useRef(null);
  const containerRef = useRef(null);
  const parent1Ref = useRef(null);
  const child1Ref = useRef(null);
  const timerRef = useRef(null);
  
  const dragStateRef = useRef({
    active: false,
    offsetX: 0,
    offsetY: 0
  });
  
  const rotateStateRef = useRef({
    active: false,
    angle: 0,
    rotation: 0,
    startAngle: 0,
    finalAngle: 0,
    center: { x: 0, y: 0 }
  });

  const isTouchDevice = 'ontouchstart' in document.documentElement;
  const R2D = isTouchDevice ? 80 / Math.PI : 100 / Math.PI;

  useEffect(() => {
    const audio = new Audio('/pendulum-audio-effect.mp3');
    audio.loop = true;
    audioRef.current = audio;
    
    audio.addEventListener('loadedmetadata', () => {
      console.log('Audio loaded');
      setLoading(false);
    });

    audio.addEventListener('error', () => {
      console.log('Audio failed to load, continuing anyway');
      setLoading(false);
    });

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const handleDragStart = (e) => {
    if (e.target.closest('.pendulum-child')) return;
    
    const event = isTouchDevice ? e.touches[0] : e;
    const wrapper = wrapperRef.current;
    const rect = wrapper.getBoundingClientRect();
    
    dragStateRef.current = {
      active: true,
      offsetX: event.clientX - rect.left,
      offsetY: event.clientY - rect.top
    };
  };

  const handleDragMove = (e) => {
    if (!dragStateRef.current.active) return;
    e.preventDefault();
    
    const event = isTouchDevice ? e.touches[0] : e;
    const wrapper = wrapperRef.current;
    const container = containerRef.current;
    
    const wRect = wrapper.getBoundingClientRect();
    const cRect = container.getBoundingClientRect();
    
    let x, y;
    const { offsetX, offsetY } = dragStateRef.current;
    
    if (event.clientX - offsetX > cRect.left && 
        event.clientX + wRect.width - cRect.left < cRect.width + offsetX) {
      x = event.clientX - offsetX - cRect.left;
    }
    
    if (event.clientY - offsetY > cRect.top && 
        (isTouchDevice || event.clientY + wRect.height - cRect.top < cRect.height + offsetY)) {
      y = event.clientY - offsetY - cRect.top;
    }
    
    if (x !== undefined) wrapper.style.left = x + 'px';
    if (y !== undefined) wrapper.style.top = y + 'px';
  };

  const handleDragEnd = () => {
    dragStateRef.current.active = false;
    if (wrapperRef.current) {
      wrapperRef.current.style.left = '0px';
      wrapperRef.current.style.top = '0px';
    }
  };

  const handleRotateStart = (e) => {
    e.stopPropagation();
    e.preventDefault();
    
    const event = isTouchDevice ? e.touches[0] : e;
    const child = child1Ref.current;
    const rect = child.getBoundingClientRect();
    
    const center = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    };
    
    const x = event.clientX - center.x;
    const y = event.clientY - center.y;
    const startAngle = R2D * Math.atan2(y, x);
    
    rotateStateRef.current = {
      ...rotateStateRef.current,
      active: true,
      center,
      startAngle
    };
  };

  const handleRotateMove = (e) => {
    if (!rotateStateRef.current.active) return;
    e.preventDefault();
    
    const event = isTouchDevice ? e.touches[0] : e;
    const { center, startAngle, angle } = rotateStateRef.current;
    
    const x = event.clientX - center.x;
    const y = event.clientY - center.y;
    const d = R2D * Math.atan2(y, x);
    const rotation = d - startAngle;
    
    let totalAngle = angle + rotation;
    let finalAngle = totalAngle < 0 ? 0 : totalAngle;
    
    rotateStateRef.current.rotation = rotation;
    rotateStateRef.current.finalAngle = finalAngle;
    
    setShowInstruction(false);
    
    if (parent1Ref.current) {
      parent1Ref.current.style.transform = `rotate(${finalAngle}deg)`;
    }
  };

  const handleRotateEnd = () => {
    const { finalAngle, rotation } = rotateStateRef.current;
    const threshold = isTouchDevice ? 10 : 30;
    
    rotateStateRef.current.active = false;
    rotateStateRef.current.angle += rotation;
    
    if (finalAngle >= threshold) {
      setTimeout(() => {
        if (parent1Ref.current) {
          parent1Ref.current.style.transform = 'rotate(0deg)';
        }
        
        if (audioRef.current) {
          audioRef.current.play().catch(err => {
            console.log('Audio play failed:', err);
          });
        }
        
        setIsAnimating(true);
      }, 200);
      
      changeMessage();
      timerRef.current = setInterval(changeMessage, 650);
    } else {
      resetRotation();
      setShowInstruction(true);
    }
  };

  const resetRotation = () => {
    rotateStateRef.current = {
      active: false,
      angle: 0,
      rotation: 0,
      startAngle: 0,
      finalAngle: 0,
      center: { x: 0, y: 0 }
    };
    
    if (parent1Ref.current) {
      parent1Ref.current.style.transform = 'rotate(0deg)';
    }
  };

  const changeMessage = () => {
    setCurrentMessage(prev => (prev + 1) % MESSAGES.length);
  };

  const stopPendulum = () => {
    if (parent1Ref.current) {
      parent1Ref.current.style.transform = 'rotate(0deg)';
      parent1Ref.current.style.transition = 'transform .10s linear';
    }
    
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    
    setIsAnimating(false);
    resetRotation();
    
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const handleOutsideClick = (e) => {
    if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
      stopPendulum();
    }
  };

  useEffect(() => {
    const handleDocumentMove = (e) => {
      if (dragStateRef.current.active) {
        handleDragMove(e);
      }
      if (rotateStateRef.current.active) {
        handleRotateMove(e);
      }
    };

    const handleDocumentEnd = (e) => {
      if (dragStateRef.current.active) {
        handleDragEnd();
      }
      if (rotateStateRef.current.active) {
        handleRotateEnd();
      }
    };

    if (isTouchDevice) {
      document.addEventListener('touchmove', handleDocumentMove, { passive: false });
      document.addEventListener('touchend', handleDocumentEnd);
    } else {
      document.addEventListener('mousemove', handleDocumentMove);
      document.addEventListener('mouseup', handleDocumentEnd);
    }

    const eventType = isTouchDevice ? 'touchend' : 'click';
    document.addEventListener(eventType, handleOutsideClick);
    
    return () => {
      if (isTouchDevice) {
        document.removeEventListener('touchmove', handleDocumentMove);
        document.removeEventListener('touchend', handleDocumentEnd);
      } else {
        document.removeEventListener('mousemove', handleDocumentMove);
        document.removeEventListener('mouseup', handleDocumentEnd);
      }
      document.removeEventListener(eventType, handleOutsideClick);
    };
  }, []);

  return (
    <>
      <div className="bg-light" id="pendulum" ref={containerRef}>
        <div id="pendulum-container">
          <div 
            id="pendulum-wrapper" 
            ref={wrapperRef}
          >
            <div 
              className={`pendulum-parent pendulum-parent1 ${isAnimating ? 'animate-1' : ''}`}
              id="pendulum-parent1"
              ref={parent1Ref}
              onMouseDown={!isTouchDevice ? handleDragStart : undefined}
              onTouchStart={isTouchDevice ? handleDragStart : undefined}
            >
              {showInstruction && (
                <div id="drag-instruction">
                  <img src="/wwd-instruction.png" alt="Drag instruction" />
                </div>
              )}
              <div 
                id="pendulum-child1" 
                className="pendulum-child"
                ref={child1Ref}
                onMouseDown={!isTouchDevice ? handleRotateStart : undefined}
                onTouchStart={isTouchDevice ? handleRotateStart : undefined}
              >
                <img src="/pendulum-ball-1.png" alt="" className="pendulum-rope" />
              </div>
            </div>
          </div>
          
          <div className="context">
            <div className={`context-wrapper ${isAnimating ? 'animate' : ''}`}>
              <h2 className="context-title">
                {MESSAGES[currentMessage]}
              </h2>
            </div>
          </div>
          
          <div className={`pendulum-parent pendulum-parent2 ${isAnimating ? 'animate-1' : ''}`}>
            <div id="pendulum-child2" className="pendulum-child">
              <img src="/pendulum-ball-1.png" alt="" className="pendulum-rope" />
            </div>
          </div>
        </div>
      </div>

      {loading && (
        <div id="preloader" className="loader show">
          <div className="dot-container">
            <div className="dot dot-1"></div>
            <div className="dot dot-2"></div>
            <div className="dot dot-3"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default Pendulum;
