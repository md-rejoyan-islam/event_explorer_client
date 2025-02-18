# Event Explorer Frontend

This is the frontend for an **Event Explorer** application built with **Next.js**. It connects to a backend API using **Apollo Client**. The backend API is built with **Express**, **GraphQL**, **Apollo Server**, **Prisma**, and **MongoDB**.

## Features

### Admin

- **Create Event**: Admins can create new events with relevant details.
- **Update Event**: Admins can update existing event information.
- **Delete Event**: Admins can delete events at any time.
- **View All Events**: Admins can view all available events.
- **View Enrolled Users**: Admins can view users enrolled in specific events.

### User

- **View All Events**: All users can view all available events.
- **Enroll in Event**: Authenticated users can enroll in events.
- **Unenroll from Event**: Authenticated users can unenroll from events they have enrolled in.
- **View Enrolled Events**: Authenticated users can view events they are enrolled in.

## Tech Stack

- **Next.js** for the frontend framework.
- **Apollo Client** for GraphQL data fetching and state management.
- **Tailwind CSS** for styling.
- **Typescript** for type-checking and code consistency.
- **Framer Motion** for animations.

## Pages and Routes

### Public

- **Home Page**: Shows a list of all events.
- **Event Details Page**: Detailed view of a specific event.
- **Login Page**: For user authentication.
- **Register Page**: For user registration.

### Admin

- **Create Event**: Admins can create new events.
- **Update Event**: Admins can update existing events.
- **Delete Event**: Admins can delete events.

### User

- **Enroll in Event**: Authenticated users can enroll in events.
- **Unenroll from Event**: Authenticated users can unenroll from events.
- **My Enrolled Events**: Authenticated users can view events they are enrolled in.

## GraphQL Queries & Mutations

### Queries

- **Get All Events**

  ```graphql
  query {
    events {
      id
      title
      description
      date
    }
  }
  ```

- **Get User's Enrolled Events**
  ```graphql
  query {
    myEnrolledEvents {
      id
      title
      date
    }
  }
  ```

### Mutations

- **Enroll in Event**

  ```graphql
  mutation {
    enroll(eventId: "event_id") {
      message
    }
  }
  ```

- **Unenroll from Event**

  ```graphql
  mutation {
    unenroll(eventId: "event_id") {
      message
    }
  }
  ```

- **Create Event (Admin Only)**

  ```graphql
  mutation {
    createEvent(
      input: {
        title: "Event Title"
        description: "Event Description"
        date: "Event Date"
      }
    ) {
      id
      title
    }
  }
  ```

- **Update Event (Admin Only)**

  ```graphql
  mutation {
    updateEvent(eventId: "event_id", input: { title: "Updated Title" }) {
      id
      title
    }
  }
  ```

- **Delete Event (Admin Only)**
  ```graphql
  mutation {
    deleteEvent(eventId: "event_id") {
      message
    }
  }
  ```

## Links

[Backend Repository](https://github.com/md-rejoyan-islam/event_explorer_api)

[Live Demo](https://event-explorer.vercel.app)

[API Demo](https://ministerial-gabriel-rejoyan-cd2987cb.koyeb.app/graphql)

## Contact

For questions or suggestions, feel free to reach out:

- **Name**: Md. Rejoyan Islam
- **Email**: [rejoyanislam0014@gmail.com]
- **LinkedIn**: [https://www.linkedin.com/in/md-rejoyan-islam/]
