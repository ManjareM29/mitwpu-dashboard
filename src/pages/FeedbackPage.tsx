import { motion } from "framer-motion";
import { MessageSquareText, ThumbsUp, ThumbsDown, Minus, TrendingUp } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import SentimentPieChart from "@/components/dashboard/SentimentPieChart";
import KPICard from "@/components/dashboard/KPICard";
import { students, getSentimentDistribution, departments } from "@/data/mockData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const FeedbackPage = () => {
  const sentimentData = getSentimentDistribution();
  const positiveCount = sentimentData.find(s => s.name === 'Positive')?.value || 0;
  const negativeCount = sentimentData.find(s => s.name === 'Negative')?.value || 0;
  const neutralCount = sentimentData.find(s => s.name === 'Neutral')?.value || 0;

  const deptSentiment = departments.map(dept => {
    const deptData = getSentimentDistribution(dept.name);
    return {
      name: dept.name,
      Positive: deptData.find(s => s.name === 'Positive')?.value || 0,
      Negative: deptData.find(s => s.name === 'Negative')?.value || 0,
      Neutral: deptData.find(s => s.name === 'Neutral')?.value || 0,
    };
  });

  // Get recent remarks
  const recentRemarks = students.slice(0, 10).map((s, i) => ({
    id: i,
    student: `Student ${s.id}`,
    department: s.department,
    remark: s.remarks,
    sentiment: s.sentiment,
  }));

  const sentimentIcons = {
    Positive: ThumbsUp,
    Negative: ThumbsDown,
    Neutral: Minus,
  };

  const sentimentStyles = {
    Positive: 'text-sentiment-positive bg-sentiment-positive/10',
    Negative: 'text-sentiment-negative bg-sentiment-negative/10',
    Neutral: 'text-sentiment-neutral bg-sentiment-neutral/10',
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">Feedback & Sentiment Analysis</h1>
        <p className="text-muted-foreground">
          AI-powered analysis of student feedback and remarks
        </p>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <KPICard
          title="Positive Feedback"
          value={positiveCount}
          subtitle={`${((positiveCount / students.length) * 100).toFixed(1)}% of total`}
          icon={ThumbsUp}
          colorClass="bg-sentiment-positive/20"
          delay={0}
        />
        <KPICard
          title="Neutral Feedback"
          value={neutralCount}
          subtitle={`${((neutralCount / students.length) * 100).toFixed(1)}% of total`}
          icon={Minus}
          colorClass="bg-sentiment-neutral/20"
          delay={0.1}
        />
        <KPICard
          title="Needs Attention"
          value={negativeCount}
          subtitle={`${((negativeCount / students.length) * 100).toFixed(1)}% of total`}
          icon={ThumbsDown}
          colorClass="bg-sentiment-negative/20"
          delay={0.2}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <SentimentPieChart data={sentimentData} title="Overall Sentiment Distribution" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass-card rounded-2xl p-6"
        >
          <h3 className="text-lg font-semibold mb-4">Sentiment by Department</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deptSentiment} barGap={2}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '0.75rem',
                  }}
                />
                <Bar dataKey="Positive" fill="hsl(142, 55%, 55%)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Neutral" fill="hsl(45, 70%, 55%)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Negative" fill="hsl(0, 65%, 60%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Recent Feedback */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="glass-card rounded-2xl p-6"
      >
        <div className="flex items-center gap-2 mb-6">
          <MessageSquareText className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Recent Student Feedback</h3>
        </div>
        
        <div className="space-y-4">
          {recentRemarks.map((item, index) => {
            const Icon = sentimentIcons[item.sentiment];
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.05 }}
                className="flex items-start gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
              >
                <div className={`p-2 rounded-lg ${sentimentStyles[item.sentiment]}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">{item.student}</span>
                    <span className="text-xs text-muted-foreground px-2 py-0.5 bg-muted rounded-full">
                      {item.department}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.remark}</p>
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${sentimentStyles[item.sentiment]}`}>
                  {item.sentiment}
                </span>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default FeedbackPage;
