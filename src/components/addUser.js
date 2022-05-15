import React, { Component } from "react";
import UserDataService from "../services/user.service";

export default class AddUser extends Component {
  constructor(props) {
    super(props);
    this.onChangeIdentification = this.onChangeIdentification.bind(this);
    this.onChangeNumber = this.onChangeNumber.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.saveUser = this.saveUser.bind(this);
    this.newUser = this.newUser.bind(this);

    this.state = {
      id: null,
      identification: "",
      number: "", 
      name: "",

      submitted: false
    };
  }

  onChangeIdentification(e) {
    this.setState({
      identification: e.target.value
    });
  }

  onChangeNumber(e) {
    this.setState({
      number: e.target.value
    });
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  saveUser() {
    var data = {
      identification: this.state.identification,
      number: this.state.number,
      name: this.state.name,
    };

    UserDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          identification: response.data.identification,
          number: response.data.number,
          name: response.data.name,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newUser() {
    this.setState({
      id: null,
      identification: "",
      number: "",
      name: "",

      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newUser}>
              Create
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="identification">Identification</label>
              <input
                type="text"
                className="form-control"
                id="identification"
                required
                value={this.state.identification}
                onChange={this.onChangeIdentification}
                name="identification"
              />
            </div>

            <div className="form-group">
              <label htmlFor="number">Number</label>
              <input
                type="text"
                className="form-control"
                id="number"
                required
                value={this.state.number}
                onChange={this.onChangeNumber}
                name="number"
              />
            </div>

            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                required
                value={this.state.name}
                onChange={this.onChangeName}
                name="name"
              />
            </div>

            <button onClick={this.saveUser} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
