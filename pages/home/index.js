import React from "react";
import Header from "../../components/header";
import ListVideo from "../../components/listVideo";
import { useAuth } from "../../hooks/useAuth";

function Home() {
  const { isAuth } = useAuth();

  const renderContent = () => {
    if (isAuth)
      return <ListVideo />
  }

  return (
    <>
      <Header />
      {renderContent()}
    </>
  );
}

export default Home;
