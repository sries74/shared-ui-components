import { useEffect, RefObject } from 'react';

/**
 * Hook to trap focus within a container element
 * 
 * @param ref - React ref to the container element
 * @param isActive - Whether the focus trap should be active
 * 
 * @example
 * ```tsx
 * const ref = useRef<HTMLDivElement>(null);
 * useFocusTrap(ref, isOpen);
 * ```
 */
export function useFocusTrap(
  ref: RefObject<HTMLElement>,
  isActive: boolean
): void {
  useEffect(() => {
    if (!isActive || !ref.current) {
      return;
    }

    const container = ref.current;
    const focusableElements = container.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') {
        return;
      }

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    // Focus first element when trap is activated
    firstElement?.focus();

    container.addEventListener('keydown', handleTabKey);

    return () => {
      container.removeEventListener('keydown', handleTabKey);
    };
  }, [ref, isActive]);
}

