export const getPublishedCourses = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/course/published`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetched courses");
  }
  return res.json();
};

// Post signup

export const signupUser = async (userData: any) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/signup`,
    {
      method: "Post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
      credentials: "include",
    }
  );
  if (!res.ok) throw new Error("Signup Failed");
  return res.json();
};

// Post signin

export const signinUser = async (userData: any) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/signin`,
    {
      method: "Post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
      credentials: "include",
    }
  );
  if (!res.ok) throw new Error("Sigin failed");
  return res.json();
};

export const logoutUser = async () => {
  await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/signout`, {
    method: "POST",
    credentials: "include", // Important to include cookies
  });
};
