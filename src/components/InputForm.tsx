import { Button, TextField, Grid } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ITime } from "../interfaces";

interface Props {
  hasTimerStarted: boolean;
  handleSubmit: (values: ITime) => void;
}

const initialValues = {
  hours: 0,
  minutes: 3,
  seconds: 0,
};

const validationSchema = Yup.object().shape({
  hours: Yup.number(),
  minutes: Yup.number(),
  seconds: Yup.number(),
});

export default function InputForm({ hasTimerStarted, handleSubmit }: Props) {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2}>
        <Grid item lg={4}>
          <TextField
            type="number"
            name="hours"
            label="Hours"
            fullWidth
            disabled={hasTimerStarted}
            onChange={formik.handleChange}
            value={formik.values.hours}
          />
        </Grid>

        <Grid item lg={4}>
          <TextField
            type="number"
            name="minutes"
            label="Minutes"
            fullWidth
            disabled={hasTimerStarted}
            onChange={formik.handleChange}
            value={formik.values.minutes}
          />
        </Grid>

        <Grid item lg={4}>
          <TextField
            type="number"
            name="seconds"
            label="Seconds"
            fullWidth
            disabled={hasTimerStarted}
            onChange={formik.handleChange}
            value={formik.values.seconds}
          />
        </Grid>
      </Grid>

      <Button
        type="submit"
        variant="contained"
        disabled={hasTimerStarted}
        sx={{ my: 2, mx: "auto" }}
      >
        Set Time
      </Button>
    </form>
  );
}
