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
import { formatDate } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { fakeUsers } from "../students";

export const BirthdayStudents = () => {
  const users = fakeUsers;
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  // Calculate total pages
  const totalPages = Math.ceil(users.length / usersPerPage);

  // Get current users
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Aniversariantes do dia</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 xl:grid-cols-2 gap-4 xl:gap-x-8">
        {currentUsers.map((user) => (
          <div
            key={user.id}
            className="flex gap-3 items-center p-2 border-b border-border"
          >
            <Image
              src={user.avatarUrl as string}
              alt={user.name}
              width={48}
              height={48}
              className="object-cover rounded-full"
            />
            <div>
              <p className="font-medium">{user.name}</p>
              <p className="text-sm text-muted-foreground">
                Joined: {formatDate(user.createdAt)}
              </p>
            </div>
          </div>
        ))}
      </CardContent>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <Button
              variant="pagination"
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

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
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
          ))}

          <PaginationItem>
            <Button
              variant="pagination"
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
    </Card>
  );
};
