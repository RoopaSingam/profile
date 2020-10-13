import React, { Component } from "react";
import "./Portfolio.css";

class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: [],
      loader: true
    };
  }
  componentDidMount() {
    this.getRepos();
  }
  async getRepos() {
    const username = "roopa singam";
    const token = "5d2e44fcd8f618c8eb8d757fa3199add587bb1e4";
    const url = `https://api.github.com/users/roopasingam/repos`;
    // const url1 = `https://source.unsplash.com/random`;
    
    const res = await fetch(url, {
      Authorization: `${username}:${token}`
    });
    const data = await res.json();
    this.setState({ repos: [...data] });
  }

  render() {
    const repos = this.state.repos.map(repo => {
      return (
     
        
<div class="flip-card">
  <div class="flip-card-inner">
    <div class="flip-card-front" >
          <div className="card_item"> 
             
            <h4 style={{ color: "white", fontSize: "1.3em",paddingTop:"10px" }}>
              {/* {Math.random()} */}
              {repo.name.toUpperCase()}
            </h4>
            <p>Last Update: {repo.pushed_at.slice(0, 10)}</p>
            <hr/>
            <p>{repo.description}</p>
              <div >  
          </div>
          </div>

          </div>
          <div class="flip-card-back">
            <hr/>
        <a
              id="projectLinks"
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
            >
             <h4 style={{ color: "rgb(30, 163, 152)", fontSize: "1.3em",paddingTop:"10px" }}> View Code</h4>
            </a>
           
            <hr/>
            {repo.homepage === null ? (
              "No Preview"
            ) : (
              <a
                id="projectLinks"
                target="_blank"
                rel="noopener noreferrer"
                href={repo.homepage}
              >
                Preview
              </a>
            )}
    </div>
          </div>
          </div>
        
      );
    });

    return (
      <section id="portfolio">
          <div className="cards">
      <h1>Veiw My Github Projects</h1>
      <div className="cards__container">
        <div className="cards__wrapper">
          <div className="cards__items">
             {repos}
             </div>
          </div>
          </div>
        </div>
      
      </section>
    );
  }
}

export default Projects;
