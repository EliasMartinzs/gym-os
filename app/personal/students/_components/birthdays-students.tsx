"use client";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { getStudentsByBirthDate } from "@/features/personal/student/api/get-students-by-birthdate";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { NoData } from "@/components/reusable/no-data";

export const BirthdayStudents = () => {
  const { data, isLoading, isError } = getStudentsByBirthDate();
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 12;

  if (isLoading) return <></>;
  if (isError) return <></>;

  if (!data?.data || data?.data?.length === 0) {
    return (
      <NoData
        title="Aqui você acompanha quais alunos estão comemorando aniversário hoje!"
        description="Parece que nenhum aluno seu está comemorando aniversário hoje."
        extra={[
          "✅ Planejar surpresas para os próximos aniversários",
          "✅ Revisar as datas de aniversário cadastradas",
          "✅ Criar uma promoção especial para aniversariantes",
        ]}
      />
    );
  }

  const totalPages = Math.ceil(data.data.length / usersPerPage);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = data.data.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle>Aniversariantes do dia</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {currentUsers.map((user) => (
            <Link
              href={`/personal/${user.id}`}
              key={user.id}
              className="bg-card rounded-xl p-2 flex items-center gap-4 border shadow-3xl"
            >
              <div className="relative size-8 rounded-full">
                <Image
                  src={user.avatarUrl as string}
                  alt={user.name}
                  fill
                  className="object-cover rounded-full size-8"
                />
              </div>
              <p className="font-medium text-sm">{user.name}</p>
            </Link>
          ))}
        </div>

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage > 1) paginate(currentPage - 1);
                }}
                className={
                  currentPage === 1 ? "pointer-events-none opacity-50" : ""
                }
              >
                <ArrowLeft />
              </Button>
            </PaginationItem>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (number) => (
                <PaginationItem key={number}>
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      paginate(number);
                    }}
                    isActive={currentPage === number}
                    className="bg-transparent text-foreground hover:bg-border transition-colors"
                  >
                    {number}
                  </PaginationLink>
                </PaginationItem>
              )
            )}

            <PaginationItem>
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage < totalPages) paginate(currentPage + 1);
                }}
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              >
                <ArrowRight />
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </CardContent>
    </Card>
  );
};
