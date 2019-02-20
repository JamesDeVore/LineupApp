const moment = require('moment')


let fetch = require('node-fetch')
exports.getListings = async (req, res) => {
  let response = await fetch('https://api.pushshift.io/reddit/search/submission/?q=lineup&subreddit=electricdaisycarnival&size=500').then(r => r.json());
  let{data} = response;
  // while(data.after){
  //   console.log(data.after)
  //   let{after} = data
  //   response = await fetch(`https://www.reddit.com/r/electricdaisycarnival/.json?limit=100&t=all&after=${after}`).then(r => r.json());
  //   let moreLineupPosts = data.children.filter(posts => {
  //     let foundOne = false;
  //     let { data: { title, selftext } } = posts;
  //     terms.forEach(term => {
  //       if (selftext.includes(term) || title.includes(term)) {
  //         foundOne = true;
  //       }
  //     })
  //     return foundOne
  //   })
  //   allPosts = allPosts.concat(moreLineupPosts)
  //   // console.log(response.data)
  //   data = response.data
    
  // }
  let sendObj = {
    totalPosts:data.length,
    data
  }
  data.forEach(post => {
    console.log(moment.unix(post.created_utc).format("MM/DD/YYYY"))
  })
  res.send(sendObj)
}

