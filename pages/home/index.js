import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Header from "../../components/header";
import ListVideo from "../../components/listVideo";
import ShareVideo from "../../components/shareVideo";
import { useAuth } from "../../hooks/useAuth";

function Index() {
  const router = useRouter()
  const { isAuth } = useAuth();

  const renderContent = () => {
    const content = router.query.content
    if (isAuth) {
      switch (content) {
        case 'listing':
          return <ListVideo />
        case 'sharing':
          return <ShareVideo />
        default:
          return <ListVideo />
      }
    } else {
      return;
    }
  }

  return (
    <>
      <Header />
      {renderContent()}
    </>
  );
}

export default Index;
