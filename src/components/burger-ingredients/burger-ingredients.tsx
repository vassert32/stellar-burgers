import { useState, useRef, useEffect, FC } from 'react';
import { useInView } from 'react-intersection-observer';

import { TTabMode, TIngredient } from '@utils-types';
import { BurgerIngredientsUI } from '../ui/burger-ingredients';

import { useSelector } from '@store';
import { getIngredientsSelector } from '@slices';

export const BurgerIngredients: FC = () => {
  const allIngredients = useSelector(getIngredientsSelector);

  const bunList = allIngredients.filter(item => item.type === 'bun');
  const mainList = allIngredients.filter(item => item.type === 'main');
  const sauceList = allIngredients.filter(item => item.type === 'sauce');

  const [activeTab, setActiveTab] = useState<TTabMode>('bun');

  const headingBun = useRef<HTMLHeadingElement>(null);
  const headingMain = useRef<HTMLHeadingElement>(null);
  const headingSauce = useRef<HTMLHeadingElement>(null);

  const [bunSectionRef, isBunVisible] = useInView({ threshold: 0 });
  const [mainSectionRef, isMainVisible] = useInView({ threshold: 0 });
  const [sauceSectionRef, isSauceVisible] = useInView({ threshold: 0 });

  useEffect(() => {
    if (isBunVisible) setActiveTab('bun');
    else if (isSauceVisible) setActiveTab('sauce');
    else if (isMainVisible) setActiveTab('main');
  }, [isBunVisible, isMainVisible, isSauceVisible]);

  const handleTabSwitch = (tab: string) => {
    setActiveTab(tab as TTabMode);
    if (tab === 'bun') headingBun.current?.scrollIntoView({ behavior: 'smooth' });
    if (tab === 'main') headingMain.current?.scrollIntoView({ behavior: 'smooth' });
    if (tab === 'sauce') headingSauce.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <BurgerIngredientsUI
      currentTab={activeTab}
      buns={bunList}
      mains={mainList}
      sauces={sauceList}
      titleBunRef={headingBun}
      titleMainRef={headingMain}
      titleSaucesRef={headingSauce}
      bunsRef={bunSectionRef}
      mainsRef={mainSectionRef}
      saucesRef={sauceSectionRef}
      onTabClick={handleTabSwitch}
    />
  );
};
