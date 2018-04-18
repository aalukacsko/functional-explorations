// This is based on a local mongodb instance that
// has the discogs data collection as sourced from
// here: https://github.com/philipmat/discogs-xml2db

// you will need to install mongoose: 
//    npm i mongoose -S
const mongoose = require('mongoose')
const fs = require('fs')

const genres = [ 'Rock', 'Jazz', 'Classical', 'Electronic', 'Folk, World, & Country' ]
mongoose.connect('mongodb://localhost/discogs')

const Masters = mongoose.model('masters', new mongoose.Schema())
let combined = []

Promise.all(
  genres.map( genre => {

    let match = { genres: { $in: [genre] }, year: { $gt: 1957, $lt: 1973} }

    return new Promise( (resolve, reject) => {
      Masters.aggregate( [{ $match: match }, { $sample: { size: 80 } }], (e, m) => {
        if (e) { console.log(e); reject(e) }
        let fileName = `random_${genre.toLowerCase().replace(/[\,\s\&]/g, '')}.json`
        fs.writeFile(fileName, 
                    JSON.stringify(m, null, 2), 
                    'utf8', e => { 
                      console.log(`wrote ${fileName}`)
                      resolve(m) 
                    })
      })    
    }).then(data => { 
      combined = combined.concat(data)
      console.log(`Merging Data...`)
    }).catch(e => console.log(`Error: ${e}`))
  })
).then(e => {
  fs.writeFile(`random_music.json`, 
    JSON.stringify(combined, null, 2), 
    'utf8', e => { 
      console.log(`wrote random_music.json`)
      console.log(`All done`)
      process.exit()
    })
   } 
).catch(e => { 
    console.log(`Error: ${e}`); 
    process.exit(-1) 
  } )


// example
// {
//   "_id": "5aaeae8d60c1e6aa3876c2c4",
//   "styles": [
//     "Techno"
//   ],
//   "genres": [
//     "Electronic"
//   ],
//   "extraartists": [],
//   "title": "New Soil",
//   "main_release": "155102",
//   "notes": "",
//   "artistJoins": [],
//   "year": 2001,
//   "l_title": "new soil",
//   "anv": "Samuel L",
//   "l_artist": "samuel l session",
//   "artists": [
//     "Samuel L Session"
//   ],
//   "images": [
//     {
//       "width": "600",
//       "uri150": "",
//       "uri": "",
//       "imageType": "primary",
//       "height": "588"
//     }
//   ],
//   "updated_on": "2018-03-18",
//   "artist": "Samuel L Session",
//   "id": 18500,
//   "data_quality": "Correct"
// }