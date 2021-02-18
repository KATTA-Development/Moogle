import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as filledHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as unfilledHeart } from '@fortawesome/free-regular-svg-icons';

class MovieDetails extends Component {

  constructor() {
    super()

      this.state = {
        data: {
          "Title": "",
          "Year": "",
          "Rated": "",
          "Released": "",
          "Runtime": "",
          "Genre": "",
          "Director": "",
          "Writer": "",
          "Actors": "",
          "Plot": "",
          "Language": "",
          "Country": "",
          "Awards": "",
          "Poster": "",
          "Ratings": [
            {
            "Source": "Internet Movie Database",
            "Value": ""
            },
            {
            "Source": "Rotten Tomatoes",
            "Value": ""
            },
            {
            "Source": "Metacritic",
            "Value": ""
            }
          ],
          "Metascore": "",
          "imdbRating": "",
          "imdbVotes": "",
          "imdbID": "",
          "Type": "",
          "DVD": "",
          "BoxOffice": "",
          "Production": "",
          "Website": "",
          "Response": "",
          "trailer": "",
          "movienite_user_rating": ""
        },

        hasBeenLiked: false,
      }

      this.handleSave = this.handleSave.bind(this);
    }

  componentDidMount() {
    //FETCH REQUEST TO BACKEND
    const id = this.props.match.params.id;
    fetch(`/api/select/${id}`, {
      method: 'GET',
      header: {
        'Content-Type': 'application/json; charset="UTF-8"'
      }
     })
      .then((data) => data.json())
      .then(movieData => {
        this.setState(state => {
          return {
            ...state,
            data: { ...movieData, movienite_user_rating: null }
          }
          })
      })

      fetch(`/api/select/exist/${id}`, {
        method: 'GET',
        header: {
          'Content-Type': 'application/json; charset="UTF-8"'
        }
      })
        .then((data) => data.json())
        .then(data => {
          this.setState(state => {
            console.log('hasBeenLiked:', data);
            return {
              ...state,
              hasBeenLiked: data
            }    
          })
        })
  }

async handleSave () {

    const id = this.state.data.imdbID;
    //console.log('payload:', this.state.data)
    const payload = {
      "Title": this.state.data.Title,
      "Rated": this.state.data.Rated,
      "Released": this.state.data.Released,
      "Runtime": this.state.data.Runtime,
      "Genre": this.state.data.Genre,
      "Director": this.state.data.Director,
      "Writer": this.state.data.Writer,
      "Actors": this.state.data.Actors,
      "Plot": this.state.data.Plot,
      "Language": this.state.data.Language,
      "Country": this.state.data.Country,
      "Poster": this.state.data.Poster,
      "imdRating": this.state.data.Ratings[0] ? this.state.data.Ratings[0]["Value"] : 'N/A',
      "rtRating": this.state.data.Ratings[1] ? this.state.data.Ratings[1]["Value"] : 'N/A',
      "mcRating": this.state.data.Ratings[2] ? this.state.data.Ratings[2]["Value"] : 'N/A',
      "imdbRating": this.state.data.imdbRating,
      "imdbID": this.state.data.imdbID,     
      "BoxOffice": this.state.data.BoxOffice,
      "trailer": this.state.data.trailer,
      "movienite_user_rating": this.state.data.movienite_user_rating
    }

    if (!this.state.hasBeenLiked) {
      await fetch('/api/saved/', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
        },
      })
    } else {
      await fetch(`/api/saved/${id}`, {
        method: 'DELETE',
      })
    }

    fetch(`/api/select/exist/${id}`, {
      method: 'GET',
      header: {
        'Content-Type': 'application/json; charset="UTF-8"'
      }
    })
      .then((data) => data.json())
      .then(data => {
        this.setState(state => {
          // console.log('hasBeenLiked:', data);
          return {
            ...state,
            hasBeenLiked: data
          }    
        })
      })
  }


  
  // [ ] have "modal" html
  // [ ] have "modal" css
  onTrailerClick() {
      // get data from state for youtube url
      // use the youtube url to display a trailer
    // on click event, display modal
    // allow user to click / play trailer 
    // ability to click out of and/or close the modal 
  }




  
  render() {
    
    let heart = this.state.hasBeenLiked ? filledHeart : unfilledHeart;
  
    return(
      <div className="MovieDetails">
        {/* start of Modal HTML */}
        <div id="trailer-Modal" className="modal" tabindex="-1" role="dialog">
          <div className="modal-dialog " role="document">
            <div className="modal-content trailer-Modal-transparent">
              <div className="modal-body" id="trailer-Modal-center">
                <iframe 
                        width="560" 
                        height="315"
                        src={`https://www.${this.state.data.trailer}`}
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen="allowfullscreen"
                        mozallowfullscreen="mozallowfullscreen" 
                        msallowfullscreen="msallowfullscreen" 
                        oallowfullscreen="oallowfullscreen" 
                        webkitallowfullscreen="webkitallowfullscreen">
                </iframe>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
        {/* End of Modal HTML */}
        <div className="detail-poster"><img src={this.state.data.Poster}/>
          <div className="trailer-button">
              {/* <button>test</button> */}
              <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#trailer-Modal">Trailer</button>
            </div>
        </div>
        <div className="details">
          <p><label>Title:</label> {this.state.data.Title}</p>
          <p><label>Year:</label> {this.state.data.Year}</p>
          <p><label>Rated:</label> {this.state.data.Rated}</p>
          <p><label>Released:</label> {this.state.data.Released}</p>
          <p><label>Runtime:</label> {this.state.data.Runtime}</p>
          <p><label>Genre:</label> {this.state.data.Genre}</p>
          <p><label>Director:</label> {this.state.data.Director}</p>
          <p><label>Writer:</label> {this.state.data.Writer}</p>
          <p><label>Actors:</label> {this.state.data.Actors}</p>
          <p><label>Plot:</label> {this.state.data.Plot}</p>
          <p><label>Language:</label> {this.state.data.Language}</p>
          <p><label>Country:</label> {this.state.data.Country}</p>
          <p><label>Awards:</label> {this.state.data.Awards}</p>
          <p><label>IMDB Rating:</label> {this.state.data.imdbRating}</p>
          <p><label>Rotten Tomatoes Rating:</label> {this.state.data.Ratings[1] ? this.state.data.Ratings[1]["Value"] : 'N/A'}</p>
          <p><label>Metacritic:</label> {this.state.data.Metascore}</p>
          <p><label>Box Office:</label> {this.state.data.BoxOffice}</p>
          <p><label>Production:</label> {this.state.data.Production}</p>
        </div>
        <div className="like"><span onClick={this.handleSave}><FontAwesomeIcon icon={heart} size="2x"/></span></div>
      </div>
    )
  }
}

export default MovieDetails;
