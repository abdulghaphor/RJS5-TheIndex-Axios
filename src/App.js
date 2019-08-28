import React, { Component } from "react";
import axios from "axios";
import authors from "./data.js";

// Components
import Sidebar from "./Sidebar";
import AuthorsList from "./AuthorsList";
import AuthorDetail from "./AuthorDetail";
import Loading from "./Loading";

class App extends Component {
  state = {
    authors: null,
    currentAuthor: null,
    filteredAuthors: authors,
    loading: true
  };
  getAuthors = async () => {
    try {
      let res = await axios.get(
        "https://the-index-api.herokuapp.com/api/authors/"
      );
      await this.setState({
        filteredAuthors: res.data,
        loading: false
      });
    } catch (err) {
      console.error(err);
    }
  };
  componentDidMount() {
    this.getAuthors();
  }
  selectAuthor = async author => {
    try {
      await this.setState({ loading: true });
      let res = await axios.get(
        `https://the-index-api.herokuapp.com/api/authors/${author.id}`
      );
      await this.setState({ currentAuthor: res.data, loading: false });
    } catch (err) {
      console.error(err);
    }
  };

  unselectAuthor = () => this.setState({ currentAuthor: null });

  filterAuthors = query => {
    query = query.toLowerCase();
    let filteredAuthors = authors.filter(author => {
      return `${author.first_name} ${author.last_name}`
        .toLowerCase()
        .includes(query);
    });
    this.setState({ filteredAuthors: filteredAuthors });
  };

  getContentView = () => {
    if (this.state.loading) {
      return <Loading />;
    } else {
      if (this.state.currentAuthor) {
        return <AuthorDetail author={this.state.currentAuthor} />;
      } else {
        return (
          <AuthorsList
            authors={this.state.filteredAuthors}
            selectAuthor={this.selectAuthor}
            filterAuthors={this.filteredAuthors}
          />
        );
      }
    }
  };

  render() {
    return (
      <div id="app" className="container-fluid">
        <div className="row">
          <div className="col-2">
            <Sidebar unselectAuthor={this.unselectAuthor} />
          </div>
          <div className="content col-10">{this.getContentView()}</div>
        </div>
      </div>
    );
  }
}

export default App;
