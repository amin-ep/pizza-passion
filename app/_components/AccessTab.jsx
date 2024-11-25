"use client";

import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import Signup from "./Signup";
import Login from "./Login";

function AccessTab({ children }) {
  return (
    <div className="w-full bg-primary-900 rounded-sm py-8 px-8 flex flex-col gap-7">
      <header className="text-center">
        <h1 className="text-5xl">Authentication</h1>
      </header>
      <Tabs className="w-full">
        <TabList className="w-full flex justify-between gap-3">
          <Tab
            className="w-full py-3 text-center border border-accent-500 cursor-pointer text-accent-500 font-semibold text-lg outline-none"
            selectedClassName="bg-accent-500 text-primary-800"
          >
            Signup
          </Tab>
          <Tab
            className="w-full py-3 text-center border border-accent-500 cursor-pointer text-accent-500 font-semibold text-lg outline-none"
            selectedClassName="bg-accent-500 text-primary-800"
          >
            Login
          </Tab>
        </TabList>
        <TabPanel className="mt-6">
          <Signup />
        </TabPanel>
        <TabPanel>
          <Login />
        </TabPanel>
      </Tabs>
      {children}
    </div>
  );
}

export default AccessTab;
