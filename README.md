# AmbuConnect
AmbuConnect: Redefining Healthcare Delivery For Improved Patient Survival in Ambulance.


<b>AmbuConnect</b> is an innovative system for real-time patient monitoring and data management, designed to enhance emergency medical services and improve patient outcomes during the critical "Golden Hour." This system addresses the issues of delayed treatment and compromised outcomes in emergency healthcare by providing a mobile and web application that allows nurses to input vital patient data during ambulance transit. This information, including vital signs, symptoms, medical history, and interventions, is instantly transmitted to the hospital, enabling real-time monitoring and facilitating pre-emptive care planning through the use of AI.

<li> AmbuConnect is a real time patient monitoring and data management system, seamlessly integrated with ambulance services It aims to address the challenges of delayed treatment and suboptimal patient outcomes by empowering medical professionals with advanced technology</li>
<li> With AmbuConnect we introduce a transformative approach that combines innovative real time patient monitoring, advanced data management, Video consultant and AI powered initial treatment guidance
</li>

---

### Live Site

Live Site : [https://ambuconnect.vercel.app/](https://ambuconnect.vercel.app/)

---

### Installation 

` npm install `

` npm run start ` 


---

### Technologies Used
`<React JS> - FrontEnd ` <br>
`<AppWrite SDK> - Backend  `<br>
`<Google Gemini AI API> ` <br>
`<Google MAPs SDK> ` <br>
`<ZegoCloud SDK> ` <br>


[https://reactjs.org/](https://reactjs.org/) <br>
[https://cloud.appwrite.io/](https://cloud.appwrite.io/) <br>
[https://ai.google.dev/aistudio](https://ai.google.dev/aistudio) <br>
[https://www.zegocloud.com/](https://www.zegocloud.com/) <br>
[https://developers.google.com/maps](https://developers.google.com/maps) <br>

1. Gemini AI <br>
• Technology: Gemini AI by Google <br>
• Description: Gemini AI is a generative artificial intelligence developed by Google. It leverages a large language model (LLM) to provide advanced predictive analytics and decision-making support. <br>
2. Cloud Function <br>
• Technology: Node.js with SMTP Server of Gmail <br>
• Description: AppWrite's Cloud Functions are server less functions that execute in response to events. They are used for handling asynchronous tasks and integrating various services within AmbuConnect. <br>
3. Deployment: Vercel <br>
• Technology: Vercel <br>
• Description: Vercel is a platform for frontend developers, providing the best experience to deploy, manage, and scale modern web applications. <br>

---
 
 
 ### Architecture diagram 

 <img src="Readme_Assets/AmbuConnect Arch(1)(5).drawio.png"></img>
 
---

### Methods

AmbuConnect employs advanced technologies to create an efficient health monitoring system during emergencies. The methods for developing and implementing the platform are as follows:
1. <b> Frontend: React JS Technology: React.js </b>
Purpose: To develop an interactive and responsive user interface.
Details: <br>
• Component-Based Architecture: React JS utilizes reusable components, making the development process efficient and the application easy to maintain and scale. <br>
• Real-Time Updates: The frontend is designed for real-time updates, ensuring that all displayed data is current, which is crucial in an emergency context where information changes rapidly.<br>
• User Authentication: React JS handles user login and registration forms, integrating seamlessly with backend authentication services.<br>
• User Interface (UI): The UI includes forms for adding new patient details, viewing active <br>

2. <b> Backend: AppWrite Technology: AppWrite </b>
Purpose: To handle server-side operations and database management.
Details: <br>
• User Authentication: AppWrite provides secure authentication services, managing user sessions and protecting sensitive data. <br>
• Database Management: Uses AppWrite's MariaDB for storing and managing various datasets:<br>
• Patient Details: Includes patient name, age, heart rate, blood pressure, temperature, oxygen saturation and medical condition.<br>
• Ambulance Details: Stores ambulance ID and email for communication.<br>
• Medical Team Details: Includes nurse ID and name for accountability. <br>
• Hospital Information: Stores hospital names and emails for contact. <br>
• Real-Time Data Synchronization: Ensures that all updates to the database are reflected in real-time across the system.<br>
• Cloud Functions: Automated email notifications and other server-side logic are handled by AppWrite's cloud functions, ensuring timely communication and updates.<br>
3. <b> Real-Time Communication: ZEGO Cloud </b> <br>
Technology: ZEGO Cloud
Purpose: To facilitate real-time video communication between ambulance teams and hospital staff.
Details: <br>
• Video Call Integration: Direct video calls allow medical professionals to consult and coordinate in real-time, which is vital for patient care during transport. <br>
• High-Quality Video: Ensures clear and uninterrupted video feeds, critical for accurate communication. <br>
4. <b> Geolocation Services: Google Maps API Technology: Google Maps API </b> <br>
Purpose: To provide real-time location tracking of ambulances. 
Details: <br>
• Routing and Navigation: Ensures the ambulance takes the fastest and most efficient route to the hospital. <br>
• Emergency Coordination: Helps hospital staff prepare for the patient’s arrival by providing up-to-date location information.<br>
5. <b> Artificial Intelligence: Gemini </b>
Technology: Gemini AI
Purpose: To analyze medical data and predict patient outcomes.
Details: <br>
• Predictive Analytics: Uses machine learning algorithms to analyze patient data and predict possible outcomes, helping medical teams make informed decisions. <br>
• Data Insights: Provides insights based on historical data and patterns, improving the overall quality of emergency medical care. <br>

---

 ### Impact of Gemini AI vs. Calling Hospital Center

<img src="Readme_Assets/Gemini AI effi graph.jpg"></img>

--- 

### Comparison of Traditional Emergency System and AmbuConnect System 
<img src="Readme_Assets/Waiting Time Comp bar graph.png"></img>

---


 ### License
 
 © Alik Kumar Ghosh, AmbuConnect is licensed under the MIT License [License]()


