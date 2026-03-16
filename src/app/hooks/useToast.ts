import { useSnackbar } from "notistack";

export default function useToast() {
  const { enqueueSnackbar } = useSnackbar();

  const showErrorMessage = (message: string) => {
    enqueueSnackbar(message, {
      variant: "error",
    });
  };

  const showSuccessMessage = (message: string) => {
    enqueueSnackbar(message, {
      variant: 'success',
    });
  };

  return { showErrorMessage, showSuccessMessage };
}
