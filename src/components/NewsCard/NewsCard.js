import React from "react";
import { Card, CardActions, CardActionArea,CardContent,CardMedia,Button,Typography } from "@material-ui/core";
import classNames from "classnames";

import useStyles from './style';

const NewsCard = ({article: { description, publishedAt, source, title, url, urlToImage},activeArticle,i}) => {
  const classes=useStyles();
  const [elRefs, setElRefs]=React.useState([]);
  const ScrolltoRef = (ref) => window.scroll(0, ref.current.offsetTop-50);

  React.useEffect(() => {
      setElRefs((refs) => Array(20).fill().map((_, j) => refs[j] || React.createRef()));
  },[]);

  React.useEffect(() => {
      if(i===activeArticle && elRefs[activeArticle]){
         ScrolltoRef(elRefs[activeArticle]);
      }
  },[i,activeArticle,elRefs]);

  return (<Card ref={elRefs[i]} className={classNames(classes.card, activeArticle===i ? classes.activeCard: null)}>
      <CardActionArea href={url} target="_blank">
        <CardMedia className={classes.media} image={urlToImage || "https://media.istockphoto.com/vectors/breaking-news-background-vector-id1264074047?k=20&m=1264074047&s=612x612&w=0&h=uMWPkMBKIIx3NdCbvGkfOY0oYXULdpU_-1ggACLAx7A="}/>
        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary" component="h2">{(new Date(publishedAt)).toDateString()}</Typography>
          <Typography variant="body2" color="textSecondary" component="h2">{source.name}</Typography>
        </div>
        <Typography className={classes.title} gutterBottom variant="h5">{title}</Typography>
        <CardContent>
           <Typography variant="body2" color="textSecondary" component="p">{description}</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.cardActions}>
         <Button size="small" color="primary">Learn More</Button>
         <Typography variant="h5" color="textSecondary">{i+1}</Typography>
      </CardActions>
    </Card>);
}

export default NewsCard;