import React, { useState } from "react";
import { useEffect, useContext } from "react";
import { UserContext } from "../context/user-context";
import getCookie from "../util/getCookie";
import { useNavigate } from "react-router-dom";
import { Spinner } from "reactstrap";

interface Props {
  children: React.ReactNode;
}

const LoginChecker: React.FunctionComponent<Props> = (props: Props): JSX.Element => {
  const context = useContext(UserContext);
  const [checking, setChecking] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (getCookie("token") && !context.user.isLoggedIn) {
      const resource: string = "http://localhost:8000/user/";
      const headers: HeadersInit = {
        "Content-Type": "application/json",
      };
      const req: RequestInit = {
        headers: headers,
        method: "GET",
        credentials: "include",
        mode: "cors",
      };

      fetch(resource, req).then((response: Response) => {
        if (response.status !== 200) {
          return Promise.reject("No bueno");
        }

        return response.json();
      })
        .then((data: any) => {


          
          context.updateState({
            user: {
              isLoggedIn: true,
              firstName: data.firstname, 
              lastName: data.lastname,   
              userId: data.userId,
              email: data.email,
              verified: data.verified,
            },
          });

          setChecking(false);
          // navigate('/home');
        })
        .catch((err: any) => {
          console.log("Expires login credentials");
          setChecking(false);
        })
    } else {
      setChecking(false);
    }
  }, [context, navigate]);

  return <>
    {checking ?
      <Spinner style={{ justifyContent: 'center', alignItems: 'center' }}></Spinner>
      :
      props.children
    }
  </>
}

export default LoginChecker;