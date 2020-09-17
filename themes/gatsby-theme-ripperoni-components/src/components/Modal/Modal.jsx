/** @jsx jsx */
import React from 'react';
import { jsx } from 'theme-ui';
import PropTypes from 'prop-types';
import { AnimatePresence } from 'framer-motion';

import { Box, Overlay } from '@ripperoni/components';
import { useUIContext } from '@ripperoni/core/context/UIContext';


export const Modal = ({modalId, children}) => {
  const { state: uiState, toggleModal } = useUIContext();

  Modal.propTypes = {
    modalId: PropTypes.string.isRequired,
    children: PropTypes.any,
  };

  return (
    <React.Fragment>
      <AnimatePresence>
        {uiState.modal && (
          <Overlay onClick={toggleModal} />
        )}
      </AnimatePresence>

      {
        uiState.modal === modalId ? (
          <Box
            p={8}
            position='fixed'
            top='50%'
            left='50%'
            transform='translate(-50%, -50%)'
            zIndex='2'
            maxWidth='960px'
            width='100%'
          >
            <Box
              onClick={toggleModal}
              display='block'
              fontSize='48px'
              textAlign='right'
              sx={{ cursor: 'pointer' }}
            >
              &times;
            </Box>

            <Box
              bg='white'
              width='100%'
              height='100%'
            >
              {children}
            </Box>
          </Box>
        ) : null
      }
    </React.Fragment>
  );
};
