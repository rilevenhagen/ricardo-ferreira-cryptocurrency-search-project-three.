import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import './App.css';
import Footer from './Footer';
import Header from './Header';


function App() {

  const [bitcoin, setBit] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [searchBit, setSearchBit] = useState('');


  const firstUpdate = useRef(true);

  // useEffect(() => {
  //   if (firstUpdate.current) {
  //     firstUpdate.current = false;
  //     return;
  //   }

  //   axios({
  //     method: 'GET',
  //     url: 'https://coingecko.p.rapidapi.com/coins/markets',
  //     params: {
  //       vs_currency: 'usd',
  //       order: 'market_cap_desc',
  //       ids: searchBit,

  //     },
  //     headers: {
  //       'x-rapidapi-host': 'coingecko.p.rapidapi.com',
  //       'x-rapidapi-key': '836053b102mshb0f14f728934a07p13c433jsne14af3cc3797'
  //     }
  //   }).then((response) => {
  //     console.log(response.data);
  //     setBit(response.data);
  //   })
  //     .catch(function (error) {
  //       console.error(error);
  //     })

  // }, [searchBit]);

  const handleInput = (event) => {
    setUserInput(event.target.value);
  }


  const handleSubmit = (event) => {
    event.preventDefault();
    setSearchBit(userInput);
    setUserInput('');
  }


  const [news, setNews] = useState([]);
  const [news2, setNews2] = useState([]);




useEffect(() => {

  axios({
    method: 'GET',
    url: 'https://ny-times-news-titles-and-urls.p.rapidapi.com/news',
    headers: {
      'x-rapidapi-host': 'ny-times-news-titles-and-urls.p.rapidapi.com',
      'x-rapidapi-key': 'ba03013e72msh29791eea6f2075fp118b2ejsn1f7186d6140e'
    }
  }).then(function (response) {
    console.log(response.data.business);
    setNews(response.data.business)
    setNews2(response.data.politics)
  }).catch(function (error) {
    console.error(error);
  });
}, []);




  return (
    <div className='for-img' > 
      <div className="content-container">
      <Header
          handleInput={handleInput}
          handleSubmit={handleSubmit}
          setUserInput={setUserInput}
          userInput={userInput}
      />

      <div>
        {news.map((displayNew) => {
          return(
            <div className='wrapper'>
              <h3>News: {displayNew.title}</h3>
            </div>
          )
        })
        }
      </div>
        <div>
          {news2.map((displayNew) => {
            return (
              <div className='wrapper'>
                <h3>News: {displayNew.title}</h3>
              </div>
            )
          })
          }
        </div>
        <div>
        {bitcoin.map((bit) => {

          return (
            <div className='bit-display'  key={bit.id}>
              <h2>Name of the Coin: {bit.name}</h2>
              <h2>Corrent Price: ${bit.current_price}</h2>
              <h2>Market Cap: {bit.market_cap}</h2>
              <h2>Symbol: {bit.symbol}</h2>
              <img src={bit.image} alt={bit.name} />
            </div>
          )
        })}
      </div>
      </div>
      <Footer />
    </div>

  );
}

export default App;
