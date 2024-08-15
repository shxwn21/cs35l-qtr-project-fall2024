import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Button, Container } from "reactstrap"

const AccountVerification: React.FunctionComponent = (): JSX.Element => {
  const [firstEmail, setFirstEmail] = useState(false);

  const handleResend = async () => {
    console.log("Email sendarooni");

    try {
      const resource: string = "http://localhost:8000/user/verify";
      const headers: HeadersInit = {
        "Content-Type": "application/json",
      };
      const req: RequestInit = {
        headers: headers,
        method: "GET",
        credentials: "include",
        mode: "cors",
      };

      const response = await fetch(resource, req);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

    } catch (error) {
      console.error('Error during verify:', error);
    }
    // console.log("About to do some navigation up in here");
    // navigate('/verify')
  };

  if (!firstEmail) {
    handleResend();
    setFirstEmail(true);
  }

  console.log("Das yeet");

  return (
    <div className="container-fluid text-dark p-5">
      <div className="container bg-info p-5">
        <h1 className="display-4 fw-bold text-center">Rumeez account verification</h1>
        <Container className="text-center">
          <p className="display-6">
            A verification email has been sent to your email address.<br />
            Please allow up to a minute for it to reach your inbox.<br />
            If you still did not receive it, please press the button below to resend it.
          </p>
          <Button color="danger" size="lg" onClick={handleResend}>Resend email</Button>
        </Container>
      </div>
      <Outlet />
    </div>
  );
}

export default AccountVerification;