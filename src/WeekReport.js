import React from "react";
import "./styles.css";
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
    maxWidth: 145
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

export default function TodayWeather({ day, high, low, icon, utc, global }) {
  const classes = useStyles();

  return (
    <div>
      <Link to={`/${utc}`}>
        <ThemeProvider theme={theme}>
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={`http://openweathermap.org/img/wn/${icon}@2x.png`}
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {day}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  High: {high} <br />
                  Low: {low}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </ThemeProvider>
      </Link>
    </div>
  );
}
