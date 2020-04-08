import React from "react";
import { Redirect, Route } from "react-router-dom";
import { IonReactRouter } from "@ionic/react-router";
import { IonApp, IonRouterOutlet, IonSplitPane, IonPage } from "@ionic/react";
import Menu from "./components/Menu";
import Tabs from "./components/Tabs";
import Home from "./pages/Home";
import Statistics from "./pages/Statistics";
import Location from "./pages/Location";
import Symptoms from "./pages/Symptoms";
import Prevention from "./pages/Prevention";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Logout from "./pages/Logout";

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

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonSplitPane contentId="main">
        <Menu />
        <IonPage id="main">
          <Tabs>
            <IonRouterOutlet>
              <Route path="/home" component={Home} exact={true} />
              <Route path="/location" component={Location} exact={true} />
              <Route path="/statistics" component={Statistics} exact={true} />
              <Route path="/symptoms" component={Symptoms} exact={true} />
              <Route path="/prevention" component={Prevention} exact={true} />
              <Route path="/about" component={About} exact={true} />
              <Route path="/profile" component={Profile} exact={true} />
              <Route path="/register" component={Register} exact={true} />
              <Route path="/login" component={Login} exact={true} />
              <Route path="/logout" component={Logout} exact={true} />
              <Route exact path="/" render={() => <Redirect to="/home" />} />
            </IonRouterOutlet>
          </Tabs>
        </IonPage>
      </IonSplitPane>
    </IonReactRouter>
  </IonApp>
);

export default App;
