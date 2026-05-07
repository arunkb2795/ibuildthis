import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { Suspense } from "react";

const Header = () => {
  return (
    <header className="flex justify-end items-center p-4 gap-4 h-16">
      <Suspense fallback={<div>Loading...</div>}>
        <Show when="signed-out">
          <SignInButton />
          <SignUpButton>
            <Button className="cursor-pointer">Sign Up</Button>
          </SignUpButton>
        </Show>
        <Show when="signed-in">
          <UserButton />
        </Show>
      </Suspense>
    </header>
  );
};

export default Header;
