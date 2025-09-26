"use client";

import React from "react";
import {
  Building2,
  Users,
  UserCheck,
  IndianRupee,
  MoreVertical,
  BookOpen,
  Mail,
  TrendingUp,
  FileText,
  Eye,
  Percent,
  FlaskConical,
  Library,
  Smile,
  Ratio,
  ShieldCheck,
} from "lucide-react";
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
import { Area, AreaChart, ResponsiveContainer, Tooltip } from "recharts";

// --- MOCK DATA FOR COLLEGES (ENHANCED) ---
const collegesData = [
  {
    id: 1,
    name: "LDRP Institute of Technology & Research",
    principal: "Dr. A. B. Sharma",
    email: "principal.ldrp@ksv.edu.in",
    established: 2005,
    students: 2845,
    faculty: 152,
    revenue: 5.9,
    placementRate: 87,
    programs: ["B.Tech", "M.Tech", "MBA", "MCA", "Ph.D"],
    enrollmentTrend: [
      { year: "2021", val: 2500 },
      { year: "2022", val: 2650 },
      { year: "2023", val: 2710 },
      { year: "2024", val: 2800 },
      { year: "2025", val: 2845 },
    ],
    infrastructureScore: 92,
    researchOutput: 78,
    studentSatisfaction: 89,
  },
  {
    id: 2,
    name: "C. M. Patel College of Nursing",
    principal: "Dr. Sunita Patel",
    email: "principal.cmpcn@ksv.edu.in",
    established: 2010,
    students: 3456,
    faculty: 210,
    revenue: 3.6,
    placementRate: 91,
    programs: ["B.Sc. Nursing", "M.Sc. Nursing", "Ph.D"],
    enrollmentTrend: [
      { year: "2021", val: 3100 },
      { year: "2022", val: 3250 },
      { year: "2023", val: 3350 },
      { year: "2024", val: 3400 },
      { year: "2025", val: 3456 },
    ],
    infrastructureScore: 85,
    researchOutput: 65,
    studentSatisfaction: 94,
  },
  {
    id: 3,
    name: "K. B. Institute of Pharmaceutical Education",
    principal: "Dr. Rakesh Singh",
    email: "principal.kbipr@ksv.edu.in",
    established: 1995,
    students: 2234,
    faculty: 100,
    revenue: 4.5,
    placementRate: 82,
    programs: ["B.Pharm", "M.Pharm", "Pharm.D"],
    enrollmentTrend: [
      { year: "2021", val: 2000 },
      { year: "2022", val: 2100 },
      { year: "2023", val: 2150 },
      { year: "2024", val: 2200 },
      { year: "2025", val: 2234 },
    ],
    infrastructureScore: 88,
    researchOutput: 81,
    studentSatisfaction: 85,
  },
];

// --- HELPER COMPONENTS FOR VISUALS ---

// New Component to replace progress bars
const PerformanceMetric = ({
  icon,
  label,
  value,
  color,
  suffix = "%",
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  color: string;
  suffix?: string;
}) => (
  <div className="flex items-center gap-3">
    <div
      className={`flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full ${color}/20 text-${color}`}
    >
      {icon}
    </div>
    <div>
      <p className="text-sm font-bold text-slate-800">
        {value}
        {suffix}
      </p>
      <p className="text-xs text-slate-500">{label}</p>
    </div>
  </div>
);

// Stat component for key numbers inside the card
const KeyStat = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) => (
  <div className="flex items-start gap-3 bg-slate-50 p-3 rounded-lg">
    <div className="text-slate-500 mt-1">{icon}</div>
    <div>
      <p className="text-lg font-bold text-slate-900">{value}</p>
      <p className="text-xs text-slate-500 font-medium">{label}</p>
    </div>
  </div>
);

// --- MAIN COLLEGE CARD COMPONENT ---
const CollegeCard = ({
  college,
}: {
  college: (typeof collegesData)[0];
}) => {
  const themeConfig = {
    primary: { fill: "#3b82f6", stroke: "#1d4ed8" },
  };

  const studentFacultyRatio = (college.students / college.faculty).toFixed(1);

  return (
    <Card className="shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-300 border-slate-200">
      <CardHeader className="p-4 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-slate-100 p-3 rounded-lg">
              <Building2 className="h-6 w-6 text-slate-600" />
            </div>
            <div>
              <CardTitle className="text-base font-bold text-slate-900">
                {college.name}
              </CardTitle>
              <CardDescription className="text-xs text-slate-500">
                Principal: {college.principal} • Estd. {college.established}
              </CardDescription>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Eye className="mr-2 h-4 w-4" /> View Full Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <FileText className="mr-2 h-4 w-4" /> Generate Performance
                Report
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="p-4 grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Col 1: Performance Indicators */}
        <div className="md:col-span-3 space-y-4">
          <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Performance Indicators
          </h4>
          <div className="space-y-3">
            <PerformanceMetric
              icon={<ShieldCheck size={20} />}
              label="Placement Rate"
              value={college.placementRate}
              color="emerald-500"
            />
            <PerformanceMetric
              icon={<Smile size={20} />}
              label="Student Satisfaction"
              value={college.studentSatisfaction}
              color="amber-500"
            />
            <PerformanceMetric
              icon={<Library size={20} />}
              label="Infrastructure Score"
              value={college.infrastructureScore}
              color="sky-500"
            />
            <PerformanceMetric
              icon={<FlaskConical size={20} />}
              label="Research Output"
              value={college.researchOutput}
              color="purple-500"
            />
          </div>
        </div>

        {/* Col 2: Enrollment & Academics */}
        <div className="md:col-span-5 md:border-l md:border-r px-4 space-y-4">
          <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Enrollment & Academics
          </h4>
          <div>
            <div className="flex justify-between items-center">
              <p className="text-sm font-medium text-slate-700">
                Enrollment Trend
              </p>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </div>
            <div className="h-[90px] mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={college.enrollmentTrend}
                  margin={{ top: 5, right: 0, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id={`colorEnroll-${college.id}`}
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor={themeConfig.primary.fill}
                        stopOpacity={0.7}
                      />
                      <stop
                        offset="95%"
                        stopColor={themeConfig.primary.fill}
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <Tooltip
                    contentStyle={{ fontSize: "12px", borderRadius: "8px" }}
                    formatter={(value) => [
                      `${(value as number).toLocaleString()} Students`,
                      "",
                    ]}
                  />
                  <Area
                    type="monotone"
                    dataKey="val"
                    stroke={themeConfig.primary.stroke}
                    fill={`url(#colorEnroll-${college.id})`}
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-slate-700 mb-2">
              Core Programs
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {college.programs.map((prog) => (
                <Badge key={prog} variant="secondary" className="font-normal">
                  {prog}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Col 3: Key Stats & Financials */}
        <div className="md:col-span-4 space-y-4">
          <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Key Stats
          </h4>
          <div className="grid grid-cols-2 gap-3">
            <KeyStat
              icon={<Users size={20} />}
              label="Total Students"
              value={college.students.toLocaleString()}
            />
            <KeyStat
              icon={<UserCheck size={20} />}
              label="Total Faculty"
              value={college.faculty}
            />
            <KeyStat
              icon={<Ratio size={20} />}
              label="Student-Faculty Ratio"
              value={`${studentFacultyRatio}:1`}
            />
            <KeyStat
              icon={<IndianRupee size={20} />}
              label="Annual Revenue"
              value={`₹${college.revenue} Cr`}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// --- MAIN PAGE COMPONENT ---
export default function CollegeManagementPage() {
  const totalStudents = collegesData.reduce((acc, c) => acc + c.students, 0);
  const totalFaculty = collegesData.reduce((acc, c) => acc + c.faculty, 0);
  const totalRevenue = collegesData.reduce((acc, c) => acc + c.revenue, 0);

  return (
    <div className="p-6 space-y-6 bg-slate-50/70">
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            College Management
          </h1>
          <p className="text-slate-500">
            A comprehensive overview of all affiliated colleges.
          </p>
        </div>
        <Button className="mt-4 md:mt-0 bg-[#001675] hover:bg-[#001675]/90">
          + Add New College
        </Button>
      </div>

      {/* --- UNIVERSITY-WIDE STATS --- */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Colleges
            </CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{collegesData.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Students
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalStudents.toLocaleString()}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Faculty</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalFaculty.toLocaleString()}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <IndianRupee className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₹{totalRevenue.toFixed(1)} Cr
            </div>
          </CardContent>
        </Card>
      </div>

      {/* --- COLLEGES LIST --- */}
      <div className="space-y-4">
        {collegesData.map((college) => (
          <CollegeCard key={college.id} college={college} />
        ))}
      </div>
    </div>
  );
}

// "use client";

// import React from "react";
// import {
//   Building2,
//   Users,
//   UserCheck,
//   IndianRupee,
//   MoreVertical,
//   BookOpen,
//   Mail,
//   TrendingUp,
//   FileText,
//   Eye,
//   Percent,
//   FlaskConical,
//   Library,
//   Smile,
//   Ratio,
// } from "lucide-react";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Progress } from "@/components/ui/progress";
// import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";

// // --- MOCK DATA FOR COLLEGES (WITH MORE DATA POINTS) ---
// const collegesData = [
//   {
//     name: "LDRP Institute of Technology & Research",
//     principal: "Dr. A. B. Sharma",
//     email: "principal.ldrp@ksv.edu.in",
//     established: 2005,
//     students: 2845,
//     faculty: 152,
//     revenue: 5.9, // in Cr
//     placementRate: 87,
//     programs: ["B.Tech", "M.Tech", "MBA", "MCA"],
//     enrollmentTrend: [
//       { year: "21", val: 2500 },
//       { year: "22", val: 2650 },
//       { year: "23", val: 2710 },
//       { year: "24", val: 2800 },
//       { year: "25", val: 2845 },
//     ],
//     infrastructureScore: 92,
//     researchOutput: 78, // Representing publications/citations score
//     studentSatisfaction: 89,
//   },
//   {
//     name: "C. M. Patel College of Nursing",
//     principal: "Dr. Sunita Patel",
//     email: "principal.cmpcn@ksv.edu.in",
//     established: 2010,
//     students: 3456,
//     faculty: 210,
//     revenue: 3.6, // in Cr
//     placementRate: 91,
//     programs: ["B.Sc. Nursing", "M.Sc. Nursing", "Ph.D"],
//     enrollmentTrend: [
//       { year: "21", val: 3100 },
//       { year: "22", val: 3250 },
//       { year: "23", val: 3350 },
//       { year: "24", val: 3400 },
//       { year: "25", val: 3456 },
//     ],
//     infrastructureScore: 85,
//     researchOutput: 65,
//     studentSatisfaction: 94,
//   },
//   {
//     name: "K. B. Institute of Pharmaceutical Education",
//     principal: "Dr. Rakesh Singh",
//     email: "principal.kbipr@ksv.edu.in",
//     established: 1995,
//     students: 2234,
//     faculty: 100,
//     revenue: 4.5, // in Cr
//     placementRate: 82,
//     programs: ["B.Pharm", "M.Pharm", "Pharm.D"],
//     enrollmentTrend: [
//       { year: "21", val: 2000 },
//       { year: "22", val: 2100 },
//       { year: "23", val: 2150 },
//       { year: "24", val: 2200 },
//       { year: "25", val: 2234 },
//     ],
//     infrastructureScore: 88,
//     researchOutput: 81,
//     studentSatisfaction: 85,
//   },
// ];

// // Reusable Stat Component for the top grid
// const StatCard = ({ icon, label, value, subValue }: any) => (
//   <div className="flex items-center gap-3 rounded-lg bg-slate-50 p-3">
//     <div className="text-blue-600">{icon}</div>
//     <div>
//       <p className="font-bold text-slate-800 text-lg">{value}</p>
//       <p className="text-xs text-slate-500">{label}</p>
//     </div>
//   </div>
// );

// // Reusable Progress Bar Component
// const PerformanceBar = ({
//   icon,
//   label,
//   value,
//   colorClass = "bg-blue-600",
// }: any) => (
//   <div>
//     <div className="flex items-center justify-between mb-1">
//       <div className="flex items-center gap-2">
//         {icon}
//         <span className="text-xs font-medium text-slate-600">{label}</span>
//       </div>
//       <span className="text-xs font-bold text-slate-700">{value}%</span>
//     </div>
//     <Progress
//       value={value}
//       // indicatorClassName={colorClass}
//     />
//   </div>
// );

// const CollegeCard = ({ college }: { college: (typeof collegesData)[0] }) => {
//   const themeConfig = {
//     primary: { fill: "#3b82f6", stroke: "#1d4ed8" },
//     card: "bg-white",
//     border: "border-slate-200",
//   };

//   const studentFacultyRatio = (college.students / college.faculty).toFixed(1);

//   return (
//     <Card className="shadow-sm hover:shadow-md transition-shadow duration-300 border-slate-200">
//       <CardHeader className="p-4 border-b">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-4">
//             <div className="bg-blue-100 text-blue-700 p-3 rounded-lg">
//               <Building2 className="h-6 w-6" />
//             </div>
//             <div>
//               <CardTitle className="text-base font-bold text-slate-900 leading-tight">
//                 {college.name}
//               </CardTitle>
//               <CardDescription className="text-xs text-slate-500">
//                 Estd. {college.established}
//               </CardDescription>
//             </div>
//           </div>
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="ghost" size="icon">
//                 <MoreVertical className="h-4 w-4" />
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="end">
//               <DropdownMenuItem>
//                 <Eye className="mr-2 h-4 w-4" /> View Details
//               </DropdownMenuItem>
//               <DropdownMenuItem>
//                 <FileText className="mr-2 h-4 w-4" /> Generate Report
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>
//       </CardHeader>

//       <CardContent className="p-4">
//         {/* Top Stats Grid */}
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-4">
//           <StatCard
//             icon={<Users className="h-5 w-5" />}
//             label="Students"
//             value={college.students.toLocaleString()}
//           />
//           <StatCard
//             icon={<UserCheck className="h-5 w-5" />}
//             label="Faculty"
//             value={college.faculty}
//           />
//           <StatCard
//             icon={<Ratio className="h-5 w-5" />}
//             label="Student-Faculty Ratio"
//             value={`${studentFacultyRatio}:1`}
//           />
//           <StatCard
//             icon={<Percent className="h-5 w-5" />}
//             label="Placement Rate"
//             value={`${college.placementRate}%`}
//           />
//           <StatCard
//             icon={<IndianRupee className="h-5 w-5" />}
//             label="Annual Revenue"
//             value={`₹${college.revenue} Cr`}
//           />
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
//           {/* Left: Details & Performance */}
//           <div className="lg:col-span-2 space-y-4">
//             <div className="p-3 border border-dashed rounded-lg">
//               <h4 className="text-sm font-semibold text-slate-800 mb-2">
//                 Administration
//               </h4>
//               <div className="flex items-center gap-2 text-sm">
//                 <Mail className="h-4 w-4 text-slate-400" />
//                 <span className="font-medium text-slate-600">
//                   {college.principal}:
//                 </span>
//                 <a
//                   href={`mailto:${college.email}`}
//                   className="text-blue-600 hover:underline text-xs"
//                 >
//                   {college.email}
//                 </a>
//               </div>
//             </div>

//             <div className="space-y-3">
//               <PerformanceBar
//                 icon={<Library className="h-4 w-4 text-slate-500" />}
//                 label="Infrastructure Score"
//                 value={college.infrastructureScore}
//                 colorClass="bg-emerald-500"
//               />
//               <PerformanceBar
//                 icon={<FlaskConical className="h-4 w-4 text-slate-500" />}
//                 label="Research Output"
//                 value={college.researchOutput}
//                 colorClass="bg-purple-500"
//               />
//               <PerformanceBar
//                 icon={<Smile className="h-4 w-4 text-slate-500" />}
//                 label="Student Satisfaction"
//                 value={college.studentSatisfaction}
//                 colorClass="bg-amber-500"
//               />
//             </div>
//           </div>

//           {/* Right: Enrollment & Programs */}
//           <div className="space-y-3">
//             <div>
//               <h4 className="text-sm font-semibold text-slate-700 mb-1">
//                 Enrollment Trend
//               </h4>
//               <div className="h-[80px]">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <AreaChart
//                     data={college.enrollmentTrend}
//                     margin={{ top: 5, right: 0, left: 0, bottom: 0 }}
//                   >
//                     <defs>
//                       <linearGradient
//                         id="colorEnroll"
//                         x1="0"
//                         y1="0"
//                         x2="0"
//                         y2="1"
//                       >
//                         <stop
//                           offset="5%"
//                           stopColor={themeConfig.primary.fill}
//                           stopOpacity={0.7}
//                         />
//                         <stop
//                           offset="95%"
//                           stopColor={themeConfig.primary.fill}
//                           stopOpacity={0}
//                         />
//                       </linearGradient>
//                     </defs>
//                     <Tooltip
//                       contentStyle={{ fontSize: "12px", borderRadius: "8px" }}
//                     />
//                     <Area
//                       type="monotone"
//                       dataKey="val"
//                       stroke={themeConfig.primary.stroke}
//                       fill="url(#colorEnroll)"
//                       strokeWidth={2}
//                     />
//                   </AreaChart>
//                 </ResponsiveContainer>
//               </div>
//             </div>
//             <div>
//               <h4 className="text-sm font-semibold text-slate-700 mb-2">
//                 Core Programs
//               </h4>
//               <div className="flex flex-wrap gap-1">
//                 {college.programs.map((prog) => (
//                   <Badge key={prog} variant="outline" className="text-xs">
//                     {prog}
//                   </Badge>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// // --- MAIN COLLEGE MANAGEMENT PAGE COMPONENT ---
// export default function CollegeManagementPage() {
//   return (
//     <div className="p-6 space-y-6 bg-slate-50">
//       {/* --- HEADER --- */}
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between">
//         <div>
//           <h1 className="text-2xl font-bold text-slate-900">
//             College Management
//           </h1>
//           <p className="text-slate-500">
//             Oversee and manage all affiliated colleges under KSV University.
//           </p>
//         </div>
//         <Button className="mt-4 md:mt-0 bg-[#001675] hover:bg-[#001675]/90">
//           + Add New College
//         </Button>
//       </div>

//       {/* --- COLLEGES LIST --- */}
//       <div className="space-y-4">
//         {collegesData.map((college) => (
//           <CollegeCard key={college.name} college={college} />
//         ))}
//       </div>
//     </div>
//   );
// }

// // "use client";

// // import React from "react";
// // import {
// //   Building2,
// //   Users,
// //   UserCheck,
// //   IndianRupee,
// //   Star,
// //   TrendingUp,
// //   MoreVertical,
// //   BookOpen,
// //   Mail,
// //   Phone,
// //   FileText,
// //   Eye,
// // } from "lucide-react";
// // import {
// //   Card,
// //   CardContent,
// //   CardDescription,
// //   CardHeader,
// //   CardTitle,
// // } from "@/components/ui/card";
// // import { Badge } from "@/components/ui/badge";
// // import { Button } from "@/components/ui/button";
// // import {
// //   DropdownMenu,
// //   DropdownMenuContent,
// //   DropdownMenuItem,
// //   DropdownMenuTrigger,
// // } from "@/components/ui/dropdown-menu";
// // import { Progress } from "@/components/ui/progress";
// // import Image from "next/image";
// // import {
// //   Area,
// //   AreaChart,
// //   ResponsiveContainer,
// //   Tooltip,
// //   XAxis,
// //   YAxis,
// // } from "recharts";

// // // --- MOCK DATA FOR COLLEGES ---
// // const collegesData = [
// //   {
// //     name: "LDRP Institute of Technology & Research",
// //     principal: "Dr. A. B. Sharma",
// //     email: "principal.ldrp@ksv.edu.in",
// //     phone: "+91 79 2324 0987",
// //     logo: "/ldrp-logo.png", // Placeholder path
// //     established: 2005,
// //     students: 2845,
// //     faculty: 152,
// //     revenue: 5.9, // in Cr
// //     placementRate: 87,
// //     rating: 4.6,
// //     accreditation: "NAAC A+",
// //     programs: ["B.Tech", "M.Tech", "MBA", "MCA"],
// //     enrollmentTrend: [
// //       { year: "2021", students: 2500 },
// //       { year: "2022", students: 2650 },
// //       { year: "2023", students: 2710 },
// //       { year: "2024", students: 2800 },
// //       { year: "2025", students: 2845 },
// //     ],
// //   },
// //   {
// //     name: "C. M. Patel College of Nursing",
// //     principal: "Dr. Sunita Patel",
// //     email: "principal.cmpcn@ksv.edu.in",
// //     phone: "+91 79 2324 1122",
// //     logo: "/cmp-logo.png", // Placeholder path
// //     established: 2010,
// //     students: 3456,
// //     faculty: 210,
// //     revenue: 3.6, // in Cr
// //     placementRate: 91,
// //     rating: 4.8,
// //     accreditation: "INC Approved",
// //     programs: ["B.Sc. Nursing", "M.Sc. Nursing"],
// //     enrollmentTrend: [
// //       { year: "2021", students: 3100 },
// //       { year: "2022", students: 3250 },
// //       { year: "2023", students: 3350 },
// //       { year: "2024", students: 3400 },
// //       { year: "2025", students: 3456 },
// //     ],
// //   },
// //   {
// //     name: "K. B. Institute of Pharmaceutical Education & Research",
// //     principal: "Dr. Rakesh Singh",
// //     email: "principal.kbipr@ksv.edu.in",
// //     phone: "+91 79 2324 3344",
// //     logo: "/kb-logo.png", // Placeholder path
// //     established: 1995,
// //     students: 2234,
// //     faculty: 100,
// //     revenue: 4.5, // in Cr
// //     placementRate: 82,
// //     rating: 4.4,
// //     accreditation: "NBA Accredited",
// //     programs: ["B.Pharm", "M.Pharm"],
// //     enrollmentTrend: [
// //       { year: "2021", students: 2000 },
// //       { year: "2022", students: 2100 },
// //       { year: "2023", students: 2150 },
// //       { year: "2024", students: 2200 },
// //       { year: "2025", students: 2234 },
// //     ],
// //   },
// // ];

// // // Reusable Metric Component
// // const CollegeMetric = ({ icon, label, value, colorClass }: any) => (
// //   <div className="flex items-center gap-3">
// //     <div className={`p-2 rounded-lg bg-slate-100 ${colorClass}`}>{icon}</div>
// //     <div>
// //       <p className="text-xs text-slate-500">{label}</p>
// //       <p className="font-semibold text-sm text-slate-800">{value}</p>
// //     </div>
// //   </div>
// // );

// // // --- MAIN COLLEGE MANAGEMENT COMPONENT ---
// // export default function CollegeManagementPage() {
// //   const themeConfig = {
// //     primary: {
// //       fill: "#3b82f6",
// //       stroke: "#1d4ed8",
// //     },
// //     card: "bg-white",
// //     border: "border-blue-200",
// //   };

// //   return (
// //     <div className="p-6 space-y-6 bg-slate-50">
// //       {/* --- HEADER --- */}
// //       <div className="flex flex-col md:flex-row md:items-center md:justify-between">
// //         <div>
// //           <h1 className="text-2xl font-bold text-slate-900">
// //             College Management
// //           </h1>
// //           <p className="text-slate-500">
// //             Oversee and manage all affiliated colleges under KSV University.
// //           </p>
// //         </div>
// //         <Button className="mt-4 md:mt-0 bg-[#001675] hover:bg-[#001675]/90">
// //           + Add New College
// //         </Button>
// //       </div>

// //       {/* --- COLLEGES LIST --- */}
// //       <div className="space-y-8">
// //         {collegesData.map((college) => (
// //           <Card
// //             key={college.name}
// //             className="overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 border-slate-200"
// //           >
// //             <CardHeader className="bg-slate-50 border-b border-slate-200 p-4">
// //               <div className="flex items-start justify-between">
// //                 <div className="flex items-center gap-4">
// //                   <Image
// //                     src={college.logo}
// //                     alt={`${college.name} Logo`}
// //                     width={60}
// //                     height={60}
// //                     className="rounded-lg border-2 border-white shadow-sm"
// //                   />
// //                   <div>
// //                     <CardTitle className="text-lg font-bold text-slate-900">
// //                       {college.name}
// //                     </CardTitle>
// //                     <CardDescription className="flex items-center gap-4 text-xs text-slate-500 mt-1">
// //                       <span>Estd. {college.established}</span>
// //                       <Badge
// //                         variant="secondary"
// //                         className="bg-sky-100 text-sky-700"
// //                       >
// //                         {college.accreditation}
// //                       </Badge>
// //                     </CardDescription>
// //                   </div>
// //                 </div>
// //                 <DropdownMenu>
// //                   <DropdownMenuTrigger asChild>
// //                     <Button variant="ghost" size="icon">
// //                       <MoreVertical className="h-4 w-4" />
// //                     </Button>
// //                   </DropdownMenuTrigger>
// //                   <DropdownMenuContent align="end">
// //                     <DropdownMenuItem>
// //                       <Eye className="mr-2 h-4 w-4" /> View Details
// //                     </DropdownMenuItem>
// //                     <DropdownMenuItem>
// //                       <FileText className="mr-2 h-4 w-4" /> Generate Report
// //                     </DropdownMenuItem>
// //                   </DropdownMenuContent>
// //                 </DropdownMenu>
// //               </div>
// //             </CardHeader>
// //             <CardContent className="p-6 grid grid-cols-1 md:grid-cols-12 gap-6">
// //               {/* Left Side: Details & Contact */}
// //               <div className="md:col-span-4 lg:col-span-3 space-y-4">
// //                 <h4 className="font-semibold text-slate-700">Administration</h4>
// //                 <div className="space-y-3 text-sm">
// //                   <div className="flex items-start gap-3">
// //                     <UserCheck className="h-4 w-4 mt-0.5 text-slate-400" />
// //                     <div>
// //                       <p className="text-slate-500 text-xs">Principal</p>
// //                       <p className="font-medium text-slate-800">
// //                         {college.principal}
// //                       </p>
// //                     </div>
// //                   </div>
// //                   <div className="flex items-start gap-3">
// //                     <Mail className="h-4 w-4 mt-0.5 text-slate-400" />
// //                     <div>
// //                       <p className="text-slate-500 text-xs">Email</p>
// //                       <a
// //                         href={`mailto:${college.email}`}
// //                         className="font-medium text-blue-600 hover:underline"
// //                       >
// //                         {college.email}
// //                       </a>
// //                     </div>
// //                   </div>
// //                   <div className="flex items-start gap-3">
// //                     <Phone className="h-4 w-4 mt-0.5 text-slate-400" />
// //                     <div>
// //                       <p className="text-slate-500 text-xs">Phone</p>
// //                       <p className="font-medium text-slate-800">
// //                         {college.phone}
// //                       </p>
// //                     </div>
// //                   </div>
// //                   <div className="flex items-start gap-3">
// //                     <BookOpen className="h-4 w-4 mt-0.5 text-slate-400" />
// //                     <div>
// //                       <p className="text-slate-500 text-xs">Programs</p>
// //                       <div className="flex flex-wrap gap-1 mt-1">
// //                         {college.programs.map((prog) => (
// //                           <Badge key={prog} variant="outline">
// //                             {prog}
// //                           </Badge>
// //                         ))}
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>

// //               {/* Middle: Key Metrics */}
// //               <div className="md:col-span-8 lg:col-span-5 space-y-5 border-l-0 md:border-l md:border-r-0 lg:border-r md:pl-6 lg:px-6">
// //                 <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-5">
// //                   <CollegeMetric
// //                     icon={<Users className="h-5 w-5" />}
// //                     label="Students"
// //                     value={college.students.toLocaleString()}
// //                     colorClass="text-blue-600"
// //                   />
// //                   <CollegeMetric
// //                     icon={<UserCheck className="h-5 w-5" />}
// //                     label="Faculty"
// //                     value={college.faculty.toLocaleString()}
// //                     colorClass="text-green-600"
// //                   />
// //                   <CollegeMetric
// //                     icon={<IndianRupee className="h-5 w-5" />}
// //                     label="Revenue (Ann.)"
// //                     value={`₹${college.revenue} Cr`}
// //                     colorClass="text-purple-600"
// //                   />
// //                   <div className="col-span-2 sm:col-span-3">
// //                     <p className="text-xs text-slate-500 mb-1">
// //                       Placement Rate
// //                     </p>
// //                     <div className="flex items-center gap-3">
// //                       <Progress value={college.placementRate} />
// //                       <span className="font-bold text-blue-600 text-sm">
// //                         {college.placementRate}%
// //                       </span>
// //                     </div>
// //                   </div>
// //                   <div className="flex items-center gap-2">
// //                     <Star className="h-5 w-5 text-amber-400 fill-current" />
// //                     <span className="font-semibold text-slate-800">
// //                       {college.rating}
// //                     </span>
// //                     <span className="text-xs text-slate-500">/ 5.0</span>
// //                   </div>
// //                 </div>
// //               </div>

// //               {/* Right Side: Enrollment Trend */}
// //               <div className="md:col-span-12 lg:col-span-4">
// //                 <h4 className="font-semibold text-slate-700 mb-2">
// //                   Enrollment Growth
// //                 </h4>
// //                 <div className="h-[120px]">
// //                   <ResponsiveContainer width="100%" height="100%">
// //                     <AreaChart data={college.enrollmentTrend}>
// //                       <defs>
// //                         <linearGradient
// //                           id="colorEnrollment"
// //                           x1="0"
// //                           y1="0"
// //                           x2="0"
// //                           y2="1"
// //                         >
// //                           <stop
// //                             offset="5%"
// //                             stopColor={themeConfig.primary.fill}
// //                             stopOpacity={0.8}
// //                           />
// //                           <stop
// //                             offset="95%"
// //                             stopColor={themeConfig.primary.fill}
// //                             stopOpacity={0}
// //                           />
// //                         </linearGradient>
// //                       </defs>
// //                       <Tooltip
// //                         contentStyle={{
// //                           backgroundColor: themeConfig.card,
// //                           border: `1px solid ${themeConfig.border}`,
// //                           borderRadius: "8px",
// //                           fontSize: "12px",
// //                         }}
// //                       />
// //                       <XAxis
// //                         dataKey="year"
// //                         stroke="#94a3b8"
// //                         fontSize={10}
// //                         tickLine={false}
// //                         axisLine={false}
// //                       />
// //                       <Area
// //                         type="monotone"
// //                         dataKey="students"
// //                         stroke={themeConfig.primary.stroke}
// //                         fill="url(#colorEnrollment)"
// //                         strokeWidth={2}
// //                       />
// //                     </AreaChart>
// //                   </ResponsiveContainer>
// //                 </div>
// //               </div>
// //             </CardContent>
// //           </Card>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }
