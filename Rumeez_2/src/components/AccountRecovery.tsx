import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  CardText,
  Button
} from "reactstrap";

const AccountRecovery: React.FunctionComponent = (): JSX.Element => {
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState('');

  const sendRequest = () => {
    const resource: string = "http://localhost:8000/user/accountrecovery";
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };
    const req: RequestInit = {
      headers: headers,
      method: "POST",
      credentials: "include",
      mode: "cors",
      body: JSON.stringify({
        email: email
      })
    };
    fetch(resource, req).then((res: Response) => {
      console.log(res.status);
    }).catch((err: Error) => {
      console.log(err);
    });
    setSent(true);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendRequest();
  }

  return (
    <div className='d-flex justify-content-center'>
      <div className="position-absolute top-50 start-50 translate-middle">
        <Card color="dark" outline style={{ width: '36rem' }}>
          <CardHeader>Rumeez Account Recovery</CardHeader>
          {!sent ?
            <CardBody>
              {/* <CardTitle tag="h5">Login Form</CardTitle> */}
              <CardText>
                Please submit your email address, and a recovery link will be sent to you shortly
              </CardText>
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label for="exampleEmail">Email</Label>
                  <Input
                    type="email"
                    name="email"
                    placeholder="jwick@continental.com"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </FormGroup>
                <Button type="submit" value="submit" color="primary">
                  Send
                </Button>
              </Form>
            </CardBody>
            :
            <div>
              <CardBody>
                <CardText>If the email exists, an email will be sent to it shortly</CardText>
                <Button color="primary" onClick={sendRequest}>
                  Re-send
                </Button>
              </CardBody>
            </div>
          }
        </Card>
      </div>
    </div>
  );
}

export default AccountRecovery;