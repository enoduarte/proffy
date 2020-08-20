import React, { useState, useEffect } from "react";
import api from "../services/api";

import PageHeader from "../components/pageHeader";
import TeacherItem from "../components/teacherItem";
import Input from "../components/input";
import Select from "../components/select";

import "../styles/teacherList.css";

export default function TeacherList() {
  const [classes, setClasses] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    api.get("classes", { params: { subject: search } }).then(({ data }) => {
      setClasses(data);
      console.log(search);
    });
  }, [search]);

  return (
    <div id="teacher-list" className="container">
      <PageHeader title="Estes sao os proffys disponiveis.">
        <form id="search-teachers">
          <Select
            name="subject"
            label="Materia"
            onChange={(e) => setSearch(e.target.value)}
            options={[
              { value: "", label: "Todas" },
              { value: "matematica", label: "Matematica" },
              { value: "Historia", label: "Historia" },
              { value: "Ingles", label: "Ingles" },
              { value: "Quimica", label: "Quimica" },
              { value: "Ciencia", label: "Ciencia" },
              { value: "Fisica", label: "Fisica" },
              { value: "Arte", label: "Arte" },
            ]}
          />
          <Select
            name="week_day"
            label="Dia da semana"
            options={[
              { value: "0", label: "Domingo" },
              { value: "1", label: "Segunda" },
              { value: "2", label: "Terca" },
              { value: "3", label: "Quarta" },
              { value: "4", label: "Quinta" },
              { value: "5", label: "Sexta" },
              { value: "6", label: "Sabado" },
            ]}
          />
          <Input name="time" label="Hora" type="time" step="900" />
        </form>
      </PageHeader>

      <main>
        {classes.map((c: any) => (
          <TeacherItem key={c.id} lesson={c} />
        ))}
      </main>
    </div>
  );
}
