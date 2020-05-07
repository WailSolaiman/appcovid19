import React from "react";
import { Redirect, Route } from "react-router-dom";
import { IonReactRouter } from "@ionic/react-router";
import { IonApp, IonRouterOutlet, IonSplitPane, IonPage } from "@ionic/react";
import { Store } from "./store/Store";
import Menu from "./components/Menu";
import Tabs from "./components/Tabs";
import Home from "./pages/Home";
import Location from "./pages/Location";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Login from "./pages/Login";
// import { createNewDataContainer } from "./utils/utils";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
/* Global Styles */
import "./styles.css";

const App: React.FC = (): JSX.Element => {
  const { state } = React.useContext(Store);

  React.useEffect(() => {
    console.log("state: ", state);
  }, [state]);

  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane disabled={true} contentId="main">
          <Menu />
          <IonPage id="main">
            <Tabs>
              <IonRouterOutlet>
                <Route
                  exact={true}
                  path="/home"
                  render={() => {
                    return state.user.isAuthenticated ? (
                      <Home />
                    ) : (
                      <Redirect to="/login" />
                    );
                  }}
                />
                <Route
                  exact={true}
                  path="/profile"
                  render={() => {
                    return state.user.isAuthenticated ? (
                      <Profile />
                    ) : (
                      <Redirect to="/login" />
                    );
                  }}
                />
                <Route
                  exact={true}
                  path="/location"
                  render={() => {
                    return state.user.isAuthenticated ? (
                      <Location />
                    ) : (
                      <Redirect to="/login" />
                    );
                  }}
                />
                <Route path="/about" component={About} exact={true} />
                <Route path="/register" component={Register} exact={true} />
                <Route path="/login" component={Login} exact={true} />
                <Redirect exact from="/" to="/login" />
              </IonRouterOutlet>
            </Tabs>
          </IonPage>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
