import React, { Component } from "react";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';


function Home(props){

  let history = useHistory();

  const handleClick = async () => {
    await props.querySearch();
    history.push('/search');
  }

  {/* [ ] xyz!_review added handleEnterKey method to wait for enter key */}
  const handleEnterKey = async (e) => {
    console.log(e.keyCode);
    if (e.keyCode === 13) {
      await props.querySearch();
      history.push('/search');
    }
  }

  const { query, updateQuery, querySearch } = props;

  return(
      <div className="home-div">
        {/* <div className="home-logo"><img src="../movienitelogo.png"></img></div> */}
        <div id="movie-logo-png">
            <img src="../movie-logo.png"></img>
        </div>
        <div className="home-logo moogle-logo">
          <span className="moogle-blue">M</span>
          <span className="moogle-red">o</span>
          <span className="moogle-yellow">o</span>
          <span className="moogle-blue">g</span>
          <span className="moogle-green">l</span>
          <span className="moogle-red">e</span>
        </div>
          <div className="home-searchbar">
            {/* [ ] xyz!_review added handleEnterKey */}
            <input onChange={updateQuery} onKeyUp={handleEnterKey} className="search-input" type="text" value={query}></input>
            <button onClick={handleClick} className="SearchButton"><FontAwesomeIcon icon={faSearch} size="1x"/></button>
          </div>
          <div className="small-text">

          </div>
      </div>
  )
  
}

export default Home;