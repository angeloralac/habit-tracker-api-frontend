"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCookie, getCookie } from "cookies-next";
import { setHabits } from "../store/habitsSlice";

export default function Home() {
  const dispatch = useDispatch();
  const habits = useSelector((state) => state.habits.habits);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5050";

  const [token, setToken] = useState("");

  const [registerName, setRegisterName] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const [loginName, setLoginName] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [habitName, setHabitName] = useState("");
  const [habitDescription, setHabitDescription] = useState("");

 const fetchHabits = async (currentToken) => {
  try {
    const authToken = currentToken || token;

    if (!authToken) {
      dispatch(setHabits([]));
      return;
    }

    const res = await fetch("https://habit-tracker-api-backend.vercel.app/api/habits", {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || data.error || "No se pudieron obtener los hábitos");
      return;
    }

    dispatch(setHabits(data));
  } catch (err) {
    console.error("Error al obtener hábitos:", err);
  }
};

 useEffect(() => {
  const savedToken = getCookie("token");
  if (savedToken) {
    setToken(savedToken);
    fetchHabits();
  }
}, []);

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://habit-tracker-api-backend.vercel.app/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: registerName,
          password: registerPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "No se pudo registrar");
        return;
      }

      alert("Usuario registrado correctamente");
      setRegisterName("");
      setRegisterPassword("");
    } catch (err) {
      console.error("Error al registrar:", err);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://habit-tracker-api-backend.vercel.app/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: loginName,
          password: loginPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "No se pudo iniciar sesión");
        return;
      }

   setToken(data.token);
setCookie("token", data.token);
fetchHabits(data.token);
alert("Login exitoso");

      setLoginName("");
      setLoginPassword("");
    } catch (err) {
      console.error("Error en login:", err);
    }
  };

  const handleAddHabit = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("Debes iniciar sesión");
      return;
    }

    try {
      const res = await fetch("https://habit-tracker-api-backend.vercel.app/api/habits", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: habitName,
          description: habitDescription,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || data.error || "No se pudo crear el hábito");
        return;
      }

      alert("Hábito agregado correctamente");
      setHabitName("");
      setHabitDescription("");
      fetchHabits();
    } catch (err) {
      console.error("Error al agregar hábito:", err);
    }
  };

  const handleDone = async (id) => {
    try {
      const res = await fetch(`https://habit-tracker-api-backend.vercel.app/api/habits/${id}/done`, {
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
          <h2 className="text-lg font-semibold text-gray-800">Registro</h2>

          <form onSubmit={handleRegister} className="mt-4 space-y-3">
            <input
              type="text"
              placeholder="Nombre"
              value={registerName}
              onChange={(e) => setRegisterName(e.target.value)}
              className="w-full rounded-md border p-2"
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={registerPassword}
              onChange={(e) => setRegisterPassword(e.target.value)}
              className="w-full rounded-md border p-2"
            />
            <button
              type="submit"
              className="rounded-md bg-blue-600 px-4 py-2 text-white"
            >
              Registrarse
            </button>
          </form>
        </div>

        <div className="mt-6 rounded-lg bg-white p-4 shadow">
          <h2 className="text-lg font-semibold text-gray-800">Login</h2>

          <form onSubmit={handleLogin} className="mt-4 space-y-3">
            <input
              type="text"
              placeholder="Nombre"
              value={loginName}
              onChange={(e) => setLoginName(e.target.value)}
              className="w-full rounded-md border p-2"
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              className="w-full rounded-md border p-2"
            />
            <button
              type="submit"
              className="rounded-md bg-green-600 px-4 py-2 text-white"
            >
              Iniciar sesión
            </button>
          </form>
        </div>

        <div className="mt-6 rounded-lg bg-white p-4 shadow">
          <h2 className="text-lg font-semibold text-gray-800">Agregar hábito</h2>

          <form onSubmit={handleAddHabit} className="mt-4 space-y-3">
            <input
              type="text"
              placeholder="Nombre del hábito"
              value={habitName}
              onChange={(e) => setHabitName(e.target.value)}
              className="w-full rounded-md border p-2"
            />
            <input
              type="text"
              placeholder="Descripción"
              value={habitDescription}
              onChange={(e) => setHabitDescription(e.target.value)}
              className="w-full rounded-md border p-2"
            />
            <button
              type="submit"
              className="rounded-md bg-purple-600 px-4 py-2 text-white"
            >
              Guardar hábito
            </button>
          </form>
        </div>

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
                      {h.description || "Sin descripción"}
                    </p>
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