import { useEffect, useRef } from "react";
import { useNavigation } from "react-router";
import LoadingBar, { LoadingBarRef } from 'react-top-loading-bar';
const NavigationLoadingBar = () => {
  const navigation = useNavigation();
  const loadingBarRef = useRef<LoadingBarRef>(null);

  useEffect(() => {
    if(navigation.state === 'loading' || navigation.state === 'submitting'){
        loadingBarRef.current?.continuousStart();
    }
    if(navigation.state === 'idle'){
        loadingBarRef.current?.complete();
    }
  }, [navigation.state]);
  return (
    <LoadingBar color="#478CCF" ref={loadingBarRef} height={4 } transitionTime={100}/>
  );
};


export default NavigationLoadingBar