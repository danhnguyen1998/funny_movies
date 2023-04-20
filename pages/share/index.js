import React from "react";
import Header from "../../components/header";
import ShareVideo from "../../components/shareVideo";
import { useAuth } from "../../hooks/useAuth";

function Index() {
  const { isAuth } = useAuth();

  const renderContent = () => {
    if (isAuth)
      return <ShareVideo />
  }

  return (
    <>
      <Header />
      {renderContent()}
    </>
  );
}

export default Index;
