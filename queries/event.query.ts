import { gql } from "@apollo/client";

export const GET_ALL_EVENTS = ({ query }: { query: string }) => gql`
    query AllEvents($search: String, $category: String) {
      events: allEvents(search: $search, category: $category) {
        data {
          ${query}
        }
      }
    }
  `;

export const GET_EVENT_BY_ID = ({ query }: { query: string }) => gql`
      query EventById($id: ID!) {
        event: getEventById(id: $id) {
          ${query}
        }
      }
    `;
export const GET_EVENT_BY_ID_WITH_USERID = ({
  query,
}: {
  query: string;
}) => gql`
      query EventById($id: ID!, $userId: ID!) {
        event: getEventById(id: $id) {
          ${query}
        }
        isEnrolled : checkEnrolledEvent(eventId: $id, userId: $userId)
      }
    `;

export const GET_ALL_EVENTS_CATEGORIES = gql`
  query AllEventsCategories {
    categories: allEventsCategory {
      data
    }
  }
`;

export const GET_ALL_EVENTS_BY_USER_ID = ({ query }: { query: string }) => gql`
  query  GetAllEventsByUserId($userId: ID!) {
    events:  getAllEventsByUserId(userId: $userId) {
        ${query}
    }
  }
`;

export const CREATE_AN_EVENT = gql`
  mutation CreateEvent($eventData: eventCreate!) {
    event: createEvent(eventData: $eventData) {
      title
    }
  }
`;

export const DELETE_EVENT_BY_ID = gql`
  mutation DeleteEventById($id: ID!) {
    deleteEventById(id: $id) {
      id
    }
  }
`;

export const UPDATE_EVENT_BY_ID = gql`
  mutation UpdateEventById($updateData: updateDate!) {
    updateEventById(updateData: $updateData) {
      description
    }
  }
`;
