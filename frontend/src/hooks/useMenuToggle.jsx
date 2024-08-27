import { useEffect, useRef, useState } from 'react';

const useMenuToggle = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleRef = useRef(null);
  const controlPanelRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const toggle = toggleRef.current;
    const controlPanel = controlPanelRef.current;
    const body = document.body;

    const handleToggleClick = () => {
      toggle.classList.toggle('active');
      controlPanel.classList.toggle('active');
      body.style.overflow = controlPanel.classList.contains('active') ? 'hidden' : 'visible';
    };

    toggle.addEventListener('click', handleToggleClick);

    const navegacionPanel = document.querySelectorAll('.menupanel');
    navegacionPanel.forEach(panel => {
      panel.addEventListener('click', () => {
        toggle.classList.remove('active');
        controlPanel.classList.remove('active');
        body.style.overflow = 'visible';
      });
    });

    return () => {
      toggle.removeEventListener('click', handleToggleClick);
      navegacionPanel.forEach(panel => {
        panel.removeEventListener('click', () => {
          toggle.classList.remove('active');
          controlPanel.classList.remove('active');
          body.style.overflow = 'visible';
        });
      });
    };
  }, []);

  return { isMenuOpen, setIsMenuOpen, toggleRef, controlPanelRef };
};

export default useMenuToggle;
