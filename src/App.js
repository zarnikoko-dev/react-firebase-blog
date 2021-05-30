import React from 'react'
import './App.css';
import {BrowserRouter as Router,Route,withRouter,Switch,NavLink} from 'react-router-dom'
import ShowBlogs from './Components/ShowBlogs'
import AddBlog from './Components/AddBlog'
import Blog from './Components/Blog'
import {Navbar,Nav} from 'react-bootstrap'

function App(props) {
  return (
    <Router>
      <Route render={({location,history})=>(
        <React.Fragment>
          <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#" className="bg-secondary rounded p-1 text-light">
              <i>React Firebase Blog</i>
            </Navbar.Brand>
            <Nav className="ml-auto mr-auto">
              <Nav.Link as={NavLink} to="/" exact>Blogs</Nav.Link>
              <Nav.Link as={NavLink} to="/add-blog" exact>Add Blog</Nav.Link>
            </Nav>
            {/* <Form inline>
              <FormControl type="text" placeholder="Search" className="mr-sm-2" />
              <Button variant="outline-info">Search</Button>
            </Form> */}
          </Navbar>
          <div className="container bg-light mt-2">
            <Switch>
              <Route path="/" exact component={ShowBlogs}/>
              <Route path="/add-blog" exact component={AddBlog}/>
              <Route path="/blog" exact component={Blog}/>
            </Switch>
          </div>
        </React.Fragment>
      )}/>
    </Router>
  );
}

export default withRouter(App);
