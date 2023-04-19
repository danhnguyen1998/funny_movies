import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Header from "../../components/header";

function Index() {
  const router = useRouter();

  useEffect(() => {
    
  }, [router]);

  return (
    <>
      <Header />
    </>
  );
}

export default Index;
