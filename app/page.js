"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setHabits } from "../store/habitsSlice";

export default function Home() {
  const dispatch = useDispatch();
  const habits = useSelector((state) => state.habits.habits);

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const res = await fetch("http://localhost:5050/api/habits");
        const data = await res.json();
        dispatch(setHabits(data));
      } catch (err) {
        console.error("Error al obtener hábitos:", err);
      }
    };

    fetchHabits();
  }, [dispatch]);

  return (
    <main style={{ padding: 20 }}>
      <h1>Habit Tracker</h1>
      <p>Hábitos cargados: {habits.length}</p>

      <ul>
        {habits.map((h) => (
          <li key={h._id}>{h.name}</li>
        ))}
      </ul>
    </main>
  );
}