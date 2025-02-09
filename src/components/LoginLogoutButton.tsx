"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { createClient } from "../../utils/supabase/client";
import { signout } from "@/lib/auth-actions";
import { User } from "@supabase/supabase-js";

const LoginButton: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };

    fetchUser();
  }, [supabase.auth]); // Added dependency

  const handleLogout = async () => {
    await signout();
    setUser(null);
  };

  return user ? (
    <Button onClick={handleLogout}>Log out</Button>
  ) : (
    <Button variant="outline" onClick={() => router.push("/login")}>
      Login
    </Button>
  );
};

export default LoginButton;