import React from "react";
import { useHistory } from "react-router-dom";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonToolbar,
  IonMenuButton,
  IonTitle,
  IonText,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardContent,
  IonCardTitle,
  IonIcon,
  IonLoading,
} from "@ionic/react";
import { eye, eyeOff } from "ionicons/icons";
import { useForm, Controller } from "react-hook-form";
import { Store } from "../store/Store";
import { loginUser } from "../utils/auth";
import { notificationMessage } from "../utils/utils";

interface ILogin {
  email: string;
  password: string;
}

let initialValues = {
  email: "",
  password: "",
};

const Login: React.FC = (): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { _, dispatch } = React.useContext(Store);
  const history = useHistory();
  const [data, setData] = React.useState<ILogin>({ ...initialValues });
  const [passwordVisibility, setPasswordVisibility] = React.useState<boolean>(
    false
  );
  const [loading, setLoading] = React.useState<boolean>(false);
  const { control, handleSubmit, formState, reset, errors } = useForm({
    defaultValues: { ...initialValues },
    mode: "onChange",
  });

  const showError = (_fieldName: string) => {
    let error = (errors as any)[_fieldName];
    return error ? (
      <IonText color="danger">
        <small>{error.message || "Field Is Required"}</small>
      </IonText>
    ) : null;
  };

  const onSubmit = async (data: ILogin) => {
    setLoading(true);
    setData(data);
    const res = await loginUser(data.email, data.password);
    if (res.message) {
      notificationMessage(res.message);
    } else {
      dispatch({
        type: "UPDATE_USER",
        payload: {
          uid: res.user?.uid,
          isAuthenticated: true,
          displayName: res.user?.displayName,
          email: res.user?.email,
          // countries: [],
        },
      });
      history.push("/home");
      notificationMessage("You have logged in!");
    }
    setLoading(false);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonMenuButton slot="start" color="light" />
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonLoading message="Please wait!" duration={0} isOpen={loading} />
      <IonContent>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle style={{ marginBottom: ".5rem" }}>Login</IonCardTitle>
            <IonCardSubtitle
              style={{ fontWeight: "100", textTransform: "inherit" }}
            >
              Log in to your AppCovid19 account.
            </IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <IonItem>
                <IonLabel position="stacked" color="primary">
                  Email
                </IonLabel>
                <Controller
                  as={IonInput}
                  control={control}
                  onChangeName="onIonChange"
                  onChange={([selected]) => {
                    return selected.detail.value;
                  }}
                  value={data.email}
                  name="email"
                  rules={{
                    required: true,
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: "invalid email address",
                    },
                  }}
                />
              </IonItem>
              {showError("email")}
              <IonItem>
                <IonLabel position="stacked" color="primary">
                  Password
                </IonLabel>
                <Controller
                  as={IonInput}
                  control={control}
                  onChangeName="onIonChange"
                  onChange={([selected]) => {
                    return selected.detail.value;
                  }}
                  value={data.password}
                  type={passwordVisibility ? "text" : "password"}
                  name="password"
                  rules={{
                    required: true,
                    pattern: {
                      value: /^(?=.*\d).{6,18}$/i,
                      message:
                        "Password must be between 6 and 18 digits long and include at least one numeric digit.",
                    },
                  }}
                />
                <IonIcon
                  icon={passwordVisibility ? eye : eyeOff}
                  slot="end"
                  size="small"
                  color="primary"
                  onClick={() => setPasswordVisibility(!passwordVisibility)}
                />
              </IonItem>
              {showError("password")}
              <IonItem lines="none">
                <div />
              </IonItem>
              <IonItem lines="none">
                <IonButton
                  type="button"
                  size="default"
                  expand="full"
                  fill="solid"
                  color="light"
                  style={{ width: "100%" }}
                  onClick={() => {
                    reset(initialValues);
                  }}
                >
                  Reset Form
                </IonButton>
              </IonItem>
              <IonItem lines="none">
                <IonButton
                  type="submit"
                  size="default"
                  expand="full"
                  fill="solid"
                  style={{ width: "100%" }}
                  disabled={formState.isValid === false}
                >
                  Login
                </IonButton>
              </IonItem>
              <IonItem
                lines="none"
                button
                onClick={() => {
                  history.push("/register");
                }}
              >
                <IonLabel style={{ textAlign: "center" }}>
                  <small>No account? Create one.</small>
                </IonLabel>
              </IonItem>
            </form>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Login;
