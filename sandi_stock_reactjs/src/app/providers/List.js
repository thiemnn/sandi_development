import React, { Component } from 'react'
import { Form } from 'react-bootstrap';

export default class List extends Component {
  state = {
    message: "",
    code:"",
    items: []
  }

  updateMessage(event) {
    this.setState({
      message: event.target.value
    });
  }
  updateCode(event) {
    this.setState({
      code: event.target.value
    });
  }

  handleClick() {
    var items = this.state.items;
    items.push({'message':this.state.message,'code':this.state.code});
    this.setState({
      items: items,
      message: "",
      code: ""
    });
  }

  handleItemMessageChanged(i, event) {
    var items = this.state.items;
    items[i].message  = event.target.value;

    this.setState({
      items: items
    });
  }

  handleItemCodeChanged(i, event) {
    var items = this.state.items;
    items[i].code  = event.target.value;

    this.setState({
      items: items
    });
  }

  handleItemDeleted(i) {
    var items = this.state.items;

    items.splice(i, 1);

    this.setState({
      items: items
    });
  }

  renderRows() {
    var context = this;

    return  this.state.items.map(function(o, i) {
              return (
                <tr key={"item-" + i}>
                  <td>
                    <input
                      type="text"
                      value={o.message}
                      onChange={context.handleItemMessageChanged.bind(context, i)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={o.code}
                      onChange={context.handleItemCodeChanged.bind(context, i)}
                    />
                  </td>
                  <td>
                    <button
                      onClick={context.handleItemDeleted.bind(context, i)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            });
  }

  render() {
    return (
      <div>
        <table className="">
          <thead>
            <tr>
              <th>
                Item 1
              </th>
              <th>
                Item 2
              </th>
              <th>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {this.renderRows()}
          </tbody>
        </table>
        <hr/>
        <input
          type="text"
          value={this.state.message}
          onChange={this.updateMessage.bind(this)}
        />
        <input
          type="text"
          value={this.state.code}
          onChange={this.updateCode.bind(this)}
        />
        <button
          onClick={this.handleClick.bind(this)}
        >
          Add Item
        </button>

        
        <div className="col-lg-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th> STT </th>
                        <th> Họ và tên </th>                        
                        <th> Chức vụ </th>
                        <th> Điện thoại </th>
                        <th> Email </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td> 1 </td>
                        <td> 
                          <Form.Control type="text" className="form-control" id="name" placeholder="" /> 
                        </td>
                        <td>
                          <Form.Control type="text" className="form-control" id="name" placeholder="" />
                        </td>
                        <td>
                          <Form.Control type="text" className="form-control" id="name" placeholder="" />
                        </td>
                        <td>
                          <Form.Control type="text" className="form-control" id="name" placeholder="" />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
      </div>
    );
  }
}