import { gql } from "@apollo/client";

export const ENROLLED_AN_EVENT = gql`
  mutation EnrollEvent($eventId: ID!, $userId: ID!) {
    enrolled: enrollEvent(eventId: $eventId, userId: $userId) {
      eventId
      event {
        capacity
      }
    }
  }
`;

export const GET_ENROLLED_EVENTS_BY_USER_ID = gql`
  query GetEnrolledEventsByCreaterId($authorId: ID!) {
    events: getEnrolledEventsByCreaterId(authorId: $authorId) {
      createdAt
      user {
        email
        name
      }
      event {
        title
        date
      }
    }
  }
`;
