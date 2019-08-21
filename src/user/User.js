/*
* Import required
* */
import React from 'react';
import Table from 'react-bootstrap/Table'

/*
* Class User
* All user actions implemented here
* */
class User extends React.Component{

    constructor(props) {
        super(props);
        /*
        * Define state
        * */
        this.state = {
            error: null,
            isLoaded: false,
            users: []
        };
    }

    componentDidMount() {
        this.fetchAllUsers();
    }

    /*
    * Render view
    * */
    render(){
        const { error, isLoaded, users } = this.state;
        if (error) {
            return <div className="App">Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div className="App">Loading...</div>;
        } else {
            return (
                <div className="App text-center">
                    <Table striped bordered hover size="sm" responsive>
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email Id</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.map(item => (
                            <tr key={item.EmailId}>
                                <td>{item.Name}</td>
                                <td> {item.EmailId}</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </div>
            );
        }
    }

    /*
    * Call user service and fetch users
    * */
    fetchAllUsers(){
        fetch("server-api-end-point")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        users: result
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }
}

export default User;
