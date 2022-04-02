import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  secret: "I like pina coladas",
  theme: {
    colorScheme: "auto",
  },
  session: {
    strategy: "jwt",
  },
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      id: "login-page",
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize() {
        // Add logic here to look up the user from the credentials supplied
        const testUser = {
          id: 1,
          name: "J Smith",
          email: "jsmith@example.com",
        };

        // const res = await fetch("/your/endpoint", {
        //   method: 'POST',
        //   body: JSON.stringify(credentials),
        //   headers: { "Content-Type": "application/json" }
        // })
        // const user = await res.json()
        //
        // // If no error and we have user data, return it
        // if (res.ok && user) {
        //   return user
        // }
        // Return null if user data could not be retrieved
        // return process.env.NODE_ENV === "development" ? testUser : null;
        return testUser;
      },
    }),
  ],
  callbacks: {
    async signIn() {
      const isAllowedToSignIn = true;
      if (isAllowedToSignIn) {
        return true;
      } else {
        // Return false to display a default error message
        return false;
        // Or you can return a URL to redirect to:
        // return '/unauthorized'
      }
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken;
      session.token = token;
      return session;
    },
  },
});
