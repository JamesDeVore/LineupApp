
exports.getListings = async (req, res) => {
  let posts = await fetch('https://www.reddit.com/r/electricdaisycarnival/top/.json?limit=5');
  console.log(await posts.json())

}