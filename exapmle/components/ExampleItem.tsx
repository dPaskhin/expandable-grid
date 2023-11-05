import { Box, css, styled } from '@mui/material';
import { FC } from 'react';
import { IExpandableGridItemProps } from '../../src/main';
import { motion } from 'framer-motion';
import { CloseRounded } from '@mui/icons-material';

export const ExampleItem: FC<IExpandableGridItemProps> = ({ onToggle, isExpanded, onClose }) => {
  const variants = {
    shown: { scale: [0.8, 3, 1.8], x: '-100%', y: '100%' },
    hidden: { scale: 0 },
  };

  return (
    <SItem onClick={onToggle}>
      <motion.div
        initial={{ scale: 0 }}
        variants={variants}
        animate={isExpanded ? 'shown' : 'hidden'}
        onClick={(event) => {
          event.stopPropagation();
          onClose();
        }}
      >
        <CloseRounded titleAccess="Collapse item" />
      </motion.div>
    </SItem>
  );
};

const SItem = styled(Box)(
  ({ theme }) => css`
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
    background-color: lightblue;
    border-radius: ${theme.spacing(1)};
    color: ${theme.palette.common.white};
    cursor: pointer;
  `
);
