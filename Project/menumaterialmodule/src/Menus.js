import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

export default function MenuDemo() {
    const [anchorEl, open] = React.useState(null);
    const [anchorEl2, setmenu] = React.useState(null);


    const handleClick = event => {
        let tag = event.currentTarget.dataset.tag;
        if (tag == "Men") {
            open(event.currentTarget);
        }
        else if (tag == "Women") {
            setmenu(event.currentTarget);
        }
    };

    const handleClose = () => {
       open(null);
       setmenu(null);      
    };    
    return (
        <>
            <AppBar position="static">
                <Toolbar style={{ 'paddingLeft': "600px" }}>
                    Material UI Menu
    </Toolbar>
            </AppBar><br /><br />
            <div>
                <Button aria-controls="Homemenu"
                    aria-haspopup="true" style={{ width: 90 }} >
                    Home
      </Button>
                <Button aria-controls="simple-menu"
                    aria-haspopup="true" onClick={handleClick} style={{ width: 90 }} data-tag="Men">
                    Mens
      </Button>
                <Menu
                    id="Menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    PaperProps={{
                        style: {

                            marginLeft: 20,
                            marginTop: 45

                        }
                    }}
                >
                    <MenuItem onClick={handleClose}>Blazer</MenuItem>
                    <MenuItem onClick={handleClose}>Shots</MenuItem>
                    <MenuItem onClick={handleClose}>Jeans</MenuItem>
                </Menu>
                <Button aria-controls="dummymenu"
                    aria-haspopup="true" onClick={handleClick} style={{ width: 90 }} data-tag="Women">
                    Women
      </Button>
                <Menu
                    id="dummymenu"
                    anchorEl2={anchorEl2}
                    keepMounted
                    open={Boolean(anchorEl2)}
                    onClose={handleClose}
                    PaperProps={{
                        style: {
                            marginLeft: 180,
                            marginTop: 100

                        }
                    }}
                >
                    <MenuItem onClick={handleClose}>Shots</MenuItem>
                    <MenuItem onClick={handleClose}>Jeans</MenuItem>
                </Menu>
            </div>
        </>
    );
}  