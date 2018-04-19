const R = require('ramda')
const albums = require('./random_music.json')

// R.forEach( album => console.log(album), albums)

// 1
const pretty = a => `${a.title} by ${a.artist} from ${a.year} with price: ${a.price}`
// R.forEach( a => console.log(pretty(a)), albums)

// 2
const prettyAlbums = R.map( album => pretty(album), albums)
// console.log(prettyAlbums)

// 3
const setPrice = a => { a.price = 8.88; return a }
const pricedAlbums = R.map( a => setPrice(a), albums)
const prettyPricedAlbums = R.map(a => pretty(a), pricedAlbums)
// console.log(prettyPricedAlbums)

// 4
// const filterYear1962 = a => a.year === 1962
// const albumsFrom1962 = R.filter( filterYear1962, albums )
// const prettyAlbumsFrom1962 = R.map(pretty, albumsFrom1962)
// // console.log(prettyAlbumsFrom1962)

// 5
// const albumsNotFrom1962 = R.reject( filterYear1962, pricedAlbums)
// const prettyAlbumsNotFrom1962 = R.map(pretty, albumsNotFrom1962)
// console.log(prettyAlbumsNotFrom1962)

// 6 
// const filterJazz = a => a.genres[0] === 'Jazz'
// const albumsOfJazz = R.filter( filterJazz, pricedAlbums)
// const prettyJazz = R.map(pretty, albumsOfJazz)
// // console.log(prettyJazz)

//7 
const filterJazz = R.where({genres: R.contains('Jazz')})
// const albumsOfJazz = R.filter( filterJazz, pricedAlbums)
// const prettyJazz = R.map(pretty, albumsOfJazz)
// console.log(prettyJazz)

// 8 
const reducer = (total, album) => total + album.price
const grandTotal = R.reduce(reducer, 0, pricedAlbums)
// console.log(Math.round(grandTotal))

// 9
// const filterYear = (y, a) => a.year === y
// const albumsFrom1962 = R.filter( a => filterYear(1962, a), pricedAlbums )
// const prettyAlbumsFrom1962 = R.map(pretty, albumsFrom1962)
// console.log(prettyAlbumsFrom1962)

// 10
// const filterYear = y => a => a.year === y
// const albumsFrom1962 = R.filter(filterYear(1962), pricedAlbums )
// const prettyAlbumsFrom1962 = R.map(pretty, albumsFrom1962)
// console.log(prettyAlbumsFrom1962)

// 11
// const filterYear = (y, a) => a.year === y
// const filterYear1962 = R.partial(filterYear, [1962])
// const albumsFrom1962 = R.filter(filterYear1962, pricedAlbums )
// const prettyAlbumsFrom1962 = R.map(pretty, albumsFrom1962)
// console.log(prettyAlbumsFrom1962)

// 12
// const filterYear = (y, a) => a.year === y
// const filterYearPartial = y => R.partial(filterYear, [y])
// const albumsFrom1962 = R.filter(filterYearPartial(1962), pricedAlbums )
// const prettyAlbumsFrom1962 = R.map(pretty, albumsFrom1962)
// console.log(prettyAlbumsFrom1962)

// 13
const filterYear = (y, a) => a.year === y
const filterYearCurry = R.curry(filterYear)
// const albumsFrom1962 = R.filter(filterYearCurry(1962), pricedAlbums)
// const prettyAlbumsFrom1962 = R.map(pretty, albumsFrom1962)
// console.log(prettyAlbumsFrom1962)

// 14
const jazzAlbums = R.filter(filterJazz)
const albumsFrom1959 = R.filter(filterYearCurry(1959))
// const prettyJazzAlbums1959 = R.map(pretty, albumsFrom1959)
// console.log(prettyJazzAlbums1959)

// 15
const prettify = R.map(pretty)
// const prettyJazzAlbumsFrom1959 = R.compose(
//   prettify,
//   albumsFrom1959,
//   jazzAlbums
// )

const log = x => {
  console.log(x)
  return x
}

const prettyJazzAlbumsFrom1959 = R.pipe(
  albumsFrom1959,
  log,
  jazzAlbums,
  log,
  prettify
)


console.log(prettyJazzAlbumsFrom1959(pricedAlbums))

