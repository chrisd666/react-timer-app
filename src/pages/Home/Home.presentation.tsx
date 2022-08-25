import { Container, Paper, Divider } from "@mui/material";
import Clock from "../../components/Clock";
import InputForm from "../../components/InputForm";
import { StatusEnum } from "../../enums";
import { ITime } from "../../interfaces";

interface Props {
  state: {
    time: ITime;
    status: StatusEnum;
  };
  handler: {
    start: () => void;
    pause: () => void;
    stop: () => void;
    handleSubmit: (values: ITime) => void;
  };
}

export default function HomePresentation({ state, handler }: Props) {
  const { status, time } = state;
  const { handleSubmit, start, pause, stop } = handler;

  return (
    <Container>
      <Paper elevation={4} sx={{ mt: 4, p: 4 }}>
        <InputForm
          hasTimerStarted={Boolean(status === StatusEnum.RUNNING)}
          handleSubmit={handleSubmit}
        />

        <Divider />

        <Clock time={time} handler={{ start, pause, stop }} />
      </Paper>
    </Container>
  );
}
