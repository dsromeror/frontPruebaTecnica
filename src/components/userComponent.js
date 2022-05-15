import React, { Component } from "react";
import UserDataService from "../services/user.service";

export default class User extends Component {
  constructor(props) {
    super(props);
    this.onChangeIdentification = this.onChangeIdentification.bind(this);
    this.onChangeNumber = this.onChangeNumber.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.getUser = this.getUser.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);

    this.state = {
      currentUser: {
        id: null,
        identification: "",
        number: "",
        name: ""
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getUser(this.props.match.params.id);
  }

  onChangeIdentification(e) {
    const identification = e.target.value;

    this.setState(function(prevState) {
      return {
        currentUser: {
          ...prevState.currentUser,
          identification: identification
        }
      };
    });
  }

  onChangeNumber(e) {
    const number = e.target.value;
    
    this.setState(prevState => ({
      currentUser: {
        ...prevState.currentUser,
        number: number
      }
    }));
  }

  onChangeName(e) {
    const name = e.target.value;
    
    this.setState(prevState => ({
      currentUser: {
        ...prevState.currentUser,
        name: name
      }
    }));
  }

  getUser(id) {
    UserDataService.get(id)
      .then(response => {
        this.setState({
          currentUser: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateUser() {
    UserDataService.update(
      this.state.currentUser.id,
      this.state.currentUser
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The user was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteUser() {    
    UserDataService.delete(this.state.currentUser.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/getUsers')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentUser } = this.state;

    return (
      <div>
        {currentUser ? (
          <div className="edit-form">
            <h4>Identification</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Identification</label>
                <input
                  type="text"
                  className="form-control"
                  id="identification"
                  value={currentUser.identification}
                  onChange={this.onChangeIdentification}
                />
              </div>
              <div className="form-group">
                <label htmlFor="number">Number</label>
                <input
                  type="text"
                  className="form-control"
                  id="number"
                  value={currentUser.number}
                  onChange={this.onChangeNumber}
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={currentUser.name}
                  onChange={this.onChangeName}
                />
              </div>
            </form>

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteUser}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateUser}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a User..</p>
          </div>
        )}
      </div>
    );
  }
}
