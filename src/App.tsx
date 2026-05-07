import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  Calendar, 
  BookOpen, 
  BarChart3, 
  Palmtree, 
  FileText, 
  LogOut, 
  CreditCard, 
  CheckCircle2, 
  Bell, 
  MessageSquare, 
  FolderKanban,
  LayoutDashboard,
  Search,
  Menu,
  X,
  ChevronRight,
  TrendingUp,
  Clock,
  Briefcase
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { cn } from './lib/utils';

// --- Types ---
type TabId = 
  | 'dashboard' 
  | 'profile' 
  | 'attendance' 
  | 'assignments' 
  | 'progress' 
  | 'holidays' 
  | 'teaching' 
  | 'leaves' 
  | 'billing' 
  | 'clearance' 
  | 'announcements' 
  | 'feedback' 
  | 'projects';

interface NavItem {
  id: TabId;
  label: string;
  icon: React.ElementType;
}

// --- Constants ---
const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'profile', label: 'Student Profile', icon: User },
  { id: 'attendance', label: 'Attendance', icon: Calendar },
  { id: 'assignments', label: 'Assignments', icon: BookOpen },
  { id: 'progress', label: 'Progress Report', icon: BarChart3 },
  { id: 'holidays', label: 'Holidays', icon: Palmtree },
  { id: 'teaching', label: 'Teaching Content', icon: FileText },
  { id: 'leaves', label: 'Leaves', icon: LogOut },
  { id: 'billing', label: 'Billing Activity', icon: CreditCard },
  { id: 'clearance', label: 'Clearance', icon: CheckCircle2 },
  { id: 'announcements', label: 'Announcements', icon: Bell },
  { id: 'feedback', label: 'Feedback', icon: MessageSquare },
  { id: 'projects', label: 'Projects', icon: FolderKanban },
];

const ATTENDANCE_DATA = [
  { name: 'Mon', status: 100 },
  { name: 'Tue', status: 100 },
  { name: 'Wed', status: 80 },
  { name: 'Thu', status: 100 },
  { name: 'Fri', status: 100 },
];

const SUBJECT_ATTENDANCE_DATA = [
  { name: 'Math', present: 98, total: 100, color: '#4f46e5' },
  { name: 'Science', present: 95, total: 100, color: '#10b981' },
  { name: 'History', present: 92, total: 100, color: '#f59e0b' },
  { name: 'English', present: 96, total: 100, color: '#6366f1' },
  { name: 'Computing', present: 100, total: 100, color: '#ec4899' },
];

const OVERALL_ATTENDANCE_PIE = [
  { name: 'Present', value: 96.4, color: '#4f46e5' },
  { name: 'Absent', value: 3.6, color: '#f1f5f9' },
];

const PROGRESS_DATA = [
  { subject: 'Math', score: 85, color: '#4f46e5' },
  { subject: 'Science', score: 92, color: '#10b981' },
  { subject: 'History', score: 78, color: '#f59e0b' },
  { subject: 'English', score: 88, color: '#6366f1' },
  { subject: 'Art', score: 95, color: '#ec4899' },
];

// --- Components ---

const Card = ({ children, className, ...props }: { children: React.ReactNode; className?: string; [key: string]: any }) => (
  <div className={cn("bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden", className)} {...props}>
    {children}
  </div>
);

const SectionHeader = ({ title, description }: { title: string; description?: string }) => (
  <div className="mb-6 text-left">
    <h2 className="text-2xl font-semibold text-slate-900 tracking-tight">{title}</h2>
    {description && <p className="text-slate-500 text-sm mt-1">{description}</p>}
  </div>
);

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // --- Sub-views ---

  const DashboardView = () => (
    <div className="space-y-6">
      <SectionHeader 
        title="Welcome back, Alex!" 
        description="Here's what's happening in your school today." 
      />
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Attendance', value: '96%', icon: Calendar, color: 'bg-blue-50 text-blue-600' },
          { label: 'Upcoming Tasks', value: '12', icon: Briefcase, color: 'bg-orange-50 text-orange-600' },
          { label: 'GPA', value: '3.8/4.0', icon: TrendingUp, color: 'bg-emerald-50 text-emerald-600' },
          { label: 'Billing Status', value: 'Paid', icon: CheckCircle2, color: 'bg-purple-50 text-purple-600' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="p-5 flex items-center gap-4 text-left">
              <div className={cn("p-3 rounded-xl", stat.color)}>
                <stat.icon size={24} />
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{stat.label}</p>
                <p className="text-xl font-bold text-slate-900">{stat.value}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart Area */}
        <Card className="lg:col-span-2 p-6 text-left">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-slate-900">Academic Progress</h3>
            <select className="text-sm border-slate-200 rounded-lg bg-slate-50 px-2 py-1 outline-none">
              <option>Last Semester</option>
              <option>Last Month</option>
            </select>
          </div>
          <div className="h-[300px] w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={PROGRESS_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="score"
                  nameKey="subject"
                  label={({ subject, percent }) => `${subject} ${(percent * 100).toFixed(0)}%`}
                >
                  {PROGRESS_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Sidebar area: Announcements */}
        <Card className="p-6 text-left">
          <h3 className="font-semibold text-slate-900 mb-4 text-left">Announcements</h3>
          <div className="space-y-4">
            {[
              { title: 'Annual Sports Day', time: '2 hours ago', tag: 'Event' },
              { title: 'Summer Vacations Start', time: 'Yesterday', tag: 'Holiday' },
              { title: 'Math Quiz Results Out', time: '2 days ago', tag: 'Academic' },
            ].map((news, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] items-center font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 uppercase tracking-tight">
                    {news.tag}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">{news.time}</span>
                </div>
                <h4 className="text-sm font-medium text-slate-800 group-hover:text-indigo-600 transition-colors">
                  {news.title}
                </h4>
              </div>
            ))}
            <button className="w-full mt-4 py-2 text-xs font-semibold text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
              View All Announcements
            </button>
          </div>
        </Card>
      </div>
    </div>
  );

  const ProfileView = () => (
    <div className="space-y-6 text-left">
      <SectionHeader title="Student Profile" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1 p-8 flex flex-col items-center text-center">
          <div className="relative mb-6">
            <img 
              src="https://picsum.photos/seed/alex/150/150" 
              alt="Alex Johnson" 
              className="w-32 h-32 rounded-full ring-4 ring-indigo-50 object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-0 right-0 p-2 bg-emerald-500 rounded-full border-4 border-white"></div>
          </div>
          <h3 className="text-xl font-bold text-slate-900">Alex Johnson</h3>
          <p className="text-slate-500 text-sm">Grade 11 - Section B</p>
          <div className="mt-6 w-full space-y-3 text-left border-t pt-6 border-slate-100">
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest leading-none mb-1">Student ID</p>
              <p className="text-sm font-medium text-slate-700">#EDU-2024-0512</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest leading-none mb-1">Email</p>
              <p className="text-sm font-medium text-slate-700">alex.j@school.edu</p>
            </div>
          </div>
        </Card>
        
        <Card className="md:col-span-2 p-8">
          <h4 className="font-semibold text-slate-900 mb-6 border-b pb-4 border-slate-100">Personal Information</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8 text-sm">
            {[
              { label: 'Date of Birth', value: 'May 12, 2008' },
              { label: 'Gender', value: 'Male' },
              { label: 'Blood Group', value: 'O+' },
              { label: 'Joining Date', value: 'Jan 15, 2022' },
              { label: 'Father\'s Name', value: 'Robert Johnson' },
              { label: 'Emergency Contact', value: '+1 (555) 123-4567' },
            ].map(item => (
              <div key={item.label}>
                <p className="text-slate-400 font-medium mb-1">{item.label}</p>
                <p className="text-slate-800 font-semibold">{item.value}</p>
              </div>
            ))}
            <div className="sm:col-span-2">
              <p className="text-slate-400 font-medium mb-1">Address</p>
              <p className="text-slate-800 font-semibold leading-relaxed">
                123 Academic Drive, Knowledge Park,<br />Springfield, ST 54321
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );

  const AttendanceView = () => (
    <div className="space-y-6 text-left">
      <SectionHeader title="Attendance Tracking" description="Monitor your daily attendance and leave history." />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-semibold text-slate-900 text-lg">Weekly Overview</h3>
            <div className="flex items-center gap-4 text-sm font-medium">
              <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-indigo-500"></span> Present</div>
              <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-slate-200"></span> Absent</div>
            </div>
          </div>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ATTENDANCE_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis hide />
                <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{ borderRadius: '12px', border: 'none' }} />
                <Bar dataKey="status" radius={[6, 6, 0, 0]}>
                  {ATTENDANCE_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.status === 100 ? '#6366f1' : '#e2e8f0'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <div className="space-y-6">
          <Card className="p-6 flex flex-col items-center">
            <h3 className="text-slate-900 text-sm font-semibold mb-4 uppercase tracking-wider w-full text-left">Overall Rate</h3>
            <div className="h-[180px] w-full relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={OVERALL_ATTENDANCE_PIE}
                    innerRadius={60}
                    outerRadius={80}
                    startAngle={90}
                    endAngle={450}
                    dataKey="value"
                  >
                    {OVERALL_ATTENDANCE_PIE.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-3xl font-bold text-slate-900">96%</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Present</span>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-slate-500 text-xs bg-slate-50 w-full px-3 py-2 rounded-xl justify-center">
              <Clock size={14} /> On-time arrivals: 98%
            </div>
          </Card>
          <Card className="p-6">
            <h3 className="font-semibold text-slate-900 mb-4">Summary</h3>
            <div className="space-y-4">
              {[
                { label: 'Present Days', value: '182', color: 'text-indigo-600' },
                { label: 'Absent Days', value: '4', color: 'text-rose-500' },
                { label: 'Late Comings', value: '1', color: 'text-amber-500' },
                { label: 'Approved Leaves', value: '2', color: 'text-slate-600' },
              ].map(stat => (
                <div key={stat.label} className="flex justify-between items-center text-sm">
                  <span className="text-slate-500">{stat.label}</span>
                  <span className={cn("font-bold", stat.color)}>{stat.value}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      <Card className="p-6">
        <h3 className="font-semibold text-slate-900 text-lg mb-6">Attendance Per Subject</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SUBJECT_ATTENDANCE_DATA.map((subject, i) => (
            <div key={i} className="space-y-3">
              <div className="flex justify-between items-end">
                <div>
                  <h4 className="font-bold text-slate-800">{subject.name}</h4>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{subject.present}/{subject.total} Sessions</p>
                </div>
                <span className="text-lg font-black text-indigo-600">{Math.round((subject.present/subject.total) * 100)}%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${(subject.present/subject.total) * 100}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  style={{ backgroundColor: subject.color }}
                  className="h-full rounded-full"
                />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );

  const AssignmentsView = () => (
    <div className="space-y-6 text-left">
      <SectionHeader title="Assignments" description="Manage your pending and submitted classwork." />
      <div className="space-y-4">
        {[
          { subject: 'Computer Science', title: 'Data Structures Implementation', deadline: 'Today, 11:59 PM', status: 'pending', priority: 'high' },
          { subject: 'Mathematics', title: 'Calculus Triple Integration', deadline: 'In 2 days', status: 'pending', priority: 'medium' },
          { subject: 'Physics', title: 'Electromagnetic Field Theory Lab Report', deadline: 'In 4 days', status: 'submitted', priority: 'low' },
          { subject: 'History', title: 'The French Revolution Essay', deadline: 'Submitted', status: 'graded', score: '95/100', priority: 'low' },
        ].map((task, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card className="p-1 items-center flex group hover:border-indigo-200 transition-colors">
              <div className={cn(
                "w-1 h-14 rounded-full ml-1",
                task.priority === 'high' ? 'bg-rose-500' : task.priority === 'medium' ? 'bg-amber-500' : 'bg-slate-300'
              )}></div>
              <div className="p-4 flex-1 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="text-left">
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">{task.subject}</p>
                  <h4 className="font-semibold text-slate-800">{task.title}</h4>
                </div>
                <div className="flex flex-wrap items-center gap-6">
                  <div className="text-right">
                    <p className="text-xs text-slate-400 font-medium">Deadline</p>
                    <p className={cn(
                      "text-sm font-semibold",
                      task.deadline === 'Today, 11:59 PM' ? 'text-rose-500' : 'text-slate-700'
                    )}>{task.deadline}</p>
                  </div>
                  <div className="min-w-24">
                    {task.status === 'pending' ? (
                      <button className="w-full px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition-shadow shadow-md shadow-indigo-100">
                        Submit Now
                      </button>
                    ) : task.status === 'submitted' ? (
                      <span className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase px-3 py-2 bg-emerald-50 rounded-xl">
                        <CheckCircle2 size={14} /> Submitted
                      </span>
                    ) : (
                      <div className="text-right">
                        <p className="text-xs text-slate-400 font-medium">Grade</p>
                        <p className="text-sm font-bold text-indigo-600">{task.score}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const BillingView = () => (
    <div className="space-y-6 text-left">
      <SectionHeader title="Billing & Fees" description="View transaction history and outstanding balances." />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="p-6 bg-slate-900 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Total Outstanding</h3>
            <p className="text-4xl font-bold mb-4">$0.00</p>
            <div className="flex items-center gap-2 text-emerald-400 text-sm">
              <CheckCircle2 size={16} /> All dues clear for this semester
            </div>
          </div>
          <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/5 rounded-full blur-3xl"></div>
        </Card>
        <Card className="p-6 flex flex-col justify-center">
            <h3 className="text-slate-400 text-xs font-bold uppercase mb-2">Next Payment Due</h3>
            <p className="text-xl font-bold text-slate-800">August 15, 2026</p>
            <p className="text-sm text-slate-500 mt-1">Fall Semester Enrollment Fees</p>
        </Card>
      </div>
      
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50">
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Invoice ID</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { id: '#INV-8821', desc: 'Spring Semester Fees', date: 'Jan 05, 2026', amount: '$4,200.00', status: 'Paid' },
                { id: '#INV-8501', desc: 'Library Membership Annual', date: 'Dec 12, 2025', amount: '$50.00', status: 'Paid' },
                { id: '#INV-7922', desc: 'Late Submission Fine', date: 'Nov 30, 2025', amount: '$15.00', status: 'Refunded' },
                { id: '#INV-7712', desc: 'Laboratory Equipment Charges', date: 'Oct 15, 2025', amount: '$250.00', status: 'Paid' },
              ].map((inv, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs text-slate-500">{inv.id}</td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-700">{inv.desc}</td>
                  <td className="px-6 py-4 text-sm text-slate-500">{inv.date}</td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-800">{inv.amount}</td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "px-3 py-1 rounded-full text-[10px] font-bold uppercase",
                      inv.status === 'Paid' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-600'
                    )}>
                      {inv.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );

  const AnnouncementsView = () => (
    <div className="space-y-6 text-left">
      <SectionHeader title="Announcements & Board" description="Stay updated with school activities." />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { date: 'MAY 10', type: 'Event', title: 'The Science Fair 2026', desc: 'Participate and win exciting prizes in the upcoming science fair held in the main atrium.', color: 'border-blue-500' },
          { date: 'MAY 05', type: 'Administrative', title: 'Summer Timings Update', desc: 'School timings will be revised starting next week. Please check the timings section.', color: 'border-amber-500' },
          { date: 'APR 28', type: 'Holiday', title: 'Summer Vacations', desc: 'School will remain closed for summer vacations from June 1st to August 1st.', color: 'border-emerald-500' },
          { date: 'APR 22', type: 'Exam', title: 'Final Semester Results', desc: 'Congratulations to all students. The results have been published in the portal.', color: 'border-indigo-500' },
        ].map((news, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className={cn("p-6 border-l-4 h-full", news.color)}>
              <div className="flex justify-between items-start mb-4">
                <span className="text-2xl font-black text-slate-200 leading-none">{news.date}</span>
                <span className="text-[10px] font-bold px-2 py-1 bg-slate-100 rounded text-slate-600 uppercase">{news.type}</span>
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">{news.title}</h4>
              <p className="text-sm text-slate-500 leading-relaxed mb-4">{news.desc}</p>
              <button className="text-xs font-bold text-indigo-600 flex items-center gap-1 hover:gap-2 transition-all">
                Read More <ChevronRight size={14} />
              </button>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const TeachingContentView = () => (
    <div className="space-y-6 text-left">
      <SectionHeader title="Teaching Content" description="Access your study materials and video lectures." />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { subject: 'Advanced Physics', topic: 'Quantum Mechanics Basics', type: 'PDF', duration: '1.2 MB' },
          { subject: 'Mathematics', topic: 'Integrals and Derivatives', type: 'Video', duration: '45 mins' },
          { subject: 'Computer Science', topic: 'React.js Fundamentals', type: 'Course', duration: '12 modules' },
          { subject: 'English', topic: 'Shakespearean Literature', type: 'PDF', duration: '850 KB' },
        ].map((content, i) => (
          <Card key={i} className="hover:border-indigo-200 transition-all p-5 group cursor-pointer">
            <div className="mb-4 p-3 bg-slate-50 w-fit rounded-xl text-slate-400 group-hover:text-indigo-600 group-hover:bg-indigo-50 transition-colors">
              {content.type === 'PDF' ? <FileText size={24} /> : content.type === 'Video' ? <BookOpen size={24} /> : <BookOpen size={24} />}
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">{content.subject}</p>
            <h4 className="font-bold text-slate-800 mb-4">{content.topic}</h4>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500">{content.duration}</span>
              <button className="text-xs font-bold text-indigo-600 hover:underline">Download / View</button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const ProjectsView = () => (
    <div className="space-y-6 text-left">
      <SectionHeader title="Projects" description="Collaborative groups and individual capstones." />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { name: 'Eco-System Monitor', team: 'Group 4', status: 'In Progress', progress: 65, members: 4 },
          { name: 'Autonomous Drone', team: 'Individual', status: 'Completed', progress: 100, members: 1 },
          { name: 'Financial Literacy App', team: 'Group 1', status: 'Reviewing', progress: 90, members: 3 },
          { name: 'History Archive Digitization', team: 'Group 7', status: 'Planning', progress: 15, members: 5 },
        ].map((proj, i) => (
          <Card key={i} className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="font-bold text-slate-900 text-lg">{proj.name}</h4>
                <p className="text-sm text-slate-500">{proj.team}</p>
              </div>
              <span className={cn(
                "px-3 py-1 rounded-full text-[10px] font-bold uppercase",
                proj.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-600'
              )}>{proj.status}</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-slate-400">Progress</span>
                <span className="text-slate-900">{proj.progress}%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${proj.progress}%` }}
                  className="h-full bg-indigo-600 rounded-full"
                />
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <div className="flex -space-x-2">
                {[...Array(proj.members)].map((_, j) => (
                  <div key={j} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                    <img src={`https://picsum.photos/seed/user${j+i}/32/32`} alt="M" referrerPolicy="no-referrer" />
                  </div>
                ))}
              </div>
              <button className="text-xs font-bold text-slate-600 hover:text-indigo-600">Open Dashboard</button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const RenderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardView />;
      case 'profile': return <ProfileView />;
      case 'attendance': return <AttendanceView />;
      case 'assignments': return <AssignmentsView />;
      case 'billing': return <BillingView />;
      case 'announcements': return <AnnouncementsView />;
      case 'teaching': return <TeachingContentView />;
      case 'projects': return <ProjectsView />;
      default: return (
        <div className="flex flex-col items-center justify-center p-20 text-center">
          <div className="p-6 bg-slate-100 rounded-full mb-6">
            <LayoutDashboard className="w-12 h-12 text-slate-300" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Module coming soon</h2>
          <p className="text-slate-500 max-w-sm">We are currently integrating the {activeTab} section for your optimal experience.</p>
        </div>
      );
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">
      {/* Sidebar Overlay for mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 lg:hidden" 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 280 : 0, x: isSidebarOpen ? 0 : -280 }}
        className={cn(
          "fixed lg:relative z-50 h-full bg-white border-r border-slate-200 flex flex-col transition-all duration-300",
          !isSidebarOpen && "lg:w-0"
        )}
      >
        <div className="p-6 flex items-center justify-between border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-indigo-100">
              EP
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900">EduPulse</h1>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-2 hover:bg-slate-50 rounded-lg">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {NAV_ITEMS.map((item) => (
            <button
              id={`nav-${item.id}`}
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative",
                activeTab === item.id 
                  ? "bg-indigo-50 text-indigo-700 font-bold" 
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-800 focus:outline-none"
              )}
            >
              <item.icon size={20} className={cn(
                "transition-colors",
                activeTab === item.id ? "text-indigo-600" : "text-slate-400 group-hover:text-slate-600"
              )} />
              <span className="text-sm">{item.label}</span>
              {activeTab === item.id && (
                <motion.div 
                  layoutId="sidebar-pill"
                  className="absolute left-0 w-1 h-6 bg-indigo-600 rounded-r-full"
                />
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100 shrink-0">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all">
            <LogOut size={20} />
            <span className="text-sm font-medium">Log out</span>
          </button>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0 z-30">
          <div className="flex items-center gap-4">
            {!isSidebarOpen && (
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 hover:bg-slate-50 rounded-xl transition-colors"
                id="menu-trigger"
              >
                <Menu size={24} />
              </button>
            )}
            <div className="relative group max-w-md hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Search..."
                className="pl-10 pr-4 py-2 bg-slate-50 border-transparent border focus:border-indigo-200 focus:bg-white rounded-xl text-sm w-64 outline-none transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-5">
            <button className="relative p-2 text-slate-500 hover:bg-slate-50 rounded-xl transition-colors">
              <Bell size={22} />
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-rose-500 border-2 border-white rounded-full"></span>
            </button>
            <div className="h-8 w-[1px] bg-slate-200" />
            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="text-right hidden xs:block">
                <p className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-none mb-1">Alex Johnson</p>
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Student ID: #2024</p>
              </div>
              <img 
                src="https://picsum.photos/seed/alex/100/100" 
                alt="Profile" 
                className="w-10 h-10 rounded-xl ring-2 ring-transparent group-hover:ring-indigo-100 transition-all object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </header>

        {/* Content Scroll Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <RenderContent />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Floating Action / Help */}
      <button className="fixed bottom-8 right-8 p-4 bg-indigo-600 text-white rounded-2xl shadow-xl shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-1 transition-all z-50">
        <MessageSquare size={24} />
      </button>
    </div>
  );
}
