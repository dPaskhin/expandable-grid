import React, { DetailedHTMLProps, HTMLAttributes } from 'react';
import { CSSTransition } from 'react-transition-group';
import classNames from 'classnames';

import { CloseIcon } from '@common/components/CloseIcon/CloseIcon';
import { useClasses } from '@common/components/ExampleItem/hooks/useClasses';

interface IProps {
  isExpanded: boolean;
  onClose: () => void;
}

export const ExampleItem: React.FC<IProps & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = ({
  isExpanded,
  onClose,
  ...props
}) => {
  const classes = useClasses();

  return (
    <div
      className={classNames(classes.item, {
        [classes.itemExpanded]: isExpanded,
      })}
      {...props}
    >
      <div className={classes.title}>
        {isExpanded ? (
          'I am expanded'
        ) : (
          'I am collapsed'
        )}
      </div>

      <CSSTransition
        in={isExpanded}
        timeout={300}
      >
        <CloseIcon
          onClick={onClose}
          className={classes.close}
        />
      </CSSTransition>
    </div>
  );
};
