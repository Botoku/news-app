import {gql} from 'graphql-request'
import sortNewsByImage from './sortNewsByImage'
const fetchNews = async (
    category?: Category | string,
    keywords?: string,
    isDynamic?: boolean
) =>{
   const query = gql`  query MyQuery(
    $access_key: String!
    $categories: String!
    $keywords: String
   ) {
    myQuery(
        access_key: $access_key
        categories: $categories
        countries: "us"
        sort: "published_desc"
        keywords: $keywords
        ) {
      pagination {
        count
        limit
        offset
        total
      }
      data {
        author
        category
        country
        description
        image
        language
        published_at
        source
        title
        url
      }
    }
  }`


  const res = await fetch(' https://safsaf.stepzen.net/api/eager-wolf/__graphql', {
    method: 'POST',
    cache: isDynamic ? "no-cache" : "default",
    next: isDynamic ? {revalidate: 0} : {revalidate: 20},
    headers: {
        "Content-Type": "application/json",
        Authorization: `Apikey ${process.env.STEPZEN_API_KEY}`,
    },
    body: JSON.stringify({
        query,
        variables:{
            access_key: process.env.MEDIASTACK_API_KEY,
            categories: category,
            keywords: keywords,
            
        }
    })
  })

  console.log('Loading new data from api for category', category, keywords)

  const newsResponse = await res.json()
    

  const news = sortNewsByImage(newsResponse.data.myQuery)

  return news

}

export default fetchNews

// stepzen import curl "http://api.mediastack.com/v1/news?access_key=73b47284bd7626c7e32cb7055e386e41"