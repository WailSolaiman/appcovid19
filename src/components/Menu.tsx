import React from "react";
import { withRouter } from "react-router-dom";
import {
  IonMenu,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
} from "@ionic/react";
import MenuItems from "./MenuItems";
import UserMenu from "./UserMenu";
import { userInfos, navigateItems, accountItems } from "../utils/menus";

const Menu: React.FC<any> = ({ history }): JSX.Element => {
  const _userInfos = userInfos;
  const _navigateItems = navigateItems;
  const _accountItems = accountItems;
  return (
    <IonMenu contentId="main">
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Menu</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <UserMenu header="User" userInfos={_userInfos} history={history} />
        <MenuItems
          label="Navigate"
          menuItems={_navigateItems}
          history={history}
        />
        <MenuItems
          label="Account"
          menuItems={_accountItems}
          history={history}
        />
      </IonContent>
    </IonMenu>
  );
};

export default withRouter(Menu);
