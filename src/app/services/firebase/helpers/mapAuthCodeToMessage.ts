export function mapAuthCodeToMessage(errorCode: string) {
  let errorMessage = "An unknown error occurred. Please try again.";
  switch (errorCode) {
    case "auth/email-already-exists":
      errorMessage = "User with this email address already exists.";
      break;
    case "auth/invalid-email":
      errorMessage = "Please specify a valid email address.";
      break;
    case "auth/weak-password":
      errorMessage =
        "Your password is too weak. Please use more complex password.";
      break;
    case "auth/too-many-requests":
      errorMessage = "Too many requests. Please try again in 5 minutes.";
      break;
    case "auth/email-already-in-use":
      errorMessage = "You already have an account. Please log in.";
      break;
    case "auth/user-not-found":
    case "auth/wrong-password":
    case "auth/invalid-login-credentials":
      errorMessage = "Invalid email or password.";
      break;
    default:
      errorMessage = "An error occurred while authenticating.";
      break;
  }

  return errorMessage;
}
