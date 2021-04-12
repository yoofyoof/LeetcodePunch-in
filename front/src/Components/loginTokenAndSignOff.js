// eslint-disable-next-line no-unused-vars
import React from "react";

export const getLogin = async (userObj) => {
  // eslint-disable-next-line no-unused-vars
  const res = await fetch("/get_token", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userObj),
  });
};

export const checkCurrentLogin = async (emailObj) => {
  const res = await fetch("/check_current_login", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(emailObj),
  });

  const token = await res.json();

  return token;
};

export const checkIfUserPasswordMatches = async (userObj) => {
  const res = await fetch("/check_email_and_password", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userObj),
  });

  const token = await res.json();

  return token;
};

export const deleteLoginToken = async (query) => {
  // eslint-disable-next-line no-unused-vars
  const res = await fetch("/delete_login_token", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(query),
  });
};
