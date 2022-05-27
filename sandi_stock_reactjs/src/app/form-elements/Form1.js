import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import bsCustomFileInput from 'bs-custom-file-input';

export class BasicElements extends Component {

  state = {
    startDate: new Date(),
    testString: process.env.REACT_APP_TEST_STRING
  };
 
  handleChange = date => {
    this.setState({
      startDate: date
    });
  };

  componentDidMount() {
    bsCustomFileInput.init()
    this.fetchUsers()
    this.postUser()
  }

  async fetchUsers() {
    try {
      const response = await fetch(process.env.REACT_APP_API_URL + "providers");
      const data = await response.json();
      return console.log(data);
    } catch (error) {
      return console.error(error);
    }
  }

  async postUser(){
    const body = { 
      code: 'abc',
      name:'abc', 
      address:'abc',
      email:'abc',
      tax_code:'abc',
      phone:'abc',
      remark:'abc',
    }
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    };
    const response = await fetch(process.env.REACT_APP_API_URL + 'providers/insert', requestOptions);
    const data = await response.json();
    return console.log(data);
  }

  render() {
    return (
      <div>
        <div className="page-header">
          <h3 className="page-title"> Thêm mới nhà cung cấp {this.state.testString}</h3>          
        </div>
        <div className="row">
          <div className="col-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <form className="forms-sample">
                  <Form.Group>
                    <label htmlFor="exampleInputName1">Name</label>
                    <Form.Control type="text" className="form-control" id="exampleInputName1" placeholder="Name" />
                  </Form.Group>
                  <Form.Group>
                    <label htmlFor="exampleInputEmail3">Email address</label>
                    <Form.Control type="email" className="form-control" id="exampleInputEmail3" placeholder="Email" />
                  </Form.Group>
                  <Form.Group>
                    <label htmlFor="exampleInputPassword4">Password</label>
                    <Form.Control type="password" className="form-control" id="exampleInputPassword4" placeholder="Password" />
                    </Form.Group>
                    <Form.Group>
                    <label htmlFor="exampleSelectGender">Gender</label>
                    <select className="form-control" id="exampleSelectGender">
                      <option>Male</option>
                      <option>Female</option>
                    </select>
                  </Form.Group>
                  <Form.Group>
                    <label>File upload</label>
                    <div className="custom-file">
                      <Form.Control type="file" className="form-control visibility-hidden" id="customFileLang" lang="es"/>
                      <label className="custom-file-label" htmlFor="customFileLang">Upload image</label>
                    </div>
                  </Form.Group>
                  <Form.Group>
                    <label htmlFor="exampleInputCity1">City</label>
                    <Form.Control type="text" className="form-control" id="exampleInputCity1" placeholder="Location" />
                  </Form.Group>
                  <Form.Group>
                    <label htmlFor="exampleTextarea1">Textarea</label>
                    <textarea className="form-control" id="exampleTextarea1" rows="4"></textarea>
                  </Form.Group>
                  <button type="submit" className="btn btn-primary mr-2">Submit</button>
                  <button className="btn btn-light">Cancel</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default BasicElements
