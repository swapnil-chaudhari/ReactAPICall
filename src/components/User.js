import React, { Component } from 'react';

class User extends Component {

    deleteUser(id) {
        this.props.onDelete(id);
    }

    editUser(id) {
        this.props.onEdit(id);
    }
    render() {

            return (
              <tr>
                  <td>{this.props.user.e_name}</td>
                  <td>{this.props.user.e_email}</td>
                  <td>{this.props.user.e_phone}</td>
                  <td>{this.props.user.e_department}</td>
                  <td>
                    <a href="#" className="glyphicon glyphicon-pencil" onClick={this.editUser.bind(this, this.props.user.id)}></a>
                    <a href="#" className="glyphicon glyphicon-remove" onClick={this.deleteUser.bind(this, this.props.user.id)}></a>
                  </td>
              </tr>

        );
    }
}

export default User;
