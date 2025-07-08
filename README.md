<div align="center">
  <img src="./public/logo/logo.png" alt="Event Explorer Logo" width="150">
  <h1 align="center">Event Explorer</h1>
  <p align="center">
    A modern, full-stack event management platform built with Next.js and a GraphQL backend. Discover, create, and manage events with a seamless and interactive user experience.
  </p>
</div>

---

## 🚀 Live Demo & Links

- **Live Frontend**: [https://event-explorer.vercel.app](https://event-explorer.vercel.app)
- **Backend Repository**: [https://github.com/md-rejoyan-islam/event_explorer_api](https://github.com/md-rejoyan-islam/event_explorer_api)
- **API Demo**: [https://ministerial-gabriel-rejoyan-cd2987cb.koyeb.app/graphql](https://ministerial-gabriel-rejoyan-cd2987cb.koyeb.app/graphql)

---

## ✨ Features

### 👤 User Features

- **Event Discovery**: Browse and search for events.
- **Filter & Sort**: Filter events by category and search terms.
- **Event Details**: View detailed information about each event.
- **User Authentication**: Secure login and registration using credentials, Google, and Facebook.
- **Event Enrollment**: Users can enroll in events.
- **My Events**: View a list of events the user has enrolled in.
- **Contact Form**: Send messages to the admin.

### 👑 Admin Features

- **Admin Dashboard**: Centralized dashboard for managing the platform.
- **Event Management**:
  - **Create**: Add new events with details like title, date, time, location, category, price, and capacity.
  - **Update**: Modify existing event details.
  - **Delete**: Remove events from the platform.
- **User Management**: View and manage user-related data.
- **Message Center**: View and manage messages sent by users.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (v14)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with [Shadcn/UI](https://ui.shadcn.com/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Data Fetching**: [Apollo Client](https://www.apollographql.com/docs/react/) for GraphQL
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **Form Management**: [React Hook Form](https://react-hook-form.com/)
- **Schema Validation**: [Zod](https://zod.dev/)

---

## ⚙️ Getting Started

### Prerequisites

- Node.js (v18.17.0 or later)
- `npm` or `yarn`

### Installation & Setup

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/event-explorer-frontend.git
    cd event-explorer-frontend
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Set up environment variables:**
    Create a `.env.local` file in the root directory and add the following variables:

    ```
    NEXT_PUBLIC_GRAPHQL_ENDPOINT=<your_backend_graphql_endpoint>
    GOOGLE_CLIENT_ID=<your_google_client_id>
    GOOGLE_CLIENT_SECRET=<your_google_client_secret>
    FACEBOOK_CLIENT_ID=<your_facebook_client_id>
    FACEBOOK_CLIENT_SECRET=<your_facebook_client_secret>
    AUTH_SECRET=<your_auth_secret>
    MONGO_URI=<your_mongodb_uri>
    AUTH_TRUST_HOST=<your_auth_trust_host>
    JWT_SECRET=<your_jwt_secret>
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📞 Contact

Md. Rejoyan Islam

- **Email**: [rejoyanislam0014@gmail.com](mailto:rejoyanislam0014@gmail.com)
- **LinkedIn**: [https://www.linkedin.com/in/md-rejoyan-islam/](https://www.linkedin.com/in/md-rejoyan-islam/)
