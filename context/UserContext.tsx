import {createContext, useContext, useEffect, useState, ReactNode,} from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/firebase";
import { getCurrentUser } from "../lib/monitorApi";
import { UserItem } from "../interfaces/UserItem";

interface UserContextType {

  currentUser: UserItem | null;
  setCurrentUser: (user: UserItem | null) => void;
  loading: boolean;
  refreshUser: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({children,}: {children: ReactNode;}) => {

  const [currentUser, setCurrentUser] = useState<UserItem | null>(null);

  const [loading, setLoading] = useState(true);

  const refreshUser = async () => {

  try {

    const firebaseUser = auth.currentUser;

    if (!firebaseUser) {
      setCurrentUser(null);
      return;
    }

    const mongoUser = await getCurrentUser();

    setCurrentUser(mongoUser);

  } catch (error) {

    console.log("Error refreshing user:", error);
  }
};

  useEffect(() => {
    const unsubscribe =
      onAuthStateChanged(auth, async (firebaseUser) => {

          if (firebaseUser) {
            const mongoUser = await getCurrentUser();
            setCurrentUser(mongoUser);

          } else {
            setCurrentUser(null);
          }
          setLoading(false);
        }
      );

    return unsubscribe;
  }, []);

  return (
    <UserContext.Provider value={{currentUser, setCurrentUser, loading, refreshUser}}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {

  const context = useContext(UserContext);

  if (!context) {

    throw new Error(
      "useUser must be used inside UserProvider"
    );
  }

  return context;
};
