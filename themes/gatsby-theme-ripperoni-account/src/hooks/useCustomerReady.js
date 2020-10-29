import { useCustomerContext } from '../context/CustomerContext';

export const useCustomerReady = () => {
  const { customer } = useCustomerContext();

  return customer !== null;
};
