

For Project 3, I am working independently to create a prototype app for a non-profit I call Consumer Registration for Services (CRS).  CRS provides financial and legal counseling about housing: renting,purchasing, declaring bankruptcy, fighting foreclosure. CRS wants to play an integral part of the financial stabilization of neighborhoods in the City of Philadelphia and its surrounding communities.

The CRS Counselors provide services to Consumers free of charge —consumers just need to provide them with financial information and documents. Usually a single Counselor stays with the Consumer until the Consumer’s issue is resolved.

Currently, NCWS is a paper-only office. There is no database other than basic contact information for counselors to reference. Also consumer intake is a burdensome and time-consuming consuming process for counselors who have to enter information into Google Forms. The CRS Google Forms system outputs consumer information in a format that CRS can use to both advise clients and process billing to Federal and State resources.

Prior to the Google Forms system, CRS clocked their new consumer intake at approximately 2 hours. Google Forms has improved that to approximately 30 minutes. I hope to reduce the burden on the Counselors and Administrative staff even further by encouraging Consumers to enter much of their information and make an appointment online while still creating a secure and trustworthy full stack app.

Future Plans:
 -- Consumers will recieve automatic email notification of account and appointment creation.

 -- Consumers will complete a "tutorial" of the importance of email signature verification. 

 -- CRS staff will have their own portal to view appointment requests and assign counselors to consumers.

 -- Hardware improvements to the UX system will include electronic signature pads to save paper and effort.


At this stage, CRS EXPRESS SHOW is a Node Express application with a MongoDB/Mongoose backend.
NPMs include: 
 
    "bcrypt":  for user authentification
    "body-parser" to handle JSON
    "connect-mongo" for Mongoose DB connection
    "express" server
    "express-session" to help express communicate with bcrypt
    "mongoose": to connect express to MongoDB
    "morgan": to view HTTP messages in console
    "serve-favicon": for that cute little icon at the top
