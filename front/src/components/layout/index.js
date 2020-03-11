import React from "react";
import { Alignment, Classes, Navbar, NavbarGroup, NavbarHeading } from "@blueprintjs/core";
import './style.css';

function MensajePage(props) {
    return (
        <React.Fragment>
            <Navbar className={Classes.DARK}>
                <NavbarGroup align={Alignment.LEFT}>
                    <NavbarHeading>Mesaje App</NavbarHeading>
                </NavbarGroup>
            </Navbar>

            <div className="page">
                {props.children}
            </div>

        </React.Fragment>
    )
}

export default MensajePage;