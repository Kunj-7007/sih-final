"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Users,
  UserCheck,
  Briefcase,
  TrendingUp,
  FileText,
  Eye,
  MoreVertical,
  Users2,
  BookCopy,
  BarChart2,
  DollarSign,
  ClipboardCheck,
} from "lucide-react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

// --- MOCK DATA FOR DEPARTMENTS ---
const departmentsData = [
  {
    id: 1,
    name: "Computer Engineering",
    hod: "Dr. Rajesh Kumar",
    students: 580,
    faculty: 25,
    avgAttendance: 92.5,
    placementRate: 95,
    avgPackage: "8.2 LPA",
    publications: 45,
    topRecruiters: ["Google", "Microsoft", "Amazon", "TCS"],
    intakeTrend: [
      { year: "2021", intake: 130 },
      { year: "2022", intake: 140 },
      { year: "2023", intake: 155 },
      { year: "2024", intake: 150 },
      { year: "2025", intake: 160 },
    ],
  },
  {
    id: 2,
    name: "Information Technology",
    hod: "Dr. Priya Sharma",
    students: 520,
    faculty: 22,
    avgAttendance: 91.8,
    placementRate: 96,
    avgPackage: "7.9 LPA",
    publications: 38,
    topRecruiters: ["Infosys", "Wipro", "Cognizant", "Accenture"],
    intakeTrend: [
      { year: "2021", intake: 110 },
      { year: "2022", intake: 130 },
      { year: "2023", intake: 140 },
      { year: "2024", intake: 145 },
      { year: "2025", intake: 150 },
    ],
  },
  {
    id: 3,
    name: "Mechanical Engineering",
    hod: "Dr. Sunil Gupta",
    students: 490,
    faculty: 30,
    avgAttendance: 88.2,
    placementRate: 88,
    avgPackage: "6.5 LPA",
    publications: 55,
    topRecruiters: ["L&T", "Tata Motors", "Mahindra", "Adani"],
    intakeTrend: [
      { year: "2021", intake: 130 },
      { year: "2022", intake: 120 },
      { year: "2023", intake: 110 },
      { year: "2024", intake: 125 },
      { year: "2025", intake: 130 },
    ],
  },
  {
    id: 4,
    name: "Civil Engineering",
    hod: "Dr. Meera Shah",
    students: 410,
    faculty: 28,
    avgAttendance: 89.5,
    placementRate: 85,
    avgPackage: "6.1 LPA",
    publications: 32,
    topRecruiters: ["Adani Infra", "Reliance Infra", "Simplex", "DLF"],
    intakeTrend: [
      { year: "2021", intake: 105 },
      { year: "2022", intake: 100 },
      { year: "2023", intake: 105 },
      { year: "2024", intake: 110 },
      { year: "2025", intake: 110 },
    ],
  },
];

// Reusable component for displaying key metrics in the cards
const MetricItem = ({
  icon,
  value,
  label,
  colorClass = "text-blue-700",
}: {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  colorClass?: string;
}) => (
  <div className="flex items-center gap-3">
    <div
      className={`flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-lg bg-slate-100 ${colorClass}`}
    >
      {icon}
    </div>
    <div>
      <p className="font-bold text-slate-800 text-sm">{value}</p>
      <p className="text-xs text-slate-500">{label}</p>
    </div>
  </div>
);

// The main card component for a single department
const DepartmentCard = ({
  department,
  themeConfig,
}: {
  department: (typeof departmentsData)[0];
  themeConfig: any;
}) => {
  const studentFacultyRatio =
    (department.students / department.faculty).toFixed(1) + ":1";

  return (
    <Card className="shadow-sm hover:shadow-lg transition-shadow duration-300 border-blue-200 flex flex-col">
      <CardHeader className="p-4 border-b border-blue-200">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base font-bold text-slate-900">
              {department.name}
            </CardTitle>
            <CardDescription className="text-xs text-blue-900/70">
              HOD: {department.hod}
            </CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Eye className="mr-2 h-4 w-4" /> View Details
              </DropdownMenuItem>
              <DropdownMenuItem>
                <FileText className="mr-2 h-4 w-4" /> Generate Report
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Left Column: Key Metrics */}
          <div className="space-y-3">
            <MetricItem
              icon={<Users size={18} />}
              value={department.students}
              label="Total Students"
            />
            <MetricItem
              icon={<UserCheck size={18} />}
              value={department.faculty}
              label="Total Faculty"
            />
            <MetricItem
              icon={<Users2 size={18} />}
              value={studentFacultyRatio}
              label="Student-Faculty Ratio"
            />
            <MetricItem
              icon={<ClipboardCheck size={18} />}
              value={`${department.avgAttendance}%`}
              label="Avg. Attendance"
            />
          </div>

          {/* Right Column: Placement & Research */}
          <div className="space-y-3">
            <MetricItem
              icon={<Briefcase size={18} />}
              value={`${department.placementRate}%`}
              label="Placement Rate"
              colorClass="text-emerald-600"
            />
            <MetricItem
              icon={<DollarSign size={18} />}
              value={department.avgPackage}
              label="Average Package"
              colorClass="text-emerald-600"
            />
            <MetricItem
              icon={<BookCopy size={18} />}
              value={department.publications}
              label="Publications"
              colorClass="text-purple-600"
            />
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-blue-100">
          <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            Student Intake Trend
          </h4>
          <div className="h-[120px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={department.intakeTrend}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="5 5"
                  stroke={themeConfig.border}
                  vertical={false}
                />
                <XAxis
                  dataKey="year"
                  stroke="#888"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#888"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  cursor={{ fill: "rgba(0, 22, 117, 0.05)" }}
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: `1px solid ${themeConfig.border}`,
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                  labelStyle={{ fontWeight: "bold", color: "#001675" }}
                />
                <Bar
                  dataKey="intake"
                  fill="#001675"
                  radius={[4, 4, 0, 0]}
                  barSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// --- MAIN DEPARTMENT PAGE COMPONENT ---
export default function DepartmentPage() {
  // Theme copied from layout to be used in charts and components
  const themeConfig = {
    name: "Blue",
    bg: "bg-slate-50",
    card: "bg-white",
    text: "text-slate-900",
    textMuted: "text-blue-900/70",
    border: "border-blue-200",
  };

  const totalStudents = departmentsData.reduce(
    (sum, dept) => sum + dept.students,
    0
  );
  const totalFaculty = departmentsData.reduce(
    (sum, dept) => sum + dept.faculty,
    0
  );
  const avgPlacement = (
    departmentsData.reduce((sum, dept) => sum + dept.placementRate, 0) /
    departmentsData.length
  ).toFixed(1);

  return (
    <div className="p-6 space-y-6">
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Department Overview
          </h1>
          <p className="text-slate-500">
            Manage and monitor all academic departments of LDRP-ITR.
          </p>
        </div>
        <Button className="mt-4 md:mt-0 bg-[#001675] hover:bg-[#001675]/90">
          + Add New Department
        </Button>
      </div>

      {/* --- HIGH-LEVEL STATS --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-blue-200">
          <CardHeader className="pb-2">
            <CardDescription>Total Departments</CardDescription>
            <CardTitle className="text-3xl font-bold text-[#001675]">
              {departmentsData.length}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card className="border-blue-200">
          <CardHeader className="pb-2">
            <CardDescription>Total Students</CardDescription>
            <CardTitle className="text-3xl font-bold text-[#001675]">
              {totalStudents.toLocaleString()}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card className="border-blue-200">
          <CardHeader className="pb-2">
            <CardDescription>Total Faculty</CardDescription>
            <CardTitle className="text-3xl font-bold text-[#001675]">
              {totalFaculty}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card className="border-blue-200">
          <CardHeader className="pb-2">
            <CardDescription>Avg. Placement Rate</CardDescription>
            <CardTitle className="text-3xl font-bold text-[#001675]">
              {avgPlacement}%
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* --- DEPARTMENT CARDS GRID --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {departmentsData.map((dept) => (
          <DepartmentCard
            key={dept.id}
            department={dept}
            themeConfig={themeConfig}
          />
        ))}
      </div>
    </div>
  );
}
