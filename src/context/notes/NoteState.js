import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const notesInitial = [
    {
      _id: "6a4b5b5209e54433c6d692ec",
      user: "6a4918441d35233a786cfc2f",
      title: "My Title Updated",
      description: "Just do your work. Updated",
      tag: "Personal",
      date: "2026-07-06T07:37:54.540Z",
      __v: 0,
    },
    {
      _id: "6a4c88703fef06681d811533",
      user: "6a4918441d35233a786cfc2f",
      title: "Complete Today's Work",
      description: "Lesss gooooo",
      tag: "Personal",
      date: "2026-07-07T05:02:40.661Z",
      __v: 0,
    },
    {
      _id: "6a4b5b5209e54433c6d692ec",
      user: "6a4918441d35233a786cfc2f",
      title: "My Title Updated",
      description: "Just do your work. Updated",
      tag: "Personal",
      date: "2026-07-06T07:37:54.540Z",
      __v: 0,
    },
    {
      _id: "6a4c88703fef06681d811533",
      user: "6a4918441d35233a786cfc2f",
      title: "Complete Today's Work",
      description: "Lesss gooooo",
      tag: "Personal",
      date: "2026-07-07T05:02:40.661Z",
      __v: 0,
    },
    {
      _id: "6a4b5b5209e54433c6d692ec",
      user: "6a4918441d35233a786cfc2f",
      title: "My Title Updated",
      description: "Just do your work. Updated",
      tag: "Personal",
      date: "2026-07-06T07:37:54.540Z",
      __v: 0,
    },
    {
      _id: "6a4c88703fef06681d811533",
      user: "6a4918441d35233a786cfc2f",
      title: "Complete Today's Work",
      description: "Lesss gooooo",
      tag: "Personal",
      date: "2026-07-07T05:02:40.661Z",
      __v: 0,
    },
    {
      _id: "6a4b5b5209e54433c6d692ec",
      user: "6a4918441d35233a786cfc2f",
      title: "My Title Updated",
      description: "Just do your work. Updated",
      tag: "Personal",
      date: "2026-07-06T07:37:54.540Z",
      __v: 0,
    },
    {
      _id: "6a4c88703fef06681d811533",
      user: "6a4918441d35233a786cfc2f",
      title: "Complete Today's Work",
      description: "Lesss gooooo",
      tag: "Personal",
      date: "2026-07-07T05:02:40.661Z",
      __v: 0,
    },
  ];

  const [notes, setNotes] = useState(notesInitial);

  return (
    <NoteContext.Provider value={{notes, setNotes}}>
        {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
