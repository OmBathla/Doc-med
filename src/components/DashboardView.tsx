import React from 'react';
import {
  UploadCloud,
  MessageSquare,
  GitCompare,
  FileText,
  Calendar,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  UserCheck,
  Stethoscope,
  Plus,
  AlertCircle
} from 'lucide-react';
import { MedicalReport, User, Conversation } from '../types.ts';

interface DashboardViewProps {
  currentUser: User | null;
  reports: MedicalReport[];
  conversations: Conversation[];
  currentMode: 'patient' | 'doctor';
  currentLanguage: 'en' | 'hinglish';
  onOpenUpload: () => void;
  onOpenReport: (report: MedicalReport) => void;
  onNavigateToTab: (tab: 'hero' | 'dashboard' | 'vault' | 'chat' | 'compare' | 'safety') => void;
  onOpenCompare: (rep1: MedicalReport, rep2?: MedicalReport) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  currentUser,
  reports,
  conversations,
  currentMode,
  currentLanguage,
  onOpenUpload,
  onOpenReport,
  onNavigateToTab,
  onOpenCompare,
}) => {
  const userName = currentUser?.name ? currentUser.name.split(' ')[0] : 'there';
  const recentReports = reports.slice(0, 5);
  const recentConversations = conversations.slice(0, 3);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-10">
      {/* Editorial Top Greeting & Clear Next Actions */}
      <div className="border-b border-rule pb-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center gap-2 text-xs font-medium text-muted">
            {currentMode === 'patient' ? (
              <span className="flex items-center gap-1.5 text-accent-deep font-semibold">
                <UserCheck className="w-3.5 h-3.5" />
                <span>Patient Mode ({currentLanguage === 'hinglish' ? 'Hinglish' : 'English'})</span>
              </span>
            ) : (
              <span className="flex items-center gap-1.5 text-accent-deep font-semibold">
                <Stethoscope className="w-3.5 h-3.5" />
                <span>Clinician Mode</span>
              </span>
            )}
            <span aria-hidden="true">·</span>
            <span>Private Health Workspace</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-ink tracking-tight">
            Good day, {userName}.
          </h1>

          <p className="text-sm text-muted leading-relaxed">
            {reports.length > 0
              ? `You have ${reports.length} diagnostic reports archived. You can explore extracted values, ask questions in your preferred language, or compare results across dates.`
              : 'Welcome to DocuMed. Upload your first laboratory report to extract parameters, understand values, and start asking questions.'}
          </p>
        </div>

        {/* Primary and Secondary Action Buttons */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenUpload}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-accent hover:bg-accent-deep rounded-lg transition-colors shadow-sm"
          >
            <UploadCloud className="w-4 h-4" />
            <span>Upload a Report</span>
          </button>

          <button
            onClick={() => onNavigateToTab('chat')}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-ink-2 bg-paper-2 hover:bg-rule rounded-lg transition-colors"
          >
            <Sparkles className="w-4 h-4 text-accent" />
            <span>Ask DocuMed</span>
          </button>
        </div>
      </div>

      {/* Main Content Area: Document Ledger Rows rather than repetitive cards! */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-ink">Recent Medical Reports</h2>
            <p className="text-xs text-muted">
              Clean ledger of uploaded documents, extraction status, and key parameters.
            </p>
          </div>

          {reports.length > 0 && (
            <button
              onClick={() => onNavigateToTab('vault')}
              className="text-xs font-semibold text-accent-deep hover:text-accent-deep flex items-center gap-1"
            >
              <span>View All ({reports.length})</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Clean Document Ledger Table */}
        {recentReports.length > 0 ? (
          <div className="bg-paper border border-rule rounded-card overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-paper-2 text-muted border-b border-rule font-medium">
                  <tr>
                    <th className="py-3 px-4 font-semibold text-ink-2">Document</th>
                    <th className="py-3 px-4 font-semibold text-ink-2">Category</th>
                    <th className="py-3 px-4 font-semibold text-ink-2">Examination Date</th>
                    <th className="py-3 px-4 font-semibold text-ink-2">Laboratory</th>
                    <th className="py-3 px-4 font-semibold text-ink-2">Abnormal Status</th>
                    <th className="py-3 px-4 font-semibold text-right text-ink-2">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-rule font-sans">
                  {recentReports.map((report) => {
                    const abnormalCount = report.extractedParameters.filter(
                      (p) => p.abnormalFlag !== 'normal'
                    ).length;

                    return (
                      <tr
                        key={report.id}
                        onClick={() => onOpenReport(report)}
                        className="hover:bg-paper-2 transition-colors cursor-pointer group"
                      >
                        <td className="py-3.5 px-4 font-medium text-ink">
                          <div className="flex items-center gap-2.5">
                            <FileText className="w-4 h-4 text-muted group-hover:text-accent transition-colors shrink-0" />
                            <span className="truncate max-w-xs">{report.originalFilename}</span>
                          </div>
                        </td>

                        <td className="py-3.5 px-4 text-muted">
                          <span>{report.reportCategory}</span>
                        </td>

                        <td className="py-3.5 px-4 text-muted font-mono text-[11px] tabular-nums">
                          {report.examinationDate || 'N/A'}
                        </td>

                        <td className="py-3.5 px-4 text-muted truncate max-w-[160px]">
                          {report.laboratoryName}
                        </td>

                        <td className="py-3.5 px-4">
                          {abnormalCount > 0 ? (
                              <span className="text-[11px] font-semibold text-ink-2">
                              {abnormalCount} flagged out of range
                            </span>
                          ) : (
                            <span className="text-[11px] text-muted">
                              All normal
                            </span>
                          )}
                        </td>

                        <td className="py-3.5 px-4 text-right">
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-accent-deep group-hover:underline">
                            <span>Open</span>
                            <ChevronRight className="w-3 h-3" />
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-paper border border-rule rounded-card p-10 text-center space-y-3">
            <FileText className="w-10 h-10 text-rule mx-auto" />
            <h3 className="text-sm font-bold text-ink">No medical records uploaded yet</h3>
            <p className="text-xs text-muted max-w-sm mx-auto">
              Drop a PDF report or click the upload button to begin analyzing your test results with DocuMed.
            </p>
            <button
              onClick={onOpenUpload}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-accent hover:bg-accent-deep rounded-lg transition-colors mt-2"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Upload Your First Report</span>
            </button>
          </div>
        )}
      </div>

      {/* Secondary Grid: Recent Conversations & Quick Longitudinal Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-4">
        {/* Left: Recent Conversations (6 cols on md) */}
        <div className="md:col-span-6 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-ink flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-accent-deep" />
              <span>Saved Discussions</span>
            </h3>
            <button
              onClick={() => onNavigateToTab('chat')}
              className="text-xs font-semibold text-accent-deep hover:text-accent-deep"
            >
              Open Assistant
            </button>
          </div>

          <div className="bg-paper border border-rule rounded-card divide-y divide-rule overflow-hidden shadow-sm">
            {recentConversations.length > 0 ? (
              recentConversations.map((c) => (
                <div
                  key={c.id}
                  onClick={() => onNavigateToTab('chat')}
                  className="p-3.5 hover:bg-paper-2 transition-colors cursor-pointer group"
                >
                  <p className="text-xs font-semibold text-ink group-hover:text-accent-deep truncate">
                    {c.title}
                  </p>
                  <p className="text-[11px] text-muted mt-1 line-clamp-2 leading-relaxed">
                    {c.messages[c.messages.length - 1]?.content || 'Start a conversation about your report...'}
                  </p>
                  <div className="text-[10px] text-muted mt-1.5 flex items-center gap-2">
                    <span>{c.messages.length} messages</span>
                    <span aria-hidden="true">·</span>
                    <span className="capitalize">{c.interactionMode} Mode</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-6 text-center text-xs text-muted">
              No active conversations yet. Click “Ask DocuMed” to start questioning your reports.
              </div>
            )}
          </div>
        </div>

        {/* Right: Longitudinal Comparison Quick Launcher (6 cols on md) */}
        <div className="md:col-span-6 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-ink flex items-center gap-2">
              <GitCompare className="w-4 h-4 text-accent-deep" />
              <span>Two-Report Longitudinal Trend</span>
            </h3>
            {reports.length >= 2 && (
              <button
                onClick={() => onOpenCompare(reports[0], reports[1])}
                className="text-xs font-semibold text-accent-deep hover:text-accent-deep"
              >
                Compare Now
              </button>
            )}
          </div>

          <div className="bg-paper border border-rule rounded-card p-5 shadow-sm space-y-3">
            <p className="text-xs text-muted leading-relaxed">
              Compare your baseline laboratory values with subsequent follow-up tests. DocuMed matches overlapping tests (such as Hemoglobin, MCV, Ferritin, or HbA1c) and computes true numerical deltas.
            </p>

            {reports.length >= 2 ? (
              <div className="pt-2">
                <button
                  onClick={() => onOpenCompare(reports[0], reports[1])}
                  className="w-full flex items-center justify-between p-3 rounded-lg border border-rule hover:border-zinc-300 hover:bg-paper-2 transition-colors text-xs text-left"
                >
                  <div>
                    <p className="font-semibold text-ink">
                      {reports[0].originalFilename} vs {reports[1].originalFilename}
                    </p>
                    <p className="text-[11px] text-muted mt-0.5">
                      {reports[0].examinationDate} · {reports[1].examinationDate}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted shrink-0" />
                </button>
              </div>
            ) : (
              <div className="p-3 bg-paper-2 rounded-lg text-xs text-muted">
            Upload at least two reports to view longitudinal parameter comparisons.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Safety Notice Footer */}
      <div className="pt-4 border-t border-rule flex items-start gap-2.5 text-xs text-muted">
        <ShieldCheck className="w-4 h-4 text-accent shrink-0 mt-0.5" />
        <p className="leading-relaxed text-[11px]">
          DocuMed assists in understanding test parameters and aids healthcare professionals in longitudinal synthesis. It does not provide medical diagnoses or prescribe medications. Always consult your attending doctor.
        </p>
      </div>
    </div>
  );
};
