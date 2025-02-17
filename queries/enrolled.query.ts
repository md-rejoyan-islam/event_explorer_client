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
  query GetEnrolledEventsByUserId($userId: ID!) {
    events: getEnrolledEventsByUserId(userId: $userId) {
      eventId
      event {
        title
        date
      }
    }
  }
`;
export const GET_ENROLLED_EVENTS_BY_CREATOR_ID = gql`
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

export const UNENROLLED_AN_EVENT = gql`
  mutation UnenrollEvent($eventId: ID!, $userId: ID!) {
    event: unenrollEvent(eventId: $eventId, userId: $userId) {
      id
    }
  }
`;

export const TOTAL_ENROOLED_EVENT_BY_EVENT_ID = gql`
  query Query($eventId: ID!) {
    total_enrolled: totalEnrolledEventsByEventId(eventId: $eventId)
  }
`;
