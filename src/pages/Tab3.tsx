import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import Account from '../components/account/account';
import './Tab3.css';

const Tab3: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Account</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Account</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Account />
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
