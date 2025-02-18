import { gql } from "@apollo/client";

export const CREATE_MESSAGE = gql`
  mutation CreateMessage($messageData: messageCreate!) {
    createMessage(messageData: $messageData) {
      message
    }
  }
`;

export const GET_ALL_MESSAGES_BY_USER_ID = gql`
  query GetAllMessagesByUserId($userId: ID!) {
    messages: getAllMessagesByUserId(userId: $userId) {
      id
      message
      sender {
        name
        email
      }
      createdAt
    }
  }
`;

export const GET_ALL_MESSAGE = gql`
  query GetAllMessages {
    messages: getAllMessages {
      id
      message
      sender {
        name
        email
      }
      createdAt
    }
  }
`;

export const DELETE_MESSAGE_BY_ID = gql`
  mutation DeleteMessageById($id: ID!) {
    deleteMessageById(id: $id) {
      id
    }
  }
`;
