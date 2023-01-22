import React, { useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';
import wordsToNumbers from 'words-to-numbers';
import alanBtn from '@alan-ai/alan-sdk-web';


// import React from 'react';
// import Footer from './components/Footer';
// function roy() {
//   return (
//      <Footer />
//   );
// }
// export default roy;


import logo from './images/neer.jpg';
import { NewsCards, Modal } from './components';
import useStyles from './styles';

const App = () => {
  const [activeArticle, setActiveArticle] = useState(0);
  const [newsArticles, setNewsArticles] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const classes = useStyles(); 

  useEffect(() => {
    alanBtn({
      key: 'f5e8e6ac47fdd75052111ef97f66226d2e956eca572e1d8b807a3e2338fdd0dc/stage',
      onCommand: ({ command, articles, number}) => {
        console.log(typeof(number), "YES")
        if (command === 'newHeadlines') {
          setNewsArticles(articles);
          setActiveArticle(-1);
        } else if (command === 'instructions') {
          setIsOpen(true);
        } else if (command === 'highlight') {
          setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
        } else if (command === 'open') {
          const parsedNumber = number.length > 2 ? wordsToNumbers((number), { fuzzy: true }) : number;
          const article =  articles && !articles[parsedNumber - 1];                 //yeha par articles && add

          if (parsedNumber > articles && ! articles.length) {
            alanBtn().playText('Please try that again...');
          } else if (article) {
            window.open(article.url, '_blank');
            alanBtn().playText('Opening...');
          } else {
            alanBtn().playText('Please try that again...');
          }
        }
      },
    });
  }, []);

  return (
    <div>
      <div className={classes.logoContainer}>
        {newsArticles && newsArticles.length ? (
          <div className={classes.infoContainer}>
            <div className={classes.card}><Typography variant="h5" component="h2">Try saying: <br /><br />Open article number [4]</Typography></div>
            <div className={classes.card}><Typography variant="h5" component="h2">Try saying: <br /><br />Go back</Typography></div>
          </div>
        ) : null}
        <img src="https://repository-images.githubusercontent.com/212056464/449b4200-fa89-11e9-965f-cd3b62b3708b" className={classes.alanLogo} alt="logo" />
      </div>
      <NewsCards articles={newsArticles} activeArticle={activeArticle} />
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} />
      {newsArticles && !newsArticles.length ? (
        <div className={classes.footer}>
          <Typography variant="body1" component="h2">
            Created by
            <a className={classes.link} href="http://www.linkedin.com/in/neeraj-kumar-25b3001a5"> NEERAJ ROY</a> -
            <a className={classes.link} href="https://www.instagram.com/neerajroy7068">INSTA</a>
          </Typography>
          <img className={classes.image} src={logo} height="80px"  background-color=' yellow' alt="ROY" />
        </div>
      ) : null}
    </div>
  );
};

export default App;
