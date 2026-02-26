import "./globals.css";
import ReduxProvider from "../providers/ReduxProvider";

export const metadata = {
  title: "Habit Tracker",
  description: "App para gestionar hábitos",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}