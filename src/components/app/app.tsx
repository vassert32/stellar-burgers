import { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';

import {
  AppHeader,
  Center,
  IngredientDetails,
  Modal,
  OrderInfo,
  ProtectedRoute
} from '@components';

import { useDispatch, useSelector } from '@store';
import {
  getIngredientsThunk,
  getUserThunk,
  getUserStateSelector
} from '@slices';

import '../../index.css';
import styles from './app.module.css';

const App = () => {
  const dispatchAction = useDispatch();
  const router = useNavigate();
  const location = useLocation();
  const backLocation = location.state?.background;
  const isUserLoading = useSelector(getUserStateSelector).isLoading;

  useEffect(() => {
    dispatchAction(getUserThunk());
    dispatchAction(getIngredientsThunk());
  }, [dispatchAction]);

  const renderModal = (
    path: string,
    title: string,
    content: React.ReactNode,
    onClose: () => void
  ) => (
    <Route
      path={path}
      element={
        <Modal title={title} onClose={onClose}>
          {content}
        </Modal>
      }
    />
  );

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backLocation || location}>
        <Route path="/" element={<ConstructorPage />} />
        <Route
          path="/ingredients/:id"
          element={
            <Center title="Детали ингредиента">
              <IngredientDetails />
            </Center>
          }
        />
        <Route path="/feed" element={<Feed />} />
        <Route
          path="/feed/:number"
          element={
            <Center title={`#${String(location.pathname.match(/\d+/))}`}>
              <OrderInfo />
            </Center>
          }
        />
        <Route element={<ProtectedRoute forAuthorized={false} />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>
        <Route element={<ProtectedRoute forAuthorized />}>
          <Route path="/profile">
            <Route index element={<Profile />} />
            <Route path="orders" element={<ProfileOrders />} />
            <Route
              path="orders/:number"
              element={
                <Center title={`#${String(location.pathname.match(/\d+/))}`}>
                  <OrderInfo />
                </Center>
              }
            />
          </Route>
        </Route>
        <Route path="*" element={<NotFound404 />} />
      </Routes>

      {backLocation && (
        <Routes>
          {renderModal('/feed/:number', `#${String(location.pathname.match(/\d+/))}`, <OrderInfo />, () => router(-1))}
          {renderModal('/ingredients/:id', 'Детали ингредиента', <IngredientDetails />, () => router(-1))}
          <Route element={<ProtectedRoute forAuthorized />}>
            {renderModal(
              '/profile/orders/:number',
              `#${String(location.pathname.match(/\d+/))}`,
              <OrderInfo />,
              () => router('/profile/orders')
            )}
          </Route>
        </Routes>
      )}
    </div>
  );
};

export default App;
