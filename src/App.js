import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css';
function App() {
  const [clubs, setClubs] = useState([])
  useEffect(
    function init() {
    const favoritesIds=localStorage.getItem('favoritesId')
    axios.get('https://www.thesportsdb.com/api/v1/json/1/search_all_teams.php?l=English%20Premier%20League').then(value => { 
      const clubs = value.data.teams.map(({strTeam,strTeamBadge,intFormedYear,idTeam})=>({id:idTeam,name:strTeam,crest:strTeamBadge,yearFounded:intFormedYear,isFavorite:favoritesIds?favoritesIds.includes(idTeam):false}))      
      setClubs(clubs)
    }).catch(err => console.log(err))
  }, [])
  const handleRemoveAddFavorite = (clubId) => {
    let favoritesId = localStorage.getItem("favoritesId");
    if (!favoritesId)
      favoritesId = ""
    const isFavorite=favoritesId.includes(clubId)
    if (isFavorite)
      favoritesId= favoritesId.replace(","+clubId,'')
    else
      favoritesId += "," + clubId;
    
    setClubs(clubs.map((club) => club.id === clubId ? { ...club, isFavorite: !isFavorite } : club))
    localStorage.setItem('favoritesId', favoritesId)
  }
  return (
    <div className="App">
      <header className="App-header">
        <div className="table-container">
        <div className="titles-container desktop-only">
          <div className="title favorite">Favorite</div>
          <div className="title">Crest</div>
          <div className="title name">Name</div>
          <div className="title">Year founded</div>
        </div>
        <div className="clubs-container">
        {
            clubs.map(club => (
              <div onClick={()=>{handleRemoveAddFavorite(club.id)}} className="club-container">
                <div className={`data-container  `}>{club.isFavorite?<i class="fas fa-star"></i>:<i class="far fa-star"></i>}</div>
                <img src={`${club.crest}`} className="data-container crest"></img>
                <div className="attributes-container">
                <div className="data-container name">{club.name}</div>
                <div className="data-container founded"><span className="mobile-only"> Founded on - </span> {club.yearFounded}</div>
                </div>
                </div>))
          }
          
          </div>
          </div>
      </header>
    </div>
  );
}

export default App;
