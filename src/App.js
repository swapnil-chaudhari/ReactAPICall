import React, { Component } from 'react';
import Users from './components/Users';
import AddUser from './components/AddUser';
import EditUser from './components/EditUser';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message:'',
            showAddUserForm : false,
            isEditMode : false,
            editUserData:{},
            users : [],
        }
    }

    componentWillMount(){
        this.getUsers();
    }

    getUsers(){
        let endpoint = 'http://localhost/react/demo3/user.php';

        fetch(endpoint)
        .then((response) => { return response.json(); })
        .then((results) => {
            this.setState({users:results});
            console.log(results);
        });
    }

    showAddUserForm() {
        this.setState({ showAddUserForm: true });
    }

    addUser(user) {
        let endpoint = 'http://localhost/react/demo3/user.php';
        fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "text/plain"
            },
           body: JSON.stringify({
               e_name: user.e_name,
               e_email: user.e_email,
               e_phone: user.e_phone,
               e_department: user.e_department,
           })
        }).then(function(response) {
            return response.text();
        }).then(function(response){
            if (response) {
                this.setState({ message: 'User inserted successfully.' });
                this.getUsers();
            } else {
                this.setState({ message: 'Sorry! Something went wrong.' });
            }
        }.bind(this));

        this.setState({isEditMode: false});
        this.setState({ showAddUserForm:false});
    }

    deleteUser(id){
        let endpoint = 'http://localhost/react/demo3/user.php?id='+id;
        fetch(endpoint, {
            method: "DELETE",
            headers: {
                "Content-Type": "text/plain"
            },
            body: JSON.stringify()
        }).then(function(response) {
            return response.text();
        }).then(function(response){
            if (response) {
                this.setState({ message: 'User deleted successfully.' });
                this.getUsers();
            } else {
                this.setState({ message: 'Sorry! Something went wrong.' });
            }
        }.bind(this));
    }

    editUserAction(id){
        let users = this.state.users;
        let index = users.findIndex(x => x.id === id);
        this.setState({editUserData:users[index]});
        this.setState({isEditMode: true});
    }

    editUser(user,id) {
        let endpoint = 'http://localhost/react/demo3/user.php?id='+id;
        fetch(endpoint, {
            method: "PUT",
            headers: {
                "Content-Type": "text/plain"
            },
            body: JSON.stringify({
                e_name: user.e_name,
                e_email: user.e_email,
                e_phone: user.e_phone,
                e_department: user.e_department,
            })
        }).then(function(response) {
            return response.text();
        }).then(function(response){
            if (response) {
                this.setState({ message: 'User updated successfully.' });
                this.getUsers();
            } else {
                this.setState({ message: 'Sorry! Something went wrong.' });
            }
        }.bind(this));

        this.setState({isEditMode: false});
      this.setState({ showAddUserForm:false});
    }

    render() {
        const messageStyle = {
            color : 'white',
            float: 'left',
        }

        return (
            <div className="App">
          	    <div className="container">
                    <h1 style={{color:'white'}}>REST API call from React Js </h1>
          		      <button type="button" onClick={this.showAddUserForm.bind(this)} className="btn btn-primary" style={{margin:20 + 'px', float:'right'}}>Add User</button>
                                { this.state.showAddUserForm === true ?
          		      <AddUser addUser={this.addUser.bind(this)}  /> : null }
                                { this.state.isEditMode === true ?
          		      <EditUser editUser={this.editUser.bind(this)} user={this.state.editUserData} /> : null }
                    <h3 style={messageStyle}>{this.state.message}</h3>
          		      <Users users={this.state.users} onDelete={this.deleteUser.bind(this)} onEdit={this.editUserAction.bind(this)} />
          	    </div>
            </div>

        );
    }
}

export default App;
