import { animate } from 'popmotion';
import React from 'react';
import { isMobile } from 'react-device-detect';
import ReactDOM from 'react-dom';

export const useThemeCircularReveal = ({
  buttonRef,
  containerRef,
  reactElement,
  config: { startRadius, endRadius, toggleTheme },
}: {
  containerRef: React.MutableRefObject<HTMLElement>;
  buttonRef: React.MutableRefObject<HTMLElement>;
  reactElement: () => JSX.Element;
  config: {
    startRadius: string;
    endRadius: string;
    toggleTheme: () => void;
  };
}) => {
  React.useEffect(() => {
    const root = document.getElementById('__next');
    let animating = false;
    let clonedElement: HTMLElement | null = null;
    let coordinates: { x: number; y: number } = null;
    const containerElement = containerRef.current;
    const buttonElement = buttonRef.current;

    const clone = (x: number, y: number) => {
      const sharedParent = root.parentElement;

      sharedParent.style.pointerEvents = 'none';

      const newElem = document.createElement('div');
      sharedParent?.insertBefore(newElem, root);
      newElem.style.position = 'absolute';
      newElem.style.top = '0px';
      newElem.style.left = '0px';
      newElem.style.bottom = '0px';
      newElem.style.right = '0px';
      newElem.style.zIndex = '-1';

      ReactDOM.render(reactElement(), newElem, () => {
        toggleTheme();
        coordinates = { x, y };
        containerElement.style.clipPath = `circle(${startRadius} at ${x}px ${y}px)`;
        clonedElement = newElem;
      });
    };

    const removeClone = () => {
      clonedElement?.remove();
      clonedElement = null;
    };

    const move = (x: number, y: number) => {
      containerRef.current.style.clipPath = `circle(${startRadius} at ${x}px ${y}px)`;
      coordinates = { x, y };
    };

    const done = () => {
      root.parentElement.style.pointerEvents = null;
      containerRef.current.style.clipPath = null;
      removeClone();
      animating = false;
    };

    const cancel = () => {
      toggleTheme();
      done();
    };

    const animateClone = (x: number, y: number) => {
      animate({
        from: startRadius,
        to: endRadius,
        duration: 1000,
        onPlay: () => {
          animating = true;
        },
        onUpdate: (val) => {
          containerRef.current.style.clipPath = `circle(${val} at ${x}px ${y}px)`;
        },
        onComplete: () => {
          done();
        },
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (clonedElement && !animating) {
        move(e.clientX, e.clientY);
      }
    };
    const handleMouseEnter = (e: MouseEvent) => {
      if (!clonedElement && !animating) {
        clone(e.clientX, e.clientY);
      }
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (!animating && clonedElement) animateClone(e.clientX, e.clientY);
    };

    const handleMouseUpOnButton = (e: MouseEvent) => {
      handleMouseEnter(e);
      handleMouseUp(e);
    };

    const handleKeydown = (e: KeyboardEvent) => {
      if (!clonedElement || animating) return;
      if (e.key === 'Escape') {
        cancel();
      } else if (e.key === 'Enter') {
        animateClone(coordinates.x, coordinates.y);
      }
    };

    if (isMobile) {
      buttonElement.addEventListener('pointerdown', handleMouseUpOnButton);
    } else {
      buttonElement.addEventListener('mouseenter', handleMouseEnter);
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('keydown', handleKeydown);
    }

    return () => {
      if (isMobile) {
        buttonElement.removeEventListener('pointerdown', handleMouseUpOnButton);
      } else {
        buttonElement.removeEventListener('mouseenter', handleMouseEnter);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('keydown', handleKeydown);
      }
    };
  }, []);
};
