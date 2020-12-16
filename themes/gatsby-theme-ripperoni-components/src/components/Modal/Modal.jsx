/** @jsx jsx */
import React from 'react';
import { jsx } from 'theme-ui';
import PropTypes from 'prop-types';
import { AnimatePresence } from 'framer-motion';

import { useUIContext } from '@ripperoni/core';

import { Box } from '../Box';
import { Overlay } from '../Overlay';

export const Modal = ({ modalId, children }) => {
  const { state: uiState, toggleModal } = useUIContext();

  Modal.propTypes = {
    modalId: PropTypes.string.isRequired,
    children: PropTypes.any,
  };

  return uiState.modal === modalId ? (
    <React.Fragment>
      <AnimatePresence>
        {uiState.modal && <Overlay onClick={toggleModal} />}
      </AnimatePresence>

      <Box
        px='20px'
        py='80px'
        position='fixed'
        top='50%'
        left='50%'
        transform='translate(-50%, -50%)'
        zIndex='2'
        overflowY='scroll'
        maxWidth='960px'
        maxHeight='100vh'
        width='100%'
        sx={{
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '::-webkit-scrollbar': {
            display: 'none',
          },
        }}
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

        <Box bg='white' width='100%' height='100%' zIndex={3}>
          {children}
        </Box>
      </Box>
    </React.Fragment>
  ) : null;
};
