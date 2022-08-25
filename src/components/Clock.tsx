import { Pause, PlayArrow, Stop } from "@mui/icons-material";
import {
  Typography,
  Card,
  CardContent,
  CardActions,
  IconButton,
} from "@mui/material";
import { ITime } from "../interfaces";

interface Props {
  time: ITime;
  handler: {
    start: () => void;
    pause: () => void;
    stop: () => void;
  };
}

const padWithZero = (value: number) => {
  return value >= 10 ? value : "0" + value;
};

export default function Clock({ time, handler }: Props) {
  const { start, pause, stop } = handler;

  return (
    <Card>
      <CardContent sx={{ textAlign: "center" }}>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          <u>{padWithZero(time.hours)}</u>:<u>{padWithZero(time.minutes)}</u>:
          <u>{padWithZero(time.seconds)}</u>
        </Typography>
      </CardContent>

      <CardActions sx={{ display: "flex", justifyContent: "center" }}>
        <IconButton color="success" onClick={start}>
          <PlayArrow fontSize="large" />
        </IconButton>

        <IconButton color="warning" onClick={pause}>
          <Pause fontSize="large" />
        </IconButton>

        <IconButton color="error" onClick={stop}>
          <Stop fontSize="large" />
        </IconButton>
      </CardActions>
    </Card>
  );
}
