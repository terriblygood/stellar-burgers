import { FC } from 'react';
import styles from './root.module.css';
import { AppHeader } from '@components';
import { ReactElement } from 'react';

export type TRoot = {
  children: ReactElement;
};

export const Root: FC<TRoot> = ({ children }) => (
  <div className={styles.root}>
    <AppHeader />
    {children}
  </div>
);
