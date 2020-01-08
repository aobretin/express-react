# Design Notes

Tools used in this project:
General:
- Typescript - of course it adds that typed flavour to javascript
Client:
- React with hooks
- Redux with hooks
- Styled components, to make the modules complete
- Material ui, for easy components use
- React router - for routing
- Jest and React testing library for testing
Server:
- TS.ed - in my opinion best scaffold for express server
- Express
- Mongoose
- MongoDB

Install instructions:
- git clone
- yarn install and yarn start in both /server and /client
- happy code review :D

The server arhitecture is pretty straight forward, with Model that defines how our data should look, Controller that holds the api's design and Services, for reusable helpers which actually end up using Mongoose for query. I went with TS.ed, because i really liked the decorator pattern used, and the ease of scalability provided. It was nice to do express again.

The client is also pretty clear, using create-react-app CLI to bootstrap a React project. Used hooks functional design, because I really liked the simplicity of them, and also Redux and Router use them, decoupling logic from the actual components and making reusability higher. Redux may seem as an overkill for this little project, and there are alternatives now with Context and Hooks Api, but I like the maturity of Redux and Dev Tools. Also the new hooks design is pretty neat and simple rather than the old HOC connect, and in my opinion it adds the posibility to connect anywhere with the state and actions (by building custom hooks). Styled components are also in my likebook, because I think it adds that final flavour for complete modularity in components.

The major challenge here was that I had to freshen up my express knowhow and it was fun to actually build a simple but full MERN stack project. Also in the UI, i tried to implement all the logic around decoupling state and components and I hope (because as we all know, no project is perfect) I made the right decision (I for one like how it turned out)