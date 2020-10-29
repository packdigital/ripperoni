import { useMessageBusContext } from '../context/MessageBusContext';

export const useMessageBus = () => {
  const { PubSub } = useMessageBusContext();

  return PubSub;
};
