import {createContext} from 'react';
import {useLocalStore, observer, Observer, useLocalObservable} from 'mobx-react-lite';

export const MyContext = createContext(null);

export const AppStateStore = observer((props: any) => {
  const store: any = useLocalObservable(() => (
    {
      showSearch: false,
      get getShowSearch() {
        return this.showSearch;
      },
      setShowSearch(flag: boolean) {
        this.showSearch = flag
      }
    }
  ));
  return (
    <MyContext.Provider value={store}>
      {props.children}
    </MyContext.Provider>
  );
});
