import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import Home from '../components/home';
import './Tab1.css';

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Home</IonTitle>
          </IonToolbar>
        </IonHeader>
          <Home />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
