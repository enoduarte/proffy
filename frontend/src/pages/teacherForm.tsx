import React, { useState, FormEvent } from "react";
import { useHistory } from "react-router-dom";

import PageHeader from "../components/pageHeader";
import Input from "../components/input";
import Textarea from "../components/textarea";
import Select from "../components/select";
import api from "../services/api";

import warningIcon from "../images/icons/warning.svg";

import "../styles/teacherForm.css";

export default function TeacherForm() {
  const history = useHistory();
  const [scheduleItems, updateSchedule] = useState([
    { week_day: 0, from: "10:00", to: "17:00" },
  ]);

  const [form, setForm] = useState({
    name: "",
    avatar: "",
    whatsapp: "",
    bio: "",
    subject: "",
    cost: 0,
    schedule: [{}],
  });

  function addSchedule() {
    updateSchedule([
      ...scheduleItems,
      { week_day: scheduleItems.length, from: "10:00", to: "17:00" },
    ]);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    api
      .post("classes", { ...form, schedule: scheduleItems })
      .then(() => {
        alert("Cadastro realizado com sucesso");
        history.push("/");
      })
      .catch(() => {
        alert("Erro no cadastrar!");
      });
  }

  function handleChange({ target: t }: any) {
    setForm({ ...form, [t.id]: t.value });
  }

  function changeSchedule(e: any, i: number) {
    scheduleItems[i] = { ...scheduleItems[i], [e.target.id]: e.target.value };
    updateSchedule([...scheduleItems]);
    console.log(scheduleItems);
  }

  return (
    <div id="teacher-form" className="container">
      <PageHeader
        title="Que bom que voce vai dar aulas."
        description="O primeiro passo e preencher esse formulario de inscricao"
      />

      <main>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>Seus dados</legend>

            <Input name="name" label="Nome Completo" onChange={handleChange} />
            <Input
              name="avatar"
              label="Avatar"
              type="url"
              onChange={handleChange}
            />
            <Input name="whatsapp" label="Whatsapp" onChange={handleChange} />
            <Textarea name="bio" label="Biografia" onChange={handleChange} />
          </fieldset>

          <fieldset>
            <legend>Sua aula</legend>

            <Select
              name="subject"
              label="Materia"
              onChange={handleChange}
              options={[
                { value: "matematica", label: "Matematica" },
                { value: "Historia", label: "Historia" },
                { value: "Ingles", label: "Ingles" },
                { value: "Quimica", label: "Quimica" },
                { value: "Ciencia", label: "Ciencia" },
                { value: "Fisica", label: "Fisica" },
                { value: "Arte", label: "Arte" },
              ]}
            />
            <Input
              type="number"
              min="0"
              name="cost"
              label="Custo por hora"
              onChange={handleChange}
            />
          </fieldset>

          <fieldset>
            <legend>
              Horarios
              <button type="button" onClick={addSchedule}>
                + Novo horario
              </button>
            </legend>

            {scheduleItems.map((s, i) => (
              <div key={i + 10} className="schedule-item">
                <Select
                  name="week_day"
                  label="Dia da semana"
                  onChange={(e) => changeSchedule(e, i)}
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
                <Input
                  name="from"
                  label="Das"
                  type="time"
                  defaultValue="10:00"
                  onChange={(e) => changeSchedule(e, i)}
                />
                <Input
                  name="to"
                  label="Ate"
                  type="time"
                  defaultValue="17:00"
                  onChange={(e) => changeSchedule(e, i)}
                />
              </div>
            ))}
          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="aviso importante" />
              Importante! <br />
              Preencha todos os dados.
            </p>
            <button>Salvar cadastro</button>
          </footer>
        </form>
      </main>
    </div>
  );
}
