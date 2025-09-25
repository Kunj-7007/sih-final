"use client";

import React, { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Search,
  Users,
  Percent,
  TrendingUp,
  AlertTriangle,
  Filter,
  Eye,
  Mail,
  GraduationCap,
} from "lucide-react";

// --- MOCK STUDENT DATA (UPDATED WITH CGPI) ---
const studentsData = [
  {
    id: "7001",
    name: "Aarav Sharma",
    class: "CSE-2A",
    subject: "Data Structures",
    attendance: 95,
    cgpi: 8.8,
  },
  {
    id: "7002",
    name: "Diya Patel",
    class: "CSE-2A",
    subject: "Data Structures",
    attendance: 82,
    cgpi: 7.6,
  },
  {
    id: "7003",
    name: "Rohan Mehta",
    class: "CSE-2A",
    subject: "Data Structures",
    attendance: 74,
    cgpi: 6.5,
  },
  {
    id: "7004",
    name: "Priya Singh",
    class: "CSE-2A",
    subject: "Data Structures",
    attendance: 98,
    cgpi: 9.2,
  },
  {
    id: "8011",
    name: "Advait Kumar",
    class: "CSE-3B",
    subject: "Algorithm Analysis",
    attendance: 91,
    cgpi: 8.5,
  },
  {
    id: "8012",
    name: "Isha Verma",
    class: "CSE-3B",
    subject: "Algorithm Analysis",
    attendance: 89,
    cgpi: 8.1,
  },
  {
    id: "8013",
    name: "Kabir Joshi",
    class: "CSE-3B",
    subject: "Algorithm Analysis",
    attendance: 68,
    cgpi: 5.9,
  },
  {
    id: "7021",
    name: "Vivaan Reddy",
    class: "CSE-2B",
    subject: "Database Systems",
    attendance: 85,
    cgpi: 7.8,
  },
  {
    id: "7022",
    name: "Ananya Gupta",
    class: "CSE-2B",
    subject: "Database Systems",
    attendance: 93,
    cgpi: 9.0,
  },
];

// Reusable Stat Card for the top summary
const StatCard = ({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) => (
  <Card className="border-blue-200">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold text-[#001675]">{value}</div>
    </CardContent>
  </Card>
);

// --- MAIN STUDENT MANAGEMENT PAGE COMPONENT ---
export default function StudentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    class: "All Classes",
    subject: "All Subjects",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Memoized filtering logic
  const filteredStudents = useMemo(() => {
    return studentsData.filter((student) => {
      const searchMatch =
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.id.includes(searchTerm);
      const classMatch =
        filters.class === "All Classes" || student.class === filters.class;
      const subjectMatch =
        filters.subject === "All Subjects" ||
        student.subject === filters.subject;
      return searchMatch && classMatch && subjectMatch;
    });
  }, [searchTerm, filters]);

  // Pagination logic
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Summary statistics calculation
  const summary = useMemo(() => {
    const studentCount = filteredStudents.length;
    if (studentCount === 0)
      return { count: 0, avgAttendance: "N/A", avgCgpi: "N/A", atRisk: 0 };

    const totalAttendance = filteredStudents.reduce(
      (acc, s) => acc + s.attendance,
      0
    );
    const totalCgpi = filteredStudents.reduce((acc, s) => acc + s.cgpi, 0);
    const studentsAtRisk = filteredStudents.filter(
      (s) => s.attendance < 75 || s.cgpi < 6.5
    ).length;

    return {
      count: studentCount,
      avgAttendance: (totalAttendance / studentCount).toFixed(1) + "%",
      avgCgpi: (totalCgpi / studentCount).toFixed(1) + " / 10",
      atRisk: studentsAtRisk,
    };
  }, [filteredStudents]);

  // Dynamic filter options
  const classOptions = [
    "All Classes",
    ...Array.from(new Set(studentsData.map((s) => s.class))),
  ];
  const subjectOptions = [
    "All Subjects",
    ...Array.from(new Set(studentsData.map((s) => s.subject))),
  ];

  // Helper to determine status color for badges
  const getStatusColor = (
    value: number,
    threshold1: number,
    threshold2: number
  ) => {
    if (value >= threshold1)
      return "text-emerald-600 bg-emerald-50 border-emerald-200";
    if (value >= threshold2)
      return "text-amber-600 bg-amber-50 border-amber-200";
    return "text-red-600 bg-red-50 border-red-200";
  };

  const getCgpiStatusColor = (cgpi: number) => {
    if (cgpi >= 8.5)
      return "text-emerald-600 bg-emerald-50 border-emerald-200 font-semibold";
    if (cgpi >= 7.0)
      return "text-amber-600 bg-amber-50 border-amber-200 font-semibold";
    return "text-red-600 bg-red-50 border-red-200 font-semibold";
  };

  return (
    <main className="p-6 space-y-6">
      {/* --- HEADER --- */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Student Management
        </h1>
        <p className="text-blue-900/70">
          View, filter, and manage students in your assigned classes.
        </p>
      </div>

      {/* --- SUMMARY STATS --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<Users className="h-4 w-4 text-blue-900/70" />}
          title="Filtered Students"
          value={summary.count.toString()}
        />
        <StatCard
          icon={<Percent className="h-4 w-4 text-blue-900/70" />}
          title="Avg. Attendance"
          value={summary.avgAttendance}
        />
        <StatCard
          icon={<GraduationCap className="h-4 w-4 text-blue-900/70" />}
          title="Average CGPI"
          value={summary.avgCgpi}
        />
        <StatCard
          icon={<AlertTriangle className="h-4 w-4 text-blue-900/70" />}
          title="Students at Risk"
          value={summary.atRisk.toString()}
        />
      </div>

      {/* --- MAIN CONTENT CARD WITH TABLE --- */}
      <Card className="border-blue-200">
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex-1 w-full">
              <CardTitle>Student List</CardTitle>
              <CardDescription>
                A list of students based on your active filters.
              </CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
              {/* Search Input */}
              <div className="relative w-full sm:w-auto">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-blue-900/70" />
                <Input
                  placeholder="Search by name or ID..."
                  className="pl-8 w-full sm:w-[250px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              {/* Filter Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full sm:w-auto">
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <DropdownMenuLabel>Filter by Class</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {classOptions.map((option) => (
                    <DropdownMenuCheckboxItem
                      key={option}
                      checked={filters.class === option}
                      onSelect={() =>
                        setFilters((f) => ({ ...f, class: option }))
                      }
                    >
                      {option}
                    </DropdownMenuCheckboxItem>
                  ))}
                  <DropdownMenuLabel className="mt-2">
                    Filter by Subject
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {subjectOptions.map((option) => (
                    <DropdownMenuCheckboxItem
                      key={option}
                      checked={filters.subject === option}
                      onSelect={() =>
                        setFilters((f) => ({ ...f, subject: option }))
                      }
                    >
                      {option}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Enrollment No.</TableHead>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Class / Subject</TableHead>
                  <TableHead>Attendance</TableHead>
                  <TableHead>CGPI</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedStudents.length > 0 ? (
                  paginatedStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-mono text-xs">
                        {student.id}
                      </TableCell>
                      <TableCell className="font-medium text-slate-800">
                        {student.name}
                      </TableCell>
                      <TableCell>
                        <div className="font-semibold text-sm">
                          {student.class}
                        </div>
                        <div className="text-xs text-blue-900/70">
                          {student.subject}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={getStatusColor(student.attendance, 90, 75)}
                        >
                          {student.attendance}%
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={getCgpiStatusColor(student.cgpi)}
                        >
                          {student.cgpi.toFixed(1)} / 10
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View Full Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Mail className="mr-2 h-4 w-4" />
                              Send Message
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center h-24">
                      No students found. Try adjusting your filters.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <span className="text-sm text-blue-900/70">
            Page {currentPage} of {totalPages}
          </span>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              <span className="sr-only">Next</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </main>
  );
}
