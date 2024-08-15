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


const PasswordReset: React.FunctionComponent = (): JSX.Element => {
  const [sent, setSent] = useState(false);
  const [valid, setValid] = useState(true);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setSent(true);
    const resource: string = "http://localhost:8000/user/passwordreset";
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };
    const req: RequestInit = {
      headers: headers,
      method: "POST",
      credentials: "include",
      mode: "cors",
      body: JSON.stringify({
        curPassword: oldPassword,
        newPassword: newPassword
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
      }, 1000);
    }).catch((err: any) => {
      console.log("Error: " + JSON.stringify(err));
      setTimeout(function () {
        setValid(false);
        setSent(false);
      }, 1000);
      // setTimeout(function () {
      //   setSent(false);
      // }, 1500);
    });
  };

  return (
    <div className='d-flex justify-content-center'>
      <div className="position-absolute top-50 start-50 translate-middle">
        {!sent ?
          <Card color="dark" outline style={{ width: '36rem' }}>
            <CardHeader>Rumeez Password Reset</CardHeader>
            <CardBody>
              <CardText>
                Please submit a new password
              </CardText>
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label for="password">Old password</Label>
                  <Input
                    required
                    type="password"
                    name="password"
                    placeholder="Old password"
                    onChange={(e) => {
                      setOldPassword(e.target.value);
                    }}
                  />
                  <Label for="password">New password</Label>
                  <Input
                    required
                    type="password"
                    name="password"
                    placeholder="New password"
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                    }}
                  />
                </FormGroup>
                <Button type="submit" value="submit" color="primary">
                  Send
                </Button>
              </Form>
              {!valid ? <CardText className="mt-2" style={{color: 'red'}}>Invalid password!</CardText>: <></>}
            </CardBody>
          </Card>
          :
          <div>
            <Spinner style={{ justifyContent: 'center', alignItems: 'center' }} className="position-absolute top-50"></Spinner>
          </div>
        }
      </div>
    </div>
  );
}

export default PasswordReset;
