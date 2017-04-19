import React, { Component } from 'react';

class AddUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
          newUser : {},
          editUser:{},
        }
    }

    static defaultProps = {
        departments: ['Marketting', 'Sales', 'IT']
    }
    saveUser(e) {
      if(this.refs.e_name.value === '') {
        alert('Employee Name is required.');
      } else {
        this.setState({newUser:{
              e_name : this.refs.e_name.value,
              e_email : this.refs.e_email.value,
              e_phone : this.refs.e_phone.value,
              e_department : this.refs.e_department.value,
            }}, function (){
              this.props.addUser(this.state.newUser);
            });
            e.preventDefault();
      }


    }

    render() {
      let departmentOptions = this.props.departments.map(department => {
          return <option key={department} value={department}> {department} </option>
      });

          return (
              <div className="container App">
                  <form id="contact" onSubmit={this.saveUser.bind(this)}>
                  <h3>Employee Registration Form</h3>
                  <fieldset>
                    <input placeholder="Employee Name" ref="e_name" type="text" />
                  </fieldset>
                  <fieldset>
                    <input placeholder="Email Address" ref="e_email" type="email" />
                  </fieldset>
                  <fieldset>
                    <input placeholder="Phone Number" ref="e_phone" type="tel"  />
                  </fieldset>
                  <fieldset>
                    <select ref="e_department">
                        <option key='' value=''> SELECT DEPARTMENT </option>
                        {departmentOptions}
                    </select>
                  </fieldset>
                  <fieldset>
                    <input name="submit" type="submit" id="contact-submit" value="Save" />
                  </fieldset>

                  </form>
                </div>

        );
    }
}

export default AddUser;
