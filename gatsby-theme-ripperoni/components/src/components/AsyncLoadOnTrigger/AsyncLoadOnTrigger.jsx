import loadable from '@loadable/component';
import { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';


export const AsyncLoadOnTrigger = ({ children, comp, trigger }) => {
  const [loadedComp, setLoadedComp] = useState(false);

  // async component promise
  const AsyncComp = loadable(comp);

  // component loader (resolves promise)
  const loadAsyncComp = useCallback(async () => {
    const loadedComponent = await AsyncComp.load();
    setLoadedComp(loadedComponent);
  }, [AsyncComp]);

  useEffect(() => {
    if (trigger && !loadedComp) {
      // passed trigger === true, load the asyncComp
      loadAsyncComp();
    }
  }, [trigger, loadedComp]);

  return loadedComp.default
    ? children(loadedComp.default)
    : loadedComp
      ? children(loadedComp)
      : null;
};

AsyncLoadOnTrigger.propTypes = {
  comp: PropTypes.func,
  children: PropTypes.func,
  trigger: PropTypes.bool,
};
