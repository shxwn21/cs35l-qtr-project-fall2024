import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner, Container } from "reactstrap";
import { UserContext } from "../context/user-context";

const VerificationToken: React.FunctionComponent = (): JSX.Element => {
  const vtoken = window.location.pathname.substring(8, window.location.pathname.length);
  const context = useContext(UserContext);
  const [sent, setSent] = useState(false);
  const [valid, setValid] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!sent) {
      setSent(true);
      const resource: string = "http://localhost:8000/user/verify/confirm";
      const headers: HeadersInit = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${vtoken}`
      };
      const req: RequestInit = {
        headers: headers,
        method: "POST",
        credentials: "include",
        mode: "cors",
      };

      console.log("fetching");
      fetch(resource, req).then((response: Response) => {
        if (response.status !== 200) {
          console.log("Nyoom");
          return Promise.reject("No bueno");
        }

        if (context.user.isLoggedIn) {
          context.updateState({
            user: {
              ...context.user,
              verified: true
            },
          });
        }

        setTimeout(function () {
          navigate('/home');
        }, 1500);
      })
      .catch((err: any) => {
        console.log("Error: " + JSON.stringify(err));
        setTimeout(function () {
          setValid(false);
        }, 1500);
      });
    }
  }, [context, navigate, vtoken, sent]);

  console.log("vtoken: " + vtoken);

  return <div className="text-center">
    {valid ?
      <Spinner color="secondary">
        Loading...
      </Spinner>
      :
      <div className="container-fluid text-dark p-5">
        <div className="container bg-danger p-5">
          <h1 className="display-4 fw-bold text-center">Rumeez account verification</h1>
          <Container className="text-center">
            <p className="display-6">
              Verification link is invalid!
            </p>
          </Container>
        </div>
      </div>
    }
  </div>
}

export default VerificationToken;
