import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from './Home'
import Bert from './Bert'
import Electra from './Electra'
import { Nav, Navbar } from 'react-bootstrap';
import '../style/custom.scss'

function App() {
    return (
        <div className="App">
            <Router>
                <div>
                    <header className="head">
                        <Navbar className="color-nav" expand="lg">
                            <Link className="logo"  to="/">ENELPİ</Link>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="header_user">
                                    <Link className="home" to="/">HOME</Link>
                                    <Link className="home" to="bert">BERT</Link>
                                    <Link className="home" to="electra">ELECTRA</Link>
                                </Nav>
                            </Navbar.Collapse>
                        </Navbar>
                    </header>
                    <Switch>

                        <Route path="/bert"> <BertModel /></Route>

                        <Route path="/electra"> <ElectraModel /> </Route>

                        <Route path="/"> <Main /> </Route>
                    </Switch>
                </div>
            </Router>
        </div>
    );
}

function Main() {
    return <Home />
}

function BertModel() {
    return <Bert />
}

function ElectraModel() {
    return <Electra />
}

export default App;
