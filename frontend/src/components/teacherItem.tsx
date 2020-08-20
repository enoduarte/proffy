import React from "react";
import api from "../services/api";

import zapIcon from "../images/icons/whatsapp.svg";

import "../styles/teacherItem.css";

interface TeacherItemProps {
  lesson: {
    id: number;
    cost: number;
    user_id: number;
    name: string;
    subject: string;
    whatsapp: string;
    bio: string;
    avatar: string;
  };
}

const TeacherItem: React.FC<TeacherItemProps> = ({ lesson }) => {
  function createConnection() {
    api.post("connection", { user_id: lesson.id });
  }

  return (
    <article className="teacher-item">
      <header>
        <img src={`${lesson.avatar}`} alt={lesson.name} />
        <div>
          <strong>{lesson.name}</strong>
          <span>{lesson.subject}</span>
        </div>
      </header>

      <p>{lesson.bio}</p>

      <footer>
        <p>
          Preco/hora
          <strong>R$ {lesson.cost}</strong>
        </p>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`https://wa.me/${lesson.whatsapp}`}
          onClick={createConnection}
        >
          <img src={zapIcon} alt="Whatsapp" />
          Entrar em contato
        </a>
      </footer>
    </article>
  );
};

export default TeacherItem;
