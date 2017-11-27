# DropzoneHQ
--------
## Team
### Members
 - Paul Bayruns 
 - Jatin Bhakta 
 - Andres Blotta 
 - Brian Krick 
 - Jon Spratt 
 - Paul Turner

## Project Scope

### Currently Available Services
Jobs at skydiving dropzones can be split into a few basic groups.

**On the customer side, employees called Manifesters deal with payment processing and scheduling for recreational or instructional skydives.** This scheduling process involves organizing which skydivers are going on which planes throughout the day. The record of these jumps is called the manifest, hence their job title. 
**Recently, a company named Burble built a web app to organize and streamline the manifesting process.** One section of Burble’s service has functionality for creating/organizing plane loads via simple dragging and dropping, after which the plane loads are then visible to customers via a webpage or Burble’s mobile app. This mobile app also offers customers the ability to sign up for sky dives and maintain a user profile, allowing them to sign up for sky dives more easily. This signup process also handles payment for the dropzones, offering integration with various payment and bookkeeping services.  

### Dropzone HQ’s Key Differences from Other Services
**Despite handling the front end of the business effectively, Burble does not manage any of the other employee roles at a dropzone.** A large percentage of dropzone employees do not directly deal with payments or scheduling. Instructors, riggers, and packers handle most of the processes that go into making a jump happen. When an instructor takes a parachute rig out for a jump with a student, they need to record which rig they used. Packers, who repack the parachutes after people come back in from a jump, need to know what parachute they are packing so they can verify that they packed it. When gear gets damaged or needs maintenance, riggers are the one who are responsible for repairing it, as well as making sure all gear is up to government defined standards. Jumps, repacking, rentals, and repairs all need to be managed, and Burble does not offer solutions for any of them. 
	**Dropzone HQ fills in what is missing from Burble by handling the internals of the dropzone that customers don’t directly interact with.** By managing the employee related jump records, providing a rental system, and logging information on all the gear of the dropzone, DZHQ can modernize many aspects of several jobs that Burble does not support.

## Key Project Technologies & Frameworks

### Frontend
----------
#### ReactJS
A javascript library made by Facebook, serving as our primary frontend library. React was chosen because it enables the creation of modular, widely reusable code, and can quickly update HTML DOM components, even when dealing with large datasets. Also, supports easy transfer to mobile apps via ReactNative, without the need to write native code (Swift or Java).

 - **Reactstrap**:  An implementation of Bootstrap for ReactJS. Allows for easier creation of clean, responsive ReactJS components    and
   pages.
 - **React Router**:  A router library for ReactJS that manages
   component loading/changing based on the URL. In React, pages are not 
   switched in the same way as in HTML, rather the same HTML file has   
   its content changed by React. React Router manages the mapping of   
   urls to changes of page content.

### Backend
----------
#### Django  
A python web framework that was built to power complex data-driven websites. Chosen for speed, modularity, and dev team experience/interest in python.

 - **Django Rest Framework** - Standard web practice, build an API that can be called to handle communication between the frontend and
   backend/db

#### MySQL
Widely used database language chosen for speed, reliability, and team familiarity. 
#### AWS 
Webserver and database hosting
