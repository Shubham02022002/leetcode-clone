import "./App.css";
import { SignIn } from "./components/SignIn";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { RecoilRoot, useRecoilState, useSetRecoilState } from "recoil";
import { userAtom } from "./store/atoms/user";
const firebaseConfig = {
  apiKey: "AIzaSyDOPArXSSnUHESiz1r0WFYVLTxMIvgH80s",
  authDomain: "leetcode-clone-53c26.firebaseapp.com",
  projectId: "leetcode-clone-53c26",
  storageBucket: "leetcode-clone-53c26.appspot.com",
  messagingSenderId: "485713065262",
  appId: "1:485713065262:web:8466658693ac4fa4bcf6bf",
  measurementId: "G-2WRX6W3DVB",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

function App() {
  return (
    <>
      <RecoilRoot>
        <StoreApp />
      </RecoilRoot>
    </>
  );
}

function StoreApp() {
  const [user, setUser] = useRecoilState(userAtom);
  useEffect(() => {
    onAuthStateChanged(auth, function (user) {
      if (user && user.email) {
        setUser({
          loading: false,
          user: {
            email: user.email,
          },
        });
      } else {
        // No user is signed in.
        setUser({
          loading: false,
        });
        console.log("There is no logged in user");
      }
    });
  }, []);

  if (user.loading) {
    return <div>Loading...</div>;
  }
  if (!user.user) {
    return (
      <div>
        <SignIn />
      </div>
    );
  }

  return (
    <>
      <div>
        <h1>You are logged in as {user.user?.email}</h1>
      </div>
    </>
  );
}

export default App;
