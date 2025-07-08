
import { useState, useCallback } from 'react';

export interface ModalState {
  [key: string]: boolean;
}

export const useModalManager = (initialState: ModalState = {}) => {
  const [modals, setModals] = useState<ModalState>(initialState);

  const openModal = useCallback((modalName: string) => {
    setModals(prev => ({ ...prev, [modalName]: true }));
  }, []);

  const closeModal = useCallback((modalName: string) => {
    setModals(prev => ({ ...prev, [modalName]: false }));
  }, []);

  const toggleModal = useCallback((modalName: string) => {
    setModals(prev => ({ ...prev, [modalName]: !prev[modalName] }));
  }, []);

  const isOpen = useCallback((modalName: string) => {
    return modals[modalName] || false;
  }, [modals]);

  return {
    modals,
    openModal,
    closeModal,
    toggleModal,
    isOpen
  };
};
