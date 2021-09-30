import { IonCol, IonItem, IonLabel } from "@ionic/react";
import styles from "./QuoteItem.module.css";

export const QuoteItem = ({ quote }) => {

	return (

    <IonCol size="6" className="animate__animated animate__fadeIn">
      <IonItem lines="none" className={ styles.quoteItem } routerLink={ `/quote/${ quote.id }`}>
        <IonLabel>
          <h2>{ quote.text }</h2>
          <p>{ quote.author }</p>
        </IonLabel>
      </IonItem>
    </IonCol>
	);
}