import type { Question } from "./types";
import type { QuestionOverride } from "./data.en";

/**
 * Original questions for Roadmap tasks 31–32. Kept separate from the large
 * generated banks so these focused additions remain easy to review.
 */
export const PHYSICAL_VECTOR_QUESTIONS: Record<number, Question[]> = {
  1: [
    {
      id: 9001,
      topic: "Physical Security Controls",
      level: "APPLICAZIONE",
      scenario: "Un archivio ha una porta laterale poco illuminata. Si vuole rilevare l'apertura quando qualcuno attraversa la soglia, anche se il movimento è lento e la visuale del sensore può essere ostruita.",
      question: "Quale sensore è più adatto a rilevare il peso di una persona che attraversa la soglia?",
      options: ["Sensore di pressione a pavimento", "Sensore a infrarosso passivo (PIR)", "Sensore a ultrasuoni", "Sensore a microonde"],
      answerIndex: 0,
      explanation: "Il sensore di pressione rileva peso o contatto sulla superficie ed è adatto alla soglia descritta. Un PIR rileva variazioni di calore in movimento e richiede una copertura utile; microonde e ultrasuoni sono sensori attivi di movimento e possono risentire di ostacoli, geometria e interferenze. Nessuna tecnologia è universale: posizione e ambiente vanno valutati."
    },
    {
      id: 9002,
      topic: "Physical Security Controls",
      level: "COMPRENSIONE",
      scenario: "Un'organizzazione installa sensori di movimento collegati alla sala di controllo e a una telecamera. I sensori non azionano serrature né barriere.",
      question: "Quale funzione descrive meglio questi sensori?",
      options: ["Detective: rilevano un evento e generano un avviso", "Preventiva: impediscono fisicamente l'accesso", "Correttiva: ripristinano i sistemi dopo l'incidente", "Dissuasiva: scoraggiano da soli ogni tentativo"],
      answerIndex: 0,
      explanation: "Il sensore è una misura detective: rileva e segnala, mentre una persona o un sistema può verificare l'allarme. Una serratura o un dissuasore fisico può prevenire o ritardare l'accesso; il sensore da solo non lo blocca. Il ripristino è correttivo e la sola presenza di un sensore non garantisce deterrenza."
    }
  ]
};

export const PHYSICAL_VECTOR_QUESTION_EN: Record<number, Record<number, QuestionOverride>> = {
  1: {
    9001: {
      topic: "Physical Security Controls",
      scenario: "An archive has a poorly lit side door. The organization wants to detect someone crossing the threshold, even if movement is slow and the sensor's line of sight may be obstructed.",
      question: "Which sensor is best suited to detect a person's weight crossing the threshold?",
      options: ["Floor pressure sensor", "Passive infrared (PIR) sensor", "Ultrasonic sensor", "Microwave sensor"],
      explanation: "A pressure sensor detects weight or contact at the surface and fits the described threshold. A PIR sensor detects moving heat and needs useful coverage; microwave and ultrasonic sensors actively detect motion and can be affected by obstacles, geometry, and interference. No technology is universal: placement and environment matter."
    },
    9002: {
      topic: "Physical Security Controls",
      scenario: "An organization installs motion sensors connected to a control room and a camera. The sensors do not operate locks or barriers.",
      question: "Which function best describes these sensors?",
      options: ["Detective: they detect an event and raise an alert", "Preventive: they physically block access", "Corrective: they restore systems after an incident", "Deterrent: their presence alone discourages every attempt"],
      explanation: "A sensor is a detective control: it detects and reports, while a person or system can verify the alert. A lock or physical barrier may prevent or delay access; the sensor alone does not block it. Recovery is corrective, and a sensor's presence alone does not guarantee deterrence."
    }
  },
  2: {
    9003: {
      topic: "Threat Vectors & Attack Surfaces",
      scenario: "An employee scans a QR code printed on a poster and lands on a counterfeit sign-in page.",
      question: "Which statement correctly separates the delivery vector from the technique?",
      options: ["The image/QR code is the delivery vector; phishing is the social-engineering technique", "Phishing is the delivery vector; the QR code is the payload", "Credential theft is the delivery vector; the poster is the technique", "The sign-in page is the delivery vector; social engineering is the payload"],
      answerIndex: 0,
      explanation: "The QR code is an image-based means of delivery. Phishing is the deceptive social-engineering technique; the counterfeit page is part of the lure used to collect credentials. These terms describe different parts of the event, and a campaign can combine multiple vectors and techniques."
    },
    {
      id: 9004,
      topic: "Threat Vectors & Attack Surfaces",
      level: "APPLICAZIONE",
      scenario: "Una chiavetta USB sconosciuta viene lasciata nel parcheggio. Un dipendente la collega e un programma malevolo tenta di avviarsi.",
      question: "Qual è il vettore descritto, distinto dalla tecnica che esegue il codice?",
      options: ["Il supporto rimovibile è il vettore; l'esecuzione del programma malevolo è la tecnica", "L'esecuzione del programma è il vettore; la chiavetta è la tecnica", "Il parcheggio è il vettore; la chiavetta è il payload", "Il malware è il vettore; l'accesso fisico è la tecnica"],
      answerIndex: 0,
      explanation: "Il dispositivo rimovibile è il mezzo con cui il contenuto raggiunge il sistema; l'esecuzione del programma è l'azione tecnica successiva. Il malware è il payload e il luogo in cui è stato trovato non è il vettore. La catena può includere anche ingegneria sociale, per esempio confidando che qualcuno colleghi il supporto."
    }
  }
};

export const PHYSICAL_VECTOR_QUESTION_EN_EXTRA: Record<number, Record<number, QuestionOverride>> = {
  2: {
    9004: {
      topic: "Threat Vectors & Attack Surfaces",
      scenario: "An unknown USB drive is left in a parking lot. An employee plugs it in, and a malicious program attempts to run.",
      question: "Which is the vector, distinct from the technique that executes the code?",
      options: ["The removable device is the vector; running the malicious program is the technique", "Running the program is the vector; the USB drive is the technique", "The parking lot is the vector; the USB drive is the payload", "The malware is the vector; physical access is the technique"],
      explanation: "The removable device is the means by which content reaches the system; running the program is the subsequent technical action. Malware is the payload, and the place where the drive was found is not the vector. The chain may also include social engineering, such as relying on someone to plug in the device."
    }
  }
};
