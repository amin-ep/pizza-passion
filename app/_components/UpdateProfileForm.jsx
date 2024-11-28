"use client";

import { updateUser } from "../_lib/actions";
import FormControl from "./FormControl";
import SubmitButton from "./SubmitButton";

function UpdateProfileForm({ data }) {
  return (
    <form className="flex flex-col gap-4" action={updateUser}>
      <FormControl id="email" label="Email">
        <input
          type="text"
          className="input"
          autoComplete="off"
          id="email"
          defaultValue={data.data.user.email}
          name="email"
        />
      </FormControl>
      <FormControl id="fullName" label="Full Name">
        <input
          type="text"
          className="input"
          autoComplete="off"
          id="fullName"
          defaultValue={data.data.user.fullName}
          name="fullName"
        />
      </FormControl>
      <FormControl id="phone" label="Phone number">
        <input
          type="tel"
          className="input"
          autoComplete="off"
          id="phone"
          defaultValue={data.data.user.phone ?? ""}
          name="phone"
        />
      </FormControl>
      <div className="flex justify-end">
        <SubmitButton pendingLabel="Updating...">Update Profile</SubmitButton>
      </div>
    </form>
  );
}

export default UpdateProfileForm;
