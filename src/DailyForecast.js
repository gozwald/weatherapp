import React from "react";
import "./styles.css";
import { useParams } from "react-router-dom";
import { DateTime } from "luxon";
import { Link } from "react-router-dom";
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider
} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
// import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    maxWidth: 150
  },
  media: {
    height: 100
  }
});

const theme = createMuiTheme({
  props: {
    // Name of the component ⚛️
    MuiButtonBase: {
      // The default props to change
      disableRipple: true // No more ripple, on the whole application 💣!
    }
  }
});

export default function DailyForecast({ results }) {
  const classes = useStyles();
  let { unix } = useParams();
  let newArr = results.filter(result => result.dt === Number(unix))[0];

  const unixConvert = d => {
    return DateTime.fromSeconds(d).toLocaleString({
      weekday: "short",
      month: "2-digit",
      day: "2-digit"
    });
  };

  return (
    <div>
      <Link to={`/${newArr.dt}`}>
        <ThemeProvider theme={theme}>
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={`http://openweathermap.org/img/wn/${
                  newArr.weather[0].icon
                }@2x.png`}
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {unixConvert(newArr.dt)}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  High: {newArr.temp.max} <br />
                  Low: {newArr.temp.min}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </ThemeProvider>
      </Link>
    </div>
  );
}
