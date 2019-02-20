const moment = require('moment')
const fs = require('fs')
let fetch = require('node-fetch')


exports.getListings = async (req, res) => {
  let terms = ["lineup","Lineup","setlist","Setlist",'"Line up']
  let timestamps = ["1550689903", "1546257645", "1514721645", "1483185645", "1451563245","1420027245"]
  let submissions = {}
  for(let j = 0; j<timestamps.length -1 ; j++){
  for(let i=0; i< terms.length; i++){
    let fetchString = `https://api.pushshift.io/reddit/search/submission/?q=${terms[i]}&subreddit=electricdaisycarnival&size=500&before=${timestamps[j]}&after=${timestamps[j + 1]}`
    let response = await fetch(fetchString).then(r => r.json());
    let { data } = response;
    data.forEach(post => {
      if(!submissions[post.id]){
        let {author, id, created_utc, full_link,num_comments, score, title,selftext} = post;
        let postObj = {
          author, 
          id, 
          created_utc, 
          // full_link, 
          num_comments, 
          score, 
          title, 
          selftext
        }

        submissions[post.id] = postObj
      }
    })
  }
}

console.log(Object.keys(submissions).length)
  fs.writeFileSync("lineup_submissions.json", JSON.stringify(submissions),"utf-8", () => {
    console.log("done")
  })

  res.send(submissions)

  
  


}

