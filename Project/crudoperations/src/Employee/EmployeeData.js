import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles, withTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import ApiFun from '../Services/EmployeeService'
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {
    BrowserRouter as Router,
    Link,
    Route,
    Switch,
} from 'react-router-dom';



const controlstyles = theme => ({
    controlsPadding: {
        marginLeft: 30
    },
});

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: "#327ba8",
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);


class EmployeeData extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            id: '',
            name: '',
            email: '',
            created_date: '',
            ProductData: [],
            errors: {
                id: '',
                name: '',
                email: '',
                created_date: ''
            }
        }
        this.handleChange = this.handleChange.bind(this);
        this.getPostData = this.getPostData.bind(this);
        this.getDeleteData = this.getDeleteData.bind(this);
        this.getData = this.getData.bind(this);
        this.getEditData = this.getEditData.bind(this);

    }
    getPostData = () => {
        if (this.validateForm()) {
            if (this.state.id == '') {

                ApiFun.postApi('api/CreateUser', { name: this.state.name, email: this.state.email, createddate: this.state.created_date })
                    .then(response => {
                        this.getData();
                        this.setState({
                            id: '',
                            name: '',
                            email: '',
                            created_date: '',
                            errors: {
                                id: '',
                                name: '',
                                email: '',
                                created_date: ''
                            }
                        });
                        alert("Record has been inserted successfully");
                    }).catch((error) => {
                        alert('failed. Try later!');
                    });
            }
            else {
                ApiFun.updateApi('api/UpdateUser/' + this.state.id,
                    { name: this.state.name, email: this.state.email, createddate: this.state.created_date })
                    .then(response => {
                        this.getData();
                        this.setState({
                            id: '',
                            name: '',
                            email: '',
                            created_date: '',
                            errors: {
                                id: '',
                                name: '',
                                email: '',
                                created_date: ''
                            }
                        });
                        alert("Record has been updated successfully");
                    }).catch((error) => {
                        alert('failed. Try later!');
                    });
            }
        }

    }

    getDeleteData(data) {
        if (window.confirm('Are you sure you wish to delete this item?')) {

            ApiFun.deleteApi('api/DeleteUser/' + data)
                .then(response => {
                    if (response.status == 204) {
                        this.getData();
                        this.setState({
                            id: '',
                            name: '',
                            email: '',
                            created_date: '',
                            errors: {
                                id: '',
                                name: '',
                                email: '',
                                created_date: ''
                            }
                        });
                        alert("Record has been deleted successfully");
                    }
                    else {
                        alert('failed. Try later!');
                    }

                }).catch((error) => {
                    alert('failed. Try later!');
                });
        }

    }

    getEditData(data) {

        ApiFun.editApi('/api/GetUserByid/' + data)
            .then(response => {
                if (response.status == 200) {
                    this.setState({
                        id: response.data.id,
                        name: response.data.name,
                        email: response.data.email,
                        created_date: response.data.createddate,
                        errors: {
                            id: '',
                            name: '',
                            email: '',
                            created_date: ''
                        }
                    });
                }
                else {
                    alert('failed. Try later!');
                }

            }).catch((error) => {
                alert('failed. Try later!');
            });


    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        ApiFun.getApi("/api/GetUser").then(response => {
            this.setState({
                ProductData: response.data
            });

        });
    }
    validateForm() {

        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        if (!this.state.name) {
            formIsValid = false;
            errors.name = "*Please enter name.";
        }
        if (!this.state.email) {
            formIsValid = false;
            errors.email = "*Please enter email.";
        }
        if (this.state.email !== "") {
            if (!this.state.email.
                match(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)) {
                formIsValid = false;
                errors.email = "Email is not valid.";
            }
        }

        if (!this.state.created_date) {
            formIsValid = false;
            errors.created_date = "*Please enter creation date.";
        }
        
        this.setState({
            errors: errors
        });
        return formIsValid;
    }
    handleChange = (e) => {

        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <React.Fragment>
                    <AppBar position="absolute" color="default"
                        style={{ backgroundColor: "#327ba8", color: "white" }} >
                        <Toolbar>
                            <Typography variant="h6" color="inherit" noWrap >
                                Employee Job Portal
          </Typography>
                        </Toolbar>
                    </AppBar><br /><br />
                    <Typography variant="h6" gutterBottom style={{ marginTop: '50px' }}
                        className={classes.controlsPadding}>
                        Employee Information
      </Typography>
                    <Grid container spacing={3} >
                        <Grid item xs={12} sm={4}>

                            <TextField
                                required
                                name="name"
                                label="Full Name"
                                fullWidth
                                value={this.state.name}
                                onChange={this.handleChange} noValidate
                                className={classes.controlsPadding}
                            />
                            <div class="text-danger" style={{ color: "red" }} className={classes.controlsPadding}>
                                {this.state.errors.name}</div>
                        </Grid>
                    </Grid>
                    <Grid container spacing={3} >
                        <Grid item xs={12} sm={4}>
                            <TextField
                                required
                                name="email"
                                label="Email"
                                fullWidth
                                value={this.state.email}
                                onChange={this.handleChange} noValidate
                                className={classes.controlsPadding}
                            />
                            <div class="text-danger" style={{ color: "red" }} className={classes.controlsPadding}>
                                {this.state.errors.email}</div>
                        </Grid>
                    </Grid><br></br>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                required
                                name="created_date"
                                label="Created Date"
                                type="date"
                                defaultValue="2017-05-24"
                                fullWidth
                                noValidate
                                InputLabelProps={{
                                    shrink: true,
                                    style: { fontSize: 22 }
                                }}
                                className={classes.controlsPadding}
                                value={this.state.created_date}
                                onChange={this.handleChange} noValidate

                            />
                               <div class="text-danger" style={{ color: "red" }} className={classes.controlsPadding}>
                                {this.state.errors.created_date}</div>
                        </Grid>
                    </Grid>
                    <br /><br />
                    <Button variant="contained" color="primary"
                        onClick={this.getPostData} className={classes.controlsPadding}>
                        Submit
</Button>
                </React.Fragment>
                <br /><br />
                <TableContainer component={Paper} style={{ width: "700px" }} className={classes.controlsPadding}>
                    <Table className={classes.table} aria-label="customized table">
                        <TableHead>
                            <TableRow>

                                <StyledTableCell align="center">Full Name</StyledTableCell>
                                <StyledTableCell align="center">E-Mail</StyledTableCell>
                                <StyledTableCell align="center">Created Date</StyledTableCell>
                                <StyledTableCell align="center">Edit</StyledTableCell>
                                <StyledTableCell align="center">Delete</StyledTableCell>


                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                this.state.ProductData.map((p, index) => {

                                    return <StyledTableRow >

                                        <StyledTableCell align="center">{p.name}</StyledTableCell>
                                        <StyledTableCell align="center">{p.email}</StyledTableCell>
                                        <StyledTableCell align="center">{p.createddate}</StyledTableCell>
                                        <StyledTableCell align="center">

                                            <Button
                                                onClick={() => this.getEditData(p.id)}
                                                style={{
                                                    background: 'none',
                                                    border: 'none',
                                                    padding: 0,
                                                    cursor: 'pointer'
                                                }}>Edit</Button>


                                        </StyledTableCell>
                                        <StyledTableCell align="center">

                                            <Button
                                                onClick={() => this.getDeleteData(p.id)}
                                                style={{
                                                    background: 'none',
                                                    border: 'none',
                                                    padding: 0,
                                                    cursor: 'pointer'
                                                }}>Delete</Button>


                                        </StyledTableCell>

                                    </StyledTableRow>


                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>

            </div >

        );

    }
}

// export default EmployeeData;
export default withStyles(controlstyles)(EmployeeData)
