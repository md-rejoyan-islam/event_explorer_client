import { gql } from "@apollo/client";

export const GET_USER_BY_EMAIL = gql`
  query UserByEmail($email: String!) {
    user: getUserByEmail(email: $email) {
      id
      name
      email
      role
      bio
    }
  }
`;
export const GET_USER_ID_BY_EMAIL = gql`
  query UserByEmail($email: String!) {
    user: getUserByEmail(email: $email) {
      id
    }
  }
`;

export const USER_REGISTER = gql`
  mutation UserRegister($registerData: userRegisterType!) {
    user: userRegister(registerData: $registerData) {
      name
      email
      password
      role
    }
  }
`;

export const USER_LOGIN = gql`
  mutation UserLogin($loginData: userLoginType!) {
    user: userLogin(loginData: $loginData) {
      token
    }
  }
`;

export const GET_ALL_ADMINS = gql`
  query GetAllAdmins {
    admins: getAllAdmins {
      name
      id
    }
  }
`;

export const UPDATE_USER_BY_ID = gql`
  mutation UpdateUserById($profileUpdate: ProfileUpdate!) {
    updateUserById(profileUpdate: $profileUpdate) {
      email
    }
  }
`;

export const CREATE_LOGIN_TOKEN = gql`
  mutation CreateLoginToken($email: String!) {
    token: createLoginToken(email: $email)
  }
`;
