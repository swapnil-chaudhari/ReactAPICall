import React, { Component } from 'react';

class EditUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            editedUser:{},
        }
    }

    static defaultProps = {
        departments: ['Marketting', 'Sales', 'IT']
    }

    updateUser(e) {
        if(this.refs.e_name.value === '') {
            alert('Employee Name is required.');
        } else {
            this.setState({editedUser:{
                e_name : this.refs.e_name.value,
                e_email : this.refs.e_email.value,
                e_phone : this.refs.e_phone.value,
                e_department : this.refs.e_department.value,
            }}, function (){
                this.props.editUser(this.state.editedUser, this.props.user.id);
            });
            e.preventDefault();
      }
    }

    render() {
        let departmentOptions = this.props.departments.map(department => {
        let selected = '';
            if (department === this.props.user.e_department) {
                selected = 'selected';
            }

            return <option selected={selected} key={department} value={department}> {department} </option>
        });

        return (
            <div className="container App">
                <form id="contact" onSubmit={this.updateUser.bind(this)}>
                    <h3>Employee Registration Form</h3>
                    <fieldset>
                        <input placeholder="Employee Name" ref="e_name" defaultValue={this.props.user.e_name} type="text" />
                    </fieldset>
                    <fieldset>
                        <input placeholder="Email Address" ref="e_email" defaultValue={this.props.user.e_email} type="email" />
                    </fieldset>
                    <fieldset>
                        <input placeholder="Phone Number" ref="e_phone" defaultValue={this.props.user.e_phone} type="tel"  />
                    </fieldset>
                    <fieldset>
                        <select ref="e_department">
                            <option key='' defaultValue={this.props.user.e_department}> SELECT DEPARTMENT </option>
                            {departmentOptions}
                        </select>
                  </fieldset>
                  <fieldset>
                      <input name="submit" type="submit" id="contact-submit" value="Update" />
                  </fieldset>
                </form>
            </div>
        );
    }
}

export default EditUser;
