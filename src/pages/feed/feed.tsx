import React, { FC, useEffect } from 'react';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { useDispatch, useSelector, RootState } from '../../services/store';
import { loadFeed } from '../../services/slices/slice-feeds';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const feedState = useSelector((state: RootState) => state.feed);
  const { list, isFetching, failReason } = feedState;

  useEffect(() => {
    dispatch(loadFeed());
  }, [dispatch]);

  if (failReason) {
    return (
      <p className='text text_type_main-default'>
        Произошла ошибка: {failReason}
      </p>
    );
  }

  return (
    <FeedUI orders={list} handleGetFeeds={() => dispatch(loadFeed())} />
  );
};