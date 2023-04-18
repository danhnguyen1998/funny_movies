import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function Index() {
  const router = useRouter();

  useEffect(() => {
    
  }, [router]);

  return (
    <>
      <div>Login</div>
    </>
  );
}

export default Index;
