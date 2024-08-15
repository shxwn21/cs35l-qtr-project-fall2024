import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardText,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Spinner,
} from "reactstrap";


const RecoveryToken: React.FunctionComponent = (): JSX.Element => {
  const rtoken = window.location.pathname.substring(10, window.location.pathname.length);
  const [sent, setSent] = useState(false);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setSent(true);
    const resource: string = "http://localhost:8000/user/accountrecovery/confirm";
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${rtoken}`
    };
    const req: RequestInit = {
      headers: headers,
      method: "POST",
      credentials: "include",
      mode: "cors",
      body: JSON.stringify({
        newPassword: password
      })
    };

    console.log("fetching");
    fetch(resource, req).then((response: Response) => {
      if (response.status !== 200) {
        console.log("Nyoom");
        return Promise.reject("No bueno");
      }

      setTimeout(function () {
        navigate('/home');
      }, 1500);
    }).catch((err: any) => {
      console.log("Error: " + JSON.stringify(err));
      // setTimeout(function () {
      //   setSent(false);
      // }, 1500);
    });
  };

  console.log("rtoken: " + rtoken);

  return (
    <div className='d-flex justify-content-center'>
      <div className="position-absolute top-50 start-50 translate-middle">
        {!sent ?
          <Card color="dark" outline style={{ width: '36rem' }}>
            <CardHeader>Rumeez Account Recovery</CardHeader>
            <CardBody>
              {/* <CardTitle tag="h5">Login Form</CardTitle> */}
              <CardText>
                Please submit a new password
              </CardText>
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label for="password">Password</Label>
                  <Input
                    required
                    type="password"
                    name="password"
                    placeholder="New password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </FormGroup>
                <Button type="submit" value="submit" color="primary">
                  Send
                </Button>
              </Form>
            </CardBody>
          </Card>
          :
          <div>
            <p>Redirecting...</p>
          <Spinner style={{ justifyContent: 'center', alignItems: 'center' }} className="position-absolute top-50"></Spinner>
          </div>
        }
      </div>
    </div>
  );
}

export default RecoveryToken;
