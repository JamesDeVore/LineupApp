let fetch = require('node-fetch')
exports.getListings = async (req, res) => {
  allPosts = [];
  let terms = ["Lineup", "lineup", "line up", "Line up", "setlist", "SetList", "setList","set list", "theme", "when will", "LINEUP"]

  let response = await fetch('https://www.reddit.com/r/electricdaisycarnival/.json?restrict_sr=on&t=all&limit=100&').then(r => r.json());
  let{data} = response;
  let lineupPosts = data.children.filter(posts => {
    let foundOne = false;
    let {data:{title,selftext}} = posts;
    terms.forEach(term => {
      if(selftext.includes(term) || title.includes(term)){
        foundOne = true;
      }
    })
    return foundOne
  })
  allPosts = allPosts.concat(lineupPosts)
  while(data.after){
    let{after} = data
    response = await fetch(`https://www.reddit.com/r/electricdaisycarnival/.json?restrict_sr=on&t=all&limit=100&after=${after}`).then(r => r.json());
    let moreLineupPosts = data.children.filter(posts => {
      let foundOne = false;
      let { data: { title, selftext } } = posts;
      terms.forEach(term => {
        if (selftext.includes(term) || title.includes(term)) {
          foundOne = true;
        }
      })
      return foundOne
    })
    allPosts = allPosts.concat(moreLineupPosts)
    data = response.data
  }
  let sendObj = {
    totalPosts:allPosts.length,
    allPosts
  }
  res.send(sendObj)
}

const _filterFunction = posts => {
    let { data:{selftext,title} } = posts;
    let searchTerms = ["Lineup", "lineup", "Line up", "line up"]
    searchTerms.forEach(term => {
      if(selftext.includes(term) || title.includes(term)){
        return true;
      }
    })
    return false
}
