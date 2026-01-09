import { type FC } from "react";

import { MatrixProvider } from "./features/matrix/context";

import { Footer } from "./widgets/Footer";
import { Header } from "./widgets/Header";
import { Main } from "./widgets/Main";

import styles from "./App.module.css";

const App: FC = () => {
  return (
    <div className={styles.app}>
      <Header />
      <MatrixProvider>
        <Main />
      </MatrixProvider>
      <Footer />
    </div>
  );
};

export default App;
