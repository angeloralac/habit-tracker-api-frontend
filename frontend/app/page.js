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
  <main className="min-h-screen bg-gray-50 p-6">
    <div className="mx-auto max-w-3xl">
      <h1 className="text-3xl font-bold text-blue-600">Habit Tracker</h1>
      <p className="mt-1 text-gray-600">Hábitos cargados: {habits.length}</p>

      {/* Barra de progreso (estática por ahora) */}
      <div className="mt-6 rounded-lg bg-white p-4 shadow">
        <div className="flex items-center justify-between">
          <p className="font-medium text-gray-800">Progreso hacia 66 días</p>
          <span className="text-sm text-gray-500">20%</span>
        </div>
        <div className="mt-3 h-3 w-full rounded-full bg-gray-200">
          <div className="h-3 w-1/5 rounded-full bg-red-500"></div>
        </div>
        <p className="mt-2 text-sm text-gray-500">
          (Barra estática por ahora)
        </p>
      </div>

      {/* Lista dinámica desde Redux */}
      <div className="mt-6 rounded-lg bg-white p-4 shadow">
        <h2 className="text-lg font-semibold text-gray-800">Mis hábitos</h2>

        {habits.length === 0 ? (
          <p className="mt-3 text-gray-500">No hay hábitos aún.</p>
        ) : (
          <ul className="mt-4 space-y-3">
            {habits.map((h) => (
              <li
                key={h._id}
                className="flex items-center justify-between rounded-md border border-gray-200 p-3"
              >
                <div>
                  <p className="font-medium text-gray-900">{h.name}</p>
                  <p className="text-sm text-gray-500">
                    Streak: {h.streak ?? 0} días
                  </p>
                </div>

                {/* Botón Done (sin funcionalidad por ahora) */}
                <button
                  type="button"
                  className="rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700"
                >
                  Done
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  </main>
);
}