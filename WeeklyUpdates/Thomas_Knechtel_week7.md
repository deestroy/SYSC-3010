Weekly Individual Project Update Report
Group number: L1-G3
Student name: Thomas Knechtel
Week: 7
How many hours did you spend on the project this week? (0-10)
3.5 hours
Give rough breakdown of hours spent on 1-3 of the following:* (meetings, information gathering, design, research, brainstorming, evaluating options, prototyping options, writing/documenting, refactoring, testing, software implementation, hardware implementation)

Top item: Writing/Documenting: worked on the detailed design document - 1.5 hours
2nd item: research: researched message protocols: I2C, HTTP and read source code for communication between hx711 sensor and RPI - 1 hour
3rd item: software implementation: started software for communication between server node and firebase to retreive calorie values for user. - 0.5 hours
2nd item: Meeting: Assigned tasks for each group member and talked about the end-to-end communication demo - 0.5 hours
What did you accomplish this week? (Be specific)
I started by researching how I2C prototypes work and how it will be used by the SenseHat for the project. First bit signals start condition, next 7-10 bits store the I2C address of the slave device etc. 
Read source code to understand how the HX711 sensor communicates with RPI. The sensor communicates through GPIO. When the RPI sets the output to high it sends data back bit by bit through GPIO. That data must then be processed. 
Began implementing software for communicating with the firebase database and retrieving calories and item name for a user from the database. This means that the server can now communicte with the RPI Controller through firebase
How do you feel about your progress? (brief, free-form reflection)
Decent progress has been made towards end-to-end communication as well as on the Design Document. 
Our group is fully on track to be completing the project on time. I have been slacking and don't feel that I have gotten the diagrams done faster. Midterms were this week so I was very distracted and need to contribute the group discussions more.
What are you planning to do next week? (give specific goals)
prepare for the end-to-end communication demo
Finish detailed design document
Finish the protoype for the hardware
Is anything blocking you that you need from others? (What do you need from whom)
no
