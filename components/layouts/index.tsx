import {FC, ReactNode} from "react";
import Header from '@/components/header/header';

const IndexLayout: FC<{ children: ReactNode }> = ({children}) => {
  return (
    <>
      <header>
        <Header/>
      </header>
      <main className="mt-1">
        {children}
      </main>
    </>
  )
}
export default IndexLayout;
