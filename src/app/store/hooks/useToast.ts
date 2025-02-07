import { useSnackbar } from "notistack";

export default function useToast() {
  const { enqueueSnackbar } = useSnackbar();

  const showErrorMessage = (message: string) => {
    enqueueSnackbar(message, {
      variant: "error",
    });
  };

  return { showErrorMessage };
}
