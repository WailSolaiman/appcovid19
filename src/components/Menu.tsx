import React from "react";
import {
  IonMenu,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
} from "@ionic/react";
import { Store } from "../store/Store";
import MenuItems from "./MenuItems";
import UserMenu from "./UserMenu";
import { navigateItems, accountItems } from "../utils/menus";

const Menu: React.FC = (): JSX.Element => {
  const { state } = React.useContext(Store);
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
        {state.user.isAuthenticated && <UserMenu />}
        <MenuItems label="Navigate" menuItems={_navigateItems} />
        {!state.user.isAuthenticated && (
          <MenuItems label="Account" menuItems={_accountItems} />
        )}
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
