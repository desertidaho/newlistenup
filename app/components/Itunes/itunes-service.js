import Song from "../../models/Song.js";

//Private///////////////
let _state = {
  songs: []
}

let _subscribers = {
  songs: []
}

function setState(prop, data) {
  _state[prop] = data
  _subscribers[prop].forEach(fn => fn())
}

//Public///////////////
export default class ItunesService {

  get Songs() {
    return _state.songs
  }

  getMusicByArtist(artist) {
    let url = 'https://itunes.apple.com/search?callback=?&term=' + artist;
    // @ts-ignore
    $.getJSON(url)
      .then(res => {
        let results = res.results.map(s => new Song(s))
        setState('songs', results)
      })
      .catch(err => console.log(err))
  }

  addSubscriber(prop, fn) {
    _subscribers[prop].push(fn)
  }

  showDetails(url) {
    for (let i = 0; i < _state.songs.length; i++) {
      if (_state.songs[i].preview == [url]) {
        document.querySelector('.now-playing-btn').innerHTML = `<a href="${_state.songs[i].track}"  target="_blank"><button class="btn btn-sm btn-light shadow mx-2 my-2 itunes">${_state.songs[i].title} $${_state.songs[i].iprice}</button><button class="btn btn-sm btn-light shadow mx-2 my-2" id="download-album">${_state.songs[i].collection} $${_state.songs[i].price}</button></a><a href="https://commerce.coinbase.com/checkout/156b526b-af9b-4f6c-adc0-74ce1424c84f"><button target="_blank" class="mx-2 my-2 btn btn-sm btn-warning shadow itunes">Donate Bitcoin<i class="ml-2 py-0 fab fa-bitcoin"></i></button></a>`
      }
    }
  }

}