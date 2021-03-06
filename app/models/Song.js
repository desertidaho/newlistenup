export default class Song {
    constructor(song) {
        this.title = song.trackName
        this.albumArt = song.artworkUrl60.replace(/60x60/g, "250x250")
        this.artist = song.artistName
        this.collection = song.collectionName
        this.price = song.collectionPrice
        this.iprice = song.trackPrice
        this.preview = song.previewUrl
        this.track = song.trackViewUrl
        this.date = song.releaseDate
    }

    getTemplate() {
        return `
        <div class="col-md-2 my-3">
          <a onclick="app.controllers.itunesCtrl.playSong('${this.preview}')"> 
            <div class="card" style="border: 4px black;">
                <img class="card-img-top img-fluid" src="${this.albumArt}" alt="">
                    <div class="card-body" style="background-color: black; color: white;">
                         <p class="card-title">${this.title}, ${this.collection}, ${this.artist}</p>
                    </div> 
            </div>
          </a>
        </div> 
        `
    }

}