import {
  Calendar,
  Dumbbell,
  LayoutPanelLeft,
  Users,
  Utensils,
} from "lucide-react";

const personalLinks = [
  {
    id: 1,
    title: "Dashboard",
    icon: <LayoutPanelLeft />,
    href: "/personal",
  },
  {
    id: 2,
    title: "Alunos",
    icon: <Users />,
    href: "/personal/students",
  },
  {
    id: 3,
    title: "Treinos",
    icon: <Dumbbell />,
    href: "/personal/workouts",
  },
  {
    id: 4,
    title: "Agenda",
    icon: <Calendar />,
    href: "/personal/calendar",
  },
];

export { personalLinks };
