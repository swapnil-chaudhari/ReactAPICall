import React, { Component } from 'react';
import User from './User';

class Users extends Component {

    deleteUser(id){
        this.props.onDelete(id);
    }

    editUser(id){
        this.props.onEdit(id);
    }

    render() {
        let userList;
            if (this.props.users) {
                userList = this.props.users.map(user => {
                    return <User onDelete={this.deleteUser.bind(this)} onEdit={this.editUser.bind(this)} key={user.e_name} user={user} />
                })
            }

       const tableHeaderStyle = {color : 'black'}
           return (
               <div className="users">
                   <h3 style={tableHeaderStyle}>Latest Users</h3>
                       <table className="table table-striped ">
                           <thead>
                               <tr>
                                  <th>Name</th>
                                  <th>Email</th>
                                  <th>Phone</th>
                                  <th>Department</th>
                                  <th>Action</th>
                              </tr>
                           </thead>
                           <tbody>
                               {userList}
                           </tbody>
                      </table>
              </div>
        );
    }
}

export default Users;
