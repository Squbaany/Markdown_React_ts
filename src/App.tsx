import { Route, Routes } from "react-router-dom";
import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./_root/RootLayout";
import SignInForm from "./_auth/forms/SignInForm";
import SignUpForm from "./_auth/forms/SignUpForm";
import Home from "./_root/pages/Home";
import { Toaster } from "./components/ui/toaster";
import CreateNote from "./_root/pages/CreateNote";
import EditTags from "./_root/pages/EditTags";
import NoteDetails from "./_root/pages/NoteDetails";
import EditNote from "./_root/pages/EditNote";

const App = () => {
  return (
    <main className="flex h-screen">
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SignInForm />} />
          <Route path="/sign-up" element={<SignUpForm />} />
        </Route>
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/create-note" element={<CreateNote />} />
          <Route path="/edit-note/:id/*" element={<EditNote />} />
          <Route path="/edit-tags" element={<EditTags />} />
          <Route path="/notes/:id/*" element={<NoteDetails />} />
        </Route>
      </Routes>

      <Toaster />
    </main>
  );
};

export default App;
