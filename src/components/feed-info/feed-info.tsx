import { FC } from 'react';

import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';
import { useSelector } from '../../services/store';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  /* переменные из стора */
  const { data } = useSelector((state) => state.feeds);
  const ready = getOrders(data.orders, 'done');
  const pending = getOrders(data.orders, 'pending');

  return (
    <FeedInfoUI
      readyOrders={ready}
      pendingOrders={pending}
      feed={{
        total: data.total,
        totalToday: data.totalToday
      }}
    />
  );
};
