import React, { FC, useState, useRef, useEffect, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import { useSelector } from '../../services/store';

import { TTabMode } from '@utils-types';
import { BurgerIngredientsUI } from '../ui/burger-ingredients';

export const BurgerIngredients: FC = () => {
  const allItems = useSelector((state) => state.ingredients.data);

  const bunItems = allItems.filter(({ type }) => type === 'bun');
  const sauceItems = allItems.filter(({ type }) => type === 'sauce');
  const mainItems = allItems.filter(({ type }) => type === 'main');

  const [activeTab, setActiveTab] = useState<TTabMode>('bun');

  const refBunTitle = useRef<HTMLHeadingElement>(null);
  const refMainTitle = useRef<HTMLHeadingElement>(null);
  const refSauceTitle = useRef<HTMLHeadingElement>(null);

  const [bunSectionRef, bunVisible] = useInView({ threshold: 0 });
  const [mainSectionRef, mainVisible] = useInView({ threshold: 0 });
  const [sauceSectionRef, sauceVisible] = useInView({ threshold: 0 });

  useEffect(() => {
    if (bunVisible) {
      setActiveTab('bun');
    } else if (sauceVisible) {
      setActiveTab('sauce');
    } else if (mainVisible) {
      setActiveTab('main');
    }
  }, [bunVisible, sauceVisible, mainVisible]);

  const handleTabSelect = useCallback((tab: string) => {
    setActiveTab(tab as TTabMode);
    if (tab === 'bun') refBunTitle.current?.scrollIntoView({ behavior: 'smooth' });
    if (tab === 'main') refMainTitle.current?.scrollIntoView({ behavior: 'smooth' });
    if (tab === 'sauce') refSauceTitle.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <BurgerIngredientsUI
      currentTab={activeTab}
      buns={bunItems}
      mains={mainItems}
      sauces={sauceItems}
      titleBunRef={refBunTitle}
      titleMainRef={refMainTitle}
      titleSaucesRef={refSauceTitle}
      bunsRef={bunSectionRef}
      mainsRef={mainSectionRef}
      saucesRef={sauceSectionRef}
      onTabClick={handleTabSelect}
    />
  );
};