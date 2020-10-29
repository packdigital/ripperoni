import { useCustomerContext } from '../context/CustomerContext';

export const useCustomer = () => {
  const { customer } = useCustomerContext();

  return customer;
};
