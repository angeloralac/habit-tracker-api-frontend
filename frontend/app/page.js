"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setHabits } from "../store/habitsSlice";

export default function Home() {
  const dispatch = useDispatch();
  const habits = useSelector((state) => state.habits.habits);

  const fetchHabits = async () => {
    try {
      const res = await fetch("http://localhost:5050/api/habits");
      const data = await res.json();
      dispatch(setHabits(data));
    } catch (err) {
      console.error("Error al obtener hábitos:", err);
    }
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  const handleDone = async (id) => {
    try {
      const res = await fetch(`http://localhost:5050/api/habits/${id}/done`, {
        method: "PATCH",
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "No se pudo marcar el hábito");
        return;
      }

      fetchHabits();
    } catch (err) {
      console.error("Error al marcar hábito:", err);
    }
  };

  const totalHabits = habits.length;
  const completedHabits = habits.filter((h) => h.completedToday).length;
  const progress = totalHabits > 0 ? (completedHabits / totalHabits) * 100 : 0;

  let progressColor = "bg-red-500";

  if (progress >= 100) {
    progressColor = "bg-green-600";
  } else if (progress >= 50) {
    progressColor = "bg-yellow-500";
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold text-blue-600">Habit Tracker</h1>
        <p className="mt-1 text-gray-600">Hábitos cargados: {habits.length}</p>

        <div className="mt-6 rounded-lg bg-white p-4 shadow">
          <div className="flex items-center justify-between">
            <p className="font-medium text-gray-800">Progreso de hoy</p>
            <span className="text-sm text-gray-500">
              {Math.round(progress)}%
            </span>
          </div>

          <div className="mt-3 h-3 w-full rounded-full bg-gray-200">
            <div
              className={`h-3 rounded-full ${progressColor}`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <p className="mt-2 text-sm text-gray-500">
            {completedHabits} de {totalHabits} hábitos completados hoy
          </p>
        </div>

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

                  <button
                    type="button"
                    onClick={() => handleDone(h._id)}
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
