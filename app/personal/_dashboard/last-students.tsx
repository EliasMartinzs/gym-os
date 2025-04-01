import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

const fakePeople = [
  {
    id: "1",
    user: {
      email: "john.doe@example.com",
      name: "John Doe",
      phone: "+1234567890",
      avatarUrl: "https://randomuser.me/api/portraits/men/1.jpg",
      role: "PERSONAL_TRAINER",
    },
    student: {
      targetWeight: 75,
      workoutDays: 4,
      birthDate: "1990-01-15",
      gender: "MALE",
      progressPhoto: [
        {
          category: "FRONT",
          photoUrl: "https://randomuser.me/api/portraits/men/1.jpg",
        },
      ],
    },
  },
  {
    id: "2",
    user: {
      email: "jane.smith@example.com",
      name: "Jane Smith",
      phone: "+9876543210",
      avatarUrl: "https://randomuser.me/api/portraits/women/2.jpg",
      role: "PERSONAL_TRAINER",
    },
    student: {
      targetWeight: 60,
      workoutDays: 3,
      birthDate: "1985-05-20",
      gender: "FEMALE",
      progressPhoto: [
        {
          category: "SIDE",
          photoUrl: "https://randomuser.me/api/portraits/women/2.jpg",
        },
      ],
    },
  },
  {
    id: "3",
    user: {
      email: "mark.brown@example.com",
      name: "Mark Brown",
      phone: "+1122334455",
      avatarUrl: "https://randomuser.me/api/portraits/men/3.jpg",
      role: "PERSONAL_TRAINER",
    },
    student: {
      targetWeight: 80,
      workoutDays: 5,
      birthDate: "1992-09-10",
      gender: "MALE",
      progressPhoto: [
        {
          category: "BACK",
          photoUrl: "https://randomuser.me/api/portraits/men/3.jpg",
        },
      ],
    },
  },
  {
    id: "4",
    user: {
      email: "lucy.jones@example.com",
      name: "Lucy Jones",
      phone: "+9988776655",
      avatarUrl: "https://randomuser.me/api/portraits/women/4.jpg",
      role: "PERSONAL_TRAINER",
    },
    student: {
      targetWeight: 65,
      workoutDays: 4,
      birthDate: "1995-07-30",
      gender: "FEMALE",
      progressPhoto: [
        {
          category: "FLEXED",
          photoUrl: "https://randomuser.me/api/portraits/women/4.jpg",
        },
      ],
    },
  },
  {
    id: "5",
    user: {
      email: "alex.lee@example.com",
      name: "Alex Lee",
      phone: "+1231231234",
      avatarUrl: "https://randomuser.me/api/portraits/men/5.jpg",
      role: "PERSONAL_TRAINER",
    },
    student: {
      targetWeight: 70,
      workoutDays: 3,
      birthDate: "1993-11-05",
      gender: "MALE",
      progressPhoto: [
        {
          category: "RELAXED",
          photoUrl: "https://randomuser.me/api/portraits/men/5.jpg",
        },
      ],
    },
  },
];

export const LastStudents = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ultimos alunos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {fakePeople.map((p) => (
            <Link
              href={p.id}
              key={p.id}
              className="p-2 flex items-center rounded-3xl gap-x-3 border border-border hover:bg-background/30 transition-colors"
            >
              <Image
                src={p.user.avatarUrl}
                alt="a"
                width={48}
                height={48}
                className="object-cover rounded-full"
              />
              <p>{p.user.name}</p>
              <p className="hidden lg:block">{p.user.phone}</p>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
